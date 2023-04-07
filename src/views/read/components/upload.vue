<template>
  <div class="container">
    <header></header>
    <main>
      <van-form @submit="onFailed">
        <van-cell-group class="group" inset>
          <van-field
            v-model="Info.field4"
            is-link
            readonly
            label="学校"
            :required="true"
            placeholder="选择学校"
            @click="showPicker = true"
          />
          <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker
              :columns="store.$state.school"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
          <van-field
            v-for="(item, index) in data.info"
            :key="index"
            :rules="[{ required: !item.isNull, message: `请填写${item.name}` }]"
            :label="`${item.name}:`"
            :required="!item.isNull"
            :name="item.name"
            :placeholder="`请输入${item.name}`"
            :maxlength="item.length"
            :type="Number(item.length) > 200 ? 'textarea' : 'text'"
            autosize
            v-model="item.value"
          >
            <template #input v-if="item.type == 1">
              <van-uploader
                :preview-full-image="false"
                v-model="data.file"
                :accept="data.accept"
                ResultType="file"
                :max-count="data.max"
                :after-read="afterRead"
                @delete="changeDelete"
              />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block color="#BA4D12" native-type="submit">
            提交报名
          </van-button>
        </div>
      </van-form>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import { showToast, showLoadingToast, closeToast } from "vant";
import { saveBook } from "@/api/read";
import { useCounterStore } from "@/stores/counter";
import TcVod from "vod-js-sdk-v6";
const store = useCounterStore();
const showPicker = ref(false);
//获取info和图片视频保存地址
const data: any = reactive({
  accept: "video/*,image/*",
  max: 9,
  info: [
    {
      isNull: false,
      name: "姓名",
      length: 20,
      value: "",
    },
    {
      isNull: false,
      name: "年级",
      length: 20,
      value: "",
    },
    {
      isNull: false,
      name: "班级",
      length: 20,
      value: "",
    },
    {
      isNull: false,
      name: "作品",
      length: 20,
      value: "",
      type: 1,
    },
  ],
  file: [],
});
//用户填写信息
interface infoType {
  posts_title: string;
  tecent_video_id: string;
  posts_video: string;
  posts_video_img: string;
  creatorType: string; //地市编码 必传
  creator_type: string;
  posts_img: string;
  field4: string;
  field1: string;
  field2: string;
  field3: string;
}
const Info = reactive<infoType>({
  posts_title: "阅读,看见更大的世界", //标题
  posts_img: "", //图片
  posts_video: "", //视频
  posts_video_img: "",
  tecent_video_id: "", //视频id
  creatorType: store.$state.city.city_id, //编码 必传
  creator_type: store.$state.city.city_id, //编码 必传
  field4: "",
  field1: "", //姓名
  field2: "", //年级
  field3: "", //班级
});
//获取表单数据并提交
const onFailed = () => {
  if (data.max == 9 && data.file[0].url) {
    let array: any = [];
    data.file.map((item: any) => {
      array.push({
        imgUrl: item.url,
        imgWidth: "750",
        imgHeight: "560",
        imgType: 2,
      });
    });
    Info.posts_img = JSON.stringify(array);
    Info.posts_video = ""; //视频
    Info.tecent_video_id = ""; //视频id
  }
  Info.field1 = data.info[0].value;
  Info.field2 = data.info[1].value;
  Info.field3 = data.info[2].value;
  console.log(Info);

  saveInfo();
};
// 上传
const afterRead = (file: any) => {
  if (file.file.type.indexOf("image") != -1) {
    data.accept = "image/*";
    data.max = 9;
    postImg(file);
  } else {
    data.max = 1;
    postVideo(file.file);
  }
  showLoadingToast({
    duration: 0,
    message: "正在上传",
    forbidClick: true,
  });
};
//封装图片上传
function postImg(file: any) {
  let imgFile = new FormData();
  imgFile.append("file", file.file);
  // http://cms.daheapp.com/dahe/
  // https://news.dahebao.cn/dahe/
  axios
    .post("https://news.dahebao.cn/dahe/app/announce/uploadImg", imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res: any) => {
      if (res.state == 1) {
        file.url = res.data.fileUrl; //赋值
        file.id = res.data.fileId;
        delete Info.posts_video_img;
        closeToast();
      } else {
        showToast("上传失败");
        data.file = [];
      }
    });
}
//获取上传签名
async function getSignature() {
  const response = await axios.post(
    "https://news.dahebao.cn/dahe/appshortvideocb/getsignature"
  );
  return response as any;
}
//封装视频上传
function postVideo(file: any) {
  //获取视频签名
  const tcVod: any = new TcVod({
    getSignature: getSignature,
  });
  const uploader = tcVod.upload({
    mediaFile: file, // 媒体文件（视频或音频或图片），类型为 File
  });
  uploader
    .done()
    .then((doneResult: any) => {
      Info.tecent_video_id = doneResult.fileId;
      Info.posts_video = doneResult.video.url;
      delete Info.posts_img;
      Info.posts_video_img = "";
      getVideoBase64(doneResult.video.url).then(() => {
        closeToast();
      });
    })
    .catch(function () {
      showToast("上传失败,请重新上传视频");
    });
}
//发送表单数据
function saveInfo() {
  saveBook(Info).then((res: any) => {
    console.log(res);
    if (res.state == 1) {
      showToast(res.data);
      data.info.map((item: any) => {
        item.value = "";
      });
      //提交成功,重新渲染表单
      data.file = [];
      data.accept = "image/*,video/*";
      data.max = 9;
      Info.field4 = "";
      Info.posts_img = ""; //图片
      Info.posts_video_img = ""; //视频
      Info.posts_video = ""; //视频
      Info.tecent_video_id = ""; //视频id
    } else {
      showToast(res.message);
    }
  });
}
//删除图片
function changeDelete() {
  if (data.file.length == 0) {
    data.accept = "video/*,image/*";
  }
}
//选择城市
function onConfirm({ selectedOptions }) {
  console.log(selectedOptions);
  showPicker.value = false;
  Info.field4 = selectedOptions[0].text;
  Info.creator_type = selectedOptions[0].value;
  Info.creatorType = selectedOptions[0].value;
}
//获取视频封面
async function getVideoBase64(url: string) {
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
    data.file[0].content = dataURL;
    data.file[0].file = "";
    console.log(dataURL);
  });
}
onMounted(() => {});
</script>
<style lang="less" scoped>
.container {
  width: 750px;
  background: #f79254;
  background-image: url("https://imgcdn.dahebao.cn/20230403/20230403170639254503.png");
  background-size: 100%;
  background-repeat: no-repeat;
  min-height: 100vh;
  header {
    width: 750px;
    min-height: 610px;
    img {
      float: left;
      margin: 10px 0 0 31px;
      width: 115px;
      height: 20px;
    }
  }
  main {
    width: 750px;
    padding-bottom: 50px;
    box-sizing: border-box;
    text-align: center;
    .van-form {
      margin: -56px auto 10px;
      width: 633px;
      border: 15px solid #ba4d12;
      border-radius: 20px;
      min-height: 943px;
      z-index: 100;
      color: red;
      padding: 15px;
      box-sizing: border-box;
      background: #fff;
      .group {
        color: red;
      }
    }
  }
}

.van-cell {
  align-items: center;
  min-height: 100px;
  line-height: 100px;
}
.van-cell-group--inset {
  margin: 0;
  padding-top: 20px;
}
.van-button {
  font-size: 35px;
  margin: 0 auto;
  width: 442px;
  height: 72px;
}
::v-deep .van-field__label {
  width: 120px;
  // margin-right: 0;
}
// ::v-deep .van-field__label {
// }
//全屏按钮
// video::-webkit-media-controls-fullscreen-button {
//   display: none;
// }
//播放按钮
// video::-webkit-media-controls-play-button {
//   display: none;
// }
// //进度条
video::-webkit-media-controls-timeline {
  display: none;
}
// //观看的当前时间
// video::-webkit-media-controls-current-time-display {
//   display: none;
// }
// //剩余时间
// video::-webkit-media-controls-time-remaining-display {
//   display: none;
// }
// //音量按钮
video::-webkit-media-controls-mute-button {
  display: none;
}
// video::-webkit-media-controls-toggle-closed-captions-button {
//   display: none;
// }
// //音量的控制条
video::-webkit-media-controls-volume-slider {
  display: none;
}
//所有控件
// video::-webkit-media-controls-enclosure {
//   display: none;
// }
</style>
