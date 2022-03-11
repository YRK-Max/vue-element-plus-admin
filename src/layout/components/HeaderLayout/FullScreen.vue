<template>
  <el-tooltip content="全屏" placement="bottom">
    <div class="flex items-center justify-center h-full px-3 cursor-pointer hover:bg-gray-100" @click="handleFullScreen">
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

</style>