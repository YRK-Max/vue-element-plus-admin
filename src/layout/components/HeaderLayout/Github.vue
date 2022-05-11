<template>
  <el-tooltip
    content="github"
    placement="bottom"
  >
    <div
      class="flex items-center justify-center h-full px-3 cursor-pointer hover:bg-gray-100"
      @click="handleGoGithub"
    >
      <YIcon :size="22" icon="yicongithub" />
    </div>
  </el-tooltip>
</template>
<script setup>
import YIcon from '@/components/YIcon.vue'
function handleGoGithub() {
  window.open('https://github.com/YRK-Max/vue-element-plus-admin')
}
</script>
<style lang="scss" scoped>
</style>
