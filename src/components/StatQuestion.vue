<template>
  <div>
    <h3 style="margin-top: 0;padding-left: 100px;text-align: left;">{{this.qno+1}}.{{qInfo.qDescription}}</h3>
    <h3 style="margin-top: 0;padding-left: 100px;text-align: left;" v-if="this.qInfo.qIsRequired===false">（选填）</h3>
    <div :id="this.bid" style="height: 350px" v-if="qInfo.qType === 'single_choice'||qInfo.qType==='multi_choice'"></div>
    <div v-else-if="qInfo.qType==='text'||qInfo.qType==='single_text'"></div>
    <h3 v-else>平均值：{{this.average}}</h3>

  </div>
</template>

<script>
  import echarts from "echarts/lib/echarts"
  import "echarts/lib/chart/bar"
  import "echarts/lib/chart/pie"
  import "echarts/lib/component/tooltip"

  export default {
    name: "StatQuestion",
    props: {
      qno: Number,
      sid: Number,
      qInfo: {
        qDescription: String,
        qType: String,
        qOptions: Array
      }
    },
    created() {
      this.bid = 'barchart'+this.qno
    },
    mounted() {
      this.getData()
    },
    data: function () {
      return {
        bid: '',
        average: 0,
        optionNumber: [],
      }
    },
    methods: {
        getData() {
          this.$axios.post('/getStat',{
            sid: this.sid,
            qno: this.qno,
            qType: this.qInfo.qType
          }).then(
            (successResponse)=>{
              if(this.qInfo.qType === 'single_choice'||this.qInfo.qType==='multi_choice') {
                this.optionNumber = JSON.parse(JSON.stringify(successResponse.data))
                this.drawBar()
              } else if(this.qInfo.qType === 'int'||this.qInfo.qType === 'float'||this.qInfo.qType === 'rate') {
                this.average = JSON.parse(JSON.stringify(successResponse.data))
              }
            }
          ).catch((failResponse)=> {
            this.$message({message: "加载统计数据失败！", duration: 1000})
          })
        }
        ,
        drawBar() {
          const myChart = echarts.init(document.getElementById(this.bid));

          // 指定图表的配置项和数据
          let option = {
            title: {
              text: '统计数据'
            },
            tooltip: {},
            legend: {
              data:['数量']
            },
            xAxis: {
              data: this.qInfo.qOptions
            },
            yAxis: {},
            series: [{
              name: '数量',
              type: 'bar',
              data: this.optionNumber
            }]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
    }
  }
</script>

<style scoped>
  .bar-chart {
    width: 100%;
  }


  .box-card {
    transition: all ease 300ms;
    text-align: left;
  }

</style>
