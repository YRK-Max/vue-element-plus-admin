<template>
  <el-card class="main-card">
    <template #header>
      <div>
        <span>代办事项</span>
      </div>
    </template>
    <event-item
      v-for="event in eventList"
      :key="event.id"
      :id="event.id"
      :content="event.content"
      :state="event.state"
      @complete="(value) => event.state = value?'complete':'active'"
    />
  </el-card>
</template>
<script>
import { defineComponent, reactive } from "vue";
import EventItem from "./components/EventItem.vue";

export default defineComponent({
  components: { EventItem },
  name: 'TodoList',
  setup () {
    let eventList = reactive([
      { id: 1, content: '123', state: 'active' },
      { id: 2, content: '123', state: 'active' },
      { id: 3, content: '1收费方式vv的vv隔热板v仍然让五百地方都是给他该不会VS VS得到VS的vv微软23', state: 'active' },
      { id: 4, content: '123', state: 'complete' },
    ]);

    return {
      eventList
    }
  }
})
</script>
<style lang="scss" scoped>
.main-card {
  height: 100%;
  width: 100%;
}
</style>