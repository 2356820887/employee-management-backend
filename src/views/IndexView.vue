<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <!-- 左侧导航栏 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-menu-item index="1" @click="currentTab = 'home'"
            ><i class="el-icon-s-home"></i>首页</el-menu-item
          >
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-s-custom"></i>员工信息管理</template
            >
            <el-menu-item-group>
              <template slot="title">部门管理</template>
              <el-menu-item index="2-1" @click="currentTab = 'addDepartment'"
                >添加部门</el-menu-item
              >
              <el-menu-item index="2-2" @click="currentTab = 'viewDepartment'"
                >查看部门</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="2-3" @click="currentTab = 'addEmployee'"
                >添加员工</el-menu-item
              >
              <el-menu-item index="2-4" @click="currentTab = 'viewEmployee'"
                >查询员工</el-menu-item
              >
              <el-menu-item
                index="2-5"
                @click="currentTab = 'departmentEmployee'"
                >员工统计</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group title="职位管理">
              <el-menu-item index="2-6" @click="currentTab = 'addPosition'"
                >添加职位</el-menu-item
              ><el-menu-item index="2-7" @click="currentTab = 'position'"
                >职位统计</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-s-data"></i>数据统计</template
            >
            <el-menu-item-group>
              <template slot="title">部门员工统计</template>
              <el-menu-item
                index="3-1"
                @click="currentTab = 'departmentEmployee'"
                >员工统计</el-menu-item
              >
              <el-menu-item index="3-2" @click="currentTab = 'position'"
                >职位统计</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu> -->
          <el-menu-item
            index="4"
            @click="currentTab = 'help'"
            v-if="user.role_name === '管理员'"
            ><i class="el-icon-s-help"></i>帮助中心</el-menu-item
          >
        </el-menu>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-container>
        <el-header
          style="
            text-align: right;
            font-size: 14px;
            background-color: #409eff;
            color: #fff;
          "
        >
          <!-- <el-dropdown>
            <i class="el-icon-s-tools" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="viewProfile">个人信息</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-dropdown @command="userCommand">
            <el-button type="primary" icon="el-icon-s-tools"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ user.name }}</span>
        </el-header>

        <el-main>
          <!-- 首页 -->
          <div v-if="currentTab === 'home'">
            <h2 style="text-align: center; margin-top: 50px">
              欢迎使用员工管理系统！
            </h2>
            <p style="text-align: center">
              请在左侧导航栏中选择需要操作的内容。
            </p>
          </div>

          <!-- 添加部门 -->
          <div
            v-if="currentTab === 'addDepartment'"
            style="width: 50%; margin: 0 auto; text-align: center"
          >
            <h2 style="text-align: center; margin-top: 50px">添加部门</h2>
            <el-form :model="departmentFrom">
              <el-form-item label="部门编号">
                <el-input v-model="departmentFrom.id" type="number"></el-input>
              </el-form-item>
              <el-form-item label="部门名称">
                <el-input v-model="departmentFrom.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addDepartment"
                  >添加</el-button
                >
              </el-form-item>
            </el-form>
          </div>

          <!-- 查看部门 -->
          <div
            v-if="currentTab === 'viewDepartment'"
            style="width: 50%; margin: 0 auto; text-align: center"
          >
            <h2 style="text-align: center; margin-top: 50px">查看部门</h2>
            <!-- TODO：显示部门列表 -->
            <el-table :data="departmentData">
              <el-table-column prop="id" label="员工编号"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column fixed="right" label="操作" width="180">
                <!-- eslint-disable-next-line vue/no-unused-vars -->
                <template slot-scope="scope">
                  <div>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="opendialogDepartment(scope.row)"
                      >修改</el-button
                    >
                    <el-dialog
                      title="部门信息"
                      :visible.sync="scope.row.isDialogVisible"
                      :append-to-body="true"
                    >
                      <el-form :model="departmentFrom">
                        <el-form-item label="部门名称">
                          <el-input
                            v-model="departmentFrom.name"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <!-- <el-button @click="hideialogDepartment(scope.row)"
                          >取 消</el-button
                        > -->
                        <el-button
                          type="primary"
                          @click="updateDepartment(scope.row)"
                          >确 定</el-button
                        >
                      </div>
                    </el-dialog>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="openDeleteDepartmentDialog(scope.row)"
                      >删除</el-button
                    >
                    <el-dialog
                      title="提示"
                      :visible.sync="scope.row.deleteDepartmentDialog"
                      :append-to-body="true"
                    >
                      <span>确定删除吗？</span>
                      <span slot="footer" class="dialog-footer">
                        <!-- <el-button
                          @click="hideDeleteDepartmentDialog(scope.row)"
                          >取 消</el-button
                        > -->
                        <el-button
                          type="primary"
                          @click="deleteDepartment(scope.row)"
                          >确 定</el-button
                        >
                      </span>
                    </el-dialog>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 添加员工 -->
          <div style="width: 50%; margin: 0 auto; text-align: center">
            <div v-if="currentTab === 'addEmployee'">
              <h2 style="text-align: center; margin-top: 50px">添加员工</h2>
              <el-form :model="employeeForm" label-width="120px">
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
              </el-form>
            </div>
          </div>

          <!-- 查询员工 -->
          <div v-if="currentTab === 'viewEmployee'">
            <h2 style="text-align: center; margin-top: 50px">查询员工</h2>
            <!-- TODO：显示员工列表和查询表单 -->
            <el-form :inline="true" :model="queryFrom" class="demo-form-inline">
              <el-form-item label="姓名">
                <el-input
                  v-model="queryFrom.employee_name"
                  placeholder="姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="部门">
                <el-select
                  v-model="queryFrom.department_id"
                  placeholder="部门名称"
                >
                  <el-option
                    v-for="option in departmentData"
                    :key="option.value"
                    :label="option.name"
                    :value="option.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位">
                <el-select
                  v-model="queryFrom.position_id"
                  placeholder="职位名称"
                >
                  <el-option
                    v-for="option in positionData"
                    :key="option.value"
                    :label="option.name"
                    :value="option.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryEmployee"
                  >查询</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button @click="resetQuery">重置</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="queryBack">
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column
                prop="department_name"
                label="部门名称"
              ></el-table-column>
              <el-table-column
                prop="position_name"
                label="职位名称"
              ></el-table-column>
              <el-table-column
                prop="contact_number"
                label="联系电话"
              ></el-table-column>
            </el-table>
          </div>

          <!-- 员工统计 -->
          <div v-if="currentTab === 'departmentEmployee'">
            <h2 style="text-align: center; margin-top: 50px">部门员工统计</h2>
            <!-- TODO：显示统计结果 -->
            <el-table :data="employeeData">
              <el-table-column
                prop="id"
                label="员工编号"
                width="140"
              ></el-table-column>
              <!-- <el-table-column
                prop="username"
                label="账号"
                width="120"
              ></el-table-column>
              <el-table-column prop="password" label="密码"></el-table-column> -->
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column
                prop="department_id"
                label="部门编号"
              ></el-table-column>
              <el-table-column
                prop="position_id"
                label="职位编号"
              ></el-table-column>
              <el-table-column
                prop="contact_number"
                label="联系电话"
              ></el-table-column>
              <el-table-column prop="photo" label="员工照片">
                <template slot-scope="scope">
                  <img :src="scope.row.photo" alt="employee-image" />
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="180">
                <!-- eslint-disable-next-line vue/no-unused-vars -->
                <template slot-scope="scope">
                  <div>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="openEmployeeDialog(scope.row)"
                      >修改</el-button
                    >
                    <el-dialog
                      title="员工信息"
                      :visible.sync="scope.row.isDialogVisible"
                      :append-to-body="true"
                      ><el-form>
                        <el-form-item label="姓名">
                          <el-input
                            v-model="employeeForm.name"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                          <el-input
                            v-model="employeeForm.name"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="所属部门">
                          <el-input
                            v-model="employeeForm.name"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="职位">
                          <el-input
                            v-model="employeeForm.name"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                          <el-input
                            v-model="employeeForm.name"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="员工照片">
                          <el-input
                            v-model="employeeForm.name"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item> </el-form
                    ></el-dialog>
                    <el-button size="mini" type="danger">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 职位统计 -->
          <div
            v-if="currentTab === 'position'"
            style="width: 50%; margin: 0 auto; text-align: center"
          >
            <h2 style="text-align: center; margin-top: 50px">职位统计</h2>
            <!-- TODO：显示统计结果 -->
            <el-table :data="positionData">
              <el-table-column prop="id" label="职位编号"></el-table-column>
              <el-table-column prop="name" label="职位名称"></el-table-column>
              <el-table-column fixed="right" label="操作" width="180">
                <!-- eslint-disable-next-line vue/no-unused-vars -->
                <template slot-scope="scope">
                  <div>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="opendialogPosition(scope.row)"
                      >修改</el-button
                    >
                    <el-dialog
                      title="职位信息"
                      :visible.sync="scope.row.opendialogPosition"
                      :append-to-body="true"
                    >
                      <el-form :model="positionFrom">
                        <el-form-item label="职位名称">
                          <el-input
                            v-model="positionFrom.name"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button
                          type="primary"
                          @click="updatePosition(scope.row)"
                          >确 定</el-button
                        >
                      </div>
                    </el-dialog>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="openDeletePositionDialog(scope.row)"
                      >删除</el-button
                    >
                    <el-dialog
                      title="提示"
                      :visible.sync="scope.row.deletePositionDialog"
                      :append-to-body="true"
                    >
                      <span>确定删除吗？</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button
                          type="primary"
                          @click="deletePosition(scope.row)"
                          >确 定</el-button
                        >
                      </span>
                    </el-dialog>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 添加职位 -->
          <div
            v-if="currentTab === 'addPosition'"
            style="width: 50%; margin: 0 auto; text-align: center"
          >
            <h2 style="text-align: center; margin-top: 50px">添加职位</h2>
            <el-form :model="positionFrom">
              <el-form-item label="职位编号">
                <el-input v-model="positionFrom.id" type="number"></el-input>
              </el-form-item>
              <el-form-item label="职位名称">
                <el-input v-model="positionFrom.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addPosition">添加</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!-- 销售收入统计 -->
          <div v-if="currentTab === 'sales'">
            <h2 style="text-align: center; margin-top: 50px">销售收入统计</h2>
            <!-- TODO：显示统计结果 -->
          </div>

          <!-- 利润统计 -->
          <div v-if="currentTab === 'profit'">
            <h2 style="text-align: center; margin-top: 50px">利润统计</h2>
            <!-- TODO：显示统计结果 -->
          </div>

          <!-- 帮助中心 -->
          <div v-if="currentTab === 'help'">
            <h2 style="text-align: center; margin-top: 50px">帮助中心</h2>
            <!-- TODO：显示帮助中心 -->
          </div>

          <!-- 个人中心 -->
          <div v-if="currentTab === 'user'">
            <el-descriptions
              class="margin-top"
              title="个人信息"
              :column="3"
              border
            >
              <template slot="extra">
                <el-button
                  type="primary"
                  size="small"
                  @click="dialogFormVisible = true"
                  >修改</el-button
                >
                <el-dialog
                  title="个人信息"
                  :visible.sync="dialogFormVisible"
                  width="450px"
                  top="15vh"
                >
                  <el-form :model="employeeForm" label-width="120px">
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
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      style="background-color: #409eff; border-color: #409eff"
                      @click="updateUser"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
              </template>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  用户名
                </template>
                {{ user.name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  手机号
                </template>
                {{ user.contact_number }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user-solid"></i>
                  性别
                </template>
                {{ user.gender }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  所属部门
                </template>
                {{ user.department_name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  职位
                </template>
                {{ user.position_name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  权限
                </template>
                {{ user.role_name }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: "",
      isDialogVisible: false,
      dialogFormVisible: false,
      user: "",
      currentTab: "home",
      employeeData: [], // 员工数据
      departmentData: [], // 部门数据
      positionData: [], // 职位数据
      queryFrom: {
        employee_name: null,
        department_id: null,
        position_id: null,
      },
      departmentFrom: {
        id: null,
        name: "",
      },
      positionFrom: {
        id: null,
        name: "",
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
      queryBack: [
        {
          name: "",
          gender: "",
          department_name: "",
          position_name: "",
          contact_number: "",
        },
      ],
    };
  },
  methods: {
    userCommand(command) {
      if (command == "info") {
        console.log("个人中心");
        this.currentTab = "user";
      } else if (command == "quit") {
        console.log("退出");
        this.user = "";
        this.$router.push({ path: "/" });
      }
    },
    findAllEmployee() {
      this.axios
        .get("http://127.0.0.1:5000/employee/find-all")
        .then((response) => {
          console.log(response);
          this.employeeData = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 添加员工信息
    addEmployee() {
      // 使用 axios 库发送 POST 请求，将员工信息通过请求体发送到后端接口
      this.axios
        .post("http://127.0.0.1:5000/employee/add-one", this.employeeForm)
        .then((response) => {
          // 成功添加员工，返回数据为 {"status": true}
          if (response.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            // 清空表单数据，防止重复提交
            this.employeeForm = {};
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
    addDepartment() {
      this.axios
        .post("http://127.0.0.1:5000/department/add-one", this.departmentFrom)
        .then((response) => {
          if (response.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.findAlldepartment();
            this.currentTab = "viewDepartment";
            this.employeeForm = {};
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("添加失败，请联系管理员");
        });
    },
    addPosition() {
      this.axios
        .post("http://127.0.0.1:5000/position/add-one", this.positionFrom)
        .then((response) => {
          if (response.data.code == 200) {
            this.$message.success("添加成功");
            this.findAllPosition();
            this.currentTab = "position";
            this.positionFrom = {};
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("添加失败，请联系管理员");
        });
    },
    queryEmployee() {
      this.axios
        .post("http://127.0.0.1:5000/employee/find-name", this.queryFrom)
        .then((response) => {
          if (response.data.code == 200) {
            this.queryBack = response.data.data;
          } else {
            alert(response.data.msg);
          }
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
    resetQuery() {
      this.queryFrom = {
        employee_name: null,
        department_id: null,
        position_id: null,
      };
    },
    updateUser() {
      this.employeeForm.id = this.user.id;
      this.employeeForm.photo = null;
      if (this.user.role_name == "管理员") {
        this.employeeForm.role_id = 1;
      } else {
        this.employeeForm.role_id = 2;
      }
      console.log(this.employeeForm);
      this.axios
        .post("http://127.0.0.1:5000/employee/update-one", this.employeeForm)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateDepartment(row) {
      this.departmentFrom.id = row.id;
      this.axios
        .post(
          "http://127.0.0.1:5000/department/update-one",
          this.departmentFrom
        )
        .then((response) => {
          if (response.data.code == 200) {
            this.findAlldepartment();
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("修改失败，请联系管理员");
        });
      row.isDialogVisible = false;
    },
    deleteDepartment(row) {
      this.axios
        .get("http://127.0.0.1:5000/department/delete-one?id=" + row.id)
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            this.findAlldepartment();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("删除失败，请联系管理员");
        });
      row.deleteDepartmentDialog = false;
    },
    opendialogDepartment(row) {
      console.log(row);
      if (row.isDialogVisible === undefined) {
        this.$set(row, "isDialogVisible", false);
      }
      this.departmentFrom.name = row.name;
      row.isDialogVisible = true;
    },
    hideialogDepartment(row) {
      row.isDialogVisible = false;
    },
    openDeleteDepartmentDialog(row) {
      console.log(row);
      if (row.deleteDepartmentDialog === undefined) {
        this.$set(row, "deleteDepartmentDialog", false);
      }
      row.deleteDepartmentDialog = true;
    },
    hideDeleteDepartmentDialog(row) {
      row.isDialogVisible = false;
    },
    opendialogPosition(row) {
      if (row.opendialogPosition === undefined) {
        this.$set(row, "opendialogPosition", false);
      }
      this.positionFrom.name = row.name;
      row.opendialogPosition = true;
    },
    hideialogPosition(row) {
      row.opendialogPosition = false;
    },
    updatePosition(row) {
      this.positionFrom.id = row.id;
      this.axios
        .post("http://127.0.0.1:5000/position/update-one", this.positionFrom)
        .then((response) => {
          if (response.data.code == 200) {
            this.findAllPosition();
            this.$message.success("修改成功");
            this.positionFrom = {};
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("修改失败，请联系管理员");
        });
      row.opendialogPosition = false;
    },
    deletePosition(row) {
      this.axios
        .get("http://127.0.0.1:5000/position/delete-one?id=" + row.id)
        .then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            this.findAllPosition();
            this.$message.success("删除成功");
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("删除失败，请联系管理员");
        });
      row.deletePositionDialog = false;
    },
    openDeletePositionDialog(row) {
      if (row.deletePositionDialog === undefined) {
        this.$set(row, "deletePositionDialog", false);
      }
      row.deletePositionDialog = true;
    },
  },
  created() {
    this.findAllEmployee();
    this.findAlldepartment();
    this.findAllPosition();
    this.user = this.$route.query.user;
    console.log(this.user);
  },
};
</script>

<style>
.el-header {
  height: 60px;
  line-height: 60px;
}

.el-main {
  padding: 20px;
}
.el-dialog__header {
  font-weight: bold;
  font-size: 18px;
}
</style>
