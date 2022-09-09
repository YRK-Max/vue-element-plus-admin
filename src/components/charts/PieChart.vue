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
    legend: {
      type: Array,
      default: () => { return ['clones'] }
    },
    series: {
      type: Array,
      default: () => {
        return [
          {
            name: 'clones',
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
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
          data: props.legend,
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

