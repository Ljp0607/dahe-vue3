<template>
  <div class="carShow"></div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
interface dataType {}
const data = reactive<dataType>({});
</script>
<style lang="less" scoped>
.carShow {
  width: 750px;
  height: 100vh;
  background-image: url("https://imgcdn.dahebao.cn/20230318/20230318161319841792.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
