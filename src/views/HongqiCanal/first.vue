<template>
  <div class="content">
    <img
      ref="imgRef"
      class="textIntrod"
      src="https://imgcdn.dahebao.cn/20230110/20230110150939181902.png"
    />
    <img
      ref="imgRef2"
      class="textIntrod2"
      src="https://imgcdn.dahebao.cn/20230110/20230110145127373217.png"
    />
    <div class="picker">
      <img
        class="first"
        ref="firstRef"
        src="https://imgcdn.dahebao.cn/20230103/20230103151922446602.png"
      /><img
        class="second"
        ref="secondRef"
        src="https://imgcdn.dahebao.cn/20221229/20221229184501309066.png"
      /><img
        class="third"
        ref="thirdRef"
        src="https://imgcdn.dahebao.cn/20230103/20230103151746522408.png"
      />
    </div>
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
  changeActives: Function;
}
const props = defineProps<Props>();
const firstRef = ref();
const secondRef = ref();
const thirdRef = ref();
const imgRef = ref();
const imgRef2 = ref();
//添加字体
const addText = () => {
  imgRef.value.id = "img_btn";
  setTimeout(() => {
    addStyle();
  }, 2000);
};
// 三张图片增加样式
const addStyle = () => {
  firstRef.value.id = "first_btn";
  imgRef2.value.id = "imgRef2_btn";
  setTimeout(() => {
    secondRef.value.id = "second_btn";
  }, 500);
  setTimeout(() => {
    thirdRef.value.id = "third_btn";
  }, 1000);
  setTimeout(() => {
    props.changeActives();
  }, 3000);
};

defineExpose({
  data,
  addText,
});
</script>
<style lang="less" scoped>
.content {
  width: 750px;
  min-height: 100vh;
  background: url("https://imgcdn.dahebao.cn/20221229/20221229183642805385.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding-top: 130px;
  position: relative;
  .textIntrod {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 55px;
    z-index: 10;
    opacity: 0;
  }
  .textIntrod2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 55px;
    z-index: 10;
    opacity: 0;
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
  #img_btn {
    animation: startupload 4s;
    animation-fill-mode: both;
  }
  #imgRef2_btn {
    animation: start 6s;
    animation-fill-mode: both;
  }
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
