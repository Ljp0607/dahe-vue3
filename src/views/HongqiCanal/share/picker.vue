<template>
  <img
    class="bg1"
    src="https://imgcdn.dahebao.cn/20221228/20221228192100650877.png"
  />
  <input class="input" type="text" placeholder="请输入您的名字" />

  <img
    class="bg2"
    src="https://imgcdn.dahebao.cn/20221228/20221228192249800308.png"
  />
  <img
    class="bg3"
    src="https://imgcdn.dahebao.cn/20221228/20221228192300612866.png"
  />
  <div>一键分享</div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
interface dataType {}
const data = reactive<dataType>({});
</script>
<style lang="less" scoped>
.bg1 {
  margin-top: 83px;
  width: 468px;
}
.input {
  color: #e9c1c1;
  border-radius: 26px;
  width: 231px;
  height: 53px;
  line-height: 53px;
  position: absolute;
  left: 50%;
  box-sizing: border-box;
  padding: 0 20px;
  border: 2px solid #ffd297;
  transform: translate(-50%);
  background: #c2292b;
  top: 675px;
}
.bg2 {
  margin-top: 103px;
  width: 468px;
}
.bg3 {
  margin-top: 140px;
  width: 468px;
}
div {
  margin: 0 auto;
  margin-top: 92px;

  color: #c2181a;
  width: 251px;
  font-weight: 600;
  height: 70px;
  line-height: 70px;
  background-image: url("https://imgcdn.dahebao.cn/20221228/20221228184820496462.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
