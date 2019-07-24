<template>
  <div id="scatter-diagram" style="width: 100%;height: 100%;"></div>
</template>

<script>
  export default {
    data() {
      return {
        charts: '',
      }
    },
    methods: {
      drawPie(id){
        this.charts = this.$echarts.init(document.getElementById(id));
        setTimeout(window.onresize = () => {
          this.charts.resize();
        },100);
        this.charts.setOption({
          xAxis: {},
          yAxis: {},
          series: [{
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: 'scatter'
          }]
        })
      }
    },
    mounted(){
      this.$nextTick(function() {
        this.drawPie('scatter-diagram')
      })
    }
  }
</script>

