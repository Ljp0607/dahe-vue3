<template>
  <header class="container">
    <HomeHeader />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">产品号</RouterLink>
        <RouterLink to="/HomeGover">政务号</RouterLink>
        <RouterLink to="/HomeMedia">媒体号</RouterLink>
        <RouterLink to="/HomeExpert">达人号</RouterLink>
      </nav>
    </div>
    <RouterView />
    <view class="empty"> </view>
  </header>
</template>
<script setup>
import { onMounted, getCurrentInstance } from "@vue/runtime-core";
import { useCounterStore } from "./stores/counter";
import wxShareInit from "./common/wx-share";
import { RouterLink, RouterView } from "vue-router";
import HomeHeader from "./views/HomeHeader.vue";
const store = useCounterStore();
const axios = getCurrentInstance().proxy.$axios;
//微信二次分享
function wxShaer() {
  axios({
    url: `https://news.dahebao.cn/dahe/appshare/getshareinfo`,
    method: "POST",
    params: {
      sign: "637586292ebf2c5fabab863734fc6a12",
      data: JSON.stringify({ type: "25", share_url: window.location.href }),
    },
  }).then((res) => {
    if (res.data.state == 1) {
      const data = res.data.data;
      wxShareInit(data);
    } else {
    }
  });
}

onMounted(() => {
  wxShaer();
  if (window.location.href.indexOf("userId") == -1) {
    store.$state.userId = "empty";
  } else if (window.location.href.indexOf("&") == -1) {
    store.$state.userId = window.location.href.match(/userId=(\S*)/)[1];
  } else {
    store.$state.userId = window.location.href.match(/userId=(\S*)&/)[1];
  }
});
</script>

<style lang="less" scoped>
@import "@/assets/base.css";
.container {
  width: 100vw;
  min-height: 100vh;
  background: #031a34;
  background-image: url("./assets/bg.jpeg");
  background-size: 100%;
  background-repeat: no-repeat;

  nav {
    text-align: center;
  }
  nav a {
    display: inline-block;
    margin-right: 8px;
    width: 150px;
    height: 105px;
    line-height: 105px;
    background-image: url(./assets/04.png);
    background-size: 100%;
    font-size: 35px;
    color: #ffffff;
    text-decoration: none;
  }
  nav a.router-link-exact-active {
    font-weight: 800;
    color: #002054;
    display: inline-block;
    background-image: url(./assets/03_active.png);
    background-size: 100%;
  }
}
.empty {
  display: block;
  width: 100%;
  height: 100px;
}
</style>
