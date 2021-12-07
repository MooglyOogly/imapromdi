import { ref, watchEffect } from 'vue'

// firebase imports
import { db } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

const getCounter = (c, d, f) => {
  let document =  ref(null)
  let error = ref(null)
  
  let docRef = doc(db, c, d)
  
  const unsub = onSnapshot(docRef, doc => {
    if(doc.data()) {
      document.value = doc.get(f)
      console.log('Composable Counter:', document.value)
      error.value = null
    }
    else {
      error.value = 'that document does not exist'
    }
  }, err => {
    console.log(err.message)
    error.value = 'problem fetching the document'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document }
}

export default getCounter 