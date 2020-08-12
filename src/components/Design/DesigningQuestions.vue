<template>
  <div class="Designing">
    <div style="padding: 0; display: inline;background: transparent">

      <el-card style="margin-bottom: 10px">
        <h1>问卷基础信息</h1>
        <div>
          <el-form>
            <el-form-item>
              <el-input
                label="问卷标题"
                type="text" style="max-width: 80%"
                placeholder="请输入问卷标题"
                v-model="surveyInfo.sTitle"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                label="问卷描述"
                type="textarea" style="max-width: 80%;"
                :autosize="{ minRows: 4, maxRows: 10}"
                placeholder="请输入问卷描述"
                v-model="surveyInfo.sDescription"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-radio-group v-model="surveyInfo.fillType">
            <el-radio :label=0>仅注册用户可填写</el-radio>
            <el-radio :label=1>每天可填写n次</el-radio>
            <el-radio :label=2>总共可填写n次</el-radio>
          </el-radio-group>
          <el-input v-if="surveyInfo.fillType!==0"
                    label="次数n"
                    type="number"
                    min="0"
                    style="max-width: 60%; margin-top: 30px"
                    placeholder="请输入次数n"
                    v-model="surveyInfo.fillnum"
          >
          </el-input>
        </div>
        <div style="margin-top: 30px">
          <span class="demonstration" style="margin-right:30px">结束时间</span>
          <el-date-picker
            v-model="surveyInfo.endtime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-time-picker
            v-model="surveyInfo.endtime"
            placeholder="任意时间点">
          </el-time-picker>
        </div>

      </el-card>
      <!--下面是问题区-->
      <el-card style="position: relative">
        <h1>问卷问题</h1>
        <!--传入q对象，可以在子组件中直接修改-->
        <Question v-for="(q, index) in qList"
                  :key="index"
                  :q-index="index"
                  :q="q"
                  @addQuestion="addQuestion"
                  @clickDelete="deleteQuestion(index)"/>
      </el-card>
      <el-card>
        <el-button type="primary" v-on:click.native="saveSurvey()">保存本问卷</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
  import Question from "@/components/Design/Question";

  export default {
    name: "DesigningQuestions",
    components: {Question},
    data: function () {
      return {
        qList: [],
        surveyInfo: {
          username: this.$store.state.curuser,
          sDescription: "",
          sTitle: "",
          sid: -1,
          fillType: 0,
          fillnum: 1,
          status: 0,
          starttime: new Date(),
          endtime: new Date(),
        },
      }
    },

    methods: {
      deleteQuestion(index) {
        this.qList.splice(index, 1);
        for(let i = index; i < this.qList.length; i++) {
          this.qList[i].qno = i
        }
      },
      addQuestion(qType) {
        const newQuestion = {
          qno: this.qList.length,
          qIsRequired: true,
          qDescription: "",
          qType: qType,
          qOptions: [''],
          maxrate: 5,
        };
        this.qList.push(newQuestion);
      },
      saveSurvey() {
        this.$axios.post("/saveSurvey", {
          surveyInfo: this.surveyInfo,
          qList: this.qList,
        }).then(() => {
          this.$message({message: "问卷已保存！", duration: 1000});
        }).catch(() => {
          this.$message({message: "问卷未保存！", duration: 1000});
        });
        this.$router.push('/list') // 到查看已有问卷页面
      }
    }
  }
</script>

<style scoped>
  .Designing {
    height: 100%;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }


</style>
