<template>
  <div class="grid">
    <div class="col">
      <Navbar />
    </div>
    <div class="col card flex m-auto">
      <Sidebar />
    </div>
    <div class="col card m-1">
      <TabInfo />
      <DataTable ref="dt" :value="commodity" responsiveLayout="scroll" v-model:selection="selectedProducts">
           <template #header>
              <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						    <h5 class="p-mb-2 p-m-md-0 p-as-md-center">Manage Products</h5>
						    <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText placeholder="Search..." />
                </span>
					    </div>
            </template>
          
          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="id" :sortable="true" header="Commodity ID"></Column>
          <Column field="typeOfCommodity" :sortable="true" header="Type"></Column>
          <Column field="commodity" :sortable="true" header="Commodity"></Column>
          <Column field="stock" :sortable="true" header="Stock"></Column>
          <Column field="description" :sortable="true" header="Description"></Column>
      </DataTable>
    </div>
  </div>
  
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Sidebar from '../../components/Sidebar.vue'
import TabInfo from '../../components/TabInfo.vue';

import getSingleCollection from '../../composables/getSingleCollection'

export default {
  components: { Navbar, Sidebar, TabInfo },
  setup() {
    const { documents: commodity } = getSingleCollection('commodity')
    

    return { commodity }
  }
}
</script>

<style>

</style>