
<template>
  <div class="app-container documentation-container">
    <div>
      <el-input v-model="cn" placeholder="性别" @change="query" clearable>
        <template slot="prepend">字段中文名</template>
        <template slot="append"> <el-checkbox v-model="cnMh">模糊搜索</el-checkbox></template>

      </el-input> 
      
    </div>
   <div>
      
     <el-input v-model="en" placeholder="GEND" @change="query" clearable>
            <template slot="prepend">字段英文名</template>
            <template slot="append"> <el-checkbox v-model="enMh">模糊搜索</el-checkbox></template>
      </el-input>
     
           <el-button type="primary" @click="query" >查询</el-button>
   </div>



    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="fieldname" label="字段中文名"> </el-table-column>
      <el-table-column prop="field" label="字段英文名"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { field } from "@/api/nation";

export default {
  //process.env.VUE_APP_BASE_API
  data() {
    return {
      cnMh: true,
      enMh: true,
      cn: "",
      en: "",
      tableData: [
       
      ],
    };
  },

  methods: {
    query() {
     let data={
          "field": this.enMh ? '%'+this.en+'%' : this.en ,
	        "fieldName": this.cnMh ? '%'+this.cn+'%' : this.cn
      }
        field(data).then(response => {
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
