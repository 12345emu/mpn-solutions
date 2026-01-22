import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getApiBase } from '../config'
import './Navbar.css'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProfileMenuOpen(false)
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

  const handleLogout = async () => {
    try {
      const apiBase = getApiBase()
      await fetch(apiBase + 'logout.php', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear localStorage
      localStorage.removeItem('admin_logged_in')
      localStorage.removeItem('admin_username')
      localStorage.removeItem('admin_id')
      setIsAdminLoggedIn(false)
      setIsProfileMenuOpen(false)
      // Redirect to home page
      navigate('/')
    }
  }

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileMenuOpen])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
            <img src="/npm.jpeg" alt="MPN Solutions" className="logo-image" />
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
          <li className="profile-menu-container">
            <button 
              className="profile-icon-btn" 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-label="Profile menu"
            >
              <svg className="profile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            {isProfileMenuOpen && (
              <div className="profile-dropdown">
                {isAdminLoggedIn ? (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      className="profile-menu-item"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <svg className="menu-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Dashboard</span>
                    </Link>
                    <button 
                      className="profile-menu-item profile-menu-item-logout"
                      onClick={handleLogout}
                    >
                      <svg className="menu-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/admin/login" 
                    className="profile-menu-item"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <svg className="menu-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

