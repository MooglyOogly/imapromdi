<template>
  <Menu class="border-noround h-screen" :model='menu' />
</template>

<script>
export default {
  setup() {
    const menu = [
      {
        label: 'Commodity Info',
        to: { name: 'CommodityInfo' }
      },
      {
        label: 'Market Info'
      },
    ]
    
    return { menu }
  }

}
</script>

<style>
</style>