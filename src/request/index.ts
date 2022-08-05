import axios from 'axios'

const service=axios.create({
  baseURL:'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
  timeout:5000,
  headers:{
    'Content-Type':"application/json;charset=utf-8"
  }
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers=config.headers || {}
  if(localStorage.getItem('token')){
    config.headers.token=localStorage.getItem('token')||''
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const code:number=response.data.code
  if(code!==200){
    return Promise.reject(response.data)
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  console.error(error);
  
});

export default service