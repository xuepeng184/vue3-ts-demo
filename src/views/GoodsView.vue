<template>
  <div class="select_box">
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="selectData.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="selectData.introduce" placeholder="请输入关键字"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList.comList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="prev, pager, next"
      :total="selectData.count"
      :page-size="selectData.pagesize"
    />
  </div>
</template>

<script lang="ts">
import { getGoodsList } from "@/request/api";

import { computed, defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { InitData, ListInt } from "../type/goods";

export default defineComponent({
  setup() {
    const goods_data = reactive(new InitData());
    onMounted(()=>{
      getGoodsData()
    })
    const getGoodsData = () => {
      getGoodsList().then((res) => {
        goods_data.List = res.data;
        goods_data.selectData.count = res.data.length;
      });
    };
    //分页器的回调
    const dataList = reactive({
      comList: computed(() => {
        return goods_data.List.slice(
          (goods_data.selectData.page - 1) * goods_data.selectData.pagesize,
          goods_data.selectData.page * goods_data.selectData.pagesize
        );
      }),
    });
    
    const currentChange = (page: number) => {
      goods_data.selectData.page = page;
    };
    const sizeChange = (pagesize: number) => {
      goods_data.selectData.pagesize = pagesize;
    };
    //提交的回调
    const onSubmit = () => {
      let arr: ListInt[] = []; //接收查询过后要展示的数据
      if (goods_data.selectData.title || goods_data.selectData.introduce) {
        if (goods_data.selectData.title) {
          arr = goods_data.List.filter((value) => {
            return value.title.indexOf(goods_data.selectData.title) !== -1;
          });
        }
        if (goods_data.selectData.introduce) {
          arr = goods_data.List.filter((value) => {
            return (
              value.introduce.indexOf(goods_data.selectData.introduce) !== -1
            );
          });
        }
      } else {
        arr = goods_data.List;
      }
      goods_data.selectData.count = arr.length;
      goods_data.List = arr;
    };
    watch([()=>goods_data.selectData.title,()=>goods_data.selectData.introduce],()=>{
      if(goods_data.selectData.title=='' && goods_data.selectData.introduce==""){
        getGoodsData()
      }
    })
    //重置的回调
    const reset = () => {
      goods_data.selectData.title=''
      goods_data.selectData.introduce=''
      getGoodsData()
    };
    return {
      ...toRefs(goods_data),
      currentChange,
      sizeChange,
      dataList,
      onSubmit,
      reset,
    };
  },
});
</script>

<style scoped>
</style>