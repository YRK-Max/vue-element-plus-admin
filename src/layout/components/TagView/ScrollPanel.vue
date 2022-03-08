<template>
  <el-scrollbar ref="scrollContainer" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>
<script>
export default {
  data() {
    return {
      leftPosition: 0
    }
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer
    }
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      this.scrollWrapper.setScrollLeft(this.scrollWrapper.wrap$.scrollLeft -= eventDelta / 4)
    }
  }
}
</script>
<style scoped>

</style>
