<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top:20px;">
      <el-col :span="12" :offset="4">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="100px"
          class="demo-formData"
        >
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="formData.phone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="description">
            <el-input v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="slogan">
            <el-input v-model="formData.slogan"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader v-model="formData.selectCategory" :options="categoryOptions"></el-cascader>
          </el-form-item>
          <el-form-item label="店铺特点">
            <span>蜂鸟专送</span>
            <el-switch v-model="formData.delivery"></el-switch>
            <span>品牌保证</span>
            <el-switch v-model="formData.logo"></el-switch>
          </el-form-item>
          <el-form-item label="配送费">
            <el-input-number v-model="formData.delivery_fee" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价">
            <el-input-number v-model="formData.orderPrice" :min="20"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-select
              placeholder="起始时间"
              v-model="formData.startTime"
              :picker-options="{
                  start:'08:00',
                  step:'00:15',
                  end:'21:00'
              }"
            ></el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="formData.endTime"
              :picker-options="{
                  start:'08:00',
                  step:'00:15',
                  end:'21:00',
                  minTime:formData.startTime
              }"
            ></el-time-select>
          </el-form-item>
          <el-form-item label="上传店铺头像">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠活动">
            <el-select v-model="formData.activity" clearable placeholder="请选择">
              <el-option
                v-for="item in activities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btn_submit">
            <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "../common/headTop";
export default {
  data() {
    return {
      formData: {
        name: "",
        address: "",
        phone: "",
        description: "",
        slogan: "",
        delivery: false,
        logo: true,
        delivery_fee: 5,
        orderPrice: 20,
        startTime: "",
        endTime: "",
        imageUrl: "",
        selectCategory: "",
        activity: ""
      },
      rules: {
        name: [{ required: true, message: "请输入店铺名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系电话" },
          { type: "number", message: "电话号码必须是数字" }
        ]
      },
      categoryOptions: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则"
            },
            {
              value: "",
              label: "一致"
            }
          ]
        },
        {
          value: "",
          label: "导航",
          children: [
            {
              value: "",
              label: "侧向导航"
            }
          ]
        }
      ],
      activities: [
        {
          value: "满减优惠",
          label: "满减优惠"
        },
        {
          value: "新用户立减",
          label: "新用户立减"
        },
        {
          value: "优惠大酬宾",
          label: "优惠大酬宾"
        }
      ]
    };
  },
  components: {
    headTop
  },
  methods: {
    //   上传图片
    handleAvatarSuccess(res, file) {
      this.formData.imageUrl = URL.createObjectURL(file.raw);
    },
    // 提交表单
    submitForm(data) {
      this.$refs[data].validate(async valid => {
        if (valid) {
          console.log("验证成功");
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查输入是否正确",
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="">
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
.btn_submit {
  text-align: center;
}
</style>