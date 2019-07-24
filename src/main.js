// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false;
//未登录使页面跳转到登录页
router.beforeEach((to,from,next)=>{
  if(!localStorage.getItem('token')&&(to.path!=='/login')){
    next({
      path:"/login"
    })
  }else if(localStorage.getItem('token')&&(to.path == '/login')){
    alert('已经登录过了');
    next({
      path:"/"
    })
  }else {
    next()
  }
});
//element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引用公共css
import "./assets/css/common.css"
//引用公共js
import globalFun from "./assets/js/config.js"
Vue.use(globalFun);
//公共变量存放
import global_ from './components/global/global'
Vue.prototype.GLOBAL = global_;//挂载到Vue实例上面
//echarts
import echarts  from 'echarts'
Vue.prototype.$echarts = echarts;
//axios
import http from "./api/axios";
Vue.prototype.$http = http;
//引入less
let Less = require('Less');
//引入babel-polyfill 解决ie
import  "babel-polyfill"
//引入MD5
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
