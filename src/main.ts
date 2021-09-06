import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {key, store} from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from 'element-plus/es/locale/lang/ja';

const app = createApp(App);

app.config.globalProperties.$http =
    (input: RequestInfo, init?: RequestInit | undefined) => fetch(input, init);

app.use(store, key);
app.use(router);
app.use(ElementPlus, {locale});

app.mount('#app');
