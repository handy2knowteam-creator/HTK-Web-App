import React from "react";

export default function LandingPageDeployment() {
  return (
    <main style={styles.page}>
      {/* Nav */}
      <header style={styles.header}>
        <div style={styles.wrap}>
          <div style={styles.logoWrap}>
            <span style={styles.logoMark}>HTK</span>
            <span style={styles.logoText}>HTK — Connecting Local Trades</span>
          </div>
          <nav style={styles.nav}>
            <a href="#for-customers" style={styles.link}>Customers</a>
            <a href="#for-trades" style={styles.link}>Trades</a>
            <a href="#contact" style={styles.link}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={styles.section}>
        <div style={styles.wrap}>
          <h1 style={styles.h1}>Find & Hire Local Trades Instantly</h1>
          <p style={styles.lead}>
            HTK (Handy To Know) connects customers to trusted local tradespeople.
            Built by trades, for trades. Fair pricing, authentic relationships.
          </p>
          <div style={styles.ctaRow}>
            <a href="#for-customers" style={{...styles.btn, ...styles.btnGold}}>Post a Job</a>
            <a href="#for-trades" style={{...styles.btn, ...styles.btnGhost}}>Join as a Trade</a>
          </div>
        </div>
      </section>

      {/* Customers: Post a Job */}
      <section id="for-customers" style={styles.section}>
        <div style={styles.wrap}>
          <h2 style={styles.h2}>Customers: Post a Job</h2>
          <div style={styles.card}>
            <form
              action="https://formsubmit.co/handy2knowteam@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New Customer Job via HTK" />
              <input type="hidden" name="_next" value="https://htk-platform.netlify.app/thank-you" />
              <input type="hidden" name="_captcha" value="false" />
              <input style={styles.input} type="text"   name="name"     placeholder="Your name" required />
              <input style={styles.input} type="email"  name="email"    placeholder="Your email" required />
              <input style={styles.input} type="text"   name="location" placeholder="Location" required />
              <input style={styles.input} type="text"   name="phone"    placeholder="Phone number" />
              <textarea style={styles.textarea} name="job" rows="5" placeholder="Describe the job you need done..." required />
              <button type="submit" style={{...styles.btn, ...styles.btnGold}}>Submit Job Request</button>
            </form>
          </div>
        </div>
      </section>

      {/* Trades: Sign Up */}
      <section id="for-trades" style={styles.section}>
        <div style={styles.wrap}>
          <h2 style={styles.h2}>Trades: Join HTK</h2>
          <div style={styles.card}>
            <form
              action="https://formsubmit.co/handy2knowteam@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New Trade Signup via HTK" />
              <input type="hidden" name="_next" value="https://htk-platform.netlify.app/thank-you" />
              <input type="hidden" name="_captcha" value="false" />
              <input style={styles.input} type="text"  name="trade_name" placeholder="Business/Trade Name" required />
              <input style={styles.input} type="email" name="email"      placeholder="Email" required />
              <input style={styles.input} type="text"  name="phone"      placeholder="Phone" required />
              <input style={styles.input} type="text"  name="location"   placeholder="Service Area" required />
              <input style={styles.input} type="text"  name="trade_type" placeholder="Trade Type (Plumbing, Electrical, etc.)" required />
              <textarea style={styles.textarea} name="experience" rows="3" placeholder="Brief description of your experience and services..." />
              <button type="submit" style={{...styles.btn, ...styles.btnGold}}>Join HTK Platform</button>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={styles.section}>
        <div style={styles.wrap}>
          <h2 style={styles.h2}>Why Choose HTK?</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.feature}>
              <h3 style={styles.featureTitle}>Built by Trades</h3>
              <p style={styles.featureText}>Created by tradespeople who understand the industry challenges</p>
            </div>
            <div style={styles.feature}>
              <h3 style={styles.featureTitle}>Fair Platform</h3>
              <p style={styles.featureText}>Transparent pricing and honest connections between trades and customers</p>
            </div>
            <div style={styles.feature}>
              <h3 style={styles.featureTitle}>Community First</h3>
              <p style={styles.featureText}>50% of profits after £100k go back to local communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Legal */}
      <section id="contact" style={styles.section}>
        <div style={styles.wrap}>
          <h2 style={styles.h2}>Contact & Legal</h2>
          <p style={styles.contactText}>
            Email:{" "}
            <a href="mailto:handy2knowteam@gmail.com" style={styles.link}>
              handy2knowteam@gmail.com
            </a>
          </p>
          <p style={styles.contactText}>
            <a href="/privacy" style={styles.link}>Privacy Policy</a>{" "}
            |{" "}
            <a href="/terms" style={styles.link}>Terms of Service</a>
          </p>
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
    position: "sticky", 
    top: 0, 
    zIndex: 20, 
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
    justifyContent: "space-between"
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
  nav: { 
    display: "flex", 
    gap: 24 
  },
  link: { 
    color: "#B9975B", 
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.3s ease"
  },
  section: { 
    padding: "60px 0", 
    borderBottom: "1px solid rgba(255,255,255,.06)" 
  },
  h1: { 
    fontSize: "clamp(32px, 5vw, 64px)", 
    lineHeight: 1.1, 
    margin: "0 0 20px 0",
    background: "linear-gradient(135deg, #B9975B, #C7A66B)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 800
  },
  lead: { 
    color: "#DCDCDC", 
    maxWidth: 600, 
    margin: "0 0 30px 0",
    fontSize: "20px",
    lineHeight: 1.6
  },
  h2: { 
    margin: "0 0 30px 0", 
    fontSize: 32,
    color: "#B9975B",
    fontWeight: 700
  },
  card: { 
    background: "#111", 
    border: "1px solid rgba(185,151,91,.2)", 
    borderRadius: 16, 
    padding: 32, 
    boxShadow: "0 8px 32px rgba(0,0,0,.4)",
    maxWidth: 600
  },
  input: { 
    width: "100%", 
    padding: 16, 
    marginBottom: 16, 
    background: "#222", 
    border: "1px solid rgba(185,151,91,.4)", 
    borderRadius: 8, 
    color: "#fff",
    fontSize: "16px",
    boxSizing: "border-box"
  },
  textarea: { 
    width: "100%", 
    padding: 16, 
    marginBottom: 16, 
    background: "#222", 
    border: "1px solid rgba(185,151,91,.4)", 
    borderRadius: 8, 
    color: "#fff", 
    resize: "vertical",
    fontSize: "16px",
    fontFamily: "inherit",
    boxSizing: "border-box"
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
  btnGhost: { 
    background: "transparent", 
    color: "#B9975B", 
    border: "2px solid #B9975B" 
  },
  ctaRow: { 
    display: "flex", 
    gap: 16, 
    flexWrap: "wrap" 
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 32,
    marginTop: 40
  },
  feature: {
    background: "#111",
    border: "1px solid rgba(185,151,91,.2)",
    borderRadius: 12,
    padding: 24
  },
  featureTitle: {
    color: "#B9975B",
    fontSize: "20px",
    fontWeight: 600,
    margin: "0 0 12px 0"
  },
  featureText: {
    color: "#DCDCDC",
    lineHeight: 1.6,
    margin: 0
  },
  contactText: {
    fontSize: "16px",
    lineHeight: 1.6,
    margin: "0 0 12px 0"
  },
  footer: { 
    textAlign: "center", 
    padding: "40px 0", 
    color: "#999",
    background: "#111",
    borderTop: "1px solid rgba(185,151,91,.2)"
  }
};
