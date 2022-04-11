<template>
  <div class="main-div m-3">
    <el-row
      class="enter-y"
      :gutter="6"
    >
      <el-col :span="24">
        <el-row :gutter="6">
          <el-col
            v-for="index in 7"
            class="mb-2"
            :key="index"
            :xl="6"
            :sm="8"
            :xs="24"
          >
            <InfoCard />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row
      class="enter-y"
      :gutter="6"
    >
      <el-col
        class="mb-2"
        :xl="8"
        :xs="24"
      >
        <el-card>
          <template #header>
            <div>
              <span>流量统计</span>
            </div>
          </template>
          <div class="h-140">
            <LineChart ref="chart1" />
          </div>
        </el-card>
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
import InfoCard from '@/components/InfoCard.vue';
import LineChart from '@/components/charts/LineChart.vue';

export default {
  components: {
    InfoCard,
    LineChart
  },
  mounted () {
    console.log(this);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
