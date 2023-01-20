<script setup lang="ts">
import { reactive } from 'vue'
import 'vant/es/dialog/style'
import { showToast, Dialog } from 'vant'
// import "vant/es/showToast/style";
import request from '@/api/Lottery/index'
import { useCounterStore } from '@/stores/counter'
const props = defineProps({
  RecordList: Function,
  activityRule: Function,
})
//抽奖链接
const data: any = reactive({
  number: 0,
  message: {
    realName: '',
    phone: '',
    address: '',
  },
  show: false,
  rotateAngle: 0,
  time: 0,
  IsTurnOver: true,
  rotate_angle: '',
  activity: {
    poolList: [],
  },
})
const store = useCounterStore()
const pattern =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/

//获取抽奖信息
request
  .findDraw({
    userId: store.$state.userId,
    activityNo: store.$state.activityNo,
  })
  .then((res: any) => {
    props.activityRule(res.drawActivityConfig.activityRule)
    data.activity = res.drawActivityConfig
  })
//存入人员地址
function saveAddress() {
  request
    .saveAddress(
      `?userId=${store.$state.userId}&activityNo=${store.$state.activityNo}`,
      JSON.stringify({
        realName: data.message.realName,
        recordNo: data.message.recordNo,
        phone: data.message.phone,
        activityNo: store.$state.activityNo,
        address: data.message.address,
      })
    )
    .then((res: any) => {
      showToast(res.message)
      data.show = false
      props.RecordList()
    })
}
//获取抽奖次数
function findCount() {
  request
    .findDrawCount({
      userId: store.$state.userId,
      activityNo: store.$state.activityNo,
    })
    .then((res: any) => {
      if (res.drawCount >= 0) data.number = res.drawCount
    })
}
//抽奖
function clickCoronak() {
  // findCount();
  if (!data.IsTurnOver) {
    showToast('请勿重复抽奖')
  } else if (data.number == 0) {
    showToast('暂无抽奖次数')
  } else {
    data.IsTurnOver = false
    request
      .toDraw({
        userId: store.$state.userId,
        activityNo: store.$state.activityNo,
      })
      .then((res: any) => {
        findCount()
        data.activity.poolList.map((item: any, index: number) => {
          if (item.awardNo == res.awardNo) {
            data.message.recordNo = res.recordNo
            rotateAngle(index + 1)
            setTimeout(function () {
              if (item.awardFlag == '1') {
                Dialog.alert({
                  message: '恭喜获得' + item.awardName,
                }).then(() => {
                  data.show = true
                })
              } else {
                showToast(item.awardName)
              }
              data.IsTurnOver = true
            }, 5200)
            return
          }
        })
      })
  }
}
//封装抽奖
function rotateAngle(i: number) {
  data.rotateAngle = data.rotateAngle - data.time
  //初试转的圈数
  switch (i) {
    //第一个奖品角度
    case 1:
      data.time = Math.random() * (30 - 0) + 0
      break
    //第二个奖品角度
    case 6:
      data.time = Math.random() * (85 - 35) + 35
      break
    //第三个奖品角度
    case 5:
      data.time = Math.random() * (145 - 95) + 95
      break
    //第四个奖品角度
    case 4:
      data.time = Math.random() * (205 - 155) + 155
      break
    //第五个奖品角度
    case 3:
      data.time = Math.random() * (265 - 215) + 215
      break
    //第六个奖品角度
    case 2:
      data.time = Math.random() * (325 - 275) + 275
      break
  }
  data.rotateAngle = data.rotateAngle + 3600 + data.time
  data.rotate_angle = `rotate(${data.rotateAngle}deg)`
}
function onSubmit(e: any) {
  saveAddress()
}
findCount()
</script>
<template>
  <!-- 抽奖区域 -->
  <div class="wrapper">
    <div
      class="panel"
      :style="{
        transform: data.rotate_angle,
        transition: '5s',
      }"
    >
      <div class="sector" v-for="(item, index) in data.activity.poolList" :key="index">
        <div class="sector-inner">
          <span>{{ item.awardName }}</span>
          <img v-show="item.awardImage" :src="item.awardImage" />
        </div>
      </div>
    </div>
    <div class="pointer" @click="clickCoronak">
      <div class="start">立即抽奖</div>
    </div>
    <!-- 遮罩层领奖 -->
    <van-overlay :show="data.show">
      <div class="van-overlay">
        <div class="block">
          <div>请填写领奖信息</div>
          <van-form @submit="onSubmit">
            <van-cell-group inset>
              <!-- 通过 pattern 进行正则校验 -->
              <van-field
                v-model="data.message.realName"
                placeholder="请输入姓名"
                name="realName"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <!-- 通过 validator 进行函数校验 -->
              <van-field
                v-model="data.message.phone"
                placeholder="请输入电话号码"
                name="phone"
                :rules="[{ pattern, message: '请输入正确手机号' }]"
              />
              <!-- 通过 validator 返回错误提示 -->
              <van-field
                v-model="data.message.address"
                placeholder="请输入地址"
                name="address"
                :rules="[{ required: true, message: '请填写地址' }]"
              />
              <!-- 通过 validator 进行异步函数校验 -->
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit"> 提交 </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>
  </div>
  <div class="number">
    <div class="residue">
      <text> 您当前剩余 </text>
      <text style="color: #fc0404"> {{ data.number }}次 </text>
      <text> 抽奖机会 </text>
    </div>
    <div class="assistance">参加投稿可获1次抽奖机会</div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  position: relative;
  height: 563px;
  width: 560px;
  background-image: url('https://imgcdn.dahebao.cn/20221123/20221123143246575179.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
.panel {
  position: relative;
  background: #b80100;
  background-image: url('https://imgcdn.dahebao.cn/20221123/20221123145330470324.png');
  background-size: 450px 450px;
  background-position: center;
  background-repeat: no-repeat;
  height: 447px;
  width: 447px;
  border-radius: 231px;
  box-sizing: border-box;
  margin-top: 52px;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.5), 0 6px 20px 0 rgba(255, 255, 255, 0.5);
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
  background-image: url('https://imgcdn.dahebao.cn/20221123/20221123145731728123.png');
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
  background-image: url('https://imgcdn.dahebao.cn/20221130/20221130163129461239.png');
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
    background-image: url('https://imgcdn.dahebao.cn/20221130/20221130163152193201.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-top: 28px;
    font-size: 34px;
    font-weight: bold;
    color: #ffffff;
    // -webkit-text-stroke: 2px #441709;
    text-shadow: -1px -1px 0 #451701, 1px -1px 0 #451701, -1px 1px 0 #451701, 1px 1px 0 #451701;
  }
}
</style>
