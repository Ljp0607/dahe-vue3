<template>
  <div class="Info">
    <div class="empty"></div>
    <van-icon class="icon" color="white" size="30px" name="arrow-left" />
    <div class="form">
      <div class="message">1.选择要申请的小组</div>
      <input
        class="inputGroup"
        type="text"
        placeholder="美食，运动，阅读等"
        v-model="Info.accountName"
      />
      <div class="message">2.发表申请留言</div>
      <div class="introduces">
        可以谈谈对该小组的个人优势，资源等，您的留言将供工作人员参考，作为审核的重要依据
      </div>
      <textarea class="inputWord" v-model="Info.realName"></textarea>
      <div class="message">3.填写申请信息</div>
      <img class="image" src="@/assets/05.png" alt="" />
      <div class="introduce">
        您提供的信息仅供大河报·豫视频审核参考及开设账号，相关信息将严格保密。
      </div>

      <!-- 正常框 -->
      <div class="main" v-for="(item, index) in data.message" :key="index">
        <div class="title">{{ item.name }}</div>
        <input
          class="input"
          type="text"
          v-model="item.value"
          :placeholder="item.placeholder"
        />
      </div>

      <div class="expert">
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
          placeholder="详细地址"
          type="text"
          v-model="Info.countyId"
        />
        <img
          v-show="!fieldValue"
          @click="show = true"
          class="county_img"
          src="@/assets/08.png"
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
    <div class="empty" style="height: 80px"></div>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { Toast, Dialog } from "vant";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import { useCounterStore } from "../../stores/counter";
const store = useCounterStore();
const show = ref(false);
const cascaderValue = ref("");
const axios = getCurrentInstance().proxy.$axios;
const fieldValue = ref("");
const pattern =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$/;
const Info = reactive({
  accountName: "", //申请的小组
  realName: "", //申请留言
  authName: "", //姓名
  idCard: "", //身份证号
  phone: "", //电话
  authType: "5", //
  provinceId: "", //省市
  countyId: "", //详细地址
  cityId: "", //地市
  fileList: [],
});
const data = reactive({
  message: [
    {
      type: "input",
      name: "真实姓名",
      value: "",
      // placeholder: "请输入企业名称",
      pattern: /^[\u4e00-\u9fa5]{2,4}$/,
      fileList: [],
    },
    {
      type: "input",
      name: "身份证号",
      value: "",
      // placeholder: "请输入品牌名称",
      pattern:
        /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

      fileList: [],
    },
    {
      type: "input",
      name: "联系手机",
      value: "",
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,

      // placeholder: "请输入品牌名称",
      fileList: [],
    },
  ],
});
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
    if (i.value == "" || !i.pattern.test(i.value)) {
      Toast("请检查" + i.name + "信息");
      return;
    }
  }
  if (Info.accountName == "") {
    Toast("请填写申请的小组");
    return;
  } else if (Info.realName == "") {
    Toast("请填写申请留言");
    return;
  } else if (Info.provinceId == "") {
    Toast("请选择所在地区");
    return;
  } else if (Info.countyId == "") {
    Toast("请检查详细地址");
    return;
  } else {
    Info.authName = data.message[0].value;
    Info.idCard = data.message[1].value;
    Info.phone = data.message[2].value;
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
        fieldValue.value = "";
        Info.countyId = "";
        Info.accountName = ""; //申请的小组
        Info.realName = ""; //申请留言
      } else {
        Toast(res.data);
      }
    },
    (err) => {
      Toast(err);
    }
  );
}
onMounted(() => {
  getCountyList();
});
</script>

<style lang="less" scoped>
.Info {
  width: 100vw;
  min-height: 100vh;
  background: #311648;
  background-image: url("@/assets/11.png");
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  .empty {
    height: 10px;
    width: 100vw;
  }
  .icon {
    position: absolute;
    top: 15px;
    left: 50px;
  }
  .form {
    margin-top: 380px;
    margin-left: 54px;
    width: 641px;
    min-height: 888px;
    background-clip: padding-box;
    background-color: #fff;
    border: 15px solid rgba(255, 255, 255, 0.5);
    padding: 25px;
    box-sizing: border-box;

    .inputGroup {
      text-align: center;
      font-size: 30px;
      border: #003c8e 1px solid;
      width: 540px;
      margin: 30px 0;
      height: 68px;
    }
    .inputWord {
      font-size: 30px;
      border: #003c8e 1px solid;
      width: 540px;
      margin-bottom: 20px;
      height: 204px;
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
    .introduces {
      margin: 15px 0;
      font-size: 24px;
      font-weight: 400;
      color: #818181;
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
      .tips {
        color: #818181;
        font-weight: 400;
        display: inline-block;
        font-size: 24px;
      }
    }
    .input {
      text-align: center;
      font-size: 30px;
      border: #003c8e 1px solid;
      width: 317px;
      height: 68px;
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
      background: #591083;
      border: 1px solid #591083;
      border-radius: 50px;
      font-size: 35px;
      font-weight: 800;
      color: #ffffff;
    }
  }
}
</style>
