<template>
  <div id="app">
    <el-container>
      <el-aside width=200px>
        <Sidebar/>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
        <!--<el-footer>-->
          <!--<Footer/>-->
        <!--</el-footer>-->
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Sidebar from '@/views/Sidebar'
  import Header from '@/views/Header'
  import Footer from '@/views/Footer'

  export default {
    name: 'App',
    components: {Sidebar, Footer, Header}
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
    width: 100%;
  }

  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    height: 100%;
  }

  .el-main {
    margin-top: 0;
    overflow: auto;
    background-color: rgba(128, 128, 128, 0.05);
  }


  .el-footer {
    height: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 0px;
  }

  .el-container {
    height: 100%;
  }

</style>
