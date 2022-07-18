<template>
  <div class="form">
    <!-- 达人号的附加框 -->
    <div v-if="authType == '4'">
      <div class="message">申请达人类型</div>
      <input
        class="expert_input"
        v-model="Info.talentTypeName"
        placeholder="美食，运动等，名称自填"
        type="text"
      />
    </div>

    <div class="message">{{ title }}</div>
    <img class="image" src="../../assets/05.png" alt="" />
    <div class="introduce">
      您提供的信息仅供大河报·豫视频审核参考及开设账号，相关信息将严格保密。
    </div>

    <!-- 正常框 -->
    <div class="main" v-for="(item, index) in data.message" :key="index">
      <div class="title">{{ item.name }}</div>

      <input
        v-show="item.type == 'input'"
        class="input"
        type="text"
        v-model="item.value"
        :placeholder="item.placeholder"
      />
      <van-uploader
        class="uploader"
        v-show="item.type == 'upload'"
        v-model="Info.fileList"
        :after-read="afterRead"
      />
      <div v-show="item.type == 'upload'" class="tips">
        （ 请上传营业执照，获奖证书或认证证书 ）
      </div>
    </div>

    <!-- 达人号的附加框 -->
    <div class="expert" v-if="authType == '4'">
      <div class="county">所在地区</div>
      <input
        class="province"
        readonly
        v-model="fieldValue"
        @click="show = true"
        type="text"
      />
      <input
        class="province_more"
        v-model="Info.countyId"
        placeholder="详细地址"
        type="text"
      />
      <img
        v-show="!fieldValue"
        @click="show = true"
        class="county_img"
        src="../../assets/08.png"
        alt=""
      />
    </div>

    <van-popup v-model:show="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="data.options"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
    <button class="submit" @click="submit">提交信息</button>
  </div>
</template>
<script setup>
import { reactive, watch, getCurrentInstance, onMounted, ref } from "vue";
import { useCounterStore } from "../../stores/counter";
import { Toast, Dialog } from "vant";
import "vant/es/toast/style";
import "vant/es/dialog/style";
const show = ref(false);
const cascaderValue = ref("");
const props = defineProps({
  message: Array,
  title: String,
  authType: String,
});
const axios = getCurrentInstance().proxy.$axios;
const data = reactive({
  message: [],
  options: [],
});
const Info = reactive({
  authName: "",
  accountName: "",
  realName: "",
  phone: "",
  authType: "",
  talentTypeName: "",
  idCard: "",
  provinceId: "",
  countyId: "",
  cityId: "",
  fileList: [],
});
const store = useCounterStore();
const fieldValue = ref("");
//获取省市区
function getCountyList() {
  axios({
    method: "GET",
    url: "https://news.dahebao.cn/dahe/app/announce/countyList",
  }).then(
    (res) => {
      if (res.status == 200) {
        for (let i of res.data) {
          for (let j of i.children) {
            delete j.children;
          }
        }
        data.options = res.data;
      } else {
        Toast(res.status);
      }
    },
    (err) => {
      Toast(err);
    }
  );
}
//获取省市数据
function onFinish({ selectedOptions }) {
  show.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join("/");
  Info.cityId = cascaderValue.value.toString();
  Info.provinceId = cascaderValue.value.toString().slice(0, 2) + "0000";
}
//提交表单
function submit() {
  for (let i of data.message) {
    // console.log(data.message);
    if (i.value == "") {
      Toast("请检查" + i.name + "信息");
      return;
    }
  }
  if (props.authType == "4") {
    if (Info.talentTypeName == "") {
      Toast("请检查申请达人类型");
      return;
    } else if (Info.cityId == "") {
      Toast("请检查所在地区");
      return;
    } else if (Info.countyId == "") {
      Toast("请检查详细地址");
      return;
    } else {
      Info.realName = data.message[0].value;
      Info.idCard = data.message[1].value;
      Info.phone = data.message[2].value;
      Info.authType = props.authType;
    }
  } else {
    Info.authName = data.message[0].value;
    Info.accountName = data.message[1].value;
    Info.realName = data.message[2].value;
    Info.phone = data.message[3].value;
    Info.authType = props.authType;
  }
  axios({
    method: "post",
    url: `https://news.dahebao.cn/dahe/app/accountAuthRecord/saveAccountAuthRecord?userId=${store.$state.userId}`,
    data: [Info],
  }).then(
    (res) => {
      if ((res.state = 1)) {
        Dialog({
          message: "信息已提交成功，请等待审核，通过后将有工作人员联系您。",
          theme: "round-button",
        });
        for (let info of data.message) {
          info.value = "";
        }
        Info.fileList.length = 0;
        Info.talentTypeName = "";
        fieldValue.value = "";
        Info.countyId = "";
      } else {
        Toast(res.data);
      }
    },
    (err) => {
      Toast(err);
    }
  );
}
//上传图片
function afterRead(file) {
  let formData = new FormData();
  formData.append("file", file.file);
  axios({
    method: "post",
    url: "https://news.dahebao.cn/dahe/app/announce/uploadImg",
    data: formData,
  }).then(
    (res) => {
      if (res.status == 200) {
        Info.fileList[Info.fileList.length - 1].fileUrl = res.data.data.fileUrl;
      } else {
        Toast(res.status);
      }
    },
    (err) => {
      Toast(err);
    }
  );
}
//监听file，改变data.message
watch(
  () => Info.fileList,
  (newName, oldName) => {
    if (newName.length == 0) {
      data.message[4].value = "";
    } else {
      data.message[4].value = "1";
    }
  }
);

onMounted(() => {
  data.message = props.message;
  if (props.authType == "4") {
    getCountyList();
  }
});
</script>

<style lang="less" scoped>
.form {
  width: 641px;
  min-height: 888px;
  background-clip: padding-box;
  background-color: #fff;
  border: 15px solid rgba(255, 255, 255, 0.5);
  padding: 25px;
  box-sizing: border-box;

  .expert_input {
    margin: 20px 0 47px 0;
    text-align: center;
    font-size: 30px;
    border: #003c8e 1px solid;
    width: 550px;
    height: 88px;
  }
  .message {
    font-size: 35px;
    font-weight: 800;
    color: #003c8e;
  }
  .image {
    width: 541px;
    height: 3px;
  }
  .introduce {
    margin: 27px 0 40px 0;
    font-size: 24px;
    font-weight: 400;
    color: #818181;
  }
  .main {
    margin-top: 25px;
    min-height: 90px;
    line-height: 90px;
    .title {
      vertical-align: top;
      height: 68px;
      font-weight: bold;
      display: inline-block;
      font-size: 30px;
      color: #003c8e;
      margin-right: 20px;
      width: 190px;
      text-align-last: justify;
      text-align: justify;
      &:after {
        content: "";
        width: 100%;
        height: 0;
        display: inline-block;
        visibility: hidden;
      }
    }

    .input {
      text-align: center;
      font-size: 30px;
      border: #003c8e 1px solid;
      width: 317px;
      height: 68px;
    }
    .tips {
      color: #818181;
      font-weight: 400;
      display: inline-block;
      font-size: 24px;
    }
  }
  .expert {
    margin-top: 25px;
    position: relative;
    .county {
      vertical-align: top;
      font-weight: bold;
      display: inline-block;
      font-size: 30px;
      color: #003c8e;
      margin-right: 20px;
      height: 68px;
      line-height: 68px;
      width: 190px;
      text-align-last: justify;
      text-align: justify;
      &:after {
        content: "";
        width: 100%;
        height: 0;
        display: inline-block;
        visibility: hidden;
      }
    }
    .province {
      // margin-top: 25px;
      text-align: center;
      font-size: 30px;
      border: #003c8e 1px solid;
      width: 317px;
      height: 68px;
    }
    .province_more {
      margin-left: 210px;
      margin-top: 25px;
      text-align: center;
      font-size: 30px;
      border: #003c8e 1px solid;
      width: 317px;
      height: 68px;
    }
    .county_img {
      display: block;
      position: absolute;
      top: 34px;
      right: 50px;
      width: 31px;
      height: 18px;
    }
  }
  .submit {
    margin-top: 42px;
    margin-left: 66px;
    text-align: center;
    width: 419px;
    height: 84px;
    background: #003c8e;
    border: 1px solid #003c8e;
    border-radius: 50px;
    font-size: 35px;
    font-weight: 800;
    color: #ffffff;
  }
}
</style>
