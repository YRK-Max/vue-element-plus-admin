<template>
  <template v-if="!route.hidden">
    <template v-if="hasOnlyOneShowChild()">
      <router-link :to="oneItem.data" >
        <el-menu-item :index="oneItem.data.name">
          <el-icon v-if="oneItem.data.meta.icon"><i :class="['yicon-common', oneItem.data.meta.icon]" /></el-icon>
          <template #title>{{ $t('route.' + oneItem.data.meta.title) || '' }}</template>
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu class="sub-menu" :index="route.path" v-else>
      <template #title>
        <el-icon v-if="route.meta.icon"><i :class="['yicon-common', route.meta.icon]" /></el-icon>
        <span>{{ $t('route.' + route.meta.title) }}</span>
      </template>
      <SideItem 
        v-for="(child, index) of route.children" 
        :key="index" 
        :route="child"
      />
    </el-sub-menu>
  </template>
</template>
<script>
import { defineComponent, reactive } from "@vue/runtime-core";

export default defineComponent({
  name: 'SidebarItem',
  props: ['route'],
  setup(props) {
    const route = props.route;
    let oneItem = reactive({data: {meta: {title: ''}} });

    function hasOnlyOneShowChild() {
      if(!(route.children)) {
        oneItem.data = route
        return true;
      }

      if(route.children.length === 1) {
        oneItem.data = route.children[0];
        return true;
      }

      return false;
    }

    return {
      oneItem,
      hasOnlyOneShowChild
    }
  }
})
</script>
<style lang="scss">
.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title{
  color: var(--el-menu-active-color) !important;
}
</style>