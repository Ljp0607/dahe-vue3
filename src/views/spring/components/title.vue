<template>
  <div class="title">
    <div class="icon" @click="data.show = true">活动规则</div>
    <van-popup
      class="van-popup"
      v-model:show="data.show"
      @click="data.show = false"
    >
      {{ props.rule }}
    </van-popup>
    <img
      @click="navUpload"
      src="https://imgcdn.dahebao.cn/20230118/20230118112330768314.png"
    />
  </div>
</template>
<script setup lang="ts">
import { showToast } from "vant";
import { goLogin } from "@/common/appRoute";
import setting from "@/common/setting";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
const router = useRouter();
const data = reactive({
  show: false,
});
interface Props {
  rule: string;
  drawRule: string;
}
const props = defineProps<Props>();
const navUpload = () => {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    showToast("请在豫视频App上传新地标");
    setTimeout(() => {
      location.href =
        "https://news.dahebao.cn/appdownload/index.html?Type=102&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow";
    }, 500);
  }
  //如果在其他浏览器,跳转下载页
  else if (store.$state.userId == "" && !setting()) {
    //跳转登录
    goLogin();
  } else {
    router.push({
      name: "uploadingSpring",
      query: { drawRule: props.drawRule },
    });
  }
};
</script>
<style lang="less" scoped>
.title {
  width: 750px;
  height: 850px;
  background-image: url("https://imgcdn.dahebao.cn/20230118/20230118111411943325.png");
  background-repeat: no-repeat;
  background-size: 100%;
  text-align: center;
  .icon {
    background: #ffa300;
    width: 154px;
    height: 50px;
    border-radius: 20px 0 0 20px;
    line-height: 50px;
    color: #fff;
    position: absolute;
    top: 220px;
    right: 0px;
    font-size: 28px;
    box-sizing: border-box;
  }
  img {
    margin-top: 700px;
    width: 367px;
    height: 104px;
  }
  span {
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 386px;
    color: #fff;
    letter-spacing: 5px;
  }
}

::v-deep .van-popup--center {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 700px;
  min-height: 750px;
  max-height: 80vh;
  white-space: pre-wrap;
  text-overflow: -o-ellipsis-lastline;
  overflow-y: scroll;
  line-height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: #6f6f6f;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  text-align: left;
}
</style>
