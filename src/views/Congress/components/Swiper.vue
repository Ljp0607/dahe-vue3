<template>
  <swiper
    :loop="true"
    :centeredSlides="true"
    :slides-per-view="1.2"
    :space-between="15"
    :touchStartPreventDefault="true"
    :preventClicksPropagation="true"
    pagination
    @slideChange="changeItem"
    :autoplay="true"
    :navigation="{ nextEl: '.my-next-el', prevEl: '.my-prev-el' }"
  >
    <swiper-slide
      v-for="(item, index) in images"
      :key="index"
      @click="clickGo(index)"
    >
      <img :src="item.src" />
    </swiper-slide>
  </swiper>
  <div class="pagination">
    <div
      class="dot"
      v-for="item in 7"
      :key="item"
      :class="dot + 1 == item ? 'active' : 'dark'"
    ></div>
  </div>
  <span class="my-next-el arrows"
    ><van-icon color="#f5f5f5" size="40" name="arrow"
  /></span>
  <span class="my-prev-el arrows"
    ><van-icon color="#f5f5f5" size="40" name="arrow-left"
  /></span>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/css";
import { newsaction } from "../../../common/appRoute";
SwiperCore.use([Navigation, Autoplay]);
const images: any = reactive([
  {
    src: "https://imgcdn.dahebao.cn/20220930/20220930144406491519.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=517",
  },
  {
    src: "https://imgcdn.dahebao.cn/20220602/20220602095352407851.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=475",
  },
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151159933179.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=503",
  },
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151111802931.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=515",
  },
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151058746232.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=514",
  },
  {
    src: "https://imgcdn.dahebao.cn/20221010/20221010151127779194.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=512",
  },

  {
    src: "https://imgcdn.dahebao.cn/20221011/20221011185054885277.jpg",
    href: "https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=511",
  },
]);
const dot = ref<any>(0);
//跳转到专题
function clickGo(e: any) {
  const id = images[e].href.substr(-3);
  newsaction(
    10,
    `https://news.dahebao.cn/dahe/h5/wapsubdetail?subjectId=${id}`,
    id
  );
  // window.location.href = images[e].href;
}
//下方item
function changeItem(e: any) {
  dot.value = e.realIndex;
}
</script>
<style lang="less" scoped>
.swiper {
  width: 100vw;
  min-height: 280px;
  touch-action: none;
  touch-action: pan-y;
  .swiper-slide {
    box-sizing: border-box;
    img {
      width: 100%;
      height: 46.5vw;
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
  .dot {
    //	#DCDCDC
    // margin-left: 30px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    // background: #faffff;
    margin-right: 20px;
    margin-top: 20px;
  }
  .active {
    background: #fff;
    opacity: 1;
  }
  .dark {
    background-color: #f5f5f5;
    opacity: 0.5;
  }
}
.arrows {
  position: absolute;
  top: 24vw;
  transform: translateY(-50%);
  opacity: 0.4;
  z-index: 100;
}
.my-prev-el {
  left: 10%;
}
.my-next-el {
  right: 10%;
}
</style>
