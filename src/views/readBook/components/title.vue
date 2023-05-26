<template>
  <div class="title">
    <div @click="navigatVideo" class="bg1" v-show="data.show">
      <!-- <video src=""></video> -->
      <img v-show="data.img" class="bg1_navigat" :src="data.img" />
      <img
        class="bg1_img"
        src="https://imgcdn.dahebao.cn/20230403/20230403171415914110.png"
      />
    </div>
    <span class="span1">
      理想的书籍是智慧的钥匙。大河报·豫视频“悦读圆梦·向阳花开——我是小小阅读推荐官”活动拉开帷幕。联合洛阳市洛龙区、洛阳市新安县多所学校，联动学生与校长，分享好书、领读好书。
    </span>
    <span class="span1">
      活动将根据作品内容，评选10名学生为“最佳阅读推荐官”，授予相关奖状。
    </span>
    <img
      @click="navigatUpload"
      class="bg2"
      src="https://imgcdn.dahebao.cn/20230526/20230526093915280297.png"
      alt=""
    />
    <img
      class="bg3"
      src="https://imgcdn.dahebao.cn/20230526/20230526093934979360.png"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { geNewsBookInfo } from "@/api/read";
import { useRouter } from "vue-router";
import setting from "@/common/setting";
import { showToast } from "vant";
import { useCounterStore } from "@/stores/counter";
import { goLogin } from "@/common/appRoute.js";
const router = useRouter();
const store = useCounterStore();
interface dataType {
  show: boolean;
  content: string;
  img: string;
}
const data = reactive<dataType>({ show: false, content: "", img: "" });
const navigatVideo = () => {
  router.push({ name: "readVideo", params: { list: data.content } });
};
const navigatUpload = () => {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    showToast("请在豫视频App内报名");
    setTimeout(() => {
      location.href =
        "https://news.dahebao.cn/appdownload/index.html?Type=102002";
    }, 500);
  }
  // read/index
  //如果在其他浏览器,跳转下载页
  else if (store.$state.userId == "" && !setting()) {
    //跳转登录
    goLogin();
  } else {
    //跳转帖子
    router.push("upload");
  }
};
geNewsBookInfo().then((res: any) => {
  if (res.state == 1 && res.data.length > 0) {
    data.img = res.data[0].activityNewsCover;
    data.content = JSON.stringify(res.data);
    data.show = true;
  }
});
</script>
<style lang="less" scoped>
.title {
  width: 100vw;
  background-image: url("https://imgcdn.dahebao.cn/20230526/20230526094221185841.png");
  background-repeat: no-repeat;
  background-size: 100%;
  text-align: center;
  padding-top: 1100px;
  .bg1 {
    margin: 0 auto;
    background-image: url("https://imgcdn.dahebao.cn/20230403/20230403171025830095.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 637px;
    height: 371px;
    box-sizing: border-box;
    margin-bottom: 39px;
    padding: 14px 14px 26px 14px;
    position: relative;
    .bg1_img {
      position: absolute;
      width: 122px;
      height: 122px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
    }
    .bg1_navigat {
      width: 609px;
      height: 331px;
      background: #ec9a64;
    }
  }
  .bg2 {
    margin-top: 69px;
    width: 651px;
    height: 133px;
  }
  .span1 {
    text-align: left;
    text-indent: 60px;
    display: inline-block;
    width: 647px;
    font-size: 32px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #9e1f24;
    line-height: 48px;
  }
  .bg3 {
    margin-top: 46px;
    width: 479px;
    height: 50px;
  }
}
</style>
