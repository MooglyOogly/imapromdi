import { ref } from 'vue'

// Firebase Imports
import { auth, db } from '../firebase/config'
import { onAuthStateChanged } from '@firebase/auth'
import { collection, query, where, getDocs } from '@firebase/firestore'

const user = ref(auth.currentUser)

onAuthStateChanged(auth, _user => {
  console.log('User state change. Current user is:', _user)
  user.value = _user
})

const getUser = () => {
  return { user }
}

export default getUser