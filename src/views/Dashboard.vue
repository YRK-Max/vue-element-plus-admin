<template>
  <div class="main-div">
    <el-row class="enter-y">
      <el-col :xl="6" :sm="24">
        <el-card title="设备状态分布">
          <template #header>
            <div class="card-header">
              <span class="bg-dark-50">Card name</span>
              <el-button class="button" type="text">Operation button</el-button>
            </div>
          </template>
          <el-button type="primary">OK</el-button>
          <el-input
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
          >
          </el-input>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  onMounted(() => {
    
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-div {
  margin: 5px;
}
</style>
