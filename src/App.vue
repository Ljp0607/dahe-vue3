<template>
  <header class="container">
    <RouterView />
  </header>
</template>
<script setup>
import { onMounted, getCurrentInstance } from "@vue/runtime-core";
import { useCounterStore } from "./stores/counter";
import wxShareInit from "./common/wx-share";
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
//获取userId
function getUserId() {
  if (window.location.href.indexOf("userId") == -1) {
    store.$state.userId = "empty";
  } else if (window.location.href.indexOf("&") == -1) {
    store.$state.userId = window.location.href.match(/userId=(\S*)/)[1];
  } else {
    store.$state.userId = window.location.href.match(/userId=(\S*)&/)[1];
  }
}
onMounted(() => {
  wxShaer();
  getUserId();
});
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  min-height: 100vh;
}
.empty {
  display: block;
  width: 100%;
  height: 100px;
}
</style>
