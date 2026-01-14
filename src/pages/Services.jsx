import { useState, useEffect } from 'react'
import { getApiBase } from '../config'
import './Services.css'

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Tailored management solutions for every industry. Same expertise, different names to match your industry's language.</p>
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
                <div key={service.id} className="service-card-full">
                  <div className="service-icon-large">{service.icon}</div>
                  <h3 className="service-title">{service.name}</h3>
                  {service.industry && (
                    <p className="service-industry">{service.industry}</p>
                  )}
                  {service.description && (
                    <p className="service-description">{service.description}</p>
                  )}
                  {service.features && (
                    <ul className="service-features">
                      {(Array.isArray(service.features) 
                        ? service.features 
                        : service.features.split(',')).map((feature, idx) => (
                        <li key={idx}>{feature.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Services

