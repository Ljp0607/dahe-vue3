<template>
  <div v-for="(item, index) in data.item" :key="index">123</div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { selecMytHelp } from "@/api/medicHelp/index";
interface dataType {
  item: Array<object>;
}
const data = reactive<dataType>({
  item: [{}],
});
selecMytHelp("1001").then((res: any) => {
  data.item = res.data;
  console.log("res", res);
});
</script>
<style lang="less" scoped></style>
