<template>
  <div class="h-full">
    <el-row class="main-row h-full" :gutter="6">
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
</template>

<script>
import { defineComponent } from 'vue'
import ProgressCard from './components/ProgressCard.vue'

export default defineComponent({
  components: {
    ProgressCard
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
</style>
