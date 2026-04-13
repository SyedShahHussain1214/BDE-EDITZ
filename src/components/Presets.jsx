import { motion } from 'framer-motion'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import PaymentModal from './PaymentModal'
import './Presets.css'

export default function Presets() {
  const [selectedPreset, setSelectedPreset] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const presets = [
    {
      id: 1,
      name: 'Cinematic Gold',
      description: 'Professional color grading preset for cinematic looks',
      price: 9.99,
      features: ['Color Grading', 'Video Presets', 'Adjustment Layers'],
      popular: false
    },
    {
      id: 2,
      name: 'Motion Pack Pro',
      description: 'Complete motion graphics animation presets',
      price: 24.99,
      features: ['50+ Animations', 'Transitions', 'Text Effects', 'Sound Design'],
      popular: true
    },
    {
      id: 3,
      name: 'Ultimate Bundle',
      description: 'All presets + exclusive tutorials',
      price: 49.99,
      features: ['All Presets', 'Video Tutorials', 'Email Support', 'Updates'],
      popular: false
    },
  ]

  const handleBuyClick = (preset) => {
    setSelectedPreset(preset)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPreset(null)
  }

  return (
    <section id="presets" className="presets">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Premium <span className="accent">Presets</span>
        </motion.h2>

        <p className="presets-subtitle">
          Take your editing to the next level with professional-grade presets
        </p>

        <div className="presets-grid">
          {presets.map((preset, index) => (
            <motion.div
              key={preset.id}
              className={`preset-card ${preset.popular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {preset.popular && (
                <div className="popular-badge">
                  <span>MOST POPULAR</span>
                </div>
              )}

              <h3>{preset.name}</h3>
              <p className="preset-description">{preset.description}</p>

              <div className="preset-price">
                <span className="currency">$</span>
                <span className="amount">{preset.price}</span>
              </div>

              <ul className="preset-features">
                {preset.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                className="btn-buy"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBuyClick(preset)}
              >
                <ShoppingCart size={18} />
                Get Preset
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="presets-guarantee"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p>✓ 30-day money-back guarantee • ✓ Instant download • ✓ Lifetime updates</p>
        </motion.div>
      </div>

      <PaymentModal
        preset={selectedPreset}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
