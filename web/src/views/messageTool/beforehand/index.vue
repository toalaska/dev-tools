<template>
  <el-row :gutter="10" class="home">
    <el-button type="primary" @click="handleSubmit">转换</el-button>
    <el-col :span="5">
      <el-input v-model="params.json" type="textarea" :rows="33" size="small" />
    </el-col>
    <el-col  v-if="data.length > 0" :span="19" class="info--wrapper">
      <div style="margin-bottom:15px">
        <el-input placeholder="请输入项目编码" style="width:300px" v-model="projectNo"></el-input>
        <el-button style=" position:relative;top:0px " type="primary" @click="getAmount">查询</el-button>
        <span style="position:relative;left:100px;font-weight: 600;font-size:18px">合计:{{amount}}</span>
      </div>

      <div class="info--header">
        <span style="flex: 1;">birthday</span>
        <span style="flex: 2;">departmentName</span>
        <span style="flex: 2;">admissionTime</span>
        <span style="flex: 2;">dischargeTime</span>
        <span style="flex: 1;">住院时间</span>
        <span style="flex: 1;">gender</span>
        <span style="flex: 2;">medicalInstitutionLevel</span>
        <span style="flex: 2;">diseaseCode</span>
        <span style="flex: 2;">diseaseName</span>
      </div>
      <div v-for="item in data" :key="item.judgeResultId" class="info--body">
        <div class="row parent">
          <span style="flex: 1;">{{ item.inpatient.birthday }}</span>
          <span style="flex: 2;">{{ item.inpatient.departmentName }}</span>
          <span
            style="flex: 2;"
          >{{moment(item.inpatient.admissionTime).format("YYYY年MM月DD日 HH时mm分ss秒")}}</span>
          <span
            style="flex: 2;"
          >{{moment(item.inpatient.dischargeTime).format("YYYY年MM月DD日 HH时mm分ss秒")}}</span>
          <span
            style="flex: 1;"
          >{{change(item.inpatient.dischargeTime,item.inpatient.admissionTime)}}</span>
          <span style="flex: 1;">{{ item.inpatient.gender }}</span>
          <span style="flex: 2;">{{ item.inpatient.medicalInstitutionLevel }}</span>
          <span style="flex: 2;">{{ item.settlement.settlementDisease.diseaseCode }}</span>
          <span style="flex: 2;">{{ item.settlement.settlementDisease.diseaseName }}</span>
        </div>
        <div class="row children">
          <span style="flex: 1;" />
          <span style="flex: 3;">projectNo</span>
          <span style="flex: 3;">projectName</span>
          <span style="flex: 3;">unitPrice</span>
          <span style="flex: 1;">amount</span>
          <span style="flex: 2;">contentsType</span>
          <span style="flex: 3;">selfPayPercent</span>
          <span style="flex: 2;">invoiceItemType</span>
        </div>
        <div
          v-for="(child, index) in item.settlement.inpatientCostDetails"
          :key="child.projectNos"
          class="row children"
        >
          <span style="flex: 1;">{{ index+1 }}</span>
          <span style="flex: 3;">{{ child.projectNo }}</span>
          <span style="flex: 3;">{{ child.projectName }}</span>
          <span style="flex: 3;">{{ child.unitPrice }}</span>
          <span style="flex: 1;">{{ child.amount }}</span>
          <span style="flex: 2;">{{ child.contentsType }}</span>
          <span style="flex: 3;">{{ child.selfPayPercent }}</span>
          <span style="flex: 2;">{{ child.invoiceItemType }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import moment from "moment";
export default {
  name: "Home",
  data() {
    return {
      moment,
      data: [],
      params: {
        json: "",
      },
      projectNo: "",
      amount: 0,
    };
  },
  filters: {
    change(data) {
      return moment(data).format("YYYY年MM月DD日 HH时mm分ss秒");
    },
  },
  methods: {
    handleSubmit() {
      const obj = JSON.parse(this.params.json);
      const { bizDatas } = obj;
      this.data = bizDatas;
    },
    change(endTime, startTime) {
      const time=moment(endTime).diff(moment(startTime), "days") 
      return time!==0?time + "天":'1天';
    },
    getAmount() {
      this.amount = 0;
      JSON.parse(this.params.json).bizDatas.forEach((item) => {
        item.settlement.inpatientCostDetails.forEach((items) => {
          const arr = this.projectNo.split(",");
          arr.forEach((itemss) => {
            if (itemss === items.projectNo) {
              this.amount += items.amount;
              return items;
            }
          });
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  padding-top: 50px;
  position: relative;
  box-sizing: border-box;
  .el-button {
    top: 5px;
    left: 20px;
    position: absolute;
  }
}
.info--wrapper {
  height: calc(100% - 20px);
  font-size: 12px;
  overflow-y: auto;
  .info--header,
  .row {
    display: flex;
    justify-content: space-between;
    &.children {
      margin-left: 20px;
    }
    span {
      width: 100%;
      display: block;
      padding: 5px 0;
      text-align: center;
      border: 1px solid #e4e7ed;
    }
  }
  .parent {
    background-color: #f2f6fc;
  }
}
</style>
