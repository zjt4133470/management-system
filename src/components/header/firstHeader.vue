<template>
  <div>
    <h1 @click="goHome">鸠鸠管理系统</h1>
    <div class="right">
      <div class="block">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <el-avatar v-if="imageUrl" :size="40" :src="imageUrl" class="avatar"></el-avatar>
          </el-upload>
      </div>
      <el-dropdown>
          <span class="el-dropdown-link">
            <p style="float:left;margin-left: 10px;color: #fff;cursor: pointer"><span>{{user}}</span></p> <i class="el-icon-caret-bottom caret"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native.prevent="xiuMessage">修改信息</el-dropdown-item>
          <!--<el-dropdown-item>修改密码</el-dropdown-item>-->
          <el-dropdown-item @click.native.prevent="out" divided>退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user:"",
        imageUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    },
    methods: {
      xiuMessage:function () {
        this.$router.push("/information");
      },
      out:function () {
        localStorage.clear();
        window.location.reload()
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      goHome:function () {
        this.$router.push('/homePage')
      }
    },
   created() {
      this.user = localStorage.getItem("UserName");
   },
  }
</script>

<style scoped>
  h1 {
    display: inline-block;
    width: 200px;
    cursor: pointer;
  }

  .right {
    width: 200px;
    float: right;
    display: inline-block;
  }

  .block {
    float: left;
    margin-top: 10px;
    cursor: pointer;
  }
  .caret{
    color: #fff;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
