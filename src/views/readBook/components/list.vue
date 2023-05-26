<template>
  <div class="main" v-if="props.info.length > 0">
    <div v-for="(item, index) in props.info" :key="index" class="item">
      <!-- 如果是图片,则为: -->
      <div v-if="!item.postsVideo" class="item_img">
        <div class="item_empty">
          <img
            :src="JSON.parse(item.postsImg)[0].imgUrl + '/pc_600'"
            :alt="item.postsTitle"
            @click="navigetDetail(item.postsId)"
          />
        </div>
      </div>
      <!-- 如果是视频,则为: -->
      <div v-else class="item_img" @click="navigetDetail(item.postsId)">
        <div class="video_empty">
          <img
            class="videoImg"
            :src="item.postsVideoImg ? item.postsVideoImg : ''"
          />
          <img
            class="videoBg"
            src="https://imgcdn.dahebao.cn/20221011/20221011094515515822.png"
            alt=""
          />
        </div>
      </div>
      <div class="item_text">学校 : {{ item.field7 }}</div>
      <div class="item_text">姓名 : {{ item.field1 }}</div>
      <div class="item_text">推荐书目:{{ item.field6 }}</div>
    </div>
  </div>
  <div v-else class="empty">
    <img src="https://imgcdn.dahebao.cn/20221027/20221027113957273185.png" />
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { showToast } from "vant";
import setting from "@/common/setting";
import { goLogin, goPosts } from "@/common/appRoute";
const store = useCounterStore();
interface Props {
  info?: API.infoList;
}
const props = defineProps<Props>();
//跳转详情页
function navigetDetail(e: number) {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    showToast("请在豫视频App查看详情");
    setTimeout(() => {
      location.href =
        "https://news.dahebao.cn/appdownload/index.html?Type=102002";
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
  color: #fff;
  // width: 100vw;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0px 40px 50px 40px;
  justify-content: space-between;
  .item {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 283px;
    height: 458px;
    // text-align: center;
    span {
      color: #fff;
    }
    .item_img {
      width: 100%;
      padding-top: 14px;
      height: 334px;
      background: linear-gradient(#fde8c4, #fec178);
      border-bottom: 10px solid #e56c33;
      position: relative;
      .video_empty {
        background: #fff;
        width: 257px;
        height: 322px;
        margin-left: 14px;
        position: relative;
      }
      .videoImg {
        position: absolute;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
        left: 50%;
        top: 50%;
      }
      .videoBg {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        left: 50%;
        top: 50%;
      }
    }
    .item_text {
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
      font-size: 26px;
      color: #c97446;
      width: 100%;
      text-overflow: ellipsis;
    }
    .item_empty {
      margin-left: 14px;
      width: 259px;
      height: 323px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      max-width: 259px;
      max-height: 100%;
    }
    video {
      width: 275px;
      max-height: 323px;
    }
    .hotdata {
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      .btn {
        font-size: 25px;
      }
    }

    button {
      margin-top: 26px;
      border: none;
      border-radius: 50px;
      width: 316px;
      height: 58px;
      background: #ff9156;
      color: #a50102;
      font-weight: 800;
    }
  }
}
.empty {
  margin-top: 100px;
  width: 100%;
  text-align: center;
  img {
    width: 80%;
  }
}
</style>
