<template lang="html">
  <div>
    <div :class="['shade', {'shade-in': transIn}]" @click="closeShade"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transIn: false,
    }
  },
  mounted() {
    setTimeout(()=>{
      this.transIn = true
    },10)
  },
  methods: {
    closeShade() {
      this.$emit('closeShade')
    }
  }
}
</script>

<style scoped>
.shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  transition: all .3s ease;
  z-index: 3;
}
.shade-in {
  background: rgba(0, 0, 0, 0.3);
}
</style>
