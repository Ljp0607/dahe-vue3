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
      理想的书籍是智慧的钥匙。为落实“书香河南、书香洛阳”建设的各项决策部署，中共洛阳市委宣传部、洛阳市教育局、共青团洛阳市委员会、大河报•豫视频联合开展的“悦读圆梦
      向阳花开——我是阅读推荐官”书香助学公益活动在洛龙区、新安县11所城区小学正式拉开帷幕。
    </span>
    <span class="span1">
      活动将联动学生和家长，号召大家作为“阅读推荐官”，通过推荐函或者推荐视频等形式，向乡村小学学生推荐分享心目中的好书。同时，以学校为单位，号召所属小学生按照个人自愿原则、在征得家长或监护人同意后，将闲置的课外书籍（数量不限），捐赠至该市乡镇中心小学图书室，助力改善乡村学生阅读条件，推进青少年阅读活动走深走实，营造城区小学和乡镇小学携手共建书香校园的浓厚氛围。
    </span>
    <span class="span1">
      活动结束，主办方将根据推荐作品质量及传播效果，评选出20名学生为“最佳阅读推荐官”，并授予证书。
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
