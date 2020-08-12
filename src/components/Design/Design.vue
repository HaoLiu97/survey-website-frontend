<template>
  <div>
    <el-container>
      <el-header class="header">
        <QuestionsPanel
          @addQuestion="addQuestion"
        />
      </el-header>
      <el-main class = "questions">
        <DesigningQuestions ref="designingQuestions"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import QuestionsPanel from "@/components/Design/QuestionsPanel";
  import DesigningQuestions from "@/components/Design/DesigningQuestions"
  // 这一页有两个组件，分别用于选择项目和查看已有的题目
  export default {
    name: 'Design',
    components: {QuestionsPanel, DesigningQuestions},
    methods: {
      addQuestion(qType) {
        this.$refs.designingQuestions.addQuestion(qType)
      }
    }
  }
</script>

<style scoped>
  .questions{
    background: transparent;
    position: absolute;
    left: 200px;
    right: 0;
    top: 70px;
    bottom: -10px;
    overflow-y: scroll;
  }

  .header {
    position: relative;
    width: 100%;
    top: -20px;
  }

</style>
