<template>
  <div style=" 
              background-size:100% 100%;">
    <el-menu :default-active="route.currentRoute.name" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      style="background-color: transparent;" @select="">
      <el-menu-item style="width: 5vw;margin-left: 10vw">
        <img style="width: 5vw; background-color: transparent ;" alt="图书商城管理端" />
      </el-menu-item>

      <el-menu-item index="0" style="margin-left: 10vw;color: black" @click="jumpPage('GameMode')">工作台</el-menu-item>
      <el-sub-menu index="1" style="margin-left: 3svw;color: black">
        <template #title>图书管理</template>
        <el-menu-item index="1-1" style="color: black" @click="jumpPage('book')">图书详情</el-menu-item>
        <el-menu-item index="1-2" style="color: black" @click="jumpPage('addbook')">添加图书</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="2" style="margin-left: 3svw;color: black" @click="jumpPage('order')">订单管理</el-menu-item>
      <el-menu-item index="3" style="margin-left: 3svw;color: black" @click="jumpPage('RankList')">数据统计</el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="3" v-if="this.store.state.isLogin">
        <template #title>{{ this.store.state.username }}</template>
        <el-menu-item index="2-1" @click="logout">登出</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3" @click="jumpPage('login')" v-else>登录</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { ref, onMounted, reactive } from 'vue'
import { useStore } from "vuex"
import route from '../router/index'
export default {
  setup() {
    const activeIndex = ref('1')
    const store = useStore()
    function logout() {
      store.dispatch("removeToken")
    }
    function jumpPage(page) {
      route.push({ name: page })
    }
    return {
      activeIndex,
      store,
      route,
      logout,
      jumpPage
    }
  }
}


</script>
<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-menu-demo>.el-menu-item {
  border-bottom: none;
  text-decoration: none;
}

.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  color: transparent !important;
  background: transparent !important;
}

.el-menu-item:hover {
  outline: 0 !important;
  color: #7bafe4 !important;
  background: transparent !important;
}

.el-menu-item.is-active {
  color: transparent !important;
  background: transparent !important;
}
</style>