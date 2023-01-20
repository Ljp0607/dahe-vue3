<template>
  <div class="tabs">
    <van-tabs
      v-model:active="active"
      @change="changeActive"
      :animated="false"
      swipeable
      :ellipsis="false"
      background="linear-gradient(#FFC25D, #ff8619)"
      title-inactive-color="#363636"
      title-active-color="#FF0200"
      color="#FF0200"
    >
      <van-tab
        v-for="(item, index) in data.option"
        :title="item.type_name"
        :key="index"
      >
        <List :info="data.info" />
        <div v-show="data.info.length > 0" class="button">
          <button @click="lastPage">上一页</button>
          <button @click="nextPage">下一页</button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onUpdated } from "vue";
import List from "./list.vue";
import { selectHouse, getTypeNo } from "@/api/spring/index";
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
  more: string;
}
const data = reactive<dataType>({
  option: [], //tabs栏
  info: [], //tab栏下的数据
  current: 1,
  more: "more",
});
interface Props {
  drawRule: string;
}
const props = defineProps<Props>();
const active = ref<number>(0);
//切换tab栏
const changeActive = () => {
  getCars();
  data.current = 1;
};
//获取当前tab栏中的车型
const getCars = () => {
  selectHouse(data.option[active.value].type_no, data.current).then(
    (res: any) => {
      if (res.state == 1) {
        
        data.info = res.data;
      } else {
        showToast(res.message);
      }
    }
  );
};
//c初始化获取tab栏
const getParentTypeNo = () => {
  getTypeNo(props.drawRule).then(
    (
      res: Array<{
        parent_type_no: string;
        priority: number;
        type_name: string;
        type_no: string;
      }>
    ) => {
      data.option = res;
      getCars();
    }
  );
};
//下一页新数据
const nextPage = () => {
  if (data.more === "more") {
    data.current++;
    getCars();
  } else {
    showToast("没有更多数据了");
  }
};
//上一页数据
const lastPage = () => {
  if (data.current <= 1) {
    showToast("没有更多数据了");
    return;
  } else {
    data.current--;
    getCars();
  }
};

onUpdated(() => {
  if (props.drawRule) {
    getParentTypeNo();
  }
});
</script>
<style lang="less" scoped>
.tabs {
  background: #d60000;
  min-height: 1021px;
}
</style>
