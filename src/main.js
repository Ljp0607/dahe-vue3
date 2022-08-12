import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'default-passive-events'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import { Uploader, Icon, ConfigProvider, Toast, Cascader, Dialog, Overlay, Swipe, SwipeItem, List, Cell, CellGroup } from 'vant';


const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(Cascader);
app.use(createPinia());
app.use(router);
app.use(Uploader);
app.use(Toast);
app.use(Dialog);
app.use(ConfigProvider);
app.use(Overlay);
app.use(Swipe);
app.use(Icon);
app.use(List);
app.use(SwipeItem);
app.use(Cell);
app.use(CellGroup);
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})


app.mount('#app');
