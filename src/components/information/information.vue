<template>
    <div class="Diod">
      <el-row>
        <!--<el-col :span="8"><div class="grid-content bg-purple">-->
          <!--<information-from></information-from>-->
        <!--</div></el-col>-->
        <!--<el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>-->
        <!--<el-col :span="8"><div class="grid-content bg-purple"></div></el-col>-->
        <error-page></error-page>
      </el-row>
    </div>
</template>

<script>
  import informationFrom from './informationFrom'
  import errorPage from '../errorPage/errorPage401'
    export default {
        data() {
            return {}
        },
        methods: {},

        components: {
          informationFrom,
          errorPage
        }
    }
</script>

<style scoped>
  .Diod>>>.el-row {
    margin-bottom: 20px;

  }
  .Diod>>>.el-col {
    border-radius: 4px;

  }
  .Diod>>>.grid-content{
    width: 80%;
    margin-left: 10%;
    border-radius:4px;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
  }
</style>
