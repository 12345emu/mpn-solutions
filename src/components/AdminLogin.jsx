import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiBase } from '../config'
import npmLogo from '../assets/npm.png'
import './AdminLogin.css'

function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const navigate = useNavigate()

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiBase = getApiBase()
        const response = await fetch(apiBase + 'check_auth.php', {
          method: 'GET',
          credentials: 'include', // Important for session cookies
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.authenticated) {
            // Already logged in, redirect to dashboard
            navigate('/admin/dashboard', { replace: true })
            return
          }
        }
      } catch (error) {
        // If check fails, check localStorage as fallback
        const stored = localStorage.getItem('admin_logged_in')
        if (stored === 'true') {
          // Try to verify with server, but if it fails, still allow login
        }
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session cookies
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (data.success) {
        // Store auth info in localStorage
        localStorage.setItem('admin_logged_in', 'true')
        localStorage.setItem('admin_username', data.user.username)
        localStorage.setItem('admin_id', data.user.id)
        
        // Redirect to dashboard
        navigate('/admin/dashboard')
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <img src={npmLogo} alt="MPN Solutions" className="admin-login-logo" />
            <h1>MPN Solutions</h1>
            <p>Checking authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <img src={npmLogo} alt="MPN Solutions" className="admin-login-logo" />
          <h1>MPN Solutions</h1>
          <p>Admin Login</p>
        </div>

        {error && (
          <div className="admin-error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username or email"
              required
              disabled={loading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin


