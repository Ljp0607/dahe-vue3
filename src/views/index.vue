<template>
  <div>
    <nav class="nav">
      <van-grid :column-num="4">
        <van-grid-item
          v-for="(item, index) in router.options.routes"
          :key="index"
          :icon="icon[index]"
          :to="item.path"
          :text="item.meta ? item.meta.title.toString() : '首页'"
        />
      </van-grid>
    </nav>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const icon = reactive([
  "bag-o",
  "video-o",
  "more-o",
  "wap-home-o",
  "cashier-o",
  "apps-o",
  "logistics",
  "contact",
  "apps-o",
  "logistics",
  "other-pay",
  "bag-o",
  "video-o",
  "more-o",
  "wap-home-o",
  "cashier-o",
  "apps-o",
  "logistics",
  "contact",
  "apps-o",
  "logistics",
  "other-pay",
  "debit-pay",
  "description",
  "logistics",
  "contact",
  "logistics",
  "other-pay",
  "bag-o",
  "video-o",
  "more-o",
  "wap-home-o",
  "cashier-o",
  "apps-o",
  "logistics",
  "contact",
  "apps-o",
  "logistics",
  "other-pay",
  "debit-pay",
  "apps-o",
  "logistics",
  "user-circle-o",
]);
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
