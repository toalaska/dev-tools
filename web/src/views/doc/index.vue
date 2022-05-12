
<template>
  <div class="app-container documentation-container">
    <el-input v-model="docId" placeholder="请输入单据ID"  clearable>
      <template slot="prepend">单据ID</template>
    </el-input>
      <el-button type="primary" @click="query" >查询</el-button>

    <el-input v-model="name" placeholder="请输入档案名称"   clearable>
      <template slot="prepend"></template>
    </el-input>
       <el-button type="success" @click="save" >存档</el-button>

   <template>

     
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="extDevDataId"
      label="档案编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="档案名称"
      width="180">
    </el-table-column>

    <el-table-column
      prop="doc_d"
      label="doc_d">
    </el-table-column>
    
    <el-table-column
      prop="doc_suspt_d"
      label="doc_suspt_d">
    </el-table-column>
    <el-table-column
      prop="doc_suspt_detl_d"
      label="doc_suspt_detl_d">
    </el-table-column>
    <el-table-column
      prop="ext_doc_suspt_d"
      label="ext_doc_suspt_d">
    </el-table-column>  <el-table-column
      prop="ext_doc_suspt_d"
      label="ext_doc_suspt_d">
    </el-table-column>
 <el-table-column
      prop="ext_doc_suspt_detl_d"
      label="ext_doc_suspt_detl_d">
    </el-table-column>
 <el-table-column
      prop="ext_sm_doc_suspt_d"
      label="ext_sm_doc_suspt_d">
    </el-table-column> <el-table-column
      prop="ext_pm_doc_suspt_d"
      label="ext_pm_doc_suspt_d">
    </el-table-column>
  <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="rollback(scope.row)" type="text" size="small">回档</el-button>
       </template>
    </el-table-column>
  </el-table>
</template>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { save,rollback,query } from "@/api/doc";

export default {
  //process.env.VUE_APP_BASE_API
   methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      query(){
        if(!this.docId){
           this.$message('请输入单据ID');
           return;
        }
        query({docId:this.docId}).then(response => {
          console.info("resp",response)
          this.tableData=response.data
         }).catch(err => {
           this.$message('查询失败');
        })
          

      } , save(){
        if(!this.docId){
           this.$message('请输入单据ID');
           return;
        }
         if(!this.name){
           this.$message('请输入档案名称');
           return;
        }

          query({docId:this.docId,name:this.name}).then(response => {
          console.info("resp",response)
          this.tableData=response.data
         }).catch(err => {
           this.$message('存档失败');
        })

      },rollback(e){
        console.info(e)
          rollback({extDevDataId:e.extDevDataId}).then(response => {
          console.info("resp",response)
           this.$message(response.data.message);
          }).catch(err => {
           this.$message('回滚失败');
        })
      }
      
    },
    data() {
      return {
        docId:'',
        name:'',
        tableData: [{
          docId: 'ddd',
          date: '2016-05-02',
          name: 'test',
          address: 'test',
        } ]
      }
    }
};
</script>

<style>
.el-input,
.el-table {
  margin-top: 10px;
}
 .el-table .warning-row {
    background: rgb(152, 169, 214);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
