import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {
    messages
} from './components/common/i18n';
import filters from "@/utils/filters";
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/custom.scss';
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(filters);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const username = sessionStorage.getItem('username');

    if (!username && to.path !== '/login' && to.path !== '/businessForm' && to.path !== '/resumeForm' && to.path !== '/wxCube') {
        next('/login');
    }
    next();
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');