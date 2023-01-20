<template>
  <div class="main" v-if="props.info.length > 0">
    <div class="item_content">
      <!--遍历数组,生成视频或图片 -->
      <div class="item" v-for="(item, index) in props.info" :key="index">
        <!-- 如果有视频,展示视频和播放键 -->
        <div @click="navigetDetail(item.postsId)" class="video" v-if="item.postsVideo">
          <img :src="item.postsVideoImg" />
          <img class="item_start" src="https://imgcdn.dahebao.cn/20221011/20221011094515515822.png" />
        </div>
        <!-- 如果有图片,显示图片 -->
        <div @click="navigetDetail(item.postsId)" class="img" v-else>
          <img class="postsImg" :src="JSON.parse(item.postsImg)[0].imgUrl + '/pc_600'" />
        </div>
        <div class="postsTitle">
          <div class="hotData">
            <span> 人气值:</span>
            <span style="color: #dc5d3c">{{ item.hotData }}</span>
          </div>
          <span>{{ item.postsTitle }} </span>
        </div>
        <div v-if="!item.ifThumb" class="text" @click="postThum(item, index)">为TA点赞</div>
        <div v-else class="text" @click="postThum(item, index)">已投票</div>
      </div>
      <img
        v-if="props.info.length == 0"
        class="empty"
        src="https://imgcdn.dahebao.cn/20221027/20221027113957273185.png"
        alt=""
      />
    </div>
  </div>
  <div v-else class="empty">
    <img src="https://imgcdn.dahebao.cn/20221027/20221027113957273185.png" />
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { showToast } from 'vant'
import setting from '@/common/setting'
import { poststhumbup } from '@/api/autoShow/index'
import { goLogin, goPosts } from '@/common/appRoute'
const store = useCounterStore()
interface Props {
  info?: Array<{
    activityNo: string
    creatorType: number
    hotData: number
    postsId: number
    postsImg: string
    postsThumbUpNum: number
    postsTitle: string
    postsVideo: string
    postsVideoImg: string
    userName: string
    ifThumb: number
  }>
}
const props = defineProps<Props>()
//投票
function postst(index: number) {
  //如果无userId,判断环境,如果在微信,跳下载,如果浏览器环境,跳登录
  if (store.$state.userId == '') {
    if (setting()) {
      showToast('请在豫视频App查看详情')
      setTimeout(() => {
        location.href =
          'https://news.dahebao.cn/appdownload/index.html?Type=101&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow'
      }, 600)
    } else {
      goLogin()
    }
  } else {
    //投票
    if (props.info[index].ifThumb == 0) {
      poststhumbup(
        JSON.stringify({
          user_id: store.$state.userId,
          action_type: 1,
          posts_id: props.info[index].postsId,
        })
      ).then((res: string) => {
        if (res == '操作成功') {
          props.info[index].hotData += 10
          props.info[index].ifThumb = 1
          showToast('投票成功')
        } else {
          showToast(res)
        }
      })
    } else {
      showToast('每个作品只能投一票')
    }
  }
}
//投票
function postThum(item: any, index: number) {
  // console.log(e);
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == '' && setting()) {
    showToast('请在豫视频App投票')
    setTimeout(() => {
      location.href =
        'https://news.dahebao.cn/appdownload/index.html?Type=102&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow'
    }, 500)
  }
  //如果在其他浏览器,跳转下载页
  else if (store.$state.userId == '' && !setting()) {
    //跳转登录
    goLogin()
  } else {
    postst(index)
  }
}
//跳转详情页
function navigetDetail(e: number) {
  //如果在微信浏览器,跳转下载页
  if (store.$state.userId == '' && setting()) {
    showToast('请在豫视频App查看详情')
    setTimeout(() => {
      location.href =
        'https://news.dahebao.cn/appdownload/index.html?Type=101&openUrl=https://news.dahebao.cn/dahe/h5/cityvote/index.html#/autoShow'
    }, 500)
  }
  //如果在其他浏览器,跳转下载页
  else if (store.$state.userId == '' && !setting()) {
    //跳转登录
    goLogin()
  } else {
    //跳转帖子
    goPosts(e)
  }
}
</script>
<style lang="less" scoped>
.main {
  margin: 0 auto;
  width: 665px;
  background: #fff;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0px 43px 50px 43px;
  justify-content: space-between;
  .item {
    margin-top: 50px;
    width: 266px;
    height: 344px;
    // background: #d7d7d7;
    span {
      // color: #fff;

      color: #eb0f00;
    }
    img {
      box-sizing: border-box;
      width: 266px;
      height: 209px;
    }
    .hotdata {
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
    }
    button {
      margin-top: 26px;
      border: none;
      border-radius: 50px;
      width: 316px;
      height: 68px;
      background: #84b5ff;
      color: #203ab2;
      font-weight: 800;
    }
  }
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
.empty {
  width: 100%;
  text-align: center;
  img {
    width: 665px;
  }
}
</style>
