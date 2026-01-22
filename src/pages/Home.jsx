import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getApiBase } from '../config'
import './Home.css'

function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-logo-wrapper">
              <div className="hero-logo">
                    <img src="/npm.jpeg" alt="MPN Solutions" className="hero-logo-image" />
              </div>
            </div>
            <h1 className="hero-company-name">MPN Solutions</h1>
            <p className="hero-tagline">Unlock Your Potential.</p>
            <p className="hero-description">
              Helping creatives, property owners, influencers, contractors, and businesses achieve sustainable growth through expert management services.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn-primary">
                Get Started
              </Link>
              <Link to="/services" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-graphic">
            <div className="graphic-container">
              <svg viewBox="0 0 600 500" className="hero-svg-graphic">
                {/* Bar Chart */}
                <g className="graphic-element" style={{ animationDelay: '0s' }}>
                  <rect x="50" y="200" width="40" height="120" fill="url(#goldGradient)" rx="4" opacity="0.9" />
                  <rect x="110" y="150" width="40" height="170" fill="url(#goldGradient)" rx="4" opacity="0.9" />
                  <rect x="170" y="100" width="40" height="220" fill="url(#goldGradient)" rx="4" opacity="0.9" />
                  <rect x="230" y="180" width="40" height="140" fill="url(#goldGradient)" rx="4" opacity="0.9" />
                </g>
                
                {/* Gear Icon */}
                <g className="graphic-element" style={{ animationDelay: '0.2s' }}>
                  <circle cx="450" cy="150" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="3" opacity="0.8" />
                  <circle cx="450" cy="150" r="8" fill="url(#goldGradient)" opacity="0.9" />
                  <path d="M450 120 L450 115 M450 180 L450 185 M420 150 L415 150 M485 150 L490 150" 
                        stroke="url(#goldGradient)" strokeWidth="2" opacity="0.7" />
                </g>
                
                {/* Document with Checkmark */}
                <g className="graphic-element" style={{ animationDelay: '0.4s' }}>
                  <rect x="400" y="250" width="60" height="80" fill="url(#charcoalGradient)" rx="4" opacity="0.8" />
                  <line x1="415" y1="270" x2="440" y2="270" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.6" />
                  <line x1="415" y1="285" x2="440" y2="285" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.6" />
                  <path d="M420 305 L430 315 L445 295" stroke="url(#goldGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                
                {/* Star Rating */}
                <g className="graphic-element" style={{ animationDelay: '0.6s' }}>
                  <path d="M100 350 L115 365 L135 370 L120 385 L115 405 L100 395 L85 405 L80 385 L65 370 L85 365 Z" 
                        fill="url(#goldGradient)" opacity="0.9" />
                  <path d="M140 350 L155 365 L175 370 L160 385 L155 405 L140 395 L125 405 L120 385 L105 370 L125 365 Z" 
                        fill="url(#goldGradient)" opacity="0.9" />
                  <path d="M180 350 L195 365 L215 370 L200 385 L195 405 L180 395 L165 405 L160 385 L145 370 L165 365 Z" 
                        fill="url(#goldGradient)" opacity="0.9" />
                  <path d="M220 350 L235 365 L255 370 L240 385 L235 405 L220 395 L205 405 L200 385 L185 370 L205 365 Z" 
                        fill="url(#goldGradient)" opacity="0.9" />
                  <path d="M260 350 L275 365 L295 370 L280 385 L275 405 L260 395 L245 405 L240 385 L225 370 L245 365 Z" 
                        fill="url(#goldGradient)" opacity="0.5" />
                </g>
                
                {/* Lightbulb */}
                <g className="graphic-element" style={{ animationDelay: '0.8s' }}>
                  <path d="M480 320 Q480 300 460 300 Q440 300 440 320 Q440 340 460 350 L460 380 L480 380 L480 350 Q500 340 500 320 Q500 300 480 300" 
                        fill="url(#goldGradient)" opacity="0.8" />
                  <rect x="465" y="380" width="10" height="15" fill="url(#charcoalGradient)" opacity="0.7" />
                </g>
                
                {/* Abstract Lines */}
                <g className="graphic-element" style={{ animationDelay: '1s' }}>
                  <line x1="300" y1="100" x2="350" y2="150" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.4" />
                  <line x1="320" y1="120" x2="370" y2="170" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.4" />
                  <circle cx="300" cy="100" r="8" fill="url(#goldGradient)" opacity="0.6" />
                  <circle cx="350" cy="150" r="8" fill="url(#goldGradient)" opacity="0.6" />
                </g>
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FCD34D" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                  <linearGradient id="charcoalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#374151" />
                    <stop offset="100%" stopColor="#1f2937" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <div className="stat-label">Clients Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$10M+</div>
            <div className="stat-label">Revenue Managed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Payment Success Rate</div>
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="services-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Tailored management solutions for every industry
            </p>
          </div>
          <div className="services-grid-preview">
            <div className="service-card-preview">
              <div className="service-icon">🎭</div>
              <h3>Business Manager</h3>
              <p>For actors, musicians, designers, influencers, and freelancers</p>
              <Link to="/services" className="service-link">Learn More →</Link>
            </div>
            <div className="service-card-preview">
              <div className="service-icon">🏢</div>
              <h3>Property Management</h3>
              <p>Comprehensive management for property owners</p>
              <Link to="/services" className="service-link">Learn More →</Link>
            </div>
            <div className="service-card-preview">
              <div className="service-icon">🚀</div>
              <h3>Business Management</h3>
              <p>End-to-end management for growing businesses</p>
              <Link to="/services" className="service-link">Learn More →</Link>
            </div>
          </div>
          <div className="services-preview-cta">
            <Link to="/services" className="btn-primary">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

