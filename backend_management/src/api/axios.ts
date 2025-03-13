import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import router from '../router';

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10 * 1000,
  headers: { 
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['token'] = `${token}`;
  }
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response);
    // return response;
    const data = response.data;
    if (data.status) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // token过期或未登录
          localStorage.removeItem('token');
          router.push('/login');
          break;
        case 403:
          // 权限不足
          console.error('没有权限访问该资源');
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          console.error('发生未知错误');
      }
    } else if (error.request) {
      // 请求已发出但未收到响应
      console.error('网络错误，请检查您的网络连接');
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message);
    }
    return Promise.reject(error.response || error.message);
  }
);

export default service;
