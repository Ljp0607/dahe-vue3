<!-- 政务 -->
<template>
  <div class="content">
    <InfoForm :message="data.message" authType="3" title="政务号入驻信息" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import InfoForm from "../../components/enterView/InfoForm.vue";
components: {
  InfoForm;
}
const data = reactive({
  message: [
    {
      type: "input",
      name: "组织名称",
      value: "",
      // placeholder: "请输入企业名称",
      fileList: [],
    },
    {
      type: "input",
      name: "开设账号名称",
      value: "",
      // placeholder: "请输入品牌名称",
      fileList: [],
    },
    {
      type: "input",
      name: "组织联系人",
      value: "",
      // placeholder: "请输入品牌名称",
      fileList: [],
    },
    {
      type: "input",
      name: "组织联系方式",
      value: "",
      // placeholder: "请输入品牌名称",
      fileList: [],
    },
  ],
  user: 1,
});

onMounted(() => {});
</script>
<style lang="less" scoped>
.content {
  display: flex;
  justify-content: center;
}
</style>
