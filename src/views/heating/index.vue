<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import request from "../../api/heating/index";
import getShare from "../../common/wx-share";
import router from "../../router";
// import { newsaction } from "../../common/appRoute";

const loading = ref(false);
const loadingRe = ref(false);
const finished = ref(false);
const finishedRe = ref(false);
const data: any = reactive({
  reply: true,
  page_index: 0,
  page_indexRe: 0,
  list: [],
  peply_list: [],
});
//刷新列表
function onLoad() {
  getNewsInfo();
  data.page_index = data.page_index + 1;
  // 加载状态结束
  loading.value = false;
}
//问答刷新列表
function onLoadRe() {
  getconsultation();
  data.page_indexRe = data.page_indexRe + 1;
  // 加载状态结束
  loadingRe.value = false;
}
//获取专题新闻
function getNewsInfo() {
  request
    .getNewsInfo({
      type: 101,
      page_index: data.page_index,
      page_count: 10,
    })
    .then((res: any) => {
      if (res.data.length > 0) {
        data.list = [...data.list, ...res.data];
      } else {
        finished.value = true;
      }
    });
}
//获取邻妹妹问答
function getconsultation() {
  request
    .getconsultation({
      page_count: "10",
      page_index: data.page_indexRe,
      keywords: "大河问暖",
    })
    .then((res: any) => {
      // console.log(res.data);
      if (res.data.length > 0) {
        data.peply_list = [...data.peply_list, ...res.data];
      } else {
        finishedRe.value = true;
      }
    });
}
//跳转新闻页
function navigetNews(e: any) {
  // router.push({ name: "heating_news", params: { url: e.linkUrl } });
  window.location.href = e.linkUrl;
  // newsaction(4, e.linkUrl + `?newsId=${e.newsId}`, e.newsId);
}
onMounted(() => {
  getShare({ type: 22, share_url: window.location.href });
});
</script>
<template>
  <div class="content">
    <header>
      <img src="../../assets/heatingBg.png" />
    </header>
    <main>
      <button class="open button" @click="data.reply = true"></button>
      <button class="close button" @click="data.reply = false"></button>
      <div class="reply" v-if="data.reply">
        <img class="header" src="../../assets/heating1.png" />
        <div class="details">
          <div class="main">
            <!-- 下方新闻 -->
            <div class="reply_list">
              <van-list
                v-model:loading="loadingRe"
                :finished="finishedRe"
                finished-text="没有更多了"
                @load="onLoadRe"
              >
                <van-cell v-for="(item, index) in data.peply_list" :key="index">
                  <div class="reply_title">
                    <van-image
                      round
                      fit="cover"
                      position="left"
                      :src="item.user_head_img"
                    />
                    <span>{{ item.user_name }}</span>
                  </div>
                  <div class="tag">#大河问暖#</div>
                  <div class="introduce">
                    {{ item.posts_content.split("&")[0] }}
                  </div>
                  <div class="lin">大河报·邻妹妹</div>
                  <div class="introduce">
                    {{ item.chatRecordList[0].comment_content }}
                  </div>
                </van-cell>
              </van-list>
            </div>
          </div>
        </div>
      </div>
      <div class="news" v-else>
        <img class="header" src="../../assets/heating2.png" />
        <div class="details">
          <div class="main">
            <!-- 下方新闻 -->
            <div class="foot">
              <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <van-cell
                  class="foot_news"
                  v-for="(item, index) in data.list"
                  :key="index"
                  @click="navigetNews(item)"
                >
                  <div class="news_text">
                    <div class="zhengzhou">大河报郑州新闻</div>
                    <div class="news_title">{{ item.news_title }}</div>
                    <text class="from"> 来自: </text>
                    <text class="fromName"
                      >{{ item.news_editor }}{{ item.news_edit_date }}</text
                    >
                  </div>
                  <div class="news_img">
                    <img
                      :src="item.news_single_img"
                      v-if="item.news_single_img"
                    />
                    <img src="../../assets/icon.png" v-else />
                  </div>
                </van-cell>
              </van-list>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<style lang="less" scoped>
.content {
  background: #f5dab3;
  width: 750px;
  min-height: 100vh;
  header {
    width: 750px;
    height: 399px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  main {
    padding: 0 10px;
    position: relative;
    .button {
      position: absolute;
      width: 365px;
      height: 140px;
      opacity: 0;
    }
    .close {
      top: 0px;
      right: 0px;
    }
    .open {
      top: 0px;
      left: 0px;
    }
    .reply {
      width: 730px;
      min-height: 800px;
    }
    .news {
      width: 730px;
      min-height: 800px;
    }
    .details {
      box-shadow: 0 4px 8px 5px rgba(0, 0, 0, 0.5),
        0 6px 20px 5px rgba(0, 0, 0, 0.19);
      box-sizing: border-box;
      width: 717px;
      margin-left: 5px;
      min-height: 800px;
      border: 20px solid #ce7f55;
      background-color: #ce7f55;
      border-radius: 0 0 15px 15px;
      .main {
        background: white;
        width: 657px;
        margin: 0 auto;
        min-height: 800px;
        border-radius: 20px;
        box-sizing: border-box;
        padding-top: 30px;
      }
    }
    .header {
      display: block;
      width: 730px;
      height: 145px;
    }
  }
  .foot {
    // margin-top: 30px;
    .foot_title {
      height: 80px;
      line-height: 80px;
      // margin: 30px 30px 0 30px;
      border-bottom: 1px solid #f5f5f5;
      font-size: 35px;
      font-weight: 500;
    }
    .zhengzhou {
      color: #b56f4b;
      font-size: 20px;
    }
    .foot_news {
      width: 657px;
      // height: 200px;
      .news_text {
        vertical-align: top;
        // font-size: 30px;
        font-weight: 500;
        width: 400px;
        display: inline-block;
        .news_title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .from {
          font-size: 20px;
          font-weight: 400;
          color: #aaa;
        }
        .fromName {
          font-weight: 400;
          font-size: 20px;
          color: #aaa;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .news_img {
        margin-left: 10px;
        display: inline-block;
        height: 160px;
        width: 180px;
        padding: 10px 0;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .reply_list {
    .reply_title {
      display: flex;
      // justify-content: center;
      align-items: center;
      .van-image {
        width: 124px;
        height: 124px;
        border: 2px solid #ce7f55;
        margin-right: 30px;
      }
      span {
        height: 80px;
        line-height: 80px;
        width: 400px;
        display: inline-block;
        font-size: 32px;
        border-bottom: 1px solid #ce7f55;
      }
    }
    .tag {
      font-size: 34px;
      margin: 40px 0 20px 0;
      color: #b56f4b;
    }
    .introduce {
      text-indent: 2rem;
      min-height: 64px;
      box-sizing: border-box;
      padding: 32px 27px;
      background: #efefef;
      border: 2px solid #ce7f55;
    }
    .lin {
      margin: 58px 0 21px;
      color: black;
      font-weight: 600;
      font-size: 34px;
    }
  }
}
::v-deep .van-cell:after {
  border-bottom: 1px solid #e9b597;
}
</style>
