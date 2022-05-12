
<template>
  <div class="app-container documentation-container">
    <el-input v-model="cn" placeholder="性别" @change="query" clearable>
      <template slot="prepend">字段中文名</template>
        <template slot="append"> <el-checkbox v-model="cnMh">模糊搜索</el-checkbox></template>

    </el-input>

    <el-input v-model="en" placeholder="GEND" @change="query" clearable>
      <template slot="prepend">字段英文名</template>
      <template slot="append"> <el-checkbox v-model="enMh">模糊搜索</el-checkbox></template>

    </el-input>
      <el-button type="primary" @click="query" >查询</el-button>


    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="dictionaryName" label="字段中文名"> </el-table-column>
      <el-table-column prop="identifier" label="字段英文名"> </el-table-column>
      <el-table-column prop="code" label="编码"> </el-table-column>

      <el-table-column prop="codeName" label="值 "> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { dict } from "@/api/nation";

export default {
  //process.env.VUE_APP_BASE_API
  data() {
    return {
      cnMh: true,
      enMh: true,
      cn: "",
      en: "",
      tableData: [
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
      ],
    };
  },

  methods: {
    query() {
       let data={
          "identifier": this.enMh ? '%'+this.en+'%' : this.en,
	        "dictionaryName": this.cnMh ? '%'+this.cn+'%' : this.cn
      }
       dict(data).then(response => {
          console.info("resp",response)
          this.tableData=response.data
         }).catch(err => {
          console.error(err)
        })
    },
  },
};
</script>

<style>
.el-input,
.el-table {
  margin-top: 10px;
}
</style>
