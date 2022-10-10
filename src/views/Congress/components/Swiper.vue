<!-- <template>
    <van-swipe :width="325">
      <van-swipe-item ref="itemsRef"
        ><img src="http://152.136.144.141/picker/1.jpg"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="http://152.136.144.141/picker/1.jpg" alt=""
      /></van-swipe-item>
      <van-swipe-item
        ><img src="http://152.136.144.141/picker/1.jpg" alt=""
      /></van-swipe-item>
      <van-swipe-item ref="itemRef"
        ><img src="http://152.136.144.141/picker/1.jpg" alt=""
      /></van-swipe-item>
    </van-swipe>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
const itemRef = ref();
onMounted(() => {
  itemRef.value.$el.style.transform = "translateX(-1300px)";
});
</script>

<style lang="less" scoped>
// .content {
//   width: 100vw;
//   min-height: 350px;
//   overflow: hidden;
//   .swiper {
//     width: 2800px;
//     display: flex;
//     flex-wrap: nowrap;
//     .swiper-item {
//       width: 700px;
//       height: 350px;

//       img {
//         width: 100%;
//         height: 100%;
//         border-radius: 15px;
//       }
//     }
//   }
// }
.van-swipe {
  .van-swipe-item {
    float: left;
    left: 100px;
    height: 350px;
    box-sizing: border-box;
    padding: 10px 15px;
    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }
  }
}
</style> -->

<template>
  <swiper
    :loop="true"
    :centeredSlides="true"
    :slides-per-view="1.2"
    :space-between="15"
    :autoplay="true"
    pagination
  >
    <swiper-slide
      v-for="(item, index) in images"
      :key="index"
      @click="clickGo(index)"
    >
      <img :src="item.src" />
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
const images = reactive([
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151058746232.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=514",
  },
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151111802931.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=515",
  },
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151127779194.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=512",
  },
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151146621262.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=506",
  },
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151159933179.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=503",
  },
]);
function clickGo(e: any) {
  window.location.href = images[e].href;
}
</script>
<style lang="less" scoped>
.swiper {
  width: 100vw;
  min-height: 280px;
  .swiper-slide {
    box-sizing: border-box;
    img {
      width: 100%;
    }
  }
}
</style>
