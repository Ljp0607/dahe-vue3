<template>
  <div @click="clickView">
    <RouterView />
    <div class="audio">
      <audio
        autoplay
        ref="myAudio"
        id="myAudio"
        src="https://imgcdn.dahebao.cn/audio/WANZG-audio.mp3"
        loop
      ></audio>
    </div>
    <div class="img" @click="clickAudio">
      <img
        ref="imgRef"
        id="noRotate"
        src="https://imgcdn.dahebao.cn/20230109/20230109153125248308.png"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
const myAudio = ref();
const play = ref(false);
const state = ref(true);
const imgRef = ref();
//播放或暂停音乐
const clickAudio = () => {
  if (play.value == false) {
    myAudio.value.play();
    play.value = true;
    imgRef.value.id = "rotate";
  } else {
    myAudio.value.pause();
    imgRef.value.id = "noRotate";
    play.value = false;
  }
};
const clickView = () => {
  if (state.value) {
    state.value = false;
    clickAudio();
  }
};
</script>
<style lang="less" scoped>
.img {
  z-index: 1000;
  position: absolute;
  right: 10px;
  top: 10px;
  img {
    width: 50px;
    height: 50px;
  }
  #rotate {
    animation: rotate 2s infinite;
    animation-timing-function: linear;
  }
}
@keyframes rotate {
  0% {
    transition-timing-function: linear;
    transform: rotate(0deg);
  }
  50% {
    transition-timing-function: linear;
    transform: rotate(180deg);
  }
  100% {
    transition-timing-function: linear;
    transform: rotate(360deg);
  }
}
</style>
