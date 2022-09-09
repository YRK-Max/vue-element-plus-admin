<template>
  <div
    class="p-2"
    style="background: #ebeef3"
  >
    <el-row :gutter="8" class="enter-y">
      <el-col :lg="6" :sm="24" class="pb-2">
        <InfoCard icon="yiconshebei" color="#426cb9" bgColor="#d1e1ff" title="设备运行状态"></InfoCard>
      </el-col>
      <el-col :lg="6" :sm="24" class="pb-2">
        <InfoCard icon="yicondowntime" color="#ff942e" bgColor="#ffead6" title="故障检测模型"></InfoCard>
      </el-col>
      <el-col :lg="6" :sm="24" class="pb-2">
        <InfoCard icon="yiconjihua" color="#4f3ff0" bgColor="#d1ccff" title="故障检测数量"></InfoCard>
      </el-col>
      <el-col :lg="6" :sm="24" class="pb-2">
        <InfoCard icon="yiconB1" color="#c12c1f" bgColor="#ffd0cc" title="设备报警数量"></InfoCard>
      </el-col>
    </el-row>
    <el-row class="enter-y" :gutter="6">
      <el-col :lg="8" :sm="24">
        <el-card header="实时异常检测" class="mb-2" :body-style="{padding: '10px', height: '350px' }">
          <BarChart />
        </el-card>
      </el-col>
      <el-col :lg="8" :sm="24">
        <el-card header="异常检测列表" class="mb-2" :body-style="{padding: '10px', height: '350px' }">
          <DataTable
            :columns="columns"
            :datasource="datasource"
            :showPager="false"
          />
        </el-card>
      </el-col>
      <el-col :lg="8" :sm="24">
        <el-card header="每月异常检测总数" class="mb-2" :body-style="{padding: '10px', height: '350px' }">
          <LineChart />
        </el-card>
      </el-col>
    </el-row>
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
      <div v-if="!isMobile" class="w-240 h-full ml-2">
        <MonacoEditor />
      </div>
    </div>
    <Splitpanes
      class="enter-y default-theme h-full"
    >
      <Pane>
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
            <LineChart />
          </div>
        </div>
      </Pane>
      <Pane>
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
            <LineChart />
          </div>
        </div>
      </Pane>
    </Splitpanes>
  </div>
</template>

<script>
import { getTrafficClones, getTrafficViews } from '@/api/github'
import LineChart from '@/components/charts/LineChart.vue'
import ProgressCardList from '@/components/ProgressCardList'
import YIcon from '@/components/YIcon.vue'
import store from '@/store'
import { getObjArrayFieldToArray } from '@/utils/utils'
import { defineComponent, reactive } from '@vue/runtime-core'
import { Pane, Splitpanes } from 'splitpanes'
import MonacoEditor from '@/components/MonacoEditor/index.vue'
import DataTable from '../components/DataTable.vue'
import InfoCard from '../components/InfoCard.vue'
import BarChart from '@/components/charts/BarChart.vue'

export default defineComponent({
  components: {
    LineChart,
    ProgressCardList,
    YIcon,
    Splitpanes,
    Pane,
    MonacoEditor,
    DataTable,
    InfoCard,
    BarChart
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
    const datasource = [
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
      { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
      { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
      { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
      { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
      { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' }
    ]
    const columns = [
      { type: 'seq', width: 40 },
      { field: 'name', title: 'Name', sortable: true, filterMultiple: true },
      { field: 'nickname', title: 'Nickname' },
      { field: 'role', title: 'Role', showOverflow: true, showHeaderOverflow: true },
      { field: 'address', title: 'Address', showOverflow: true }
    ]

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
      datasource,
      columns,
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
