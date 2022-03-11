<template>
  <span class="flex justify-center items-center extra-tab cursor-pointer px-2">
    <i class="yicon-common yiconxiangxia"/>
  </span>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  setup() {
    
  },
})
</script>
<style lang="scss" scoped>
.extra-tab {
  color: rgb(182, 182, 182);
  border-left: 1px solid rgb(211, 211, 211);

  &:hover {
    color: rgb(102, 102, 102);
  }
}
</style>
