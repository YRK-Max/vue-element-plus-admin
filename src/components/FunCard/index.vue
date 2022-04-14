<template>
  <div class="h-full flex">
    <CardItem
      v-for="item in items"
      :key="item.id"
      :selectedValue="selectedItem"
      :compareValue="item.id"
      :icon="item.icon"
      :text="item.text"
      :iconColor="item.color"
      :imageUrl="item.imageUrl"
      @change="changeSelectedItem"
    />
  </div>
</template>
<script>
import { ref } from 'vue'
import CardItem from './components/CardItem.vue'

export default {
  name: "FunCard",
  components: {
    CardItem
  },
  setup () {
    let selectedItem = ref(1);
    let items = [
      { id: 1, text: 'Sport Man', icon: 'yiconrunning', color: '#c9dd22', imageUrl: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0A/0C/ChMkJlwbaPmIfjr8AAHXNlQ9tyQAAt5PAMXql0AAddO522.jpg' },
      { id: 2, text: 'Sun Day', icon: 'yiconsun', color: '#ff8936', imageUrl: 'https://img-baofun.zhhainiao.com/fs/1b048c1b752bac0fd119a5f1d00bf920.jpg' },
      { id: 3, text: 'Rain Day', icon: 'yicondrop', color: '#44cef6', imageUrl: 'https://cdn.muval.com.au/images/blog/182483/_thumb4/rain-blog.jpg' },
      { id: 4, text: 'Snow Day', icon: 'yiconmd-snow', color: '#4a4266', imageUrl: 'https://www.canr.msu.edu/contentAsset/image/6898d064-63c6-4ab5-9366-b9ce84cfd406/fileAsset/filter/Resize,Crop,Jpeg/resize_w/600/crop_w/600/crop_h/400/crop_x/0/crop_y/0/jpeg_q/70' }
    ]

    function changeSelectedItem (value) {
      selectedItem.value = value;
    }

    return {
      selectedItem,
      items,
      changeSelectedItem
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
