<template>
  <div class="aside-div">
    <div class="logo-div" :style="{ width: store.state.app.sideCollapse?'64px':'200px' }">
      <img style="height: 30px;" src="@/assets/images/logo.png" />
      <h1 v-if="!store.getters['app/getSideCollapse']">REPORT</h1>
    </div>
    <el-menu
      :default-active="path"
      class="el-menu-vertical-demo"
      :collapse="store.state.app.sideCollapse"
      background-color="#001529"
      text-color="#f0f0f0"
    >
      <SideItem 
        v-for="(route, index) of constantRoutes" 
        :key="index" 
        :route="route" 
        :basePath="route.path"
      />
    </el-menu>
  </div>
</template>
<script setup>
  // eslint-disable-next-line no-unused-vars
  import { Setting, Menu as IconMenu, Location, Document, HomeFilled } from '@element-plus/icons-vue'
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import SideItem from './SideItem';
  import { constantRoutes } from '@/router';

  const store = useStore();
  const route = useRoute();
  const path = computed(() => route.fullPath)
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.logo-div {
  height: 48px;
  background: #001529;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding-inline: 15px;
  transition: all 0.4s;

  h1 {
    color: #f0f0f0;
  }
}

.aside-div {
  height: 100%;
  border-right: 1px solid #afafaf;
  background: #001529;
  overflow-x: hidden;
}

.aside-div :deep(.el-menu) {
  border-right: 0;
}

.aside-div :deep(.el-sub-menu .el-menu-item) {
  background: #001b35;
}
</style>
