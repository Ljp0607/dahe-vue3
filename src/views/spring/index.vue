<template>
  <div class="content">
    <Title :rule="data.rule" />
    <Tabs :drawRule="data.drawRule" />
    <Lottery :active="data.active" />
    <!-- v-if="data.recordListWeek.length > 0" -->
    <div class="recordWeek">
      <!-- 下方轮播 周获奖 -->
      <div class="groud">
        <div
          class="cell"
          v-for="(item, index) in data.recordListWeek"
          :key="index"
          v-show="item.realName && item.awardName && item.phone"
        >
          <div>{{ index < 3 ? '' : index + 1 }}</div>
          <div>{{ item.realName }}</div>
          <div>{{ item.awardName }}</div>
          <div>{{ item.phone }}</div>
        </div>
      </div>
    </div>
    <!-- 下方中奖 -->
    <div class="record">
      <div class="groud" ref="scrollRef">
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
    </div>
  </div>
</template>
<script setup lang="ts">
import Title from './components/title.vue'
import Tabs from './components/tabs.vue'
import Lottery from './components/lottery.vue'
import getShare from '@/common/wx-share'
import { findDraw, weekList, drawRecordList } from '@/api/spring'
import { reactive, onBeforeMount, onMounted } from 'vue'

components: {
  Title
  Lottery
  Tabs
}
const data = reactive({
  rule: '',
  drawRule: '',
  active: '',
  recordList: [],
  recordListWeek: [],
})
//获取活动规则 list和抽奖设置
const getList = () => {
  findDraw().then((res: any) => {
    data.active = res.drawActivityConfig.drawCountCallBack
    data.rule = res.drawActivityConfig.activityRule
    data.drawRule = res.drawActivityConfig.drawRule
  })
}

//获取中奖人员名单
function RecordList() {
  drawRecordList().then((res: any) => {
    data.recordList = res.recordList
  })
}
//获取周中奖人员名单
function RecordListweek() {
  weekList().then((res: any) => {
    data.recordListWeek = res.recordList
  })
}
//二次分享
getShare('兔逢新春，记录团圆！', '分享你的相聚时刻、家乡美食、年夜饭、春节年俗')
onBeforeMount(() => {
  getList()
})
onMounted(() => {
  RecordListweek()
  RecordList()
})
</script>
<style lang="less" scoped>
.content {
  background-color: #cd0000;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 80px;
  .recordWeek {
    width: 668px;
    height: 451px;
    margin: 0 auto;
    margin-top: 45px;
    background-image: url('https://imgcdn.dahebao.cn/20230119/20230119154839537800.png');
    background-size: 100% 100%;
    // background: #fff;
    box-sizing: border-box;
    padding-top: 140px;
    margin-bottom: 50px;
    .title {
      width: 100%;
      height: 100px;
      line-height: 100px;
      background: linear-gradient(#ffeebe, #fcd14a);
      color: #cf2013;
      font-weight: 606;
      font-size: 40px;
      text-align: center;
    }
    .groud {
      margin: 0 auto;
      margin-bottom: 20px;
      padding: 20px 5px;
      width: 652px;
      height: 266px;
      box-sizing: border-box;
      overflow-y: scroll;
      .cell {
        line-height: 75px;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px dashed #bdbdbd;
        font-size: 26px;
        font-weight: 400;
        color: #6f6f6f;
        div {
          width: 24%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        div:first-child {
          text-align: center;
          width: 10%;
        }
        div:nth-child(2) {
          // text-align: center;
          width: 15%;
        }
        div:nth-child(3) {
          // text-align: center;
          width: 35%;
        }
      }
      .cell:nth-child(1) {
        background-image: url('https://imgcdn.dahebao.cn/20221212/20221212152602139458.png');
        background-repeat: no-repeat;
        background-position: 20px 15px;
        background-size: 8%;
      }
      .cell:nth-child(2) {
        background-image: url('https://imgcdn.dahebao.cn/20221212/20221212152615228304.png');
        background-repeat: no-repeat;
        background-position: 20px 15px;
        background-size: 8%;
      }
      .cell:nth-child(3) {
        background-image: url('https://imgcdn.dahebao.cn/20221212/20221212152625255040.png');
        background-repeat: no-repeat;
        background-position: 20px 15px;
        background-size: 8%;
      }
    }
  }
  .record {
    width: 675px;
    height: 301px;
    margin: 0 auto;
    margin-top: 45px;
    background-image: url('https://imgcdn.dahebao.cn/20221128/20221128100556735042.png');
    background-size: 100%;
    box-sizing: border-box;
    padding-top: 40px;
    .groud {
      margin: 0 auto;
      margin-bottom: 20px;
      padding: 20px 35px;
      width: 662px;
      height: 266px;
      // padding: 47px 35px;
      box-sizing: border-box;
      overflow-y: scroll;
      .cell {
        line-height: 75px;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px dashed #bdbdbd;
        font-size: 26px;
        font-weight: 400;
        color: #6f6f6f;
        div {
          width: 30%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
