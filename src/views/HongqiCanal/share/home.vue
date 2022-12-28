<template>
  <div>
    <img
      class="help"
      src="https://imgcdn.dahebao.cn/20221228/20221228184753845023.png"
    />
    <div class="photo" @click="navigetPicker">点击生成红旗渠专属头像</div>
    <div class="book" @click="navigetBook">点击生成荣誉证书</div>
    <!-- <img src="https://imgcdn.dahebao.cn/20221228/20221228184820496462.png" />
    <img src="https://imgcdn.dahebao.cn/20221228/20221228184820496462.png" /> -->
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
interface dataType {}
const router = useRouter();
const data = reactive<dataType>({});
const navigetPicker = () => {
  router.push("profile");
};
const navigetBook = () => {
  router.push("credential");
};
</script>
<style lang="less" scoped>
.help {
  margin-top: 125px;
  width: 477px;
}
div {
  margin: 0 auto;
  width: 437px;
  font-weight: 600;
  font-size: 32px;
  height: 81px;
  line-height: 81px;
  background-size: 100% 100%;
  color: #c2181a;
}
.photo {
  margin-top: 176px;
  background-image: url("https://imgcdn.dahebao.cn/20221228/20221228184820496462.png");
}
.book {
  margin-top: 37px;
  background-image: url("https://imgcdn.dahebao.cn/20221228/20221228184820496462.png");
}
</style>
