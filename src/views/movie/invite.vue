<template>
  <div class="content">
    <div class="header">
      <div class="record" @click="navigetBack">
        <van-icon size="26" name="arrow-left" />
      </div>
      <div>邀请好友免费观影</div>
      <div class="record">邀请记录</div>
    </div>
    <div class="main">
      <img class="one code" src="@/assets/movie/bg6.png" alt="" />
      <img class="two code" src="@/assets/movie/bg6.png" alt="" />
    </div>
    <div class="rule">
      <div class="rule_title">邀请规则</div>
      <div class="rule_introduce">
        <div>1、用户截图保存后转发好友，使用第一个二维码扫描下载。</div>
        <div>2、被邀好友注册登录豫视频APP后，“我的”→“邀请码”扫描下方个人</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function navigetBack() {
  router.back();
}
// name: {
//   invite;
// }
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  min-height: 100vh;
  background: #fd6c35;
  text-align: center;
  box-sizing: border-box;
  padding-bottom: 60px;
  .header {
    color: #fff;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 60px 30px 30px;
    .record {
      width: 150px;
      text-align: left;
    }
  }
  .main {
    width: 701px;
    height: 924px;
    margin: 80px auto;
    background-image: url("@/assets/movie/bg10.png");
    background-size: 701px 924px;
    background-repeat: no-repeat;
    position: relative;
    .one {
      top: 112px;
    }
    .two {
      top: 529px;
    }
    .code {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      width: 264px;
      height: 255px;
    }
  }
  .rule {
    margin: 0 auto;
    background: #fc5626;
    width: 683px;
    height: 370px;
    box-sizing: border-box;
    padding: 54px;
    .rule_title {
      font-size: 60px;
      font-weight: 400;
      color: #ffffff;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .rule_introduce {
      font-size: 26px;
      font-weight: 400;
      color: #ffffff;
      text-align: left;
    }
  }
}
</style>
