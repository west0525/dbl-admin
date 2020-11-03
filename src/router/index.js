import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '首页'
            },
            children: [{
                    path: '/home',
                    component: () => import( /* webpackChunkName: "dashboard" */ '../components/page/home.vue'),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/business',
                    component: () => import( /* webpackChunkName: "table" */ '../components/page/business.vue'),
                    meta: {
                        title: '商务合作'
                    }
                },
                {
                    path: '/user',
                    component: () => import( /* webpackChunkName: "table" */ '../components/page/user.vue'),
                    meta: {
                        title: '用户管理'
                    }
                },
                {
                    path: '/resume',
                    component: () => import( /* webpackChunkName: "table" */ '../components/page/resume.vue'),
                    meta: {
                        title: '简历列表'
                    }
                },

            ]
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/resumeForm',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/resumeForm.vue'),
            meta: {
                title: '求职登记表'
            }
        },
        {
            path: '/businessForm',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/businessForm.vue'),
            meta: {
                title: '招聘登记表'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});