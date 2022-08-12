<template>
  <!-- 盒子模型 -->
  <div class="content">
    <!-- 标题 -->
    <div class="title" @click="lll">邀请好友免费观影</div>
    <!-- 规则 -->
    <div class="introduce">
      规则：中用类似于文件夹的符号表示的模型元素的组合。系统中的每只能为一个包所有套在另一个包中。
    </div>
    <!-- 主图 -->
    <div class="main_picker">
      <img src="@/assets/movie/bg1.png" alt="" />
    </div>
    <!-- 邀请跳转 -->
    <div class="record">
      <img src="@/assets/movie/bg2.png" alt="" />
    </div>
    <!-- 两个点击按钮 -->
    <div class="submit">
      <button class="get" @click="data.show = true">点击领取</button>
      <button @click="data.showFriend = true" class="invite">邀请好友</button>
    </div>
    <!-- 下部电影票 -->
    <div class="foot">
      <img class="tip" src="@/assets/movie/bg3.png" alt="" />
    </div>
    <!-- 遮罩层 点击领取-->
    <van-overlay :show="data.show" class="overlay">
      <div class="wrapper">
        <div>
          <div class="block_get"></div>
          <img
            @click="data.show = false"
            class="close"
            src="@/assets/movie/bg7-close.png"
            alt=""
          />
        </div>
      </div>
    </van-overlay>
    <!-- 遮罩层 邀请好友-->
    <van-overlay :show="data.showFriend" class="overlay">
      <div class="wrapper">
        <div>
          <div class="block_invite">
            <div class="message">填报信息</div>
            <van-form @failed="onSubmit">
              <van-cell-group class="input" inset>
                <!-- 通过 pattern 进行正则校验 -->
                <van-field
                  v-model="Info.name"
                  name="name"
                  placeholder="您的姓名"
                  :rules="[{ required: true, message: '请填写您的姓名' }]"
                />
                <van-field
                  v-model="Info.phone"
                  name="pattern"
                  placeholder="您的手机号"
                  :rules="[{ pattern, message: '请输入正确手机号' }]"
                />
              </van-cell-group>
              <div style="margin: 16px">
                <van-button
                  class="submit_message"
                  round
                  block
                  native-type="submit"
                >
                  提交
                </van-button>
              </div>
            </van-form>
          </div>
          <img
            class="close"
            @click="data.showFriend = false"
            src="@/assets/movie/bg8-close.png"
            alt=""
          />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import loginApi from "../../api/movie/getUser";
const pattern =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$/;

const data = reactive({
  show: false,
  showFriend: false,
});
const Info = reactive({
  name: "",
  phone: "",
});

function lll() {
  console.log(123);
  loginApi("lll", "?userId=eeeee");
}

function onSubmit(res) {
  console.log(res);
  console.log(Info);
}
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  min-height: 100vh;
  background: #e4e4e4;
  padding-top: 100px;
  text-align: center;
  position: relative;
  .title {
    font-size: 82px;
    font-family: yixinkaijiahei;
    font-weight: 400;
    color: #0066f1;
    text-shadow: 0px 1px 13px #9a9393;
  }
  .introduce {
    width: 638px;
    padding: 21px 18px;
    background: #eeeeee;
    font-size: 24px;
    font-weight: 400;
    color: #6f6f6f;
    margin: 0 auto;
  }
  .main_picker {
    margin: 0 auto;
    width: 628px;
    height: 575px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .record {
    position: absolute;
    width: 94px;
    height: 88px;
    top: 430px;
    right: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .submit {
    width: 690px;
    height: 106px;
    margin: 0 auto;
    margin-top: -40px;
    .get {
      background: #0066f1;
      margin-right: 20px;
    }
    button {
      background: #fd6c34;
      width: 334px;
      height: 106px;
      border-radius: 50px;
      border: 10px solid #fff;
      color: #fff;
      font-size: 50px;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .foot {
    margin: 0 auto;
    margin-top: 42px;
    width: 702px;
    height: 436px;
    background-image: url("@/assets/movie/bg5.png");
    background-size: 702px 436px;
    background-repeat: no-repeat;
    .tip {
      float: left;
      margin: 20px 12px;
      width: 205px;
      height: 67px;
    }
  }
  .overlay {
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    .block_get {
      background-image: url("@/assets/movie/bg7.png");
      background-size: 546px 587px;
      background-repeat: no-repeat;
      width: 546px;
      height: 587px;
    }

    .block_invite {
      background-image: url("../../assets/movie/bg8.png");
      background-size: 514px 623px;
      background-repeat: no-repeat;
      width: 514px;
      height: 623px;
      // padding-top: 75px;
      .message {
        padding-top: 75px;
        font-size: 54px;
        font-weight: 400;
        color: #0065f1;
      }
      .input {
        width: 375px;
        margin: 31px auto;
      }
      .submit_message {
        color: #fff;
        font-size: 48px;
        font-weight: 400;
        background: #0065f1;
        width: 355px;
        margin: 0 auto;
        margin-top: 15px;
      }
    }
    .close {
      margin: 20px auto;
      display: block;
      width: 69px;
      height: 69px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
