import { useState } from 'react'
import { getApiBase } from '../config'
import './Contact.css'

function Contact() {
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      } else {
        setFormStatus({ type: 'error', message: data.message || 'An error occurred. Please try again.' })
      }
    } catch (error) {
      const errorMessage = error.message || 'Network error. Please check your connection and try again.'
      setFormStatus({ type: 'error', message: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="page-hero-background"></div>
        <div className="page-hero-content">
          <div className="page-hero-text">
            <h1>Get In Touch</h1>
            <p>Ready to achieve sustainable growth? Let's discuss how MPN Solutions can help your business thrive.</p>
          </div>
          <div className="page-hero-graphic">
            <svg viewBox="0 0 600 400" className="page-hero-svg">
              {/* Communication Graphics */}
              <g className="graphic-element" style={{ animationDelay: '0s' }}>
                <rect x="50" y="150" width="100" height="80" rx="8" fill="url(#contactCharcoalGradient)" opacity="0.8" />
                <line x1="70" y1="170" x2="130" y2="170" stroke="url(#contactGoldGradient)" strokeWidth="2" opacity="0.6" />
                <line x1="70" y1="190" x2="130" y2="190" stroke="url(#contactGoldGradient)" strokeWidth="2" opacity="0.6" />
                <line x1="70" y1="210" x2="110" y2="210" stroke="url(#contactGoldGradient)" strokeWidth="2" opacity="0.6" />
                <path d="M75 220 L90 235 L115 210" stroke="url(#contactGoldGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.2s' }}>
                <circle cx="250" cy="140" r="45" fill="url(#contactGoldGradient)" opacity="0.8" />
                <path d="M250 110 L250 100 M250 170 L250 180 M220 140 L210 140 M280 140 L290 140" 
                      stroke="url(#contactCharcoalGradient)" strokeWidth="2" opacity="0.7" />
                <circle cx="250" cy="140" r="12" fill="url(#contactCharcoalGradient)" opacity="0.8" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.4s' }}>
                <path d="M400 120 Q430 100 460 120 T520 120" stroke="url(#contactGoldGradient)" strokeWidth="4" fill="none" opacity="0.9" />
                <circle cx="400" cy="120" r="8" fill="url(#contactGoldGradient)" />
                <circle cx="460" cy="120" r="8" fill="url(#contactGoldGradient)" />
                <circle cx="520" cy="120" r="8" fill="url(#contactGoldGradient)" />
                <path d="M410 110 L420 100 L430 110" fill="url(#contactGoldGradient)" opacity="0.7" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.6s' }}>
                <rect x="100" y="280" width="120" height="90" rx="8" fill="url(#contactCharcoalGradient)" opacity="0.7" />
                <circle cx="140" cy="310" r="15" fill="url(#contactGoldGradient)" opacity="0.9" />
                <path d="M140 295 L140 285 M140 325 L140 335 M125 310 L115 310 M155 310 L165 310" 
                      stroke="url(#contactCharcoalGradient)" strokeWidth="2" opacity="0.6" />
                <line x1="120" y1="340" x2="200" y2="340" stroke="url(#contactGoldGradient)" strokeWidth="2" opacity="0.6" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.8s' }}>
                <path d="M350 250 L380 300 L320 300 Z" fill="url(#contactGoldGradient)" opacity="0.9" />
                <circle cx="350" cy="250" r="10" fill="url(#contactCharcoalGradient)" />
                <line x1="340" y1="280" x2="360" y2="280" stroke="url(#contactCharcoalGradient)" strokeWidth="2" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '1s' }}>
                <rect x="450" y="250" width="80" height="100" rx="6" fill="url(#contactCharcoalGradient)" opacity="0.7" />
                <circle cx="490" cy="280" r="12" fill="url(#contactGoldGradient)" opacity="0.9" />
                <line x1="470" y1="310" x2="510" y2="310" stroke="url(#contactGoldGradient)" strokeWidth="2" opacity="0.6" />
                <line x1="470" y1="330" x2="510" y2="330" stroke="url(#contactGoldGradient)" strokeWidth="2" opacity="0.6" />
                <path d="M475 345 L490 360 L505 345" stroke="url(#contactGoldGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
              
              <defs>
                <linearGradient id="contactGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="contactCharcoalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#1f2937" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="contact-info-header">
                <h2>Contact Information</h2>
                <p>We're here to help you achieve sustainable growth. Reach out to us through any of the channels below.</p>
              </div>
              
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="contact-card-content">
                    <h3>Email Us</h3>
                    <p>info@mpnsolutions.com</p>
                    <a href="mailto:info@mpnsolutions.com" className="contact-action-link">
                      Send Email
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="contact-card-content">
                    <h3>Call Us</h3>
                    <p>+1 (555) 123-4567</p>
                    <a href="tel:+15551234567" className="contact-action-link">
                      Call Now
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h3>Business Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span className="hours-day">Monday - Friday</span>
                    <span className="hours-time">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="hours-day">Saturday</span>
                    <span className="hours-time">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="hours-day">Sunday</span>
                    <span className="hours-time">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {formStatus.message && (
                <div className={`form-message ${formStatus.type}`}>
                  <svg className="message-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {formStatus.type === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <span>{formStatus.message}</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      required 
                      disabled={isSubmitting} 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="john.doe@example.com" 
                      required 
                      disabled={isSubmitting} 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="+1 (555) 123-4567" 
                      required 
                      disabled={isSubmitting} 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">
                      <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Service Interest
                    </label>
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
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Your Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="6" 
                    placeholder="Tell us about your business needs and how we can help..." 
                    required 
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="spinner" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
