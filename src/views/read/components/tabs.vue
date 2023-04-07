<template>
  <div class="tabs">
    <div class="search">
      <img src="https://imgcdn.dahebao.cn/20230404/20230404113134180135.png" />
      <input
        type="text"
        v-model="data.content"
        placeholder="请输入姓名或学校搜索"
      />
      <van-button @click="changeText" class="search_button">搜索</van-button>
    </div>
    <van-tabs
      v-model:active="active"
      @change="changeActive"
      swipeable
      :ellipsis="false"
      color="#E55822"
      background="none"
      title-active-color="#CE530A"
      title-inactive-color="#ffffff"
      line-height="0"
      line-width="0"
    >
      <van-tab
        v-for="(item, index) in data.option"
        :title="item.type_name"
        :key="index"
        style="{{
          background:
            index == active ? 'linear-gradient(#fef8f2, #fdd5a6)' : 'none',
          borderBottom: index == active ? '2px solid #E55822' : 'none',
          border: index == active ? '' : '2px solid #fff',
        }}"
      >
        <List :info="data.info" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import List from "./list.vue";
import { useCounterStore } from "@/stores/counter";
import { selectRead, getTypeNo } from "@/api/read/index";
import { showToast } from "vant";
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
  content: string;
  stOption: Array<{
    parent_type_no: string;
    priority: number;
    type_name: string;
    type_no: string;
  }>;
}
const data = reactive<dataType>({
  stOption: [],
  option: [],
  info: [],
  resh: "more",
  current: 1,
  content: "",
});
const active = ref<number>(0);

const store = useCounterStore();
//过滤数组
const changeOption = () => {
  if (data.content != "") {
    data.option = data.stOption.filter(
      (item) => item.type_name.indexOf(data.content) != -1
    );
  } else {
    data.option = data.stOption;
  }
};
//搜索
const changeText = () => {
  changeOption();
};
//切换tab栏
const changeActive = (e: number) => {
  getCars(data.option[e].type_no);
  data.current = 1;
};
//获取当前tab栏中的车型
const getCars = (id: string) => {
  selectRead(id, 1).then((res: any) => {
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
      showToast(res.message);
    }
  });
};
//获取更多车型
const moreCars = (id: string) => {
  selectRead(id, data.current).then((res: any) => {
    if (res.state == 1) {
      data.info = [...data.info, ...res.data];
      if (res.data.length == 10) {
        data.resh = "more";
      } else {
        data.resh = "no-more";
        window.removeEventListener("scroll", refresh, true);
      }
    } else {
      showToast(res.message);
    }
  });
};
//c初始化获取tab栏
const getParentTypeNo = () => {
  getTypeNo("read").then(
    (
      res: Array<{
        parent_type_no: string;
        priority: number;
        type_name: string;
        type_no: string;
        text?: string;
        value?: string;
      }>
    ) => {
      let arr = res;
      arr.forEach((item) => {
        item.text = item.type_name;
        item.value = item.type_no;
      });
      store.changeSchool(res);
      data.stOption = res;
      changeOption();
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
      (document.documentElement.scrollTop == 0
        ? document.body.scrollHeight
        : document.documentElement.scrollHeight) -
      (document.documentElement.scrollTop == 0
        ? document.body.scrollTop
        : document.documentElement.scrollTop) -
      (document.documentElement.scrollTop == 0
        ? document.body.clientHeight
        : document.documentElement.clientHeight);
    if (scrollht <= 105) {
      data.resh = "loading";
      ++data.current;
      moreCars(data.option[active.value].type_no);
    }
  }
}
//监控滑动是否到达底部
window.addEventListener("scroll", refresh, true);
onMounted(() => {
  getParentTypeNo();
});
</script>
<style lang="less" scoped>
.tabs {
  min-height: 1021px;
  padding-bottom: 50px;
}
.search {
  width: 637px;
  margin: 60px auto;
  height: 75px;
  background: #feefde;
  border-radius: 40px;
  padding: 17px 28px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  img {
    width: 41px;
    height: 40px;
    margin-right: 23px;
  }
  input {
    background: none;
    border: none;
    width: 380px;
    height: 29px;
    font-size: 31px;
    font-weight: 400;
    color: #ce530a;
    // margin-right: 100px;
  }
  input::placeholder {
    color: #ce530a;
  }
  .search_button {
    border: none;
    background: #ce530a;
    text-align: center;
    color: #fff;
    width: 120px;
    height: 50px;
    border-radius: 25px;
  }
}
::v-deep .van-tab {
  width: 265px;
  // height: 112px;
  // border: none;
  font-size: 31px;
  margin-right: 20px;
  font-weight: 900;
  // background: linear-gradient(#fef8f2, #fdd5a6);
}
</style>
