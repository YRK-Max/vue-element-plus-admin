<template>
  <el-container class="main-container">
    <el-aside>
      <el-drawer
        v-if="!isDesktop"
        v-model="isCollapse"
        direction="ltr"
        size="200"
        :show-close="false"
        :with-header="false"
        :before-close="handleDrawerClose"
      >
        <ASide />
      </el-drawer>
      <div
        v-else
        class="h-full"
      >
        <Aside />
      </div>
    </el-aside>
    <el-container>
      <el-header height="48px">
        <HeaderLayout />
      </el-header>
      <el-main>
        <el-container class="main-area">
          <el-header
            v-if="isDesktop"
            class="page-tag"
          >
            <TagView />
          </el-header>
          <el-main>
            <div class="content-router-view">
              <router-view
                v-if="isRouterAlive"
                v-slot="{ Component }"
              >
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </div>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ASide from './components/Aside'
import HeaderLayout from './components/HeaderLayout'
import TagView from './components/TagView/index.vue'
import store from '@/store'
import Aside from './components/Aside/index.vue'
import { computed, nextTick, ref } from '@vue/runtime-core'

export default {
  name: 'LayoutIframe',
  components: { ASide, HeaderLayout, TagView, Aside },
  beforeMount() {
    this.handleResize()
    window.addEventListener('resize', () => {
      this.handleResize()
    })
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  setup() {
    const { body } = document
    const drawerVisible = true
    const WIDTH = 992
    const isDesktop = computed(() => store.state.app.device === 'desktop')
    const isCollapse = computed(() => !store.state.app.sideCollapse)
    const isRouterAlive = ref(true)

    function isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }

    function handleResize() {
      store.dispatch('app/toggleDevice', isMobile() ? 'mobile' : 'desktop')
    }

    function handleDrawerClose() {
      store.dispatch('app/setSideCollapse', true)
    }

    async function reload() {
      isRouterAlive.value = false
      await nextTick()
      isRouterAlive.value = true
    }

    return {
      store,
      drawerVisible,
      isDesktop,
      isCollapse,
      isRouterAlive,
      handleResize,
      handleDrawerClose,
      reload
    }
  }
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
.main-container :deep(.el-drawer__body) {
  padding: 0 !important;
}
.main-container :deep(.el-main) {
  padding: 0;
}

.main-area {
  height: 100%;
  .page-tag {
    height: 30px;
    padding: 3px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e3e3e3;
  }
}
.content-router-view {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
