
<template>
  <div class="app-container documentation-container">
    <el-input
      v-model="sql"
      type="textarea"
      rows="10"
      placeholder="SQL"
      @change="query"
      clearable
    >
      <template slot="prepend">SQL</template>
    </el-input>

    <el-select v-model="pswType" placeholder="密码加密方式">
      <el-option
        v-for="item in pswTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
        <br />
    <el-select v-model="srcDb" placeholder="来源库">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

-> 

    <el-select v-model="dstDb" placeholder="目标库">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
<br>
<el-select v-model="mode" placeholder="来源库">
      <el-option
        v-for="item in modes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    into 
    <el-input v-model="dstTable" placeholder="目标表" @change="query" clearable>
      <template slot="prepend">目标表</template>

    </el-input>
    
    <el-input v-model="dstColum" placeholder="目标字段" clearable>
      <template slot="prepend">目标字段</template>
    </el-input>
     

    <el-input
      v-model="configJson"
      type="textarea"
      rows="10"
      placeholder="配置文件"
      @change="query"
      clearable
    >
      <template slot="prepend">配置文内容</template>
    </el-input>
        <el-input v-model="fileurl" placeholder="配置文件地址" @change="query" clearable>
      <template slot="prepend">配置文件地址</template>

    </el-input>
     <div class="top">
      <el-button @click="tojsqlConfig">生成</el-button>
     </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { dict } from "@/api/nation";
import { uploadStr } from "@/api/tmpfile";

export default {
  //process.env.VUE_APP_BASE_API
  data() {
    return {
      options: [
        {
          value: "MBS",
          label: "MBS",
        },
        {
          value: "SMC",
          label: "SMC",
        },
        {
          value: "OTS",
          label: "OTS",
        },
        {
          value: "BIZ",
          label: "BIZ",
        }
      ],
      pswTypes: [
        {
          value: "RAW",
          label: "密码原样填充",
        },
        {
          value: "PLACEHOLDER",
          label: "占位符",
        } 
      ], modes: [
        {
          value: "insert",
          label: "insert",
        },
        {
          value: "replace",
          label: "replace",
        } 
      ],
      fileurl: "",
      srcDb: "SMC",
      mode: "insert",
      pswType: "RAW",
      dstDb: "OTS",
      dstTable: "fee_list_d_raw",
      sql: "select SETL_ID mdtrt_id,SETL_ID,BKKP_SN,RX_DRORD_NO,FIXMEDINS_CODE,FIXMEDINS_NAME,PSN_NO,PSN_INSU_RLTS_ID,INSU_ADMDVS,PAY_LOC,MED_TYPE,FEE_OCUR_TIME,CNT,PRIC,DET_ITEM_FEE_SUMAMT,PRIC_UPLMT_AMT,SELFPAY_PROP,FULAMT_OWNPAY_AMT,0 OVERLMT_AMT,PRESELFPAY_AMT,INSCP_AMT,CVLSERV_BEDFEE_AMT,MEDINS_DISC_AMT,CHRGITM_LV,HILIST_CODE,HILIST_NAME,LIST_TYPE,MED_LIST_CODG,MEDINS_LIST_CODG,MEDINS_LIST_NAME,MED_CHRGITM_TYPE,PRODNAME,SPEC,DOSFORM_NAME,BILG_DEPT_CODG,BILG_DEPT_NAME,BILG_DR_CODE,BILG_DR_NAME,ACORD_DEPT_CODG,ACORD_DEPT_NAME,ACORD_DR_CODE,ACORD_DR_NAME,LMT_USED_FLAG,HOSP_PREP_FLAG,HOSP_APPR_FLAG,TCMDRUG_USED_WAY,PRODPLAC_TYPE,BAS_MEDN_FLAG,HI_NEGO_DRUG_FLAG,PRCU_DRUG_FLAG,CHLD_MEDC_FLAG,ETIP_FLAG,ETIP_HOSP_CODE,DSCG_TKDRUG_FLAG,LIST_SP_ITEM_FLAG,MATN_FEE_FLAG,DRT_REIM_FLAG,REIM_PROP,OPRN_OPRT_CODE,SIN_DOS_DSCR,USED_FRQU_DSCR,PRD_DAYS,MEDC_WAY_DSCR,MEMO,VALI_FLAG,RID,UPDT_TIME,CRTER_ID,CRTER_NAME,CRTE_TIME,CRTE_OPTINS_NO,OPTER_ID,OPTER_NAME,OPT_TIME,OPTINS_NO,POOLAREA_NO ,null FLAG, null filter_repeat_data FROM fee_list_d where setl_id in (select setl_id from setl_d a where a.SETL_TIME between STR_TO_DATE('{startTime}','%Y-%m-%d %H:%i:%s') and STR_TO_DATE('{endTime}','%Y-%m-%d %H:%i:%s') and FIX_BLNG_ADMDVS like CONCAT('{admdvs}','%') and MED_TYPE <> '41' and VALI_FLAG='1' AND REFD_SETL_FLAG='0') and vali_flag='1'",
      dstColum: "*",
      configJson: "",
      conns:{
        MBS:{
          url:"jdbc:mysql://10.70.65.31:3323/HIBIZ_DB?connectTimeout=60000&socketTimeout=60000&autoReconnect=true&useSSL=false&serverTimezone=Asia/Shanghai&allowMultiQueries=true",
          acc:"PRD_HIBIZ_DB_SUID",
          psw:{
            PLACEHOLDER:"{mbsPsw}",
            RAW:"Reb858oI"
          } 
        },
          SMC:{
          url:"jdbc:mysql://10.70.65.30:3323/SETLCENT_DB?connectTimeout=60000&socketTimeout=60000&autoReconnect=true&useSSL=false&serverTimezone=Asia/Shanghai&allowMultiQueries=true",
          acc:"PRD_SETLCENT_DB_SUID",
          psw:{
            PLACEHOLDER:"{smcPsw}",
            RAW:"bggrrHOu1"
          } 
        },
          BIZ:{
          url:"jdbc:mysql://10.70.65.32:3323/intlgsupn_db?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true",
          acc:"prd_intlgsupn_all",
          psw:{
            PLACEHOLDER:"{bizPsw}",
            RAW:"VC#yAQJt@C9E!S2e"
          } 
        },
          OTS:{
          url:"jdbc:mysql://10.70.130.74:3306/ots?useUnicode=true&characterEncoding=UTF8&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true",
          acc:"pingan_ots",
          psw:{
            PLACEHOLDER:"{otsPsw}",
            RAW:"zzBfiDq6cAdefhHG6M"
          } 
        }
      }
    };
  },

  methods: {
     tojsqlConfig() {
      var arr = {
        job: {
          content: [
            {
              reader: {
                name: "mysqlreader",
                parameter: {
                  connection: [
                    {
                      jdbcUrl: [
                        this.conns[this.srcDb].url,
                      ],
                      querySql: [this.sql],
                    },
                  ],
                  username: this.conns[this.srcDb].acc,
                  password: this.conns[this.srcDb].psw[this.pswType],
                },
              },
              writer: {
                name: "mysqlwriter",
                parameter: {
                  writeMode: this.mode,
                  username: this.conns[this.dstDb].acc,
                  password: this.conns[this.dstDb].psw[this.pswType],
                  column: this.dstColum.split(","),
                  connection: [
                    {
                      jdbcUrl:
                        this.conns[this.dstDb].url,
                      table: [this.dstTable],
                    },
                  ],
                },
              },
            },
          ],
          setting: {
            speed: {
              channel: 5,
            },
          },
        },
      };
      this.configJson=JSON.stringify(arr,null,2);
      uploadStr({txt:this.configJson}).then(response => {
          console.info("resp",response)
          this.fileurl=response.data
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
