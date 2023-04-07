<template>
  <div class="con-read">
    <Title />
    <Tabs />
  </div>
</template>
<script setup lang="ts">
import Title from "./components/title.vue";
import Tabs from "./components/tabs.vue";
import getShare from "@/common/wx-share";
components: {
  Title;
  Tabs;
}
//二次分享
getShare(
  "我是阅读推荐官",
  "大河报·豫视频“我是阅读推荐官”第二季来了，邀请全省中小学生分享好书，感受阅读魅力!",
  "https://imgcdn.dahebao.cn/20230407/20230407165222229635.jpeg"
);
</script>
<style lang="less" scoped>
.con-read {
  background: #fb8e4d;
}
</style>
