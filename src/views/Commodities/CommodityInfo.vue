<template>
  <div class="grid">
    <div class="col">
      <Navbar />
    </div>
    <div class="col-fixed flex m-auto">
      <!-- <Sidebar />   -->

    </div>
    <div class="col field m-1 overflow-auto">
      <TabInfo />
        <Toolbar class="p-mb-4">
          <template #start>
            <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
          </template>

          <template #end>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />           
          </template>
      </Toolbar>

    <div class="col field">
      <DataTable :value="commodity" responsiveLayout="scroll">
           <template #header>
              <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Manage Products</h5>
						<span class="p-input-icon-left">
              <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
					</div>
                </template>
          <Column field="id" header="Commodity ID"></Column>
          <Column field="typeOfCommodity" header="Type"></Column>
          <Column field="commodity" header="Commodity"></Column>
          <Column field="stock" header="Stock"></Column>
          <Column field="description" header="Description"></Column>
      </DataTable>
    </div>
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