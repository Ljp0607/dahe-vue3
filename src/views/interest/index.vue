<template>
  <div class="container">
    <img src="../../assets/12.png" alt="" />
    <nav class="nav">
      <RouterLink to="/Info">点击报名</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { getCurrentInstance, onMounted } from "vue";
import wxShareInit from "../../common/wx-share";
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
      data.title = "豫视频兴趣小组组长招募";
      data.description =
        "兴趣小组是豫视频内的生态社区，旨在成为河南人交流分享、互相学习的亲切家园";
      wxShareInit(data);
    } else {
    }
  });
}
onMounted(() => {
  wxShaer();
});
</script>

<style lang="less" scoped>
.container {
  position: relative;
  img {
    width: 100%;
  }
  nav {
    background: #591083;
    border-radius: 50px;
    width: 415px;
    height: 80px;
    position: absolute;
    bottom: 156px;
    left: 22%;
    text-align: center;
    line-height: 80px;
  }
  nav a {
    text-decoration: none;
    color: white;
    font-size: 36px;
  }
}
</style>
