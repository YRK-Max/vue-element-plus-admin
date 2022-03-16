<template>
  <svg class="icon" :style="{ width: size + 'px', height: size + 'px' }" aria-hidden="true">
    <use :xlink:href="'#' + icon"></use>
  </svg>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: String,
    size: { type: Number, default: 18 }
  }
})
</script>
<style scoped>
.icon {
  fill: currentColor;
  overflow: hidden;
}
</style>