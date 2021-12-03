import {createRouter, createWebHashHistory} from 'vue-router'
import {getToken} from "../util/token";
import {Toast} from 'vant';

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/home/index.vue'),
        meta: {
            title: '首页',
            keepAlive: true
        }
    },
    {
        path: '/qa',
        name: 'qa',
        component: () => import('../pages/qa/index.vue'),
        meta: {
            title: '问答',
        }
    },
    {
        path: '/video',
        name: 'video',
        component: () => import('../pages/video/index.vue'),
        meta: {
            title: '视频'
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../pages/user/index.vue'),
        meta: {
            title: '我的'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/user/login.vue'),
        meta: {
            title: '用户登录'
        },
    },
    {
        path: "/404",
        name: "notFound",
        component: () => import('../pages/404.vue')
    },
    {
        path: '/:catchAll(.*)',
        redirect: "/404"
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, form, next) => {
    const {title, isLogin} = to.meta
    const token = getToken()
    if (title) {
        document.title = title
    }
    if (isLogin && !token) {
        Toast.fail('尚未登陆，请登陆后重试');
        next('login')
        return
    }
    next()
})
export default router