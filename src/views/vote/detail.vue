<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { reactive } from "vue";
const store = useCounterStore();
interface dataType {
  img: string[];
}
const data = reactive<dataType>({
  img: [],
});
// 处理图片数据
function disData() {
  if (store.$state.detail.postsImg.indexOf(",") != -1) {
    data.img = store.$state.detail.postsImg.split(",");
  } else {
    data.img.push(store.$state.detail.postsImg);
  }
}
disData();
console.log(store.$state.detail);
</script>
<template>
  <div class="content">
    <header></header>
    <div class="title">河南新地标</div>
    <main>
      <!-- 如果有标题,展示详情 -->
      <div class="main_title" v-if="store.$state.detail.postsTitle">
        {{ store.$state.detail.postsTitle }}
      </div>
      <!--如果有视频,展示视频  -->
      <div class="video" v-if="store.$state.detail.postsVideo">
        <video controls autoplay>
          <source :src="store.$state.detail.postsVideo" type="video/mp4" />
        </video>
      </div>
      <!--如果有图片,展示图片  -->
      <div class="img" v-if="store.$state.detail.postsImg">
        <viewer>
          <van-swipe
            class="my-swipe"
            :autoplay="3000"
            indicator-color="#bce2d5"
          >
            <van-swipe-item v-for="(item, index) in data.img" :key="index">
              <img :src="item"
            /></van-swipe-item>
          </van-swipe>
        </viewer>
      </div>
    </main>
  </div>
</template>
<style lang="less" scoped>
.content {
  background: #bce2d5;
  width: 750px;
  box-sizing: border-box;
  padding-bottom: 50px;
  min-height: 100vh;
  header {
    width: 750px;
    height: 695px;
    background-image: url("https://imgcdn.dahebao.cn/20221130/20221130200720395972.png");
    background-size: 100%;
    background-repeat: no-repeat;
    text-align: center;
  }
  .title {
    margin: 0 auto;
    width: 702px;
    height: 162px;
    background: url("https://imgcdn.dahebao.cn/20221130/20221130152033757106.png");
    background-size: 100%;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 102px;
    color: #98f5ff;
    font-size: 50px;
  }
  main {
    background: #fff;
    width: 650px;
    margin: -45px auto 30px;
    border-radius: 0 0 30px 30px;
    min-height: 600px;
    padding-bottom: 50px;
    box-sizing: border-box;
    text-align: center;
    padding-top: 80px;
    // https://imgcdn.dahebao.cn/20221130/20221130152033757106.png

    .video {
      margin: 20px auto 50px;
      width: 600px;
      video {
        width: 100%;
      }
    }
    .img {
      width: 600px;
      height: 400px;
      margin: 0 auto;
      img {
        width: 600px;
        height: 400px;
      }
    }
  }
}
</style>
