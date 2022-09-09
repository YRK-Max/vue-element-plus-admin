<template>
    <div class="p-2 h-full overflow-hidden">
        <el-row class="h-full" :gutter="6">
            <el-col class="h-full" :span="4">
                <el-card class="h-full enter-y" header="工厂" :body-style="{ padding: '10px', height: 'calc(100% - 50px)' }">
                    <el-input v-model="filterText" placeholder="Filter keyword" />
                    <el-tree
                        ref="treeRef"
                        class="filter-tree"
                        :data="tree_data"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                    />
                </el-card>
            </el-col>
            <el-col class="h-full" :span="20">
                <el-card class="h-full enter-y" :body-style="{ padding: '10px', height: 'calc(100% - 50px)' }">
                    <template #header>
                        <div class="flex justify-between">
                            <h1>设备信息列表</h1>
                            <div>
                                <el-button size="small">
                                    <template #icon>
                                        <YIcon icon="yiconshuaxin" size="12" />
                                    </template>
                                    刷新
                                </el-button>
                                <el-button size="small" type="primary" color="#426cb9">
                                    <template #icon>
                                        <YIcon icon="yiconjia" size="12" />
                                    </template>
                                    添加
                                </el-button>
                                <el-button size="small" type="primary" color="#c12c1f">
                                    <template #icon>
                                        <YIcon icon="yiconlajitong" size="13" />
                                    </template>
                                    删除
                                </el-button>
                                <el-button size="small" type="primary" color="#4ec785">
                                    <template #icon>
                                        <YIcon icon="yicondaoruexcel" size="13" />
                                    </template>
                                </el-button>
                                <el-button size="small" type="primary" color="#4ec785">
                                    <template #icon>
                                        <YIcon icon="yicondaochuexcelmoban" size="13" />
                                    </template>
                                </el-button>
                            </div>
                        </div>
                    </template>
                    <DataTable
                        :columns="columns"
                        :data="data"
                    />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import DataTable from '@/components/DataTable.vue'
import { defineComponent } from 'vue'
import YIcon from '@/components/YIcon.vue'
export default defineComponent({
  components: {
    DataTable,
    YIcon
  },
  setup() {
    const data = [
      { name: 'DPT', line: 'MP', area: 'CVD', vendor: 'VENDOR1', model: 'MODEL1' }
    ]
    const columns = [
      { type: 'seq', width: 40 },
      { type: 'checkbox', width: 40 },
      { field: 'name', title: 'Fab', sortable: true, filterMultiple: true },
      { field: 'line', title: 'Line' },
      { field: 'area', title: 'Area', showOverflow: true, showHeaderOverflow: true },
      { field: 'vendor', title: 'Vendor', showOverflow: true },
      { field: 'model', title: 'EQP Model', showOverflow: true },
      { field: 'operation', title: '操作', showOverflow: true, slots: { default: 'edit' }}
    ]

    const tree_data = [
      {
        id: 1,
        label: 'Level one 1',
        children: [
          {
            id: 4,
            label: 'Level two 1-1',
            children: [
              {
                id: 9,
                label: 'Level three 1-1-1'
              },
              {
                id: 10,
                label: 'Level three 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: 'Level one 2',
        children: [
          {
            id: 5,
            label: 'Level two 2-1'
          },
          {
            id: 6,
            label: 'Level two 2-2'
          }
        ]
      },
      {
        id: 3,
        label: 'Level one 3',
        children: [
          {
            id: 7,
            label: 'Level two 3-1'
          },
          {
            id: 8,
            label: 'Level two 3-2'
          }
        ]
      }
    ]

    return {
      columns,
      data,
      tree_data
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
