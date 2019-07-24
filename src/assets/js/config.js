exports.install = function (Vue) {
  Vue.prototype.text1 = function () {//全局函数1
    alert('执行成功1');
  };
  //转化年月日
  Vue.prototype.dateTimeManage = function (date) {
    if (isNaN(date)) return date;
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  };
  //生成签名
  Vue.prototype.createSign = function (data) {
      var keys=[],sign_,$salt="%$#@txg_bi@#$%",signstr,$sign;
      for(var key in data){
        keys.push(key+'='+data[key]);
      }
      keys.sort();
      sign_=keys.join('&');
      signstr = this.$md5($salt+this.$md5(sign_)+$salt);
      $sign = signstr.substr(0, 4)+signstr.substr(-5, 5);
      return $sign
  };
//  按钮权限
  Vue.prototype.buttonPermissions = function () {
    var data_ ='';
    var data = {
      map:"api_user_menu",
      plum_session_api:localStorage.getItem('token'),
      time_stamp:Date.parse(new Date())/1000,
    };
    data.sign_str = this.createSign(data);
    return this.$http.post('',data).then((data)=>{
      if(data.ec==200){
        return data_=data.data.button_menu;
      }else {
        this.$message.error(data.em);
      }
    }).catch((err)=>{
      this.$message.error('获取按钮权限失败');
    });
  };
};
