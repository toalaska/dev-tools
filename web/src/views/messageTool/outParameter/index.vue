<template>
  <el-row :gutter="10" class="home">
    <el-button type="primary" @click="handleSubmit">转换</el-button>
    <el-col :span="5">
      <el-input v-model="params.json" type="textarea" :rows="33" size="small" />
    </el-col>
    <el-col v-if="data.length > 0" :span="19" class="info--wrapper">
      <div class="info--header">
        <span style="flex: 1;">ruleCode</span>
        <span style="flex: 1;">ruleName</span>
        <span style="flex: 2;">illegalInfo</span>
      </div>
      <div v-for="item in data" :key="item.judgeResultId" class="info--body">
        <div class="row parent">
          <span style="flex: 1;">{{ item.ruleCode }}</span>
          <span style="flex: 1;">{{ item.ruleName }}</span>
          <span style="flex: 2;">{{ item.illegalInfo }}</span>
        </div>
        <div v-for="(child, index) in item.judgeResultDetails" :key="child.judgeResultDetailId" class="row children">
          <span style="flex: 1;">{{ index+1 }}</span>
          <span style="flex: 2;">{{ child.inpatientCostDetailId }}</span>
          <span style="flex: 2;">{{ child.projectNo }}</span>
          <span style="flex: 2;">{{ child.projectName }}</span>
          <span style="flex: 3;">{{ child.illegalInfo }}</span>
          <span style="flex: 3;">{{ child.unitPrice }}</span>
          <span style="flex: 3;">{{ child.amount }}</span>
          <span style="flex: 3;">{{ child.contentsType }}</span>
          <span style="flex: 3;">{{ child.selfPayPercent }}</span>
          <span style="flex: 3;">{{ child.invoiceItemType }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      data: [],
      params: {
        json: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      const obj = JSON.parse(this.params.json)
      const {
        data: { judgeResults }
      } = obj
      this.data = judgeResults
    }
  }
}
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
  .info--header, .row {
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
      border: 1px solid #E4E7ED;
    }
  }
  .parent {
    background-color: #F2F6FC;
  }
}
</style>
