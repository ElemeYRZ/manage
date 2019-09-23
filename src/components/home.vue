<template>
  <div>
    <head-top></head-top>
    <tendency></tendency>
  </div>
</template>

<script>
import headTop from "../common/headTop";
import tendency from "../common/tendency";
import qs from 'qs'
export default {
  data() {
    return {};
  },
  components: {
    headTop,
    tendency
  },
  created() {
    var httpUrl = global.httpUrl;
    console.log("httpUrl", httpUrl);
    
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
  }
};
</script>

<style lang="">
</style>