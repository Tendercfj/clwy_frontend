<template>
<div class="common-layout">
    <el-container>
      <el-aside class="w-[300px] h-screen"><LeftLayout/></el-aside>
      <el-container>
        <el-header><HeaderBreadcrumb/></el-header>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import LeftLayout from "@/components/LeftMenu/LleftLayOut.vue";
import HeaderBreadcrumb from "@/components/Breadcrumb/HeaderBreadcrumb.vue";
</script>

<style scoped>

</style>