<template>
  <div class="container">
    <div v-if="state < 1" ref="coverRef" class="cover">
      <!-- <Cover :changeActive="changeActive" /> -->
    </div>
    <div v-if="state < 2" ref="firstRef" class="first" @click="clickFirst">
      <First :changeActives="changeActives" ref="firsts" />
    </div>
    <div v-if="state < 3" ref="secondRef" class="second">
      <Second ref="seconds" :clickSecond="clickSecond" />
    </div>
    <video
      id="videoPlay"
      ref="video"
      class="video"
      src="https://videofiles.dahebao.cn/5b199581vodcq1306441264/3783c350243791578431427323/caU6ktakGBYA.m4v"
      type="video/mp4"
    ></video>
  </div>
</template>
<script setup lang="ts">
import First from "./first.vue";
import Second from "./second.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import getShare from "@/common/wx-share";
components: {
  // Cover;
  First;
  Second;
}
const state = ref(0);
const coverRef = ref();
const firstRef = ref();
const secondRef = ref();
const firsts = ref();
const seconds = ref();
const video = ref<HTMLVideoElement | null>(null);
const router = useRouter();
//修改第一帧和第二帧状态
const changeActive = () => {
  coverRef.value.id = "unloads";
  setTimeout(() => {
    firsts.value.addText();
    if (state.value == 0) {
      state.value++;
    }
  }, 500);
};
//修改第二帧到第三帧
const changeActives = () => {
  firstRef.value.id = "unloads";
  setTimeout(() => {
    seconds.value.addText();
    if (state.value == 1) {
      state.value++;
    }
  }, 500);
};
//加速跳转
const clickFirst = () => {
  if (firsts.value.data.state) changeActives();
};
const clickSecond = () => {
  if (seconds.value.data.state) playVideo();
};
//控制视频播放
const playVideo = () => {
  //第二个页面消失,播放视频
  secondRef.value.id = "unloads";
  setTimeout(() => {
    video.value.play();
  }, 100);
};
onMounted(() => {
  const elevideo = document.getElementById("videoPlay");
  elevideo.addEventListener(
    "ended",
    function () {
      //结束
      router.push("action");
    },
    false
  );
  changeActive();
});
getShare(
  "信不信？咱们用锤子砸出一条天河！",
  "分享自@大河报*豫视频",
  "https://imgcdn.dahebao.cn/20230501/20230501184623337868.jpeg"
  // { type: 22, share_url: window.location.href },
);
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  .cover {
    z-index: 20;
    position: absolute;
  }
  .first {
    z-index: 10;
    position: absolute;
  }
  .second {
    z-index: 5;
    position: absolute;
  }
}

.video {
  object-position: center center;
  object-fit: fill;
  width: 100vw;
  height: 100vh;
}
#unloads {
  animation: unloads 2s;
  animation-fill-mode: both;
}
// 隐藏
@keyframes unloads {
  0% {
    opacity: 1;
  }
  80%,
  100% {
    opacity: 0;
  }
}
</style>
