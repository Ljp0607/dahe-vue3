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
        "https://news.dahebao.cn/appdownload/index.html?Type=28&openUrl=https://news.dahebao.cn/dahe/h5/activity/index.html#/read/index";
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
    margin-top: 30px;
    margin-bottom: 30px;
    width: 303px;
    height: 480px;
    // text-align: center;
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
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
      font-size: 26px;
      width: 100%;
      text-overflow: ellipsis;
    }
    .item_empty {
      margin-left: 14px;
      width: 275px;
      height: 344px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      max-width: 275px;
      max-height: 100%;
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
.empty {
  margin-top: 100px;
  width: 100%;
  text-align: center;
  img {
    width: 80%;
  }
}
</style>
