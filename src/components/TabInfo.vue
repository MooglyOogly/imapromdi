<template>
  <TabMenu :model="items" />
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const items = ref([
            {
                label: 'Crops',
                icon: 'pi pi-fw pi-home',
                to: '/crops'
            },
            {
                label: 'Livestock',
                icon: 'pi pi-fw pi-calendar',
                to: '/livestock'
            },
            {
                label: 'Poultry',
                icon: 'pi pi-fw pi-pencil',
                to: '/poultry'
            },
            {
                label: 'Fishery',
                icon: 'pi pi-fw pi-file',
                to: '/fishery'
            },
            {
                label: 'Tree',
                icon: 'pi pi-fw pi-cog',
                to: '/trees'
            }
        ]);

    return { items }
  }
}
</script>

<style>

</style>