<template>
  <div class="box">
    <a-table
      :columns="columns"
      :data-source="data"
      style="width: 80%"
      :pagination="false"
      :show-header="false"
      class="table"
    >
      <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
      <span slot="customTitle" slot-scope="tags, record">
        <el-input type="text" :value="record.name" />
        <!-- <el-input type="text" value="name" />
        <el-input type="text" value="version" v-else /> -->
      </span>

      <span slot="action" slot-scope="tags, record" class="action">
        <el-upload
          v-if="record.key == 1"
          ref="upload"
          action="#"
          class="upload-demo"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-change="handlePreview"
          auto-upload
          accept=".zip"
        >
          <p class="update_p">
            <input
              type="text"
              disabled
              :value="record.fileName"
              style="width: 180px"
            >
            <span class="span1">点击上传</span>
            <span class="span2"> 只能上传zip文件</span>
          </p>
        </el-upload>

        <el-input v-if="record.key == 2" v-model="record.value" type="text" />
        <el-input v-if="record.key == 3" v-model="record.value" type="text" />
      </span>
    </a-table>

    <div style="margin: 10px 10px" @click="onDatalist">
      响应内容： <a>{{ datalist ? datalist : "" }}</a>
    </div>

    <div id="tops" class="top">
      <el-button
        style="background: #1890ff; color: #ffffff"
        @click="onSede"
      >上传原型</el-button>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    // title: "参数名称",
    dataIndex: 'customTitle',
    key: 'customTitle',
    // slots: { title: "customTitle" },
    scopedSlots: { customRender: 'customTitle' }
  },

  {
    // title: "参数值",
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: '原型文件',

    fileName: '',
    selectVal: '文件'
  },
  {
    key: '2',
    name: '原型名称',
    value: 'test',
    selectVal: '文本'
  },
  {
    key: '3',
    name: '版本号',

    value: '1.0',
    selectVal: '文本'
  }
]

import { prototypes } from '@/api/prototype'

export default {
  data() {
    return {
      data,
      columns,
      fileList: [],
      input2: '/axure/axure',
      key1: {},
      key2: {},
      key3: {},
      datalist: '',
      box: {},
      value: '',
      formData: {}
    }
  },
  methods: {
    onDatalist() {
      window.open(this.datalist)
    },
    handlePreview(file) {
      data[0].fileName = file.name
    },

    onSede() {
      data.map((item) => {
        if (item.key === '2') {
          this.key2 = item.value
        } else if (item.key === '3') {
          this.key3 = item.value
        }
      })
      this.formData.append('name', this.key2)
      this.formData.append('version', this.key3)
      prototypes(this.formData)
        .then((response) => {
          this.datalist = response.data.data
        })
        .catch((err) => {
          console.error(err)
        })

      this.formData = {}
    },

    beforeUpload(file, row, index) {
      this.formData = new FormData()
      // 创建一个表单数据
      // formData.empty();

      this.formData.append('file', file)

      return false
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.box {
  margin-left: 100px;
}
.top {
  margin: 20px 0;
  margin-left: 70%;
}
.post {
  background: #49cc90;
  width: 80px;
  height: 36px;
  border-radius: 5px;
  line-height: 36px;
  text-align: center;
  color: #ffffff;
}

.address {
  display: flex;
  justify-content: space-between;
}
.address div {
  margin: 0 8px;
}

.address div:last-child {
  flex: 1;
}

.address div:first-child {
  width: 120px;
}

.address div:nth-of-type(2) {
  width: 100px;
}

.el-upload {
  width: 100%;
}
.update_p {
  display: flex;
  justify-content: space-between;

  border-radius: 4px;
  font-size: 12px;
  width: 100%;
  height: 36px;
  line-height: 34px;
  /* background-color: #fff; */
  /* padding: 0 15px; */
  margin: 0;
  /* overflow: hidden; */
}

.update_p input {
  flex: 1;
  border-radius: 0;
  border: 0;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
}

.update_p .span1 {
  background-color: #1890ff;
  padding: 0 15px;
  color: #fff;
}
.update_p .span2 {
  /* background-color: #1890ff; */
  padding: 0 15px;
  color: red;
  font-size: 12px;
}
</style>
