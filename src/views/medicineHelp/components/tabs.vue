<template>
  <div class="list">
    <div class="title">
      <img src="https://imgcdn.dahebao.cn/20221221/20221221190706541403.png" />
    </div>
    <van-tabs color="#BE0A15" background="none" v-model:active="active">
      <van-tab title-class="tab" title="求助信息"
        ><List :need="1001" :mylist="false"
      /></van-tab>
      <van-tab title-class="tab" title="帮助信息"
        ><List :need="1002" :mylist="false"
      /></van-tab>
    </van-tabs>
    <footer>
      <img
        src="https://imgcdn.dahebao.cn/20221221/20221221214710417089.png"
        alt=""
      />
    </footer>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import List from "./list.vue";
interface dataType {}
const data = reactive<dataType>({});
const active = ref(0);
</script>
<style lang="less" scoped>
.list {
  margin: 0 auto;
  min-height: 300px;
  background: url("https://imgcdn.dahebao.cn/20221221/20221221191512703639.png");
  background-size: 100% 100%;
  padding-top: 10px;
  width: 685px;
  .title {
    margin-top: 45px;
    padding-left: 42px;
    width: 100%;
    height: 34px;
    margin-bottom: 40px;
    img {
      width: 203px;
      height: 34px;
    }
  }
}
footer {
  img {
    width: 683px;
    height: 269px;
  }
}
::v-deep .van-tab__text {
  display: block;
  height: 40px;
  font-size: 30px;
}
</style>
