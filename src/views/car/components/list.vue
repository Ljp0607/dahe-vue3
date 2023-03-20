<template>
  <div class="main" v-if="props.info.length > 0">
    <!--tepe==1时,图片 -->
    <div
      v-if="props.type == 1"
      class="item"
      v-for="(items, indexs) in props.info"
      :key="indexs"
    >
      <!-- 如果有图片,显示图片 -->
      <div @click="navigetDetail(items.postsId)" class="img">
        <img
          class="postsImg"
          :src="JSON.parse(items.postsImg)[0].imgUrl + '/pc_600'"
        />
      </div>
      <!-- 人气值 -->
      <div class="hotData">
        {{ items.userName }}
      </div>
      <div v-if="!items.ifThumb" class="text" @click="postst(indexs)">
        投 票
      </div>
      <div v-else class="text" @click="postst(indexs)">已 投 票</div>
    </div>
    <!-- type==2时,视频 -->
    <div
      v-if="props.type == 2"
      class="itemVideo"
      v-for="(items, indexs) in props.info"
      :key="indexs"
    >
      <!-- 如果有视频,展示视频和播放键 -->
      <!-- <video src=""></video> -->
      <img
        class="item_start"
        src="https://imgcdn.dahebao.cn/20230318/20230318173624165660.png"
      />
    </div>
    <!-- type==3时,排行榜 -->
    <div>
      
    </div>
    <img
      v-if="props.info.length == 0"
      class="empty"
      src="https://imgcdn.dahebao.cn/20221027/20221027113957273185.png"
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
  type?: number;
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
  //
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    showToast("请在豫视频App查看详情");
    setTimeout(() => {
      location.href =
        "https://news.dahebao.cn/appdownload/index.html?Type=101&openUrl=https://news.dahebao.cn/dahe/h5/house/index.html#/autoShow";
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
  background: #5d7baa;
  width: 700px;
  min-height: 1140px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0px 37px 50px 37px;
  justify-content: space-between;
  margin: 0 auto;
  .item {
    width: 300px;
    height: 308px;
    margin-top: 54px;
    position: relative;
    .img {
      border-radius: 10px;
      background: #fff;
      margin: 0 auto;
      width: 300px;
      height: 192px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      .postsImg {
        position: absolute;
        width: 300px;
        border-radius: 10px;
        max-height: 192px;
      }
    }
    .hotData {
      text-align: center;
      font-weight: 500;
      margin-top: 16px;
      font-size: 24px;
      font-weight: 400;
      color: #fff;
    }
    .text {
      background: #f15918;
      margin: 20px auto 0px;
      color: #fff;
      line-height: 39px;
      text-align: center;
      width: 221px;
      font-size: 28px;
      font-weight: 600;
      // box-sizing: border-box;
      border: 1px solid #fff;
      height: 39px;
      border-radius: 20px;
    }
  }
  .itemVideo {
    margin-top: 27px;
    border-radius: 8px;
    width: 636px;
    background: #fff;
    height: 335px;
    position: relative;
    .item_start {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
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
