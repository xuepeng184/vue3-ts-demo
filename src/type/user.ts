
interface RoleInt{
  role:number,
  roleNaem:string
}

export interface ListInt{
  id:number,
  nickName:string,
  role:RoleInt[],
  userName:string
}
interface SelectDataInt{
  role:number,
  nickName:string
}
interface RoleListInt{
  authority:number[],
  roleId:number,
  roleName:string
}
interface ActiveInt{
  id:number,
  nickName:string,
  role:number[],
  userName:string
}
export class InitData{
  list:ListInt[]=[] //接受用户列表
  roleList:RoleListInt[]=[] //角色信息列表
  isShow=false
  selectData:SelectDataInt={
    nickName:'',
    role:0
  }
  //接收当前选中的这个对象
  active:ActiveInt={
    id:0,
    nickName:"",
    role:[],
    userName:''
  }
}