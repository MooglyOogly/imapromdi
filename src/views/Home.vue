<template>
  <div class="grid">
    <div class="col">
        <Navbar />
    </div>
    <!-- <div class="col-fixed flex">
      <Sidebar />  
    </div> -->
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
    const { document: totalUsers } = getCounter( 'users', '--stats--', 'userCount')
    const { document: farmerUsers } = getCounter( 'users', '--stats--', 'farmerCount')
    const { document: marketUsers } = getCounter( 'users', '--stats--', 'marketCount')

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