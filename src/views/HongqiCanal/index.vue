<template>
  <div class="container" @click="navigetClick">
    <div ref="coverRef" class="cover">
      <Cover :changeActive="changeActive" />
    </div>
    <div ref="firstRef" class="first">
      <First :changeActives="changeActives" ref="firsts" />
    </div>
    <div ref="secondRef" class="second">
      <Second ref="seconds" :changeNavite="changeNavite" :navigetClick="navigetClick" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Cover from "./cover.vue";
import First from "./first.vue";
import Second from "./second.vue";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
const coverRef = ref();
const firstRef = ref();
const firsts = ref();
const seconds = ref();
const router = useRouter();
const navite = ref(false);
//修改第一帧和第二帧状态
const changeActive = () => {
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
  if (navite.value) {
    router.push("action");
  }
};
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
