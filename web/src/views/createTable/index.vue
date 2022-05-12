<template>
  <div class="app-container documentation-container">
    <el-upload
      ref="upload"
      drag
      action="#"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :show-file-list="false"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          <a id="href" href="http://172.16.18.112:1025/static/tpl/数据表设计.xlsx" target="_blank">下载模板</a>

        </div>
      </template>
    </el-upload>
    <div style="margin-top: 15px">
      <el-button type="primary" style="display:block;margin-bottom: 5px" @click="copy">
        复制mysql建表语句
      </el-button>
       <textarea id="json" style="width: 1267px; height: 205px;" v-html="json" />
        <el-button type="primary" style="display:block;margin-bottom: 5px" @click="copyGp">
        复制gp建表语句
      </el-button>
      <textarea id="gpJson" style="width: 1267px; height: 205px;" v-html="gpJson" />
    </div>

  </div>
</template>

<script>
import { parse } from '@/api/create-table'

export default {
  data() {
    return {
      fileList: [],
      json: '',
      gpJson: '',
    }
  },
  methods: {
    beforeUpload(file, fileList) {
      var data = new FormData()
      data.append('file', file)
      parse(data).then(res => {
        this.json = res.data.sql
        this.gpJson = res.data.gpSql
      })
    },
    copy() {
      const json = document.querySelector('#json')
      json.select() // 选择对象
      document.execCommand('Copy')
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    }, copyGp() {
      const json = document.querySelector('#gpJson')
      json.select() // 选择对象
      document.execCommand('Copy')
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    }
  }
}
</script>

<style>
a {
  color: red;
}

#submit {
  margin-top: 20px;
}
</style>
