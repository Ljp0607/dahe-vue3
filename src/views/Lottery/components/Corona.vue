<template>
  <!-- 抽奖区域 -->
  <main
    :style="{
      background: props.background ? `url(${props.background})` : '',
    }"
  >
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
          v-for="(item, index) in props.poolList"
          :key="index"
        >
          <div class="sector-inner">
            <span>{{ item.awardName }}</span>
            <img v-show="item.awardImage" :src="item.awardImage" />
          </div>
        </div>
      </div>
      <div class="pointer" @click="clickCoronak">
        <div class="start">立即抽奖</div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
import "vant/es/dialog/style";
import { showDialog } from "vant";
const props = defineProps({
  poolList: Array<any>,
  clickLottery: Function,
  result: Number,
  changeIsTurnOver: Function,
  // changeShow: Function,
  start: Boolean,
  myRecordList: Function,
  background: String,
});
console.log(props.background);

//抽奖链接
const data = reactive({
  rotateAngle: 0,
  time: 0,
  rotate_angle: "",
  item: 24,
});
//抽奖
function clickCoronak() {
  props.clickLottery();
}
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
    showDialog({
      message: props.poolList[i - 1].awardName,
    }).then(() => {
      // props.changeShow();
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
main {
  padding-top: 60px;
  width: 691px;
  height: 660px;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // background: red;
}
.wrapper {
  position: relative;
  height: 563px;
  width: 560px;
  background-image: url("https://imgcdn.dahebao.cn/20221123/20221123143246575179.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
.panel {
  position: relative;
  background: #b80100;
  background-image: url("https://imgcdn.dahebao.cn/20221123/20221123145330470324.png");
  background-size: 450px 450px;
  background-position: center;
  background-repeat: no-repeat;
  height: 447px;
  width: 447px;
  border-radius: 231px;
  box-sizing: border-box;
  margin-top: 52px;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.5),
    0 6px 20px 0 rgba(255, 255, 255, 0.5);
}
.sector {
  position: absolute;
  width: 220px;
  height: 440px;
  border-radius: 0px 220px 220px 0;
  overflow: hidden;
  left: 50%;
  top: 8px;
  transform-origin: left center;
  box-sizing: border-box;
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
.sector-inner {
  width: 220px;
  height: 440px;
  transform: rotate(-120deg);
  transform-origin: left center;
  box-sizing: border-box;
}
.sector-inner span {
  font-size: 24px;
  display: block;
  width: 168px;
  position: fixed;
  white-space: nowrap;
  overflow: hidden;
  bottom: 20px;
  left: 12px;
  transform-origin: center top;
  transform: rotate(150deg);
  color: #d46854;
  overflow: hidden;
}
.sector-inner img {
  height: 80px;
  width: 80px;
  display: block;
  position: fixed;
  bottom: 2px;
  left: 42px;
  transform-origin: center top;
  transform: rotate(150deg);
}
.pointer {
  width: 211px;
  height: 223px;
  background-image: url("https://imgcdn.dahebao.cn/20221123/20221123145731728123.png");
  background-size: 100% 100%;
  position: absolute;
  margin-top: 165px;
  .start {
    display: inline-block;
    margin: 0 auto;
    margin-top: 60px;
    width: 75px;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
  }
}
.van-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    box-sizing: border-box;
    padding-top: 30px;
    width: 620px;
    height: 500px;
    border-radius: 30px;
    background-color: #fff;
  }
}
.number {
  width: 570px;
  height: 293px;
  background-image: url("https://imgcdn.dahebao.cn/20221130/20221130163129461239.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 50px auto 0;
  box-sizing: border-box;
  padding-top: 80px;
  .residue {
    font-size: 38px;
    font-weight: bold;
    color: #4e1a02;
  }
  .assistance {
    width: 471px;
    height: 86px;
    line-height: 75px;
    background-image: url("https://imgcdn.dahebao.cn/20221130/20221130163152193201.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-top: 28px;
    font-size: 34px;
    font-weight: bold;
    color: #ffffff;
    // -webkit-text-stroke: 2px #441709;
    text-shadow: -1px -1px 0 #451701, 1px -1px 0 #451701, -1px 1px 0 #451701,
      1px 1px 0 #451701;
  }
}
</style>
