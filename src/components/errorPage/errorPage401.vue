<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12" style="text-align: center">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <br>
        <h2>你没有权限去该页面</h2>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import errGif from '@/assets/images/401.gif'

  export default {
        data() {
            return {
              errGif: errGif + '?' + +new Date(),
            }
        },
        methods: {
          back() {
            this.$router.go(-1)
          }
        },
    }
</script>

<style lang="less" scoped>
  .errPage-container {
    background-color: #fff;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
