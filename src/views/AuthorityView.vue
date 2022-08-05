<template>
  <div>
    <el-tree
      :data="list"
      show-checkbox
      check-strictly
      node-key="roleId"
      :default-checked-keys="authorityId"
      :props="defaultProps"
      ref="treeRef"
    />
    <el-button type="primary" @click="changeAuthority">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { getAuthorityList } from "@/request/api";
import { InitData } from "@/type/authority";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    onMounted(()=>{
      getAuthorityList().then(res=>{
        console.log('权限',res);
        data.list=res.data  
      })
    })
    const route = useRoute();
    const params: any = route.params;
    const data = reactive(new InitData(params.id, params.authority));
    const defaultProps={
      children:'roleList',
      label:'name'
    }
    const changeAuthority=()=>{
      data.treeRef.getCheckedKeys().sort((a:number,b:number)=>a-b)
      //将数据传给后台，并进行修改，此处没有写请求
    }
    return {
      ...toRefs(data),
      defaultProps,
      changeAuthority
    };
  },
});
</script>

<style scoped>
</style>