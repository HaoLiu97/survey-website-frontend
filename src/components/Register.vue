<template>
  <div>
    <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="80px" class="register-box">
      <h3 class="register-title">欢迎注册</h3>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="registerForm.email"/>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="registerForm.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="registerForm.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="register()">注册</el-button>
        <el-button type="primary" v-on:click="goLogin()">返回登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        registerForm: {
          email: '',
          username: '',
          password: ''
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '密码长度至少为6个字符'}],
          email: [{
            required: true,//是否必填
            message: '请输入邮箱地址',//错误提示信息
            trigger: 'blur'//检验方式（blur为鼠标点击其他地方，）
          },
            {
              type: 'email',//要检验的类型（number，email，date等）
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ]
        }
      }
    },
    methods: {
      register () {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.$axios
              .post('/register', {
                email: this.registerForm.email,
                username: this.registerForm.username,
                password: this.registerForm.password
              })
              .then(successResponse => {
                if (successResponse.data.code === 200) {
                  this.$message({message: "注册成功，请登录！", duration: 1000});
                  this.$router.push({path: '/login'})
                } else if (successResponse.data.code === 400) {
                  this.$message({message: "注册失败！请保证用户名和邮箱唯一！", duration: 1000});
                }
              })
              .catch(failResponse => {
                this.$message({message: "未知错误！", duration: 1000});
              })
          } else {
            return false
          }
        })
      }
      ,
      goLogin () {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .register-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .register-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
