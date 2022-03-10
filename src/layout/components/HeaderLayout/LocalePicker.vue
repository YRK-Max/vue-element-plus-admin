<template>
  <el-dropdown>
    <div class="flex items-center justify-center h-full px-2 menu">
      <i class="yicon-common yiconfanyi"></i>
    </div>
    <template #dropdown>
        <el-menu 
          class="main-menu"
          :default-active="defaultLocale"
        >
          <el-menu-item index="zh_CN" @click="handleLocaleChange('zh_CN')">简体中文</el-menu-item>
          <el-menu-item index="en_US" @click="handleLocaleChange('en_US')">English</el-menu-item>
        </el-menu>
      </template>
  </el-dropdown>
</template>
<script setup>
import i18n from '@/locales';
import ls from "@/utils/storage"

const defaultLocale = ls.get('locale')

function handleLocaleChange(locale) {
  i18n.global.locale.value = locale;
  ls.set('locale', locale);
}
</script>
<style lang="scss" scoped>
.menu {
  &:hover {
    background-color: #f0f0f0
  }
}

.main-menu :deep(.el-menu-item) {
  height: 35px !important;
  line-height: 35px !important;
}
</style>