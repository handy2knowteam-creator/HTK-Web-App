import React from "react";

export default function ThankYouSimple() {
  return (
    <main style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.wrap}>
          <div style={styles.logoWrap}>
            <span style={styles.logoMark}>HTK</span>
            <span style={styles.logoText}>HTK — Connecting Local Trades</span>
          </div>
        </div>
      </header>

      {/* Thank You Content */}
      <section style={styles.section}>
        <div style={styles.wrap}>
          <div style={styles.thankYouCard}>
            <div style={styles.checkmark}>✓</div>
            <h1 style={styles.h1}>Thank You!</h1>
            <p style={styles.message}>
              Your submission has been received successfully. We'll get back to you within 24 hours.
            </p>
            <div style={styles.ctaRow}>
              <a href="/" style={{...styles.btn, ...styles.btnGold}}>Back to Home</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.wrap}>
          <p>© 2024 HTK — Handy To Know. Built by trades, for trades.</p>
        </div>
      </footer>
    </main>
  );
}

const styles = {
  page: { 
    background: "#000", 
    color: "#F4F4F4", 
    fontFamily: "Inter, system-ui, sans-serif",
    minHeight: "100vh",
    margin: 0,
    padding: 0
  },
  header: { 
    background: "rgba(0,0,0,.9)", 
    backdropFilter: "blur(10px)", 
    borderBottom: "1px solid rgba(185,151,91,.3)" 
  },
  wrap: { 
    maxWidth: 1200, 
    margin: "0 auto", 
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  logoWrap: { 
    display: "flex", 
    alignItems: "center", 
    gap: 12, 
    height: 64, 
    fontWeight: 700, 
    letterSpacing: 0.5 
  },
  logoMark: { 
    width: 40, 
    height: 40, 
    display: "grid", 
    placeItems: "center", 
    borderRadius: 8, 
    background: "linear-gradient(135deg, #B9975B, #A0804B)", 
    color: "#000", 
    fontWeight: 900,
    fontSize: "14px"
  },
  logoText: {
    color: "#B9975B",
    fontSize: "18px"
  },
  section: { 
    padding: "80px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh"
  },
  thankYouCard: {
    background: "#111",
    border: "1px solid rgba(185,151,91,.2)",
    borderRadius: 16,
    padding: 48,
    textAlign: "center",
    maxWidth: 500,
    boxShadow: "0 8px 32px rgba(0,0,0,.4)"
  },
  checkmark: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #B9975B, #A0804B)",
    color: "#000",
    fontSize: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px auto",
    fontWeight: "bold"
  },
  h1: { 
    fontSize: 36, 
    margin: "0 0 20px 0",
    color: "#B9975B",
    fontWeight: 700
  },
  message: {
    fontSize: 18,
    lineHeight: 1.6,
    color: "#DCDCDC",
    margin: "0 0 32px 0"
  },
  btn: { 
    display: "inline-block", 
    padding: "16px 24px", 
    borderRadius: 8, 
    border: "none", 
    fontWeight: 700, 
    textDecoration: "none", 
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease"
  },
  btnGold: { 
    background: "linear-gradient(45deg, #A0804B, #B9975B, #A0804B)", 
    color: "#000"
  },
  ctaRow: { 
    display: "flex", 
    gap: 16, 
    flexWrap: "wrap",
    justifyContent: "center"
  },
  footer: { 
    textAlign: "center", 
    padding: "40px 0", 
    color: "#999",
    background: "#111",
    borderTop: "1px solid rgba(185,151,91,.2)"
  }
};
