<template>
  <div class="content">
    <van-tabs color="#BE0A15" class="van-tabs" v-model:active="active">
      <van-tab title="我需要药">
        <Info
          v-if="route.params.need == '0' || route.params.need == '1'"
          :active="active"
        />
        <List v-else :need="1001" :mylist="true" />
      </van-tab>
      <van-tab title="我能提供药">
        <Info
          v-if="route.params.need == '0' || route.params.need == '1'"
          :active="active"
        />
        <List v-else :need="1002" :mylist="true" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import List from "./components/list.vue";
import Info from "./components/info.vue";
import { useRoute } from "vue-router";
const active = ref(0);
const route = useRoute();
interface dataType {}
const data = reactive<dataType>({});
onMounted(() => {
  active.value =
    typeof route.params.need == "string" ? Number(route.params.need) : 0;
});
console.log(route.params.need);
</script>
<style lang="less" scoped>
.content {
  background: url("https://imgcdn.dahebao.cn/20221221/20221221225454598080.png");
  background-size: 100%;
  background-position: top;
  background-repeat: no-repeat;
  padding-top: 129px;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #e8eff1;
  .van-tabs {
    width: 675px;
    min-height: 80vh;
    background: #fff;
    margin: 0 auto;
    border-radius: 30px;
    padding: 30px 0 50px 0;
    font-size: 28px;
    font-weight: bold;
  }
}
::v-deep .van-tab__text {
  display: block;
  height: 40px;
  font-size: 30px;
}
</style>
