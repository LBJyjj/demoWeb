<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/index/home"
          router
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in list.menus" :key='item.id'>
          <el-submenu index="item.url" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
            <el-menu-item v-for="i in item.children" :key="i.id" :index="'/index'+i.url">{{i.title}}</el-menu-item>
            <!-- <el-menu-item index="/index/role">角色管理</el-menu-item>
            <el-menu-item index="/index/manger">管理员管理</el-menu-item> -->
             </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
<!-- 
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商城管理</span>
            </template>

            <el-menu-item index="/index/classify">商品分类</el-menu-item>
            <el-menu-item index="/index/spec">商品规格</el-menu-item>

            <el-menu-item index="/index/goods">商品管理</el-menu-item>
            <el-menu-item index="/index/vip">会员管理</el-menu-item>
            <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
          </el-submenu> -->
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header><el-button type="danger" class="float box" @click="quit">退出</el-button><div class="float">{{list.username}}</div></el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="mTop">
               <router-view></router-view>
          </div>
        
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed:{
      ...mapGetters({
        list:'user/list'
      })
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestUserList:'user/requestUserList'
    }),
    quit(){
      this.requestUserList({})
      this.$router.push('/login')
    }
  },
  mounted() {
   
  },
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #20222a;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.mTop {
    margin-top: 20px;
}
.float {
  float: right;
  margin-right: 20px;
}
.box{
  margin-top: 10px;
}
</style>