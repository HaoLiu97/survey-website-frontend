<template>
  <div>
    <h1>当前问卷ID：{{this.$route.params.sid}}</h1>
    <h1>您的IP地址：{{this.IP}}</h1>
    <h1>您的所在位置：{{this.location}}</h1>
    <el-card shadow="always" class="box-card">
      <div>
        <h1>{{this.surveyInfo.sTitle}}</h1>
        <h3>{{this.surveyInfo.sDescription}}</h3>
      </div>
    </el-card>

    <el-form v-if="this.fillable===true">
      <div v-for="(item,index) in qList" :key="index">
        <el-card>

          <el-form-item>
            <h3 style="margin-top: 0;padding-left: 100px;text-align: left;">{{index+1}}.{{item.qDescription}}</h3>
            <h3 v-if="item.qIsRequired===false">
              （选填）
            </h3>
          </el-form-item>

          <el-form-item>
            <el-radio-group v-if="item.qType==='single_choice'"
                            v-model="aList[index].aOption">
              <el-radio v-for="(oItem,oIndex) in item.qOptions" :key="oIndex"
                        :label=oIndex>{{oItem}}
              </el-radio>
            </el-radio-group>

            <el-checkbox-group v-else-if="item.qType==='multi_choice'"
                               v-model="aList[index].aOptions">
              <el-checkbox v-for="(oItem,oIndex) in item.qOptions" :key="oIndex"
                           :label=oIndex>{{oItem}}
              </el-checkbox>
            </el-checkbox-group>

            <el-input v-else-if="item.qType==='single_text'"
                      type="text" style="max-width: 80%"
                      placeholder="请输入单行文本"
                      v-model="aList[index].aText"
            ></el-input>

            <el-input v-else-if="item.qType==='text'"
                      type="textarea" style="max-width: 80%"
                      :autosize="{ minRows: 3}"
                      placeholder="请输入文本"
                      v-model="aList[index].aText"
            ></el-input>

            <el-input v-else-if="item.qType==='int'"
                      type="number"
                      style="max-width: 200px"
                      placeholder="请输入整数"
                      step="1"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                      v-model="aList[index].aInt"
            ></el-input>

            <el-input v-else-if="item.qType==='float'"
                      type="number"
                      style="max-width: 200px"
                      placeholder="请输入浮点数"
                      step="1"
                      v-model="aList[index].aFloat"
            ></el-input>

            <el-slider
              v-else-if="item.qType==='rate'"
              :max="item.maxrate"
              v-model="aList[index].aRate"
              :step="1"
              show-input
            >
            </el-slider>


          </el-form-item>
        </el-card>
      </div>


      <el-form-item>
        <el-card class="box-card" style="width: 100%">
          <div>
            <el-button type="primary" @click="submitAnswer">提 交</el-button>
          </div>
        </el-card>
      </el-form-item>
    </el-form>
    <h1 v-else>您不能填写当前问卷！</h1>
  </div>
</template>

<script>
  export default {
    name: "FillPage",
    methods: {
      initIP() {
        this.$axios.get('http://ip-api.com/json/?lang=zh-CN') .then(successRepsonse=> {
          this.IP = JSON.parse(JSON.stringify(successRepsonse.data))['query']
          this.fillable = this.judgeFillable()
          this.location = JSON.parse(JSON.stringify(successRepsonse.data))['regionName']
        }).catch(failResponse => {
          this.$message({message: "查询IP失败！", duration: 1000});
        })
      },
      judgeFillable() {
        return this.$axios.post('/canAnswer', {
          sid: this.$route.params.sid,
          IP: this.IP,
          username: this.$store.state.curuser
        }) .then(successResponse=> {
          if(successResponse.data.code === 200) {
            return true
          } else if(successResponse.data.code === 400){
            return false
          }
        }).catch(failResponse => {
          this.$message({message: "判断是否可填写失败！", duration: 1000});
        })
      },
      initSurveyInfo() {
        this.$axios.post('/getSurveyInfo?sid=' + this.$route.params.sid)
          .then(successResponse => {
            this.surveyInfo = JSON.parse(JSON.stringify(successResponse.data))
          }).catch(failResponse => {
          this.$message({message: "加载问卷信息失败！", duration: 1000});
        })
      },
      initQuestions() {
        this.$axios.post('/getQList?sid=' + this.$route.params.sid)
          .then(successResponse => {
            this.qList = JSON.parse(JSON.stringify(successResponse.data))
            for (let i = 0; i < this.qList.length; i++) {
              this.qList[i].qOptions = JSON.parse(this.qList[i].qOptions)
              this.aList.push({
                sid: this.$route.params.sid,
                qno: this.qList[i].qno,
                qType: this.qList[i].qType,
                aOption: 0,
                aOptions: [],
                aRate: 0,
                aFloat: 0,
                aInt: 0,
                aText: ''
              })
            }
          }).catch(failResponse => {
          this.$message({message: "加载问题失败！", duration: 1000});
        })
      }
      ,
      submitAnswer() {
        this.$axios.post('/submitAnswers', {
          sid: this.$route.params.sid,
          username: this.$store.state.curuser,
          IP: this.IP,
          aList: this.aList
        }).then(successResponse => {
          this.$message({message: "问卷提交成功！", duration: 1000});
          this.$route.push('/fill')
        }).catch(failResponse => {
          this.$message({message: "提交答案失败！", duration: 1000});
        })
      }
    },
    data() {
      return {
        IP: '',
        location: '',
        fillable: true,
        surveyInfo: {
          "sid": 0,
          "username": "",
          "sDescription": "",
          "sTitle": "",
          "starttime": "",
          "endtime": "",
          "status": 0,
          "fillType": 0,
          "fillnum": 0,
          "fillCount": 0
        },
        qList: [],
        aList: []
      };
    },
    created() {
      // js中默认执行网络请求是异步的，他们会按顺序发出请求之后就不管了，谁先返回是不确定的
      this.initIP();
      this.initSurveyInfo();
      this.initQuestions();
    }
  }
</script>

<style scoped>

</style>
