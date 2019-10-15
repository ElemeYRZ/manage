<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top:20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">选择食品种类</header>
        <el-form ref="categoryForm" :model="categoryForm" label-width="110px" class="form">
          <el-row class="category_select">
            <el-form-item label="食品种类">
              <el-select v-model="categoryForm.category" placeholder="请选择">
                <el-option
                  v-for="item in categoryForm.categoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="category_add_row" :class="showAddCategory?'show_edit':''">
            <div class="category_add">
              <el-form-item label="食品种类">
                <el-input v-model="categoryForm.foodName"></el-input>
              </el-form-item>
              <el-form-item label="种类描述">
                <el-input v-model="categoryForm.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn_addCategory" type="primary">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="category_icon" @click="addCategoryFun">
            <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
            <i class="el-icon-caret-bottom edit_icon" v-else></i>
            <span>添加食品种类</span>
          </div>
        </el-form>
        <header class="form_header">添加食品</header>
        <el-form
          ref="foodForm"
          :model="foodForm"
          :rules="rules"
          label-width="110px"
          class="form foodform"
        >
          <el-row class="foodContent">
            <el-form-item label="食品名称" prop="name">
              <el-input v-model="foodForm.name"></el-input>
            </el-form-item>
            <el-form-item label="食品活动">
              <el-input v-model="foodForm.activity"></el-input>
            </el-form-item>
            <el-form-item label="食品详情">
              <el-input v-model="foodForm.description"></el-input>
            </el-form-item>
            <el-form-item label="上传食品图片">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="foodForm.imageUrl" :src="foodForm.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品特点">
              <el-select v-model="foodForm.attributes" multiple placeholder="请选择">
                <el-option
                  v-for="item in foodSpecials"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="食品规格">
              <el-radio v-model="foodSpecs" label="one">单规格</el-radio>
              <el-radio v-model="foodSpecs" label="more">多规格</el-radio>
            </el-form-item>
            <el-row v-if="foodSpecs == 'one'">
              <el-form-item label="包装费">
                <el-input-number
                  v-model="foodForm.specs[0].packing_fee"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="价格">
                <el-input-number
                  v-model="foodForm.specs[0].price"
                  @change="handleChange"
                  :min="1"
                  :max="50"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
            </el-row>
            <el-row v-else style="text-align:center; margin-bottom: 15px;">
              <el-button
                type="primary"
                style="padding:10px 15px;margin-bottom:20px;"
                @click="dialogFormVisible = true"
              >添加规格</el-button>
              <el-table :data="foodForm.specs" class="specsBox">
                <el-table-column prop="specs" label="规格"></el-table-column>
                <el-table-column prop="packing_fee" label="包装费"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-form-item>
              <el-button type="primary" style="padding:10px 15px;">确定添加食品</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
          <el-form :model="specsForm" :rules="specsRules" label-width="110px">
            <el-form-item label="规格" prop="specs">
              <el-input v-model="specsForm.specs" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="包装费">
              <el-input-number v-model="specsForm.packing_fee" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="specsForm.price" :min="1" :max="50"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary">确定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "../common/headTop";
import { getCategory, addCategory, addFood } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurant_id: "",
      categoryForm: {
        categoryList: [
          { value: "猪肉", label: "猪肉" },
          { value: "牛肉", label: "牛肉" }
        ],
        category: "",
        foodName: "",
        description: ""
      },
      foodForm: {
        name: "",
        activity: "",
        description: "",
        imageUrl: "",
        attributes: [],
        specs: [
          {
            specs: "默认",
            packing_fee: 0,
            price: 20
          }
        ]
      },
      rules: {
        name: [{ required: true, message: "请输入食品名称" }]
      },
      foodSpecials: [
        { value: "绿色", label: "绿色" },
        { value: "健康", label: "健康" }
      ],
      showAddCategory: false,
      foodSpecs: "more", //食品规格
      dialogFormVisible: false, //添加规格弹出框控制符
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      specsRules: {
        specs: [{ required: true, message: "请输入规格" }]
      }
    };
  },
  components: {
    headTop
  },
  created() {
    console.log("----", this.$route);
    if (this.$route.query.restaurant_id) {
      this.restaurant_id = this.$route.query.restaurant_id;
    } else {
      this.restaurant_id = Math.ceil(Math.random()*10);
      console.log('res id',Math.ceil(Math.random()*10));
      this.$msgbox({
        title: "消息",
        message: "添加食品需要先选择商铺,现在就去选择商铺吗？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instace, done) => {
          if (action == "confirm") {
            this.$router.push('shopList');
            done();
          } else {
            this.$message({
              type: "info",
              message: "取消"
            });
            done();
          }
        }
      });
    }
  },
  methods: {
    // 显示或隐藏添加食品分类区域
    addCategoryFun() {
      this.showAddCategory = !this.showAddCategory;
      console.log("flag", this.showAddCategory);
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.foodForm.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        // this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin.less";
.form_header {
  text-align: center;
  margin-bottom: 10px;
}
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.el-select {
  display: block;
}
.category_select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.category_add_row {
  background: #f9fafc;
  overflow: hidden;
  height: 0;
  transition: all 400ms;
}
.show_edit {
  height: 185px;
}
.category_add {
  border: 1px solid #eaeefb;
  border-top: none;
  border-bottom: none;
  padding: 10px 30px 10px 10px;
  overflow: hidden;
  .btn_addCategory {
    text-align: center;
  }
}
.category_icon {
  text-align: center;
  line-height: 40px;
  border: 1px solid #eaeefb;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: none;
  transition: all 400ms;
  &:hover {
    background-color: #f9fafc;
    .edit_icon,
    span {
      color: #20a0ff;
    }
  }
  span {
    .sc(14px, #ccc);
    transition: all 400ms;
  }
  .edit_icon {
    color: #ccc;
    transition: all 400ms;
  }
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
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
.foodContent .el-select {
  display: inline-block;
}
.foodform {
  padding: 10px 10px 0;
  border: 1px solid #eaeefb;
  border-radius: 6px;
}

.specsBox {
  border: 1px solid #dfe6ec;
  border-bottom: none;
}
// .el-table td,
// .el-table th {
//   height: 40px;
//   padding: 0;
// }
// .el-table th {
//   background-color: #eef1f6;
// }
// .el-table td {
//   text-align: center;
// }
</style>