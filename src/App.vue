<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>
<script>

export default {

}
</script>

<style lang="less">
body{
  padding: 0;
  margin: 0;
  .app{
      background: url("./assets/background/bgc2.png") no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: fixed;
  }
}
</style>
