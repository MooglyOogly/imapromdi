import { ref, watchEffect } from 'vue'

// firebase imports
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const getSingleCollection = (c, q) => {
  const documents = ref(null)

  // collection reference
  let colRef = collection(db, c)

  if (q) {
    console.log(...q)
    colRef = query(colRef, where(...q))
  }

  const unsub = onSnapshot(colRef, snapshot => {
    let results = []
    snapshot.docs.forEach(doc => {
      if(doc.id != '--stats--') {
        if(doc.get('plantingDate') || doc.get('expectedHarvest')) {
          const plantDate = doc.get('plantingDate').toDate().toDateString()
          const harvestDate = doc.get('expectedHarvest').toDate().toDateString()
          results.push({ ...doc.data(), plantDate: plantDate, harvestDate: harvestDate, id: doc.id })

        } else if (doc.get('dateFarrowed') || doc.get('dateHatched')) {
          const farrowDate = doc.get('dateFarrowed').toDate().toDateString()
          // const hatchDate = doc.get('dateHatched').toDate().toDateString()
          results.push({ ...doc.data(), farrowDate: farrowDate, id: doc.id })

        } else {
          results.push({ ...doc.data(), id: doc.id })
        }
      }
    })
    
    // update values
    documents.value = results
    
    console.log(documents.value)
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents }
}

export default getSingleCollection