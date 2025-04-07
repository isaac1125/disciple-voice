// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';

const app = createApp(App);
app.use(router);

// 檢查是否有重定向路徑
router.isReady().then(() => {
    const redirectPath = sessionStorage.getItem('redirect');
    if (redirectPath && redirectPath !== window.location.pathname) {
        router.push(redirectPath);
        sessionStorage.removeItem('redirect'); // 清除，避免重複跳轉
    }
    app.mount('#app');
});