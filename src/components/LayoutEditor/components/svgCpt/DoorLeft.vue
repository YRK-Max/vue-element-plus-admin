<template>
  <g
    style="cursor:pointer"
    :id="objProperty.id"
    :transform="'translate('+(objProperty.svgPositionX)+','+(objProperty.svgPositionY)+')' +'rotate('+objProperty.angle+')'+'scale('+ objProperty.height/50 +',' + objProperty.height/50 + ')'"
    :title="objProperty.title"
  >
    <path
      d="m0,181a175,178 0 0 1 175,-178"
      fill="none"
      :stroke="objProperty.strokeColor"
      :stroke-width="objProperty.strokeWidth"
    />
    <line
      fill="none"
      :stroke="objProperty.strokeColor"
      :stroke-width="objProperty.strokeWidth"
      x1="176"
      x2="176"
      y1="0"
      y2="186"
    />
  </g>
</template>

<script>
export default {
  props: {
    objProperty: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>