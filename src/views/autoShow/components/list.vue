<template>
  <div class="main" v-if="props.info.length > 0">
    <div v-for="(item, index) in props.info" :key="index" class="item">
      <img
        :src="JSON.parse(item.postsImg)[0].imgUrl + '/pc_600'"
        :alt="item.postsTitle"
        @click="navigetDetail(item.postsId)"
      />
      <div class="hotdata">
        <span>人气值:</span>
        <span>{{ item.hotData }}</span>
      </div>
      <button v-if="item.ifThumb != 1" @click="postst(index)">为TA投票</button>
      <button v-else @click="postst(index)">已投票</button>
    </div>
  </div>
  <div v-else class="empty">
    <img src="https://imgcdn.dahebao.cn/20221027/20221027113957273185.png" />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import { Toast } from "vant";
import setting from "@/common/setting";
import { poststhumbup } from "@/api/autoShow/index";
import { goLogin, goPosts } from "@/common/appRoute";
const store = useCounterStore();
interface Props {
  info?: Array<{
    activityNo: string;
    creatorType: number;
    hotData: number;
    postsId: number;
    postsImg: string;
    postsThumbUpNum: number;
    postsTitle: string;
    postsVideo: string;
    postsVideoImg: string;
    userName: string;
    ifThumb: number;
  }>;
}
const props = defineProps<Props>();
//投票
function postst(index: number) {
  //如果无userId,判断环境,如果在微信,跳下载,如果浏览器环境,跳登录
  if (store.$state.userId == "") {
    if (setting()) {
      Toast("请在豫视频App查看详情");
      setTimeout(() => {
        location.href =
          "https://news.dahebao.cn/appdownload/index.html?Type=101&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow";
      }, 600);
    } else {
      goLogin();
    }
  } else {
    //投票
    if (props.info[index].ifThumb == 0) {
      poststhumbup(
        JSON.stringify({
          user_id: store.$state.userId,
          action_type: 1,
          posts_id: props.info[index].postsId,
        })
      ).then((res: string) => {
        if (res == "操作成功") {
          props.info[index].hotData += 10;
          props.info[index].ifThumb = 1;
          Toast("投票成功");
        } else {
          Toast(res);
        }
      });
    } else {
      Toast("每个作品只能投一票");
    }
  }
}
//跳转详情页
function navigetDetail(e: number) {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    Toast("请在豫视频App查看详情");
    setTimeout(() => {
      location.href = "https://news.dahebao.cn/appdownload/index.html?Type=101&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow";
    }, 500);
  }
  //如果在其他浏览器,跳转下载页
  else if (store.$state.userId == "" && !setting()) {
    //跳转登录
    goLogin();
  } else {
    //跳转帖子
    goPosts(e);
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0px 43px 50px 43px;
  justify-content: space-between;
  .item {
    margin-top: 50px;
    width: 315px;
    height: 350px;
    span {
      color: #fff;
    }
    img {
      box-sizing: border-box;
      border: 4px solid #84b5ff;
      width: 315px;
      height: 209px;
    }
    .hotdata {
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
    }
    button {
      margin-top: 26px;
      border: none;
      border-radius: 50px;
      width: 316px;
      height: 68px;
      background: #84b5ff;
      color: #203ab2;
      font-weight: 800;
    }
  }
}
.empty {
  width: 100%;
  text-align: center;
  img {
    width: 80%;
  }
}
</style>
