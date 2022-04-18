<template>
  <div class="main-panel">
    <label>组件列表</label>
    <div class="divider" />
    <div class="content-div">
      <el-collapse
        v-model="activeNames"
        style="margin: 5px 10px"
      >
        <el-collapse-item
          v-for="(group, index) in itemGroupList"
          :key="index"
          :title="group.title"
          :name="group.name"
        >
          <ul>
            <li
              v-for="(item, index) in group.itemList"
              :key="index"
            >
              <img
                :title="item.title"
                :src="require('../assets/'+item.imageSrc+'.svg')"
                draggable="true"
                @mousedown="mouseDown(item)"
              />
              <div class="title">{{ item.title }}</div>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import _global from '../global'
export default {
  data () {
    return {
      activeNames: ['basic'],
      itemGroupList: [
        {
          title: '基础元素',
          name: 'basic',
          itemList: [
            {
              title: '方块',
              type: 'Square',
              color: '#ffffff',
              strokeColor: '#000000',
              height: 200,
              fontSize: 14,
              width: 250,
              strokeWidth: 2,
              imageSrc: 'square',
              text: '_default',
              lockwh: false,
              angle: 0,
              zIndex: 1
            },
            {
              title: '圆',
              type: 'Circle',
              color: '#ffffff',
              strokeColor: '#000000',
              height: 50,
              fontSize: 14,
              strokeWidth: 2,
              imageSrc: 'circle',
              text: '_default',
              lockwh: true,
              angle: 0,
              zIndex: 1
            }
          ]
        }, {
          title: '建筑元素',
          name: 'build',
          itemList: [
            {
              title: '左开门',
              type: 'DoorLeft',
              color: '#ffffff',
              strokeColor: '#000000',
              height: 40,
              fontSize: 14,
              strokeWidth: 4,
              imageSrc: 'doorLeft',
              text: '_default',
              lockwh: true,
              angle: 0,
              zIndex: 1
            }
          ]
        }
      ]
    }
  },
  methods: {
    mouseDown (itemObj) {
      _global.CurrentlyObj = itemObj;
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
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      position: relative;
      width: calc(25% - 20px);
      min-width: 80px;
      aspect-ratio: 1 / 1;
      margin: 0 5px 5px 5px;
      padding: 0;
      border-radius: 6px;
      box-shadow: 1px 1px 5px #ddd;
      cursor: pointer;
      transition: 0.4s;

      &:hover {
        box-shadow: 1px 1px 5px #9d9d9d;
        transform: scale(1.1, 1.1);
      }

      img {
        display: block;
        width: calc(100% - 20px);
        margin: 0 10px;
        height: calc(100% - 20px);
      }

      .title {
        position: absolute;
        width: calc(100% + 1px);
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(1, 7, 36, 0.4);
        color: #fff;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        border-radius: 0 0 6px 6px;
      }
    }
  }
}
.divider {
  width: auto;
  margin: 5px 5px;
  border-bottom: 1px dashed rgb(179, 179, 179);
}
.content-div {
  height: calc(100% - 35px);
  overflow-y: scroll;
}
.content-div::-webkit-scrollbar {
  display: none;
}
</style>