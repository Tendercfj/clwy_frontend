<template>
  <el-menu
    default-active="/categories"
    class="h-screen"
    router
  >
  <div class="flex justify-center items-center">
    <h1 class="text-4xl font-bold">clwy后台管理</h1>
  </div>


    <el-menu-item index="/categories" class="flex justify-center items-center">
      <el-icon class="text-xl"><location /></el-icon>
      <span class="text-xl ml-2">分类管理</span>
    </el-menu-item>

    <el-menu-item index="/courses" class="flex justify-center items-center">
      <el-icon class="text-xl"><icon-menu /></el-icon>
      <span class="text-xl ml-2">课程管理</span>
    </el-menu-item>

    <el-menu-item index="/chapters" class="flex justify-center items-center">
      <el-icon class="text-xl"><document /></el-icon>
      <span class="text-xl ml-2">章节管理</span>
    </el-menu-item>

    <el-menu-item index="/users" class="flex justify-center items-center">
      <el-icon class="text-xl"><User /></el-icon>
      <span class="text-xl ml-2">用户管理</span>
    </el-menu-item>

    <el-menu-item index="/charts" class="flex justify-center items-center">
      <el-icon class="text-xl"><Promotion /></el-icon>
      <span class="text-xl ml-2">数据展示</span>
    </el-menu-item>



    <el-menu-item index="/settings" class="flex justify-center items-center">
      <el-icon class="text-xl"><setting /></el-icon>
      <span class="text-xl ml-2">系统设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  User,
  Promotion
} from '@element-plus/icons-vue'

</script>

<style scoped>
</style>