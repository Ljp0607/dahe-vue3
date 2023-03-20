<template>
  <div class="title">
    <router-link to="/carUpload">
      <img
        class="upload"
        src="https://imgcdn.dahebao.cn/20230317/20230317165246930108.png"
    /></router-link>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
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
