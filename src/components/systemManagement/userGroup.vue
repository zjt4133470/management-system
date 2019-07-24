<template>
  <div class="userGroup">
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
          prop="name"
          label="名称"
          width="150">
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
              <el-button type="primary" @click.native.prevent="addInformation" :class="edUser" v-if="addUserGroup">添加</el-button>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="compileRow(scope.$index,tableData)"
              size="small"
              :class="edUser"
              v-if="compileUserGroup"
            >
              编辑权限
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index,tableData)"
              type="danger"
              :class="edUser"
              v-if="delUserGroup"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加数据-->
      <el-dialog title="添加用户分组" :visible.sync="dialogFormVisibleData">
        <el-form :rules="rules" :model="formData" :label-position="labelPosition" style="width: 50%;margin-left: 25%">
          <el-form-item label="分组名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="formData.name" autocomplete="off" placeholder="请输入分组名称"></el-input>
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
        addUserGroup:false,
        revisionUserGroup:false,
        compileUserGroup:false,
        delUserGroup:false,
        edUser:'',
        obj:{},
        search:"",
        total:"",
        currentPage:"",
        dialogFormVisibleData:false,
        formLabelWidth:'80px',
        labelPosition:"left",
        tableData: [],
        formData:{
          name:"",
        },
        rules:{
          name:[
            { required: true, message: '分组名不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      userGroup:function(){
        //获取分组信息
        var data = {
          map:"api_user_group_list",
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
      //添加用户分组
      dataSuccess:function () {
        var data = {
          map:"api_user_group_add",
          plum_session_api:localStorage.getItem('token'),
          time_stamp:Date.parse(new Date())/1000,
          name:this.formData.name
        };
        data.sign_str = this.createSign(data);
        this.$http.post('',data).then((data)=>{
          if(data.ec==200){
            this.$message.success(data.em);
            this.formData.name="";
            this.dialogFormVisibleData = false;
            this.userGroup();
          }else {
            this.$message.error(data.em);
          }
        }).catch((err)=>{
          this.$message.error('添加失败');
        });
      },
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
      //编辑小组权限
      compileRow:function (index,rows) {
        sessionStorage.setItem('id',rows[index].id);
        this.$router.push('editPermission')
      }
    },
    created() {
      //获取分组信息
      this.userGroup();
      //获取按钮权限
      this.buttonPermissions().then((data)=>{
        if(data == 'all'){
          this.addUserGroup =true;
          this.revisionUserGroup =true;
          this.compileUserGroup =true;
          this.delUserGroup =true;
        }else {
          if(data.indexOf('.addUserGroup')!==-1){
            this.addUserGroup =true
          }
          if(data.indexOf('.revisionUserGroup')!==-1){
            this.revisionUserGroup = true
          }
          if(data.indexOf('.compileUserGroup')!==-1){
            this.compileUserGroup = true
          }
          if(data.indexOf('.delUserGroup')!==-1){
            this.delUserGroup = true
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
