<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed=""
      prop="sTitle"
      label="标题"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sid"
      label="问卷id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="starttime"
      label="创建时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="endtime"
      label="结束时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="sDescription"
      label="描述"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="120">
      <template slot-scope="scope">
        {{getStatus(scope.row["status"])}}
      </template>
    </el-table-column>
    <el-table-column
      prop="fillCount"
      label="收集数量"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope1">
        <el-button @click='getStat(scope1.row["sid"])' type="text" size="small">查看统计</el-button>
        <el-button type="text" @click='deleteSurvey(scope1.row["sid"])' size="small">删除</el-button>
        <el-button type="text" v-if='scope1.row["status"]===0' @click='releaseSurvey(scope1.row["sid"])' size="small">发布</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'List',
    methods: {
      getStat(sid) {
        this.$router.push('/statpage/'+sid)
      },
      getStatus(status) {
        if(status===0) {
          return '未发布'
        } else if(status===1) {
          return '已发布'
        } else {
          return '已结束收集'
        }
      },
      releaseSurvey(sid) {
        this.$axios.post('/releaseSurvey?sid'+'='+sid)
          .then(successResponse => {
            this.$message({message: "发布问卷" + sid, duration: 1000});
            this.initSurveys()
          }).catch(failResponse => {
          this.$message({message: "发布问卷失败！", duration: 1000});
        })
      },
      deleteSurvey(sid) {
        this.$axios.post('/deleteSurvey?sid'+'='+sid)
          .then(successResponse => {
            this.$message({message: "删除问卷" + sid, duration: 1000});
            this.initSurveys()
          }).catch(failResponse => {
          this.$message({message: "删除问卷失败！", duration: 1000});
        })
      },
      initSurveys() {
        this.$axios.post('/getSurveys?username'+'='+this.$store.state.curuser )
          .then(successResponse => {
            this.tableData =  JSON.parse(JSON.stringify(successResponse.data))
          }).catch(failResponse => {
          this.$message({message: "加载信息失败！", duration: 1000});
        })
      }

    },

    data() {
      return {
        tableData:[ ]
      }
    },
    computed() {

    },
    created() {
      this.initSurveys()
    }
  }
</script>
