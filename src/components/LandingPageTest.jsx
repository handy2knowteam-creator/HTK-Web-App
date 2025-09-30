import { useNavigate } from 'react-router-dom'

export default function LandingPageTest() {
  const navigate = useNavigate()

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#000000', 
      color: '#B9975B',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ marginTop: '100px' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#B9975B'
        }}>
          HTK
        </h1>
        
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '20px',
          color: '#ffffff'
        }}>
          Handy To Know
        </h2>
        
        <p style={{ 
          fontSize: '1.5rem', 
          marginBottom: '40px',
          color: '#cccccc'
        }}>
          Built by trades, for trades
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/register/customer')}
            style={{
              background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
              color: '#000000',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Find Tradespeople
          </button>
          
          <button
            onClick={() => navigate('/register/tradesperson')}
            style={{
              background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
              color: '#000000',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Join as Tradesperson
          </button>
        </div>
        
        <div style={{ marginTop: '60px' }}>
          <h3 style={{ color: '#B9975B', marginBottom: '20px' }}>Platform Status</h3>
          <p style={{ color: '#ffffff' }}>✅ React App Loading Successfully</p>
          <p style={{ color: '#ffffff' }}>✅ Routing Working</p>
          <p style={{ color: '#ffffff' }}>✅ Styling Applied</p>
          <p style={{ color: '#ffffff' }}>🚀 Ready for handy2know.com</p>
        </div>
      </div>
    </div>
  )
}
