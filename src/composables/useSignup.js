import { ref } from 'vue'

// Firebase Imports
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, collection, addDoc} from 'firebase/firestore'

const error = ref(null)
const isPending = ref(false)
const colRef = collection(db, "users")

const signup = async (email, password, displayName, phoneNumber, barangay, userType) => {
  error.value = null
  isPending.value = true
  
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not complete signup')
    }
    await updateProfile(auth.currentUser, {displayName})
    
    const user = ref(auth.currentUser)
    
    if(userType === 'Farmer') {
      await addDoc(colRef, {
        barangay: barangay,
        phoneNumber: phoneNumber,
        type: userType,
        userId: user.value.uid,
        farmId: ''
      })

    } else {
      await addDoc(colRef, {
        barangay: barangay,
        phoneNumber: phoneNumber,
        type: userType,
        userId: user.value.uid,
        marketId: ''
      })
    }

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