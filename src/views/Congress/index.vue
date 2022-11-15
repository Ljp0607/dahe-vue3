<!-- 二十大 -->
<template>
  <div class="container">
    <!-- 头部标题 -->
    <div class="title">
      <img
        class="text"
        src="https://res-1306441264.cos.ap-beijing.myqcloud.com/20221010/20221010150218733554.png"
      />
    </div>
    <!-- 轮播控件 -->
    <header>
      <Swiper />
    </header>
    <main>
      <!-- 每一个标题item -->
      <div class="box" v-for="(item, index) in data.item" :key="index">
        <div v-if="item.length" class="box_title">
          <img :src="column[index]" alt="" />
        </div>
        <div class="items">
          <!-- 每一个小item -->
          <div
            class="item"
            v-for="(items, indexs) in item"
            :key="indexs"
            @click="navigetNews(items)"
          >
            <img class="item_img" :src="items.img" />
            <div class="text">{{ items.title }}</div>
            <!-- 播放按钮 -->
            <img
              v-if="items.actionType == 2"
              class="item_start"
              src="https://imgcdn.dahebao.cn/20221011/20221011094515515822.png"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import Swiper from "./components/Swiper.vue";
import { cailingaction, newsaction } from "../../common/appRoute";
import axios from "axios";
components: {
  Swiper;
}
const headerRef = ref<HTMLElement | null>(null);

//每个小项标题
const column = reactive([
  "https://imgcdn.dahebao.cn/20221010/20221010194655549532.png",
  "https://imgcdn.dahebao.cn/20221010/20221010194729763433.png",
  "https://imgcdn.dahebao.cn/20221010/20221010194802590431.png",
  "https://imgcdn.dahebao.cn/20221010/20221010194822250349.png",
  "https://imgcdn.dahebao.cn/20221010/20221010194857313337.png",
  "https://imgcdn.dahebao.cn/20221010/20221010194916375971.png",
  "https://imgcdn.dahebao.cn/20221010/20221010194936376098.png",
  "https://imgcdn.dahebao.cn/20221011/20221011185842474491.png",
]);
const data: any = reactive({
  item: [[], [], [], [], [], [], [], []],
  sum: 101,
});
//获取视频和文本
function getInfo(id: number) {
  axios({
    url: `https://news.dahebao.cn/dahe/appActivityNews/getNewsInfo`,
    method: "GET",
    params: {
      type: id,
    },
  })
    .then((res) => {
      if (res.data.data.length != 0) {
        let sum = res.data.data[0].infoType % 100;
        for (let i of res.data.data) {
          data.item[sum - 1].push(i);
        }
      }
    })
    .then(() => {
      if (data.sum < 108) {
        data.sum++;
        getInfo(data.sum);
      }
    });
}
//获取视频详细数据发送给客户端
function getdata(id: string) {
  axios({
    // url: "http://152.136.144.141:8080/dahe/appshortvideo/getAppVideoDetails",
    url: "http://api.daheapp.com/dahe/appshortvideo/getAppVideoDetails",
    method: "POST",
    params: {
      data: JSON.stringify({
        msId: id,
      }),
    },
  }).then((res) => {
    cailingaction(JSON.stringify(res.data.data));
  });
}
//跳转文本或视频
function navigetNews(e: any) {
  if (e.actionType == 1) {
    newsaction(4, e.linkUrl + `?newsId=${e.newsId}`, e.newsId);
  } else if (e.actionType == 2) {
    getdata(e.newsId);
  } else {
    newsaction(4, e.linkUrl + `?newsId=${e.newsId}`, e.newsId);
  }
}
//定时器依次取文本或视频
// function setInt() {
//   // let sum: number = 101;
//   // let timer = setInterval(() => {
//   //   if (sum > 108) {
//   //     clearInterval(timer);
//   //   } else {
//   //     getInfo(sum);
//   //     sum++;
//   //   }
//   // }, 50);
// }
onMounted(() => {
  // setInt();
  getInfo(101);
});
</script>
<style lang="less" scoped>
.container {
  width: 750px;
  min-height: 1673px;
  // #9D2413 #FF8046 #BF3F22
  // background: radial-gradient(#ff8046, #9d2413);
  background-image: url("https://imgcdn.dahebao.cn/20221010/20221010145147673512.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 85px 0;

  .title {
    width: 100vw;
    min-height: 1260px;
    background-image: url("https://imgcdn.dahebao.cn/20221010/20221010145227767282.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    position: relative;
    .text {
      position: absolute;
      left: 35px;
      bottom: 124px;
      width: 690px;
    }
  }
  header {
    margin-top: -85px;
    margin-bottom: 44px;
    position: relative;
  }

  main {
    .box {
      width: 750px;
      .box_title {
        text-align: center;
        img {
          width: 422px;
        }
      }
      .items {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .item {
          width: 345px;
          height: 292px;
          margin-left: 20px;
          margin-bottom: 30px;
          background-image: url("https://imgcdn.dahebao.cn/20221010/20221010162051500676.png");
          background-size: 100% 100%;
          position: relative;
          .item_img {
            width: 100%;
            height: 195px;
          }
          .item_start {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 37px;
            width: 120px;
            // height: 120px;
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
