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
      :content="event.content"
      class="item-class"
    />
  </el-card>
</template>
<script>
import { defineComponent } from "vue";
import EventItem from "./components/EventItem.vue";

export default defineComponent({
  components: { EventItem },
  name: 'TodoList',
  setup () {
    let eventList = [
      { id: 1, content: '123', state: 'active' },
      { id: 2, content: '123', state: 'active' },
      { id: 3, content: '123', state: 'active' },
    ];

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

.item-class {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
}
</style>