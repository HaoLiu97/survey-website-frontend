<template>
  <div class="QuestionsPanel">
    <el-row>
      <el-menu mode="horizontal" style="background: transparent" text-color="black">
        <el-menu-item class="el-menu-item" @click="addQuestion('single_choice')">单选题</el-menu-item>
        <el-menu-item class="el-menu-item" @click="addQuestion('multi_choice')">多选题</el-menu-item>
        <el-menu-item class="el-menu-item" @click="addQuestion('single_text')">单行文本题</el-menu-item>
        <el-menu-item class="el-menu-item" @click="addQuestion('text')">多行文本题</el-menu-item>
        <el-menu-item class="el-menu-item" @click="addQuestion('int')">整数题</el-menu-item>
        <el-menu-item class="el-menu-item" @click="addQuestion('float')">浮点数题</el-menu-item>
        <el-menu-item class="el-menu-item" @click="addQuestion('rate')">评分题</el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'QuestionsPanel',
    data() {
      return {

      };
    },
    methods: {
      addQuestion(qType) {
        this.$emit('addQuestion', qType)
      }
    }
  }

</script>

<style lang="scss">
  .panel {
    margin-top: 0;
    padding-left: 0;
  }

  #nav-fixed {
    background: transparent;
    border: 0;
    border-radius: 10px;
  }
</style>
