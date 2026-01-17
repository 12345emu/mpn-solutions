import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiBase } from '../config'
import npmLogo from '../assets/npm.png'
import './AdminDashboard.css'

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard', 'submissions' or 'services'
  const [dashboardStats, setDashboardStats] = useState({
    totalSubmissions: 0,
    totalServices: 0,
    activeServices: 0,
    recentSubmissions: [],
    topServices: []
  })
  const [submissions, setSubmissions] = useState([])
  const [services, setServices] = useState([])
  const [serviceStats, setServiceStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    contacted: 0,
    archived: 0
  })
  const [editingService, setEditingService] = useState(null)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [serviceSubmissions, setServiceSubmissions] = useState([])
  const [loadingServiceSubmissions, setLoadingServiceSubmissions] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    if (activeTab === 'dashboard') {
      loadDashboardData()
    } else if (activeTab === 'submissions') {
      loadSubmissions()
    } else if (activeTab === 'services') {
      loadServices()
      loadServiceStats()
    }
  }, [statusFilter, activeTab])

  const checkAuth = async () => {
    const isLoggedIn = localStorage.getItem('admin_logged_in')
    if (!isLoggedIn) {
      navigate('/admin/login')
      return
    }

    // Verify with server
    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'check_auth.php', {
        credentials: 'include'
      })
      const data = await response.json()
      
      if (!data.authenticated) {
        localStorage.removeItem('admin_logged_in')
        navigate('/admin/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  const loadSubmissions = async () => {
    setLoading(true)
    try {
      const apiBase = getApiBase()
      const response = await fetch(
        `${apiBase}get_submissions.php?status=${statusFilter}`,
        { credentials: 'include' }
      )
      const data = await response.json()

      if (data.success) {
        setSubmissions(data.data)
        updateStats(data.data)
      }
    } catch (error) {
      console.error('Error loading submissions:', error)
      setMessage({ type: 'error', text: 'Error loading submissions' })
    } finally {
      setLoading(false)
    }
  }

  const updateStats = (subs) => {
    const newStats = {
      total: subs.length,
      new: 0,
      read: 0,
      contacted: 0,
      archived: 0
    }

    subs.forEach(s => {
      if (newStats.hasOwnProperty(s.status)) {
        newStats[s.status]++
      }
    })

    setStats(newStats)
  }

  const updateStatus = async (id, status) => {
    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'update_submission.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id, status })
      })

      const data = await response.json()
      if (data.success) {
        setMessage({ type: 'success', text: 'Status updated successfully' })
        loadSubmissions()
      } else {
        setMessage({ type: 'error', text: data.message || 'Error updating status' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating status' })
    }
  }

  const deleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) {
      return
    }

    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'delete_submission.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id })
      })

      const data = await response.json()
      if (data.success) {
        setMessage({ type: 'success', text: 'Submission deleted successfully' })
        loadSubmissions()
      } else {
        setMessage({ type: 'error', text: data.message || 'Error deleting submission' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting submission' })
    }
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
      navigate('/admin/login')
    }
  }

  const loadServices = async () => {
    setLoading(true)
    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'get_services.php', {
        credentials: 'include'
      })
      const data = await response.json()

      if (data.success) {
        setServices(data.data)
      }
    } catch (error) {
      console.error('Error loading services:', error)
      setMessage({ type: 'error', text: 'Error loading services' })
    } finally {
      setLoading(false)
    }
  }

  const loadServiceStats = async () => {
    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'get_service_stats.php', {
        credentials: 'include'
      })
      const data = await response.json()

      if (data.success) {
        setServiceStats(data.data)
      }
    } catch (error) {
      console.error('Error loading service stats:', error)
    }
  }

  const handleServiceSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      name: e.target.name.value,
      slug: e.target.slug.value || e.target.name.value.toLowerCase().replace(/\s+/g, '-'),
      description: e.target.description.value,
      icon: e.target.icon.value || '📋',
      industry: e.target.industry.value,
      features: e.target.features.value.split(',').map(f => f.trim()).filter(f => f),
      is_active: e.target.is_active.checked ? 1 : 0,
      display_order: parseInt(e.target.display_order.value) || 0
    }

    try {
      const apiBase = getApiBase()
      const url = editingService 
        ? apiBase + 'update_service.php'
        : apiBase + 'create_service.php'
      
      const body = editingService 
        ? { id: editingService.id, ...formData }
        : formData

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: editingService ? 'Service updated successfully' : 'Service created successfully' })
        setShowServiceForm(false)
        setEditingService(null)
        loadServices()
        e.target.reset()
      } else {
        setMessage({ type: 'error', text: data.message || 'Error saving service' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving service' })
    }
  }

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return
    }

    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'delete_service.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id })
      })

      const data = await response.json()
      if (data.success) {
        setMessage({ type: 'success', text: 'Service deleted successfully' })
        loadServices()
      } else {
        setMessage({ type: 'error', text: data.message || 'Error deleting service' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting service' })
    }
  }

  const editService = (service) => {
    setEditingService(service)
    setShowServiceForm(true)
    // Close service detail modal if open
    setSelectedService(null)
    // Scroll to form after a brief delay to ensure it's rendered
    setTimeout(() => {
      const formElement = document.querySelector('.admin-service-form')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const getServiceRequestCount = (serviceName) => {
    const stat = serviceStats.find(s => s.service === serviceName)
    return stat ? stat.count : 0
  }

  const loadServiceSubmissions = async (serviceName) => {
    setLoadingServiceSubmissions(true)
    try {
      const apiBase = getApiBase()
      const response = await fetch(`${apiBase}get_submissions_by_service.php?service=${encodeURIComponent(serviceName)}`, {
        credentials: 'include'
      })
      const data = await response.json()

      if (data.success) {
        setServiceSubmissions(data.data)
        setSelectedService(serviceName)
      } else {
        setMessage({ type: 'error', text: data.message || 'Error loading service submissions' })
      }
    } catch (error) {
      console.error('Error loading service submissions:', error)
      setMessage({ type: 'error', text: 'Error loading service submissions' })
    } finally {
      setLoadingServiceSubmissions(false)
    }
  }

  const updateProgress = async (submissionId, progress) => {
    try {
      const apiBase = getApiBase()
      const response = await fetch(apiBase + 'update_progress.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id: submissionId, progress })
      })

      const data = await response.json()
      if (data.success) {
        setMessage({ type: 'success', text: 'Progress updated successfully' })
        // Reload service submissions
        if (selectedService) {
          loadServiceSubmissions(selectedService)
        }
      } else {
        setMessage({ type: 'error', text: data.message || 'Error updating progress' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating progress' })
    }
  }

  const getProgressLabel = (progress) => {
    const labels = {
      'pending': 'Pending',
      'initial-contact': 'Initial Contact',
      'consultation': 'Consultation',
      'proposal': 'Proposal',
      'negotiation': 'Negotiation',
      'contract-signed': 'Contract Signed',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'on-hold': 'On Hold',
      'cancelled': 'Cancelled'
    }
    return labels[progress] || progress
  }

  const getProgressColor = (progress) => {
    const colors = {
      'pending': '#6c757d',
      'initial-contact': '#17a2b8',
      'consultation': '#007bff',
      'proposal': '#ffc107',
      'negotiation': '#fd7e14',
      'contract-signed': '#28a745',
      'in-progress': '#667eea',
      'completed': '#155724',
      'on-hold': '#856404',
      'cancelled': '#dc3545'
    }
    return colors[progress] || '#6c757d'
  }

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const apiBase = getApiBase()
      
      // Load all submissions for stats
      const submissionsResponse = await fetch(`${apiBase}get_submissions.php?status=all&limit=1000`, {
        credentials: 'include'
      })
      const submissionsData = await submissionsResponse.json()

      // Load services
      const servicesResponse = await fetch(apiBase + 'get_services.php', {
        credentials: 'include'
      })
      const servicesData = await servicesResponse.json()

      // Load service stats
      const statsResponse = await fetch(apiBase + 'get_service_stats.php', {
        credentials: 'include'
      })
      const statsData = await statsResponse.json()

      if (submissionsData.success && servicesData.success) {
        const allSubmissions = submissionsData.data || []
        const allServices = servicesData.data || []
        const serviceStats = statsData.success ? statsData.data : []

        // Calculate stats
        const statusCounts = {
          new: 0,
          read: 0,
          contacted: 0,
          archived: 0
        }

        allSubmissions.forEach(s => {
          if (statusCounts.hasOwnProperty(s.status)) {
            statusCounts[s.status]++
          }
        })

        // Get recent submissions (last 5)
        const recentSubmissions = allSubmissions
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)

        // Get top services
        const topServices = serviceStats
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)

        setDashboardStats({
          totalSubmissions: allSubmissions.length,
          totalServices: allServices.length,
          activeServices: allServices.filter(s => s.is_active === 1).length,
          statusCounts,
          recentSubmissions,
          topServices
        })
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const adminUsername = localStorage.getItem('admin_username') || 'Admin'

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-title">
            <img src={npmLogo} alt="MPN Solutions" className="admin-header-logo" />
            <div>
              <h1>MPN Solutions</h1>
              <span className="admin-header-subtitle">Admin Dashboard</span>
            </div>
          </div>
          <div className="admin-header-actions">
            <span className="admin-welcome-text">Welcome, {adminUsername}</span>
            <button className="admin-btn admin-btn-logout" onClick={handleLogout}>
              <svg className="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        {message.text && (
          <div className={`admin-message admin-message-${message.type}`}>
            {message.text}
            <button onClick={() => setMessage({ type: '', text: '' })}>×</button>
          </div>
        )}

        {/* Tabs */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`admin-tab ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions
          </button>
          <button 
            className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="admin-dashboard-overview">
            {/* Overview Stats */}
            <div className="admin-overview-stats">
              <div className="admin-overview-stat-card">
                <div className="admin-overview-stat-content">
                  <h3>Total Submissions</h3>
                  <div className="admin-overview-stat-number">{dashboardStats.totalSubmissions}</div>
                </div>
              </div>
              <div className="admin-overview-stat-card">
                <div className="admin-overview-stat-content">
                  <h3>Total Services</h3>
                  <div className="admin-overview-stat-number">{dashboardStats.totalServices}</div>
                </div>
              </div>
              <div className="admin-overview-stat-card">
                <div className="admin-overview-stat-content">
                  <h3>Active Services</h3>
                  <div className="admin-overview-stat-number">{dashboardStats.activeServices}</div>
                </div>
              </div>
              <div className="admin-overview-stat-card">
                <div className="admin-overview-stat-content">
                  <h3>New Requests</h3>
                  <div className="admin-overview-stat-number">{dashboardStats.statusCounts?.new || 0}</div>
                </div>
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="admin-dashboard-section">
              <h2>Submission Status Overview</h2>
              <div className="admin-status-chart">
                <div className="admin-chart-bar-container">
                  <div className="admin-chart-bar-wrapper">
                    <div className="admin-chart-bar-label">New</div>
                    <div className="admin-chart-bar">
                      <div 
                        className="admin-chart-bar-fill" 
                        style={{ 
                          height: `${dashboardStats.totalSubmissions > 0 ? (dashboardStats.statusCounts?.new || 0) / dashboardStats.totalSubmissions * 100 : 0}%`
                        }}
                      ></div>
                    </div>
                    <div className="admin-chart-bar-value">{dashboardStats.statusCounts?.new || 0}</div>
                  </div>
                  <div className="admin-chart-bar-wrapper">
                    <div className="admin-chart-bar-label">Read</div>
                    <div className="admin-chart-bar">
                      <div 
                        className="admin-chart-bar-fill" 
                        style={{ 
                          height: `${dashboardStats.totalSubmissions > 0 ? (dashboardStats.statusCounts?.read || 0) / dashboardStats.totalSubmissions * 100 : 0}%`
                        }}
                      ></div>
                    </div>
                    <div className="admin-chart-bar-value">{dashboardStats.statusCounts?.read || 0}</div>
                  </div>
                  <div className="admin-chart-bar-wrapper">
                    <div className="admin-chart-bar-label">Contacted</div>
                    <div className="admin-chart-bar">
                      <div 
                        className="admin-chart-bar-fill" 
                        style={{ 
                          height: `${dashboardStats.totalSubmissions > 0 ? (dashboardStats.statusCounts?.contacted || 0) / dashboardStats.totalSubmissions * 100 : 0}%`
                        }}
                      ></div>
                    </div>
                    <div className="admin-chart-bar-value">{dashboardStats.statusCounts?.contacted || 0}</div>
                  </div>
                  <div className="admin-chart-bar-wrapper">
                    <div className="admin-chart-bar-label">Archived</div>
                    <div className="admin-chart-bar">
                      <div 
                        className="admin-chart-bar-fill" 
                        style={{ 
                          height: `${dashboardStats.totalSubmissions > 0 ? (dashboardStats.statusCounts?.archived || 0) / dashboardStats.totalSubmissions * 100 : 0}%`
                        }}
                      ></div>
                    </div>
                    <div className="admin-chart-bar-value">{dashboardStats.statusCounts?.archived || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="admin-dashboard-grid">
              {/* Recent Submissions */}
              <div className="admin-dashboard-section">
                <h2>Recent Submissions</h2>
                <div className="admin-recent-list">
                  {loading ? (
                    <div className="admin-loading">Loading...</div>
                  ) : dashboardStats.recentSubmissions.length === 0 ? (
                    <div className="admin-no-submissions">No recent submissions</div>
                  ) : (
                    dashboardStats.recentSubmissions.map(submission => (
                      <div key={submission.id} className="admin-recent-item">
                        <div className="admin-recent-item-header">
                          <strong>{submission.name}</strong>
                          <span className={`admin-status-badge admin-status-${submission.status}`}>
                            {submission.status}
                          </span>
                        </div>
                        <div className="admin-recent-item-details">
                          <span>{submission.service}</span>
                          <span>•</span>
                          <span>{new Date(submission.created_at).toLocaleDateString()}</span>
                        </div>
                        {submission.message && (
                          <p className="admin-recent-item-message">
                            {submission.message.length > 100 
                              ? submission.message.substring(0, 100) + '...' 
                              : submission.message}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => setActiveTab('submissions')}
                  style={{ marginTop: '15px', width: '100%' }}
                >
                  View All Submissions
                </button>
              </div>

              {/* Top Services */}
              <div className="admin-dashboard-section">
                <h2>Top Requested Services</h2>
                <div className="admin-top-services-list">
                  {loading ? (
                    <div className="admin-loading">Loading...</div>
                  ) : dashboardStats.topServices.length === 0 ? (
                    <div className="admin-no-submissions">No service requests yet</div>
                  ) : (
                    dashboardStats.topServices.map((service, index) => (
                      <div key={index} className="admin-top-service-item">
                        <div className="admin-top-service-rank">#{index + 1}</div>
                        <div className="admin-top-service-content">
                          <strong>{service.service}</strong>
                          <span className="admin-top-service-count">{service.count} requests</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button 
                  className="admin-btn admin-btn-primary"
                  onClick={() => setActiveTab('services')}
                  style={{ marginTop: '15px', width: '100%' }}
                >
                  Manage Services
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <>
            <div className="admin-stats">
          <div className="admin-stat-card">
            <h3>Total Submissions</h3>
            <div className="admin-stat-number">{stats.total}</div>
          </div>
          <div className="admin-stat-card">
            <h3>New</h3>
            <div className="admin-stat-number">{stats.new}</div>
          </div>
          <div className="admin-stat-card">
            <h3>Read</h3>
            <div className="admin-stat-number">{stats.read}</div>
          </div>
          <div className="admin-stat-card">
            <h3>Contacted</h3>
            <div className="admin-stat-number">{stats.contacted}</div>
          </div>
        </div>

        <div className="admin-filters">
          <label>
            Filter by Status:
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="contacted">Contacted</option>
              <option value="archived">Archived</option>
            </select>
          </label>
        </div>

        <div className="admin-submissions-table">
          {loading ? (
            <div className="admin-loading">Loading submissions...</div>
          ) : submissions.length === 0 ? (
            <div className="admin-no-submissions">No submissions found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(submission => (
                  <tr key={submission.id}>
                    <td>{submission.id}</td>
                    <td>{submission.name}</td>
                    <td>{submission.email}</td>
                    <td>
                      {submission.phone ? (
                        <a href={`tel:${submission.phone.replace(/\s+/g, '')}`} style={{ color: '#667eea', textDecoration: 'none' }}>
                          {submission.phone}
                        </a>
                      ) : (
                        <span style={{ color: '#999' }}>N/A</span>
                      )}
                    </td>
                    <td>{submission.service}</td>
                    <td className="admin-message-cell">
                      {submission.message.length > 50
                        ? submission.message.substring(0, 50) + '...'
                        : submission.message}
                    </td>
                    <td>
                      <span className={`admin-status-badge admin-status-${submission.status}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td>{new Date(submission.created_at).toLocaleDateString()}</td>
                    <td className="admin-actions">
                      <select
                        value={submission.status}
                        onChange={(e) => updateStatus(submission.id, e.target.value)}
                        className="admin-status-select"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="contacted">Contacted</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => deleteSubmission(submission.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
          </>
        )}

        {activeTab === 'services' && (
          <div className="admin-services-section">
            <div className="admin-services-header">
              <h2>Service Management</h2>
              <button 
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  setEditingService(null)
                  setShowServiceForm(!showServiceForm)
                }}
              >
                {showServiceForm ? 'Cancel' : '+ Add New Service'}
              </button>
            </div>

            {showServiceForm && (
              <div className="admin-service-form">
                <h3>{editingService ? 'Edit Service' : 'Create New Service'}</h3>
                <form onSubmit={handleServiceSubmit}>
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Service Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        defaultValue={editingService?.name || ''}
                        placeholder="e.g., Business Manager"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Slug</label>
                      <input 
                        type="text" 
                        name="slug" 
                        defaultValue={editingService?.slug || ''}
                        placeholder="auto-generated from name"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Description</label>
                    <textarea 
                      name="description" 
                      rows="3"
                      defaultValue={editingService?.description || ''}
                      placeholder="Service description..."
                    />
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Icon</label>
                      <input 
                        type="text" 
                        name="icon" 
                        defaultValue={editingService?.icon || '📋'}
                        placeholder="📋"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Industry</label>
                      <input 
                        type="text" 
                        name="industry" 
                        defaultValue={editingService?.industry || ''}
                        placeholder="e.g., Entertainment • Influencers"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Features (comma-separated)</label>
                    <input 
                      type="text" 
                      name="features" 
                      defaultValue={editingService?.features ? (Array.isArray(editingService.features) ? editingService.features.join(', ') : editingService.features.replace(/,/g, ', ')) : ''}
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Display Order</label>
                      <input 
                        type="number" 
                        name="display_order" 
                        defaultValue={editingService?.display_order || 0}
                        min="0"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>
                        <input 
                          type="checkbox" 
                          name="is_active" 
                          defaultChecked={editingService ? editingService.is_active === 1 : true}
                        />
                        Active
                      </label>
                    </div>
                  </div>

                  <div className="admin-form-actions">
                    <button type="submit" className="admin-btn admin-btn-primary">
                      {editingService ? 'Update Service' : 'Create Service'}
                    </button>
                    {editingService && (
                      <button 
                        type="button" 
                        className="admin-btn"
                        onClick={() => {
                          setEditingService(null)
                          setShowServiceForm(false)
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Service Request Stats */}
            {serviceStats.length > 0 && (
              <div className="admin-service-stats">
                <h3>Service Request Statistics</h3>
                <div className="admin-service-stats-grid">
                  {serviceStats.map((stat, index) => (
                    <div key={index} className="admin-service-stat-card">
                      <div className="admin-service-stat-name">{stat.service}</div>
                      <div className="admin-service-stat-count">{stat.count} requests</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services List */}
            <div className="admin-services-list">
              {loading ? (
                <div className="admin-loading">Loading services...</div>
              ) : services.length === 0 ? (
                <div className="admin-no-submissions">No services found. Create your first service!</div>
              ) : (
                <div className="admin-services-grid">
                  {services.map(service => (
                    <div 
                      key={service.id} 
                      className={`admin-service-card ${!service.is_active ? 'inactive' : ''} ${selectedService === service.name ? 'selected' : ''}`}
                    >
                      <div 
                        className="admin-service-card-clickable"
                        onClick={() => loadServiceSubmissions(service.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="admin-service-card-header">
                          <span className="admin-service-icon">{service.icon}</span>
                          <div className="admin-service-card-title">
                            <h3>{service.name}</h3>
                            {service.industry && (
                              <p className="admin-service-industry">{service.industry}</p>
                            )}
                          </div>
                          <span className="admin-service-requests">
                            {getServiceRequestCount(service.name)} requests
                          </span>
                        </div>
                        {service.description && (
                          <p className="admin-service-description">{service.description}</p>
                        )}
                        {service.features && (
                          <div className="admin-service-features">
                            <strong>Features:</strong>
                            <ul>
                              {(Array.isArray(service.features) ? service.features : service.features.split(',')).map((feature, idx) => (
                                <li key={idx}>{feature.trim()}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="admin-service-card-footer">
                        <div className="admin-service-meta">
                          <span>Slug: <code>{service.slug}</code></span>
                          <span>Order: {service.display_order}</span>
                          <span className={service.is_active ? 'status-active' : 'status-inactive'}>
                            {service.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="admin-service-actions">
                          <button 
                            type="button"
                            className="admin-btn admin-btn-sm"
                            onClick={() => editService(service)}
                          >
                            Edit
                          </button>
                          <button 
                            type="button"
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={() => deleteService(service.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
              <div className="admin-service-modal-overlay" onClick={() => setSelectedService(null)}>
                <div className="admin-service-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="admin-service-modal-header">
                    <h2>Service: {selectedService}</h2>
                    <button 
                      className="admin-modal-close"
                      onClick={() => setSelectedService(null)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="admin-service-modal-content">
                    {loadingServiceSubmissions ? (
                      <div className="admin-loading">Loading service requests...</div>
                    ) : serviceSubmissions.length === 0 ? (
                      <div className="admin-no-submissions">No requests found for this service.</div>
                    ) : (
                      <div className="admin-service-submissions-list">
                        <div className="admin-service-submissions-header">
                          <p><strong>{serviceSubmissions.length}</strong> {serviceSubmissions.length === 1 ? 'request' : 'requests'} for this service</p>
                        </div>
                        {serviceSubmissions.map(submission => (
                          <div key={submission.id} className="admin-service-submission-card">
                            <div className="admin-service-submission-header">
                              <div className="admin-service-submission-user">
                                <h4>{submission.name}</h4>
                                <div className="admin-service-submission-contact">
                                  <a href={`mailto:${submission.email}`} style={{ color: '#667eea', textDecoration: 'none' }}>
                                    {submission.email}
                                  </a>
                                  {submission.phone && (
                                    <>
                                      {' • '}
                                      <a href={`tel:${submission.phone.replace(/\s+/g, '')}`} style={{ color: '#667eea', textDecoration: 'none' }}>
                                        {submission.phone}
                                      </a>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="admin-service-submission-meta">
                                <span className="admin-submission-date">
                                  {new Date(submission.created_at).toLocaleDateString()}
                                </span>
                                <span className={`admin-status-badge admin-status-${submission.status}`}>
                                  {submission.status}
                                </span>
                              </div>
                            </div>
                            
                            {submission.message && (
                              <div className="admin-service-submission-message">
                                <strong>Message:</strong>
                                <p>{submission.message}</p>
                              </div>
                            )}

                            <div className="admin-service-submission-progress">
                              <label>
                                <strong>Service Progress:</strong>
                                <select
                                  value={submission.progress || 'pending'}
                                  onChange={(e) => updateProgress(submission.id, e.target.value)}
                                  className="admin-progress-select"
                                  style={{ 
                                    borderColor: getProgressColor(submission.progress || 'pending'),
                                    color: getProgressColor(submission.progress || 'pending')
                                  }}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="initial-contact">Initial Contact</option>
                                  <option value="consultation">Consultation</option>
                                  <option value="proposal">Proposal</option>
                                  <option value="negotiation">Negotiation</option>
                                  <option value="contract-signed">Contract Signed</option>
                                  <option value="in-progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                  <option value="on-hold">On Hold</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </label>
                              <div 
                                className="admin-progress-indicator"
                                style={{ 
                                  backgroundColor: getProgressColor(submission.progress || 'pending'),
                                  color: 'white',
                                  padding: '4px 12px',
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  display: 'inline-block',
                                  marginTop: '8px'
                                }}
                              >
                                {getProgressLabel(submission.progress || 'pending')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard


