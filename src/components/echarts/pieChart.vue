<template>
  <div id="pie-chart" style="width: 100%;height: 100%;"></div>
</template>

<script>
  export default {
    data() {
      return {
        charts: '',
        opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
        opinionData:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ]
      }
    },
    methods: {
      drawPie(id){
        this.charts = this.$echarts.init(document.getElementById(id));
        setTimeout(window.onresize = () => {
          this.charts.resize();
        },100);
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:this.opinion
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius:['50%','70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.opinionData
            }
          ]
        })
      }
    },
    mounted(){
      this.$nextTick(function() {
        this.drawPie('pie-chart')
      })
    }
  }
</script>

