<template>
  <!-- 抽奖区域 -->
  <!-- #FFFFE0 -->
  <main>
    <div class="wrapper">
      <div class="light" v-for="(item, index) in data.item" :key="index"></div>
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
            <img :src="props.activity[index].awardImage" alt="" />
          </div>
        </div>
      </div>
      <div class="pointer" @click="clickCoronak">开始抽奖</div>
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
      message: "恭喜获得" + props.activity[i - 1].awardName,
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
  height: 508px;
  width: 508px;
  background-color: #619ded;
  box-shadow: 0 0 15px 10px #84d2f9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .light {
    background: black;
    position: absolute;
    height: 10px;
    width: 10px;
    box-sizing: 100;
    border-radius: 50%;
    top: 10px;
    left: 248px;
    transform-origin: center 247px;
  }
  .light:nth-child(2) {
    transform: rotate(15deg);
  }
  .light:nth-child(3) {
    transform: rotate(30deg);
  }
  .light:nth-child(4) {
    transform: rotate(45deg);
  }
  .light:nth-child(5) {
    transform: rotate(60deg);
  }
  .light:nth-child(6) {
    transform: rotate(75deg);
  }
  .light:nth-child(7) {
    transform: rotate(90deg);
  }
  .light:nth-child(8) {
    transform: rotate(105deg);
  }
  .light:nth-child(9) {
    transform: rotate(120deg);
  }
  .light:nth-child(10) {
    transform: rotate(135deg);
  }
  .light:nth-child(11) {
    transform: rotate(150deg);
  }
  .light:nth-child(12) {
    transform: rotate(165deg);
  }
  .light:nth-child(13) {
    transform: rotate(180deg);
  }
  .light:nth-child(14) {
    transform: rotate(195deg);
  }
  .light:nth-child(15) {
    transform: rotate(210deg);
  }
  .light:nth-child(16) {
    transform: rotate(225deg);
  }
  .light:nth-child(17) {
    transform: rotate(240deg);
  }
  .light:nth-child(18) {
    transform: rotate(255deg);
  }
  .light:nth-child(19) {
    transform: rotate(270deg);
  }
  .light:nth-child(20) {
    transform: rotate(285deg);
  }
  .light:nth-child(21) {
    transform: rotate(300deg);
  }
  .light:nth-child(22) {
    transform: rotate(315deg);
  }
  .light:nth-child(23) {
    transform: rotate(330deg);
  }
  .light:nth-child(24) {
    transform: rotate(345deg);
  }
  .light:nth-child(2n) {
    background-color: #fbfffe;
  }
  .light:nth-child(2n + 1) {
    background-color: #ffdf2a;
  }
}
.panel {
  position: relative;
  height: 440px;
  width: 440px;
  border-radius: 220px;
  border: #3375ca 8px solid;
  background: #aaa;
}

.sector {
  position: absolute;
  width: 224px;
  height: 448px;
  border-radius: 0px 224px 224px 0;
  overflow: hidden;
  left: 50%;
  top: -2px;
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
  width: 200px;
  display: block;
  position: fixed;
  bottom: 0;
  transform-origin: center top;
  transform: rotate(150deg);
  // margin-left: 38px;
  // margin: 0 auto;
  color: #d46854;
}
.sector-inner img {
  width: 100px;
  margin-left: 30px;
  margin-bottom:5px ;
  display: block;
  position: fixed;
  bottom: 0;
  transform-origin: center top;
  transform: rotate(150deg);
}
.pointer {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 80px;
  width: 80px;
  color: #5997ec;
  padding: 20px;
  line-height: 40px;
  text-align: center;
  background-image: radial-gradient(#fee171, #fbc65a, #fcfeef);
  border-radius: 50%;
  border: 6px solid #5e97e8;
  // transition: transform 3s cubic-bezier(0.2, 0.93, 0.43, 1);
  // opacity: 0.4;
  transition: 0.3s;
}
.pointer::after {
  content: "";
  position: absolute;
  top: -104px;
  left: 42px;
  border-width: 50px 18px;
  border-style: solid;
  border-color: transparent;
  border-bottom-color: #5e97e8;
  // transform-origin: 20px center;
  // transform: rotate(20deg);
}
</style>
