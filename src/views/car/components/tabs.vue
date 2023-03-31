<template>
  <div class="tabs">
    <van-tabs
      v-model:active="active"
      @change="changeActive"
      :animated="false"
      :ellipsis="false"
      color="#F15918"
      background="#F15918"
      title-active-color="#ffffff"
      title-inactive-color="#012153"
    >
      <van-tab
        v-for="(item, index) in data.option"
        :title="item.type_name"
        :key="index"
      >
        <div class="tab_content">
          <List :getTask="getTask" :info="data.info" :type="data.type" />
          <div v-show="data.show && data.info.length != 0" class="button">
            <button @click="lastPage">上一页</button>
            <button @click="nextPage">下一页</button>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import List from "./list.vue";
import { selectCity, getTypeNo, selectTask } from "@/api/autoShow/index";
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
  more?: string;
  current: number;
  type?: number;
  show?: boolean;
}
// carShow
const data = reactive<dataType>({
  show: false,
  option: [],
  info: [],
  more: "more",
  current: 1,
  type: 0,
});
const active = ref<number>(0);
//切换tab栏
const changeActive = (e: number) => {
  data.type = e;
  data.info = [];
  data.current = 1;
  if (e == 0) {
    data.show = false;
    getTask();
    return;
  } else if (e == 2) {
    getCars("1");
    data.show = true;
    return;
  } else {
    data.show = true;
    getCars(data.option[e].type_no);
  }
};
//获取排行
const getTask = () => {
  selectTask("1").then((res: any) => {
    if (res.state === 1) {
      data.info = res.data;
    }
  });
};

//获取当前tab栏中的车型
const getCars = (id: string) => {
  selectCity(id, data.current).then((res: any) => {
    if (res.state == 1) {
      if (res.data.length > 0) {
        data.info = res.data;
        if (res.data.length < 6) {
          data.more = "no-more";
        } else {
          data.more = "more";
        }
      } else {
        showToast("没有更多数据了");
        data.more = "no-more";
        data.current--;
      }
    } else {
      showToast(res.message);
    }
  });
};
//初始化获取tab栏
const getParentTypeNo = () => {
  getTypeNo("carShow").then(
    (
      res: Array<{
        parent_type_no: string;
        priority: number;
        type_name: string;
        type_no: string;
      }>
    ) => {
      data.option = res;
      getTask();
      // getCars(data.option[active.value].type_no);
    }
  );
};
//下一页新数据
function nextPage() {
  if (data.more == "no-more") {
    showToast("没有更多数据了");
  } else {
    ++data.current;
    if (data.type == 1) {
      getCars(data.option[active.value].type_no);
    } else {
      getCars("1");
    }
  }
}
//上一页数据
function lastPage() {
  if (data.current <= 1) {
    showToast("没有更多数据了");
    return;
  } else {
    --data.current;
    // getCars(data.option[active.value].type_no);
    if (data.type == 1) {
      getCars(data.option[active.value].type_no);
    } else {
      getCars("1");
    }
  }
}
onMounted(() => {
  getParentTypeNo();
});
</script>
<style lang="less" scoped>
.tabs {
  background: #274f8d;
  min-height: 821px;
  .button {
    background: #5d7baa;
    box-sizing: border-box;
    padding: 50px 100px;
    width: 699px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    border-radius: 0 0 10px 10px;

    button {
      color: #ffffff;
      font-weight: 500;
      font-size: 26px;
      background: none;
      border: #ffffff 4px solid;
      border-radius: 25px;
      width: 150px;
      height: 50px;
    }
  }
}
</style>
