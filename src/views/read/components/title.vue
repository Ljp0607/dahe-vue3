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
      发布的文图或短视频必须为原创，内容为我的特色寒假作业发布成功即为参与成功。其中，文字可以直接写或以截图的形式呈现，最多不超过800字；视频时长不超过3分钟。最多不超过800字；视频时长不超过3分钟。
    </span>
    <router-link to="upload">
      <img
        class="bg2"
        src="https://imgcdn.dahebao.cn/20230407/20230407175433973870.png"
        alt=""
      />
    </router-link>
    <img
      class="bg3"
      src="https://imgcdn.dahebao.cn/20230407/20230407175451413776.png"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { getNewsInfo } from "@/api/read";
import { useRouter } from "vue-router";
const router = useRouter();
interface dataType {
  show: boolean;
  content: string;
  img: string;
}
const data = reactive<dataType>({ show: false, content: "", img: "" });
const navigatVideo = () => {
  router.push({ name: "readVideo", params: { list: data.content } });
};
getNewsInfo().then((res: any) => {
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
  background-image: url("https://imgcdn.dahebao.cn/20230407/20230407155744342817.png");
  background-repeat: no-repeat;
  background-size: 100%;
  text-align: center;
  padding-top: 950px;
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
    width: 508px;
    height: 104px;
  }
  .span1 {
    display: inline-block;
    width: 616px;
    height: 199px;
    font-size: 28px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    text-indent: 2em;
    color: #ffffff;
    line-height: 43px;
    text-shadow: 0px 3px 4px rgba(122, 51, 12, 0.71);
    margin-bottom: 60px;
  }
  .bg3 {
    margin-top: 30px;
    width: 317px;
    height: 42px;
  }
}
</style>
