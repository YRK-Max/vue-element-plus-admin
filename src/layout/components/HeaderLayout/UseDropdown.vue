<template>
  <el-dropdown>
    <div class="flex items-center justify-center h-full px-3 hover:bg-gray-100 relative">
      <img
        style="border-radius: 50%"
        class="w-[30px] mr-3"
        :src="avatarUrl"
      />
      <div v-if="isThirdLogin" class="login-type-class absolute bottom-1 left-7 bg-white">
        <YIcon :color="authTypeColor" :size="13" :icon="authTypeIcon" />
      </div>
      <label>{{ username }}</label>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogout">
          <i class="yicon-common yiconlogout"></i>
          {{ $t('logout') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { ElMessageBox } from 'element-plus'
import YIcon from '@/components/YIcon.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import router from '@/router'
import { computed, defineComponent } from 'vue'
import ls from '@/utils/storage'

export default defineComponent({
  components: { YIcon },
  setup() {
    const store = useStore()
    const route = useRoute()
    const isThirdLogin = ls.get('isThirdLogin')
    const userInfo = store.state.user.userInfo

    const avatarUrl = computed(() => { return store.state.user.userInfo.avatarUrl })
    const authTypeColor = computed(() => {
      return userInfo.authType === 'github' ? '#161b22' : userInfo.authType === 'qq' ? '#00e6ff' : '#41e577'
    })
    const authTypeIcon = computed(() => {
      return userInfo.authType === 'github' ? 'yicongithub' : userInfo.authType === 'qq' ? 'yiconqq' : 'yiconwechat'
    })
    const username = computed(() => { return isThirdLogin ? userInfo['nickName'] : userInfo['username'] })

    function handleLogout() {
      ElMessageBox.confirm('确定退出登录?', '退出登录', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await store.dispatch('user/logout')
          router.push(`/login?redirect=${route.fullPath}`)
        })
        .catch(() => {
          // 不做操作
        })
    }

    return {
      avatarUrl,
      username,
      authTypeColor,
      authTypeIcon,
      isThirdLogin,
      handleLogout
    }
  }
})
</script>
<style lang="scss" scoped>
.login-type-class {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
