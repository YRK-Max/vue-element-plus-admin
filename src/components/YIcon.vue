<template>
  <div>
    <svg
      v-if="isColorFul"
      class="icon"
      :style="{ width: size + 'px', height: size + 'px' }"
      aria-hidden="true"
    >
      <use :xlink:href="'#' + icon"></use>
    </svg>
    <div
      v-if="!isColorFul"
      class="collapse-btn"
      @click="handleClick"
    >
      <i
        :class="notColorFulIconClass"
        :style="{ fontSize: size + 'px', color: color }"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: { type: String, default: 'yiconimage' },
    size: { type: Number, default: 18 },
    isColorFul: { type: Boolean, default: false },
    color: { type: String, default: '#000' },
  },
  emits: ['click'],
  setup(props, context) {
    let notColorFulIconClass = ['yicon-common']

    if (!props.isColorFul) {
      notColorFulIconClass.push(props.icon)
    }

    function handleClick() {
      context.emit('click')
    }

    return {
      notColorFulIconClass,
      handleClick,
    }
  },
}
</script>
<style scoped>
.icon {
  fill: currentColor;
  overflow: hidden;
}

.collapse-btn {
  cursor: pointer;
  transition: all 0.4s;
}
</style>