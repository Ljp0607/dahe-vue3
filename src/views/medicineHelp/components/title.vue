<template>
  <div class="header">
    <div class="uploading">
      <img
        src="https://imgcdn.dahebao.cn/20221221/20221221190251912090.png"
        @click="navigetUp(0)"
      />
      <img
        @click="navigetUp(1)"
        src="https://imgcdn.dahebao.cn/20221221/20221221190324626776.png"
      />
    </div>
  </div>
  <div @click="navigetUp(3)" class="myHelp suspend">我的</div>
  <!-- <div @click="navigetUp(4)" class="share suspend">分享</div> -->
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import "vant/es/toast/style";
import { useCounterStore } from "@/stores/counter";
import setting from "@/common/setting";
import { goLogin } from "@/common/appRoute";
const store = useCounterStore();
const router = useRouter();
interface dataType {}
const data = reactive<dataType>({});
//跳转上传
function navigetUp(id: number) {
  // console.log(id);
  //如果无userId,判断环境,如果在微信,跳下载,如果浏览器环境,跳登录
  if (store.$state.userId == "") {
    if (setting()) {
      showToast("请在豫视频App查看详情");
      setTimeout(() => {
        location.href =
          "https://news.dahebao.cn/appdownload/index.html?Type=120&openUrl=https://news.dahebao.cn/dahe/h5/medicineHelp/index.html#/medicineHelp";
      }, 800);
    } else {
      goLogin();
    }
  } else {
    router.push({ name: "uploadingHelp", params: { need: id } });
  }
}
</script>
<style lang="less" scoped>
.header {
  width: 100vw;
  height: 853px;
  background: #fff;
  background: url("https://imgcdn.dahebao.cn/20221221/20221221185922291319.png");
  background-repeat: no-repeat;
  background-size: 685px 853px;
  background-position: center;
  box-sizing: border-box;
  padding: 0 66px;
  padding-top: 662px;
  .uploading {
    color: red;
    display: flex;
    justify-content: space-around;
    img {
      width: 282px;
      height: 135px;
    }
  }
}
.suspend {
  z-index: 1000;
  position: fixed;
  width: 120px;
  line-height: 120px;
  text-align: center;
  height: 120px;
  border-radius: 60px;
  background: #fca459;
  // background: red;
  color: #fff;
  font-size: 40px;
}
.myHelp {
  bottom: 380px;
  right: 35px;
}
// .share {
//   bottom: 200px;
//   right: 35px;
// }
</style>
