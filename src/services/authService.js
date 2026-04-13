import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { auth } from './firebaseConfig'
import { db } from './firebaseConfig'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'

// Set persistence to local storage
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting persistence:', error)
})

/**
 * Admin login with email and password
 */
export const adminLogin = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * Admin logout
 */
export const adminLogout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

/**
 * Get current authenticated user
 */
export const getCurrentUser = () => {
  return auth.currentUser
}

/**
 * Listen to auth state changes
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

/**
 * Get auth instance
 */
export const getAuthInstance = () => {
  return auth
}

/**
 * Customer signup with email, password, and full name
 */
export const customerSignUp = async (email, password, firstName, lastName) => {
  try {
    // Create auth user
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user

    // Update display name in auth
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    })

    // Create user profile document in Firestore
    const userDocRef = doc(db, 'users', user.uid)
    await setDoc(userDocRef, {
      id: user.uid,
      email: email,
      displayName: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
      avatar: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      preferences: {
        newsletter: false,
        theme: 'dark',
        notifications: true,
      },
    })

    return user
  } catch (error) {
    console.error('Customer signup error:', error)
    throw error
  }
}

/**
 * Customer login with email and password
 */
export const customerLogin = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    console.error('Customer login error:', error)
    throw error
  }
}

/**
 * Customer logout
 */
export const customerLogout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Customer logout error:', error)
    throw error
  }
}

/**
 * Get current customer
 */
export const getCurrentCustomer = () => {
  return auth.currentUser
}

/**
 * Listen to customer auth state changes
 */
export const onCustomerAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

/**
 * Update customer profile information
 */
export const updateCustomerProfile = async (updates) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('No user logged in')

    // Update auth profile if displayName is being updated
    if (updates.firstName || updates.lastName) {
      const displayName = `${updates.firstName || user.displayName?.split(' ')[0]} ${updates.lastName || user.displayName?.split(' ')[1]}`.trim()
      await updateProfile(user, { displayName })
    }

    // Update Firestore document
    const userDocRef = doc(db, 'users', user.uid)
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })

    return user
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

/**
 * Check if user is customer authenticated
 */
export const isCustomerAuthenticated = () => {
  return !!auth.currentUser
}

/**
 * Get customer profile from Firestore
 */
export const getCustomerProfile = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      throw new Error('User profile not found')
    }

    return userDoc.data()
  } catch (error) {
    console.error('Get customer profile error:', error)
    throw error
  }
}
