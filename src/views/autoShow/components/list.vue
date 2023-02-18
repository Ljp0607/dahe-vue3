<template>
  <div class="main" v-if="props.info.length > 0">
    <!--遍历数组,生成视频或图片 -->
    <div class="item" v-for="(items, indexs) in props.info" :key="indexs">
      <!-- 如果有视频,展示视频和播放键 -->
      <div @click="navigetDetail(indexs)" class="video" v-if="items.postsVideo">
        <img :src="items.postsVideoImg" />
        <img
          class="item_start"
          src="https://imgcdn.dahebao.cn/20221011/20221011094515515822.png"
        />
      </div>
      <!-- 如果有图片,显示图片 -->
      <div @click="navigetDetail(indexs)" class="img" v-else>
        <img
          class="postsImg"
          :src="JSON.parse(items.postsImg)[0].imgUrl + '/pc_600'"
        />
      </div>
      <!-- 人气值 -->
      <div class="hotData">
        <span> 点赞量: </span>
        <span> {{ items.hotData }}</span>
      </div>
      <div v-if="!items.ifThumb" class="text" @click="postst(indexs)">
        为TA点赞
      </div>
      <div v-else class="text" @click="postst(indexs)">已投票</div>
    </div>
    <img
      v-if="props.info.length == 0"
      class="empty"
      src="https://imgcdn.dahebao.cn/20221027/20221027113957273185.png"
      alt=""
    />
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { showToast } from "vant";
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
      showToast("请在豫视频App查看详情");
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
          showToast("投票成功");
        } else {
          showToast(res);
        }
      });
    } else {
      showToast("每个作品只能投一票");
    }
  }
}
//跳转详情页
function navigetDetail(e: number) {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    showToast("请在豫视频App查看详情");
    setTimeout(() => {
      location.href =
        "https://news.dahebao.cn/appdownload/index.html?Type=101&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow";
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
  padding: 0px 78px 50px 78px;
  justify-content: space-between;
  .item {
    width: 277px;
    height: 413px;
    margin-top: 55px;
    position: relative;
    .video {
      background: #fff;
      border: 0;
      margin: 0 auto;
      width: 252px;
      height: 276px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 2px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: auto;
        max-height: 276px;
      }
      .item_start {
        position: absolute;
        width: 120px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .img {
      border-radius: 20px;
      background: #fff;
      // background: #ffdcdc;
      margin: 0 auto;
      box-sizing: border-box;
      width: 253px;
      height: 276px;
      display: flex;
      align-items: center;
      // justify-content: center;
      .postsImg {
        position: absolute;
        width: 253px;
        max-height: 276px;
      }
    }
    .hotData {
      text-align: center;
      font-weight: 500;
      margin-top: 33px;
      font-size: 26px;
    }
    .text {
      background: #b16d51;
      margin: 23px auto 0px;
      color: #fff;
      line-height: 57px;
      text-align: center;
      width: 225px;
      font-size: 28px;
      font-weight: 500;
      height: 57px;
      border-radius: 50px;
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
