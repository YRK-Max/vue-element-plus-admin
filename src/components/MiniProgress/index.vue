<template>
  <div class="main-class" :style="{ '--progress': ((progress/total)*100)+'%', '--color': color }" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 125
    },
    progress: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  setup() {

  }
})
</script>

<style lang='scss' scoped>
.main-class {
  height: 6px;
  width: 100%;
  margin-block: 4px;
  background: #fff;
  border-radius: 5px;
}

.main-class::after {
  content: '';
  display: block;
  height: 6px;
  width: var(--progress);
  margin-block: 4px;
  background: var(--color);
  border-radius: 5px;
}
</style>
