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
    <el-divider class="enter-x">{{$t('login.thirdLogin')}}</el-divider>
    <el-form-item class="enter-x">
      <div class="w-full flex justify-around">
        <div class="flex">
          <YIcon class="login-icon mr-5" :size="26" icon='yicongithub' @click="handlerGithubLogin" />
          <YIcon class="login-icon mr-5" :size="26" icon='yiconwechat' @click="handlerWechatLogin" />
          <YIcon class="login-icon" :size="26" icon='yiconqq' @click="handlerQQLogin" />
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { nextTick, reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'
import YIcon from '@/components/YIcon.vue'
import thirdLoginService from '@/utils/ThirdLogin'
import router from '@/router'
import { setToken } from '@/utils/token'

const store = useStore()
const route = useRoute()
const loginParam = reactive({
  username: 'admin',
  password: '123456'
})
const rememberMe = ref(false)
const { t } = useI18n()
const btnLoading = ref(false)

if (route.query.code) {
  const params = {
    code: route.query.code,
    appkey: 'b16dd5f4',
    secret: '5c1fea0654e99947420e15354bb296db'
  }
  thirdLoginService.get('/user', { params: params }).then(res => {
    if (res['code'] === 0) {
      const responese = res['res']
      setToken(responese['openId'])
      store.commit('user/SET_THIRD_LOGIN', true)
      store.commit('user/SET_USERINFO', responese)
      nextTick(() => {
        router.push(route.query.redirect || '/')
        ElNotification({
          title: t('login.success'),
          message: t('login.welcomBack') + ': ' + res['res']['nickName'],
          type: 'success'
        })
      })
    } else {
      ElNotification({
        title: t('login.failure'),
        message: res['msg'],
        type: 'error'
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

function handleLogin() {
  btnLoading.value = true
  store.dispatch('user/login', loginParam).then(
    () => {
      router.push(route.query.redirect || '/')
      ElNotification({
        title: t('login.success'),
        message: t('login.welcomBack') + ': ' + loginParam['username'],
        type: 'success'
      })
      btnLoading.value = false
    },
    (error) => {
      ElNotification({
        title: t('login.failure'),
        message: error,
        type: 'error'
      })
      btnLoading.value = false
    }
  )
}

function handlerWechatLogin() {
  window.location.href = 'https://api.qauth.cn/qrconnect?appkey=b16dd5f4&state=login'
}

function handlerGithubLogin() {
  window.location.href = 'https://api.qauth.cn/oauth?type=github&appkey=b16dd5f4&state=login'
}

function handlerQQLogin() {
  window.location.href = 'https://api.qauth.cn/oauth?type=qq&appkey=b16dd5f4&state=login'
}
</script>
<style lang='scss' scoped>
.main-form :deep(.el-input__inner) {
  height: 40px;
}

.login-icon {
  color: #c7c7c7;

  &:hover {
    color: #505050;
  }
}
</style>
