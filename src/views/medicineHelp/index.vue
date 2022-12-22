<template>
  <div class="content">
    <!-- <a href="tel:13526891802">拨打</a> -->
    <Title />
    <Tabs />
  </div>
</template>
<script setup lang="ts">
import Tabs from "./components/tabs.vue";
import Title from "./components/title.vue";
import getShare from "@/common/wx-share";

const naviget = (id: number) => {
  //如果无userId,判断环境,如果在微信,跳下载,如果浏览器环境,跳登录
};

//二次分享
getShare(
  { type: 22, share_url: window.location.href },
  "邻里互助共战疫情",
  "凝聚百姓力量，缓解买药难题，邻里守望相助，携手战胜疫情!"
);
</script>
<style lang="less" scoped>
.content {
  width: 750px;
  min-height: 100vh;
  padding-bottom: 20px;
  box-sizing: border-box;
  position: relative;
}
</style>
