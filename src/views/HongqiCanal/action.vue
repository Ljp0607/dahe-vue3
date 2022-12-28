<template>
  <!--  -->
  <div class="content">
    <div v-if="active" class="bg" ref="bgRef">
      <img
        class="contion"
        src="https://imgcdn.dahebao.cn/20221228/20221228131756225222.png"
      />
      <div class="startClick" @click.stop="startClick">点击开凿隧道</div>
    </div>
    <div class="action" ref="actionRef">
      <img
        class="hammer"
        ref="contentRef"
        src="https://imgcdn.dahebao.cn/20221228/20221228131931414997.png"
      />
      <img
        @click="getMouseXY"
        class="dot a"
        src="https://imgcdn.dahebao.cn/20221228/20221228152500157410.png"
      />
      <img
        @click="getMouseXY"
        class="dot aa"
        src="https://imgcdn.dahebao.cn/20221228/20221228152500157410.png"
      />
      <img
        @click="getMouseXY"
        class="dot aaa"
        src="https://imgcdn.dahebao.cn/20221228/20221228152500157410.png"
      />
      <img
        @click="getMouseXY"
        class="dot aaaa"
        src="https://imgcdn.dahebao.cn/20221228/20221228152500157410.png"
      />
      <img
        @click="getMouseXY"
        class="dot aaaaa"
        src="https://imgcdn.dahebao.cn/20221228/20221228152500157410.png"
      />
      <div ref="mainRef" class="main">
        <div v-if="data.distance != 0">距开凿成功还有</div>
        <div v-else>开凿成功!!</div>
        <div class="line">
          <div class="fill" ref="fillRef"></div>
          <div v-show="data.distance != 0">{{ data.distance }}米</div>
        </div>
      </div>
    </div>
    <div class="scener" ref="scenerRef">
      <img
        class="bg1"
        v-show="time == 0"
        ref="bg1Ref"
        src="https://imgcdn.dahebao.cn/20221228/20221228142218225338.jpeg"
      />
      <img
        v-show="time == 1"
        class="bg2"
        ref="bg2Ref"
        src="https://imgcdn.dahebao.cn/20221228/20221228142231498401.jpeg"
      />
      <img
        v-show="time == 2"
        class="bg3"
        ref="bg3Ref"
        src="https://imgcdn.dahebao.cn/20221228/20221228142240480131.jpeg"
      />
      <img
        v-show="time == 3"
        class="bg4"
        ref="bg4Ref"
        src="https://imgcdn.dahebao.cn/20221228/20221228142248665246.jpeg"
      />
      <img
        class="bg5"
        ref="bg1Ref"
        src="https://imgcdn.dahebao.cn/20221228/20221228142257263533.jpeg"
      />
    </div>
    <div class="over">
      <img
        src="https://imgcdn.dahebao.cn/20221228/20221228171454347603.jpeg"
        alt=""
      />
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
const active = ref(true);
const bgRef = ref();
const scenerRef = ref();
const loading = ref(true);
const contentRef = ref();
const fillRef = ref();
const actionRef = ref();
const time = ref(0);
const getMouseXY = (e: any) => {
  e.target.style.opacity = 0;
  //下方变化
  if (data.distance > 0) {
    data.distance = data.distance - 112;
    fillRef.value.style.width = `${560 - data.distance}px`;
    //锤子动画
    contentRef.value.style.opacity = 1;
    contentRef.value.style.position = "absolute";
    contentRef.value.style.top = `${e.pageY - 10}px`;
    contentRef.value.style.left = `${e.pageX - 5}px`;
    contentRef.value.id = "img";
  }
  if (data.distance == 112) {
    setTimeout(() => {
      actionRef.value.id = "upload";
      const timer = setInterval(() => {
        if (time.value != 5) {
          time.value++;
        } else {
          clearInterval(timer);
          scenerRef.value.id = "upload";
          // setTimeout(() => {
          // }, 500);
        }
      }, 2000);
    }, 2000);
  }
  setTimeout(() => {
    contentRef.value.style.opacity = 0;
  }, 1200);
};
//开始
const startClick = () => {
  bgRef.value.id = "upload";
  //卸载第一个页面
  setTimeout(() => {
    active.value = false;
  }, 3000);
};
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100vh;
  position: relative;
  text-align: center;
  .bg {
    background: #31c5f0;
    background-image: url("https://imgcdn.dahebao.cn/20221228/20221228131604418778.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    position: absolute;
    left: 0;
    top: 0;
  }
  .action {
    background: #31c5f0;
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-image: url("https://imgcdn.dahebao.cn/20221228/20221228131604418778.png");
    background-size: 100% 100%;

    .dot {
      position: absolute;
      width: 60px;
      height: 60px;
    }
    .a {
      top: 800px;
      left: 220px;
    }
    .aa {
      top: 1000px;
      left: 120px;
    }
    .aaa {
      top: 900px;
      left: 400px;
    }
    .aaaa {
      top: 600px;
      left: 400px;
    }
    .aaaaa {
      top: 750px;
      left: 550px;
    }
  }
  .scener {
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
    .bg1 {
      z-index: 10;
    }
    .bg2 {
      z-index: 9;
    }
    .bg3 {
      z-index: 8;
    }
    .bg4 {
      z-index: 7;
    }
    .bg5 {
      z-index: 6;
    }
  }
  .over {
    width: 100vw;
    height: 100vh;
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 750px;
      height: 100vh;
    }
  }

  #upload {
    animation: upload 5s;
    animation-fill-mode: both;
  }
  @keyframes upload {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  .contion {
    margin-top: 449px;
    width: 494px;
  }
  .hammer {
    opacity: 0;
    z-index: 100;
    width: 112px;
    // left: 50%;
    // transform: translate(-50%);
    // top: 500px;
  }
  .startClick {
    z-index: 100;
    margin: 166px auto;
    box-shadow: 0px 0px 0px 2px #000;
    width: 395px;
    height: 83px;
    background: #fb6740;
    color: #fff;
    font-size: 35px;
    line-height: 83px;
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
      align-items: center;
      .fill {
        height: 100%;
        border-radius: 30px;
        background: #ff9341;
        animation-iteration-count: 1;
        animation-fill-mode: both;
      }
    }
  }
}
</style>
