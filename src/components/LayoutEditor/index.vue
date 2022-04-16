<template>
  <div class="main-container">
    <div
      v-show="loading"
      class="loading-div"
    >
      <YIcon
        class="loading-icon"
        icon="yiconloading"
        color="#ffffff"
        :size="40"
      />
    </div>
    <div
      id="canvas"
      v-show="!loading"
      class="editor-content svg-main"
      @mousemove="mouseMove"
      @mouseup="mouseupCanvas"
      @mousewheel="mouseWheel"
      @dblclick="dblClick"
    >
      <el-button-group class="export-button-group">
        <el-button @click="exportData('SVG')">SVG</el-button>
        <el-button @click="exportData('JSON')">JSON</el-button>
      </el-button-group>
      <YIcon
        class="help-btn"
        style="background: #fff"
        icon="yiconwenhao"
        :size="20"
        @click="showHelp = true"
      />
      <svg
        id="main_svg"
        style="height: 100%; width: 100%;"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <SvgComponent
          v-for="(svgItem, index) in svgList"
          :key="svgItem.id"
          :objProperty="svgItem"
          @mousedown="mousedownSvg($event, svgItem.id, index)"
        />
      </svg>
    </div>
    <div
      v-if="!loading"
      class="panel-content"
    >
      <ItemPanel class="item-panel" />
      <PropertyPanel
        class="property-panel"
        :svgInfo="selectedItem"
        @zIndexChange="sortSvgItems"
      />
    </div>
  </div>
  <el-dialog
    v-model="showHelp"
    title="Help"
  >
    <ul>
      <li>Ctrl + Shift + c: 复制</li>
      <li>Delete: 删除</li>
      <li>Ctrl + 鼠标滚动: 调节选中元素宽度</li>
      <li>鼠标滚动: 调节选中元素高度</li>
    </ul>
  </el-dialog>
</template>

<script>
import YIcon from '../YIcon.vue'
import ItemPanel from './components/ItemPanel.vue'
import PropertyPanel from './components/PropertyPanel.vue'
import global from './global'
import UCore from './utils/UCore'
import SvgComponent from './components/SvgComponent.vue'

export default {
  components: { ItemPanel, PropertyPanel, YIcon, SvgComponent },
  data () {
    return {
      loading: true,
      showHelp: false,
      svgList: [],
      currentlyNewObj: {
        title: '',
        type: '',
        color: '#ffffff',
        height: 40,
        fontSize: 14,
        width: 200,
        strokeWidth: 2,
        strokeColor: '#000000',
        imageSrc: '',
        text: '',
        lockwh: true,
        angle: 0,
        zIndex: 1
      },
      moveSvg: {
        id: '',
        index: 0
      },
      selectedItem: null,
      offsetPosition: {
        positionX: 0,
        positionY: 0
      }
    }
  },
  created () {
    let _this = this;
    document.onkeydown = function (event) {
      //获取当前选中组件
      let selectSvgInfo = _this.selectedItem;
      if (selectSvgInfo == undefined || selectSvgInfo == null || selectSvgInfo == '') {
        return;
      }

      //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      if (event && event.key == "ArrowLeft") {
        event.preventDefault();
        selectSvgInfo.svgPositionX -= 1;
      } else if (event && event.key == "ArrowUp") {
        event.preventDefault();
        selectSvgInfo.svgPositionY -= 1;
      } else if (event && event.key == "ArrowRight") {
        event.preventDefault();
        selectSvgInfo.svgPositionX += 1;
      } else if (event && event.key == "ArrowDown") {
        event.preventDefault();
        selectSvgInfo.svgPositionY += 1;
      }
      // Ctrl + Shift + c 复制
      else if (event && event.ctrlKey && event.key == "C") {
        event.preventDefault();
        let copySvgInfoStr = JSON.stringify(selectSvgInfo);
        let copySvgInfo = JSON.parse(copySvgInfoStr);
        copySvgInfo.id = UCore.GenUUid();
        copySvgInfo.svgPositionX = selectSvgInfo.svgPositionX + 10;
        copySvgInfo.svgPositionY = selectSvgInfo.svgPositionY + 10;
        _this.svgList.push(copySvgInfo);
        _this.selectedItem = copySvgInfo;
        setTimeout(function () {
          _this.changeSelectedItem(copySvgInfo.id);
        }, 100);
      }
      // Delete 删除
      else if (event && event.key == "Delete") {
        event.preventDefault();
        //根据当前id找到当前元素的index
        let selectSvgIndex = _this.svgList.indexOf(_this.svgList.filter(f => f.id == selectSvgInfo.id)[0]);
        _this.svgList.splice(selectSvgIndex, 1);
        if (_this.svgList.length > 0) {
          _this.selectedItem = _this.svgList[0];
          _this.changeSelectedItem(_this.selectedItem.id);
        } else {
          _this.selectedItem = null;
        }
      }
    }
  },
  mounted () {
    let _this = this;
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
        let canvasdiv = document.querySelector('#canvas');
        canvasdiv.addEventListener("dragover", function (event) {
          event.preventDefault();
          _this.currentlyNewObj = global.CurrentlyObj;
        }, false);


        canvasdiv.addEventListener("drop", function (event) {
          event.preventDefault();
          if (_this.currentlyNewObj.type == '') {
            return;
          }
          let svgItem = {
            id: UCore.GenUUid(),
            color: _this.currentlyNewObj.color,
            title: _this.currentlyNewObj.title,
            type: _this.currentlyNewObj.type,
            typeName: _this.currentlyNewObj.type,
            svgColor: _this.currentlyNewObj.color,
            svgPositionX: event.offsetX,
            svgPositionY: event.offsetY,
            height: _this.currentlyNewObj.height,
            width: _this.currentlyNewObj.width,
            strokeWidth: _this.currentlyNewObj.strokeWidth,
            strokeColor: _this.currentlyNewObj.strokeColor,
            fontSize: _this.currentlyNewObj.fontSize,
            svgText: _this.currentlyNewObj.text,
            angle: _this.currentlyNewObj.angle,
            zIndex: _this.currentlyNewObj.zIndex,
            lockwh: _this.currentlyNewObj.lockwh
          }
          _this.svgList.push(svgItem);
          _this.selectedItem = svgItem;

          // 设置选中样式
          setTimeout(function () {
            _this.changeSelectedItem(svgItem.id);
          }, 100)
        })
      }, 300)
    })
  },
  methods: {
    mouseWheel (event) {
      //获取当前选中组件
      let selectSvgInfo = this.selectedItem;
      if (selectSvgInfo == undefined || selectSvgInfo == null || selectSvgInfo == '') {
        return;
      }
      event.preventDefault();
      //判断滚轮方向 -100是往上滑 100是下滑
      let svgZoom = event.wheelDelta > 0 ? "2" : "-2";

      if (event.ctrlKey) {
        selectSvgInfo.width = parseInt(selectSvgInfo.width) + parseInt(svgZoom);
        if (selectSvgInfo.width < 1) {
          selectSvgInfo.width = 1;
        }
      } else {
        selectSvgInfo.height = parseInt(selectSvgInfo.height) + parseInt(svgZoom);
        if (selectSvgInfo.height < 1) {
          selectSvgInfo.height = 1;
        }
      }
    },
    mouseMove (event) {
      if (event.offsetX == -1) {
        return;
      }
      if (event.target.nodeName == 'INPUT') {
        return;
      }
      if (event.offsetY == -1) {
        return;
      }
      if (this.moveSvg.id == '') {
        return;
      }

      let mousePositionX = event.offsetX;
      let mousePositionY = event.offsetY;

      //将要移动的元素坐标设备为鼠标坐标
      let svgPositionX = mousePositionX + this.offsetPosition.positionX;
      let svgPositionY = mousePositionY + this.offsetPosition.positionY;

      this.svgList[this.moveSvg.index].svgPositionX = svgPositionX;
      this.svgList[this.moveSvg.index].svgPositionY = svgPositionY;
    },
    mouseupCanvas () {
      // 移动结束后将移动标志去掉
      this.moveSvg = {
        id: '',
        index: 0
      }
    },
    mousedownSvg (event, id, index) {
      //从数组里面根据index找到当前元素
      this.moveSvg.id = id;
      this.moveSvg.index = index;
      // 变更选中元素
      this.selectedItem = this.svgList[index];
      // 获取初始偏移量
      this.offsetPosition.positionX = this.selectedItem["svgPositionX"] - event.offsetX
      this.offsetPosition.positionY = this.selectedItem["svgPositionY"] - event.offsetY
      // 添加选中
      this.changeSelectedItem(id);
    },
    dblClick () {
      //获取所有g标签 清除所有选中样式
      let gAnyList = document.querySelectorAll('g');
      gAnyList.forEach(g => {
        g.classList.remove("topo-layer-view-selected")
      });
      this.selectedItem = null;
    },
    changeSelectedItem (id) {
      // 获取所有g标签，并移除所有g标签上的选中状态
      let gAnyList = document.querySelectorAll('g');
      gAnyList.forEach(g => {
        g.classList.remove("topo-layer-view-selected")
      });
      // 根据id给元素加上选中状态
      let dom = document.getElementById(id);
      dom.classList.add("topo-layer-view-selected");
    },
    sortSvgItems () {
      const tempSvgList = JSON.parse(JSON.stringify(this.svgList));
      this.svgList = [];
      tempSvgList.sort((a, b) => { return a['zIndex'] - b['zIndex'] });
      this.svgList = tempSvgList;
    },
    exportData (data) {
      if (data === 'SVG') {
        let svg_ele = document.getElementById('main_svg')
        alert(svg_ele.outerHTML)
      } else if (data === 'JSON') {
        alert(JSON.stringify(this.svgList));
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.loading-div {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading-icon {
    animation: loadingRotate 2s infinite linear;
  }
}

.main-container {
  height: 100%;
  width: 100%;
  display: flex;
  .editor-content {
    width: calc(75% - 8px);
    height: 100%;
    margin-right: 8px;
    position: relative;

    .export-button-group {
      position: absolute;
      top: 8px;
      left: 8px;
    }

    .help-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      border-radius: 50%;
    }
  }
  .panel-content {
    width: 25%;
    height: 100%;
    .item-panel {
      height: calc(50% - 5px);
      background: #fff;
      margin-bottom: 10px;
      border-radius: 4px;
      padding: 4px;
    }
    .property-panel {
      height: calc(50% - 5px);
      background: #fff;
      border-radius: 4px;
      padding: 4px;
    }
  }
}

.svg-main {
  border-radius: 4px;
  border: 1px solid #d1d1d1;
  background: #fcfcfc;
  background-image: linear-gradient(rgba(204, 204, 204, 0.3) 1px, transparent 0),
    linear-gradient(90deg, rgba(206, 206, 206, 0.43) 1px, transparent 0),
    linear-gradient(#9d9d9d 1px, transparent 0),
    linear-gradient(90deg, #c3c3c3 1px, transparent 0);
  background-size: 15px 15px, 15px 15px, 75px 75px, 75px 75px;
}

.topo-layer-view-selected {
  outline: 2px dashed rgb(0, 140, 255);
}

@keyframes loadingRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>