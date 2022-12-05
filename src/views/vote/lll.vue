<script setup>
import { ref, reactive } from "vue";
import Corona from "./components/Corona.vue";
import request from "@/api/Lottery/index";
import { cityList } from "@/api/vote";
import { selectCity } from "@/api/vote";
import {  useRouter } from "vue-router";
import axios from "axios";
import { Toast } from "vant";
import { useCounterStore } from "@/stores/counter";
// import { goPosts, goLogin } from "@/common/appRoute";
// import setting from "@/common/setting";
const router = useRouter();
const active = ref(0);
const data: any = reactive({
  item: [],
  recordList: {},
  city: [],
  currentPage: 1,
});
const store = useCounterStore();
//获取所有城市
function getCityList() {
  cityList()
    .then((res: any) => {
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
          store.changeCity(res);
          data.city.map((item: any, index: number) => {
            if (res.adcode == item.city_id) {
              active.value = index;
              selectCitys(false);
              return;
            }
          });
        });
    });
}
//封装获取数据方法
function selectCitys(refresh: boolean) {
  selectCity(data.city[active.value].city_id, data.currentPage).then(
    (res: any) => {
      if (res.state == 1) {
        if (res.data.length == 0 && refresh) {
          Toast("没有更多数据了");
          --data.currentPage;
        } else {
          data.item = res.data;
          data.item.map((item: any, index: number) => {
            if (item.postsVideo) {
              item.postsVideo = "http://test.dahebao.cn/picker/123.mp4";
              getVideoBase64(item.postsVideo, index);
            }
            item.postsImg = JSON.parse(item.postsImg);
          });
        }
        if (res.data.length < 4) {
          data.city[active.value].more = "no-more";
        } else {
          data.city[active.value].more = "more";
        }
      } else {
        Toast(res.message);
      }
    }
  );
}
//获取中奖人员名单
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
  });
//下方滑动设置定时器

// getCityList();
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
  if (store.$state.userId == "") {
    Toast("请通过豫视频App上传视频");
  } else {
    router.push({ name: "uploading" });

}
//跳转详情页
// function navigetDetail(e: any) {
//   //如果在微信浏览器,跳转下载页
//   if (store.$state.userId == "" && setting()) {
//     Toast("请在豫视频App查看详情");
//   }
//   //如果在其他浏览器,跳转下载页
//   else if (store.$state.userId == "" && !setting()) {
//     //跳转登录
//     goLogin();
//   } else {
//     //跳转帖子
//     goPosts(e.postsId);
//   }
// }
//投票
function postThum() {
  if (store.$state.userId == "") {
    Toast("下载豫视频App投票参与投票");
  } else {
    axios({
      method: "get",
      url: "https://news.dahebao.cn/dahe/appposts/poststhumbup",
      params: {
        data: JSON.stringify({
          user_id: "a26db8f34b1c48a0bfbd307243fef4eb",
          action_type: 1,
          posts_id: 129214,
        }),
        headers: {
          "  Content-Type": "application/json",
        },
      },
    }).then((res) => {
      if (res.state == 1) {
        Toast("投票成功");
      }
    });
  }
}
//获取视频封面
function getVideoBase64(url: string, index: number) {
  return new Promise(function (resolve, reject) {
    let dataURL = "";
    let video = document.createElement("video");
    video.setAttribute("crossOrigin", "anonymous"); //处理跨域
    video.setAttribute("src", url);
    video.setAttribute("width", "400");
    video.setAttribute("height", "240");
    video.setAttribute("preload", "auto"); // 就是加上预加载之后绘制就成功了
    video.addEventListener("loadeddata", function () {
      let canvas = document.createElement("canvas");
      let width = video.width; //canvas的尺寸和图片一样
      let height = video.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")?.drawImage(video, 0, 0, width, height); //绘制canvas
      dataURL = canvas.toDataURL("image/jpeg"); //转换为base64
      // resolve(dataURL);
      // data.item[index].img = dataURL;
      console.log(dataURL);
    });
  });
}
getCityList();
</script>
<template>
  <div class="content">
    <header>
      <img src="https://imgcdn.dahebao.cn/20221128/20221128171231279774.png" />
      <span @click="navUpload">上传新地标</span>
    </header>
    <main class="tab">
      <van-tabs v-model:active="active" @change="changeActive" swipeable>
        <van-tab
          v-for="(item, index) in data.city"
          :title="item.city_name"
          :key="index"
          ><div class="tab_content">
            <div class="item_content">
              <div
                class="item"
                v-for="(items, index) in data.item"
                :key="items"
              >
                <div
                  @click="navigetDetail(items)"
                  class="video"
                  v-if="items.postsVideo"
                >
                  <img :src="items.img" />
                  <img
                    class="item_start"
                    src="https://imgcdn.dahebao.cn/20221011/20221011094515515822.png"
                  />
                </div>
                <div @click="navigetDetail(items)" class="img" v-else>
                  <img class="postsImg" :src="items.postsImg[0].imgUrl" />
                </div>
                <div class="postsTitle">
                  <div class="hotData">
                    <span> 人气值:</span>
                    <span style="color: #dc5d3c">{{ items.hotData }}</span>
                  </div>
                  <span>{{ items.postsTitle }} </span>
                </div>
                <div class="text" @click="postThum">为TA投票</div>
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
      <div class="lottery"><Corona /></div>
    </footer>
    <div class="record">
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
    img {
      margin-top: 380px;
      width: 262px;
      height: 58px;
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
            // border: 8px solid #4e1a02;
            box-sizing: border-box;
            width: 253px;
            height: 276px;
            line-height: 276px;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            .postsImg {
              position: absolute;
              top: 25%;
              // left:50%;
              transform: translate(0, -25%);
              width: 253px;
              // height: 100px;
              max-height: 276px;
              // line-height: 276px;
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
