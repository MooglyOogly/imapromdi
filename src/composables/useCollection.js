import { ref } from "@vue/reactivity";

import { db } from "../firebase/config";
import { collection, addDoc } from "@firebase/firestore";

const useCollection = (c) => {
  const error = ref(null)
  const isPending = ref(false)
  const colRef = collection(db, c)

  const createDoc = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const res = await addDoc(colRef, { ...doc })
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not add the document'
      isPending.value = false
    }
  }

  return { error, createDoc, isPending }
}

export default useCollection