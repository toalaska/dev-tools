<template>
  <div class="box">
    <a-table
      :columns="columns"
      :data-source="data"
      style="height: 50%; width: 80%"
      :pagination="false"
    >
      <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
      <span slot="customTitle" slot-scope="tags, record">
        <el-input type="text" :value="record.name" style="width: 300px" />
        <!-- <el-input type="text" value="name" />
        <el-input type="text" value="version" v-else /> -->
      </span>

      <span slot="action" slot-scope="tags, record" class="action">
        <el-input v-model="record.value" type="text" style="width: 300px" />
      </span>
    </a-table>

    <div class="top">
      <el-button @click="onSend">生成</el-button>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: '参数名称',
    dataIndex: 'customTitle',
    key: 'customTitle',
    // slots: { title: "customTitle" },
    scopedSlots: { customRender: 'customTitle' }
  },
  {
    title: '参数值',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'driverClassName',
    value: 'com.mysql.cj.jdbc.Driver',
    selectVal: ''
  },
  {
    key: '2',
    name: 'fileType',
    value: 'HTML',
    selectVal: ''
  },
  {
    key: '3',
    name: 'jdbcUrl',
    value: 'jdbc:mysql://172.16.18.112:3306/repo?characterEncoding=utf8',
    selectVal: ''
  },
  {
    key: '4',
    name: 'password',
    value: 'admin',
    selectVal: ''
  },
  {
    key: '5',
    name: 'title',
    value: '控费系统数据库文档',
    selectVal: ''
  },
  {
    key: '6',
    name: 'username',
    value: 'admin',
    selectVal: ''
  }
]

import { databases } from '@/api/database'
import { saveAs } from 'file-saver'
export default {
  data() {
    return {
      data,
      columns,
      fileList: [],
      input2: '/db/doc',
      key1: '',
      key2: '',
      key3: '',
      key4: '',
      key5: '',
      key6: ''
    }
  },
  methods: {
    handlePreview(file) {
      data[0].fileName = file.name
    },
    onSend() {
      data.map((item) => {
        if (item.key === '1') {
          this.key1 = item
        } else if (item.key === '2') {
          this.key2 = item
        } else if (item.key === '3') {
          this.key3 = item
        } else if (item.key === '4') {
          this.key4 = item
        } else if (item.key === '5') {
          this.key5 = item
        } else if (item.key === '6') {
          this.key6 = item
        }
      })
      databases({
        driverClassName: this.key1.value,
        fileType: this.key2.value,
        jdbcUrl: this.key3.value,
        password: this.key4.value,
        title: this.key5.value,
        username: this.key6.value
      })
        .then((response) => {
          saveAs(response.data, response.filename)
        })
        .catch((message) => {
          console.error(message)
        })
    }
  }
}
</script>

<style scoped>
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
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  width: 100%;
  height: 36px;
  line-height: 34px;
  background-color: #fff;
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
}

.update_p span {
  background-color: #1890ff;
  padding: 0 15px;
  color: #fff;
}
</style>
