<template>
  <div class="content">
    <div ref="textRef" class="text">{{ data.text }}</div>
    <div class="picker">
      <img
        class="first"
        ref="firstRef"
        src="https://imgcdn.dahebao.cn/20221227/20221227220018576791.png"
      /><img
        class="second"
        ref="secondRef"
        src="https://imgcdn.dahebao.cn/20221227/20221227220033219255.png"
      /><img
        class="third"
        ref="thirdRef"
        src="https://imgcdn.dahebao.cn/20221227/20221227220051557397.png"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
interface dataType {
  content: string;
  text: string;
  time: number;
}
const data = reactive<dataType>({
  time: 0,
  content: "1960年代 河南林州地区十年九旱。 人民生活、生产受到严重威胁。",
  text: "",
});
const firstRef = ref();
const secondRef = ref();
const thirdRef = ref();
const textRef = ref();
//初始定时器增加文字
const addText = () => {
  const addTime = setInterval(() => {
    if (data.text.length < 33) {
      data.text = data.text + data.content.substring(data.time, data.time + 1);
      data.time++;
    } else {
      clearInterval(addTime);
      textRef.value.id = "upload";
      setTimeout(() => {
        addStyle();
      }, 2000);
    }
  }, 300);
};
// 三张图片增加样式
const addStyle = () => {
  firstRef.value.id = "first_btn";
  secondRef.value.id = "second_btn";
  thirdRef.value.id = "third_btn";
};

defineExpose({
  addText,
});
</script>
<style lang="less" scoped>
.content {
  width: 750px;
  min-height: 100vh;
  background: url("https://imgcdn.dahebao.cn/20221227/20221227204954817695.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top: 130px;
  position: relative;
  .text {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 4rem;
    height: 25rem;
    font-size: 45px;
    letter-spacing: 3px;
    writing-mode: vertical-rl;
    color: #95141d;
    font-weight: 900;
    white-space: pre-wrap;
    -webkit-text-stroke: 2px #fff;
    z-index: 10;
  }
  .picker {
    position: absolute;
    z-index: 5;
    text-align: center;
  }
  img {
    width: 650px;
  }
  .first {
    opacity: 0;
  }
  .second {
    opacity: 0;
    margin-top: -160px;
  }
  .third {
    opacity: 0;
    margin-top: -35px;
  }
  #first_btn {
    animation: start 6s;
    animation-fill-mode: both;
  }
  #second_btn {
    animation: start 36s;
    animation-fill-mode: both;
  }
  #third_btn {
    animation: start 96s;
    animation-fill-mode: both;
  }
}

@keyframes start {
  0% {
    opacity: 0;
  }
  20%,
  100% {
    opacity: 1;
  }
}
#upload {
  animation: upload 10s;
  animation-fill-mode: both;
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
