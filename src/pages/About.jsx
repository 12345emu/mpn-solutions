import './About.css'

function About() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="page-hero-background"></div>
        <div className="page-hero-content">
          <div className="page-hero-text">
            <h1>About MPN Solutions</h1>
            <p>Your trusted partner for sustainable business growth</p>
          </div>
          <div className="page-hero-graphic">
            <svg viewBox="0 0 600 400" className="page-hero-svg">
              {/* Partnership/Team Graphics */}
              <g className="graphic-element" style={{ animationDelay: '0s' }}>
                <circle cx="150" cy="150" r="50" fill="url(#aboutGoldGradient)" opacity="0.8" />
                <circle cx="150" cy="150" r="30" fill="url(#aboutCharcoalGradient)" opacity="0.6" />
                <path d="M150 120 L150 100 M150 180 L150 200 M120 150 L100 150 M180 150 L200 150" 
                      stroke="url(#aboutCharcoalGradient)" strokeWidth="2" opacity="0.7" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.2s' }}>
                <rect x="280" y="100" width="100" height="120" rx="8" fill="url(#aboutCharcoalGradient)" opacity="0.8" />
                <circle cx="330" cy="140" r="20" fill="url(#aboutGoldGradient)" opacity="0.9" />
                <rect x="300" y="170" width="60" height="8" rx="4" fill="url(#aboutGoldGradient)" opacity="0.7" />
                <rect x="300" y="185" width="45" height="8" rx="4" fill="url(#aboutGoldGradient)" opacity="0.7" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.4s' }}>
                <path d="M450 150 L480 200 L420 200 Z" fill="url(#aboutGoldGradient)" opacity="0.9" />
                <path d="M440 180 L460 180 M450 170 L450 190" stroke="url(#aboutCharcoalGradient)" strokeWidth="2" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.6s' }}>
                <path d="M100 280 Q150 250 200 280 T300 280" stroke="url(#aboutGoldGradient)" strokeWidth="4" fill="none" opacity="0.8" />
                <circle cx="100" cy="280" r="8" fill="url(#aboutGoldGradient)" />
                <circle cx="200" cy="280" r="8" fill="url(#aboutGoldGradient)" />
                <circle cx="300" cy="280" r="8" fill="url(#aboutGoldGradient)" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.8s' }}>
                <rect x="350" y="250" width="80" height="100" rx="6" fill="url(#aboutCharcoalGradient)" opacity="0.7" />
                <line x1="370" y1="280" x2="410" y2="280" stroke="url(#aboutGoldGradient)" strokeWidth="2" opacity="0.6" />
                <line x1="370" y1="300" x2="410" y2="300" stroke="url(#aboutGoldGradient)" strokeWidth="2" opacity="0.6" />
                <line x1="370" y1="320" x2="400" y2="320" stroke="url(#aboutGoldGradient)" strokeWidth="2" opacity="0.6" />
                <path d="M375 335 L390 350 L415 325" stroke="url(#aboutGoldGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '1s' }}>
                <circle cx="500" cy="300" r="35" fill="none" stroke="url(#aboutGoldGradient)" strokeWidth="3" opacity="0.8" />
                <path d="M500 275 L500 265 M500 325 L500 335 M475 300 L465 300 M525 300 L535 300" 
                      stroke="url(#aboutGoldGradient)" strokeWidth="2" opacity="0.7" />
                <circle cx="500" cy="300" r="8" fill="url(#aboutGoldGradient)" opacity="0.9" />
              </g>
              
              <defs>
                <linearGradient id="aboutGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="aboutCharcoalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#1f2937" />
                </linearGradient>
              </defs>
            </svg>
          </div>
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

