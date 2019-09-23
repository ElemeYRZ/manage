<template>
  <div>
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="店铺地址" prop="address"></el-table-column>
        <el-table-column label="店铺介绍" prop="description"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="Success" @click="addFood(scope.$index, scope.row)">添加食品</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import headTop from "../common/headTop";
export default {
  data() {
    const data = {
      name: "都可",
      address: "广东省广州市越秀区中山五路219号华联购物中心F1",
      description: "用心做美食",
      id: "123456",
      phone: "15708461934",
      rating: "5.0",
      recent_order_num: "1000",
      category: "餐饮"
    };
    return {
      tableData: Array(2).fill(data)
    };
  },
  components: {
    headTop
  }
};
</script>

<style lang="less">
.table_container {
  margin: 30px;
  border: 1px solid #dfe6ec;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-button--mini {
  padding: 7px;
}
.el-table .cell {
  text-align: center;
}
.el-table th {
  background-color: #eef1f6;
}
.Pagination {
  display: flex;
  margin-left: 20px;
}
</style>