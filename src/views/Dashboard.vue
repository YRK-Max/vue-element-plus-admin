<template>
  <div class="m-3">
    <div
      class="enter-y mb-6"
      style="display: flex; height: 400px; "
    >
      <el-row
        style="width:calc(100% - 560px); margin-right: 10px;"
        class="h-full enter-y little-component-class"
        :gutter="6"
      >
        <el-col
          :span="24"
          class="h-full"
        >
          <el-card class="h-full" />
        </el-col>
      </el-row>
      <div style="width:auto;">
        <FunCard />
      </div>
    </div>
    <el-row
      class="enter-y"
      :gutter="6"
    >
      <el-col
        class="mb-2"
        :xl="8"
        :xs="24"
      >
        <TodoList />
      </el-col>
      <el-col
        :xl="16"
        :xs="24"
      >
        <el-card>
          <template #header>
            <div>
              <span>流量统计</span>
            </div>
          </template>
          <div class="h-140">
            <LineChart ref="chart2" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import TodoList from '@/components/TodoList'
import FunCard from '@/components/FunCard'
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  components: {
    LineChart,
    TodoList,
    FunCard
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
