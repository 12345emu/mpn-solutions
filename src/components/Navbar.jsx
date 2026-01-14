import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getApiBase } from '../config'
import npmLogo from '../assets/npm.png'
import './Navbar.css'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Check if admin is logged in
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const apiBase = getApiBase()
        const response = await fetch(apiBase + 'check_auth.php', {
          method: 'GET',
          credentials: 'include', // Important for session cookies
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.authenticated) {
            setIsAdminLoggedIn(true)
            // Also update localStorage for consistency
            localStorage.setItem('admin_logged_in', 'true')
          } else {
            setIsAdminLoggedIn(false)
            localStorage.removeItem('admin_logged_in')
          }
        } else {
          setIsAdminLoggedIn(false)
          localStorage.removeItem('admin_logged_in')
        }
      } catch (error) {
        // Fallback to localStorage check
        const stored = localStorage.getItem('admin_logged_in')
        setIsAdminLoggedIn(stored === 'true')
      }
    }

    checkAdminAuth()
  }, [location]) // Re-check when location changes

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={npmLogo} alt="MPN Solutions" className="logo-image" />
          <span className="logo-text">MPN</span>
          <span className="logo-subtitle">Solutions</span>
        </Link>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className={isActive('/services') ? 'active' : ''}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
              Contact
            </Link>
          </li>
          <li className="nav-admin-link">
            <Link to={isAdminLoggedIn ? "/admin/dashboard" : "/admin/login"} className="admin-link">
              {isAdminLoggedIn ? "Dashboard" : "Admin"}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

