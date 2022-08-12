<template>
  <!-- 盒子模型 -->
  <div class="content">
    <header>
      <!-- :src="data.activity.activityName" -->
      <img class="tip" :src="data.activity.activityName" alt="" />
      <div class="activityRule">{{ data.activity.activityRule }}</div>
    </header>
    <!-- 标题文字 -->
    <div
      class="title"
      v-if="data.activity.drawType == 1 || data.activity.drawType == 2"
    >
      <div class="text">抽奖次数</div>
      <div class="time">{{ data.time }}次</div>
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
        <img class="tip" src="@/assets/movie/bg3.png" />
      </div>
      <div class="groud">
        <van-cell-group>
          <van-cell
            v-for="item in data.recordList"
            :key="item"
            :title="item.realName"
            :value="item.phone"
          />
        </van-cell-group>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import "vant/es/dialog/style";
import { Toast, Dialog, Cell, CellGroup } from "vant";
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
      // console.log(res);
    })
    .catch((err) => {
      Toast(err);
      changeShow();
      // console.log(err);
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
  // console.log(data.activityNo);
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
          console.log(data.sum);
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
    .catch((err) => {
      // console.log(err);
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
  padding-top: 100px;
  text-align: center;
  position: relative;
  header {
    position: relative;
    img {
      width: 652px;
      height: 362px;
    }
    .activityRule {
      width: 580px;
      position: absolute;
      top: 220px;
      left: 80px;
      text-indent: 2rem;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
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
    width: 702px;
    height: 436px;
    background-image: url("@/assets/movie/bg5.png");
    background-size: 702px 436px;
    background-repeat: no-repeat;
    text-align: left;
    .tip {
      margin: 20px 12px;
      width: 205px;
      height: 67px;
    }
    .groud {
      width: 70vw;
      margin: 0 auto;
      height: 200px;
      overflow-y: scroll;
    }
  }
}
</style>
