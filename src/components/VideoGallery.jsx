import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getLatestVideos } from '../services/youtubeService'
import { getUploadedVideos } from '../services/videoService'
import './VideoGallery.css'

export default function VideoGallery({ refreshTrigger }) {
  const [youtubeVideos, setYoutubeVideos] = useState([])
  const [uploadedVideos, setUploadedVideos] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    fetchVideos()
  }, [refreshTrigger])

  const fetchVideos = async () => {
    setLoading(true)
    setError(null)

    try {
      const [youtube, uploaded] = await Promise.all([
        getLatestVideos(6).catch(() => []),
        getUploadedVideos().catch(() => []),
      ])

      setYoutubeVideos(youtube || [])
      setUploadedVideos(uploaded || [])
    } catch (err) {
      console.error('Error fetching videos:', err)
      setError('Failed to load videos')
    } finally {
      setLoading(false)
    }
  }

  const getDisplayVideos = () => {
    switch (activeTab) {
      case 'youtube':
        return youtubeVideos
      case 'uploaded':
        return uploadedVideos
      default:
        return [...youtubeVideos, ...uploadedVideos]
    }
  }

  const displayVideos = getDisplayVideos()

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
  }

  if (loading) {
    return (
      <div className="video-gallery loading">
        <div className="spinner"></div>
        <p>Loading videos...</p>
      </div>
    )
  }

  return (
    <motion.div
      className="video-gallery"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="gallery-header">
        <h2>Video Gallery</h2>
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({displayVideos.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'youtube' ? 'active' : ''}`}
            onClick={() => setActiveTab('youtube')}
          >
            YouTube ({youtubeVideos.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'uploaded' ? 'active' : ''}`}
            onClick={() => setActiveTab('uploaded')}
          >
            Uploads ({uploadedVideos.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="gallery-error">
          <p>⚠️ {error}</p>
        </div>
      )}

      {displayVideos.length === 0 ? (
        <div className="gallery-empty">
          <p>No videos to display</p>
          {activeTab === 'uploaded' && (
            <p className="hint">Start uploading your videos to see them here!</p>
          )}
        </div>
      ) : (
        <div className="gallery-grid">
          {displayVideos.map((video, index) => (
            <motion.div
              key={`${video.source}-${video.id}`}
              className="video-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => handleVideoClick(video)}
              whileHover={{ y: -5 }}
            >
              <div className="video-thumbnail">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                />
                <div className="play-overlay">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="video-source">
                  {video.source === 'youtube' ? '▶️ YouTube' : '📤 Upload'}
                </span>
              </div>

              <div className="video-details">
                <h3>{video.title}</h3>
                <p className="video-date">
                  {new Date(video.publishedAt || video.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <motion.div
          className="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>

            {selectedVideo.source === 'youtube' ? (
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                controls
                width="100%"
                height="500"
                src={selectedVideo.url}
              >
                Your browser does not support the video tag.
              </video>
            )}

            <div className="modal-info">
              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
