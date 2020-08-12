<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="60px" class="login-box" v-if=!this.$store.state.isLogin>
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="loginForm.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"/>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width:35%;margin-left:5px;margin-top:10px;float:left;" v-on:click="login()">登录</el-button>
        <el-button type="primary" style="width:35%;margin-right:20px;margin-top:10px;float:right;" v-on:click="goRegister()">注册</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="60px" class="login-box" v-else>
      <h3 class="login-title" style="margin-bottom: 20px">用户已登录</h3>
      <h3 class="login-title" style="margin-bottom: 20px">当前用户ID:</h3>
      <h3 class="login-titie" align="center" style="margin-bottom: 20px;color:red">{{this.$store.state.curuser}}</h3>
      <el-button type="primary" style="display:block;margin:20px auto;width:200px;" v-on:click="logout()">注销当前用户</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        }
      }
    },
    methods: {
      login() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$axios
              .post
              ('/login', {
                username: this.loginForm.username,
                password: this.loginForm.password
              })
              .then(successResponse => {
                if (successResponse.data.code === 200) {
                  this.$message({message: "登陆成功！", duration: 1000});
                  this.$store.commit('login', this.loginForm.username)
                } else {
                  this.$message({message: "账号或密码错误！", duration: 1000});
                }
              }).catch(failResponse => {
              this.$message({message: "未知错误！", duration: 1000});
            })
          } else {
            return false
          }
        })
      },
      goRegister() {
        this.$router.push('/register')
      },
      logout() {
        this.$store.commit('logout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
