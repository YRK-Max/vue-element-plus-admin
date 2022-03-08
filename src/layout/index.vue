<template>
  <el-container class="main-container">
    <el-aside>
      <ASide />
    </el-aside>
    <el-container>
      <el-header height="48px">
        <HeaderLayout />
      </el-header>
      <el-main>
        <el-container class="main-area">
          <el-header class="page-tag">
            <TagView />
          </el-header>
          <el-main>
            <div style="height: 100%; width: 100%; overflow: auto">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ASide from "./components/ASide.vue";
import HeaderLayout from "./components/HeaderLayout";
import TagView from "./components/TagView/index.vue";
export default {
    name: "LayoutIframe",
    components: { ASide, HeaderLayout, TagView }
}
</script>
<style lang="scss" scoped>
.main-container {
  height: 100vh;
  overflow: hidden;
}

.main-container :deep(.el-aside) {
  width: auto;
}

.main-container :deep(.el-header) {
  box-shadow: 0 2px 2px #f0f0f0;
  padding: 0;
}

.main-container :deep(.el-main) {
  padding: 0;
}

.main-area {
  height: 100%;
  .page-tag {
    height: 34px;
    padding: 3px 5px;
    display: flex;
    align-items: center;
  }
}
</style>