<template>
  <template v-if="!route.hidden">
    <template v-if="hasOnlyOneShowChild()">
      <router-link :to="oneItem.data" >
        <el-menu-item :index="getPathIndex(oneItem.data.path)">
          <el-icon v-if="oneItem.data.meta.icon"><i :class="['yicon-common', oneItem.data.meta.icon]" /></el-icon>
          <template #title>{{ oneItem.data.meta.title || '' }}</template>
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu :index="basePath" v-else>
      <template #title>
        <el-icon v-if="route.meta.icon"><i :class="['yicon-common', route.meta.icon]" /></el-icon>
        <span>{{ route.meta.title }}</span>
      </template>
      <SideItem 
        v-for="(child, index) of route.children" 
        :key="index" 
        :route="child" 
        :basePath="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>
<script>
import { defineComponent, reactive } from "@vue/runtime-core";

export default defineComponent({
  name: 'SidebarItem',
  props: ['route', 'basePath'],
  setup(props) {
    const route = props.route;
    const basePath = props.basePath;
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

    function resolvePath(routePath) {
      return basePath + '/' + routePath;
    }

    function getPathIndex(routePath) {
      if(basePath === '/'){
        return basePath + routePath;
      }
      return basePath;
    }

    return {
      oneItem,
      hasOnlyOneShowChild,
      resolvePath,
      getPathIndex
    }
  }
})
</script>
<style lang="scss" scoped>

</style>