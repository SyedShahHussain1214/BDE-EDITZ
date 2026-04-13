import { useState } from 'react'
import { motion } from 'framer-motion'
import { uploadVideoFile, saveVideoMetadata } from '../services/videoService'
import './VideoUpload.css'

export default function VideoUpload({ onUploadSuccess }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const MAX_FILE_SIZE = 500 * 1024 * 1024 // 500MB
  const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only MP4, WebM, and MOV files are allowed')
      setSelectedFile(null)
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 500MB')
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Please enter a video title')
      return
    }

    if (!selectedFile) {
      setError('Please select a video file')
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      // Upload file to Firebase
      const fileData = await uploadVideoFile(selectedFile, (progress) => {
        setProgress(progress)
      })

      // Save metadata to Firestore
      const videoId = await saveVideoMetadata({
        title: title.trim(),
        description: description.trim(),
        url: fileData.url,
        storagePath: fileData.path,
        fileName: fileData.fileName,
        fileSize: selectedFile.size,
      })

      setSuccess(true)
      setTitle('')
      setDescription('')
      setSelectedFile(null)
      setProgress(0)

      if (onUploadSuccess) {
        onUploadSuccess({ id: videoId, title, description })
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err.message || 'Failed to upload video. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      className="video-upload"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="upload-header">
        <h2>Upload Your Video</h2>
        <p>Share your latest edits with your audience</p>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">Video Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            disabled={uploading}
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description (optional)"
            rows="4"
            disabled={uploading}
          />
        </div>

        {/* File Input */}
        <div className="form-group">
          <label htmlFor="file">Video File * (Max 500MB)</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <span className="file-name">
              {selectedFile ? selectedFile.name : 'Choose a video file...'}
            </span>
          </div>
          <p className="file-hint">Supported formats: MP4, WebM, MOV</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="message error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            className="message success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✅ Video uploaded successfully!
          </motion.div>
        )}

        {/* Progress Bar */}
        {uploading && (
          <div className="progress-container">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <p className="progress-text">{Math.round(progress)}% uploaded</p>
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn-upload"
          disabled={uploading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {uploading ? (
            <>
              <span className="spinner"></span>
              Uploading...
            </>
          ) : (
            '🎬 Upload Video'
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
