<template>
  <form @submit.prevent="handleSubmit">
      <h4>Counter</h4>
      <button>Add</button>
    </form>
</template>

<script>
import useCounter from "../composables/useCounter";
const { increment, decrement } = useCounter("commodity", "--stats--")

export default {
  setup() {
    const userType = "Farmer"

    const handleSubmit = async () => {
            await increment('tree')
        }

    return { handleSubmit }
  }

}
</script>

<style>

</style>