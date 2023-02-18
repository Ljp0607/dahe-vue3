<template>
  <footer>
    <img src="https://imgcdn.dahebao.cn/20230215/20230215151049180445.png" />
    <img
      @click="show = true"
      class="sign"
      src="https://imgcdn.dahebao.cn/20230215/20230215161932567214.png"
    />
    <div class="popup" v-if="show">
      <div class="waper">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
              v-model="name"
              name="username"
              label="姓名"
              placeholder="请输入姓名"
              :rules="[{ required: true, message: '请输入姓名' }]"
            />
            <van-field
              v-model="phone"
              name="phone"
              label="手机号"
              placeholder="请输入手机号"
              :rules="[{ pattern, message: '请输入正确手机号' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { saveAddress } from "@/api/autoShow/index";
import { useCounterStore } from "@/stores/counter";
import { showToast } from "vant";
const show = ref<boolean>(false);
const store = useCounterStore();
const name = ref<string>("");
const phone = ref<number>();
const pattern =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
const onSubmit = (values: any) => {
  //点击报名
  saveAddress(
    `?userId=${store.userId}&activityNo=43104017e2a348e5a2617147f95bb949`,
    JSON.stringify({
      realName: values.username,
      recordNo: "e33757bde60146c5a24d02af3156c705",
      phone: values.phone,
      activityNo: "43104017e2a348e5a2617147f95bb949",
      address: "保存成功",
    })
  ).then((res: any) => {
    if (res.state == 1) {
      show.value = false;
      phone.value = null;
      name.value = "";
      showToast(res.message);
    }
  });
};
</script>
<style lang="less" scoped>
footer {
  margin-top: 50px;
  text-align: center;
  position: relative;
  img {
    width: 622px;
    height: 504px;
  }
  .sign {
    position: absolute;
    top: 347px;
    left: 50%;
    transform: translate(-50%);
    width: 513px;
    height: 107px;
  }
  .popup {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    .waper {
      padding-top: 60px;
      background: #fff;
      margin: 500px auto;
      width: 600px;
      height: 500px;
      box-sizing: border-box;
      border-radius: 30px;
    }
  }
}
</style>
