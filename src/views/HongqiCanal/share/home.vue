<template>
  <div>
    <img
      class="help1"
      src="https://imgcdn.dahebao.cn/20230110/20230110161735489917.png"
    />
    <img
      class="help2"
      src="https://imgcdn.dahebao.cn/20230110/20230110161751879613.png"
    />
    <div class="book" @click="navigetBook">点击生成荣誉证书</div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
interface dataType {}
const router = useRouter();
const data = reactive<dataType>({});
const navigetPicker = () => {
  router.push("credential");
};
const navigetBook = () => {
  router.push("profile");
};
</script>
<style lang="less" scoped>
.help1 {
  margin-top: 138px;
  width: 488px;
}
.help2 {
  margin-top: 56px;
  width: 486px;
}
div {
  margin: 0 auto;
  font-weight: 600;
  font-size: 32px;
  height: 81px;
  line-height: 81px;
  background-size: 100% 100%;
  color: #c2181a;
}
.book {
  width: 437px;
  margin-top: 176px;
  background-image: url("https://imgcdn.dahebao.cn/20221228/20221228184820496462.png");
}
</style>
