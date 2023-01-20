<template>
  <div class="content" @click="navigetFirst">
    <div class="first_img">
      <img
        class="first"
        src="https://imgcdn.dahebao.cn/20230112/20230112105134744667.png"
      />
      <img
        class="first"
        src="https://imgcdn.dahebao.cn/20230112/20230112105151165580.png"
      />
    </div>
    <img
      class="second start2"
      src="https://imgcdn.dahebao.cn/20230112/20230112104824433023.png"
    />
    <!-- <img
      class="third start3"
      src="https://imgcdn.dahebao.cn/20221227/20221227200351125074.png"
    /> -->
    <img
      @click="navigetFirst"
      class="fourth"
      src="https://imgcdn.dahebao.cn/20230103/20230103151203133242.png"
    />
    <img
      src="https://imgcdn.dahebao.cn/20221227/20221227200912268990.png"
      class="fifth"
    />
    <img
      src="https://imgcdn.dahebao.cn/20221227/20221227200929510429.png"
      class="sixth"
    />
    <img
      src="https://imgcdn.dahebao.cn/20230103/20230103151333811061.png"
      class="footer"
    />
    <img
      class="text"
      src="https://imgcdn.dahebao.cn/20221227/20221227202421170385.png"
    />
    <img
      class="icon"
      src="https://imgcdn.dahebao.cn/20230112/20230112105744954599.png"
    />
  </div>
</template>
<script setup lang="ts">
interface Props {
  changeActive: Function;
}
const props = defineProps<Props>();
//切换第一帧图画
const navigetFirst = () => {
  props.changeActive();
};
</script>
<style lang="less" scoped>
.content {
  width: 750px;
  height: 100vh;
  background: linear-gradient(#8cd9e7, #87ebca);
  text-align: center;
  box-sizing: border-box;
  padding-top: 74px;
  position: relative;
  .first_img {
    box-sizing: border-box;
    padding: 0 50px;
    display: flex;
    justify-content: space-around;
    .first {
      width: 200px;
      z-index: 100;
      animation: footer 6s;
    }
  }

  .second {
    position: absolute;
    width: 593px;
    top: 309px;
    left: 75px;
    z-index: 100;
    animation: footer 6s;
  }
  .third {
    width: 394px;
    z-index: 100;
    position: absolute;
    top: 507px;
    animation: footer 8s;
    left: 167px;
  }
  .fourth {
    position: absolute;
    left: 30px;
    bottom: 69px;
    width: 639px;
    z-index: 2;
    animation: footer 3s;
  }
  .fifth {
    width: 144px;
    position: absolute;
    left: 96px;
    bottom: 535px;
    animation: footer 12s;
  }
  .sixth {
    z-index: 1;
    width: 166px;
    position: absolute;
    right: 63px;
    bottom: 381px;
    animation: footer 10s;
  }
  .footer {
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 440px;
    animation: footer 3s;
  }
  .text {
    position: absolute;
    width: 378px;
    left: 178px;
    bottom: 205px;
    z-index: 100;
    animation: start 4s;
  }
  .icon {
    position: absolute;
    width: 378px;
    left: 178px;
    bottom: 85px;
    z-index: 100;
    // animation: start 4s;
  }

  @keyframes footer {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0.2;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
}
@keyframes start {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  45% {
    opacity: 0;
  }
  60%,
  100% {
    opacity: 1;
  }
}
</style>
