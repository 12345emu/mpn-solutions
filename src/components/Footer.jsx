import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/npm.jpeg" alt="MPN Solutions" className="logo-image" />
            <span className="logo-text">MPN</span>
            <span className="logo-subtitle">Solutions</span>
          </div>
          <p className="footer-text">
            Helping businesses achieve sustainable growth and durability through expert management.
          </p>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} MPN Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

