<template>
    <div>
      <el-row :gutter="24">
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
            <div style="background-color: #ffffff" class="weather">
              <iframe id="weather_inc" name="weather_inc" src="https://i.tianqi.com/index.php?c=code&id=55&py=zhengzhou" width="350" height="330" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
            </div>
        </el-col>
        <!--<el-col :span="12">-->
          <!--<el-image-->
            <!--:src="url"-->
            <!--fit="fill"></el-image>-->
        <!--</el-col>-->
      </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              url:'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
            }
        },
        methods: {},

        components: {}
    }
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #ffffff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 50px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .weather{
    position: absolute;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
