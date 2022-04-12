<template>
  <div class="main-div">
    <div class="flex items-center -enter-x">
      <el-icon
        class="collapse-btn ml-2"
        :size="20"
        :style="{ transform: state.app.sideCollapse?'rotateY(-180deg)':'rotateY(0deg)'}"
        @click="FoldControl"
      >
        <i class="yicon-common yicons-fold"></i>
      </el-icon>
      <Breadcrumb v-if="!isMobile" />
    </div>
    <div class="flex text-sm h-full enter-x">
      <Notification />
      <FullScreen v-if="!isMobile" />
      <LocalePicker />
      <UserDropdown />
      <Github />
    </div>
  </div>
</template>
<script setup>
import store from '@/store';
import Breadcrumb from './Breadcrumb.vue'
import UserDropdown from './UseDropdown.vue'
import LocalePicker from './LocalePicker.vue';
import FullScreen from './FullScreen.vue';
import { computed } from '@vue/runtime-core';
import Github from './Github.vue';
import Notification from './Notification.vue';

const state = store.state;
const isMobile = computed(() => state.app.device === 'mobile')

function FoldControl () {
  store.dispatch('app/setSideCollapse', !store.getters['app/getSideCollapse']);
  setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 300);
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