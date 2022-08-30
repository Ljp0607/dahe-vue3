import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [VantResolver()],
    }),],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0", //打开显示本地地址
    open: true,// 是否自动启动浏览器
    proxy: { // 本地开发环境通过代理实现跨域
      // 正则表达式写法
      '/api': {
        target: 'https://weibo.com/', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

