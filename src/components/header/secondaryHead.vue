<template>
  <div>
    <el-breadcrumb separator="/" style="height: 30px;line-height: 30px">
      <!--<el-breadcrumb-item :to="{path:pageNamePath}">{{pageName}}</el-breadcrumb-item>-->
      <el-breadcrumb-item>{{pageName}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="show">{{pageNames}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        pageName:"",
        pageNames:"",
        pageNamePath:"",
        show:false,
        list:[]
      }
    },
    props:{
      lists:Array,
      required:true
    },
    watch:{
      $route(to,from){
        switch (to.name) {
          case "homePage":
            localStorage.setItem("pageName","首页");
            localStorage.setItem("showBool",'');
            this.pageName = localStorage.getItem('pageName');
            this.show = localStorage.getItem('showBool');
            break;
          case "user":
            localStorage.setItem("pageName","用户管理");
            this.pageName = localStorage.getItem('pageName');
            this.show = false;
            break;
          case "share_one":
            this.pageNames = "分享1";
            this.pageName = "分享功能";
            this.show = true;
            break;
          case "share_two":
            this.pageNames = "分享2";
            this.pageName = "分享功能";
            this.show = true;
            break;
          case "information":
            this.pageName = "信息管理";
            this.show = false;
            break;
          case "jurisdiction":
            this.pageName = "权限管理";
            this.show = false;
            break;
          case "systemUser":
            localStorage.setItem("pageName","系统管理");
            localStorage.setItem("pageNames","系统用户");
            localStorage.setItem("showBool",'1');
            this.pageName = localStorage.getItem('pageName');
            this.pageNames = localStorage.getItem('pageNames');
            this.show = localStorage.getItem('showBool');
            break;
          case "userGroup":
            localStorage.setItem("pageName","系统管理");
            localStorage.setItem("pageNames","用户分组");
            localStorage.setItem("showBool",'1');
            this.pageName = localStorage.getItem('pageName');
            this.pageNames = localStorage.getItem('pageNames');
            this.show = localStorage.getItem('showBool');
            break;
            case "editPermission":
            localStorage.setItem("pageName","系统管理");
            localStorage.setItem("pageNames","小组权限");
            localStorage.setItem("showBool",'1');
            this.pageName = localStorage.getItem('pageName');
            this.pageNames = localStorage.getItem('pageNames');
            this.show = localStorage.getItem('showBool');
            break;
          case "userGrowth":
            localStorage.setItem("pageName","鸠鸠用户统计");
            localStorage.setItem("pageNames","用户增长");
            localStorage.setItem("showBool",'1');
            this.pageName = localStorage.getItem('pageName');
            this.pageNames = localStorage.getItem('pageNames');
            this.show = localStorage.getItem('showBool');
            break;
          case "userDayLive":
            localStorage.setItem("pageName","鸠鸠用户统计");
            localStorage.setItem("pageNames","用户日活");
            localStorage.setItem("showBool",'1');
            this.pageName = localStorage.getItem('pageName');
            this.pageNames = localStorage.getItem('pageNames');
            this.show = localStorage.getItem('showBool');
            break;
        }
        this.pageNamePath = to.path;
      }
    },
    created(){
      var _confirm = localStorage.getItem('pageName');
      if(_confirm=="" ||_confirm==null || typeof (_confirm) == 'undefined' ){
        localStorage.setItem("pageName","首页");
      }
    },
    mounted() {
      this.pageName = localStorage.getItem('pageName');
      this.pageNames = localStorage.getItem('pageNames');
      this.show = localStorage.getItem('showBool');
    }
  }
</script>

<style scoped>

</style>
