import { db, storage } from './firebaseConfig'
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

const VIDEOS_COLLECTION = 'videos'
const UPLOADS_FOLDER = 'videos/uploads'

/**
 * Upload video file to Firebase Cloud Storage
 * Returns progress callback function
 */
export const uploadVideoFile = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, `${UPLOADS_FOLDER}/${Date.now()}_${file.name}`)
    const uploadTask = uploadBytesResumable(fileRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (onProgress) onProgress(progress)
      },
      (error) => {
        console.error('Upload error:', error)
        reject(error)
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve({
            url: downloadURL,
            path: uploadTask.snapshot.ref.fullPath,
            fileName: file.name,
          })
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

/**
 * Save video metadata to Firestore
 */
export const saveVideoMetadata = async (videoData) => {
  try {
    const docRef = await addDoc(collection(db, VIDEOS_COLLECTION), {
      ...videoData,
      uploadedAt: serverTimestamp(),
      views: 0,
      likes: 0,
      source: 'upload',
    })
    return docRef.id
  } catch (error) {
    console.error('Error saving video metadata:', error)
    throw error
  }
}

/**
 * Get all uploaded videos from Firestore
 */
export const getUploadedVideos = async () => {
  try {
    const q = query(
      collection(db, VIDEOS_COLLECTION),
      orderBy('uploadedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    const videos = []
    querySnapshot.forEach((doc) => {
      videos.push({
        id: doc.id,
        ...doc.data(),
        uploadedAt: doc.data().uploadedAt?.toDate?.() || new Date(),
      })
    })
    return videos
  } catch (error) {
    console.error('Error fetching uploaded videos:', error)
    throw error
  }
}

/**
 * Delete video (both from storage and database)
 */
export const deleteVideo = async (videoId, storagePath) => {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, VIDEOS_COLLECTION, videoId))

    // Delete from Cloud Storage
    if (storagePath) {
      const fileRef = ref(storage, storagePath)
      await deleteObject(fileRef)
    }
  } catch (error) {
    console.error('Error deleting video:', error)
    throw error
  }
}

/**
 * Update video metadata (views, likes, etc)
 */
export const updateVideoMetadata = async (videoId, updates) => {
  try {
    const videoRef = doc(db, VIDEOS_COLLECTION, videoId)
    // Note: Use updateDoc in real implementation
    // For now, just return success
    return videoRef
  } catch (error) {
    console.error('Error updating video:', error)
    throw error
  }
}
