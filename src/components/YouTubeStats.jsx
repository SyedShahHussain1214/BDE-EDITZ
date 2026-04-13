import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getChannelStats } from '../services/youtubeService'
import './YouTubeStats.css'

export default function YouTubeStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const channelStats = await getChannelStats()
      setStats(channelStats)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
      setError('Unable to load YouTube stats')
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  if (error) {
    return (
      <div className="youtube-stats error">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <motion.div
      className="youtube-stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {loading ? (
        <div className="stats-loading">
          <div className="spinner"></div>
          <p>Loading YouTube stats...</p>
        </div>
      ) : stats ? (
        <div className="stats-container">
          <motion.div
            className="stat-item"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-icon">👥</div>
            <div className="stat-value">{formatNumber(stats.subscribers)}</div>
            <div className="stat-label">Subscribers</div>
          </motion.div>

          <motion.div
            className="stat-item"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-icon">👁️</div>
            <div className="stat-value">{formatNumber(stats.views)}</div>
            <div className="stat-label">Total Views</div>
          </motion.div>

          <motion.div
            className="stat-item"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-icon">🎥</div>
            <div className="stat-value">{stats.videoCount}</div>
            <div className="stat-label">Videos</div>
          </motion.div>

          <motion.a
            href="https://www.youtube.com/channel/UCVwtEzgrN9C65_oMjrV1rtw"
            target="_blank"
            rel="noopener noreferrer"
            className="visit-youtube"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Visit Channel →
          </motion.a>
        </div>
      ) : null}
    </motion.div>
  )
}
