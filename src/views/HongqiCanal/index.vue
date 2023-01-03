<template>
  <div class="container" @click="navigetClick">
    <div ref="coverRef" class="cover">
      <Cover :changeActive="changeActive" />
    </div>
    <div ref="firstRef" class="first">
      <First :changeActives="changeActives" ref="firsts" />
    </div>
    <div ref="secondRef" class="second">
      <Second
        ref="seconds"
        :changeNavite="changeNavite"
        :navigetClick="navigetClick"
      />
    </div>
    <div>
      <!-- <video :src="videoSrc" autoplay controls></video>
       -->
      <video
        ref="video"
        class="video-js vjs-default-skin"
        :width="390"
        :height="844"
      >
        <source ref="source" :src="videoSrc" />
      </video>
    </div>
  </div>
</template>
<script setup lang="ts">
import Cover from "./cover.vue";
import First from "./first.vue";
import Second from "./second.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
const coverRef = ref();
const firstRef = ref();
const secondRef = ref();
const firsts = ref();
const seconds = ref();
const video = ref();
const router = useRouter();
const navite = ref(false);
const videoSrc = ref(
  "https://videofiles.dahebao.cn/5b199581vodcq1306441264/591f61e5243791578143104023/ZC4JzvNcMD4A.mp4"
);
//修改第一帧和第二帧状态
const changeActive = () => {
  console.log(coverRef);

  coverRef.value.id = "unloads";
  setTimeout(() => {
    firsts.value.addText();
  }, 2000);
};
//修改第二帧到第三帧
const changeActives = () => {
  firstRef.value.id = "unloads";
  setTimeout(() => {
    seconds.value.addText();
  }, 2000);
};
const changeNavite = () => {
  navite.value = true;
};

const navigetClick = () => {
  // videoSrc.value =
  //   "";
  if (navite.value) {
    console.log("可以播放视频里");
    secondRef.value.id = "unloads";
    startVideo();
    //
  }
};
//动态增加视频
function changeVideo(e: string) {
  const myplayer = videojs(video.value);
  myplayer.src([
    {
      src: e,
    },
  ]);
}
//挂载视频
const startVideo = () => {
  videojs(
    video.value,
    {
      preload: "auto",
      // autoplay: true,
      language: "zh-CN",
      muted: true,
      bigPlayButton: true, //是否显示播放按钮
      controls: true, //播放控件
    },
    function () {
      this.on("ended", function () {
        console.log("播放结束了");
        router.push("action");
      });
    }
  );
};

onMounted(() => {});
</script>
<style lang="less" scoped>
.container {
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
#unloads {
  animation: unloads 3s;
  animation-fill-mode: both;
}
// 隐藏
@keyframes unloads {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
