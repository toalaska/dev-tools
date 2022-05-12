
<template>
  <div>
    更新时间：{{ time }}
    <el-button @click="init">刷新</el-button>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="name" label="服务"></el-table-column>
      <el-table-column prop="env" label="环境"></el-table-column>
      <el-table-column prop="git.commit.user.name" label="人员"></el-table-column>
      <el-table-column prop="git.commit.time" label="时间"></el-table-column>
      <el-table-column prop="git.total.commit.count" label="提交次数"></el-table-column>
      <el-table-column prop="git.commit.message.full" label="信息"></el-table-column>
    </el-table>
  </div>
</template>
 
 <style>
td,
th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>
<script>
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
export default {
  data() {
    return {
      num: 0,
      items: [],
      time: null,
      tableData: [],
    };
  },
  methods: {
    init() {
      this.time = dateFormat("YYYY-mm-dd HH:MM:SS", new Date());
      this.num = 0;
      this.tableData = [];
      let names = [
        "repo",
        "base-info",
        "rule-engine",
        "rule-manager",
        "privilege",
        "gateway",
        "sqtx-inc",
        "fjkfxt",
        "service-mis",
        "xiaodao",
        "file",
        "double-random",
      ];
      let envs = [
        {
          prefix: "fj",
          gatewayUrl: "http://172.16.18.107:11100",
        },
        {
          prefix: "test",
          gatewayUrl: "http://172.16.18.112:8081",
        },
        {
          prefix: "ta",
          gatewayUrl: "http://10.16.0.127:11100",
        },
      ];

      for (var i in names) {
        var name = names[i];
        for (var j in envs) {
          var env = envs[j];

          let url = env.gatewayUrl + "/" + name + "/actuator/info";
          let item = {};
          item["name"] = name;
          item["env"] = env.prefix;
          console.info("url=" + url);
          fetch(url, {
            method: "get",
          })
            .then((res) => {
              // console.log(res);
              return res.text();
            })
            .then((data) => {
              let item1 = {};
              try {
                item1 = JSON.parse(data);
                // for (k in item1){
                //     item[k]=item1[k]
                // }

                Object.assign(item, item1);
              } catch (e) {}
              if (item.git) {
                this.tableData.push(item);
                this.tableData.sort((a, b) =>
                  (a.name + a.env).localeCompare(b.name + b.env)
                );

                this.num = this.num + 1;
              }
            })
            .catch((ee) => {
              console.error("err3=" + ee);
            });
        }
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
</html>


