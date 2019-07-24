<template>
    <div id="login">
      <div class="login_in">
        <h1>鸠鸠管理系统</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
          <el-form-item label="账号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <br>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="loginIn" :loading="loginLoading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
              loginLoading:false,
              ruleForm:{
                phone: '',
                password:''
              },
              rules:{
                phone: [
                  { required: true, message: '请输入账号', trigger: 'blur' },
                  { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
                ],
                password:[
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
              },
            }
        },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.loginLoading = true;
              var data = {
                phone:this.ruleForm.phone,
                password:this.ruleForm.password,
                map:"api_index_login",
                plum_session_api:"",
                time_stamp:Date.parse(new Date())/1000,
              };
              data.sign_str = this.createSign(data);
              this.$http.post('',data).then((data)=>{
                if(data.ec==200){
                  this.loginLoading = false;
                  localStorage.setItem("token",data.data.plum_session_api);
                  localStorage.setItem("UserName",data.data.user_name);
                  var _failureTime=localStorage.getItem("failureTime");
                  if(_failureTime=="" || _failureTime==null || typeof (_failureTime) == 'undefined' ){
                    var time_stamp=new Date().getTime();
                    localStorage.setItem('failureTime',time_stamp)
                  }
                      this.$router.push('/');
                      this.$message.success(data.em);
                }else {
                  this.loginLoading = false;
                  this.$message.error(data.em);
                }
              }).catch((err)=>{
                this.$message.error('登录失败');
              })
            } else {
              this.$message.error('登录失败');
              return false;
            }
          });
        },
      },
    }
</script>

<style scoped>
#login{
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #1f2d3d;
  position: absolute;
}
.login_in{
    width: 400px;
    height: 280px;
    border-radius: 10px;
    padding:25px 35px 25px 15px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
.login_in h1{
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}
.loginIn{
  width: 100%;
}
</style>
