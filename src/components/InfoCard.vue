<template>
    <el-card>
        <el-row :gutter="5">
            <el-col :span="8">
                <div class="flex items-center justify-center h-full">
                    <div class="h-17 w-17 rounded" :style="{'background': bgColor}">
                        <YIcon class="h-full" :icon="icon" :size="40" :color="color" />
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="h-25 font-bold">
                    <h1>{{ title }}</h1>
                    <el-row class="mt-2 text-center">
                        <el-col class="flex justify-center" :span="8">
                            <div>
                                <div>251</div>
                                <div>运行中</div>
                            </div>
                        </el-col>
                        <el-col class="h-10" :span="2">
                            <div class="h-full border-solid border-[#ced6e0] border-r-1"></div>
                        </el-col>
                        <el-col class="flex justify-center" :span="8">
                            <div>
                                <div>251</div>
                                <div>Total</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
import YIcon from './YIcon.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    YIcon
  },
  props: ['icon', 'color', 'bgColor', 'title'],
  setup() {

  }
})
</script>
<style lang="scss" scoped>
.el-card {
    --el-card-padding: 10px;
}
</style>
