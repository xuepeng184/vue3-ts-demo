export class InitData{
  id:number
  authorityId:number[]
  constructor(id:number,authority:number[]){
    this.id=id
    this.authorityId=authority
  }
  list:ListInt[]=[]
  treeRef:any=''
}

export interface ListInt{
  name:string,
  roleId:number,
  roleList?:ListInt[]
  viewRole?:string
}