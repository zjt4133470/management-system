<template>
    <div>
      <el-row>
        <el-col :span="24"><div class="userGrowthEcharts">
          <user-growth-echarts></user-growth-echarts>
        </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import userGrowthEcharts from '../echarts/userGrowthEcharts'
    export default {
        data() {
            return {
              list:[]
            }
        },
        components: {
          userGrowthEcharts
        }
    }
</script>

<style scoped>
.userGrowthEcharts{
  height: 800px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
