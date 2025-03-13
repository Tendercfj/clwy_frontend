<template>
  <div class="flex justify-between items-center px-4">
    <el-breadcrumb :separator-icon="ArrowRight" class="mt-5">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex items-center justify-center gap-2">
       <div>avatar</div>
       <div>username</div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
</script>

<style scoped>

</style>