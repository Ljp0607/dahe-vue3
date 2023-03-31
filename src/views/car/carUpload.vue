<template>
  <div class="container">
    <van-form @submit="onSubmit" class="form">
      <!-- <van-cell-group inset> -->
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="Info.field3"
        placeholder="姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="Info.field4"
        placeholder="电话"
        :rules="[{ pattern, message: '请输入正确电话号码' }]"
      />
      <van-field
        v-model="Info.field5"
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
import { reactive } from "vue";
import { showToast, } from "vant";
import { saveCity } from "@/api/vote";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";
import { goLogin } from "@/common/appRoute.js";
const store = useCounterStore();
const router = useRouter();
//用户填写信息
interface infoType {
  user_id: string;
  posts_title: string;
  posts_video_img: string;
  source: string;
  field3: string;
  field4: string;
  field5: string;
  activityNo: string;
  creatorType: string; //地市编码 必传
  creator_type: string;
  posts_img: string;
}
const Info = reactive<infoType>({
  posts_title: "", //标题 必传
  posts_img: "", //图片
  posts_video_img: "",
  user_id: store.$state.userId, //用户
  source: "0",
  field3: "",
  field4: "",
  field5: "",
  activityNo: "c966e69caea74b0587177f9a8eecb7bf", //评选活动编码 必传
  creatorType: "1999", //地市编码 必传
  creator_type: "1999", //地市编码 必传
});
const onSubmit = () => {
  if (store.userId) {
    saveCity(Info).then((res: any) => {
      if (res.state == 1) {
        showToast("提交成功");
        setTimeout(() => {
          router.push("carShow");
        }, 1000);
      } else {
        showToast(res.message);
      }
    });
  } else {
    showToast("请登录后填写报名");
    setTimeout(() => {
      goLogin();
    });
  }
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
