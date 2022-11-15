<script lang="ts" setup>
import getShare from "../../common/wx-share";
import request from "../../api/news/index";
import { Toast } from "vant";
import "vant/es/toast/style";
import { reactive, ref, onMounted } from "vue";
import { getCurrentInstance } from "vue";
import axios from "axios";
import router from "../../router";
const headerRef = ref<HTMLElement | null>(null);
const $viewerApi =
  getCurrentInstance()?.appContext.config.globalProperties.$viewerApi;
const data: any = reactive({
  show: true,
  news: {},
});
function showImagesInViewer() {
  const HTMLCollection = document.getElementsByTagName("img");
  if (HTMLCollection.length > 1) {
    for (let i = 0; i < HTMLCollection.length - 1; i++) {
      HTMLCollection[i + 1].onclick = clickbutton;
    }
  }
}
function clickbutton(e: any) {
  $viewerApi({
    images: [e.target.currentSrc],
  });
}
//获取新闻详情
function getNews() {
  request
    .findNewsDetail({ news_id: router.currentRoute.value.query.news_id })
    .then((res: any) => {
      if (!res.news_id) {
        data.show = false;
        return;
      }
      data.news = res;
      if (headerRef.value)
        headerRef.value.innerHTML = res.news_content
          .replace(/<p>/g, "<div style='margin-top:15px'>")
          .replace(/<\/p>/g, "</div>")
          .replace(/<img/g, "<img style='max-width:100%'");
    })
    .then(() => {
      if (data.show) {
        showImagesInViewer();
        getImage();
        getShare({
          news_id: router.currentRoute.value.query.news_id,
          type: 3,
          share_url: data.news.news_url,
        });
      }
    });
}
//获取发表机构图片
function getImage() {
  axios({
    method: "post",
    url: "https://news.dahebao.cn/dahe/appsubscribenumber/subscribenumberdetailold",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      sign: "637586292ebf2c5fabab863734fc6a12",
      data: { communityId: data.news.community_id },
    },
  }).then((res: any) => {
    data.news.communityImg = res.data.banner.communityImg;
  });
}
onMounted(() => {
  if (router.currentRoute.value.query.news_id) getNews();
  else {
    data.show = false;
  }
  //二次分享
});
</script>
<template>
  <div class="content" v-if="data.show">
    <div class="title">{{ data.news.news_title }}</div>
    <div class="office">
      <img :src="data.news.communityImg" alt="" />
      <div class="source">
        <div class="name">{{ data.news.news_source }}</div>
        <div class="time">{{ data.news.news_create_time }}</div>
      </div>
    </div>
    <div class="header" ref="headerRef"></div>
    <div class="news_editor">
      来源: {{ data.news.news_source }} 编辑:{{ data.news.news_editor }}
    </div>

    <div class="praise" @click="Toast('请前往豫视频客户端点赞')"></div>
    <div class="number" @click="Toast('请前往豫视频客户端点赞')">
      {{ data.news.news_thumbs_up }}赞
    </div>
    <a
      target="_blank"
      href="https://news.dahebao.cn/appdownload/index.html?Type=100"
    >
      <div class="download"></div>
    </a>
    <div class="comment">
      <input class="input" type="text" placeholder="写评论..." />
      <button class="button" @click="Toast('请前往豫视频客户端发表评论')">
        发送
      </button>
    </div>
  </div>
  <div v-else class="error">
    <a
      target="_blank"
      href="https://news.dahebao.cn/appdownload/index.html?Type=100"
      ><img
        class="erroe_img"
        src="https://imgcdn.dahebao.cn/20221115/20221115112201798656.png"
      />
    </a>
    <div style="text-align: center">点击前往豫视频,查看更多新闻</div>
  </div>
</template>
<style lang="less" scoped>
.content {
  width: 750px;
  min-height: 100vh;
  padding: 10px 30px 50px 30px;
  box-sizing: border-box;
  .title {
    box-sizing: border-box;
    padding: 25px 0;
    align-items: center;
    background: #fff;
    font-size: 40px;
    font-weight: 500;
    color: #000;
  }
  .office {
    height: 64px;
    margin: 0px 0 50px 0;
    position: relative;
    img {
      display: inline-block;
      width: 64px;
      height: 64px;
      // margin-right: 16px;
      border-radius: 50%;
    }
    .source {
      position: absolute;
      top: 0;
      left: 80px;
      height: 64px;
      line-height: 32px;
      display: inline-block;
      .name {
        color: #262626;
        font-size: 14px;
      }
      .time {
        color: #9a9a9a;
        font-size: 12px;
      }
    }
  }
  .header {
    font-size: 32px;
    line-height: 56px;
    color: #262626;
    font-weight: 200;
  }
  .news_editor {
    color: #999ca0;
    font-size: 32px;
    font-weight: 200;
  }
  .praise {
    min-height: 80px;
    width: 80px;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 50px auto 10px;
    background-image: url("https://imgcdn.dahebao.cn/20221114/20221114205545693472.png");
  }
  .number {
    text-align: center;
    color: #4f5054;
    font-size: 24px;
    margin-bottom: 30px;
  }
  .download {
    margin-left: -30px;
    min-height: 305px;
    width: 750px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url("https://imgcdn.dahebao.cn/20220629/20220629150325994870.png/pc_1200");
  }
  .comment {
    background: #fff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 750px;
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .input {
      margin-left: 30px;
      padding-left: 20px;
      box-sizing: border-box;
      border: none;
      width: 500px;
      border-radius: 33px;
      height: 66px;
      background-color: #f8f8f8;
    }
    .button {
      border: none;
      width: 132px;
      height: 66px;
      border-radius: 33px;
      background: #0c5efc;
      color: #fff;
    }
  }
}
.error {
  width: 750px;
  min-height: 600px;
  .erroe_img {
    width: 100%;
  }
}
</style>
