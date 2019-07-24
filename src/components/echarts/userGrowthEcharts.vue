<template>
  <div>
    <el-row v-loading="loading">
      <el-col :span="24">
        <div class="grid-content">
          <span class="demonstration">注册开始日期：</span>
          <el-date-picker
            v-model="startTime"
            type="date"
          >
          </el-date-picker>
          <span class="demonstration">注册结束日期：</span>
          <el-date-picker
            v-model="endTime"
            type="date"
          >
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" style="float: right;margin: 20px"
                     @click.native.prevent="inquire">查询
          </el-button>
        </div>
      </el-col>
      <el-col :span="24">
        <div id="user-growth-echarts" style="width:100%;height: 700px;margin-top:20px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        charts: '',
        xAxisdata: [],
        zizhudata: [],
        pinpaidata: [],
        wecahtdata: [],
        tuijiandata: [],
        totalNumdata: [],
        startTime: '',
        endTime: '',
        loading:true
      }
    },
    methods: {
      drawPie(id, startTime, endTime) {
        var that = this;
        this.charts = this.$echarts.init(document.getElementById(id));
        var data = {
          map: "api_jiu_user_register",
          plum_session_api: localStorage.getItem('token'),
          time_stamp: Date.parse(new Date()) / 1000,
          startTime: startTime,
          endTime: endTime,
        };
        data.sign_str = this.createSign(data);
        this.$http.post('', data).then((data) => {
          if (data.ec == 200) {
            setTimeout(window.onresize = () => {
              that.charts.resize();
              that.loading = false
            },100);
            this.startTime = data.data.startTime;
            this.endTime = data.data.endTime;
            if (data.data.keys == '') {
              this.$message.error('此时间段查无数据');
            }
            var keysdata = data.data.keys;
            var zizhudata = data.data.zizhu;
            var pinpaidata = data.data.pinpai;
            var wecahtdata = data.data.wecaht;
            var tuijiandata = data.data.tuijian;
            var totalNumdata = data.data.totalNum;
            var keysdataArr = [], zizhudataArr = [], pinpaidataArr = [], wecahtdataArr = [], tuijiandataArr = [],
              totalNumdataArr = [];
            for (var k in keysdata) {
              keysdataArr.push(keysdata[k]);
            }
            for (var k in zizhudata) {
              zizhudataArr.push(zizhudata[k]);
            }
            for (var k in pinpaidata) {
              pinpaidataArr.push(pinpaidata[k]);
            }
            for (var k in wecahtdata) {
              wecahtdataArr.push(wecahtdata[k]);
            }
            for (var k in tuijiandata) {
              tuijiandataArr.push(tuijiandata[k]);
            }
            for (var k in totalNumdata) {
              totalNumdataArr.push(totalNumdata[k]);
            }
            this.xAxisdata = keysdataArr;
            this.zizhudata = zizhudataArr;
            this.pinpaidata = pinpaidataArr;
            this.wecahtdata = wecahtdataArr;
            this.tuijiandata = tuijiandataArr;
            this.totalNumdata = totalNumdataArr;
            this.charts = this.$echarts.init(document.getElementById(id));
            this.charts.setOption({
              title: {
                text: '鸠鸠用户增长统计'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['自主注册', '品牌注册', '微信注册', '推荐注册', '总体注册']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.xAxisdata
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name: '自主注册',
                  type: 'line',
                  stack: '总量',
                  data: this.zizhudata
                },
                {
                  name: '品牌注册',
                  type: 'line',
                  stack: '总量',
                  data: this.pinpaidata
                },
                {
                  name: '微信注册',
                  type: 'line',
                  stack: '总量',
                  data: this.wecahtdata
                },
                {
                  name: '推荐注册',
                  type: 'line',
                  stack: '总量',
                  data: this.tuijiandata
                },
                {
                  name: '总体注册',
                  type: 'line',
                  stack: '总量',
                  data: this.totalNumdata
                }
              ],
            });
          } else {
            this.$message.error(data.em);
          }
        }).catch((err) => {
          this.$message.error('获取用户增长信息失败');
        });
      },
      //  查询
      inquire: function () {
        if (this.startTime == null) {
          this.startTime = ''
        }
        if (this.endTime == null) {
          this.endTime = ''
        }
        if (this.startTime !== '' && this.endTime !== '') {
          this.startTime = this.dateTimeManage(this.startTime);
          this.endTime = this.dateTimeManage(this.endTime);
          this.drawPie('user-growth-echarts', this.startTime, this.endTime)
        } else {
          this.drawPie('user-growth-echarts', '', '')
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.drawPie('user-growth-echarts', this.startTime, this.endTime)
      });
    },
    created() {
      //获取按钮权限
      this.buttonPermissions().then((data)=>{
        if(data == 'all'){
          // this.addUserGroup =true;
          // this.revisionUserGroup =true;
        }else {
          console.log(data);
          // if(data.indexOf('.addUserGroup')!==-1){
          //   this.addUserGroup =true
          // }
          // if(data.indexOf('.revisionUserGroup')!==-1){
          //   this.revisionUserGroup = true
          // }
        }
      })
    }
  }
</script>
<style scoped>
  .grid-content {
    background-color: #F2F6FC;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 80px;
  }

  .demonstration {
    font-size: 18px;
    margin: 0 20px;
  }

  .el-date-editor.el-input {
    margin-top: 20px;
  }
</style>

