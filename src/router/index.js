import Vue from 'vue'
import Router from 'vue-router'
//主题
import agentadmin from '@/components/agentadmin'
//首页
import homePage from '@/components/homePage/homePage'
//用户管理
import user from '@/components/user/user'
//分享页面
import share_one from '@/components/share/share_one'
import share_two from '@/components/share/share_two'
//信息管理页面
import information from '@/components/information/information'
//登陆页面
import login from '@/components/login/login'
//错误页面
import errorPage401 from '@/components/errorPage/errorPage401'
import errorPage404 from '@/components/errorPage/errorPage404'
//权限页面
import jurisdiction from '@/components/jurisdiction/jurisdiction'
//系统管理
import systemUser from '@/components/systemManagement/systemUser'
import userGroup from '@/components/systemManagement/userGroup'
import editPermission from '@/components/systemManagement/editPermission'
//鸠鸠用户统计
import userGrowth from '@/components/userStatistics/userGrowth'
import userDayLive from '@/components/userStatistics/userDayLive'
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'agentadmin',
      redirect:'/homePage',
      component: agentadmin,
      children:[{
        path: 'homePage',
        name: 'homePage',
        component: homePage,
      },{
        path: 'user',
        name: 'user',
        component: user,
      },{
        path: 'share_one',
        name: 'share_one',
        component: share_one,
      },{
        path: 'share_two',
        name: 'share_two',
        component: share_two,
      },{
        path: 'information',
        name: 'information',
        component: information,
      },{
        path: 'jurisdiction',
        name: 'jurisdiction',
        component: jurisdiction,
      },{
        path: 'systemUser',
        name: 'systemUser',
        component: systemUser,
      },{
        path: 'userGroup',
        name: 'userGroup',
        component: userGroup,
      },{
        path: 'editPermission',
        name: 'editPermission',
        component: editPermission,
      },{
        path: 'userGrowth',
        name: 'userGrowth',
        component: userGrowth,
      },{
        path: 'userDayLive',
        name: 'userDayLive',
        component: userDayLive,
      }
      ]
    },{
      path: '/login',
      name: 'login',
      component: login,
    },{
      path: '/errorPage401',
      name: 'errorPage401',
      component: errorPage401,
    },{
      path: '/errorPage404',
      name: 'errorPage404',
      component: errorPage404,
    },{
      path: '*',
      redirect:'/errorPage404',
    }
  ]
})
