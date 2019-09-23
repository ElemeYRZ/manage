<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData"  style="width: 100%">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column property="registe_time" label="注册日期" width="220"></el-table-column>
        <el-table-column property="username" label="用户姓名" width="220"></el-table-column>
        <el-table-column property="city" label="注册地址"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="100"
      :current-page="currentPage"
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>
import headTop from "../common/headTop";
export default {
  data() {
    let data = {
      registe_time: "2016-05-02",
      username: "王小虎",
      city: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(10).fill(data),
      currentPage: 1
    };
  },
  components: {
    headTop
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin.less";
.table_container {
  margin: 20px;
  border: 1px solid #dfe6ec;
}
</style>