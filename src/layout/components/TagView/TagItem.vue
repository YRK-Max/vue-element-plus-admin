<template>
  <router-link :to="page" >
      {{ page.meta.title }} 
  </router-link>
  <i v-if="!page.meta.affix" class="yicon-common yiconcancel ml-1"></i>
</template>
<script>
export default {
  props: ['page']
}
</script>
<style lang="scss" scoped>

</style>