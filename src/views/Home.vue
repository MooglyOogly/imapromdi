<template>
  <div class="grid">
    <div class="col">
        <Navbar />
    </div>
    <div class="col-fixed flex">
      <Sidebar />  
    </div>
    <div class="col field">
      <div class="grid">
        <div class="col field">
            <Card>
              <template #title>
                Total Users
              </template> 
              <template #content>
                {{ totalUsers }}
              </template>
            </Card>

            <Card>
              <template #title>
                Farmer Users
              </template> 
              <template #content>
                {{ farmerUsers }}
              </template>
            </Card>

            <Card>
              <template #title>
                Market Users
              </template> 
              <template #content>
                {{ marketUsers }}
              </template>
            </Card>
        </div>

      <div class="col field">
        <DataTable :value="summary" responsiveLayout="scroll">
          <Column field="userId" header="User ID"></Column>
          <Column field="farmName" header="Farm Name"></Column>
          <Column field="ownerName" header="Owner Name"></Column>
          <Column field="commodity" header="Commodity"></Column>
          <Column field="stock" header="No. of Stock"></Column>
      </DataTable>
      </div>
    </div>
      
    </div>
  </div>
  
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'

import { computed, watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import getUser from '../composables/getUser'
import getSingleCollection from '../composables/getSingleCollection'
import getJoinedCollection from '../composables/getJoinedCollection'

import { db } from '../firebase/config'
import { collection, doc, DocumentSnapshot, getDoc, getDocs } from 'firebase/firestore'
import getCounter from '../composables/getCounter'

export default {
  components: { Navbar, Sidebar },
  setup(props) {
    // const router = useRouter()
    // const { user } = getUser()
    const { documents: summary } = getJoinedCollection( 'farm', 'commodity' )
    const { documents: users } = getSingleCollection( 'users', ['type', '==', 'Farmer'] )
    // const { error, document: userCount } = getCounter( 'users', 'userCounter' )
    const { error, document: totalUsers } = getCounter( 'users', 'userCounter', 'totalUsers')
    const { erro, document: farmerUsers } = getCounter( 'users', 'userCounter', 'farmerUsers')
    const { err, document: marketUsers } = getCounter( 'users', 'userCounter', 'marketUsers')

    // const docRef = doc(db, 'users', user.value.uid)
    // // const docSnap = await getDoc(docRef)

    // getDoc(docRef).then(docSnap => {
    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data())
    //   } else {
    //     console.log("No such document")o
    //   }
    // }
    
    console.log(totalUsers)
    
    return { summary, users, totalUsers, farmerUsers, marketUsers }
    
    // watch(user, () => {
    //   if (!user.value) {
    //     router.push({ name: 'Welcome'})
    //   }
    // })
  }

}
</script>

<style>

</style>