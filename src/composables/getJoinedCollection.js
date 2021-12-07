import { ref, watchEffect } from 'vue'

// firebase imports
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const getJoinedCollection= (c1, c2) => {
  const documents = ref(null)

  // collection reference
  let colRef1 = collection(db, c1)
  let colRef2 = collection(db, c2)

  const unsub = 
    onSnapshot(colRef1, snapshot1 => {
      onSnapshot(colRef2, snapshot2 => {
        let results = []
        snapshot1.docs.forEach(doc1 => {
         snapshot2.docs.forEach(doc2 => {
          if(doc1.get('userId') === doc2.get('userId') && doc1.id != '--stats--') {
            results.push({ ...doc1.data(), ...doc2.data(), id: doc1.id, id: doc2.id })
           } 
          })
        })
        documents.value = results
        console.log("Joined Collection", " => ",documents.value)
      }) 
    })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents }
}

export default getJoinedCollection