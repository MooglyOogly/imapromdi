<template>
  <div class="grid">
    <div class="col">
      <Navbar />
    </div>
    <div class="col-fixed flex m-1">
      <Sidebar />  
    </div>
    <div class="col field m-1">
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
import { ref } from '@vue/reactivity'

import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import TabInfo from '../components/TabInfo.vue'
import getSingleCollection from '../composables/getSingleCollection'

export default {

  components: { Navbar, Sidebar, TabInfo },
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