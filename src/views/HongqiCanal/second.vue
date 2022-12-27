<template>
  <div class="content">
    <img
      class="one bg"
      src="https://imgcdn.dahebao.cn/20221227/20221227224916285625.png"
    />
    <img
      class="one bg"
      src="https://imgcdn.dahebao.cn/20221227/20221227224930496318.png"
    />
    <img
      class="three bg"
      src="https://imgcdn.dahebao.cn/20221227/20221227225226408453.png"
      alt=""
    />

    <img
      class="first bg"
      src="https://imgcdn.dahebao.cn/20221227/20221227225731176565.png"
    />
    <img
      class="second bg"
      src="https://imgcdn.dahebao.cn/20221227/20221227225742380890.png"
    />
    <img
      class="third bg"
      src="https://imgcdn.dahebao.cn/20221227/20221227225751397581.png"
    />
    <img
      class="fore bg"
      src="https://imgcdn.dahebao.cn/20221227/20221227225801159933.png"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
interface dataType {}
const data = reactive<dataType>({});
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-image: url("https://imgcdn.dahebao.cn/20221227/20221227224626164549.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .bg {
    position: absolute;
  }
  .one {
    width: 750px;
    bottom: 860px;
    left: 0;
  }
  .three {
    width: 750px;
    bottom: 0;
    left: 0;
  }
  .first {
    width: 482px;
    bottom: 241px;
    left: 219px;
  }
  .second {
    width: 342px;
    bottom: 452px;
    left: 54px;
  }
  .third {
    left: 0;
    bottom: 0;
    width: 750px;
  }
  .fore {
    width: 575px;
    bottom: 416px;
    left: 166px;
  }
}
</style>
