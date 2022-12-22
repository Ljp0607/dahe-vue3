<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
        <!--           label-align="top" -->
        <van-field
          v-for="(item, index) in active == 0 ? data.need : data.help"
          :key="index"
          v-model="item.value"
          :name="item.name"
          :label="item.label"
          :placeholder="item.placeholder"
          :rules="[
            item.rule
              ? { pattern, message: '请输入正确手机号' }
              : { required: true, message: `请填写${item.label}` },
          ]"
          :type="item.maxlength ? 'textarea' : 'text'"
          required
          :maxlength="item.maxlength"
          show-word-limit
          autosize
        />
      </van-cell-group>
      <div class="fals">寻求帮助或提供帮助时请甄别信息真伪，防止被骗</div>
      <div style="margin: 16px">
        <van-button block color="#BE0A15" native-type="submit">
          提交
        </van-button>
      </div>
      <div class="port">
        提交即视为您愿意将个人信息公开展示 若有他人联系您寻求帮助或提供帮助
        务必核实对方信息！
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { showToast } from "vant";
import "vant/es/toast/style";
import { useCounterStore } from "@/stores/counter";
import { saveHelp } from "@/api/medicHelp/index";
const store = useCounterStore();

const aa = ["field1", "field2"];
//页面数据
interface dataType {
  need: Array<{
    name: string;
    label: string; //药物名称
    value: string;
    placeholder: string;
    rule?: boolean;
    maxlength?: number;
  }>;
  help: Array<{
    name: string;
    label: string; //药物名称
    value: string;
    placeholder: string;
    rule?: boolean;
    maxlength?: number;
  }>;
}
const data = reactive<dataType>({
  need: [
    {
      name: "field1",
      label: "所需药物", //药物名称
      value: "", //双向绑定
      placeholder: "填写所需要的药物",
    },
    {
      name: "location_address",
      label: "所在位置", //药物名称
      value: "", //双向绑定
      placeholder: "填写你所在的位置",
      maxlength: 50,
    },
    {
      name: "posts_content",
      label: "求助说明", //药物名称
      value: "", //双向绑定
      placeholder: "请简要描述你的问题,可以让更多人主动提供帮助",
      maxlength: 200,
    },
    {
      name: "field2",
      label: "联系电话", //药物名称
      value: "", //双向绑定
      placeholder: "请输入手机号码,会公开至广场",
      rule: true,
    },
  ],
  help: [
    {
      name: "field1",
      label: "可以提供的药物", //药物名称
      value: "", //双向绑定
      placeholder: "填写可以提供的药物",
    },
    {
      name: "location_address",
      label: "帮助者所在位置", //药物名称
      value: "", //双向绑定
      placeholder: "填写你所在的位置",
      maxlength: 50,
    },
    {
      name: "posts_content",
      label: "可提供的帮助说明", //药物名称
      value: "", //双向绑定
      placeholder: "请简要描述你能提供的帮助,可以让更多需要帮助的人主动联系你",
      maxlength: 200,
    },
    {
      name: "field2",
      label: "联系电话", //药物名称
      value: "", //双向绑定
      placeholder: "请输入手机号码,会公开至广场",
      rule: true,
    },
  ],
});
// console.log(store.$state);
//父组件数据
interface Props {
  active: number;
}
const props = defineProps<Props>();
const pattern =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
const onSubmit = (values: any) => {
  console.log(values);
  let topic: string;
  if (props.active == 0) {
    topic = "【我缺药】";
  } else {
    topic = "【我有药】";
  }
  const content =
    "#邻里互助共战疫情#  " +
    "" +
    topic +
    values.posts_content +
    ",手机号:" +
    values.field2 +
    ",地址:" +
    values.location_address;
  // const posts_content =
  //   values.posts_content + values.field2 + values.location_address;
  // console.log(content);
  // console.log(content);
  SaveHelp(
    values.field1,
    values.location_address,
    content,
    values.field2,
    values.posts_content,
    values.location_address
  );
};
//提交帮助
const SaveHelp = (
  field1: string,
  location_address: string,
  posts_content: string,
  field2: string,
  field3: string,
  field4: string
) => {
  saveHelp({
    field1: field1, //可以提供的药物
    location_address: location_address, //打卡位置
    posts_content: posts_content, //详细介绍
    field2: field2, //联系电话
    field3: field3, //content
    field4: field4,
    posts_title: "邻里互助 共战疫情", //标题 必传
    user_id: store.$state.userId, //用户
    source: "0",
    activityNo: "activity002", //评选活动编码 必传
    creatorType: props.active + 1001, //
    creator_type: props.active + 1001, //
  }).then((res: any) => {
    if (res.state == 1) {
      showToast(res.data);
      data.help.map((item) => {
        item.value = "";
      });
      data.need.map((item) => {
        item.value = "";
      });
    } else {
      showToast(res.message);
    }
  });
};
</script>
<style lang="less" scoped>
::v-deep .van-cell__value {
  border: 1px dashed #aaa;
  box-sizing: border-box;
  padding: 20px 10px;
  width: 100%;
}
::v-deep .van-cell {
  display: block;
}
::v-deep .van-cell__title {
  width: 100%;
  display: block;
  margin-bottom: 10px;
}
// ::v-deep .van-cell__value {
// }
.fals {
  margin: 20px auto 30px;
  width: 532px;
  height: 24px;
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #be0a15;
}
.port {
  margin: 0 auto;
  width: 411px;
  height: 90px;
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #515151;
  line-height: 33px;
  text-align: center;
}
</style>
