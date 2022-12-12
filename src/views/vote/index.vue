<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import Corona from "./components/Corona.vue";
import request from "@/api/Lottery/index";
import { cityList } from "@/api/vote";
import { selectCity } from "@/api/vote";
import { useRouter } from "vue-router";
import axios from "axios";
import { Toast } from "vant";
import { useCounterStore } from "@/stores/counter";
import { goPosts, goLogin } from "@/common/appRoute";
import setting from "@/common/setting";
const router = useRouter();
const active = ref(0);
const data: any = reactive({
  show: false,
  item: [],
  recordList: [],
  recordListWeek: [],
  city: [],
  currentPage: 1,
  activityRule: "",
});
const scrollRef = ref();
const store = useCounterStore();
//获取所有城市
function getCityList() {
  cityList()
    .then((res: any) => {
      res.map((item: any) => {
        delete item.children;
      });
      data.city = res;
      store.$state.citys = res;
    })
    .then(() => {
      //获取用户当前城市
      axios
        .get(
          "https://restapi.amap.com/v3/ip?key=8f97aea18038bcb28d2d29b1c5cf5158"
        )
        .then((res: any) => {
          if (res.status == 1) {
            data.city.map((item: any, index: number) => {
              if (res.adcode == item.city_id) {
                active.value = index;
                store.changeCity(item);
                return;
              }
            });
          } else {
            store.changeCity(data.city[0]);
          }
        })
        .catch(() => {
          store.changeCity(data.city[0]);
        });
    })
    .then(() => {
      selectCitys(false);
    });
}
//封装获取数据方法
function selectCitys(refresh: boolean) {
  selectCity(
    store.$state.userId,
    data.city[active.value].city_id,
    data.currentPage
  ).then((res: any) => {
    if (res.state == 1) {
      if (res.data.length == 0 && refresh) {
        Toast("没有更多数据了");
        --data.currentPage;
      } else {
        data.item = res.data;
      }
      if (res.data.length < 4) {
        data.city[active.value].more = "no-more";
      } else {
        data.city[active.value].more = "more";
      }
    } else {
      Toast(res.message);
    }
  });
}
//获取中奖人员名单
function RecordList() {
  request
    .drawRecordList({
      userId: store.$state.userId,
      activityNo: store.$state.activityNo,
      awardFlag: "1",
      page_index: 0,
      page_count: 200,
    })
    .then((res: any) => {
      data.recordList = res.recordList;
      // console.log(res.recordList);
    });
}
//获取周中奖人员名单
function RecordListweek() {
  request
    .drawRecordList({
      userId: store.$state.userId,
      activityNo: "b2101db8b4e54358a042ba9306049791",
      awardFlag: "1",
      page_index: 0,
      page_count: 200,
    })
    .then((res: any) => {
      data.recordListWeek = res.recordList;
      // console.log(data.recordListWeek);
    });
}
//下一页新数据
function nextPage() {
  if (data.city[active.value].more == "no-more") {
    Toast("没有更多数据了");
  } else {
    ++data.currentPage;
    selectCitys(true);
  }
}
//上一页数据
function lastPage() {
  if (data.currentPage <= 1) {
    Toast("没有更多数据了");
    return;
  } else {
    --data.currentPage;
    selectCitys(true);
  }
}
//切换changeactive
function changeActive() {
  data.currentPage = 1;
  selectCitys(false);
}
//跳转上传
function navUpload() {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    Toast("请在豫视频App上传新地标");
    setTimeout(() => {
      location.href = "https://news.dahebao.cn/appdownload/index.html?Type=102";
    }, 500);
  }
  //如果在其他浏览器,跳转下载页
  else if (store.$state.userId == "" && !setting()) {
    //跳转登录
    goLogin();
  } else {
    router.push({ name: "uploading" });
  }
}
//跳转详情页
function navigetDetail(e: any) {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    Toast("请在豫视频App查看详情");
    setTimeout(() => {
      location.href = "https://news.dahebao.cn/appdownload/index.html?Type=102";
    }, 500);
  }
  //如果在其他浏览器,跳转下载页
  else if (store.$state.userId == "" && !setting()) {
    //跳转登录
    goLogin();
  } else {
    //跳转帖子
    goPosts(e.postsId);
  }
}
//投票
function postThum(item: any, index: number) {
  // console.log(e);
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == "" && setting()) {
    Toast("请在豫视频App投票");
    setTimeout(() => {
      location.href = "https://news.dahebao.cn/appdownload/index.html?Type=102";
    }, 500);
  }
  //如果在其他浏览器,跳转下载页
  else if (store.$state.userId == "" && !setting()) {
    //跳转登录
    goLogin();
  } else {
    postst(item, index);
  }
}
//投票接口
function postst(item: any, index: number) {
  // console.log(index);
  if (data.item[index].ifThumb == 0) {
    axios({
      method: "get",
      url: "https://news.dahebao.cn/dahe/appposts/poststhumbup",
      params: {
        data: JSON.stringify({
          user_id: store.$state.userId,
          action_type: 1,
          posts_id: item.postsId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    }).then((res) => {
      if (res.state == 1) {
        // console.log(data.item[index]);
        data.item[index].hotData += 10;
        data.item[index].ifThumb = 1;
        Toast("投票成功");
      }
    });
  } else {
    Toast("每个作品只能投一票哦");
  }
}
//获取活动规则
function activityRule(e: string) {
  data.activityRule = e;
}
let start = setInterval(() => {
  if (
    scrollRef.value.scrollTop >=
    scrollRef.value.scrollHeight - scrollRef.value.clientHeight
  ) {
    scrollRef.value.scrollTop = 0;
  } else {
    scrollRef.value.scrollTop += 0.5;
  }
}, 100);

onMounted(() => {
  getCityList();
  RecordList();
  RecordListweek();
});
onUnmounted(() => {
  clearInterval(start);
});
</script>
<template>
  <div class="content">
    <header>
      <div class="title" @click="data.show = true">活动规则</div>
      <img
        @click="navUpload"
        src="https://imgcdn.dahebao.cn/20221206/20221206150922616976.png"
      />
    </header>
    <van-popup
      class="van-popup"
      v-model:show="data.show"
      @click="data.show = false"
    >
      <span>
        {{ data.activityRule }}
      </span>
    </van-popup>
    <main class="tab">
      <van-tabs
        v-model:active="active"
        @change="changeActive"
        :animated="false"
        swipeable
      >
        <van-tab
          v-for="(item, index) in data.city"
          :title="item.city_name"
          :key="index"
          ><div class="tab_content">
            <div class="item_content">
              <!--遍历数组,生成视频或图片 -->
              <div
                class="item"
                v-for="(items, indexs) in data.item"
                :key="items"
              >
                <!-- 如果有视频,展示视频和播放键 -->
                <div
                  @click="navigetDetail(items)"
                  class="video"
                  v-if="items.postsVideo"
                >
                  <img :src="items.postsVideoImg" />
                  <img
                    class="item_start"
                    src="https://imgcdn.dahebao.cn/20221011/20221011094515515822.png"
                  />
                </div>
                <!-- 如果有图片,显示图片 -->
                <div @click="navigetDetail(items)" class="img" v-else>
                  <img
                    class="postsImg"
                    :src="JSON.parse(items.postsImg)[0].imgUrl + '/pc_600'"
                  />
                </div>
                <div class="postsTitle">
                  <div class="hotData">
                    <span> 人气值:</span>
                    <span style="color: #dc5d3c">{{ items.hotData }}</span>
                  </div>
                  <span>{{ items.postsTitle }} </span>
                </div>
                <div
                  v-if="!items.ifThumb"
                  class="text"
                  @click="postThum(items, indexs)"
                >
                  为TA投票
                </div>
                <div v-else class="text" @click="postThum(items, indexs)">
                  已投票
                </div>
              </div>
              <img
                v-if="data.item.length == 0"
                class="empty"
                src="https://imgcdn.dahebao.cn/20221027/20221027113957273185.png"
                alt=""
              />
            </div>
            <div v-show="data.item.length != 0" class="button">
              <button @click="lastPage">上一页</button>
              <button @click="nextPage">下一页</button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </main>
    <footer>
      <div class="title">投稿即可参与抽奖</div>
      <div class="lottery">
        <Corona :RecordList="RecordList" :activityRule="activityRule" />
      </div>
    </footer>
    <div class="recordWeek" v-if="data.recordListWeek.length > 0">
      <div class="title">周评榜：高人气作品用户</div>

      <!-- 下方轮播 周获奖 -->
      <div class="groud">
        <div
          class="cell"
          v-for="(item, index) in data.recordListWeek"
          :key="index"
          v-show="item.realName && item.awardName && item.phone"
        >
          <div>{{ index < 3 ? "" : index + 1 }}</div>
          <div>{{ item.realName }}</div>
          <div>{{ item.awardName }}</div>
          <div>{{ item.phone }}</div>
        </div>
      </div>
    </div>

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
<style lang="less" scoped>
.content {
  background: #dc5d3c;
  width: 750px;
  box-sizing: border-box;
  padding-bottom: 50px;
  min-height: 100vh;
  header {
    width: 750px;
    height: 695px;
    background-image: url("https://imgcdn.dahebao.cn/20221130/20221130200720395972.png");
    background-size: 100%;
    background-repeat: no-repeat;
    text-align: center;
    position: relative;
    .title {
      background: #ffa300;
      width: 154px;
      height: 50px;
      border-radius: 20px 0 0 20px;
      line-height: 50px;
      color: #fff;
      position: absolute;
      top: 67px;
      right: 0px;
      font-size: 28px;
      // float: right;
    }
    img {
      margin-top: 372px;
      width: 388px;
      height: 94px;
    }
    span {
      display: block;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 386px;
      color: #fff;
      letter-spacing: 5px;
    }
  }
  ::v-deep .van-popup--center {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 700px;
    min-height: 750px;
    max-height: 80vh;
    white-space: pre-wrap;
    text-overflow: -o-ellipsis-lastline;
    overflow-y: scroll;
    line-height: 42px;
    font-size: 30px;
    font-weight: 400;
    color: #6f6f6f;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    text-align: left;
  }
  main {
    width: 750px;
    // min-height: 500px;/
    padding-bottom: 30px;
    .tab_content {
      margin: 0 auto;
      width: 660px;
      min-height: 1000px;
      background: #ffffff;
      border-radius: 0px 0px 10px 10px;
      padding-bottom: 50px;
      .item_content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 900px;
        .item {
          width: 50%;
          height: 400px;
          margin-top: 50px;
          position: relative;
          // box-sizing: border-box;
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: space-around;
          .video {
            background: #ffdcdc;

            border: 0;
            margin: 0 auto;
            width: 252px;
            height: 276px;
            position: relative;
            display: flex;
            align-items: center;
            // border: 8px solid #4e1a02;
            padding: 2px;
            box-sizing: border-box;
            img {
              width: 100%;
              height: auto;
              max-height: 276px;
            }
            .item_start {
              position: absolute;
              width: 120px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .img {
            background: #ffdcdc;
            margin: 0 auto;
            box-sizing: border-box;
            width: 253px;
            height: 276px;
            display: flex;
            align-items: center;
            // justify-content: center;
            .postsImg {
              position: absolute;
              width: 253px;
              max-height: 276px;
            }
          }
          .text {
            background: #eb0f00;
            margin: 20px auto 0px;
            color: #fff;
            line-height: 57px;
            text-align: center;
            width: 225px;
            height: 57px;
            border-radius: 50px;
          }
        }
        .postsTitle {
          box-sizing: border-box;
          padding: 0 45px;
          font-size: 28px;
          color: #4e1a02;
          font-weight: bold;
          height: 80px;
          span {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .hotData {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            // text-align: right;
            display: flex;
            justify-content: space-between;
          }
        }
        .hotData {
          font-size: 26px;
        }
        .empty {
          width: 100%;
          height: 100%;
        }
      }
      .button {
        margin: 60px auto 0px;
        width: 80%;
        display: flex;
        justify-content: space-around;
        button {
          background: none;
          border-radius: 30px;
          min-width: 177px;
          height: 56px;
          text-align: center;
          color: #dc5d3c;
          box-sizing: border-box;
          border: 5px solid #dc5d3c;
        }
      }
    }
  }
  footer {
    // background: #fff;
    margin: 38px auto;
    width: 660px;
    min-height: 1064px;
    text-align: center;
    .title {
      width: 100%;
      height: 100px;
      line-height: 100px;
      background: linear-gradient(#ffeebe, #fcd14a);
      color: #cf2013;
      font-weight: 606;
      font-size: 40px;
    }
    .lottery {
      background: #fff;
      width: 660px;
      height: 660px;
      padding-top: 48px;
      box-sizing: border-box;
    }
  }
  .recordWeek {
    width: 650px;
    height: 361px;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    // padding-top: 40px;
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
        background-image: url("https://imgcdn.dahebao.cn/20221212/20221212152602139458.png");
        background-repeat: no-repeat;
        background-position: 20px 15px;
        background-size: 8%;
      }
      .cell:nth-child(2) {
        background-image: url("https://imgcdn.dahebao.cn/20221212/20221212152615228304.png");
        background-repeat: no-repeat;
        background-position: 20px 15px;
        background-size: 8%;
      }
      .cell:nth-child(3) {
        background-image: url("https://imgcdn.dahebao.cn/20221212/20221212152625255040.png");
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
    background-image: url("https://imgcdn.dahebao.cn/20221128/20221128100556735042.png");
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
::v-deep .van-tab {
  font-size: 30px;
  font-weight: 400;
}

::v-deep .van-tabs__nav {
  height: 80px;
  //   height: 120px;
  background: linear-gradient(#feefc1, #fcd14a);
}
</style>
<!--
https://imgcdn.dahebao.cn/20221212/20221212152602139458.png 
https://imgcdn.dahebao.cn/20221212/20221212152615228304.png
https://imgcdn.dahebao.cn/20221212/20221212152625255040.png
-->
