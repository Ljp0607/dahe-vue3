<template>
  <div class="container">
    <van-form @submit="onSubmit" class="form">
      <!-- <van-cell-group inset> -->
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="data.name"
        placeholder="姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="data.phone"
        placeholder="电话"
        :rules="[{ pattern, message: '请输入正确电话号码' }]"
      />
      <van-field
        v-model="data.car"
        placeholder="意向车型"
        :rules="[{ required: true, message: '请输入意向车型' }]"
      />
      <!-- </van-cell-group> -->
      <div style="margin: 16px">
        <van-button block native-type="submit"> 立即报名 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { showToast, showLoadingToast, closeToast } from "vant";
import { saveCity } from "@/api/vote";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
interface dataType {
  name?: string;
  phone?: number;
  car?: string;
}
//定义上传数据
const data = reactive<dataType>({
  name: "",
  phone: null,
  car: "",
});

const onSubmit = () => {
  console.log(data);
};
//正则
const pattern =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
</script>
<style lang="less" scoped>
.container {
  background: #274f8d;
  width: 750px;
  min-height: 100vh;
  background-image: url("https://imgcdn.dahebao.cn/20230317/20230317171027719222.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding-top: 600px;
  box-sizing: border-box;
  .form {
    margin: 0 auto;
    width: 550px;
    .van-cell {
      border-radius: 10px;
      margin-bottom: 40px;
      // height: 80px;
    }
    .van-button {
      font-size: 40px;
      border: none;
      font-weight: 800;
      color: #274f8d;
      background: #f39d09;
      margin-top: 70px;
    }
  }
}
</style>
