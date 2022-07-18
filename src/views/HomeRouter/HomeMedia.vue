<!-- 媒体 -->
<template>
  <div class="content">
    <InfoForm :message="data.message" authType="1" title="媒体号入驻信息" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import InfoForm from "../../components/InfoForm.vue";
components: {
  InfoForm;
}
const data = reactive({
  message: [
    {
      type: "input",
      name: "媒体名称",
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
      name: "联系人",
      value: "",
      // placeholder: "请输入品牌名称",
      fileList: [],
    },
    {
      type: "input",
      name: "联系方式",
      value: "",
      // placeholder: "请输入品牌名称",
      fileList: [],
    },
    {
      type: "upload",
      name: "相关资质文件",
      value: "",
      placeholder: "",
      fileList: [],
    },
  ],
});

onMounted(() => {});
</script>
<style lang="less" scoped>
.content {
  display: flex;
  justify-content: center;
}
</style>
