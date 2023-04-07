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
      <div v-else class="item_img">
        <video
          controls
          :src="item.postsVideo"
          :poster="item.postsVideoImg ? item.postsVideoImg : ''"
        ></video>
      </div>
      <div>{{ item.postsTitle }}</div>
      <div>{{ item.postsTitle }}</div>
      <div>{{ item.postsTitle }}</div>
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
// function postst(index: number) {
//   //如果无userId,判断环境,如果在微信,跳下载,如果浏览器环境,跳登录
//   if (store.$state.userId == "") {
//     if (setting()) {
//       showToast("请在豫视频App查看详情");
//       setTimeout(() => {
//         location.href =
//           "https://news.dahebao.cn/appdownload/index.html?Type=104&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow";
//       }, 600);
//     } else {
//       goLogin();
//     }
//   } else {
//     //投票
//     if (props.info[index].ifThumb == 0) {
//       poststhumbup(
//         JSON.stringify({
//           user_id: store.$state.userId,
//           action_type: 1,
//           posts_id: props.info[index].postsId,
//         })
//       ).then((res: string) => {
//         if (res == "操作成功") {
//           props.info[index].hotData += 10;
//           props.info[index].ifThumb = 1;
//           showToast("投票成功");
//         } else {
//           showToast(res);
//         }
//       });
//     } else {
//       showToast("每个作品只能投一票");
//     }
//   }
// }
//跳转详情页
function navigetDetail(e: number) {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    showToast("请在豫视频App查看详情");
    setTimeout(() => {
      location.href =
        "https://news.dahebao.cn/appdownload/index.html?Type=104&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow";
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
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0px 43px 50px 43px;
  justify-content: space-between;
  .item {
    margin-top: 50px;
    margin-bottom: 30px;
    width: 303px;
    height: 500px;

    text-align: center;
    span {
      color: #fff;
    }
    .item_img {
      width: 100%;
      padding-top: 14px;
      height: 364px;
      background: linear-gradient(#fde8c4, #fec178);
      border-bottom: 10px solid #e56c33;
      position: relative;
      video {
        position: absolute;
        left: 2.5%;
        top: 50%;
        transform: translate(0,-50%);
        width: 95%;
        max-height: 100%;
        background: #fff;
      }
    }
    .item_empty {
      margin-left: 14px;
      width: 275px;
      height: 344px;
      background: #fff;
      display: flex;
      align-items: center;
    }
    img {
      width: 275px;
    }
    video {
      width: 275px;
      max-height: 350px;
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
video::-webkit-media-controls-timeline {
  display: none;
}
// //音量按钮
video::-webkit-media-controls-mute-button {
  display: none;
}
// //音量的控制条
video::-webkit-media-controls-volume-slider {
  display: none;
}
//播放按钮
// video::-webkit-media-controls-play-button {
//   display: none;
// }
.empty {
  margin-top: 100px;
  width: 100%;
  text-align: center;
  img {
    width: 80%;
  }
}
</style>
