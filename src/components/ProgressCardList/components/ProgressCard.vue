<template>
  <div
    class="main-card"
    :style="{ background: bgColor } "
  >
    <div class="card-header">
      <label>更新日期: {{ lastUpdateTime }}</label>
      <YIcon icon="yiconmoreandroid"></YIcon>
    </div>
    <div></div>
    <div class="footer-class">
      <label>协同者</label>
      <div class="remain-day-class">
        <label :style="{ color: color }">{{ remainDays }} Days Left</label>
      </div>
    </div>
  </div>
</template>

<script>
import YIcon from '@/components/YIcon.vue'
import { defineComponent } from '@vue/runtime-core'
import { number } from 'echarts'

export default defineComponent({
  props: {
    color: String,
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    title: String,
    lastUpdateTime: String,
    remainDays: number
  },
  components: { YIcon },
  setup() {

  }
})
</script>

<style lang="scss" scoped>
.main-card {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
  position: relative;

  .card-header {
    height: 20px;
    display: flex;
    justify-content: space-between;

    label {
      color: #939393;
      font-size: 0.9rem;
    }
  }

  .footer-class {
    width: calc(100% - 16px);
    height: 43px;
    position: absolute;
    bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ffffff;

    .remain-day-class {
      background: #ffffff82;
      border-radius: 10px;
      padding-inline: 10px;
    }
  }
}
</style>
