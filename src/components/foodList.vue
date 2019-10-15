<template>
  <div class="fillContain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="row => row.index"
        :data="tableData"
        style="width:100%;"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="餐馆名称">
                <span>{{props.row.restaurant_name}}</span>
              </el-form-item>
              <el-form-item label="食品 ID">
                <span>{{props.row.item_id}}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{props.row.restaurant_id}}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{props.row.description}}</span>
              </el-form-item>
              <el-form-item label="餐馆地址">
                <span>{{props.row.restaurant_address}}</span>
              </el-form-item>
              <el-form-item label="食品评分">
                <span>{{props.row.rating}}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{props.row.category_name}}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{props.row.month_sales}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="name" align="center"></el-table-column>
        <el-table-column label="食品介绍" prop="description" align="center"></el-table-column>
        <el-table-column label="评分" prop="rating" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="15"
      background
      layout="total,prev,pager,next"
      :total="count"
    ></el-pagination>
  </div>
</template>

<script>
import headTop from "../common/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  getFoods,
  getFoodsCount,
  getMenu,
  updateFood,
  deleteFood,
  getResturantDetail,
  getMenuById
} from "@/api/getData";
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      tableData: [],
      restaurant_id: "",
      offset: 0,
      limit: 15,
      count: 0,
      currentPage: 1,
      expendRow: []
    };
  },
  components: {
    headTop
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id;
    console.log("restaurant_id", this.restaurant_id);
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const countData = await getFoodsCount({
          restaurant_id: this.restaurant_id
        });
        if (countData.status == 1) {
          this.count = countData.count;
        }
        this.getFoods();
      } catch (err) {
        console.log(err);
      }
    },
    // 获取食物列表
    async getFoods() {
      const Foods = await getFoods({
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      });
      this.tableData = [];
      Foods.forEach((item, index) => {
        const tableData = {};
        tableData.name = item.name;
        tableData.item_id = item.item_id;
        tableData.description = item.description;
        tableData.rating = item.rating;
        tableData.month_sales = item.month_sales;
        tableData.restaurant_id = item.restaurant_id;
        tableData.category_id = item.category_id;
        tableData.image_path = item.image_path;
        tableData.specfoods = item.specfoods;
        tableData.index = index;
        this.tableData.push(tableData);
      });
      console.log("tableData", this.tableData);
    },
    expand(row, status) {
      if (status) {
        this.getSelectItemData(row);
      } else {
        const index = this.expendRow.indexOf(row.index);
        this.expendRow.splice(index, 1);
      }
    },
    async getSelectItemData(row, type) {
      const restaurant = await getResturantDetail(row.restaurant_id);
      const category = await getMenuById(row.category_id);
      this.selectTable = {
        ...row,
        ...{
          restaurant_name: restaurant.name,
          restaurant_address: restaurant.address,
          category_name: category.name
        }
      };

      this.selectMenu = { label: category.name, value: row.category_id };
      this.tableData.splice(row.index, 1, { ...this.selectTable });
      this.$nextTick(() => {
        this.expendRow.push(row.index);
      });
      if (type == "edit" && this.restaurant_id != row.restaurant_id) {
        this.getMenu();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getFoods();
    }
  }
};
</script>

<style lang="less">
.table_container {
  margin: 30px;
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
.demo-table-expand .el-form-item {
  width: 49%;
  margin-right: 0;
  margin-bottom: 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
</style>