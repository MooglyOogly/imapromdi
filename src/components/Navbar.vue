<template>
  <Menubar :model="menu" class="grid border-noround w-screen h-auto">
    <template #start>
      <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="p-mr-2">
    </template>
    <template #end>
      <Button icon="pi pi-sign-out" />
    </template>
  </Menubar>
</template>

<script>
import { ref } from "@vue/reactivity"

export default {
  setup() {
    const menu = ref([
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        to: { name: 'Home'}
      },
      {
        label: 'Products',
        icon: 'pi pi-eject',
        to: { name: 'CommodityInfo'}
      }, 
      {
        label: 'Market',
        icon: 'pi pi-shopping-bag',
        to: { name: 'CommodityInfo' }
      },
      {
        label: 'Services',
        icon: 'pi pi-compass'
      },
      {
        icon: 'pi pi-user',
        to: { name: 'FarmInfo'}
      }
    ])
    
    return { menu }
  }

}
</script>

<style>
</style>