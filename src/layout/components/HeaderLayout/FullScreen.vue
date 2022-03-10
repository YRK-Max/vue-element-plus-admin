<template>
  <el-tooltip content="全屏" placement="bottom">
    <div class="flex items-center justify-center h-full px-2 menu" @click="handleFullScreen">
      <i :class="['yicon-common', isFullscreen?'yicontuichuquanping':'yiconquanping']"></i>
    </div>
  </el-tooltip>
</template>
<script setup>
import { useFullscreen } from '@vueuse/core';

const { toggle, isFullscreen } = useFullscreen();

function handleFullScreen() {
  toggle()
}
</script>
<style lang="scss" scoped>
.menu {
  &:hover {
    background-color: #f0f0f0
  }
}
</style>