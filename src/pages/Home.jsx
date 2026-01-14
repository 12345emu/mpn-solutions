import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getApiBase } from '../config'
import npmLogo from '../assets/npm.png'
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
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight">Sustainable Growth</span>
            <br />
            Through Expert Management
          </h1>
          <p className="hero-subtitle">
            MPN Solutions helps creatives, property owners, influencers, contractors, and businesses achieve sustainable growth and durability through professional management services.
          </p>
          <div className="hero-buttons">
            <Link to="/services" className="btn-primary">
              Our Services
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get Started
            </Link>
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

