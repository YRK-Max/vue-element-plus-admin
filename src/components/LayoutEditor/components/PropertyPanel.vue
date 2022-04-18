<template>
  <div class="main-panel">
    <label>属性面板</label>
    <div class="divider" />
    <div class="form-div">
      <el-empty
        v-if="!selectedSvgInfo"
        :image-size="80"
        style="height: calc(100% - 35px)"
        description="未选择对象"
      />
      <el-form
        v-else
        style="margin: 5px 10px"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="ID">
          <el-input
            v-model="selectedSvgInfo.id"
            disabled
          />
        </el-form-item>
        <el-form-item label="Title">
          <el-input v-model="selectedSvgInfo.title" />
        </el-form-item>
        <el-form-item label="Color">
          <el-color-picker
            v-model="selectedSvgInfo.color"
            show-alpha
          />
        </el-form-item>
        <el-form-item :label="selectedSvgInfo.lockwh?'Size':'Height'">
          <el-slider
            v-model="selectedSvgInfo.height"
            :max="800"
            show-input
          />
        </el-form-item>
        <el-form-item
          label="Width"
          v-if="!selectedSvgInfo.lockwh"
        >
          <el-slider
            v-model="selectedSvgInfo.width"
            :max="1200"
            show-input
          />
        </el-form-item>
        <el-form-item label="Rotate">
          <el-slider
            v-model="selectedSvgInfo.angle"
            :max="360"
            show-input
          />
        </el-form-item>
        <el-form-item label="Position">
          <el-radio-group
            v-model="selectedSvgInfo.zIndex"
            @change="handlezIndexChange"
          >
            <el-radio :label="0">Bottom</el-radio>
            <el-radio :label="1">Center</el-radio>
            <el-radio :label="2">Top</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="StrokeColor">
          <el-color-picker v-model="selectedSvgInfo.strokeColor" />
        </el-form-item>
        <el-form-item label="StrokeWidth">
          <el-slider
            v-model="selectedSvgInfo.strokeWidth"
            :max="30"
            show-input
          />
        </el-form-item>
        <el-form-item label="Text">
          <el-input v-model="selectedSvgInfo.text" />
        </el-form-item>
        <el-form-item label="FontSize">
          <el-input v-model="selectedSvgInfo.fontSize" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['svgInfo'],
  computed: {
    selectedSvgInfo () {
      return this.svgInfo;
    }
  },
  methods: {
    handlezIndexChange () {
      this.$emit('zIndexChange');
    }
  }
}
</script>

<style lang="scss" scoped>
.main-panel {
  label {
    font-weight: bold;
    margin-left: 5px;
  }
}
.divider {
  width: auto;
  margin: 5px 5px;
  border-bottom: 1px dashed rgb(179, 179, 179);
}
.form-div {
  height: calc(100% - 35px);
  overflow-y: scroll;
}
.form-div::-webkit-scrollbar {
  display: none;
}
</style>