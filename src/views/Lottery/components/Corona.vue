<template>
  <!-- 抽奖区域 -->
  <main>
    <div class="wrapper">
      <div
        class="panel"
        :style="{
          transform: data.rotate_angle,
          transition: '5s',
        }"
      >
        <div
          class="sector"
          v-for="(item, index) in data.activity.poolList"
          :key="index"
        >
          <div class="sector-inner">
            <span>{{ props.activity[index].awardName }}</span>
            <img
              v-show="props.activity[index].awardImage"
              :src="props.activity[index].awardImage"
            />
          </div>
        </div>
      </div>
      <div class="pointer" @click="clickCoronak">
        <!-- <img src="../../../assets/Lottery/02.png" @click="clickCoronak" /> -->
        <div class="start">立即抽奖</div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { reactive, watch } from "vue";
import "vant/es/dialog/style";
import { Dialog } from "vant";
const props = defineProps({
  activity: Array,
  clickLottery: Function,
  result: Number,
  changeIsTurnOver: Function,
  changeShow: Function,
  start: Boolean,
});
//抽奖链接
const data = reactive({
  rotateAngle: 0,
  time: 0,
  rotate_angle: "",
  item: 24,
  activity: {
    poolList: [
      {
        name: "iphone",
      },
      {
        name: "ipad",
      },
      {
        name: "switch",
      },
      {
        name: "玩具",
      },
      {
        name: "好玩的",
      },
      {
        name: "好吃的",
      },
    ],
  },
});
//抽奖
function clickCoronak() {
  props.clickLottery();
}
//开始抽奖
//封装抽奖
function rotateAngle(i) {
  data.rotateAngle = data.rotateAngle - data.time;
  //初试转的圈数
  switch (i) {
    //第一个奖品角度
    case 1:
      data.time = Math.random() * (30 - 0) + 0;
      break;
    //第二个奖品角度
    case 6:
      data.time = Math.random() * (85 - 35) + 35;
      break;
    //第三个奖品角度
    case 5:
      data.time = Math.random() * (145 - 95) + 95;
      break;
    //第四个奖品角度
    case 4:
      data.time = Math.random() * (205 - 155) + 155;
      break;
    //第五个奖品角度
    case 3:
      data.time = Math.random() * (265 - 215) + 215;
      break;
    //第六个奖品角度
    case 2:
      data.time = Math.random() * (325 - 275) + 275;
      break;
  }
  data.rotateAngle = data.rotateAngle + 3600 + data.time;
  data.rotate_angle = `rotate(${data.rotateAngle}deg)`;
  setTimeout(function () {
    Dialog.alert({
      message: props.activity[i - 1].awardName,
    }).then(() => {
      props.changeShow();
      // refresh();
    });
    props.changeIsTurnOver();
  }, 5200);
}

watch(
  () => props.start,
  (newValue, oldValue) => {
    rotateAngle(props.result);
  }
);
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  height: 585px;
  width: 585px;
  background-image: url("../../../assets/Lottery/01.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.panel {
  position: relative;
  height: 464px;
  width: 464px;
  border-radius: 232px;
  // border: #3375ca 8px solid;
  background: #3375ca;
}

.sector {
  position: absolute;
  width: 224px;
  height: 448px;
  border-radius: 0px 224px 224px 0;
  overflow: hidden;
  left: 50%;
  top: 8px;
  transform-origin: left center;
}
.sector:nth-child(1) {
  transform: rotate(-30deg);
}
.sector:nth-child(2) {
  transform: rotate(30deg);
}
.sector:nth-child(3) {
  transform: rotate(90deg);
}
.sector:nth-child(4) {
  transform: rotate(150deg);
}
.sector:nth-child(5) {
  transform: rotate(210deg);
}
.sector:nth-child(6) {
  transform: rotate(270deg);
}
.sector:nth-child(2n + 1) .sector-inner {
  background: #fff1ad;
}
.sector:nth-child(2n) .sector-inner {
  background: #f3d4b3;
}
.sector-inner {
  width: 224px;
  height: 448px;
  transform: rotate(-120deg);
  transform-origin: left center;
  box-sizing: border-box;
}
.sector-inner span {
  font-size: 28px;
  display: block;
  width: 168px;
  position: fixed;
  white-space: nowrap;
  // text-overflow: ellipsis;
  overflow: hidden;
  // word-break: break-all;
  bottom: 5px;
  left: 18px;
  transform-origin: center top;
  transform: rotate(150deg);
  color: #d46854;
}
.sector-inner img {
  height: 42px;
  width: 42px;
  display: block;
  position: fixed;
  bottom: 46px;
  left: 55px;
  transform-origin: center top;
  transform: rotate(150deg);
}
.pointer {
  width: 186px;
  height: 222px;
  background-image: url("../../../assets/Lottery/02.png");
  background-size: 100% 100%;
  position: absolute;
  .start {
    display: inline-block;
    margin: 0 auto;
    margin-top: 80px;
    width: 75px;
    font-size: 30px;
    font-weight: bold;
    color: #5997ec;
  }
}
</style>
