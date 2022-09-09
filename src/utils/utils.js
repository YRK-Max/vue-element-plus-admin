/* eslint-disable */
import elementResizeDetectorMaker from 'element-resize-detector'
/**
 * 描述：将对象数组中的字段重构为数组
 * 参数：input--输入数组，field--需要提取的字段名，isRate--是否为比率，默认为false
 **/
export function getObjArrayFieldToArray(input, field, isRate = false) {
  const output = []
  for (let i = 0; i < input.length; ++i) { output.push(isRate ? (input[i][field] * 100).toFixed(2) : input[i][field]) }
  return output
}
 
// Echart  监听div容器和窗口变化，自适应图表
 
/*
*  that: 当前调用方法的this对象
*  myChart：echart图对象
*  domId：容器id
*/
export function chartResizeListen(that, myChart, domId) {
  // 监听window窗口变化
  window.addEventListener('resize', () => {
    myChart.resize()
  })
  
  // 监听div大小变化
  const erd = elementResizeDetectorMaker()
  erd.listenTo(document.getElementById(domId), () => {
    that.$nextTick(() => {
      myChart.resize()
    })
  })
}
