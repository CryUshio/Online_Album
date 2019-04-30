<template lang="html">

</template>

<script>
export default {
  mounted(){
    this.$store.commit('setUserCenter', { recNavId: 0 })
    this.$store.commit('setLocalStorage')
  }
}
</script>

<style scoped>
</style>
