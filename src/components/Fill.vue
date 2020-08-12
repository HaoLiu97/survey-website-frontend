<template>
  <div>
    <!--已经有了要填写的问卷-->
    <el-form ref="fillForm" :model="fillForm" :rules="rules" label-width="60px" class="fill-box" v-if="this.$store.state.cursid>-1">

    </el-form>
    <el-form ref="fillForm" :model="fillForm" :rules="rules" label-width="60px" class="fill-box">
      <h3 class="fill-title" style="margin-bottom: 20px">请输入要回答的问卷ID</h3>
      <el-form-item label="问卷ID" label-width="80px" prop="sid">
        <el-input type="number" min="0" placeholder="请输入问卷ID" v-model="fillForm.sid"/>
      </el-form-item>
      <el-button type="primary" style="display:block;margin:20px auto;width:200px;" v-on:click="goAnswwer()">回答问卷</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Fill',
    data() {
      return {
        fillForm: {
          sid: 0,
        },
        rules: {
          sid: [{required: true, message: '请输入问卷id', trigger: 'blur'},
            {type: 'numeric', message: '请输入数字', trigger: 'blur'}],
        }
      }
    },
    methods: {
      fill() {
        this.$refs.fillForm.validate((valid) => {
          if (valid) {
            this.$axios
              .post
              ('/fill', {

              })
              .then(successResponse => {
                if (successResponse.data.code === 200) {
                } else {
                }
              }).catch(failResponse => {
              alert('未知错误！')
            })
          } else {
            return false
          }
        })
      },
      goAnswwer() {
        this.$router.push('/fillpage/'+this.fillForm.sid)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fill-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .fill-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
