<template>
  <span
    class="flex justify-center items-center extra-tab cursor-pointer px-2"
    @click="handleRedo"
  >
    <i class="yicon-common yiconshuaxin" />
  </span>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  inject: ['reload'],
  setup() {
    function handleRedo() {
      this.reload()
    }

    return {
      handleRedo,
    }
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
