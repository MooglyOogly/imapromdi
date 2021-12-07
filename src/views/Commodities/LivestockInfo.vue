<template>
  <div class="grid">
    <div class="col">
      <Navbar />
    </div>
    <div class="col-fixed flex m-auto">
      <Sidebar />  
    </div>
    <div class="col field m-1">
      <TabInfo />
    <div class="col field">
      <DataTable :value="livestock" responsiveLayout="scroll">
          <Column field="id" header="Crop ID"></Column>
          <Column field="commodity" header="Commodity"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="stock" header="Stock"></Column>
          <Column field="farrowDate" header="Planting Date"></Column>
      </DataTable>
    </div>
    </div>
  </div>
  
</template>

<script>
import { ref } from '@vue/reactivity';
import { computed } from '@vue/reactivity';

import Navbar from '../../components/Navbar.vue'
import Sidebar from '../../components/Sidebar.vue'
import TabInfo from '../../components/TabInfo.vue';

import getSingleCollection from '../../composables/getSingleCollection';

export default {
    components: { Navbar, Sidebar, TabInfo },
    setup() {
      const { documents: livestock } = getSingleCollection( 'commodity', [ "typeOfCommodity", '==', 'livestock'] )

      return { livestock }
    }
}
</script>

<style>

</style>