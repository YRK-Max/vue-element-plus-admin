<template>
  <div class="login relative w-full h-full px-4">
    <div class="absolute text-white top-4 right-4 enter-x xl:text-gray-600">
      <LocalePicker />
    </div>
    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo />
          <div class="my-auto">
            <img
              class="w-1/2 -mt-16 -enter-x"
              src="@/assets/svg/login-box-bg.svg"
            />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl">VUE 3 适用</span>
            </div>
            <div class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x">
              这是一段描述
            </div>
          </div>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div class="
              login__form
              relative
              w-full
              px-5
              py-8
              mx-auto
              my-auto
              rounded-md
              shadow-md
              xl:ml-16 xl:bg-transparent
              sm:px-8
              xl:p-4 xl:shadow-none
              sm:w-3/4
              lg:w-3/4
              xl:w-2/3
              enter-x
            ">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LoginForm from './components/LoginForm.vue'
import AppLogo from './components/AppLogo.vue'
import LocalePicker from '@/layout/components/HeaderLayout/LocalePicker.vue'
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1280px) {
    background-color: #293146;

    &__form {
      background: #fff;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
    @media (max-width: 1280px) {
      display: none;
    }
  }
}
</style>
