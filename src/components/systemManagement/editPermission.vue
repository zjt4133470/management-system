<template>
    <div>
      <el-container>
        <el-header><h1 style="line-height: 60px;font-size: 20px">{{groupName}}的权限设置</h1></el-header>
        <el-main>
          <el-button type="primary" @click.native.prevent="fold" class="fold">折叠</el-button>
          <el-button type="primary" @click.native.prevent="unfold_list" class="unfold ">展开</el-button>
          <div class="dio">
            <el-tree
              ref="tree"
              :data="data"
              :indent="indent"
              show-checkbox
              node-key="access"
              default-expand-all
              :default-checked-keys="unfold"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </div>
        </el-main>
        <el-footer style="background-color: #ffffff"><el-button type="primary" @click.native.prevent="getCheckedKeys" class="getCheckedKeys">开始设置</el-button></el-footer>
      </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              indent:0,
              edUser:'',
              groupName:'',
              unfold:[],
              data: [],
              defaultProps: {
                children: 'submenu',
                label: 'title'
              }
            }
        },
        methods: {
          fold:function(){
            this.$nextTick(() => {
              for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
                this.$refs.tree.store._getAllNodes()[i].expanded = false;
              }
            });
          },
          unfold_list:function(){
            this.$nextTick(() => {
              for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
                this.$refs.tree.store._getAllNodes()[i].expanded = true;
              }
            });
          },
          init:function () {
            var id=sessionStorage.getItem('id');
            var data = {
              map:"api_group_menu",
              plum_session_api:localStorage.getItem('token'),
              time_stamp:Date.parse(new Date())/1000,
              id:id
            };
            data.sign_str = this.createSign(data);
            this.$http.post('',data).then((data)=>{
              if(data.ec==200){
                var all_menu = data.data.all_menu;
                var have_menu = data.data.have_menu;
                this.data = all_menu;
                this.unfold =have_menu;
                this.groupName = data.data.group_name
              }else {
                this.$message.error(data.em);
              }
            }).catch((err)=>{
              this.$message.error('获取小组信息失败');
            });
          },
          getCheckedKeys() {
            var id=sessionStorage.getItem('id');
            var menu_array = JSON.stringify(this.$refs.tree.getCheckedKeys());
            var data = {
              map:"api_set_group_menu",
              plum_session_api:localStorage.getItem('token'),
              time_stamp:Date.parse(new Date())/1000,
              id:id,
              menu_array:menu_array
            };
            data.sign_str = this.createSign(data);
            this.$http.post('',data).then((data)=>{
              if(data.ec==200){
                this.$message.success(data.em);
                this.$router.push('userGroup')
              }else {
                this.$message.error(data.em);
              }
            }).catch((err)=>{
              this.$message.error('设置信息失败');
            });
            // console.log(this.$refs.tree.getCheckedKeys());
          },
        },
        created() {
          this.init();
          //获取按钮权限
          this.edUser=localStorage.getItem('userButton')
        },
      watch:{
           $route(to,from){
             if(to.path == '/editPermission'){
                this.init()
             }
           }
      }
    }
</script>

<style scoped>
  .dio{
    margin-top: 50px;
    background-color: #ffffff;
  }
  .dio>>>.el-tree{
   font-size: 18px !important;
  }
  .dio>>>.el-button{
    position: absolute;
    margin-bottom: 0px;
  }
  .el-main{
    height: 650px;
    background-color: #ffffff;
    position: relative;
  }
  .fold{
    left: 20px;
    position: absolute;
    top: 20px;
  }
  .unfold{
    left: 100px;
    position: absolute;
    top: 20px;
  }


  .dio>>>.el-tree-node{
    position: relative;
    padding-left: 15px;
  }
  .dio>>>.el-tree-node__children{
    padding-left: 15px;
  }
  .dio>>>.el-tree-node :last-child:before {
    height: 38px;
  }
  .dio>>>.el-tree>.el-tree-node:before{
    border-left: none;
  }
  .dio>>>.el-tree>.el-tree-node:after{
    border-top: none;
  }
  .dio>>>.el-tree-node:before,.el-tree-node:after{
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
  .dio>>>.tree :first-child .el-tree-node:before{
    border-left: none;
  }
  .dio>>>.el-tree-node:before {
    border-left: 1px dashed #4386c6;
    bottom: 0;
    height: 100%;
    top: -20px;
    width: 1px;
  }
  .dio>>>.el-tree-node:after {
    border-top: 1px dashed #4386c6;
    height: 20px;
    top: 17px;
    width: 24px;
  }
</style>
