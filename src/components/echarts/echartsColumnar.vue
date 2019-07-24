<template>
  <div id="echarts-columnar" style="width: 100%;height: 100%;"></div>
</template>

<script>
  export default {
    data() {
      return {
        charts: '',
        opinion:[10, 52, 200, 334, 390, 330, 220],
        opinionData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    },
    methods: {
      drawPie(id){
        this.charts = this.$echarts.init(document.getElementById(id));
        setTimeout(window.onresize = () => {
          this.charts.resize();
        },100);
        this.charts.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data :this.opinionData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:this.opinion
            }
          ]
        })
      }
    },
    mounted(){
      this.$nextTick(function() {
        this.drawPie('echarts-columnar')
      })
    }
  }
</script>

