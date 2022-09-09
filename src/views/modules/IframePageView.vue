<template>
    <iframe class="w-full h-full" :src="link" scrolling="auto" frameborder="0" id="iframe"></iframe>
</template>
<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const link = route.meta.link
    return {
      link
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
