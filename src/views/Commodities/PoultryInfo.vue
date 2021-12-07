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
      <DataTable :value="crops" responsiveLayout="scroll">
          <Column field="id" header="Crop ID"></Column>
          <Column field="commodity" header="Commodity"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="variety" header="Variety"></Column>
          <Column field="stock" header="Stock"></Column>
          <Column field="plantedArea" header="Planted Area"></Column>
          <Column field="plantDate" header="Planting Date"></Column>
          <Column field="harvestDate" header="Harvest Date"></Column>
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
      const { documents: crops } = getSingleCollection( 'commodity', [ "typeOfCommodity", '==', 'crop'] )

      console.log(crops)

      return { crops }
    }
}
</script>

<style>

</style>