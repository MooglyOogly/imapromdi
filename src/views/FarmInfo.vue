<template>
  <div class="grid">
    <div class="col">
        <Navbar />
    </div>
    <div class="col-fixed flex">
      <Sidebar />  
    </div>
    <div class="col field">
      <DataTable :value="farms" responsiveLayout="scroll">
          <Column field="id" header="Farm ID"></Column>
          <Column field="farmName" header="Farm Name"></Column>
          <Column field="ownerName" header="Owner Name"></Column>
          <Column field="farmArea" header="Area (Ha)"></Column>
          <Column field="barangay" header="Barangay"></Column>
      </DataTable>
    </div>
  </div>

</template>

<script>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import getSingleCollection from '../composables/getSingleCollection'

import { db } from '../firebase/config'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default {
  components: { Navbar, Sidebar },
  setup() {
    const { documents: farms } = getSingleCollection(
      'farm'
    )
    
    console.log(farms.value)

    return { farms }
  }
  
}
</script>

<style>

</style>