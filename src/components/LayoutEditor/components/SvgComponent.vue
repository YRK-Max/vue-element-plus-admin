<template>
  <Square
    v-if="objProperty.type == 'Square'"
    :objProperty="objProperty"
  />
  <Circle
    v-else-if="objProperty.type == 'Circle'"
    :objProperty="objProperty"
  />
  <DoorLeft
    v-else-if="objProperty.type == 'DoorLeft'"
    :objProperty="objProperty"
  />
</template>

<script>
import Square from './svgCpt/Square.vue'
import Circle from './svgCpt/Circle.vue'
import DoorLeft from './svgCpt/DoorLeft.vue'

export default {
  components: { Square, Circle, DoorLeft },
  props: {
    objProperty: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<style>
</style>