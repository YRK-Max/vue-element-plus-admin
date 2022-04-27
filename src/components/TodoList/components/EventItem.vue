<template>
  <div
    class="item-class"
    :class="{'item-complete-class': isComplete}"
  >
    <div>
      <el-checkbox
        class="checkbox-class"
        v-model="isComplete"
        @change="handleComplate"
      />
      <span :class="{ 'complete': isComplete }">{{ content }}</span>
    </div>
    <div class="delete">
      <svg>
        <circle
          cx="11"
          cy="11"
          r="10"
        />
      </svg>
    </div>
  </div>
</template>
<script>
import { number } from 'echarts'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['delete', 'complete'],
  props: {
    id: number,
    content: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: 'active',
    },
  },
  computed: {
    isComplete() {
      return this.state == 'complete'
    },
  },
  setup(props, context) {
    function handleDelete() {
      context.emit('delete')
    }
    function handleComplate(value) {
      console.log(value)
      context.emit('complete', value)
    }
    return {
      handleDelete,
      handleComplate,
    }
  },
})
</script>
<style lang="scss" scoped>
$shadow: 0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem #ffffff;

.item-class {
  height: 50px;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  transition: transform 0.5s cubic-bezier(0.5, 0, 0.75, 0),
    opacity 0.5s cubic-bezier(0.5, 0, 0.75, 0),
    height 0.5s cubic-bezier(0.8, 0, 0.84, 0);
  box-shadow: $shadow;
  div {
    &:nth-child(1) {
      flex: 1;
      display: flex;
      align-items: center;
      .complete {
        color: #9e9e9e;
        text-decoration: line-through;
        transition: all 0.5s ease;
      }
      checkbox-class {
        flex: 0;
      }
      span {
        flex: 1;
        margin-left: 8px;
        font-size: 18px;
      }
    }

    &:nth-child(2) {
      flex: 0;
      position: relative;
      svg {
        display: block;
        height: 22px;
        width: 22px;
        fill: none;
        stroke: #9e9e9e;
        stroke-width: 2;
        circle {
          stroke-dasharray: 64;
        }
      }
      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        background: #9e9e9e;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(135deg);
      }
      &::before {
        width: 10px;
        height: 2px;
      }
      &::after {
        height: 10px;
        width: 2px;
      }
    }
  }
}
.item-complete-class {
  height: 0;
  overflow: hidden;
  transform: translate(-120%, 0);
}
</style>
