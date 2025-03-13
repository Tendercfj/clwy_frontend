<template>
  <div class="bg-[#212529] h-screen w-full flex justify-center items-center">
    <div class="w-[400px] h-[300px] bg-white rounded-2xl flex items-center justify-center ">
      <el-form class="flex flex-col justify-center items-center gap-2" :model="form" :rules="rules" label-width="auto" style="max-width: 600px" label-position="left">
        <el-form-item label="用户名/邮箱" prop="login">
          <el-input v-model="form.login"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" show-password v-model="form.password"/>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 200px" type="primary" @click="adminLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {login} from '@/api/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  login: '',
  password: ''
})
const rules = ref({
  login: [
    {required: true, message: '请输入用户名/邮箱', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ]
})
const adminLogin = async () => {
  try {
    const data = {
      login: form.login,
      password: form.password,
    }
    const res = await login(data)
    
    if (res.status) {
      // 保存 token
      localStorage.setItem('token', res.data.token)
      // 显示成功消息
      ElMessage.success('登陆成功')
      // 跳转到首页或指定页面
      router.push('/home')
    }
  } catch (error) {
    ElMessage.error((error as Error).message || '登录失败')
  }
}
</script>

<style scoped>
</style>