import { ref } from 'vue'

// Firebase Imports
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName, phoneNumber, barangay) => {
  error.value = null
  isPending.value = true
  
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not complete signup')
    }
    await updateProfile(auth.currentUser, {displayName})
    
    const user = ref(auth.currentUser)
    
    await setDoc(doc(db, "users", user.value.uid), {
      barangay: barangay,
      phoneNumber: phoneNumber,
      type: 'farmer',
    })
    
    error.value = null
    isPending.value = false
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useSignup = () => {
  return { error, isPending, signup }
}

export default useSignup