<template>
  <div>
    <h1>问卷ID：{{this.$route.params.sid}}的统计信息</h1>
    <el-card shadow="always" class="box-card">
      <div>
        <h1>{{this.surveyInfo.sTitle}}</h1>
        <h3>{{this.surveyInfo.sDescription}}</h3>
        <h3>共收集了{{this.surveyInfo.fillCount}}份答案</h3>
      </div>
    </el-card>

    <div v-for="(item, index) in qList" :key="index">
      <el-card>
        <StatQuestion :qno="index" :sid="surveyInfo.sid" :q-info="item">
        </StatQuestion>
      </el-card>
    </div>
  </div>
</template>

<script>
  import StatQuestion from "@/components/StatQuestion";
  export default {
    name: "StatPage",
    components: {StatQuestion},
    data() {
      return {
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
    methods: {
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
    },
    created() {
      this.initSurveyInfo();
      this.initQuestions();
    }
  }
</script>

<style scoped>

</style>
