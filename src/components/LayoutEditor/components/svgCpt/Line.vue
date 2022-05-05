<template>
  <g
    style="cursor:pointer"
    :id="objProperty.id"
    :transform="'translate('+(objProperty.svgPositionX)+','+(objProperty.svgPositionY)+')' +'rotate('+objProperty.angle+')'+'scale('+ objProperty.height/50 +',' + objProperty.height/50 + ')'"
    :title="objProperty.title"
  >
    <line
      :stroke="objProperty.strokeColor"
      :stroke-width="objProperty.strokeWidth"
      :x1="-objProperty.height"
      :x2="objProperty.height"
      :y1="0"
      :y2="0"
    />
    <text
      :x="0"
      :dx="-20"
      :y="(13)"
    >{{ objProperty.text || '' }}</text>
  </g>
</template>

<script>
export default {
  name: 'Line',
  props: {
    objProperty: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
</style>
