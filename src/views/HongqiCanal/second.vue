<template>
  <div class="content">
    <div ref="textRef" class="text">{{ data.text }}</div>
    <img
      class="one bg"
      src="https://imgcdn.dahebao.cn/20230103/20230103151644234757.png"
    />
    <img
      class="one bg"
      src="https://imgcdn.dahebao.cn/20230103/20230103152155571743.png"
    />
    <img
      class="three bg"
      src="https://imgcdn.dahebao.cn/20221229/20221229184218914558.png"
      alt=""
    />
    <img
      ref="firstRef"
      class="first bg"
      src="https://imgcdn.dahebao.cn/20221227/20221227225731176565.png"
    />
    <img
      class="second bg"
      ref="secondRef"
      src="https://imgcdn.dahebao.cn/20221227/20221227225742380890.png"
    />
    <img
      class="third bg"
      ref="thirdRef"
      src="https://imgcdn.dahebao.cn/20221227/20221227225751397581.png"
    />
    <img
      class="fore bg"
      ref="foreRef"
      src="https://imgcdn.dahebao.cn/20221227/20221227225801159933.png"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
interface dataType {
  content: string;
  text: string;
  time: number;
  state: boolean;
}
const data = reactive<dataType>({
  time: 0,
  content: "英勇的林县人民决定开凿一条干渠， 彻底改变缺水状况。",
  text: "",
  state: false,
});
interface Props {
  playVideo: Function;
}
const props = defineProps<Props>();
const firstRef = ref();
const secondRef = ref();
const thirdRef = ref();
const textRef = ref();
const foreRef = ref();
const addText = () => {
  addStyle();
  const addTime = setInterval(() => {
    if (data.text.length < 26) {
      data.text = data.text + data.content.substring(data.time, data.time + 1);
      data.time++;
    } else {
      data.state = true;
      clearInterval(addTime);
      setTimeout(() => {
        props.playVideo();
      }, 10000);
    }
  }, 250);
};
// 三张图片增加样式
const addStyle = () => {
  firstRef.value.id = "first_btn";
  secondRef.value.id = "second_btn";
  thirdRef.value.id = "third_btn";
  foreRef.value.id = "fore";
};
//暴露属性
defineExpose({
  addText,
  data,
});
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-image: url("https://imgcdn.dahebao.cn/20230103/20230103151523980620.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  padding-top: 100px;
  box-sizing: border-box;
  .text {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 4rem;
    height: 800px;
    font-size: 45px;
    letter-spacing: 3px;
    writing-mode: vertical-rl;
    color: #95141d;
    font-weight: 900;
    white-space: pre-wrap;
    text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
      2px 2px 0 #fff;
    z-index: 10;
  }
  .bg {
    position: absolute;
  }
  .one {
    width: 750px;
    bottom: 860px;
    left: 0;
  }
  .three {
    width: 750px;
    bottom: 0;
    left: 0;
  }
  .first {
    width: 482px;
    bottom: 241px;
    left: 219px;
    opacity: 0;
  }
  .second {
    opacity: 0;

    width: 342px;
    bottom: 452px;
    left: 54px;
  }
  .third {
    opacity: 0;

    left: 0;
    bottom: 0;
    width: 750px;
  }
  .fore {
    opacity: 0;

    width: 575px;
    bottom: 416px;
    left: 166px;
  }
}
#first_btn {
  animation: start 6s;
  animation-fill-mode: both;
}
#second_btn {
  animation: start 18s;
  animation-fill-mode: both;
}
#third_btn {
  animation: start 30s;
  animation-fill-mode: both;
}
#fore {
  animation: start 52s;
  animation-fill-mode: both;
}

@keyframes start {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes upload {
  0% {
    opacity: 1;
  }
  80%,
  100% {
    opacity: 0;
  }
}
</style>
