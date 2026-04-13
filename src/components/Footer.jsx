import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: 'youtube', url: 'https://www.youtube.com/channel/UCVwtEzgrN9C65_oMjrV1rtw', label: 'YouTube' },
    { icon: 'twitter', url: '#', label: 'Twitter' },
    { icon: 'mail', url: '#', label: 'Email' },
    { icon: 'globe', url: '#', label: 'Portfolio' },
  ]

  const renderIcon = (iconName) => {
    const iconMap = {
      youtube: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-10 9.5L6 8v8l4-2.5z"/>
        </svg>
      ),
      twitter: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-3 1"/>
        </svg>
      ),
      mail: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
        </svg>
      ),
      globe: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          <path d="M2 12h20"/>
        </svg>
      ),
    }
    return iconMap[iconName] || null
  }

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-section">
            <h3>BDE EDITZ</h3>
            <p>Professional video editing and motion graphics presets</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#videos">Videos</a></li>
              <li><a href="#presets">Presets</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Social Media</h4>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="social-icon"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {renderIcon(link.icon)}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} BDE EDITZ. All rights reserved.</p>
          <p>Designed & Built with ✨ by BDE</p>
        </motion.div>
      </div>
    </footer>
  )
}
