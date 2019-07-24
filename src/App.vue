<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function () {
    window.onbeforeunload = function (e) {
      var _failureTime=localStorage.getItem("failureTime");
      var times = new Date().getTime();
      if(times-_failureTime > 86400000){
        this.$message.error("登录失效");
        localStorage.clear();
      }
    };
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
