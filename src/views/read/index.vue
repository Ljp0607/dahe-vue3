<template>
  <div class="con-read">
    <Title />
    <Tabs  />
  </div>
</template>
<script setup lang="ts">
import Title from "./components/title.vue";
import Tabs from "./components/tabs.vue";
import getShare from "@/common/wx-share";
components: {
  Title;
  Tabs;
}
//二次分享
getShare(
  { type: 22, share_url: window.location.href },
  "中原家居超凡品牌榜",
  "2022中原家居超凡品牌榜由大河报·豫视频及河南广播电视台·都市频道主办，消费者认可，更值得信赖！"
);
</script>
<style lang="less" scoped>
.con-read {
  background: #fb8e4d;
}
</style>
