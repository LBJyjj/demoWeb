import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'


const login = ()=>import('../pages/login/login')
const index = ()=>import('../pages/index/index')
const home = ()=>import('../pages/home/home')
const banner = ()=>import('../pages/banner/banner')
const classify = ()=>import('../pages/classify/classify')
const goods = ()=>import('../pages/goods/goods')
const manger = ()=>import('../pages/manger/manger')
const menu = ()=>import('../pages/menu/menu')
const role = ()=>import('../pages/role/role')
const seckill = ()=>import('../pages/seckill/seckill')
const spec = ()=>import('../pages/spec/spec')
const vip = ()=>import('../pages/vip/vip')

Vue.use(Router)

export const indexRouters = [
  {
    path:'menu',
    component:menu,
    name:'菜单管理'
  },
  {
    path:'role',
    component:role,
    name:'角色管理',
  },
  {
    path:'manger',
    component:manger,
    name:'管理员管理',
  },
  {
    path:'classify',
    component:classify,
    name:'商品分类'
  },
  {
    path:'spec',
    component:spec,
    name:'商品规格'
  },
  {
    path:'goods',
    component:goods,
    name:'商品管理'
  },
  {
    path:'vip',
    component:vip,
    name:'会员管理'
  },
  {
    path:'banner',
    component:banner,
    name:'轮播图管理'
  },
  {
    path:'seckill',
    component:seckill,
    name:'秒杀活动'
  },

]

const router = new Router({
  routes: [
   {
     path:'/login',
     component:login
   },
   {
    path:'/index',
    component:index,
    children:[
      {
        path:'home',
        component:home,
        beforeEnter:(to,from,next)=>{
          console.log(from)
          if(from.path==='/login'&&store.state.user.list){
            next()
          }else{
            next('/login')
          }
        }
      },
      {
        path:'',
        redirect:'home'
      },
      ...indexRouters
    ]
  },
  {
    path:'*',
    redirect:'login'
  }
  ]
})


    router.beforeEach((to, from, next) => {
        if(to.path=='/login'){
          next();
        }

        if(store.state.user.list.menus){
          next();
        }else{
          // this.router.push('/login')
        }
})

export default router
