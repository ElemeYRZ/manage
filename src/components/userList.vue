<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" highlight-current-row border > 
        <el-table-column type="index" width="100" align="center"></el-table-column>
        <el-table-column property="registe_time" label="注册日期" width="220" align="center"></el-table-column>
        <el-table-column property="username" label="用户姓名" width="220" align="center"></el-table-column>
        <el-table-column property="city" label="注册地址" align="center"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="total,prev, pager, next"
      :total="count"
      :current-page="currentPage"
      :page-size="15"
    ></el-pagination>
  </div>
</template>

<script>
import headTop from "../common/headTop";
import { getUserList, getUserCount } from "@/api/getData";
export default {
  data() {
    let data = {
      registe_time: "2016-05-02",
      username: "王小虎",
      city: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(10).fill(data),
      currentPage: 1,
      count: 0, //数据总数量
      currentRow: null,
      offset: 0,
      limit: 15
    };
  },
  components: {
    headTop
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const countData = await getUserCount();
        console.log("countData", countData);
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getUsers();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getUsers() {
      const users = await getUserList({
        offset: this.offset,
        limit: this.limit
      });
      console.log("users", users);
      this.tableData = [];
      users.forEach(item => {
        let obj = {};
        obj.username = item.username;
        obj.registe_time = item.registe_time;
        obj.city = item.city;
        this.tableData.push(obj);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getUsers();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin.less";
.table_container {
  margin: 20px;
}
.el-table--border th,
.el-table--border td {
  border-right: none;
}
.el-table--border th {
  background-color: #eef1f6;
  color: #333;
}
.el-table td,
.el-table th {
  padding: 10px 0;
}
.el-pagination {
  padding: 2px 30px;
  padding-bottom: 15px;
}
</style>