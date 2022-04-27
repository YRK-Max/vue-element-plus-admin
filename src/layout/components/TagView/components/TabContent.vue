<template>
  <el-dropdown>
    <span class="h-full flex justify-center items-center extra-tab cursor-pointer px-2">
      <i class="yicon-common yiconxiangxia" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>关闭其他页面</el-dropdown-item>
        <el-dropdown-item>全部关闭</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  setup() {},
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
