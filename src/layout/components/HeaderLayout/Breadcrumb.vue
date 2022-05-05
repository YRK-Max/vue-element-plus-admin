<template>
  <el-breadcrumb
    class="ml-4"
    separator=">"
  >
    <el-breadcrumb-item :to="{ path: '/' }">{{ $t('route.home') }}</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="path of pathList"
      :key="path"
    >{{ $t('route.' + path) }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from '@vue/runtime-core'

const router = useRoute()
const path = computed(() => router.fullPath)
const pathList = ref([])

onMounted(() => {
  pathList.value = path.value.split('/').filter((p) => {
    return p !== '' && p !== 'home'
  })
})

// eslint-disable-next-line no-unused-vars
watch(path, (newVal, oldVal) => {
  pathList.value = newVal.split('/').filter((p) => {
    return p !== '' && p !== 'home'
  })
})
</script>
