<template>
  <div>
    <div class="image">
      <img class="bg1" src="../assets/01.png" alt="" />
      <img class="bg2" src="../assets/02.png" alt="" />
    </div>
    <div class="advocacy">我为河南代言</div>
    <div class="company">大河报·豫视频</div>
    <div class="enter">邀您入驻</div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import bg01 from "../assets/01.png";
import bg02 from "../assets/02.png";
const data = reactive({
  bg01: bg01,
  bg02: bg02,
});
</script>

<style lang="less" scoped>
.image {
  padding-top: 102px;
  margin: 0 56px 83px 48px;
  .bg1 {
    margin-right: 82px;
    width: 340px;
    height: 58px;
  }
  .bg2 {
    display: inline-block;
    width: 224px;
    height: 62px;
  }
}

.advocacy {
  font-size: 71px;
  font-weight: 400;
  margin-left: 57px;
  color: #ffffff;
  text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
  background: linear-gradient(180deg, #ffffff 16%, #b9ddfc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.company {
  font-size: 97px;
  font-weight: 800;
  color: #ffffff;
  margin-left: 54px;
  text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
  background: linear-gradient(180deg, #ffffff 16%, #b9ddfc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.enter {
  margin-left: 16px;
  font-size: 59px;
  color: #002054;
  width: 399px;
  height: 147px;
  line-height: 147px;
  text-align: center;
  background-image: url("../assets/03.png");
  background-size: 100%;
}
</style>
