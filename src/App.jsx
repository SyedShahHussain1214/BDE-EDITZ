import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import Navigation from './components/Navigation'
import About from './components/About'
import Videos from './components/Videos'
import Presets from './components/Presets'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminLogin from './components/AdminLogin'
import { onAuthChange } from './services/authService'
import './App.css'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthChange((user) => {
      setIsAdmin(!!user)
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleAuthChange = () => {
    // Trigger re-render when auth state changes
    setAuthLoading(false)
  }

  return (
    <div className="app">
      <Navigation />
      <Hero />
      <About />
      <Videos isAdmin={isAdmin} />
      <Presets />
      <Contact />
      <Footer />

      {/* Admin Login Button (bottom right corner) */}
      <AdminLogin isAdmin={isAdmin} onLoginSuccess={handleAuthChange} />
    </div>
  )
}

export default App
