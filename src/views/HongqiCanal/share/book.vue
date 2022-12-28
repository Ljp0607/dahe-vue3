<template>
  <img src="https://imgcdn.dahebao.cn/20221228/20221228191255237071.png" />
  <div>上传照片</div>
  <div>生成头像</div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
interface dataType {}
const data = reactive<dataType>({});
</script>
<style lang="less" scoped>
div {
  margin-right: 19px;
  margin-top: 143px;
  display: inline-block;
  color: #c2181a;
  width: 251px;
  font-weight: 600;
  height: 70px;
  line-height: 70px;
  background-image: url("https://imgcdn.dahebao.cn/20221228/20221228184820496462.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
img {
  display: block;
  margin: 0 auto;
  margin-top: 130px;
  width: 262px;
}
</style>
