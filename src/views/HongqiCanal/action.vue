<template>
  <div class="content" @click="getMouseXY">
    <img ref="contentRef" src="@/assets/movie/chuizi.png" alt="" />
    <div class="main">
      <div>距开凿成功还有</div>
      <div class="line">
        <div class="fill" ref="fillRef"></div>
        <div v-show="data.distance != 0">{{ data.distance }}米</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
interface dataType {
  distance: number;
}
const data = reactive<dataType>({
  distance: 560,
});
const contentRef = ref();
const fillRef = ref();
const getMouseXY = (e: any) => {
  //锤子动画
  contentRef.value.style.opacity = 1;
  contentRef.value.style.position = "absolute";
  contentRef.value.style.top = `${e.layerY - 10}px`;
  contentRef.value.style.left = `${e.layerX - 5}px`;
  contentRef.value.id = "img";
  //下方变化
  if (data.distance > 0) {
    data.distance = data.distance - 112;
    fillRef.value.style.width = `${560 - data.distance}px`;
  }
  setTimeout(() => {
    contentRef.value.style.opacity = 0;
  }, 1200);
  //下方增加动画
};
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-image: url("@/assets/movie/WechatIMG555.jpeg");
  background-size: 100% 100%;
  position: relative;
  img {
    width: 100px;
    height: 100px;
  }
  #img {
    opacity: 0;
    animation: slide1 1s infinite;
  }
  @keyframes slide1 {
    0% {
      transform: rotateZ(0deg);
    }
    5% {
      transform: rotateZ(20deg);
    }
    10% {
      transform: rotateZ(0deg);
    }
    15% {
      transform: rotateZ(20deg);
    }
    20% {
      transform: rotateZ(0deg);
    }
    30% {
      transform: rotateZ(20deg);
    }
    40% {
      transform: rotateZ(0deg);
    }
    50% {
      transform: rotateZ(20deg);
    }
    60% {
      transform: rotateZ(0deg);
    }
    80% {
      transform: rotateZ(20deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
  .main {
    color: #fff;
    text-align: center;
    position: absolute;
    top: 76vh;
    left: 50%;
    transform: translate(-50%);
    .line {
      box-sizing: border-box;
      padding: 5px;
      width: 560px;
      height: 60px;
      border-radius: 30px;
      background: linear-gradient(#f9c998, #f5e1c0);
      display: flex;
      //   justify-content: center;
      align-items: center;
      .fill {
        // width: 100px;
        height: 100%;
        border-radius: 30px;
        background: #ff9341;
        animation: example 3s;
        animation-iteration-count: 1;
        animation-fill-mode: both;
      }
    }
  }
}
</style>
