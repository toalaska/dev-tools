
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
    </el-upload>
  </div>
</template>

<script>
import { parse } from "@/api/postman";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      fileList: [],
      json: {},
    };
  },
  methods: {
    beforeUpload(file, fileList) {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        parse(json)
          .then((response) => {
            saveAs(response.data, response.filename);
          })
          .catch((err) => {});
      };
    }
  },
};
</script>

<style>
a {
  color: red;
}
#submit {
  margin-top: 20px;
}
</style>
