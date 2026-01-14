import './About.css'

function About() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About MPN Solutions</h1>
          <p>Your trusted partner for sustainable business growth</p>
        </div>
      </section>

      <section className="about-content-section">
        <div className="container">
          <div className="about-main">
            <div className="about-text">
              <h2>Our Story</h2>
              <p className="about-description">
                Founded by Massa P. Nimely, MPN Solutions is a solid management company dedicated to helping creatives, property owners, influencers, contractors, tradespeople, and service agents achieve sustainable growth and durability.
              </p>
              <p className="about-description">
                We understand that different industries speak different languages. That's why we offer the same expert services under names that resonate with your industry—whether you need a Business Manager, Commercial Manager, Contract Administrator, or Booking Agent.
              </p>
              <p className="about-description">
                Our core mission remains consistent: handle your contracts, manage your invoices, negotiate on your behalf, and ensure you get paid. We take care of the business side so you can focus on what you do best.
              </p>
            </div>
          </div>

          <div className="about-values">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">✓</div>
                <h4>Reliability</h4>
                <p>Consistent, dependable service you can count on</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🎯</div>
                <h4>Expertise</h4>
                <p>Deep industry knowledge across multiple sectors</p>
              </div>
              <div className="value-item">
                <div className="value-icon">📈</div>
                <h4>Results</h4>
                <p>Proven track record of successful payment collection</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h4>Partnership</h4>
                <p>We work as an extension of your team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

