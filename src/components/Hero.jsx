import { motion } from 'framer-motion'
import { Play, Download } from 'lucide-react'
import './Hero.css'

export default function Hero() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to <span className="gradient-text">BDE EDITZ</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Professional Video Editing & After Effects Presets<br />
            Elevate Your Creative Vision
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button
              className="btn btn-primary"
              onClick={() => scrollToSection('#videos')}
            >
              <Play size={18} />
              View My Work
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection('#presets')}
            >
              <Download size={18} />
              Get Presets
            </button>
          </motion.div>
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          className="hero-shape shape-1"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-shape shape-2"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-shape shape-3"
          animate={{
            y: [0, -20, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
