<template>
  <div>
    <head-top></head-top>
    <tendency :sevenDay="sevenDay" :sevenDate="sevenDate"></tendency>
  </div>
</template>

<script>
import headTop from "../common/headTop";
import tendency from "../common/tendency";
import qs from "qs";
import dtime from "time-formater";
import {
  userCount,
  orderCount,
  getUserCount,
  getOrderCount,
  adminDayCount,
  adminCount
} from "@/api/getData";

import utils from '@/config/utils';

export default {
  data() {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenDay: [],
      sevenDate: [[], [], []]
    };
  },
  components: {
    headTop,
    tendency
  },
  created() {
    var httpUrl = global.httpUrl;
    console.log("httpUrl", httpUrl);
    // let url = httpUrl + '/parent/index/';
    // let data = {
    //   uid:66,
    //   page:1,
    //   leap:1
    // }
    // utils.httpRequest(url,data).then(res=>{
    //   console.log('rrrrrrrr',res);
    // })

    // let url = httpUrl + '/teacher/new_media/';
    // let aa = [{desc:'11',url:'https://img.weixin-qq.com.cn/smy/2019/1571046212047545.png'}];
    // let data = {
    //   tid:8,
    //   type:1,
    //   title:'1',
    //   medias:JSON.stringify(aa)
    // };
    // utils.httpRequest(url,data,'POST').then(res=>{
    //   console.log('rrrr',res);
    // })


    //get
    // this.$axios.get(httpUrl + '/parent/index/',{
    //     params:data
    // })
    // .then((res)=>{
    //     console.log('res',res);
    // })
    // post
    // this.$axios
    //   .post(httpUrl + "/teacher/new_media/", qs.stringify(data))
    //   .then(res => {
    //     console.log(res);
    //   });
  },
  mounted() {
    this.initData();
    for (let i = 6; i > -1; i--) {
          const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    }
    console.log('sevenDay',this.sevenDay);
    this.getSevenData();
  },
  methods: {
    async initData() {
      const today = dtime().format("YYYY-MM-DD");
      console.log("today", today);
      Promise.all([
        userCount(today),
        orderCount(today),
        adminDayCount(today),
        getUserCount(),
        getOrderCount(),
        adminCount()
      ])
        .then(res => {
          console.log("home--res", res);
          this.userCount = res[0].count;
          this.orderCount = res[1].count;
          this.adminCount = res[2].count;
          this.allUserCount = res[3].count;
          this.allOrderCount = res[4].count;
          this.allAdminCount = res[5].count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getSevenData(){
      const apiArr = [[],[],[]];
      this.sevenDay.forEach(item =>{
        apiArr[0].push(userCount(item));
        apiArr[1].push(orderCount(item));
        apiArr[2].push(adminDayCount(item));
      })
      const promiseArr = [...apiArr[0],...apiArr[1],...apiArr[2]];
      Promise.all(promiseArr).then(res=>{
        const resArr = [[],[],[]];
        res.forEach((item,index)=>{
          if(item.status == 1){
            resArr[Math.floor(index/7)].push(item.count)
          }
        })
        this.sevenDate = resArr;
        console.log('sevenDate',resArr);
      }).catch(err =>{
        console.log(err);
      })
    }
  }
};
</script>

<style lang="">
</style>