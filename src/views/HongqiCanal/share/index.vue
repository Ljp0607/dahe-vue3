<template>
  <div class="content">
    <div class="main" id="shareImg" @click="createPoster('shareImg')">
      <img
        crossOrigin="anonymous"
        class="shareImg_bg"
        src="@/assets/bg1.png"
        alt=""
      />
      <!-- base64图片 -->
      <div class="con_number">
        {{ download }}
      </div>
    </div>
    <div class="creatPage" @click="createPoster('shareImg')">
      点击生成荣誉证书
    </div>
  </div>
  <van-popup
    style="width: 78vw; border-radius: 10px; padding: 0"
    round
    id="vanopup"
    v-model:show="show"
  >
    <img class="popupImg" :src="posterImg" />
  </van-popup>
  <div class="down" v-show="show">长按保存图片<van-icon name="share-o" /></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { clickAndDown } from "@/api/index/share";
import html2canvas from "html2canvas";
const posterImg = ref();
const show = ref(false);
const download = ref();
//生成图片
const createPoster = (id: string) => {
  const shares = document.getElementById(id);
  html2canvas(shares, {
    useCORS: true,
    allowTaint: true,
    scale: 2, // 处理模糊问题
    ignoreElements: (element: Element) => {
      const isButtons = element.classList.contains("button-group");
      return isButtons;
    },
  }).then((cavans) => {
    posterImg.value = cavans.toDataURL("image/png");
    show.value = true;
  });
};
onMounted(() => {
  clickAndDown().then((res: any) => {
    download.value = res[0].clickTotal;
  });
});
</script>
<style lang="less" scoped>
.content {
  background-image: url("https://imgcdn.dahebao.cn/20221228/20221228184422754439.png");
  background-size: 100% 100%;
  width: 100vw;
  min-height: 100vh;
  padding-top: 172px;
  box-sizing: border-box;
  .main {
    // background-image: url("@/assets/bg1.png");
    // background-size: 100% 100%;
    margin: 0 auto;
    width: 600px;
    height: 1020px;
    text-align: center;
    position: relative;
    .shareImg_bg {
      width: 600px;
      height: 1023px;
    }
    .title {
      width: 468px;
      margin-top: 62px;
    }
  }
  /*

*/
  .con_number {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 0;
    z-index: 100;
    margin: 0 auto;
    padding-top: 447px;
    padding-left: 20px;
    width: 120px;
  }
}
.creatPage {
  width: 335px;
  height: 62px;
  background-image: url("https://imgcdn.dahebao.cn/20230423/20230423152203511648.png");
  background-size: 100% 100%;
  text-align: center;
  color: #b91624;
  margin: 50px auto;
  font-weight: 600;
  line-height: 62px;
}

.popupImg {
  width: 100%;
}
.down {
  color: #ffd78c;
  position: absolute;
  bottom: 240px;
  left: 50%;
  transform: translate(-50%);
  z-index: 100000;
}
</style>
