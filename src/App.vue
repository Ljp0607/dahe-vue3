<template>
  <header class="container">
    <RouterView />
  </header>
</template>
<style lang="less" scoped>
.container {
  width: 100vw;
  min-height: 100vh;
}
.empty {
  display: block;
  width: 100%;
  height: 100px;
}
</style>
