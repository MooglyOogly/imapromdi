<template>
  <Menu class="grid border-noround w-auto h-screen" :model='menu' />
</template>

<script>
export default {
  setup() {
    const menu = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        to: { name: 'Home'}
      },
      {
        label: 'Farm Information',
        to: { name: 'FarmInfo'}
      }, 
      {
        label: 'Farmer Information'
      },
      {
        label: 'Crops formation'
      }, 
      {
        label: 'Livestock Information'
      }, 
      {
        label: 'Poultry Information'
      },
      {
        label: 'Fishery Information'
      },
      {
        label: 'Trees Information'
      },   
      
    ]
    
    return { menu }
  }

}
</script>

<style>
</style>