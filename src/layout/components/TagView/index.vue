<template>
  <div class="tags-view-container">
    <ScrollPanel class="tags-view-wrapper">
      <div class="tags-view-div">
        <div 
          v-for="(page, index) of store.state.tags.viewdPages"
          :key="index"
          :class="{ 'active': currentPath === page.name, 'tags-view-item': true }" 
        >
          <TagItem :page="page" />
         </div>
      </div>
    </ScrollPanel>
  </div>
</template>
<script setup>
  import ScrollPanel from "./ScrollPanel.vue";
  import { useRoute } from "vue-router";
  import { ref, watch } from "@vue/runtime-core";
  import TagItem from "./TagItem.vue";
  import store from "@/store";

  const route = useRoute();
  let currentPath = ref(route.name);

  // eslint-disable-next-line no-unused-vars
  watch(route, (nval, oval) => { currentPath.value = nval.name })
</script>
<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  .tags-view-wrapper {
    .tags-view-div {
      display: flex;
      .tags-view-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 25px;
        line-height: 25px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 5px;
        font-size: 12px;
        margin-left: 5px;
        &:first-of-type {
          margin-left: 5px;
        }
        &:last-of-type {
          margin-right: 5px;
        }
        &.active {
          background-color: #426cb9;
          color: #fff;
          border-color: #426cb9;
          &::before {
            content: "";
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 3px;
          }
        }
      }
    }
  }
}
</style>
