<template>
  <div>
    <main>
      <div class="decorate_top">
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
      </div>
      <div class="decorate_left">
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
      </div>
      <div class="decorate_right">
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
      </div>
      <div class="decorate_bottom">
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
        <div class="tip"></div>
      </div>
      <div
        v-for="(item, index) in data.item"
        :style="{ background: item.state ? '#FFFFE0' : '' }"
        :key="index"
        :class="[item.color ? 'btn' : '', 'item']"
      >
        <div v-if="props.activity">
          <!-- 奖品图片 -->
          <img :src="props.activity[index].awardImage" />
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
<script setup>
import { reactive, watch } from "vue";
import "vant/es/dialog/style";
import { Dialog } from "vant";
const props = defineProps({
  start: Boolean,
  activity: Array, //抽奖配置
  result: Number, //抽中的结果
  clickLottery: Function,
  changeIsTurnOver: Function, //抽奖的状态
  changeShow: Function, //调领奖
});
//抽奖链接
const data = reactive({
  // isTurnOver: true,
  //初步样式
  item: [
    { state: 0, color: 1 },
    { state: 0, color: 0 },
    { state: 0, color: 1 },
    { state: 0, color: 0 },
    { state: 0, color: 0 },
    { state: 0, color: 0 },
    { state: 0, color: 1 },
    { state: 0, color: 0 },
    { state: 0, color: 1 },
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
      data.item.forEach((e) => {
        e.state = false;
      });
      // 执行到第几个就改变它的选中状态
      data.item[order_arr[i]].state = true;
      // 如果转到最后一圈且转完了，把抽奖状态改为已经转完了
      if (index == sum && i == order_arr.length - 1) {
        Dialog.alert({
          message: props.activity[order_arr[i]].awardName,
        }).then(() => {
          props.changeShow();
        });
        props.changeIsTurnOver();
      }
    }, delay * i);
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
  background: #5e9aed;
  width: 486px;
  height: 486px;
  border-radius: 21px;
  box-shadow: 0 0 5px 6px #9ddbfc;
  padding: 31px 23px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
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
    margin-top: 24px;
    width: 50px;
    height: 50px;
  }
  .giftName {
    margin: 12px 8px;
    font-size: 25px;
    // text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .item {
    width: 141px;
    height: 136px;
    border-radius: 10rpx;
    background: #fdf3aa;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 8px #dace4a;
  }
  .btn {
    background: #f1d5b0;
    box-shadow: 0 8px #fd8748;
  }
  .clickLott {
    background: linear-gradient(0deg, #fa5025 0%, #fe9c56 100%);
    width: 142px;
    height: 136px;
    box-shadow: 0 8px #fa5025;
    border-radius: 10px;
    box-sizing: border-box;
    position: absolute;
    padding: 20px 31px;
    font-size: 39px;
    color: white;
    text-align: center;
  }
}
</style>
