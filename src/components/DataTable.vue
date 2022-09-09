<template>
    <vxe-grid
        v-bind="gridOptions"
        :columns="columns"
        :data="datasource"
    >
      <template #edit="{ row }">
            <el-button type="primary" size="small" link @click="handleEdit(row)">编辑</el-button>
          </template>
      <template #pager>
        <vxe-pager
          v-show="showPager"
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          :current-page="tablePage.currentPage"
          :page-size="tablePage.pageSize"
          :total="tablePage.total"
          @page-change="handlePageChange"
        >
        </vxe-pager>
      </template>
    </vxe-grid>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  props: ['columns', 'datasource', 'total', 'loading', 'showPager'],
  // eslint-disable-next-line no-unused-vars
  setup(props, context) {
    const tablePage = reactive({
      total: 0,
      currentPage: 1,
      pageSize: 10
    })

    const gridOptions = reactive({
      border: true,
      height: 'auto',
      size: 'mini',
      stripe: true,
      loading: false,
      columnConfig: {
        resizable: true,
        showHeaderOverflow: true
      },
      rowConfig: {
        isHover: true,
        isCurrent: true
      }
    })

    function handlePageChange() {

    }

    function handleEdit(row) {
      context.emit('row-edit', row)
    }

    return {
      tablePage,
      gridOptions,
      handlePageChange,
      handleEdit
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
