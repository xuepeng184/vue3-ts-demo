<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"
            ><img class="logo" src="../assets/logo.png" alt=""
          /></el-col>
          <el-col :span="16"><h2>xp后台管理系统</h2></el-col>
          <el-col :span="4" class="col-btn"><el-button text @click="delToken">退出登录</el-button></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px"
          ><el-menu
            active-text-color="#41b883"
            background-color="#a39776"
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item
              :index="item.path"
              v-for="item in list"
              :key="item.path"
            >
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter,useRoute } from "vue-router";
export default defineComponent({
  name: "HomeView",
  setup() {
    const router = useRouter();
    const route=useRoute()
    const list = router.getRoutes().filter((v) => v.meta.isShow);
    const active=route.path
    const delToken=()=>{
      localStorage.removeItem('token')
      router.push('/login')
    }
    return {
      list,
      active,
      delToken
    };
  },
});
</script>

<style scoped lang="scss">
.el-header {
  height: 80px;
  background-image: linear-gradient(-90deg, #c0c0aa 0%, #1cefff 100%);
  color: #666;
  border-bottom: 2px solid #666;
  .logo {
    height: 80px;
  }
  h2,
  .quit-login {
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .col-btn{
    line-height: 80px;
    height: 80px;
  }
}
.el-aside {
  border-right: 2px solid #666;
  .el-menu {
    color: #666;
    height: calc(100vh - 80px);
    background-image: linear-gradient(360deg, #c0c0aa 0%, #1cefff 100%);
  }
}
</style>