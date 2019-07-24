<template>
  <div>
    <el-row>
      <el-col :span="12"><div class="echarts_columnar">
        <echarts-columnar></echarts-columnar>
      </div></el-col>
      <el-col :span="12"><div class="pie-chart">
        <pie-chart></pie-chart>
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="line-chart">
        <line-chart></line-chart>
      </div></el-col>
      <el-col :span="12"><div class="scatter-diagram">
        <scatter-diagram></scatter-diagram>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
  import echartsColumnar from '@/components/echarts/echartsColumnar'
  import pieChart from '@/components/echarts/pieChart'
  import lineChart from '@/components/echarts/lineChart'
  import scatterDiagram from '@/components/echarts/scatterDiagram'
  export default {
    data() {
      return {}
    },
    methods: {},

    components: {
      echartsColumnar,
      pieChart,
      lineChart,
      scatterDiagram
    }
  }
</script>

<style scoped>
  .echarts_columnar{
    width: 100%;
    height: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .pie-chart{
    width: 100%;
    height: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .line-chart{
    width: 100%;
    height: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .scatter-diagram{
    width: 100%;
    height: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
