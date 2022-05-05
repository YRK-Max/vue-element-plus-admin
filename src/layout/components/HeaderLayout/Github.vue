<template>
  <el-tooltip
    content="github"
    placement="bottom"
  >
    <div
      class="flex items-center justify-center h-full px-3 cursor-pointer hover:bg-gray-100"
      @click="handleGoGithub"
    >
      <i class="yicon-common yicongithub"></i>
    </div>
  </el-tooltip>
</template>
<script setup>
function handleGoGithub() {
  window.open('https://github.com/YRK-Max/vue-element-plus-admin')
}
</script>
<style lang="scss" scoped>
</style>
