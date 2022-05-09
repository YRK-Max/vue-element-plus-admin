<template>
  <div
    class="p-2"
    style="background: #f3f6fd"
  >
    <div
      class="enter-y mb-3"
      style="display: flex; height: 460px; "
    >
      <el-row
        class="h-full enter-y little-component-class"
        :gutter="6"
      >
        <el-col
          :span="24"
          class="h-full"
        >
          <ProgressCardList/>
        </el-col>
      </el-row>
      <div v-if="!isMobile" class="w-auto ml-2">
        <FunCard />
      </div>
    </div>
    <el-row
      class="enter-y"
      :gutter="8"
    >
      <el-col
        :lg="12"
        :sm="24"
        class="mb-3"
      >
        <div class="chart-container card-class h-full w-full bg-light-100">
          <div class="chart-container-header">
            <div class="flex">
              <h1>Github Clone趋势</h1>
              <div class="ml-2 opacity-0" :class="{ 'message-class': responese.clone_flag, 'success-msg': responese.clone_flag }">已刷新</div>
            </div>
            <el-button circle>
              <template #icon>
                <YIcon icon="yiconshuaxin" @click="getClonesInfo" />
              </template>
            </el-button>
          </div>
          <div class="chart-container-content">
            <LineChart
              :xAxis="chartOfClones.xAixs"
              :legend="chartOfClones.legend"
              :series="chartOfClones.series"
             />
          </div>
        </div>
      </el-col>
      <el-col
        :lg="12"
        :sm="24"
        class="mb-3"
      >
        <div class="chart-container card-class h-full w-full bg-light-100">
          <div class="chart-container-header">
            <div class="flex">
              <h1>Github 访问趋势</h1>
              <div class="ml-2 opacity-0" :class="{ 'message-class': responese.view_flag, 'success-msg': responese.view_flag }">已刷新</div>
            </div>
            <el-button circle>
              <template #icon>
                <YIcon icon="yiconshuaxin" @click="getViewsInfo" />
              </template>
            </el-button>
          </div>
          <div class="chart-container-content">
            <LineChart
              :xAxis="chartOfViews.xAixs"
              :legend="chartOfViews.legend"
              :series="chartOfViews.series"
             />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FunCard from '@/components/FunCard'
import LineChart from '@/components/charts/LineChart.vue'
import ProgressCardList from '@/components/ProgressCardList'
import YIcon from '@/components/YIcon.vue'
import { defineComponent, reactive } from '@vue/runtime-core'
import { getTrafficViews, getTrafficClones } from '@/api/github'
import { getObjArrayFieldToArray } from '@/utils/utils'
import store from '@/store'

export default defineComponent({
  components: {
    LineChart,
    FunCard,
    ProgressCardList,
    YIcon
  },
  created() {
    this.getClonesInfo()
    this.getViewsInfo()
  },
  computed: {
    isMobile() { return store.state.app.device === 'mobile' }
  },
  setup() {
    const chartOfClones = reactive({
      legend: [],
      xAixs: [],
      series: []
    })
    const chartOfViews = reactive({
      legend: [],
      xAixs: [],
      series: []
    })
    const responese = reactive({
      clone_flag: false,
      view_flag: false
    })
    function getClonesInfo() {
      responese.clone_flag = false
      getTrafficClones().then(res => {
        const clones = res['clones']
        const series = []
        chartOfClones.legend = ['clones', 'uniques']
        chartOfClones.xAixs = getObjArrayFieldToArray(clones, 'timestamp')
        series.push({
          name: 'clones',
          type: 'line',
          data: getObjArrayFieldToArray(clones, 'count')
        })
        series.push({
          name: 'uniques',
          type: 'line',
          data: getObjArrayFieldToArray(clones, 'uniques')
        })
        chartOfClones.series = series
        responese.clone_flag = true
      })
    }
    function getViewsInfo() {
      responese.view_flag = false
      getTrafficViews().then(res => {
        const views = res['views']
        const series = []
        chartOfViews.legend = ['views', 'uniques']
        chartOfViews.xAixs = getObjArrayFieldToArray(views, 'timestamp')
        series.push({
          name: 'views',
          type: 'line',
          data: getObjArrayFieldToArray(views, 'count')
        })
        series.push({
          name: 'uniques',
          type: 'line',
          data: getObjArrayFieldToArray(views, 'uniques')
        })
        chartOfViews.series = series
        responese.view_flag = true
      })
    }
    return {
      chartOfClones,
      chartOfViews,
      responese,
      getClonesInfo,
      getViewsInfo
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.chart-container {
  height: 450px;

  .chart-container-header {
    height: 38px;
    border-bottom: 1px dashed #dedede;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 8px;
    h1 {
      font-weight: bold;
    }
  }

  .chart-container-content {
    height: calc(100% - 38px);
    padding: 5px;
  }
}

.success-msg {
  border-color: #2eca03;
  background: #d5ffc9;
  color: #2eca03;
}

.message-class {
  animation: message 2s forwards;
  font-size: small;
  border-radius: 5px;
  border: 1px solid #dedede;
  text-align: center;
  height: 24px;
  line-height: 24px;
  padding-inline: 6px;
}

@keyframes message {
  0% {
    transform: translateY(90%);
    opacity: 0;
  }
  35% {
    transform: translateY(0);
    opacity: 1;
  }
  65% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-90%);
    opacity: 0;
  }
}
</style>
