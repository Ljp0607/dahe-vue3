<template>
  <div class="content">
    <Title />
    <Tabs />
    <Lottery />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Title from "./components/title.vue";
import Tabs from "./components/tabs.vue";
import getShare from "@/common/wx-share";
import Lottery from "./components/lottery.vue";
components: {
  Title;
  Tabs;
  Lottery;
}
const show = ref<boolean>(false);
//二次分享
getShare("大河收纳月", "晒家居图赢礼品！赶快参与吧!");
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  min-height: 100vh;
  background: #274f8d;
  box-sizing: border-box;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.popup {
  left: 0;
  top: 0;
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  z-index: 10;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
