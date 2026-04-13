import { useState } from 'react'
import { motion } from 'framer-motion'
import { customerSignUp } from '../services/authService'

export default function SignUpForm({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError('All fields are required')
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return false
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) return

    setLoading(true)
    try {
      await customerSignUp(email, password, firstName, lastName)
      if (onSuccess) onSuccess()
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use')
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak')
      } else {
        setError(err.message || 'Sign up failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* Name Fields Row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            disabled={loading}
            required
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
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

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="password">Password (min 8 characters)</label>
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

      {/* Confirm Password Field */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading}
          required
        />
      </div>

      {/* Newsletter Checkbox */}
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          disabled={loading}
        />
        <span>Subscribe to our newsletter for updates and offers</span>
      </label>

      {/* Error Message */}
      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="btn-auth"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </motion.button>
    </form>
  )
}
