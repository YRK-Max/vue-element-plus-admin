<template>
  <div class="main-div">
    <div class="flex items-center -enter-x">
      <el-icon :size="20" class="collapse-btn ml-2" :style="{ transform: store.state.app.sideCollapse?'rotateY(-180deg)':'rotateY(0deg)'}" @click="FoldControl">
        <fold />
      </el-icon>
      <Breadcrumb />
    </div>
    <div class="flex text-sm h-full">
      <FullScreen />
      <LocalePicker />
      <UserDropdown />
    </div>
  </div>
</template>
<script setup>
import { Fold } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import Breadcrumb from './Breadcrumb.vue'
import UserDropdown from './UseDropdown.vue'
import LocalePicker from './LocalePicker.vue';
import FullScreen from './FullScreen.vue';

const store = useStore()

function FoldControl() {
  store.dispatch('app/setSideCollapse', !store.getters['app/getSideCollapse'])
}
</script>
<style scoped>
.main-div {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collapse-btn {
  cursor: pointer;
  transition: all 0.4s;
}
</style>