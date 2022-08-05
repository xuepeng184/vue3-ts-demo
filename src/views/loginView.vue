<template>
  <div class="login-container">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号：" prop="username">
        <el-input
          v-model="ruleForm.username"
          autocomplete="off"
          class="myinput"
        />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-button"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="login-button" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import type { FormInstance } from "element-plus";
import {login} from "../request/api"
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "账号的长度在3-10之间",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "密码长度需在3-10之间",
          trigger: "blur",
        },
      ],
    };
    const ruleFormRef = ref<FormInstance>();
    const router=useRouter()
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res)=>{
            console.log(res);
            localStorage.setItem('token',res.data.token)
            router.push('/')
          })
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    //重置的回调
    const resetForm = () => {
      data.ruleForm.username = "";
      data.ruleForm.password = "";
    };
    return {
      ...toRefs(data),
      rules,
      resetForm,
      ruleFormRef,
      submitForm
    };
  },
});
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background: url(~@/assets/wallpa.png);
  overflow: hidden;
  text-align: center;
  .demo-ruleForm {
    width: 500px;
    margin: 300px auto;
    backdrop-filter: blur(15px);
    padding: 20px 20px;
    border-radius: 20px;
  }
  ::v-deep .el-input__wrapper {
    background-color: transparent !important;
    input {
      color: #fff;
    }
  }
}
.login-button {
  width: 48%;
}
</style>