<template>
    <div class="p-2 h-full overflow-hidden">
        <el-card class="h-full enter-y" :body-style="{ padding: '10px', height: 'calc(100% - 50px)' }">
            <template #header>
                <div class="flex justify-between">
                    <h1>工厂信息列表</h1>
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

    return {
      columns,
      data
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
