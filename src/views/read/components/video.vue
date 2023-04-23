<template>
  <div class="title">
    <div v-for="(item, index) in data.content" :key="index">
      <div class="itemVideo" v-if="item.actionType == '2'">
        <video
          :src="item.linkUrl"
          controls
          :poster="item.activityNewsCover ? item.activityNewsCover : ''"
        ></video>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
interface dataType {
  content?: {
    actionType?: string;
    activityNewsCover?: string;
    activityNewsTitle?: string;
    infoType?: number;
    introduce?: string;
    linkUrl?: string;
    sort?: number;
    tid?: number;
  }[];
}
const data = reactive<dataType>({
  content: [],
});
onMounted(() => {
  data.content = JSON.parse(
    typeof route.params.list == "string" ? route.params.list : ""
  );
});
</script>
<style lang="less" scoped>
.title {
  width: 100vw;
  min-height: 100vh;
  background: #fb8e4d;
  background-image: url("https://imgcdn.dahebao.cn/20230411/20230411082720812919.png");
  background-repeat: no-repeat;
  background-size: 100%;
  text-align: center;
  padding-bottom: 30px;
  padding-top: 950px;
  .itemVideo {
    margin: 50px auto;
    border-radius: 10px;
    width: 660px;
    position: relative;
    video {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .item_start {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
