<template>
  <g
    style="cursor:pointer"
    :id="objProperty.id"
    :transform="'translate('+(objProperty.svgPositionX)+','+(objProperty.svgPositionY)+')' +'rotate('+objProperty.angle+')'"
    :title="objProperty.title"
  >
    <rect
      :stroke="objProperty.strokeColor"
      :stroke-width="objProperty.strokeWidth"
      :fill='objProperty.color'
      :width="objProperty.width"
      :height="objProperty.height"
      :x="-objProperty.width/2"
      :y="-objProperty.height/2"
    />
  </g>
</template>

<script>
export default {
  props: {
    objProperty: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
</style>