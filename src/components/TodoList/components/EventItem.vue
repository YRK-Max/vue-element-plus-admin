<template>
  <el-row>
    <el-col :span="3">
      <el-checkbox />
    </el-col>
    <el-col :span="21">
      <label>{{ content }}</label>
    </el-col>
  </el-row>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    "content": {
      type: String,
      default: ''
    },
    "state": {
      type: String,
      default: 'active'
    }
  },
  setup () {

  },
})
</script>
