<!-- 达人 -->
<template>
  <div class="content">
    <InfoForm :message="data.message" authType="4" title="达人号入驻信息" />
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
      name: "真实姓名",
      value: "",
      // placeholder: "请输入企业名称",
      fileList: [],
    },
    {
      type: "input",
      name: "身份证号",
      value: "",
      // placeholder: "请输入品牌名称",
      fileList: [],
    },
    {
      type: "input",
      name: "联系手机",
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
