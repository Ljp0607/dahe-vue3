<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div class="group" v-for="(item, index) in data.item" :key="index">
      <div v-if="props.mylist" class="state">
        <div class="issue">
          <div class="myIssue">我发布的</div>
          <div
            class="postsState"
            style="background: #00bd85"
            v-show="item.postsState == '1'"
          >
            已审核
          </div>
          <div
            class="postsState"
            style="background: #e50012"
            v-show="item.postsState == '2'"
          >
            待审核
          </div>
          <div
            class="postsState"
            style="background: #fb6634"
            v-show="item.postsState == '0'"
          >
            已解决
          </div>
        </div>
        <div class="updata" @click="clickUpdata(item.posts_id)">更新状态</div>
      </div>
      <div v-else>
        <div
          class="solve"
          style="background: #fb6634"
          v-show="item.postsState == '1'"
        >
          未解决
        </div>
        <div
          class="solve"
          style="background: #00bd85"
          v-show="item.postsState == '0'"
        >
          已解决
        </div>
      </div>
      <div class="item">
        <span class="blod" v-if="props.need == 1001"
          >需&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp要</span
        >
        <span class="blod" v-else>提&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp供</span>

        <span class="btn blod" style="color: red">{{ item.field1 }}</span>
      </div>
      <div class="time">
        {{
          item.posts_publish_time ? item.posts_publish_time : item.createTime
        }}
      </div>
      <div class="item">
        <span class="inc">位&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp置</span
        ><span class="btn">{{ item.field4 }}</span>
      </div>
      <div class="item">
        <span class="inc">描&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp述</span
        ><span class="btn">{{ item.field3 }}</span>
      </div>
      <div class="item" @click="look(item)">
        <span class="inc">联系方式</span
        ><span v-show="props.need == 1001" class="btn" style="color: #7b68ee">
          我能提供帮助</span
        >
        <span v-show="props.need == 1002" class="btn" style="color: #7b68ee">
          我需要帮助
        </span>
      </div>
    </div>
  </van-list>
  <van-popup
    round
    v-model:show="show"
    position="bottom"
    :style="{ height: '70%' }"
  >
    <div class="popup">
      <div style="font-weight: 400; color: #333333">
        <span style="font-size: 20px">服务说明</span> <br />
        本服务为公益性质，仅为求助者和帮助者提供信息发布和查询平台服务，如您需要使用本服务，请务必遵守本《服务说明》。<br />
        1.本平台所展示的帮助信息及求助信息均是由用户自行发布，请您谨慎甄别信息真伪，防止受骗。<br />
        2.本服务仅供用户自行发布、查询互助信息，不具备撮合、沟通场所、线上签约等平台服务功能，也不参与用户之间的互助及药品交换过程。用户之间如因互助行为发生纠纷的，请自行协商或通过法律途径解决。<br />
        3.如您通过本服务向求助者提供药品，请确保所发药品准确无误且仍在有效期内，并尽可能提供原包装及药品说明书，方便求助者合理安全用药。<br />
        4.如您通过本服务从帮助者处获得药品，请仔细检查药品及其包装是否准确无误。如有破损或与诉求不一致请勿使用。请严格按照药品说明书或遵医嘱使用药品重点关注用法用量、药物冲突、禁忌症、不良反应等用药安全信息，合理用药。<br />
        5请勿通过本服务发布处方药帮助或求助信息。所有处方药必须凭处方调配和使用，如有需要，请及时就医。<br />
        6.您应仔细阅读并确认遵守《服务协议》后再开始使用本服务<br />
      </div>
      <div class="button">
        <button round @click="show = false">不同意</button>
        <button
          round
          @click="clickAgree"
          style="background: #3c83ff; color: #fff"
        >
          同意
        </button>
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { selectHelp, selecMytHelp } from "@/api/medicHelp/index";
import { showToast, showConfirmDialog } from "vant";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import setting from "@/common/setting";
import { useCounterStore } from "@/stores/counter";
import { goLogin } from "@/common/appRoute";
import "vant/es/toast/style";
import axios from "axios";
const loading = ref(false);
const finished = ref(false);
const store = useCounterStore();
const show = ref(false);
interface Props {
  need: number;
  mylist: boolean;
}
const props = defineProps<Props>();
const data: any = reactive({
  item: [],
  current: 1,
  phoneNo: 0,
});
//下滑刷新
const onLoad = () => {
  // console.log(props.mylist);
  if (props.mylist) {
    return;
  } else {
    getHelp();
    data.current++;
  }
};
//获取详细信息
const getHelp = () => {
  selectHelp(props.need.toString(), data.current).then((res: any) => {
    if (res.state == 1 && res.data.length != 0) {
      data.item = [...data.item, ...res.data];
      loading.value = false;
    } else {
      finished.value = true;
    }
  });
};
//获取我的信息
const getMyHelp = () => {
  selecMytHelp(props.need.toString()).then((res: any) => {
    if (res.state == 1 && res.data.length != 0) {
      data.item = res.data;
    }
    finished.value = true;
  });
};
//吊起隐私协议查看手机号
function look(e: any) {
  //如果无userId,判断环境,如果在微信,跳下载,如果浏览器环境,跳登录
  if (store.$state.userId == "") {
    if (setting()) {
      showToast("请在豫视频App查看详情");
      setTimeout(() => {
        location.href =
          "https://news.dahebao.cn/appdownload/index.html?Type=120&openUrl=https://news.dahebao.cn/dahe/h5/medicineHelp/index.html#/medicineHelp";
      }, 800);
    } else {
      goLogin();
    }
  } else {
    if (e.postsState != 1) {
      showToast("该问题已解决,不能查看联系方式");
    } else {
      show.value = true;
      data.phoneNo = e.field2;
    }
    //查看手机号
  }
}
//更新状态
const clickUpdata = (id: string) => {
  // console.log(props.need);
  if (props.need == 1001) {
    showConfirmDialog({
      title: "是否已收到药品",
    })
      .then(() => {
        deletePost(id);
        showToast("凝聚百姓力量,携手战胜疫情!");
      })
      .catch(() => {});
  } else {
    showConfirmDialog({
      title: "是否已送出药品",
    })
      .then(() => {
        deletePost(id);
        showToast("感谢您对抗疫做出的贡献");
      })
      .catch(() => {});
  }
};
//更新状态
function deletePost(postsId: string | number) {
  axios({
    url: "https://news.dahebao.cn/dahe/appposts/deleteposts",
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      sign: "378de2b5ab46488408fbf730b8276d28",
      data: JSON.stringify({
        user_id: store.$state.userId,
        posts_id: postsId,
      }),
    },
  }).then((res: any) => {
    if (res.state == 1) {
      getMyHelp();
    }
  });
}

const clickAgree = () => {
  show.value = false;
  showConfirmDialog({
    title: "是否联系该用户",
    message: `手机号:${data.phoneNo}`,
  })
    .then(() => {
      window.location.href = `tel:${data.phoneNo}`;
    })
    .catch(() => {});
};

onMounted(() => {
  if (props.mylist) {
    getMyHelp();
  }
});
</script>
<style lang="less" scoped>
.group {
  margin: 30px 0;
  box-sizing: border-box;
  padding: 0px 50px;
  border-bottom: 2px dashed #aaa;
  .state {
    color: #fff;
    display: flex;
    font-size: 24px;
    justify-content: space-between;
    margin-bottom: 30px;
    .issue {
      display: flex;
      justify-content: space-around;
      .myIssue {
        margin-right: 20px;
        width: 105px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #00bd85;
      }
      .postsState {
        width: 105px;
        text-align: center;
        height: 40px;
        line-height: 40px;
      }
    }
    .updata {
      background: #aaa;
      border: 2px solid #f5f5f5;
      width: 130px;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      height: 40px;
      color: #fff;
      font-weight: 400;
    }
  }
  .solve {
    width: 105px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #fff;
  }
  .item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  span {
    font-size: 31px;
  }
  .btn {
    color: #000;
    display: inline-block;
    width: 404px;
    min-height: 75px;
    word-break: break-all;
    font-weight: 400;
    font-size: 28px;
  }
  .inc {
    font-size: 28px;
    font-weight: bold;
    color: #9d9d9d;
  }
  .blod {
    font-size: 36px;
    font-weight: bold;
  }
  .time {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #9d9d9d;
    margin-bottom: 30px;
  }
}
.popup {
  padding: 20px 30px;
  box-sizing: border-box;
  .button {
    margin: 30px 0;
    display: flex;
    justify-content: space-around;
    button {
      border: none;
      width: 300px;
      border-radius: 40px;
      height: 80px;
    }
  }
}

// ::v-deep .van-field__label {
//   text-align: justify;
// }
</style>
