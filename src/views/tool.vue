<template>
  <div class="container">
    <van-uploader
      :preview-full-image="false"
      v-model="data.file"
      accept="video/*,image/*"
      ResultType="file"
      max-count="1"
      :after-read="afterRead"
      @delete="changeDelete"
    />
    <input text="textarea" :value="data.value" />
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import axios from "axios";

import TcVod from "vod-js-sdk-v6";
//获取info和图片视频保存地址
const data: any = reactive({
  // value: [],
  // number: 0,
  value: "",
});
// let timer: any;
// const getData = async () => {
//   await axios
//     .get("https://yz.chsi.com.cn/apply/code/cjcxshouyedw/32.json")
//     .then((res) => {
//       res.data.dms.forEach((item: any) => {
//         if (item.dwdm == 10284) {
//           data.value.push(item);
//           data.number = 0;
//           return;
//         }
//       });
//     });
// };
// getData().then(() => {
//   let timer = setInterval(() => {
//     data.number++;
//     if (data.number >= 9) {
//       clearInterval(timer);
//     }
//   }, 1000);
// });
onMounted(() => {});
//   setInterval(() => {
//     let timer = setInterval(() => {
//       data.number++;
//       if (data.number >= 9) {
//         clearInterval(timer);
//       }
//     }, 1000);
//     getData();
//   }, 10000);
// });
// 上传
const afterRead = (file: any) => {
  if (file.file.type.indexOf("image") != -1) {
    data.accept = "image/*";
    postImg(file);
  } else {
    postVideo(file.file);
  }
};
//封装图片上传
function postImg(file: any) {
  let imgFile = new FormData();
  imgFile.append("file", file.file);
  axios
    .post("https://news.dahebao.cn/dahe/app/announce/uploadImg", imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data.data.fileUrl);
      data.value = res.data.data.fileUrl;
    });
}
//获取上传签名
async function getSignature() {
  const response = await axios.post(
    "https://news.dahebao.cn/dahe/appshortvideocb/getsignature"
  );
  return response as any;
}
// delete Info.posts_img;
//封装视频上传
function postVideo(file: any) {
  //获取视频签名
  const tcVod: any = new TcVod({
    getSignature: getSignature,
  });
  const uploader = tcVod.upload({
    mediaFile: file, // 媒体文件（视频或音频或图片），类型为 File
  });
  uploader.done().then((doneResult: any) => {
    console.log(doneResult);
  });
}
//删除图片
function changeDelete() {
  if (data.file.length == 0) {
    data.value = "";
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 750px;
  min-height: 100vh;
  .love {
    width: 80px;
    height: 80px;
  }
  .schurl {
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #8470ff;
    .aaa {
      box-sizing: border-box;
      padding-left: 200px;
      // margin: 0 auto;
      display: flex;
      // justify-content: center;
      align-items: center;
      .span {
        display: inline-block;
        margin: 4px;
      }
    }
  }
  // background: #bce2d5;
  // min-height: 100vh;
  // display: flex;
  // justify-content: center;
  // // align-items: center;
  // padding-top: 100px;
  // flex-wrap: wrap;
  // input {
  //   width: 50%;
  //   height: 80px;
  // }
}
</style>
