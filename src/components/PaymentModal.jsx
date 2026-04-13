import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import './PaymentModal.css'

export default function PaymentModal({ preset, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    // In production, this would connect to Stripe's payment API
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)

      setTimeout(() => {
        console.log('Payment completed for:', { preset: preset.name, ...formData })
        setPaymentSuccess(false)
        setFormData({ fullName: '', email: '', cardNumber: '', cardExpiry: '', cardCVC: '' })
        onClose()
      }, 2000)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="payment-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-header">
          <h2>Complete Your Purchase</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {!paymentSuccess ? (
            <>
              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-item">
                  <span>{preset.name}</span>
                  <span className="summary-price">${preset.price}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total</span>
                  <span className="total-price">${preset.price}</span>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4242 4242 4242 4242"
                    maxLength="19"
                    required
                  />
                  <small>Test: 4242 4242 4242 4242</small>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardCVC">CVC</label>
                    <input
                      type="text"
                      id="cardCVC"
                      name="cardCVC"
                      value={formData.cardCVC}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="btn-pay"
                  disabled={isProcessing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Pay ${preset.price}
                    </>
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              className="payment-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="success-icon">✓</div>
              <h3>Payment Successful!</h3>
              <p>Your preset has been purchased and will be available in your account</p>
              <p className="confirmation-message">Check your email for download link</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
