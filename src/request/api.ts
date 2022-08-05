import service from "./index";
interface loginData{
  username:string,
  password:string
}

//请求登录的接口
export function login(data:loginData){
  return service({
    url:'/login',
    method:'post',
    data
  })
}

//商品列表接口
export const getGoodsList=()=>{
  return service({
    url:'/getGoodsList',
    method:'get'
  })
}

//获取用户列表
export const getUserList=()=>{
  return service({
    url:'/getUserList',
    method:'get'
  })
}

//角色列表接口
export const getRoleList=()=>{
  return service({
    url:'/getRoleList',
    method:'get'
  })
}

//权限接口
export const getAuthorityList=()=>{
  return service({
    url:'/getAuthorityList',
    method:'get'
  })
}