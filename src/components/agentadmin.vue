<template>
    <div>
      <el-container style="height: 100%">
        <el-header>
            <first-header></first-header>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <Aside :lists="lists"
                   v-loading="loading"
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(50, 64, 87, 0.8)"
            ></Aside>
          </el-aside>
          <el-main>
            <el-container>
              <el-header style="height: 30px;background-color: #ffffff;color: #000000;line-height: 30px">
                <secondary-head :lists="lists"></secondary-head>
              </el-header>
              <el-main style="left: 0;top: 30px">

                <transition name="page-switching" mode="out-in">
                  <keep-alive>  <!--确保上次操作的dom跳转页面后不刷新-->
                    <router-view></router-view>
                  </keep-alive>
                </transition>

              </el-main>
            </el-container>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  import Aside from "./Aside"
  import secondaryHead from "./header/secondaryHead"
  import firstHeader from "./header/firstHeader"
    export default {
        data() {
            return {
              lists:[],
              loading:true
            }
        },
      created() {
        var data = {
          map:"api_user_menu",
          plum_session_api:localStorage.getItem('token'),
          time_stamp:Date.parse(new Date())/1000,
        };
        data.sign_str = this.createSign(data);
        this.$http.post('',data).then((data)=>{
          if(data.ec==200){
            this.lists = data.data.menu;
            this.loading = false
            // var list=[{
            //   name:"首页",
            //   indexs:"/homePage",
            //   i:"el-icon-platform-eleme",
            //   second:[]
            // },
            //   {
            //     name:"鸠鸠用户统计",
            //     indexs:"/userStatistics",
            //     i:"el-icon-user",
            //     second:[{
            //       indexs:"/userGrowth",
            //       name:"用户增长"
            //     }]
            //   },
            //   // {
            //   //   name:"用户管理",
            //   //   indexs:"/user",
            //   //   i:"el-icon-user",
            //   //   second:[]
            //   // },
            //   // {
            //   //   name:"分享功能",
            //   //   indexs:"/share",
            //   //   i:"el-icon-position",
            //   //   second:[{
            //   //     indexs:"/share_one",
            //   //     name:"分享1"
            //   //   },{
            //   //     indexs:"/share_two",
            //   //     name:"分享2"
            //   //   }]
            //   // },
            //   // {
            //   //   name:"信息管理",
            //   //   indexs:"/information",
            //   //   i:"el-icon-star-on",
            //   //   second:[]
            //   // },
            //   // {
            //   //   name:"权限管理",
            //   //   indexs:"/jurisdiction",
            //   //   i:"el-icon-setting",
            //   //   second:[]
            //   // },
            //   {
            //     name:"系统管理",
            //     indexs:"/systemMangement",
            //     i:"el-icon-setting",
            //     second:[{
            //       indexs:"/systemUser",
            //       name:"系统用户"
            //     },{
            //       indexs:"/userGroup",
            //       name:"用户分组"
            //     }]
            //   }];
            // this.lists = list
          }else {
            this.$message.error(data.em);
          }
        }).catch((err)=>{
          this.$message.error('获取用户信息失败');
        });
      },
        components: {
          Aside,
          secondaryHead,
          firstHeader
        },
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #F56C6C;
    color: #ffffff;
    line-height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  .el-aside {
    color: #ffffff;
    background-color: rgb(50, 64, 87);
    border: none;
    list-style: none;
    height: 100%;
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  .el-main {
    bottom: 0;
    left: 200px;
    position: absolute;
    right: 0;
    top: 60px;
    background-color: #E9EEF3;
    color: #333;
  }
  .page-switching-enter-active, .page-switching-leave-active {
    transition: opacity .38s
  }
  .page-switching-enter, .page-switching-leave-active{
    opacity: 0
  }
  /*改变导航栏样式*/
  ::-webkit-scrollbar{
    width: 1px;
    height: 1px;
    background-color:#E9EEF3;
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 1px;
    background-color:#E9EEF3;
  }
</style>
