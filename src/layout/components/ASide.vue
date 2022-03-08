<template>
  <div class="aside-div">
    <div class="logo-div" :style="{ width: store.state.app.sideCollapse?'64px':'200px' }">
      <img style="height: 30px;" src="../../assets/images/logo.png" />
      <h1 v-if="!store.getters['app/getSideCollapse']">REPORT</h1>
    </div>
    <el-menu
      :default-active="path"
      class="el-menu-vertical-demo"
      :collapse="store.state.app.sideCollapse"
      background-color="#001529"
      text-color="#f0f0f0"
    >
      <router-link to="/home">
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
      </router-link>
      <el-sub-menu index="setting">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>系统设置</span>
        </template>
        <router-link to="/system/test">
          <el-menu-item index="/system/test">
            <template #title>
              设置
            </template>
          </el-menu-item>
        </router-link>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup>
  // eslint-disable-next-line no-unused-vars
  import { Setting, Menu as IconMenu, Location, Document, HomeFilled } from '@element-plus/icons-vue'
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const store = useStore();
  const route = useRoute();
  const path = computed(() => route.path)
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
