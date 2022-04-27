<template>
  <h2 class="mb-3 ml-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
    {{ $t('login.title') }}
  </h2>
  <el-form class="p-4 enter-x main-form">
    <el-form-item class="enter-x">
      <el-input
        v-model="loginParam.username"
        placeholder="请输入账号"
        class="fix-auto-fill"
        style="height: 40px;"
      />
    </el-form-item>
    <el-form-item class="enter-x">
      <el-input
        type="password"
        v-model="loginParam.password"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>
    <el-row class="enter-x">
      <el-col :span="12">
        <el-form-item>
          <el-checkbox
            v-model="rememberMe"
            :label="$t('login.rememberme')"
          ></el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="float-right">
          <el-link type="primary">{{ $t('login.findPwd') }}</el-link>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="enter-x">
      <el-button
        :loading="btnLoading"
        size="large"
        class="w-full"
        type="primary"
        color="#2745b2"
        @click="handleLogin"
      >{{ $t('login.loginBtn') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'
import router from '@/router'

const store = useStore()
const route = useRoute()
const loginParam = reactive({
  username: 'admin',
  password: '123456',
})
const rememberMe = ref(false)
const { t } = useI18n()
let btnLoading = ref(false)

function handleLogin() {
  btnLoading.value = true
  store.dispatch('user/login', loginParam).then(
    () => {
      router.push(route.query.redirect || '/')
      ElNotification({
        title: t('login.success'),
        message: t('login.welcomBack') + ': ' + loginParam['username'],
        type: 'success',
      })
      btnLoading.value = false
    },
    (error) => {
      ElNotification({
        title: t('login.failure'),
        message: error,
        type: 'error',
      })
      btnLoading.value = false
    }
  )
}
</script>
<style scoped>
.main-form :deep(.el-input__inner) {
  height: 40px;
}
</style>
