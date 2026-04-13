import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Navigation.css'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Videos', href: '#videos' },
    { label: 'Presets', href: '#presets' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/logo.png" alt="BDE EDITZ Logo" />
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a onClick={() => scrollToSection(item.href)} className="nav-link">
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <motion.div
          className={`nav-links mobile ${isOpen ? 'active' : ''}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              onClick={() => scrollToSection(item.href)}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      </div>
    </nav>
  )
}
