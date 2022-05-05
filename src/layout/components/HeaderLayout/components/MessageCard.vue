<template>
  <el-card
    class="mb-1"
    body-style="width: 280px; height: 85px; padding:3px"
  >
    <el-row class="h-full">
      <el-col :span="6">
        <div class="h-full flex justify-center items-center">
          <YIcon
            :isColorFul="true"
            :icon="getIconByType()"
            :size="30"
          />
        </div>
      </el-col>
      <el-col
        class="p-2"
        :span="14"
      >
        <div class="h-3/4">
          <p class="msg-content">{{ content }}</p>
        </div>
        <div class="h-1/4 text-gray-400">
          <label>{{ timekey }}</label>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="h-full flex justify-center items-center">
          <el-button
            type="text"
            v-if="!alreadyRead"
            @click="handleClear"
          >
            <i class="yicon-common yicona-qingchuquanbuyidu"></i>
          </el-button>
          <el-tag
            type='info'
            size="small"
            v-if="alreadyRead"
          >已读</el-tag>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { defineComponent } from 'vue'
import YIcon from '@/components/YIcon.vue'

export default defineComponent({
  props: ['type', 'content', 'timekey', 'alreadyRead'],
  components: { YIcon },
  methods: {
    getIconByType() {
      switch (this.type) {
        case 'ddmsg':
          return 'yicondingding01'
        case 'warning':
          return 'yiconbg-warning-copy'
        case 'mail':
          return 'yicondianziyoujianemail711'
        case 'favorite':
          return 'yiconshoucang'
        default:
          return 'yiconbell'
      }
    }
  },
  setup(props, ctx) {
    function handleClear() {
      ctx.emit('clear')
    }

    return {
      handleClear
    }
  }
})
</script>
<style scoped>
.msg-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
