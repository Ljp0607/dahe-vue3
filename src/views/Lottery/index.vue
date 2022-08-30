<template>
  <!-- 盒子模型 -->
  <div
    class="content"
    :style="{
      background: data.activity.background
        ? `url(${data.activity.background})`
        : '',
    }"
    style="background-size: 100% 100%; background-repeat: no-repeat"
  >
    <header>
      <img class="header_title" :src="data.activity.activityName" />
      <img class="header_rule" :src="data.activity.activityRuleImage" />
      <!-- 活动规则颜色 -->
      <div
        class="activityRule"
        :style="{
          color: data.activity.activityRuleStyle
            ? data.activity.activityRuleStyle
            : '#727272',
        }"
      >
        {{ data.activity.activityRule }}
      </div>
    </header>
    <!-- 标题文字 -->
    <div
      class="title"
      v-if="data.activity.drawType == 1 || data.activity.drawType == 2"
    >
      <!-- 时间颜色 -->
      <div
        :style="{
          color: data.activity.dateStyle ? data.activity.dateStyle : '#727272',
        }"
      >
        时间：{{ data.activity.createTime }}-{{ data.activity.endDate }}
      </div>
      <!-- 抽奖次数颜色 -->
      <div
        class="text"
        :style="{
          color: data.activity.drawCountFontStyle
            ? data.activity.drawCountFontStyle
            : '#414141',
        }"
      >
        抽奖次数
      </div>
      <div
        class="time"
        :style="{
          color: data.activity.drawCountStyle
            ? data.activity.drawCountStyle
            : '#EB2800',
        }"
      >
        {{ data.time }}次
      </div>
    </div>

    <div class="title" v-else>
      <div class="text">暂无抽奖</div>
    </div>

    <!-- 抽奖区域 -->
    <!-- 九宫格抽奖 -->
    <div v-if="data.activity.drawType == 2">
      <Sudoku
        :activity="data.activity.poolList"
        :result="data.result"
        :clickLottery="clickLottery"
        :changeIsTurnOver="changeIsTurnOver"
        :start="data.start"
        :changeShow="changeShow"
      />
    </div>
    <!-- 轮盘抽奖 -->
    <div v-else-if="data.activity.drawType == 1">
      <Corona
        :activity="data.activity.poolList"
        :result="data.result"
        :clickLottery="clickLottery"
        :changeIsTurnOver="changeIsTurnOver"
        :start="data.start"
        :changeShow="changeShow"
      />
    </div>
    <!--    无抽奖 -->
    <div class="empty_img" v-else>
      <img src="../../assets/movie/bg1.png" alt="" />
      <!-- <Sudoku /> -->
    </div>
    <!-- 遮罩层领奖 -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block">
          <div>请填写领奖信息</div>
          <van-form @submit="onSubmit">
            <van-cell-group inset>
              <!-- 通过 pattern 进行正则校验 -->
              <van-field
                v-model="realName"
                placeholder="请输入姓名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <!-- 通过 validator 进行函数校验 -->
              <van-field
                v-model="phone"
                placeholder="请输入电话号码"
                name="pattern"
                :rules="[{ pattern, message: '请输入正确手机号' }]"
              />
              <!-- 通过 validator 返回错误提示 -->
              <van-field
                v-model="address"
                placeholder="请输入地址"
                :rules="[{ required: true, message: '请填写地址' }]"
              />
              <!-- 通过 validator 进行异步函数校验 -->
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>

    <!-- 下部电影票 -->
    <footer>
      <div>
        <img class="tip" :src="data.activity.drawRecordImage" />
      </div>
      <div class="groud">
        <div
          class="cell"
          v-for="(item, index) in data.recordList"
          :key="index"
          v-show="item.realName && item.awardName && item.phone"
        >
          <div>{{ item.realName }}</div>
          <div>{{ item.awardName }}</div>
          <div>{{ item.phone }}</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import "vant/es/dialog/style";
import { Toast, Dialog } from "vant";
import "vant/es/toast/style";
import { onMounted } from "@vue/runtime-core";
import { useCounterStore } from "../../stores/counter";
import request from "@/api/Lottery/index";
import Sudoku from "./components/Sudoku.vue";
import Corona from "./components/Corona.vue";
components: {
  Sudoku, Corona;
}
const store = useCounterStore();
//抽奖链接
const data = reactive({
  sum: "",
  start: true,
  result: 0,
  activity: {
    drawType: 0,
    poolList: [],
  },
  time: 0,
  activityNo: "",
  //转盘是否能转
  isTurnOver: true,
  //中奖人员名单
  recordList: [],
});
const show = ref(false);
const address = ref("");
const realName = ref("");
const phone = ref("");
const recordNo = ref("");
//姓名正则
const pattern =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;

//正则校验表达
function onSubmit() {
  saveAddress();
}
//存入人员地址
function saveAddress() {
  request
    .saveAddress(
      `?userId=${store.userId}&activityNo=${data.activityNo}`,
      JSON.stringify({
        realName: realName.value,
        recordNo: recordNo.value,
        phone: phone.value,
        activityNo: data.activityNo,
        address: address.value,
      })
    )
    .then((res) => {
      Toast("保存成功");
      changeShow();
    })
    .catch((err) => {
      Toast(err);
      changeShow();
    });
}
//调起遮罩层
function changeShow() {
  if (data.activity.poolList[data.sum].awardFlag) {
    show.value = !show.value;
  }
}
//抽奖
function clickLottery() {
  if (data.time > 0) {
    if (data.isTurnOver) {
      data.isTurnOver = false;
      data.time--;
      request
        .toDraw({
          userId: store.userId,
          activityNo: data.activityNo,
        })
        .then((res) => {
          recordNo.value = res.recordNo;
          if (data.activity.drawType == 2) {
            for (let i in data.activity.poolList) {
              if (
                res.awardNo &&
                data.activity.poolList[i].awardNo == res.awardNo
              ) {
                data.sum = i;
                let order_arr = [1, 2, 3, 8, 5, 4, 7, 6, 5];
                data.result = order_arr[i];
                data.start = !data.start;
                return;
              }
            }
          } else if (data.activity.drawType == 1) {
            for (let i in data.activity.poolList) {
              if (data.activity.poolList[i].awardNo == res.awardNo) {
                data.sum = i;
                data.result = i * 1 + 1;
                data.start = !data.start;
                return;
              }
            }
          } else {
            Toast("出错了");
          }
        })
        .catch(() => {
          if (data.activity.drawType == 2) {
            data.start = !data.start;
            data.result = 5;
          } else {
            data.start = !data.start;
            data.result = 6;
          }
        });
    } else {
      Dialog.alert({
        message: "请勿重复抽奖",
      }).then(() => {});
    }
  } else {
    Toast("抽奖次数不足");
  }
}
//获取抽奖次数
function findCount() {
  request
    .findDrawCount({
      userId: store.userId,
      activityNo: data.activityNo,
    })
    .then((res) => {
      data.time = res.drawCount;
    })
    .catch((err) => {});
}
//获取用户的activityNo
function getActivityNo() {
  if (window.location.href.indexOf("activityNo") == -1) {
    Toast("请添加活动编码");
  } else {
    data.activityNo = window.location.href.match(/activityNo=(\S*)&/)[1];
  }
}
//获取活动编码和配置
function findDraw() {
  request
    .findDraw({
      userId: store.userId,
      activityNo: data.activityNo,
    })
    .then((res) => {
      if (store.userId != "empty") {
        if (
          res.drawActivityConfig.drawType == 2 &&
          res.drawActivityConfig.poolList.length == 8
        ) {
          const temporaryData = res.drawActivityConfig;
          temporaryData.poolList.splice(4, 0, {
            awardImage: null,
            awardName: null,
          });
          data.activity = temporaryData;
        } else if (
          res.drawActivityConfig.drawType == 1 &&
          res.drawActivityConfig.poolList.length == 6
        ) {
          data.activity = res.drawActivityConfig;
        } else {
          Toast("抽奖配置有误，请重新配置");
        }
      } else {
        Toast("未登录，无法抽奖");
      }
    })
    .then(() => {
      data.activity.createTime = data.activity.createTime.substring(0, 10);
      data.activity.endDate = data.activity.endDate.substring(0, 10);
      data.activity.createTime = data.activity.createTime.replace(/-/g, "/");
      data.activity.endDate = data.activity.endDate.replace(/-/g, "/");
    })
    .catch((err) => {
      Toast("获取抽奖配置失败，请刷新重试");
    });
}
//抽奖人员名单
function drawRecordList() {
  request
    .drawRecordList({
      userId: store.userId,
      activityNo: data.activityNo,
      page_index: 0,
      page_count: 50,
    })
    .then((res) => {
      data.recordList = res.recordList;
    })
    .catch((err) => {});
}
//更改isTurnOver状态
function changeIsTurnOver() {
  data.isTurnOver = true;
}

onMounted(() => {
  //获取编号
  getActivityNo();
  //初始化获取抽奖次数
  findCount();
  //获取抽奖配置
  findDraw();
  //中奖人员名单
  drawRecordList();
});
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  min-height: 100vh;
  background: #e4e4e4;
  padding: 100px 0;
  text-align: center;
  position: relative;

  header {
    min-height: 370px;
    margin: 0 auto;
    width: 650px;
    position: relative;
    .header_title {
      width: 650px;
      height: 100px;
    }
    .header_rule {
      position: absolute;
      top: 100px;
      left: 0;
      width: 173px;
      height: 67px;
      margin-top: 29px;
      z-index: 1;
    }
    .activityRule {
      width: 638px;
      height: 193px;
      white-space: pre-wrap;
      position: absolute;
      top: 160px;
      left: 6px;
      text-overflow: -o-ellipsis-lastline;
      overflow-y: scroll;
      line-height: 45px;
      font-size: 28px;
      font-weight: 400;
      color: #6f6f6f;
      // color: white;
      text-align: left;
      background-color: #efefef;
      opacity: 0.8;
      box-sizing: border-box;
      padding: 50px 19px;
    }
  }
  .title {
    width: 100vw;
    .text {
      margin: 30px 0 35px 0;
      font-size: 36px;
      font-weight: 400;
      color: #414141;
    }
    .time {
      font-size: 36px;
      margin-bottom: 45px;
      font-weight: 400;
      color: #eb2800;
    }
  }

  .empty_img {
    img {
      width: 628px;
      height: 575px;
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 520px;
      min-height: 500px;
      border-radius: 50px;
      background-color: #fff;
      padding-top: 40px;
    }
  }

  footer {
    margin: 0 auto;
    margin-top: 42px;
    width: 662px;
    height: 266px;
    position: relative;
    text-align: left;
    background-color: #ffffff;
    .tip {
      z-index: 1;
      position: absolute;
      top: -40px;
      left: -20px;
      width: 169px;
      height: 67px;
    }
    .groud {
      width: 662px;
      height: 266px;
      padding: 27px 35px;
      box-sizing: border-box;
      overflow-y: scroll;
      .cell {
        display: flex;
        justify-content: space-around;
        padding: 22px 0;
        border-bottom: 1px dashed #efefef;
        font-size: 26px;
        font-weight: 400;
        color: #6f6f6f;
      }
    }
  }
  
}
</style>
