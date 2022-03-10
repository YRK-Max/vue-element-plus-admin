<template>
  <div class="tags-view-container">
    <ScrollPanel class="tags-view-wrapper">
      <div class="tags-view-div">
        <div 
          v-for="(page, index) of state.tags.viewdPages"
          :key="index"
          :class="{ 'active': currentRouteName === page.name, 'tags-view-item': true }" 
        >
          <router-link :to="page" >
              {{ $t('route.' + page.meta.title) }} 
          </router-link>
          <i v-if="!page.meta.affix" class="yicon-common yiconcancel ml-1" @click="handleCloseTag(page)"></i>
         </div>
      </div>
    </ScrollPanel>
  </div>
</template>
<script>
  import ScrollPanel from "./ScrollPanel.vue";
  import { useRoute } from "vue-router";
  import { ref, watch, defineComponent } from "@vue/runtime-core";
  import store from "@/store";
  import router from "@/router";

  export default defineComponent({
    components: { ScrollPanel },
    // eslint-disable-next-line no-unused-vars
    setup() {
      const route = useRoute();
      const state = store.state;
      let currentRouteName = ref(route.name);

      // eslint-disable-next-line no-unused-vars
      watch(route, (nval, oval) => { currentRouteName.value = nval.name })

      function handleCloseTag(close_page) {
        const viewdPages = store.state.tags.viewdPages
        store.dispatch('tags/delPageTag', viewdPages.indexOf(close_page)).then(() => {
          if(isActive(close_page)){
            router.push(viewdPages.slice(-1)[0])
          }
        })
      }

      function isActive(page) {
        return page.name === route.name
      }

      return {
        state,
        currentRouteName,
        handleCloseTag
      }
    }
  })
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
