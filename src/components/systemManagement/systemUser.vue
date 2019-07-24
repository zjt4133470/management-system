<template>
    <div class="systemUser">
      <el-row>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          height="750px"
          style="width: 100%">
          <el-table-column
            prop="number"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="account"
            width="150"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="group"
            width="200"
            label="组别">
          </el-table-column>
          <el-table-column
            prop="status"
            width="80"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            sortable
            width="200">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <div class="el-table-header">
                <el-input v-model="search"
                  placeholder="输入姓名关键字搜索"/>
                <el-button type="primary" v-if="addSystemUser" @click.native.prevent="addInformation">添加</el-button>
              </div>
            </template>
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="compileRow(scope.$index,tableData)"
                size="small">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index,tableData)"
                type="danger"
                size="small"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--添加数据-->
        <el-dialog title="添加系统用户" :visible.sync="dialogFormVisibleData">
          <el-form :rules="rules" :model="formData" :label-position="labelPosition" style="width: 50%;margin-left: 25%">
            <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="formData.name" autocomplete="off" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="account">
              <el-input v-model="formData.account" autocomplete="off" placeholder="请输入用户手机号"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="formData.password" autocomplete="off" placeholder="非必填，默认123456"></el-input>
            </el-form-item>
            <el-form-item label="用户分组" :label-width="formLabelWidth" v-if="obj" prop="group">
              <el-select v-model="formData.group" placeholder="请选择分组" style="width: 100%">
                <el-option v-for="(item,key) in obj" :key="key" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleData = false">取 消</el-button>
            <el-button type="primary" @click.native.prevent="dataSuccess">确 定</el-button>
          </div>
        </el-dialog>

        <el-col :span="24">
          <div class="block" v-if="total">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              edUser:'',
              addSystemUser:false,
              obj:{},
              search:"",
              total:"",
              currentPage:"",
              dialogFormVisibleData:false,
              formLabelWidth:'80px',
              labelPosition:"center",
              tableData: [],
              formData:{
                  name:"",
                account:"",
                password:"",
                group:""
              },
              rules:{
                name:[
                  { required: true, message: '用户姓名不能为空', trigger: 'blur' }
                ],
                account:[
                  { required: true, message: '手机号不能为空', trigger: 'blur' },
                  { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
                ],
                group:[
                  { required: true, message: '用户分组不能为空', trigger: 'change' }
                ],
                password:[
                  { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
              },
            }
        },
        methods: {
          compileRow:function(index, rows){
            alert('编辑',index,rows)
          },
          systemUser:function(){
            //系统用户列表
            var data = {
              map:"api_user_list",
              plum_session_api:localStorage.getItem('token'),
              time_stamp:Date.parse(new Date())/1000,
              page:1
            };
            data.sign_str = this.createSign(data);
            this.$http.post('',data).then((data)=>{
              if(data.ec==200){
                this.tableData =data.data.list;
                this.total = data.data.list.length;
                this.currentPage = data.current_page
              }else {
                this.$message.error(data.em);
              }
            }).catch((err)=>{
              this.$message.error('获取信息失败');
            });
          },
          addInformation:function () {
            this.dialogFormVisibleData = true
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          },
          //添加用户
          dataSuccess:function () {
            var password = this.formData.password;
            if(password == ''){
              password = 123456
            }else {
              password = this.formData.password;
            }
            var data = {
              map:"api_user_add",
              plum_session_api:localStorage.getItem('token'),
              time_stamp:Date.parse(new Date())/1000,
              name:this.formData.name,
              account:this.formData.account,
              password:password,
              group:this.formData.group
            };
            data.sign_str = this.createSign(data);
            this.$http.post('',data).then((data)=>{
              if(data.ec==200){
                this.$message.success(data.em);
                this.dialogFormVisibleData = false;
                this.formData.name="";
                //更新列表
                this.systemUser();

              }else {
                this.$message.error(data.em);
              }
            }).catch((err)=>{
              this.$message.error('添加信息失败');
            });
          },
          //删除用户
          deleteRow:function(index, rows) {
            this.$confirm('此操作将删除该项, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              rows.splice(index, 1);
              this.total = this.tableData.length;
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
        },
        created() {
          //获取用户列表
          this.systemUser();
          //获取下拉分组
          var datas = {
            map:"api_user_alive_group",
            plum_session_api:localStorage.getItem('token'),
            time_stamp:Date.parse(new Date())/1000,
          };
          datas.sign_str = this.createSign(datas);
          this.$http.post('',datas).then((data)=>{
            if(data.ec==200){
             this.obj = data.data;
            }else {
              this.$message.error(data.em);
            }
          }).catch((err)=>{
            this.$message.error('获取失败');
          });
          //获取按钮权限
          this.buttonPermissions().then((data)=>{
            if(data == 'all'){
              this.addSystemUser =true;
            }else {
              if(data.indexOf('.addSystemUser') !== -1){
                this.addSystemUser =true
              }
            }
          })
        },
    }
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
    height: 50px;
    background-color: #fff;
  }
  .el-table-header>>>.el-input{
    width: 200px;
    float: left;
    height: 40px;
  }
  .el-table-header>>>.el-button{
    float: right;
    height: 40px;
  }
  .block>>>.el-pagination{
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    text-align: center;
  }
</style>
