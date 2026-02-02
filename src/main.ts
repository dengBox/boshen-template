import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from '@/locale';
import router from '@/router';
import { createPinia } from 'pinia';
import { useGlobalStore } from '@/store';
import { setUserAgent } from '@/assets/utils/common';

// import axios from '@/assets/utils/request';
import '@nutui/nutui/dist/packages/toast/style/css';
import '@nutui/nutui/dist/packages/notify/style/css';
import '@nutui/nutui/dist/packages/dialog/style/css';
import '@nutui/nutui/dist/packages/imagepreview/style/css';
import './assets/styles/index.scss';

const store = createPinia();
const app = createApp(App);
// 全局注册axios
// app.config.globalProperties.$axios = axios;

// 路由
app.use(router);

// 国际化
await setupI18n(app);

// 状态管理
app.use(store);

// 设置用户信息
setUserAgent(useGlobalStore());

app.mount('#app');
