<template>
  <div>
    <Toast />
    <div class="grid">
      <div class="col">
        <Navbar />
      </div>
      <div class="col-fixed card">
        <Sidebar />
      </div>
      <div class="col card m-1">
        <TabInfo />
        <Toolbar class="mb-4">
          <template #start>
            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
            <Button
              label="Delete"
              icon="pi pi-trash"
              class="p-button-danger"
              @click="confirmDeleteSelected"
              :disabled="!selectedProducts || !selectedProducts.length"
            />
          </template>

          <template #end>
            <FileUpload
              mode="basic"
              accept="image/*"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              class="mr-2 inline-block"
            />
            <Button
              label="Export"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>
        <DataTable
          :value="crops"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
        >
          <template #header>
            <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
              <h5 class="mb-2 p-m-md-0 p-as-md-center">Manage Products</h5>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="id" header="Crop ID"></Column>
          <Column field="commodity" header="Commodity"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="variety" header="Variety"></Column>
          <Column field="stock" header="Stock"></Column>
          <Column field="plantedArea" header="Planted Area"></Column>
          <Column field="plantDate" header="Planting Date"></Column>
          <Column field="harvestDate" header="Harvest Date"></Column>
          <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="updateProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Crop Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Crop Name</label>
        <InputText
          id="name"
          v-model="product.commodity"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !product.commodity }"
        />
        <small class="p-error" v-if="submitted && !product.commodity">Name is required.</small>
      </div>
      <div class="field">
        <label for="variety">Variety</label>
        <InputText
          id="variety"
          v-model="product.variety"
          required="true"
          :class="{ 'p-invalid': submitted && !product.variety }"
        />
        <small class="p-error" v-if="submitted && !product.variety">Variety is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea
          id="description"
          v-model="product.description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>

      <div class="field">
        <label for="plantDate">Date Planted</label>
        <Calendar
          id="plantDate"
          v-model="product.plantDate"
          autocomplete="off"
          :showIcon="true"
          required="true"
          :class="{ 'p-invalid': submitted && !product.plantDate }"
        />
        <small class="p-error" v-if="submitted && !product.plantDate">Date is required.</small>
      </div>

      <div class="field">
        <label for="harvestDate">Expected Harvest Date</label>
        <Calendar
          id="harvestDate"
          v-model="product.harvestDate"
          autocomplete="off"
          :showIcon="true"
        />
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="area">Area Planted</label>
          <InputNumber id="area" v-model="product.plantedArea" />
        </div>
        <div class="field col">
          <label for="quantity">Expected Yield</label>
          <InputNumber id="quantity" v-model="product.stock" integeronly />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { FilterMatchMode } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { defineComponent } from '@vue/runtime-core'

import Navbar from '../../components/Navbar.vue'
import Sidebar from '../../components/Sidebar.vue'
import TabInfo from '../../components/TabInfo.vue'

import getSingleCollection from '../../composables/getSingleCollection'
import getUser from '../../composables/getUser'
import useCollection from '../../composables/useCollection'
import useDocument from '../../composables/useDocument'
import useCounter from '../../composables/useCounter'

export default defineComponent({
  components: { Navbar, Sidebar, TabInfo },
  setup() {
    const { documents: crops } = getSingleCollection('commodity', ["typeOfCommodity", '==', 'crops'])
    const { error, createDoc } = useCollection('commodity')
    const { updateDoc } = useDocument('commodity', product.value.id)
    const { increment, decrement } = useCounter('commodity', '--stats--')
    const { user } = getUser()

    const toast = useToast();
    const dt = ref();
    const productDialog = ref(false);
    const type = 'crops'

    const deleteProductDialog = ref(false);
    const deleteProductsDialog = ref(false);
    const product = ref({});
    const selectedProducts = ref();
    const filters = ref({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const submitted = ref(false)
    const isPending = ref(false)

    const openNew = () => {
      product.value = {};
      submitted.value = false;
      productDialog.value = true;
    };
    const hideDialog = () => {
      productDialog.value = false;
      submitted.value = false;
    };

    const saveProduct = async () => {
      submitted.value = true;
      if (product.value) {
        if (product.value.id) {
          console.log("HORORORO")
          const res = await updateDoc({})


          
        } else {
          isPending.value = true
          const res = await createDoc({
            typeOfCommodity: type,
            commodity: product.value.commodity,
            description: product.value.description,
            variety: product.value.variety,
            harvestDate: product.value.harvestDate,
            plantDate: product.value.plantDate,
            plantedArea: product.value.plantedArea,
            stock: product.value.stock,
            userName: user.value.displayName
          })

          isPending.value = false
          if (!error.value) {
            await increment('crops')
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 })
            productDialog.value = false;
          }
        }

      }
    };

    const updateProduct = (crop) => {
      product.value = { ...crop };
      console.log("PRODUCT VALUE", product.value)
      productDialog.value = true;
    };

    return { crops, openNew, filters, productDialog, hideDialog, saveProduct, updateProduct , submitted, product }
  }
})
</script>

<style>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>