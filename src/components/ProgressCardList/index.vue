<template>
  <div class="main-container h-full">
    <div class="main-header">
      <div class="main-header-item flex justify-between items-center pl-2 pr-2">
        <h1 class="font-bold text-xl">Projects</h1>
        <h1 class="font-bold text-xl">4月</h1>
      </div>
      <div class="main-header-item flex justify-between items-center pl-2 pr-2">
        <div class="flex justify-center items-center">
          <div>
            <h1 class="block text-2xl font-bold">5</h1>
            <h1 class="block text-sm">进行中</h1>
          </div>
          <div class="ml-6">
            <h1 class="block text-2xl font-bold">11</h1>
            <h1 class="block text-sm">未开始</h1>
          </div>
          <div class="ml-6">
            <h1 class="block text-2xl font-bold">16</h1>
            <h1 class="block text-sm">Total Projects</h1>
          </div>
        </div>
        <div class="flex">
          <YIcon class="pr-2" icon="yiconlist" />
          <YIcon class="display-selected" color="#ffffff" icon="yiconmore" />
        </div>
      </div>
    </div>
    <div class="main-content">
      <el-row class="main-row" :gutter="6">
        <el-col
          v-for="(item, index) of cardInfoList"
          class="mb-1.5"
          :key="index"
          :span="8"
        >
          <ProgressCard
            :title="item['title']"
            :description="item['description']"
            :color="item['color']"
            :bgColor="item['bgcolor']"
            :lastUpdateTime="item['lastUpdateTime']"
            :remainDays="item['remainDays']"
            :progress="item['progress']"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProgressCard from './components/ProgressCard.vue'
import YIcon from '@/components/YIcon.vue'

export default defineComponent({
  components: {
    ProgressCard,
    YIcon
  },
  setup() {
    const cardInfoList = [
      { title: 'WorkFlow', progress: 20, description: 'Create interactive user flow diagrams and design presentations in 30 minutes or less. Overflow seamlessly integrates with the most popular design tools, such as Adobe XD, Figma, Sketch, and Photoshop, to simplify the process.', lastUpdateTime: '2022-04-12', bgcolor: '#fee4cb', color: '#ff942e', remainDays: 2 },
      { title: 'Template Of Vue', progress: 5, description: 'test vue3', lastUpdateTime: '2022-04-12', bgcolor: '#e9e7fd', color: '#4f3ff0', remainDays: 2 },
      { title: 'WorkFlow', progress: 58, description: 'test vue3', lastUpdateTime: '2022-04-12', bgcolor: '#dbf6fd', color: '#096c86', remainDays: 8 },
      { title: 'WorkFlow', progress: 45, description: 'test vue3', lastUpdateTime: '2022-04-12', bgcolor: '#c8f7dc', color: '#34c471', remainDays: 22 },
      { title: 'WorkFlow', progress: 70, description: 'test vue3', lastUpdateTime: '2022-04-12', bgcolor: '#ffd3e2', color: '#df3670', remainDays: 15 }
    ]
    return {
      cardInfoList
    }
  }
})
</script>

<style lang="scss" scoped>
.main-container {
  border-radius: 8px;
  background: #fff;
  padding: 5px 5px 0 5px;

  .main-header {
    height: 98px;
    & .main-header-item:nth-child(1) {
      height: 38px;
    }
    & .main-header-item:nth-child(2) {
      height: 60px;
    }
  }

  .main-content {
    height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .main-content::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }
  .main-content::-webkit-scrollbar-track {
    background: transparent;
  }
  .main-content::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;

    &:hover {
      background-color: #929292;
    }
  }

  .main-row {
    height: 400px;
  }
}

.display-selected {
  background: var(--main-color);
  width: 25px;
  height: 25px;
  border-radius: 5px;
}
</style>
