<template>
  <g
    style="cursor:pointer"
    :id="objProperty.id"
    :transform="'translate('+(objProperty.svgPositionX)+','+(objProperty.svgPositionY)+')' +'rotate('+objProperty.angle+')'"
    :title="objProperty.title"
  >
    <circle
      :fill="objProperty.color"
      :stroke="objProperty.strokeColor"
      cx="0"
      cy="0"
      :r="objProperty.height"
      :stroke-width="objProperty.strokeWidth"
    />
  </g>
</template>

<script>
export default {
  props: {
    objProperty: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
