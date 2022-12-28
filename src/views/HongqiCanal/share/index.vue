<template>
  <div class="content">
    <div class="main">
      <img
        class="title"
        src="https://imgcdn.dahebao.cn/20221228/20221228184736881625.png"
      />
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import { reactive } from "vue";
interface dataType {}
const data = reactive<dataType>({});
</script>
<style lang="less" scoped>
.content {
  background-image: url("https://imgcdn.dahebao.cn/20221228/20221228184422754439.png");
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  padding-top: 172px;
  box-sizing: border-box;
  .main {
    margin: 0 auto;
    background-image: url("https://imgcdn.dahebao.cn/20221228/20221228184433720617.png");
    background-size: 100%;
    width: 600px;
    min-height: 1060px;
    text-align: center;
    .title {
      width: 468px;
      margin-top: 62px;
    }
  }
}
</style>
