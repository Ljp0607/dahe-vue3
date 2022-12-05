<template>
  <header class="container">
    <RouterView />
  </header>
</template>
<script setup lang="ts">
import { useCounterStore } from "./stores/counter";
import getShare from "@/common/wx-share";
const store = useCounterStore();
// 获取userId
if (location.href.indexOf("userId") != -1) {
  if (location.href.indexOf("&", location.href.indexOf("userId=") + 7) != -1) {
    store.changeUserId(
      location.href.slice(
        location.href.indexOf("userId=") + 7,
        location.href.indexOf("&", location.href.indexOf("userId="))
      )
    );
  } else {
    store.changeUserId(
      location.href.slice(location.href.indexOf("userId=") + 7, 1000)
    );
  }
}

//获取 activity
if (location.href.indexOf("activityNo=") != -1) {
  if (
    location.href.indexOf("&", location.href.indexOf("activityNo=") + 11) != -1
  ) {
    store.changeActive(
      location.href.slice(
        location.href.indexOf("activityNo") + 11,
        location.href.indexOf("&", location.href.indexOf("activityNo="))
      )
    );
  } else {
    store.changeActive(
      location.href.slice(location.href.indexOf("activityNo") + 11, 1000)
    );
  }
}

getShare({ type: 22, share_url: window.location.href });
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
