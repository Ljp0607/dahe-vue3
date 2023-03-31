<template>
  <div class="title">
    <img
      @click="navigatUpload"
      class="upload"
      src="https://imgcdn.dahebao.cn/20230317/20230317165246930108.png"
    />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { goLogin } from "@/common/appRoute";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
const router = useRouter();
const navigatUpload = () => {
  if (store.$state.userId == "") {
    goLogin();
  } else {
    router.push("carUpload");
  }
};
</script>
<style lang="less" scoped>
.title {
  width: 100vw;
  min-height: 1300px;
  background-image: url("https://imgcdn.dahebao.cn/20230317/20230317165148615103.jpeg");
  background-repeat: no-repeat;
  background-size: 100%;
  text-align: center;
  padding-top: 1046px;
  box-sizing: border-box;
  .upload {
    margin-top: 60px;
    width: 507px;
    height: 128px;
  }
}
</style>
