const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const { formType, data } = JSON.parse(event.body);

    // Get Google Sheets credentials from environment variables
    const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!GOOGLE_SHEETS_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets configuration');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Initialize the JWT auth client
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the Google Spreadsheet
    const doc = new GoogleSpreadsheet(GOOGLE_SHEETS_ID, serviceAccountAuth);
    await doc.loadInfo();

    let sheet;
    let rowData;

    if (formType === 'customer') {
      // Get or create the Customers sheet
      sheet = doc.sheetsByTitle['Customers'] || await doc.addSheet({ 
        title: 'Customers',
        headerValues: ['Timestamp', 'Name', 'Email', 'Phone', 'Postcode', 'Job Description', 'Budget', 'Status']
      });

      rowData = {
        'Timestamp': new Date().toISOString(),
        'Name': data.name || '',
        'Email': data.email || '',
        'Phone': data.phone || '',
        'Postcode': data.postcode || '',
        'Job Description': data.jobDescription || '',
        'Budget': data.budget || '',
        'Status': 'New'
      };
    } else if (formType === 'trade') {
      // Get or create the Trades sheet
      sheet = doc.sheetsByTitle['Trades'] || await doc.addSheet({ 
        title: 'Trades',
        headerValues: ['Timestamp', 'Business Name', 'Contact Name', 'Email', 'Phone', 'Services Offered', 'Coverage Area', 'Selected Plan', 'Status']
      });

      rowData = {
        'Timestamp': new Date().toISOString(),
        'Business Name': data.businessName || '',
        'Contact Name': data.contactName || '',
        'Email': data.email || '',
        'Phone': data.phone || '',
        'Services Offered': data.servicesOffered || '',
        'Coverage Area': data.coverageArea || '',
        'Selected Plan': data.selectedPlan || '',
        'Status': 'New'
      };
    } else {
      throw new Error('Invalid form type');
    }

    // Add the row to the sheet
    await sheet.addRow(rowData);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Data submitted successfully' 
      })
    };

  } catch (error) {
    console.error('Google Sheets submission error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        error: 'Failed to submit data',
        details: error.message 
      })
    };
  }
};
