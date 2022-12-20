<template>
  <div class="tabs">
    <van-tabs
      v-model:active="active"
      @change="changeActive"
      :animated="false"
      swipeable
      :ellipsis="false"
      background="linear-gradient(#3050E2,#99C0FC)"
      color="#FFFFFF"
      title-active-color="#ffffff"
      title-inactive-color="#ffffff"
      line-height="7px"
      line-width="65px"
    >
      <van-tab
        v-for="(item, index) in data.option"
        :title="item.type_name"
        :key="index"
      >
        <List :info="data.info" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import List from "./list.vue";
import { selectCity, getTypeNo } from "@/api/autoShow/index";
import { Toast } from "vant";
components: {
  List;
}
interface dataType {
  option: Array<{
    parent_type_no: string;
    priority: number;
    type_name: string;
    type_no: string;
  }>;
  info?: Array<{
    activityNo: string;
    creatorType: number;
    hotData: number;
    postsId: number;
    postsImg: string;
    postsThumbUpNum: number;
    postsTitle: string;
    postsVideo: string;
    postsVideoImg: string;
    userName: string;
    ifThumb: number;
  }>;
  resh?: string;
  current: number;
}
const data = reactive<dataType>({
  option: [],
  info: [],
  resh: "more",
  current: 1,
});
const active = ref<number>(0);
//切换tab栏
const changeActive = (e: number) => {
  getCars(data.option[e].type_no);
  data.current = 1;
};
//获取当前tab栏中的车型
const getCars = (id: string) => {
  selectCity(id, 1).then((res: any) => {
    if (res.state == 1) {
      data.info = res.data;
      if (res.data.length < 10) {
        data.resh = "no-more";
        //清除滑动监控
        window.removeEventListener("scroll", refresh, true);
      } else {
        data.resh = "more";
        window.addEventListener("scroll", refresh, true);
      }
    } else {
      Toast(res.message);
    }
  });
};
//获取更多车型
const moreCars = (id: string) => {
  selectCity(id, data.current).then((res: any) => {
    if (res.state == 1) {
      data.info = [...data.info, ...res.data];
      if (res.data.length == 10) {
        data.resh = "more";
      } else {
        data.resh = "no-more";
        window.removeEventListener("scroll", refresh, true);
      }
    } else {
      Toast(res.message);
    }
  });
};

//c初始化获取tab栏
const getParentTypeNo = () => {
  getTypeNo("car").then(
    (
      res: Array<{
        parent_type_no: string;
        priority: number;
        type_name: string;
        type_no: string;
      }>
    ) => {
      data.option = res;
      getCars(data.option[active.value].type_no);
    }
  );
};
//监控滑动是否到达底部
function refresh() {
  // console.log("监控");
  if (data.resh == "loading" || data.resh == "no-more") {
    return;
  } else {
    let scrollht =
      document.body.scrollHeight -
      (document.body.clientHeight && document.documentElement.clientHeight) -
      (document.documentElement && document.documentElement.scrollTop);
    if (scrollht <= 5) {
      data.resh = "loading";
      ++data.current;
      moreCars(data.option[active.value].type_no);
    }
  }
}
//监控滑动是否到达底部
// window.addEventListener("scroll", refresh, true);
onMounted(() => {
  getParentTypeNo();
});
</script>
<style lang="less" scoped>
.tabs {
  background: #203ab2;
  min-height: 1021px;
}
</style>
