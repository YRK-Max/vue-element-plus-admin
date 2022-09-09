<template>
    <div
      :id="id"
      class="h-full w-full"
    />
  </template>
<script>
import { chartResizeListen } from '@/utils/utils'
import * as echarts from 'echarts'
import { defineComponent, nextTick } from 'vue'
import { uuid } from 'vue-uuid'

export default defineComponent({
  props: {
    xAxis: {
      type: Array,
      default: () => { return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
    },
    series: {
      type: Array,
      default: () => {
        return [
          {
            name: 'clone1',
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'bar',
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: [8, 8, 0, 0]
              }
            }
          },
          {
            name: 'clone2',
            data: [234, 420, 152, 248, 456, 263, 352],
            type: 'bar',
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: [8, 8, 0, 0]
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById(this.id))
    this.initChart()
  },
  watch: {
    series: {
      handler() {
        this.initChart()
      },
      deep: true
    }
  },
  setup(props) {
    const id = uuid.v1()
    const chart = null

    async function initChart() {
      const option = {
        grid: {
          show: true,
          top: '12%',
          left: '5%',
          right: '3%',
          bottom: '10%'
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {}
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: '3%'
        },
        xAxis: {
          type: 'category',
          data: props.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: props.series
      }
      await nextTick()
      this.chart.setOption(option)
      chartResizeListen(this, this.chart, this.id)
    }

    return {
      id,
      chart,
      initChart
    }
  }
})
</script>

