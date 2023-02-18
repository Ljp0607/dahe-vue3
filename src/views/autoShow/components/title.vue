<template>
  <div class="title">
    <img
      @click="props.changeShow(true)"
      class="active"
      src="https://imgcdn.dahebao.cn/20230215/20230215111729842754.png"
    />
    <router-link to="/showUpload">
      <img
        class="upload"
        src="https://imgcdn.dahebao.cn/20230215/20230215111655200229.png"
    /></router-link>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
const props = defineProps({
  changeShow: Function,
});
</script>
<style lang="less" scoped>
.title {
  width: 100vw;
  min-height: 1700px;
  background-image: url("https://imgcdn.dahebao.cn/20230215/20230215111302854789.png");
  background-repeat: no-repeat;
  background-size: 100%;
  text-align: center;
  padding-top: 910px;
  box-sizing: border-box;
  .active {
    margin-left: 568px;
    // margin-top: 910px;
    width: 99px;
    height: 77px;
    display: block;
  }
  .upload {
    margin-top: 60px;
    width: 507px;
    height: 128px;
  }
}
</style>
<!-- https://imgcdn.dahebao.cn/20221213/20221213155540301541.jpeg -->
