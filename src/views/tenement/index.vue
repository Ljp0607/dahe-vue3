<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
const data = reactive({
  value: [],
});
const value = ref("");
const pattern = /\d{6}/;
const onFailed = (errorInfo: any) => {
  console.log("failed", errorInfo);
};
</script>
<template>
  <div class="content">
    <header>
      <img src="https://imgcdn.dahebao.cn/20221115/20221115154704676094.png" />
    </header>
    <main>
      <div class="title"></div>
      <van-form @failed="onFailed">
        <van-cell-group inset>
          <van-field
            v-model="value"
            label="用户名"
            name="pattern"
            placeholder="正则校验"
            :rules="[{ pattern, message: '请输入正确内容' }]"
          />
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="value"
            label="用户名"
            name="pattern"
            placeholder="正则校验"
            :rules="[{ pattern, message: '请输入正确内容' }]"
          />
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="value"
            label="用户名"
            name="pattern"
            placeholder="正则校验"
            :rules="[{ pattern, message: '请输入正确内容' }]"
          />
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="value"
            label="用户名"
            name="pattern"
            placeholder="正则校验"
            :rules="[{ pattern, message: '请输入正确内容' }]"
          />
        </van-cell-group>
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="data.value" />
          </template>
        </van-field>
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="data.value" />
          </template>
        </van-field>
        <van-cell-group inset>
          <van-field
            v-model="value"
            label="用户名"
            name="pattern"
            placeholder="正则校验"
            :rules="[{ pattern, message: '请输入正确内容' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </main>
  </div>
</template>
<style lang="less" scoped>
.content {
  header {
    width: 750px;
    min-height: 665px;
    background: url("https://imgcdn.dahebao.cn/20221115/20221115154544602369.png");
    background-repeat: no-repeat;
    background-size: 100%;
    img {
      margin: 89px 0 0 62px;
      width: 231px;
      height: 40px;
    }
    // https://imgcdn.dahebao.cn/20221115/20221115154115664895.png
    // https://imgcdn.dahebao.cn/20221115/20221115161716948436.png
  }
  main {
    width: 750px;
    min-height: 1200px;

    background: linear-gradient(#fdedd1, #fcccb2);
    text-align: center;
    .title {
      margin: 0 auto;
      width: 663px;
      height: 165px;
      background: url("https://imgcdn.dahebao.cn/20221115/20221115161716948436.png");
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .van-form {
      margin: -56px auto 20px;
      width: 601px;
      z-index: 100;
      min-height: 1000px;
      background: #fff;
    }
  }
}
</style>
