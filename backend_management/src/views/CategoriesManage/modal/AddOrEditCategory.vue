<template>
<el-dialog
    v-model="dialogVisible"
    :title="currentRow.id ? '编辑分类' : '新增分类'"
    width="500"
  >
    <el-form :model="form" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类排序" prop="rank">
        <el-input-number v-model="form.rank" placeholder="请输入分类排序"></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type {Category} from '@/types/category/category'
import { getCategoryDetail,updateCategory,addCategory } from '@/api/category'

const emit = defineEmits(['updateCategory'])

const currentRow = ref<Category>({
  id: 0,
  name: '',
  rank: 0,
  createdAt: '',
  updatedAt: '',
})
const form = reactive<Category>({
  id: 0,
  name: '',
  rank: 0,
  createdAt: '',
  updatedAt: '',
})
const dialogVisible = ref(false)

const onOpen = async (row: Category) => {
  dialogVisible.value = true
  currentRow.value = row
  form.name = ''
  form.rank = 0
  if (row.id) {
      try {
        const { data } = await getCategoryDetail(Number(row.id))
        Object.assign(form, data.category)
        console.log(data)
      }catch (error) {
        console.log(error)
      }
  }
}

const onSubmit = async () => {
  if(currentRow.value?.id){
      try {
        const params = {
        name: form.name,
        rank: form.rank,
        }
        const res = await updateCategory(params, Number(currentRow.value?.id))
        // console.log(res)
        ElMessage.success('修改成功')
        emit('updateCategory', res.data)
      } catch (error) 
        {
          console.log(error)
        }finally{
          dialogVisible.value = false
        }
  }else{
    try{
      const params = {
        name: form.name,
        rank: form.rank,
      }
      const res = await addCategory(params)
      // console.log(res)
      ElMessage.success('新增成功')
      emit('updateCategory', res.data)
    }catch (error) {
      console.log(error)
    }finally{
          dialogVisible.value = false
        }
  }
}
defineExpose({
  onOpen,
})
</script>

<style scoped>

</style>