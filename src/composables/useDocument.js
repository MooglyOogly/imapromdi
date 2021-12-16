import { ref } from "@vue/reactivity";

import { db } from '../firebase/config'
import { doc, addDoc, updateDoc } from 'firebase/firestore'

const useDocument = (c, q) => {

  let error = ref(null)
  let isPending = ref(false)
  let docRef = doc(db, c, q)

  const setDoc = async () => {
    isPending.value = true
    error.value = null

    try {
      const res = await addDoc(colRef), {
        
      } 
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not create the document'
    }
  }

  const deleteDoc = async () => {
    isPending.value = true
    error.value = null

    try {
      const res = await docRef.delete()
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not delete the document'
    }
  }

  const updateDoc = async (updates) => {
    isPending.value = true
    error.value = null

    try {
      const res = await docRef.update(updates)
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not update the document'
    }
  }

  return { error, isPending, setDoc, deleteDoc, updateDoc }

}

export default useDocument