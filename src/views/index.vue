<template>
  <div>
    <nav class="nav">
      <RouterLink to="/enter">入驻号</RouterLink>
      <!-- <RouterLink to="/movie">电影票</RouterLink> -->
      <RouterLink to="/office">办事处</RouterLink>
      <RouterLink to="/interest">组长召集</RouterLink>
    </nav>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
</script>
<style lang="less" scoped>
.nav {
  a {
    text-decoration: none;
    width: 200px;
    height: 200px;
    display: block;
  }
}
</style>
