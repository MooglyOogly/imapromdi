<template>
  <p>This is  dashboard </p>
</template>

<script>
import { watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import getUser from '../composables/getUser'

import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

export default {
  
  setup() {
    const router = useRouter()
    const { user } = getUser()
    
    const docRef = doc(db, 'users', user.value.uid)
    const docSnap = getDoc(docRef)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
    } else {
      console.log("No such document")
    }

   
    const name = user.value.displayName
    const uid = user.value.uid

    console.log(name + ' ' + uid)

    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'Welcome'})
      }
    })
  }

}
</script>

<style>

</style>