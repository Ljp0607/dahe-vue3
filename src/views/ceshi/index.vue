<template>
  <div><button @click="getclick">点击获取</button></div>
</template>
<script setup>
import Axios from "axios";
Axios.defaults.baseURL = "/api";

function getclick() {
  Axios.get(
    "/ajax/log/action?type=pic&uicode=20000391&fid=232152&act_code=4288&ext=&luicode=&t=1661767515919"
  ).then((res) => {
    console.log(res);
  });
  console.log(233);
}
</script>

<style lang="less" scoped></style>
