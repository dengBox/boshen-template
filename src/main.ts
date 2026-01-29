import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from '@/locale';
import router from '@/router';
import { createPinia } from 'pinia';
import { useGlobalStore } from '@/store';
import { setUserAgent } from '@/assets/utils/common';

// import axios from '@/assets/utils/request';
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/styles/index.scss';

const store = createPinia();
const app = createApp(App);
// 全局注册axios
// app.config.globalProperties.$axios = axios;

app.use(Vant);
// 路由
app.use(router);

// 国际化
app.use(i18n);

// 状态管理
app.use(store);

// 设置用户信息
setUserAgent(useGlobalStore());

app.mount('#app');
