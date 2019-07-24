<template>
  <div class="ovi">
    <el-row>
      <el-col :span="24">
        <div class="el-table-header">
          <el-input
              v-model="search"
              suffix-icon="el-icon-search"
              placeholder="输入姓名关键字搜索"/>
          <el-button type="primary" @click.native.prevent="addInformation">添加</el-button>
          <el-button type="primary" :disabled="disableds">批量删除</el-button>
      </div>
      </el-col>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        border
        :header-cell-style="styleHeader"
        stripe
        height="630"
        @selection-change="handleSelectionChange"
        @select="select"
        v-loading="loading"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index,tableData)"
              type="text"
              size="small">
              删除
            </el-button>
            <el-button
              @click.native.prevent="compileRow(scope.$index,scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--编辑-->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form" :label-position="labelPosition" style="width: 50%;margin-left: 25%">
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker style="width: 100%"
                            v-model="form.date"
                            type="date"
                            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native.prevent="editSuccess">确 定</el-button>
        </div>
      </el-dialog>
      <!--添加数据-->
      <el-dialog title="添加数据" :visible.sync="dialogFormVisibleData">
        <el-form :model="formData" :label-position="labelPosition" style="width: 50%;margin-left: 25%">
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker style="width: 100%"
              v-model="formData.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="formData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="formData.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleData = false">取 消</el-button>
          <el-button type="primary" @click.native.prevent="dataSuccess">确 定</el-button>
        </div>
      </el-dialog>


      <el-col :span="24"><div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total">
          </el-pagination>
      </div></el-col>
    </el-row>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        loading:false,
        currentPage:1,
        disableds:true,
        search:"",
        form:{
          date:"",
          name:"",
          address:"",
        },
        formData:{
          date:"",
          name:"",
          address:"",
        },
        labelPosition:"left",
        dialogFormVisible:false,
        dialogFormVisibleData:false,
        formLabelWidth:'50px',
        styleHeader:{
          width:"100%",
          background:"#eef1f9",
          color:"#606266"
        },
        multipleSelection:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-05',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-10',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-12',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-21',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-22',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-25',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-26',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-27',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-28',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-30',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-15',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-18',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-27',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-19',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-22',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        total:"",
      }
    },
    methods: {
      handleSelectionChange:function(val){
        this.multipleSelection = val;
        console.log(this.multipleSelection,val);
      },
      select:function (selection,row) {
        // this.disableds = false
      },
      deleteRow:function(index, rows) {
        this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
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
      compileRow:function (index,row) {
        this.GLOBAL.Index = index;
        this.dialogFormVisible = true;
        this.form.date = row.date;
        this.form.name = row.name;
        this.form.address = row.address;
      },
      editSuccess:function () {
        this.dialogFormVisible = false;
        this.tableData[this.GLOBAL.Index].date = this.dateTimeManage(this.form.date);
        this.tableData[this.GLOBAL.Index].name = this.form.name;
        this.tableData[this.GLOBAL.Index].address = this.form.address
      },
      addInformation:function () {
        this.dialogFormVisibleData = true
      },
      dataSuccess:function () {
        var obj= {};
        obj.date = this.dateTimeManage(this.formData.date);
        obj.name = this.formData.name;
        obj.address = this.formData.address;
        this.tableData.unshift(obj);
        console.log(this.tableData);
        this.total = this.tableData.length;
        this.dialogFormVisibleData = false;
        this.formData.date = "";
        this.formData.name = "";
        this.formData.address = "";
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created(){
      this.total = this.tableData.length
    },
  }
</script>

<style scoped>
  .ovi>>>.gutter{
    background-color: #eef1f9;
  }
  .el-col {
    border-radius: 4px;
    height: 50px;
    background-color: #fff;
  }
  .el-table-header{
    width: 100%;
    overflow-y: hidden;
  }
  .el-table-header>>>.el-input{
    width: 200px;
    line-height: 50px;
    float: left;
    margin-left: 50px;
  }
  .el-table-header>>>.el-button{
    float: right;
    margin-top: 5px;
    margin-right: 30px;
  }
  .block>>>.el-pagination{
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
  }
</style>
