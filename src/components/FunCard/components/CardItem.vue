<template>
  <div
    class="h-full mr-3 item-class"
    :class="{ 'selected': isSelected }"
    :style="{ 
      backgroundImage: 'url(' + imageUrl + ')', 
      backgroundPosition: 'center center', 
      backgroundRepeat: 'no-repeat' ,
      backgroundSize: 'cover'
    }"
    @click="handleChange"
  >
    <div class="icon-class">
      <YIcon
        :icon="icon"
        :color="iconColor"
      />
    </div>
    <div
      v-if="isSelected"
      class="text-class"
    >
      <label>{{ text }}</label>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { number } from 'echarts'
import YIcon from '@/components/YIcon.vue'

export default {
  name: 'CardItem',
  components: {
    YIcon,
  },
  props: {
    compareValue: number,
    selectedValue: number,
    icon: String,
    iconColor: String,
    text: String,
    imageUrl: String,
  },
  setup(props, context) {
    const isSelected = computed(() => {
      return props.compareValue == props.selectedValue
    })
    function handleChange() {
      context.emit('change', props.compareValue)
    }
    return {
      isSelected,
      handleChange,
    }
  },
}
</script>

<style lang="scss" scoped>
.item-class {
  width: 50px;
  border-radius: 40px;
  transition: 0.5s ease-in;
  position: relative;
}
.icon-class {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: white;
  position: absolute;
  left: 50%;
  top: 85%;
  transform: translate(-50%, 0);
  transition: all 0.5s cubic-bezier(0.83, 0, 0.17, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-class {
  position: absolute;
  top: 85%;
  color: #fff;
}
.selected {
  width: 400px;
  .icon-class {
    left: 10%;
  }
  .text-class {
    left: calc(10% + 55px);
    animation: text-opacity 1.5s forwards;
  }
}

@keyframes text-opacity {
  to {
    opacity: 1;
    left: calc(10% + 25px);
  }
  from {
    opacity: 0;
    left: calc(10% + 55px);
  }
}
</style>