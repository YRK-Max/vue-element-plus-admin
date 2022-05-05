<template>
  <div class="app-logo -enter-x">
    <img src="@/assets/images/logo.png" />
    <div class="ml-2 truncate md:opacity-100 app-logo__title">
      Element Plus Admin
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.app-logo {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 80px;

  &__title {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }

  img {
    width: 48px;
  }
}
</style>
