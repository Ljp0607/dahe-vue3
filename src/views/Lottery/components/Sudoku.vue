<template>
  <div>
    <main
      :style="{
        background: props.background ? `url(${props.background})` : '',
      }"
      style="background-size: 100% 100%"
    >
      <div
        v-for="(item, index) in data.item"
        :style="{
          background: item.state ? '#FFFFE0' : `url(${props.qrImage})`,
        }"
        style="background-size: 100% 100%"
        :key="index"
        class="item"
      >
        <div v-if="props.activity">
          <!-- 奖品图片 -->
          <img
            v-show="props.activity[index].awardImage"
            :src="props.activity[index].awardImage"
          />
          <!-- 奖品名字 -->
          <div class="giftName">
            {{ props.activity[index].awardName }}
          </div>
        </div>
      </div>
      <!-- 点击抽奖按钮 -->
      <div class="clickLott" @click="click">立即抽奖</div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
import "vant/es/dialog/style";
import { showDialog } from "vant";
const props = defineProps({
  qrImage: String,
  start: Boolean,
  activity: Array<any>, //抽奖配置
  result: Number, //抽中的结果
  clickLottery: Function,
  changeIsTurnOver: Function, //抽奖的状态
  // changeShow: Function, //调领奖
  background: String,
});
//抽奖链接
const data = reactive({
  // isTurnOver: true,
  //初步样式
  item: [
    { state: false }, //飞龙
    { state: false }, //观音菩萨
    { state: false }, //魔鬼
    { state: false }, //剑齿虎
    { state: false }, //应帅
    { state: false }, //戴沐白
    { state: false }, //吗红晕
    { state: false }, //白虎
    { state: false }, //无敌怪兽
  ],
});

//抽奖遍历   0, 1, 2, 5, 8, 7, 6, 3
function startLottery(id) {
  let num = [120, 80, 60, 60, 50, 100, 200, 200, 250];
  let sum = num.length;
  let interval = 0;
  num.forEach((delay, index) => {
    setTimeout(() => {
      getLottery(delay, index + 1, sum, id);
    }, interval);
    //因为每一圈转完所用的时间是不一样的，所以要做一个叠加操作
    interval += delay * 8;
  });
}
//封装抽奖
function getLottery(delay, index, sum, id) {
  let order_arr = [0, 1, 2, 5, 8, 7, 6, 3];
  // 页面奖品总数组
  // 如果转到最后以前，把数组截取到奖品项的位置
  if (index == sum) {
    order_arr.splice(id);
  }
  for (let i in order_arr) {
    setTimeout(() => {
      // 清理掉选中的状态
      data.item.forEach((e: any) => {
        e.state = false;
      });
      // 执行到第几个就改变它的选中状态
      data.item[order_arr[i]].state = true;
      // 如果转到最后一圈且转完了，把抽奖状态改为已经转完了
      if (index == sum && Number(i) == order_arr.length - 1) {
        showDialog({
          message: props.activity[order_arr[i]].awardName,
        }).then(() => {
          // props.changeShow();
        });
        props.changeIsTurnOver();
      }
    }, delay * Number(i));
  }
}
//点击抽奖
function click() {
  props.clickLottery();
}
watch(
  () => props.start,
  (newValue, oldValue) => {
    startLottery(props.result);
  }
);
</script>
<style lang="less" scoped>
main {
  margin: 0 auto;
  border-radius: 21px;
  padding: 70px 74px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  position: relative;
  width: 667px;
  height: 675px;
  .decorate_top {
    width: 460px;
    height: 22px;
    top: 12px;
    left: 34px;
    position: absolute;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
    .tip {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 3.5px;
      background: white;
      box-shadow: 0 0 5px 5px #a079dd;
    }
  }
  .decorate_left {
    width: 12px;
    height: 460px;
    top: 46px;
    left: 10px;
    position: absolute;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    .tip {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 3.5px;
      background: white;
      box-shadow: 0 0 5px 5px #a079dd;
    }
  }
  .decorate_right {
    width: 12px;
    height: 460px;
    top: 46px;
    right: 10px;
    position: absolute;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    .tip {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 3.5px;
      background: white;
      box-shadow: 0 0 5px 5px #a079dd;
    }
  }
  .decorate_bottom {
    width: 460px;
    height: 22px;
    bottom: 6px;
    left: 34px;
    position: absolute;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
    .tip {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 3.5px;
      background: white;
      box-shadow: 0 0 5px 5px #a079dd;
    }
  }

  img {
    margin-top: 20px;
    width: 80px;
    height: 80px;
  }
  .giftName {
    margin: 5px 8px;
    font-size: 25px;
    // text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .item {
    width: 151px;
    height: 160px;
    text-align: center;
  }
  .clickLott {
    width: 145px;
    // #FC6804
    background: #fc6804;
    height: 140px;
    top: 260px;
    left: center;
    box-sizing: border-box;
    border-radius: 10px;
    position: absolute;
    font-weight: 800;
    padding: 20px 31px;
    font-size: 39px;
    color: white;
  }
}
</style>
