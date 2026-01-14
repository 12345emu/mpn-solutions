import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { getApiBase } from './config'
import npmLogo from './assets/npm.png'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      service: e.target.service.value,
      message: e.target.message.value,
    }

    try {
      const apiBase = getApiBase()
      const apiUrl = apiBase + 'submit_contact.php'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setFormStatus({ type: 'success', message: data.message })
    e.target.reset()
        // Scroll to form to show success message
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      } else {
        setFormStatus({ type: 'error', message: data.message || 'An error occurred. Please try again.' })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      const errorMessage = error.message || 'Network error. Please check your connection and try again.'
      setFormStatus({ type: 'error', message: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <img src={npmLogo} alt="MPN Solutions" className="logo-image" />
            <span className="logo-text">MPN</span>
            <span className="logo-subtitle">Solutions</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Home</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Services</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
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
            <button className="btn-primary" onClick={() => scrollToSection('services')}>
              Our Services
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
              Get Started
            </button>
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

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Tailored management solutions for every industry. Same expertise, different names to match your industry's language.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎭</div>
              <h3 className="service-title">Business Manager</h3>
              <p className="service-industry">Entertainment • Influencers • Creative Arts</p>
              <p className="service-description">
                For actors, musicians, designers, influencers, and freelancers. We handle contracts, invoices, negotiations, and ensure you get paid on time.
              </p>
              <ul className="service-features">
                <li>Contract Management</li>
                <li>Invoice Processing</li>
                <li>Payment Collection</li>
                <li>Client Negotiations</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3 className="service-title">Commercial Manager</h3>
              <p className="service-industry">Contractors • Tradespeople • Service Agencies</p>
              <p className="service-description">
                Revenue partnership for contractors and service providers. We manage your contracts and ensure timely payments from clients.
              </p>
              <ul className="service-features">
                <li>Contract Administration</li>
                <li>Payment Assurance</li>
                <li>Client Relationship Management</li>
                <li>Revenue Optimization</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3 className="service-title">Contract Administrator</h3>
              <p className="service-industry">All Industries</p>
              <p className="service-description">
                Expert handling of paperwork, terms, and contract details. We ensure your agreements are clear, fair, and protect your interests.
              </p>
              <ul className="service-features">
                <li>Contract Review & Drafting</li>
                <li>Terms Negotiation</li>
                <li>Legal Compliance</li>
                <li>Document Management</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3 className="service-title">Booking Agent / Representative</h3>
              <p className="service-industry">All Industries</p>
              <p className="service-description">
                Professional representation to your clients and buyers. We act as your trusted intermediary, handling communications and securing opportunities.
              </p>
              <ul className="service-features">
                <li>Client Representation</li>
                <li>Opportunity Sourcing</li>
                <li>Professional Mediation</li>
                <li>Business Development</li>
              </ul>
            </div>

            <div className="service-card featured">
              <div className="service-icon">🏢</div>
              <h3 className="service-title">Property Management</h3>
              <p className="service-industry">Commercial • Residential Properties</p>
              <p className="service-description">
                Comprehensive management for property owners. We handle everything from tenant relations to maintenance, ensuring your properties generate sustainable returns.
              </p>
              <ul className="service-features">
                <li>Tenant Management</li>
                <li>Maintenance Coordination</li>
                <li>Financial Reporting</li>
                <li>Property Optimization</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3 className="service-title">Business Management</h3>
              <p className="service-industry">Startups • SMEs • Entrepreneurs</p>
              <p className="service-description">
                End-to-end management for growing businesses. From operations to growth strategy, we help you scale sustainably.
              </p>
              <ul className="service-features">
                <li>Operations Management</li>
                <li>Growth Strategy</li>
                <li>Financial Planning</li>
                <li>Scalability Consulting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About MPN Solutions</h2>
              <p className="about-description">
                Founded by Massa P. Nimely, MPN Solutions is a solid management company dedicated to helping creatives, property owners, influencers, contractors, tradespeople, and service agents achieve sustainable growth and durability.
              </p>
              <p className="about-description">
                We understand that different industries speak different languages. That's why we offer the same expert services under names that resonate with your industry—whether you need a Business Manager, Commercial Manager, Contract Administrator, or Booking Agent.
              </p>
              <p className="about-description">
                Our core mission remains consistent: handle your contracts, manage your invoices, negotiate on your behalf, and ensure you get paid. We take care of the business side so you can focus on what you do best.
              </p>
              <div className="about-values">
                <div className="value-item">
                  <h4>Reliability</h4>
                  <p>Consistent, dependable service you can count on</p>
                </div>
                <div className="value-item">
                  <h4>Expertise</h4>
                  <p>Deep industry knowledge across multiple sectors</p>
                </div>
                <div className="value-item">
                  <h4>Results</h4>
                  <p>Proven track record of successful payment collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to achieve sustainable growth? Let's discuss how MPN Solutions can help your business thrive.
            </p>
          </div>
          <div className="contact-content">
            <form className="contact-form" onSubmit={handleSubmit}>
              {formStatus.message && (
                <div className={`form-message ${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your.email@example.com" required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+1 (555) 123-4567" required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interest</label>
                <select id="service" name="service" required disabled={isSubmitting}>
                  <option value="">Select a service</option>
                  <option value="business-manager">Business Manager</option>
                  <option value="commercial-manager">Commercial Manager</option>
                  <option value="contract-administrator">Contract Administrator</option>
                  <option value="booking-agent">Booking Agent / Representative</option>
                  <option value="property-management">Property Management</option>
                  <option value="business-management">Business Management</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell us about your needs..." required disabled={isSubmitting}></textarea>
              </div>
              
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={npmLogo} alt="MPN Solutions" className="logo-image" />
              <span className="logo-text">MPN</span>
              <span className="logo-subtitle">Solutions</span>
            </div>
            <p className="footer-text">
              Helping businesses achieve sustainable growth and durability through expert management.
            </p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} MPN Solutions. All rights reserved.
            </p>
      </div>
        </div>
      </footer>
    </div>
  )
}

export default App
