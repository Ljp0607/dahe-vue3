<template>
  <div class="con-read">
    <Title />
    <Tabs />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Title from "./components/title.vue";
import Tabs from "./components/tabs.vue";
import getShare from "@/common/wx-share";
components: {
  Title;
  Tabs;
}
const data = ref<string>();
//二次分享
getShare(
  "我是阅读推荐官",
  "“悦读圆梦 向阳花开”书香助学，快来分享你的好书吧！",
  "https://imgcdn.dahebao.cn/20230526/20230526110830478707.png"
);
</script>
<style lang="less" scoped>
.con-read {
  padding-bottom: 50px;
  background: #eaad69;
}
</style>
