<template>
    <div class="scroll">
      <el-row class="tac" style="width: 200px">
        <el-col style="width: 200px">
          <el-menu router :default-active="defaultActive" @select="skip"  background-color="rgb(50, 64, 87)" text-color="#fff" active-text-color="#347ffe">
                <!--<div  v-for="(item,index) in list" :key="index" v-if="list">-->
                    <!--<el-menu-item v-if="item.second == 0" :index="item.indexs" :route="item.indexs">-->
                      <!--<i :class="item.i"></i>-->
                      <!--<span slot="title">{{item.name}}</span>-->
                    <!--</el-menu-item>-->
                  <!--<el-submenu :index="item.indexs" :route="item.indexs" v-else>-->
                    <!--<template slot="title">-->
                      <!--<i :class="item.i"></i>-->
                      <!--<span>{{item.name}}</span>-->
                    <!--</template>-->
                    <!--<el-menu-item v-for="(item2,index2) in item.second" :index="item2.indexs" :route="item2.indexs" :key="index2">{{item2.name}}</el-menu-item>-->
                  <!--</el-submenu>-->
                <!--</div>-->
            <div  v-for="(item,index) in list" :key="index" v-if="list">
              <el-menu-item v-if="!item.submenu" :index="'/'+item.access" :route="'/'+item.access">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
              <el-submenu :index="'/'+item.access" :route="'/'+item.access" v-else>
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for="(item2,index2) in item.submenu" :index="'/'+item2.access" :route="'/'+item2.access" :key="index2">{{item2.title}}</el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              defaultActive:this.$route.path,
              list:[],
              // openeds:['systemMangement','userStatistics']
            }
        },
      props:{
        lists:Array,
        required:true
      },
      watch:{
        $route(to,from){
          this.defaultActive = to.path;
        },
        lists(val) {
          this.list = val
        }
      },
      methods: {
          skip:function (index) {

          }
        },
    }
</script>

<style scoped>
  .scroll{
    width: 200px;
    overflow-y: scroll;
    height: 100%;
  }
  .scroll>>>.el-menu-item{
    background-color:rgb(50, 64, 87)!important;
  }
  .scroll>>>.el-menu-item:hover{
    background-color: rgba(30, 47, 76, 0.92) !important;
    cursor: pointer;
  }
  .scroll>>>.el-submenu__title:hover{
    background-color: rgba(30, 47, 76, 0.92) !important;
    cursor: pointer;
  }
  /*改变滚动条样式*/
  ::-webkit-scrollbar{
    width: 1px;
    height: 1px;
    background-color: rgb(50, 64, 87);
  }
  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 1px;
    background-color: rgb(50, 64, 87);
  }

</style>
