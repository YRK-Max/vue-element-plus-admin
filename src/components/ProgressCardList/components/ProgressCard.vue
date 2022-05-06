<template>
  <div
    class="main-card"
    :style="{ '--background': bgColor, '--color': color } "
  >
    <div class="card-header">
      <label>更新日期: {{ lastUpdateTime }}</label>
      <YIcon icon="yiconmoreandroid"></YIcon>
    </div>
    <div class="main-content">
      <h1>{{ title }}</h1>
      <label>{{ description }}</label>
      <div class="mt-1">
        <h2>Progress</h2>
        <MiniProgress :color="color" :total="100" :progress="progress" />
      </div>
    </div>
    <div class="footer-class">
      <div class="flex">
        <div class="relative w-8">
          <img class="avatar-class" src="data:image/jpeg;base64,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" />
          <img class="avatar-class" src="data:image/jpeg;base64,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" />
        </div>
        <YIcon :color="color" class="add-person" icon="yiconjia" :size="12" />
      </div>
      <div class="remain-day-class">
        <label :style="{ color: color }">{{ remainDays }} Days Left</label>
      </div>
    </div>
  </div>
</template>

<script>
import YIcon from '@/components/YIcon.vue'
import MiniProgress from '@/components/MiniProgress'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    color: String,
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    title: String,
    description: String,
    lastUpdateTime: String,
    remainDays: Number,
    progress: Number
  },
  components: { YIcon, MiniProgress },
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
  background: var(--background);

  .card-header {
    height: 20px;
    display: flex;
    justify-content: space-between;

    label {
      color: #939393;
      font-size: 0.9rem;
    }
  }

  .main-content {
    height: calc(100% - 63px);
    margin-top: 5px;
    padding-inline: 6px;
    font-family: "DM Sans", sans-serif;
    overflow: hidden;

    h1 {
      font-size: 18px;
      font-weight: bold;
    }

    label {
      display: block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow:hidden;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      color: #939393;
      font-size: 14px;
      height: 40px;
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

.avatar-class {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: absolute;

  &:nth-child(2) {
    transform: translateX(50%);
  }
}

.add-person {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffffaa;
  margin-left: 8px;
}
</style>
