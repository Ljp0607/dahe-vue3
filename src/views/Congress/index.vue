<!-- 二十大 -->
<template>
  <div class="container">
    <div class="title">
      <img
        class="text"
        src="https://imgcdn.dahebao.cn/20221010/20221010150218733554.png"
        alt=""
      />
    </div>
    <header>
      <Swiper />
    </header>
    <main>
      <div class="box" v-for="(item, index) in data.item" :key="index">
        <div class="box_title"><img :src="column[index]" alt="" /></div>
        <div class="item">
          <div
            class="item_image"
            v-for="(items, indexs) in item"
            :key="indexs"
            @click="navigetNews(indexs)"
          >
            <img :src="items.img" alt="" />
            <div class="text">{{ items.title }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import Swiper from "./components/Swiper.vue";
import { goPosts, cailingaction, newsaction } from "../../common/appRoute";
import axios from "axios";
components: {
  Swiper;
}
const column = reactive([
  "https://imgcdn.dahebao.cn/20221010/20221010171947436030.jpg",
  "https://imgcdn.dahebao.cn/20221010/20221010172713171424.png",
]);
const data: any = reactive({
  item: [[], [], [], [], [], [], [], []],
});
function getInfo(id: number) {
  axios({
    url: `http://152.136.144.141:8080/dahe/appActivityNews/getNewsInfo`,
    method: "GET",
    params: {
      type: id,
    },
  }).then((res) => {
    console.log(res.data.data);
    if (res.data.data.length != 0) {
      let sum = res.data.data[0].infoType;
      for (let i of res.data.data) {
        data.item[sum - 1].push(i);
      }
    }
    console.log(data.item);

    // console.log(res.data.data);
  });
}
const scrollTop = () => {
  let scroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (scroll > 10) {
    getInfo(2);
    getInfo(3);
    getInfo(4);
    getInfo(5);
    getInfo(6);
    getInfo(7);
    getInfo(8);
    window.removeEventListener("scroll", scrollTop, true);
  }
};
function navigetNews(e: any) {}
window.addEventListener("scroll", scrollTop, true);
onMounted(() => {
  getInfo(1);
});
</script>
<!-- 2001 1126 -->
<style lang="less" scoped>
.container {
  width: 100vw;
  min-height: 4673px;
  background-image: url("https://imgcdn.dahebao.cn/20221010/20221010145147673512.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 85px;
  .title {
    width: 100vw;
    min-height: 1260px;
    background-image: url("https://imgcdn.dahebao.cn/20221010/20221010145227767282.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    position: relative;
    // box-sizing: border-box;
    .text {
      position: absolute;
      left: 35px;
      bottom: 124px;
      width: 690px;
    }
  }
  header {
    margin-top: -85px;
    margin-bottom: 64px;
  }

  main {
    .box {
      width: 750px;
      min-height: 300px;
      .box_title {
        text-align: center;
        // margin: 30px 0;
        img {
          width: 422px;
        }
      }
      .item {
        // margin: 0 auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .item_image {
          width: 345px;
          height: 292px;
          margin-left: 20px;
          margin-bottom: 30px;
          background-image: url("https://imgcdn.dahebao.cn/20221010/20221010162051500676.png");
          background-size: 100% 100%;
          img {
            width: 100%;
            height: 195px;
          }
          .text {
            width: 90%;
            height: 80px;
            line-height: 40px;
            font-size: 28px;
            margin: 0 auto;
            overflow: hidden;
            text-overflow: ellipsis; //当对象内文本溢出时显示省略标记
            display: -webkit-box;
            -webkit-line-clamp: 2; //这边的2指的是两行
            -webkit-box-orient: vertical;
          }
        }
        .video {
          width: 40vw;
          height: 30vw;
          background: #ffefd5;
          video {
            width: 40vw;
            height: 30vw;
          }
        }
      }
    }
  }
}
</style>
