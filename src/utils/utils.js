/**
 * 描述：将对象数组中的字段重构为数组
 * 参数：input--输入数组，field--需要提取的字段名，isRate--是否为比率，默认为false
 **/
export function getObjArrayFieldToArray(input, field, isRate = false) {
  const output = []
  for (let i = 0; i < input.length; ++i) { output.push(isRate ? (input[i][field] * 100).toFixed(2) : input[i][field]) }
  return output
}
