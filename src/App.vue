<template>
  <header class="container">
    <RouterView />
  </header>
</template>
<script setup>
import { onMounted } from "@vue/runtime-core";
import { useCounterStore } from "./stores/counter";
const store = useCounterStore();

//获取userId
function getUserId() {
  if (window.location.href.indexOf("userId") == -1) {
    store.$state.userId = "empty";
  } else if (window.location.href.indexOf("&") == -1) {
    store.$state.userId = window.location.href.match(/userId=(\S*)/)[1];
  } else {
    const url = window.location.href.match(/userId=(\S*)/)[1];
    if (url.indexOf("&") != -1) {
      store.$state.userId = window.location.href.match(/userId=(\S*)&/)[1];
    } else {
      store.$state.userId = window.location.href.match(/userId=(\S*)/)[1];
    }
  }
}
onMounted(() => {
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
