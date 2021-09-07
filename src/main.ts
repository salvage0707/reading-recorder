import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {store, storeKey as storeKey} from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from 'element-plus/es/locale/lang/ja';
import {http, httpKey} from '@/injectkeys/httpkey';

const app = createApp(App);

app.config.globalProperties.$http =
    (input: RequestInfo, init?: RequestInit | undefined) => fetch(input, init);

app.use(store, storeKey);
app.use(router);
app.use(ElementPlus, {locale});

app.provide(httpKey, http);

app.mount('#app');
