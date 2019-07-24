<template>
    <div>
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="分享到微信" name="first">分享到微信
            <el-popover
              placement="bottom-start"
              width="80"
              trigger="hover"
              >
              <el-image
                style="width: 100px; height: 100px"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                fit="fill"></el-image>
              <el-button slot="reference">hover 激活</el-button>
            </el-popover>
          </el-tab-pane>
          <el-tab-pane label="分享到qq" name="second">分享到qq
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="分享到微博" name="third">分享到微博</el-tab-pane>
          <el-tab-pane label="分享到豆瓣" name="fourth">分享到豆瓣</el-tab-pane>
        </el-tabs>
      </template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              activeName: 'first'
            }
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab.name);
          }
        },

        components: {}
    }
</script>

<style scoped>

</style>
