<template>
  <div class="login-wrapper">
    <div class="login">
      <el-main>
        <!-- 登录 -->
        <div v-if="currentTab === 'login'">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="20">
              <h1 class="welcome">欢迎使用系统</h1>
              <el-col :span="24">
                <el-form-item label="用户名">
                  <el-input v-model="form.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="密码">
                  <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click.prevent="login"
                    >登录</el-button
                  >
                  <el-button @click.prevent="currentTab = 'register'"
                    >注册</el-button
                  >
                  <!-- <el-button @click.prevent="reset">重置</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 注册 -->
        <div v-if="currentTab === 'register'">
          <el-form :model="employeeForm" label-width="120px">
            <h2 style="text-align: center">欢迎注册</h2>
            <el-form-item label="姓名">
              <el-input
                v-model="employeeForm.name"
                autocomplete="off"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input
                v-model="employeeForm.username"
                autocomplete="off"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                type="password"
                v-model="employeeForm.password"
                autocomplete="off"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input
                v-model="employeeForm.contact_number"
                autocomplete="off"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="employeeForm.gender"
                placeholder="请选择"
                size="medium"
              >
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                <el-option label="保密" value="保密"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-select
                v-model="employeeForm.department_id"
                placeholder="请选择"
                size="medium"
              >
                <el-option
                  v-for="option in departmentData"
                  :key="option.id"
                  :label="option.name"
                  :value="option.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位">
              <el-select
                v-model="employeeForm.position_id"
                placeholder="请选择"
                size="medium"
              >
                <el-option
                  v-for="option in positionData"
                  :key="option.id"
                  :label="option.name"
                  :value="option.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.prevent="register"
                >注册</el-button
              >
              <el-button @click.prevent="currentTab = 'login'">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departmentData: [], // 部门数据
      positionData: [], // 职位数据
      currentTab: "login",
      form: {
        username: "",
        password: "",
      },
      employeeForm: {
        id: "",
        username: "",
        password: "",
        name: "",
        gender: "",
        department_id: "",
        position_id: "",
        contact_number: "",
        role_id: "",
        photo: "",
      },
      error: "",
    };
  },

  methods: {
    login() {
      // 进行登录操作
      this.axios
        .post("http://127.0.0.1:5000/employee/login", this.form)
        .then((response) => {
          // 使用箭头函数解决作用域问题
          // console.log(response.data);
          // 判断请求是否成功
          if (response.data.code == 200) {
            // 登录成功，跳转到首页
            this.$router.push({
              path: "/index",
              query: { user: response.data.data[0] },
            });
          } else {
            // 登录失败，弹出错误提示信息
            alert(response.data.msg);
          }
        });
    },
    register() {
      // 使用 axios 库发送 POST 请求，将员工信息通过请求体发送到后端接口
      this.axios
        .post("http://127.0.0.1:5000/employee/add-one", this.employeeForm)
        .then((response) => {
          // 成功添加员工，返回数据为 {"status": true}
          if (response.data.code == 200) {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            // 清空表单数据，防止重复提交
            this.form.username = this.employeeForm.username;
            this.employeeForm = {};
            this.currentTab = "login";
          }
          // 员工信息未添加成功，返回数据为 {"status": false, "msg": "错误原因"}
          else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("添加失败，请联系管理员");
        });
    },
    findAlldepartment() {
      this.axios
        .get("http://127.0.0.1:5000/department/find-all")
        .then((response) => {
          this.departmentData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    findAllPosition() {
      this.axios
        .get("http://127.0.0.1:5000/position/find-all")
        .then((response) => {
          this.positionData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.findAlldepartment();
    this.findAllPosition();
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.login {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form-item {
  margin-bottom: 20px;
}
.welcome {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
