<template>
  <div class="manage_page fillcontain">
    <el-row style="height:100%;">
      <el-col :span="4" style="height:100%;background-color:#324057;">
        <el-menu
          style="min-height:100%;"
          background-color="#324057"
          text-color="#bfcbd9"
          active-text-color="#ffd04b"
          router
          :default-active="defaultActive"
        >
        <!-- default-active:所传值为菜单item的index值-->
        <!-- router:是否使用vue-router模式，启用该模式时会在激活导航时以index作为路由跳转 -->
          <el-menu-item index="manage">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>数据管理
            </template>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="shopList">商家列表</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-plus"></i>添加数据
            </template>
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>图表
            </template>
            <el-menu-item index="visitor">用户分布</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-edit"></i>编辑
            </template>
            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>设置
            </template>
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-warning"></i>说明
            </template>
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height:100%;overflow:auto">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function() {
      console.log("111", this.$route.path);
      var path =  this.$route.path;
      path = path.replace("/","");
      console.log('222',path);
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style lang="less" >
// 在修改elementui的样式时，若存在无法修改的情况，则去掉scoped。
@import "../style/mixin";
// 子菜单的背景色
.el-submenu .el-menu-item{
  background-color: #1f2d3d !important;
  min-width: 0;
}
// 侧边导航栏点击选中样式
.el-menu-item.is-active {
  color: #409eff !important;
}
// 侧边导航栏hover背景色
.el-menu-item:focus,.el-menu-item:hover{
  background-color: #48576a !important;
}
.el-submenu .el-submenu__title:hover{
  background-color: #48576a !important;
}
.el-submenu__title i{
  color: #bfcbd9;//修改图标的颜色
}

</style>