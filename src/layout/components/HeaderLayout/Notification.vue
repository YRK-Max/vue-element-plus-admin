<template>
  <el-dropdown class="main-dom">
    <div class="flex items-center justify-center h-full px-3 cursor-pointer hover:bg-gray-100">
      <el-badge
        is-dot
        class="item"
      >
        <YIcon icon='yiconbell' />
      </el-badge>
    </div>
    <template #dropdown>
      <el-tabs class="ml-3 mt-1">
        <el-tab-pane :label="'通知 (' + 10 + ')'">
          <el-scrollbar
            v-if="notice.length > 0"
            class="pr-3 pb-2"
            height="200px"
          >
            <MessageCard
              v-for="(msg, index) of notice"
              :key="index"
              :type="msg.type"
              :content="msg.content"
              :timekey="msg.timekey"
              :alreadyRead="msg.alreadyRead"
              @clear="msg.alreadyRead = true"
            />
          </el-scrollbar>
          <el-empty
            v-if="notice.length === 0"
            style="height: 250px; width: 250px; margin-right: 14px;"
            :image-size="100"
            description="暂无通知"
          />
          <div
            v-if="notice.length > 0"
            class="my-2 mr-3"
          >
            <el-button
              class="w-full"
              type="primary"
            >查看更多</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'消息 (' + 0 + ')'">
          <el-scrollbar
            v-if="msgs.length > 0"
            class="pr-3 pb-2"
            height="200px"
          >
            <MessageCard
              v-for="(msg, index) of msgs"
              :key="index"
              :type="msg.type"
              :content="msg.content"
              :timekey="msg.timekey"
              :alreadyRead="msg.alreadyRead"
            />
          </el-scrollbar>
          <el-empty
            v-if="msgs.length === 0"
            style="height: 250px; width: 280px; margin-right: 14px;"
            :image-size="100"
            description="暂无消息"
          />
          <div
            v-if="msgs.length > 0"
            class="my-2 mr-3"
          >
            <el-button
              class="w-full"
              type="primary"
            >查看更多</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-dropdown>
</template>
<script>
import YIcon from '@/components/YIcon.vue'
import { defineComponent } from 'vue'
import MessageCard from './components/MessageCard.vue'

export default defineComponent({
  components: { YIcon, MessageCard },
  data() {
    return {
      notice: [
        {
          type: 'ddmsg',
          content: '白色的基本上都无阿范围划分为符合和我说为分为氛围',
          timekey: '2022-03-05 15:48:22',
          alreadyRead: false
        },
        {
          type: 'warning',
          content: '白色的基本上都无阿范围划分为符合和我说为分为氛围',
          timekey: '2022-03-05 15:48:22',
          alreadyRead: false
        },
        {
          type: 'mail',
          content: '发件人：1354984@qq.com',
          timekey: '2022-03-14 02:17:35',
          alreadyRead: false
        },
        {
          type: 'ddmsg',
          content: '白色的基本上都无阿范围划分为符合和我说为分为氛围',
          timekey: '2022-03-12 15:48:22',
          alreadyRead: true
        }
      ],
      msgs: []
    }
  }
})
</script>
<style lang="scss" scoped>
.main-dom :deep(.el-tabs__content) {
  padding: 5px;
}
</style>
