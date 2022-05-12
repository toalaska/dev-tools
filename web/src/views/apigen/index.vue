
<template>
  <div class="app-container documentation-container">
    <el-upload
       action="#"
       ref="upload"
       class="upload-demo"
      drag
      :on-success="onSuccess"
       :file-list="fileList"
       :before-upload="beforeUpload"
       auto-upload
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          <a :href="tplUrl" id="href" target="_blank">下载接口定义文件模板</a>
          <br>
          <br>
          <a href="http://10.16.0.127:1111/share/detail/d9035a68-dc2a-47a8-4c52-2ebdae684474" id="href" target="_blank">下载BeyondCompare代码对比工具</a>
          <br>
          <br>
          提取码: 32yz

        </div>
      </template>
    </el-upload>

  </div>
</template>

<script>
  import { saveAs } from 'file-saver';
  import { gen } from '@/api/apigen'


  export default {


        //process.env.VUE_APP_BASE_API
        data() {
            return {
              fileList:[],
              tplUrl: process.env.VUE_APP_BASE_API+'/static/tpl/接口设计.xlsx',

             };
        },


        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
          //上传文件
          beforeUpload(file, row, index) {
            var data = new FormData();
            // 创建一个表单数据
             data.append("file",file);
            gen(data).then(response => {
              saveAs(response.data, response.filename);
            }).catch(err => {
              console.error(err)
            })
            return false;
          }



        }
    }
</script>

<style>
  a{
    color: red;
  }
</style>
