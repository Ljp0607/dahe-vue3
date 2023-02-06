<template>
  <!-- 盒子模型 -->
  <div
    class="content"
    :style="{
      background: data.activity.dateStyle ? data.activity.dateStyle : '',
    }"
    v-if="store.activityNo && data.show"
  >
    <!--   -->
    <header>
      <!-- 活动规则 -->
      <img
        v-show="data.activity.activityName"
        class="one"
        :src="data.activity.activityName"
      />
      <img
        v-show="data.activity.activityRuleImage"
        class="two"
        :src="data.activity.activityRuleImage"
      />
    </header>
    <main
      class="main"
      style="background-size: 100% 100%; background-repeat: no-repeat"
    >
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
          :qrImage="data.activity.qrImage"
          :background="data.activity.background"
        />
      </div>
      <!-- 轮盘抽奖 -->
      <div v-else-if="data.activity.drawType == 1" class="corona">
        <div class="title">
          {{
            data.activity.activityRuleStyle
              ? data.activity.activityRuleStyle
              : "参与活动赢大奖"
          }}
        </div>
        <Corona
          :poolList="data.activity.poolList"
          :result="data.result"
          :clickLottery="clickLottery"
          :changeIsTurnOver="changeIsTurnOver"
          :start="data.start"
          :changeShow="changeShow"
        />
      </div>
    </main>
    <footer class="accept">
      <div class="a one"></div>
      <div class="a two"></div>
      <div class="a three"></div>
      <div class="a fore"></div>
      <div class="introduce">
        <span> 您当前剩余 {{ data.time ? data.time : 0 }}次抽奖机会</span>
        <div class="rule" @click="data.showRule = true">抽奖须知</div>
      </div>
      <div class="list">
        <div class="list_title">
          <img
            class="img1"
            @click="data.state = false"
            :src="
              data.state == true
                ? 'https://imgcdn.dahebao.cn/20230111/20230111171100784045.png'
                : 'https://imgcdn.dahebao.cn/20230111/20230111171326612090.png'
            "
            alt="图片"
          />
          <img
            class="img2"
            @click="data.state = true"
            :src="
              data.state == false
                ? 'https://imgcdn.dahebao.cn/20230111/20230111171438503540.png'
                : 'https://imgcdn.dahebao.cn/20230111/20230111171503435848.png'
            "
            alt="中奖信息"
          />
        </div>
        <div class="prize">
          <div
            v-for="(item, index) in data.state == false
              ? data.recordList
              : data.myRecordList"
            :key="index"
            class="list_prize"
          >
            <div>{{ item.realName }}</div>
            <div>{{ item.awardName }}</div>
            <div>{{ item.phone }}</div>
          </div>
        </div>

        <img
          v-if="data.state"
          class="line1"
          src="https://imgcdn.dahebao.cn/20230111/20230111192157509483.png"
          alt="线条"
        />
        <img
          v-else
          class="line2"
          src="https://imgcdn.dahebao.cn/20230111/20230111192157509483.png"
          alt="线条"
        />
      </div>
    </footer>
    <!--    无抽奖 -->
    <!-- 遮罩层领奖 -->
    <van-overlay :show="show" :lock-scroll="false">
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
    <!-- 遮罩层活动规则 -->
    <van-overlay
      class="overLayRule"
      :show="data.showRule"
      :lock-scroll="false"
      @click="data.showRule = false"
    >
      <div class="wrapperRule">{{ data.activity.activityRule }}</div>
    </van-overlay>
  </div>
  <div class="empty_img" v-else>
    <img
      src="https://imgcdn.dahebao.cn/20221027/20221027113957273185.png"
      alt="暂时没有数据"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import "vant/es/dialog/style";
import { showToast, Dialog } from "vant";
import { onMounted } from "vue";
import { useCounterStore } from "../../stores/counter";
import request from "@/api/Lottery/index";
import Sudoku from "./components/Sudoku.vue";
import Corona from "./components/Corona.vue";
import { goLogin } from "@/common/appRoute.js";
import setting from "@/common/setting";
components: {
  Sudoku;
  Corona;
}
const store = useCounterStore();
interface dataType {
  showRule: boolean;
  state: boolean;
  show: boolean;
  startDate: string;
  endDate: string;
  sum: string;
  start: boolean;
  result: number;
  activity: {
    qrImage?: string;
    background?: string;
    drawType: number;
    poolList: Array<any>;
    activityRuleImage?: string;
    activityRule?: string;
    activityName?: string;
    activityRuleStyle?: string;
    dateStyle?: string;
  };
  time: number;
  // activityNo: "",
  //转盘是否能转
  isTurnOver: boolean;
  //中奖人员名单
  recordList: Array<any>;
  myRecordList: Array<any>;
}
const data = reactive<dataType>({
  showRule: false,
  show: false,
  startDate: "",
  state: false,
  endDate: "",
  sum: "",
  start: true,
  result: 0,
  activity: {
    qrImage: "",
    dateStyle: "",
    background: "",
    activityRuleStyle: "",
    activityRuleImage: "", //活动规则图片
    activityName: "", //顶部图片
    activityRule: "", //活动规则文字
    drawType: 0,
    poolList: [],
  },
  time: 0,
  //转盘是否能转
  isTurnOver: true,
  //中奖人员名单
  recordList: [],
  myRecordList: [],
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
      `?userId=${store.userId}&activityNo=${store.activityNo}`,
      JSON.stringify({
        realName: realName.value,
        recordNo: recordNo.value,
        phone: phone.value,
        activityNo: store.activityNo,
        address: address.value,
      })
    )
    .then(() => {
      showToast("保存成功");
      myRecordList();
      changeShow();
    })
    .catch((err) => {
      showToast(err);
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
  if (store.userId) {
    if (data.time > 0) {
      if (data.isTurnOver) {
        data.isTurnOver = false;
        data.time--;
        request
          .toDraw({
            userId: store.userId,
            activityNo: store.activityNo,
          })
          .then((res: any) => {
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
                  data.result = Number(i) * 1 + 1;
                  data.start = !data.start;
                  return;
                }
              }
            } else {
              showToast("出错了");
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
        showToast("请勿重复抽奖");
      }
    } else {
      showToast("抽奖次数不足");
    }
  } else {
    if (setting()) {
      location.href =
        "https://news.dahebao.cn/appdownload/index.html?Type=101&openUrl=https://news.dahebao.cn/dahe/h5/Lottery/index.html#/Lottery";
    } else {
      goLogin();
    }
  }
}
//获取抽奖次数
function findCount() {
  request
    .findDrawCount({
      userId: store.userId,
      activityNo: store.activityNo,
    })
    .then((res: any) => {
      data.time = res.drawCount;
    });
}
//获取活动编码和配置
function findDraw() {
  if (store.activityNo) {
    request
      .findDraw({
        userId: store.userId,
        activityNo: store.activityNo,
      })
      .then((res: any) => {
        if (
          res.drawActivityConfig.drawType == 2 &&
          res.drawActivityConfig.poolList.length == 8
        ) {
          data.show = true;
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
          data.show = true;
          data.activity = res.drawActivityConfig;
        } else {
          showToast("抽奖配置有误，请重新配置");
        }
      });
  } else {
    showToast("暂无抽奖");
  }
}
//抽奖人员名单
function drawRecordList() {
  request
    .drawRecordList({
      userId: store.userId,
      activityNo: store.activityNo,
      awardFlag: "1",
      page_index: 0,
      page_count: 200,
    })
    .then((res: any) => {
      data.recordList = res.recordList;
    });
}
//我的中奖信息
function myRecordList() {
  request
    .drawRecordList({
      myUserId: store.userId ? store.userId : "empty",
      activityNo: store.activityNo,
      awardFlag: "1",
      page_index: 0,
      page_count: 50,
    })
    .then((res: any) => {
      data.myRecordList = res.recordList;
    });
}
//更改isTurnOver状态
function changeIsTurnOver() {
  data.isTurnOver = true;
}
onMounted(() => {
  //获取抽奖配置
  findDraw();
  if (store.activityNo) {
    //初始化获取抽奖次数
    findCount();
    //中奖人员名单
    drawRecordList();
    myRecordList();
  }
});
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 50px;
  text-align: center;
  position: relative;
  min-height: 450px;
  header {
    // min-height: 458px;
    width: 750px;
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    // font-size: 0px;
    .activityRule {
      color: #fff;
      height: 50px;
      line-height: 50px;
      min-width: 180px;
      box-sizing: border-box;
      text-align: center;
      position: absolute;
      right: 0px;
      top: 50px;
      border-radius: 20px 0px 0px 20px;
    }
    .header_title {
      width: 750px;
      height: 209px;
    }
    .one {
      display: block;
      width: 100vw;
    }
    .two {
      display: block;
      width: 100vw;
    }
  }
  .main {
    padding-top: 30px;
    width: 750px;
    // height: 759px;
    .title {
      width: 100vw;
      .text {
        margin: 26px 0 22px 0;
        font-size: 36px;
        font-weight: 400;
        color: #414141;
      }
      .time {
        font-size: 36px;
        font-weight: 400;
        color: #eb2800;
      }
    }
    .corona {
      width: 691px;
      height: 760px;
      background: #fff;
      margin: 0 auto;
      .title {
        width: 691px;
        height: 100px;
        color: #cf2013;
        font-size: 50px;
        font-weight: 600;
        line-height: 100px;
        margin-bottom: 40px;
        background: linear-gradient(#feefc1, #fcd14a);
      }
    }
  }
  .accept {
    position: relative;
    .a {
      position: absolute;
      width: 26px;
      height: 23px;
      background: #d90e26;
    }

    .one {
      top: -22px;
      left: 165px;
    }

    .two {
      top: 305px;
      left: 165px;
    }

    .three {
      top: -22px;
      left: 560px;
    }

    .fore {
      top: 305px;
      left: 560px;
    }

    .introduce {
      margin: 22px auto;
      box-sizing: border-box;
      background: #ffd6a9;
      width: 667px;
      height: 305px;
      border-radius: 10px;
      border: 20px solid #d90e26;
      text-align: center;

      span {
        display: inline-block;
        margin-top: 40px;
        font-size: 44px;
        font-weight: bold;
        color: #4e1a02;
      }

      .rule {
        margin-top: 32px;
        display: inline-block;
        background-image: url("https://imgcdn.dahebao.cn/20230111/20230111145856628436.png");
        background-size: 100% 100%;
        width: 551px;
        height: 101px;
        line-height: 81px;
        color: #fff;
        font-weight: bold;
        font-size: 42px;
      }
    }

    .list {
      margin: 0 auto;
      width: 667px;
      background: #ffd6a9;
      height: 597px;
      border-radius: 10px;
      border: 20px solid #d90e26;
      position: relative;
      box-sizing: border-box;
      .line1 {
        position: absolute;
        top: 105px;
        left: 300px;
        width: 277px;
        height: 20px;
      }

      .line2 {
        position: absolute;
        width: 277px;
        height: 20px;
        top: 105px;
        left: 20px;
      }

      .list_title {
        margin: 0 auto;
        box-sizing: content-box;
        padding-bottom: 20px;
        margin-top: 50px;
        width: 85%;
        display: flex;
        justify-content: space-around;
        height: 42px;
        border-bottom: 6px solid #4e1a02;

        .img1 {
          width: 138px;
        }

        .img2 {
          width: 219px;
        }
      }

      .prize {
        padding-top: 30px;
        height: 400px;
        overflow-y: scroll;

        .list_prize {
          margin: 0 30px;
          line-height: 75px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #fff;
          font-size: 26px;
          font-weight: 400;
          color: #4e1a02;

          div {
            width: 30%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: left;
          }

          div:first-child {
            text-align: center;
            width: 20%;
          }
        }
      }
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
  .overLayRule {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    .wrapperRule {
      margin: 0 auto;
      text-align: left;
      white-space: pre-wrap;
      border-radius: 20px;
      background: #fff;
      box-sizing: border-box;
      padding: 30px;
      max-height: 70vh;
      width: 80vw;
      font-size: 30px;
      overflow-y: scroll;
      margin-top: 100px;
    }
  }
}
.empty_img {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  text-align: center;
  padding-top: 300px;
  img {
    width: 750px;
  }
}
</style>
