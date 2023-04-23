<template>
  <div class="content" @click="navigetMp4">
    <img
      src="https://imgcdn.dahebao.cn/20230110/20230110151659275127.png"
      class="textIn"
      ref="textRef"
    />
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
    <div class="btnvi" ref="clickRef">点击参与</div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
interface dataType {
  state: boolean;
}
const data = reactive<dataType>({
  state: false,
});
interface Props {
  clickSecond: Function;
}
const props = defineProps<Props>();
const firstRef = ref();
const secondRef = ref();
const thirdRef = ref();
const textRef = ref();
const foreRef = ref();
const clickRef = ref();
const navigetMp4 = () => {
  props.clickSecond();
};
const addText = () => {
  textRef.value.id = "img_btn";
  addStyle();
};
// 三张图片增加样式
const addStyle = () => {
  firstRef.value.id = "first_btn";
  setTimeout(() => {
    secondRef.value.id = "second_btn";
  }, 500);
  setTimeout(() => {
    thirdRef.value.id = "third_btn";
  }, 1000);
  setTimeout(() => {
    foreRef.value.id = "fore";
    clickRef.value.id = "first_btn";
    data.state = true;
  }, 2000);
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
  .textIn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 142px;
    z-index: 10;
    opacity: 0;
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
.btnvi {
  opacity: 0;
  position: fixed;
  bottom: 60px;
  font-size: 35px;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
}

#first_btn {
  animation: start 3s;
  animation-fill-mode: both;
}
#second_btn {
  animation: start 3s;
  animation-fill-mode: both;
}
#third_btn {
  animation: start 3s;
  animation-fill-mode: both;
}
#fore {
  animation: start 3s;
  animation-fill-mode: both;
}
#img_btn {
  animation: startupload 10s;
  animation-fill-mode: both;
}

@keyframes startupload {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
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
