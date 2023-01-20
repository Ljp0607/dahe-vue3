<template>
  <div class="content">
    <Title />
    <Tabs />
    <Lottery />
  </div>
</template>
<script setup lang="ts">
import Title from "./components/title.vue";
import Tabs from "./components/tabs.vue";
import getShare from "@/common/wx-share";
import Lottery from "@/api/Lottery";
components: {
  Title;
  Tabs;
  Lottery;
}
//二次分享
getShare(
  { type: 22, share_url: window.location.href },
  "年度汽车榜",
  "2022年度河南汽车中榜,给你心里的汽车投票!"
);
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  min-height: 100vh;
}
</style>
