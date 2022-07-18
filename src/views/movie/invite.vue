<template>
  <div class="content">
    <div class="main"></div>
    <div class="rule">
      <div class="rule_title">邀请规则</div>
      <div class="rule_introduce">
        1、用户截图保存后转发好友，使用第一个二维码扫描下载。
        2、被邀好友注册登录豫视频APP后，“我的”→“邀请码”扫描下方个人
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.content {
  width: 100vw;
  min-height: 100vh;
  background: #fd6c35;
  text-align: center;
  .main {
    background-image: url("@/assets/movie/bg10.png");
    background-size: 701px 924px;
    background-repeat: no-repeat;
  }
  .rule {
    background: #fc5626;
    width: 683px;
    height: 370px;
    .rule_title {
      font-size: 60px;
      font-weight: 400;
      color: #ffffff;
    }
    .rule_introduce {
      font-size: 26px;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
