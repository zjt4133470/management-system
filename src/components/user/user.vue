<template>
    <div class="dio">
      <el-container>
        <el-header>×××统计表</el-header>
        <el-main>
          <table-main></table-main>
        </el-main>
      </el-container>
    </div>
</template>

<script>
  import tableMain from './tableMain'
    export default {
        data() {
            return{

            }
        },
        methods: {

        },

        components: {
          tableMain
        }
    }
</script>

<style scoped>
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    min-height: 715px;
  }
</style>
