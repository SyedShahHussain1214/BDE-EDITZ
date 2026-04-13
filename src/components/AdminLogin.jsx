import { useState } from 'react'
import { motion } from 'framer-motion'
import { adminLogin, adminLogout } from '../services/authService'
import { Lock, LogOut } from 'lucide-react'
import './AdminLogin.css'

export default function AdminLogin({ isAdmin, onLoginSuccess }) {
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await adminLogin(email, password)
      setEmail('')
      setPassword('')
      setShowLogin(false)
      if (onLoginSuccess) onLoginSuccess()
    } catch (err) {
      setError('Invalid email or password')
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await adminLogout()
      if (onLoginSuccess) onLoginSuccess()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <div className="admin-login-container">
      {isAdmin ? (
        // Show logout button when admin is logged in
        <motion.button
          className="admin-logout-btn"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Logout from admin panel"
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      ) : (
        // Show login trigger when not logged in
        <motion.button
          className="admin-login-trigger"
          onClick={() => setShowLogin(!showLogin)}
          whileHover={{ scale: 1.05 }}
          title="Admin login"
        >
          <Lock size={16} />
        </motion.button>
      )}

      {/* Login Modal */}
      {showLogin && !isAdmin && (
        <motion.div
          className="login-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowLogin(false)}
        >
          <motion.div
            className="login-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Admin Login</h2>
              <button
                className="close-btn"
                onClick={() => setShowLogin(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <motion.div
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ⚠️ {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="btn-login"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </motion.button>
            </form>

            <div className="modal-footer">
              <p>This area is for authorized uploaders only</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
