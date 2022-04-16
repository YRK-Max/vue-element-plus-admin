<template>
  <div class="main-layout">
    <LayoutEditor />
  </div>
</template>

<script>
import LayoutEditor from '@/components/LayoutEditor'

export default {
  components: {
    LayoutEditor
  }
}
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100%;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  background: #444f5a;
}
</style>