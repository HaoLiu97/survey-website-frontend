<template>
  <el-col :span="24">
    <h5 style="margin-left: 30px;">欢迎使用问卷网站</h5>
    <el-menu  class="el-menu-vertical-demo" router = true>
      <el-menu-item index="/login">
        <i class="el-icon-menu"></i>
        <span slot="title">登录页面</span>
      </el-menu-item>
        <el-menu-item index="/design" v-if=this.$store.state.isLogin>
          <i class="el-icon-menu"></i>
          <span slot="title" >设计新问卷</span>
        </el-menu-item>
        <el-menu-item index="/list" v-if=this.$store.state.isLogin>
          <i class="el-icon-menu"></i>
          <span slot="title">查看已有问卷</span>
        </el-menu-item>
      <el-menu-item index="/fill">
        <i class="el-icon-menu"></i>
        <span slot="title">回答问卷</span>
      </el-menu-item>
      </el-menu>
    </el-col>
</template>

<script>
  export default {
    methods: {

    }
  }
</script>

<style lang="scss">
  .el-col {
    margin-top: 0px;
    min-height: 200px;
  }
</style>
