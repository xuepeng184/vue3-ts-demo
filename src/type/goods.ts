export interface ListInt{
  userId:number,
  id:number,
  title:string,
  introduce:string
}

export interface selectDataInt{
  title:string,
  introduce:string,
  page:number,
  count:number //总条数
  pagesize:number
}

export class InitData{
  selectData:selectDataInt={
    title:'',
    introduce:'',
    page:1,
    count:0,
    pagesize:7
  }

  List:ListInt[]=[] //展示的内容数据
}