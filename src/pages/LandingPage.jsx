import { useState } from 'react'
import { motion } from 'framer-motion'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
import './LandingPage.css'

export default function LandingPage({ onAuthSuccess, onGuestBrowse }) {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Logo/Branding */}
        <motion.div
          className="landing-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="landing-title">
            BDE <span className="accent">EDITZ</span>
          </h1>
          <p className="landing-subtitle">Professional Video Edits & Premium Presets</p>
        </motion.div>

        {/* Auth Tabs */}
        <motion.div
          className="auth-tabs-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="auth-tabs">
            <button
              className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'login' && <LoginForm onSuccess={onAuthSuccess} />}
            {activeTab === 'signup' && <SignUpForm onSuccess={onAuthSuccess} />}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="divider-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="divider-line"></div>
          <span className="divider-text">OR</span>
          <div className="divider-line"></div>
        </motion.div>

        {/* Browse as Guest Button */}
        <motion.button
          className="btn-guest-browse"
          onClick={onGuestBrowse}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Browse as Guest
        </motion.button>

        {/* Footer Info */}
        <motion.div
          className="landing-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="footer-text">
            By continuing, you agree to our{' '}
            <a href="#" className="footer-link">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="landing-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>
    </div>
  )
}
