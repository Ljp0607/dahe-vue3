import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'default-passive-events'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import { Uploader, ConfigProvider, Toast, Cascader, Dialog } from 'vant';


const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(Cascader);
app.use(createPinia());
app.use(router);
app.use(Uploader);
app.use(Toast);
app.use(Dialog);
app.use(ConfigProvider);
app.mount('#app');


