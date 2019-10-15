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
        :current-page.sync="currentPage"
        :page-size="12"
        layout="total, prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable" label-width="100px">
        <el-form-item label="店铺名称">
          <el-input v-model="selectTable.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-autocomplete
            v-model="address.address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入地址"
            style="width: 100%;"
            @select="addressSelect"
          ></el-autocomplete>
          <span>当前城市：{{city.name}}</span>
        </el-form-item>
        <el-form-item label="店铺介绍">
          <el-input v-model="selectTable.description"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="selectTable.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类">
          <el-cascader v-model="selectedCategory" :options="categoryOptions"></el-cascader>
        </el-form-item>
        <el-form-item label="商铺图标">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="selectTable.image_path"
              :src="baseImgPath+selectTable.image_path"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="updateShop">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../common/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  cityGuess,
  getResturants,
  getResturantsCount,
  foodCategory,
  updateResturant,
  searchplace,
  deleteResturant
} from "@/api/getData";
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
      baseUrl, //域名地址
      baseImgPath, //图片存放地址
      tableData: Array(2).fill(data),
      city: {},
      currentPage: 1,
      count: 0,
      offset: 0,
      limit: 12,
      dialogFormVisible: false,
      selectTable: {},
      formLabelWidth: "100px",
      address: {},
      categoryOptions: [],
      selectedCategory: []
    };
  },
  created() {
    this.initData();
  },
  components: {
    headTop
  },
  methods: {
    async initData() {
      try {
        this.city = await cityGuess();
        const countData = await getResturantsCount();
        console.log("city--", this.city);
        console.log("countData--", countData);
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getResturants();
      } catch (err) {
        console.log(err);
      }
    },
    // 获取店铺列表
    async getResturants() {
      const { latitude, longitude } = this.city;
      const restaurants = await getResturants({
        latitude,
        longitude,
        offset: this.offset,
        limit: this.limit
      });
      this.tableData = [];
      restaurants.forEach(item => {
        let obj = {};
        obj.name = item.name;
        obj.address = item.address;
        obj.description = item.description;
        obj.id = item.id;
        obj.phone = item.phone;
        obj.rating = item.rating;
        obj.recent_order_num = item.recent_order_num;
        obj.category = item.category;
        obj.image_path = item.image_path;
        this.tableData.push(obj);
      });
      console.log('tableData',this.tableData);
    },
    // 获取店铺分类
    async getCategory() {
      try {
        const categories = await foodCategory();
        console.log("cate", categories);
        categories.forEach(item => {
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: []
            };
            item.sub_categories.forEach((subitem, index) => {
              if (index == 0) {
                return;
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name
              });
            });
            this.categoryOptions.push(addnew);
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    handleSizeChange(val) {
      console.log("每页", val);
    },
    handleCurrentChange(val) {
      console.log("当前页", val);
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getResturants();
    },
    // el-autocompelete实现远程搜索下拉框
    async querySearchAsync(queryString, callback) {
      if (queryString) {
        try {
          const cityList = await searchplace(this.city.id, queryString);
          console.log("cityList", cityList);
          if (cityList instanceof Array) {
            cityList.map(item => {
              item.value = item.address;
              return item;
            });
            callback(cityList);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    // 选中地址数据
    addressSelect(vale) {
      const { address, latitude, longitude } = vale;
      this.address = { address, latitude, longitude };
    },
    // 编辑
    handleEdit(index, row) {
      console.log("-row-", row);
      this.selectTable = row;
      this.address.address = row.address;
      this.dialogFormVisible = true;
      this.selectedCategory = row.category.split("/");
      if (!this.categoryOptions.length) {
        this.getCategory();
      }
    },
    // 上传头像成功
    handleAvatarSuccess(res,file) {
      console.log(res);
      if(res.status == 1){
        this.selectTable.image_path = res.image_path;
      }else{
        console.log('上传图片失败');
      }
    },
    // 上传头像前
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    // 更新商铺信息
    async updateShop(){
      this.dialogFormVisible = false;
      try{
        Object.assign(this.selectTable, this.address);//把两个单独的对象整合到一起
        this.selectTable.category = this.selectedCategory.join('/');
        const res = await updateResturant(this.selectTable);
        console.log('res-----------',res);
        if(res.status == 1){
          this.$message({
            type:'success',
            message:'更新店铺信息成功'
          })
          this.getResturants();
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      }catch(err){
        console.log(err)
      }

    },
    // 添加食品
    addFood(index,row){
      console.log('index',index);
      console.log('row',row);
      this.$router.push({path:'addGoods',query:{restaurant_id:row.id}});
    }

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
.el-pagination {
  padding: 2px 30px;
  padding-bottom: 15px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>