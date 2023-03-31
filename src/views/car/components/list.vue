<template>
  <div class="main" v-if="props.info.length > 0">
    <!--tepe==1时,图片 -->
    <div
      v-if="props.type == 2"
      class="item"
      v-for="(items, indexs) in props.info"
      :key="indexs"
    >
      <!-- 如果有图片,显示图片 -->
      <div class="img">
        <!--       <div @click="navigetDetail(items.postsId)" class="img"> -->
        <img
          v-if="items.postsImg"
          class="postsImg"
          :src="JSON.parse(items.postsImg)[0].imgUrl + '/pc_600'"
        />
        <img class="postsImg" v-else src="" />
      </div>
      <div class="hotData">
        {{ items.postsTitle }}
      </div>
    </div>
    <!-- type==2时,视频 -->
    <div v-else-if="props.type == 1">
      <div
        class="itemVideo"
        v-for="(items, indexs) in props.info"
        :key="indexs"
      >
        <!-- 如果有视频,展示视频和播放键 -->
        <video :src="items.postsVideo" controls></video>
      </div>
    </div>
    <!-- type==3时,排行榜 -->
    <div v-else>
      <div
        class="itemRanking"
        v-for="(items, indexs) in props.info"
        :key="indexs"
      >
        <div class="start" :style="{ background: arr[indexs] }">
          {{ indexs + 1 }}
        </div>
        <div class="title">
          {{ items.postsTitle }}
        </div>
        <div class="hot">
          <div
            :style="{
              width: (items.hotData / props.info[0].hotData) * 100 + '%',
              height: '100%',
              background: indexs < 6 ? arr[indexs] : '#fff',
              display: 'flex',
              paddingLeft: '5px',
              boxSizing: 'border-box',
              alignItems: 'center',
              minWidth: '20%',
            }"
          >
            {{ items.hotData }}票
          </div>
        </div>
        <div class="text btn" v-if="!items.ifThumb" @click="postst(indexs)">
          投票
        </div>
        <div class="text" v-else @click="postst(indexs)">已投票</div>
      </div>
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
import { goLogin } from "@/common/appRoute";
const store = useCounterStore();
const arr = ["#FF2D2D", "#F15918", "#F19818", "#FDC350", "#FDC350", "#FDC350"];
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
  getTask?: Function;
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
          props.getTask();
        } else {
          showToast(res);
        }
      });
    } else {
      showToast("每个作品只能投一票");
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  background: #5d7baa;
  width: 700px;
  min-height: 980px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 30px 20px 50px 20px;
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
      margin-top: 16px;
      font-size: 24px;
      font-weight: 400;
      color: #fff;
    }
  }
  .itemVideo {
    margin-top: 27px;
    border-radius: 10px;
    width: 660px;
    background: #fff;
    height: 335px;
    position: relative;
    margin-bottom: 50px;
    video {
      width: 100%;
      border-radius: 10px;
    }
    .item_start {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .itemRanking {
    display: flex;
    align-items: center;
    color: #fff;
    height: 80px;
    .start {
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 5px;
      margin-right: 20px;
    }
    .title {
      width: 180px;
      margin-right: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .hot {
      height: 35px;
      width: 305px;
      font-size: 14px;
      color: #000;
      box-sizing: border-box;
    }
    .text {
      background: #f15918;
      height: 35px;
      color: #fff;
      text-align: center;
      font-size: 22px;
      box-sizing: border-box;
      padding: 2px 8px;
      font-weight: 400;
      border-radius: 5px;
      margin-left: 15px;
    }
    .btn {
      background: #0cc160;
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
