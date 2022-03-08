<template>
  <el-dropdown>
    <div class="flex items-center justify-center h-full px-2 user-menu">
      <img style="border-radius: 50%" class="w-[30px] mr-3" src="@/assets/images/avatar.jpg" />
      <label>Admin</label>
    </div>
    <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
  </el-dropdown>
</template>
<script setup>
import { ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import router from '@/router';

const store = useStore();
const route = useRoute();

function handleLogout() {
  ElMessageBox.confirm(
    '确定退出登录?',
    '退出登录',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(async() => {
    await store.dispatch('user/logout')
    router.push(`/login?redirect=${route.fullPath}`)
  }).catch(() => {
    // 不做操作
  })
}
</script>
<style lang="scss" scoped>
.user-menu {
  &:hover {
    background-color: #f0f0f0
  }
}
</style>