import { useState, useEffect } from 'react'
import { getApiBase } from '../config'
import './Services.css'

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'get_public_services.php')
      const data = await response.json()

      if (data.success) {
        setServices(data.data)
      }
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleServiceClick = (service) => {
    setSelectedService(service)
    setIsDetailModalOpen(true)
    setFormStatus({ type: '', message: '' })
  }

  const handleBookService = () => {
    setIsDetailModalOpen(false)
    setIsBookingModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedService(null)
  }

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false)
    setSelectedService(null)
    setFormStatus({ type: '', message: '' })
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      service: selectedService.name,
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
        setFormStatus({ type: 'success', message: data.message || 'Booking request submitted successfully! We will contact you soon.' })
        e.target.reset()
        setTimeout(() => {
          handleCloseBookingModal()
        }, 2000)
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
    <div className="services-page">
      <section className="page-hero">
        <div className="page-hero-background"></div>
        <div className="page-hero-content">
          <div className="page-hero-text">
            <h1>Our Services</h1>
            <p>Tailored management solutions for every industry. Same expertise, different names to match your industry's language.</p>
          </div>
          <div className="page-hero-graphic">
            <svg viewBox="0 0 600 400" className="page-hero-svg">
              {/* Service Icons */}
              <g className="graphic-element" style={{ animationDelay: '0s' }}>
                <rect x="50" y="150" width="80" height="80" rx="8" fill="url(#servicesGoldGradient)" opacity="0.9" />
                <path d="M70 180 L90 200 L130 160" stroke="url(#servicesCharcoalGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.2s' }}>
                <circle cx="200" cy="120" r="40" fill="url(#servicesGoldGradient)" opacity="0.8" />
                <path d="M200 100 L200 140 M180 120 L220 120" stroke="url(#servicesCharcoalGradient)" strokeWidth="3" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.4s' }}>
                <rect x="300" y="180" width="100" height="60" rx="6" fill="url(#servicesCharcoalGradient)" opacity="0.8" />
                <line x1="320" y1="200" x2="380" y2="200" stroke="url(#servicesGoldGradient)" strokeWidth="2" opacity="0.7" />
                <line x1="320" y1="215" x2="360" y2="215" stroke="url(#servicesGoldGradient)" strokeWidth="2" opacity="0.7" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.6s' }}>
                <path d="M450 150 L480 200 L420 200 Z" fill="url(#servicesGoldGradient)" opacity="0.9" />
                <circle cx="450" cy="150" r="8" fill="url(#servicesCharcoalGradient)" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '0.8s' }}>
                <rect x="100" y="280" width="120" height="80" rx="6" fill="url(#servicesCharcoalGradient)" opacity="0.7" />
                <circle cx="130" cy="310" r="12" fill="url(#servicesGoldGradient)" opacity="0.8" />
                <circle cx="160" cy="310" r="12" fill="url(#servicesGoldGradient)" opacity="0.8" />
                <circle cx="190" cy="310" r="12" fill="url(#servicesGoldGradient)" opacity="0.8" />
              </g>
              
              <g className="graphic-element" style={{ animationDelay: '1s' }}>
                <path d="M350 280 Q380 260 410 280 T470 280" stroke="url(#servicesGoldGradient)" strokeWidth="3" fill="none" opacity="0.8" />
                <circle cx="350" cy="280" r="6" fill="url(#servicesGoldGradient)" />
                <circle cx="410" cy="280" r="6" fill="url(#servicesGoldGradient)" />
                <circle cx="470" cy="280" r="6" fill="url(#servicesGoldGradient)" />
              </g>
              
              <defs>
                <linearGradient id="servicesGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="servicesCharcoalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#1f2937" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          {loading ? (
            <div className="loading">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="no-services">
              <p>Services are being updated. Please check back soon.</p>
            </div>
          ) : (
            <div className="services-grid-full">
              {services.map(service => (
                <div 
                  key={service.id} 
                  className="service-card-full"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="service-icon-large">{service.icon}</div>
                  <h3 className="service-title">{service.name}</h3>
                  {service.industry && (
                    <p className="service-industry">{service.industry}</p>
                  )}
                  {service.description && (
                    <p className="service-description">
                      {service.description.length > 150 
                        ? service.description.substring(0, 150) + '...' 
                        : service.description}
                    </p>
                  )}
                  {service.features && (
                    <ul className="service-features">
                      {(Array.isArray(service.features) 
                        ? service.features 
                        : service.features.split(',')).slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature.trim()}</li>
                      ))}
                      {(Array.isArray(service.features) 
                        ? service.features 
                        : service.features.split(',')).length > 3 && (
                        <li className="service-features-more">+{((Array.isArray(service.features) 
                          ? service.features 
                          : service.features.split(',')).length - 3)} more features</li>
                      )}
                    </ul>
                  )}
                  <div className="service-card-footer">
                    <span className="view-details-text">Click to view details</span>
                    <svg className="view-details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Detail Modal */}
      {isDetailModalOpen && selectedService && (
        <div className="service-detail-modal-overlay" onClick={handleCloseDetailModal}>
          <div className="service-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="service-detail-modal-close" onClick={handleCloseDetailModal}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="service-detail-header">
              <div className="service-detail-icon">{selectedService.icon}</div>
              <h2>{selectedService.name}</h2>
              {selectedService.industry && (
                <p className="service-detail-industry">{selectedService.industry}</p>
              )}
            </div>

            <div className="service-detail-content">
              {selectedService.description && (
                <div className="service-detail-section">
                  <h3>About This Service</h3>
                  <p>{selectedService.description}</p>
                </div>
              )}

              {selectedService.features && (
                <div className="service-detail-section">
                  <h3>Key Features</h3>
                  <ul className="service-detail-features">
                    {(Array.isArray(selectedService.features) 
                      ? selectedService.features 
                      : selectedService.features.split(',')).map((feature, idx) => (
                      <li key={idx}>
                        <svg className="feature-check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="service-detail-cta">
                <button className="service-detail-book-btn" onClick={handleBookService}>
                  <span>Book This Service</span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && selectedService && (
        <div className="booking-modal-overlay" onClick={handleCloseBookingModal}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="booking-modal-close" onClick={handleCloseBookingModal}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="booking-modal-header">
              <div className="booking-service-icon">{selectedService.icon}</div>
              <h2>Book {selectedService.name}</h2>
              <p>Fill out the form below to request this service. We'll get back to you within 24 hours.</p>
            </div>

            {formStatus.message && (
              <div className={`booking-form-message ${formStatus.type}`}>
                <svg className="form-message-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {formStatus.type === 'success' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                <span>{formStatus.message}</span>
              </div>
            )}

            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <div className="booking-form-row">
                <div className="booking-form-group">
                  <label htmlFor="booking-name">
                    <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="booking-name" 
                    name="name" 
                    placeholder="John Doe" 
                    required 
                    disabled={isSubmitting} 
                  />
                </div>

                <div className="booking-form-group">
                  <label htmlFor="booking-email">
                    <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="booking-email" 
                    name="email" 
                    placeholder="john.doe@example.com" 
                    required 
                    disabled={isSubmitting} 
                  />
                </div>
              </div>

              <div className="booking-form-group">
                <label htmlFor="booking-phone">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="booking-phone" 
                  name="phone" 
                  placeholder="+1 (555) 123-4567" 
                  required 
                  disabled={isSubmitting} 
                />
              </div>

              <div className="booking-form-group">
                <label htmlFor="booking-message">
                  <svg className="label-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Your Message
                </label>
                <textarea 
                  id="booking-message" 
                  name="message" 
                  rows="5" 
                  placeholder="Tell us about your needs and how we can help..." 
                  required 
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <div className="booking-form-actions">
                <button type="button" className="booking-cancel-btn" onClick={handleCloseBookingModal} disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" className="booking-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="spinner" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span>Submit Booking Request</span>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services

