<template>
  <div>

    <div class="flex justify-start items-center gap-2 mb-2">
      <el-input v-model="searchName" clearable placeholder="请输入分类名称" style="width: 200px;"></el-input>
      <el-button type="primary" clearable placeholder="请输入分类名称" @click="fetchCategories">查询</el-button>
    </div>
    <div class="flex justify-start items-center">
      <el-button type="primary" @click="handleAdd">新增分类</el-button>
    </div>
    <el-divider></el-divider>
    <el-table :data="categories" v-loading="loading" border>
      <el-table-column label="ID" prop="id" align="center"></el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
      <el-table-column label="排序" prop="rank" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createdAt" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" align="center"></el-table-column>
      <el-table-column label="操作" align="center"> 
      <template #default="scope">
          <el-button type="primary"  @click="handleEdit(scope.row)">编辑</el-button>
           <el-popconfirm title="确定要删除这个分类吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>


    <AddOrEditCategory ref="addOrEditCategoryRef" @update-category="handleUpdate"/>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted,watch } from 'vue'
import {getCategoryList,deleteCategory} from '@/api/category'
import type {Category} from '@/types/category/category'
import AddOrEditCategory from './modal/AddOrEditCategory.vue'
import { ElMessage } from 'element-plus'


const loading = ref(false)
const categories = ref([])
const updatedCategory = ref()
const searchName = ref('')

interface CategoryData {
  currentPage: number;
  pageSize: number;
  name?: string; // 可选的name属性
}
const addOrEditCategoryRef = ref<InstanceType<typeof AddOrEditCategory>>()
const fetchCategories = async () => {
  loading.value = true
  try{
    const data:CategoryData = {
      currentPage: 1,
      pageSize: 10
    }
    if(searchName.value){
      data.name = searchName.value
    }
    const res = await getCategoryList(data)
    if(res.status){
      categories.value = res.data.categories 
    }
    console.log(res)
  }catch(err){
    console.log(err)
  }finally{
    loading.value = false
  }
}

const handleEdit = (row: Category) => {
  addOrEditCategoryRef.value?.onOpen(row)
}

const handleDelete = async (row : Category) => {
  try{
    const res = await deleteCategory(row.id)
    if(res.status){
      ElMessage.success('删除成功')
      fetchCategories()
    }
  }
  catch(err){
    console.log(err)
  }
}

const handleUpdate = (category: Category) => {
  updatedCategory.value = category
}

const handleAdd = (row: Category) => {
  addOrEditCategoryRef.value?.onOpen(row)
}


watch(() => updatedCategory.value,() => {
  fetchCategories()
})
onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>

</style>