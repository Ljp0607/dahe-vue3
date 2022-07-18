<template>
  <header class="container">
    <HomeHeader />
    <div class="wrapper">
      <nav>
        <RouterLink to="/enter">产品号</RouterLink>
        <RouterLink to="/enter/HomeGover">政务号</RouterLink>
        <RouterLink to="/enter/HomeMedia">媒体号</RouterLink>
        <RouterLink to="/enter/HomeExpert">达人号</RouterLink>
      </nav>
    </div>
    <RouterView />
  </header>
</template>
<script setup>
import { onMounted } from "@vue/runtime-core";
import { RouterLink, RouterView } from "vue-router";
import HomeHeader from "./HomeHeader.vue";

onMounted(() => {});
</script>

<style lang="less" scoped>
@import "@/assets/base.css";
.container {
  width: 100vw;
  min-height: 100vh;
  background: #031a34;
  background-image: url("@/assets/bg.jpeg");
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
    background-image: url(@/assets/04.png);
    background-size: 100%;
    font-size: 35px;
    color: #ffffff;
    text-decoration: none;
  }
  nav a.router-link-exact-active {
    font-weight: 800;
    color: #002054;
    display: inline-block;
    background-image: url(@/assets/03_active.png);
    background-size: 100%;
  }
}
.empty {
  display: block;
  width: 100%;
  height: 100px;
}
</style>
