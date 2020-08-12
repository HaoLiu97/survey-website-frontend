<template>
  <div style="position: relative;">
    <el-card class="box-card" shadow="hover" :body-style="{ padding: '0' }">
      <div class="box">
        <!--题号-->
        <div class="question-index">{{q.qno+1}}.{{q.qType}}</div>
        <el-form>
          <el-form-item label="题干：">
            <el-input type="text" size="medium"
                      class="description-div"
                      v-model="q.qDescription"
                      placeholder="请输入题干"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否必填：">
            <el-select placeholder="是否必填" v-model="q.qIsRequired">
              <el-option :value=true ></el-option>
              <el-option :value=false ></el-option>
            </el-select>
          </el-form-item>

          <div v-if="q.qType==='single_choice'||q.qType==='multi_choice'">
            <el-form-item v-for="(item, index) in q.qOptions" :key="index">
              <el-input v-model="q.qOptions[index]" style="max-width: 200px"></el-input>

              <el-button size="medium" class="add-option-button"
                         @click="addOption">添加选项
              </el-button>

              <el-button size="medium" class="delete-option-button"
                         @click="deleteOption(index)"
              >删除选项
              </el-button>
            </el-form-item>
          </div>

          <div v-if="q.qType==='rate'">
            <el-form-item>
              最大分数：
              <el-input-number v-model="q.maxrate"></el-input-number>
            </el-form-item>
          </div>

        </el-form>
      </div>


      <el-button class="delete-button" type="danger"
                 @click="clickDelete"
      >删除本题
      </el-button>


    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Question",
    props: {
      qIndex : Number,
      q: {
        qno: Number,
        qIsRequired: Boolean,
        qType: String,
        qDescription: String,
        qOptions: Array,
        maxrate: Number
      }
    },
    methods: {
      clickDelete() {
        this.$emit('clickDelete',this.qIndex);
      },
      addOption() {
        this.q.qOptions.push('');
      },
      deleteOption(index) {
        if (this.q.qOptions.length >= 2) {
          this.$message({message: "删除", duration: 1000});
          this.q.qOptions.splice(index, 1);
        } else {
          this.$message({message: "请至少保留一个选项", duration: 1000});
        }
      }
    },

    data: function () {
      return {
        qTypes: [
          {
            value: 'single_choice',
            label: '单选'
          }, {
            value: 'multi_choice',
            label: '多选'
          }, {
            value: 'single_text',
            label: '单行文本'
          }, {
            value: 'multi_line_text',
            label: '多行文本'
          }, {
            value: 'int',
            label: '整数'
          }, {
            value: 'float',
            label: '浮点数'
          },
          {
            value: 'rate',
            label: '评分'
          }],
      }
    }
  }
</script>

<style scoped>
  .delete-button {
    position: absolute;
    right: 10%;
    top: 30px;
  }

  .question-index {
    margin-bottom: 20px;
  }

  .box-card {
    transition: all ease 300ms;
  }

  .delete-button {
    position: absolute;
  }

  .box {
    text-align: left;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 20%;
  }


  .add-option-button {
    margin-left: 10px;
  }

  .description-div {
    max-width: 60%;
  }
</style>
