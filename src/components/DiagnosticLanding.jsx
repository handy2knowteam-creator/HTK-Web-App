export default function DiagnosticLanding() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#B9975B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        HTK - Handy To Know
      </h1>
      
      <p style={{
        fontSize: '1.5rem',
        marginBottom: '30px',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Built by Trades, for Trades
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '800px',
        width: '100%',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid #B9975B',
          borderRadius: '10px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#B9975B', marginBottom: '15px' }}>For Customers</h3>
          <p style={{ marginBottom: '20px' }}>Find skilled tradespeople for your projects</p>
          <button style={{
            backgroundColor: '#B9975B',
            color: '#000',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Post a Job
          </button>
        </div>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid #B9975B',
          borderRadius: '10px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#B9975B', marginBottom: '15px' }}>For Tradespeople</h3>
          <p style={{ marginBottom: '20px' }}>Join our community and find work</p>
          <button style={{
            backgroundColor: '#B9975B',
            color: '#000',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Join HTK
          </button>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <p style={{ marginBottom: '10px' }}>Platform Status: <span style={{ color: '#00ff00' }}>ONLINE</span></p>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          React App Loading Successfully - {new Date().toLocaleString()}
        </p>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#B9975B',
        color: '#000',
        padding: '10px 15px',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        HTK Beta 2026
      </div>
    </div>
  )
}
