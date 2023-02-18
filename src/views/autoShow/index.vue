<template>
  <div class="content" v-show="!show">
    <Title :changeShow="changeShow" />
    <Tabs />
    <Footer />
  </div>
  <div class="popup" v-if="show" @click="show = false">
    <img src="https://imgcdn.dahebao.cn/20230215/20230215112125327651.jpeg" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Footer from "./components/footer.vue";
import Title from "./components/title.vue";
import Tabs from "./components/tabs.vue";
import getShare from "@/common/wx-share";
import Lottery from "@/api/Lottery";
components: {
  Title;
  Tabs;
  Lottery;
}
const show = ref<boolean>(false);
const changeShow = (e: boolean) => {
  show.value = e;
};
//二次分享
getShare(
  "大河收纳月",
  "线上收纳,让家更整洁!"
);
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  min-height: 100vh;
  background-color: #e6ae8d;
  box-sizing: border-box;
  padding-bottom: 100px;
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
