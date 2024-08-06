<template>
  <div id="APP">
    <Nav />
    <router-view> </router-view>

  </div>
</template>
<script>
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  components: {
    Nav
  }
}


</script>


<style>
body {
  margin: 0px;
  
  background-size: 100% 100%;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
