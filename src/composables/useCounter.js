import { ref, watchEffect } from 'vue'

import { db } from '../firebase/config'
import { doc, runTransaction } from 'firebase/firestore'

const useCounter = (c, d) => {

  let error = ref(null)
  let isPending = ref(false)
  
  let docRef = doc(db, c, d)

  const increment = async (q) => {
    isPending.value = true
    error.value = null

    try {
      await runTransaction(db, async (transcation) => {
        const doc = await transcation.get(docRef)
        let nCount = ''
        let mCount = ''

        if (!doc.exists()) {
          throw "Document does not exist!"
        }

        switch(q) {
          case 'farmer':
            nCount = doc.data().farmerCount + 1
            mCount = doc.data().userCount + 1
            transcation.update(docRef, { farmerCount : nCount, userCount : mCount})
            break;
          case 'market':
            nCount = doc.data().marketCount + 1
            mCount = doc.data().userCount + 1
            transcation.update(docRef, { marketCount : nCount, userCount : mCount})
            break;
          case 'farm':
            nCount = doc.data().farmCount + 1
            transcation.update(docRef, { farmCount : nCount})
            break;
          case 'crops':
            nCount = doc.data().cropCount + 1
            mCount = doc.data().commodityCount + 1
            transcation.update(docRef, { cropCount : nCount, commodityCount : mCount })
            break;
          case 'livestock':
            nCount = doc.data().livestockCount + 1
            mCount = doc.data().commodityCount + 1
            transcation.update(docRef, { livestockCount : nCount, commodityCount : mCount })
            break;
          case 'poultry':
            nCount = doc.data().poultryCount + 1
            mCount = doc.data().commodityCount + 1
            transcation.update(docRef, { poultryCount : nCount, commodityCount : mCount })
            break;
          case 'fishery':
            nCount = doc.data().fisheryCount + 1
            mCount = doc.data().commodityCount + 1
            transcation.update(docRef, { fisheryCount : nCount, commodityCount : mCount })
            break;
          case 'tree':
            nCount = doc.data().treeCount + 1
            mCount = doc.data().commodityCount + 1
            transcation.update(docRef, { treeCount : nCount, commodityCount : mCount })
            break
          default:
            error.value = 'could not increment the document'
        }
      })
      console.log("Successfully incremented!")
    }
    catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not increment the document'
    }
  }

  const decrement = async (q) => {
    isPending.value = true
    error.value = null

    try {
      await runTransaction(db, async (transcation) => {
        const doc = await transcation.get(docRef)
        let nCount = ''
        let mCount = ''

        if (!doc.exists()) {
          throw "Document does not exist!"
        }

        switch(q) {
          case 'farmer':
            nCount = doc.data().farmerCount - 1
            mCount = doc.data().userCount - 1
            transcation.update(docRef, { farmerCount : nCount, userCount : mCount})
            break;
          case 'market':
            nCount = doc.data().marketCount - 1
            mCount = doc.data().userCount - 1
            transcation.update(docRef, { marketCount : nCount, userCount : mCount})
            break;
          case 'farm':
            nCount = doc.data().farmCount - 1
            transcation.update(docRef, { farmCount : nCount})
            break;
          case 'crop':
            nCount = doc.data().cropCount - 1
            mCount = doc.data().commodityCount - 1
            transcation.update(docRef, { cropCount : nCount, commodityCount : mCount })
            break;
          case 'livestock':
            nCount = doc.data().livestockCount - 1
            mCount = doc.data().commodityCount - 1
            transcation.update(docRef, { livestockCount : nCount, commodityCount : mCount })
            break;
          case 'poultry':
            nCount = doc.data().poultryCount - 1
            mCount = doc.data().commodityCount - 1
            transcation.update(docRef, { poultryCount : nCount, commodityCount : mCount })
            break;
          case 'fishery':
            nCount = doc.data().fisheryCount - 1
            mCount = doc.data().commodityCount - 1
            transcation.update(docRef, { fisheryCount : nCount, commodityCount : mCount })
            break;
          case 'tree':
            nCount = doc.data().treeCount - 1
            mCount = doc.data().commodityCount - 1
            transcation.update(docRef, { treeCount : nCount, commodityCount : mCount })
            break
          default:
            error.value = 'could not decrement the document'
        }
      })
      console.log("Successfully decremented!")
    }
    catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not decrement the document'
    }
  }

  return { error, isPending, increment, decrement }

}

export default useCounter