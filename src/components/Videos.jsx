import { useState } from 'react'
import { motion } from 'framer-motion'
import VideoGallery from './VideoGallery'
import VideoUpload from './VideoUpload'
import './Videos.css'

export default function Videos({ isAdmin }) {
  const [refreshGallery, setRefreshGallery] = useState(0)

  const handleUploadSuccess = () => {
    // Trigger gallery refresh after successful upload
    setRefreshGallery((prev) => prev + 1)
  }

  return (
    <section id="videos" className="videos">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My <span className="accent">Videos</span>
        </motion.h2>

        {/* Video Upload Section - Only visible to admin */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VideoUpload onUploadSuccess={handleUploadSuccess} />
          </motion.div>
        )}

        {/* Video Gallery Section */}
        <VideoGallery refreshTrigger={refreshGallery} />
      </div>
    </section>
  )
}
