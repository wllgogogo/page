import Vue from 'vue'
import Router from 'vue-router'
import iView from 'view-design'

Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            props: route => ({
                redirect: route.query.redirect
            }),
            meta: {
                name: '首页',
                authCode: null
            },
            component: () => import('@/pages/main/Index.vue'),
            children: [
                {
                    path: '/mytest',
                    name: 'mytest',
                    component: () => import('@/pages/inquiry-period/viewReceipt/test.vue')
                }
                // {
                //     path: '/inquiry-period/view-receipt-detail',
                //     name: 'view_receipt_detail',
                //     component: () => import('@/pages/mytest/index.vue')
                // }
            ]
        },
        {
            path: '/place-info-input',
            name: 'place-info-input',
            meta: {
                name: '场所回执录入'
            },
            component: () => import('@/pages/inquiry-period/enter/placeInfo.vue')
        },
        {
            path: '/customs-info-input',
            name: 'customs-info-input',
            meta: {
                name: '关务回执录入'
            },
            component: () => import('@/pages/inquiry-period/enter/customsInfo.vue')
        },
        {
            path: '/login',
            name: 'login',
            props: route => ({
                redirect: route.query.redirect
            }),
            meta: {
                name: '登录',
                authCode: null
            },
            component: () => import('@/pages/login/Index.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 开始进度条
    iView.LoadingBar.start()
    // token: 判断登录有没有过期
    next()
})

router.afterEach(() => {
    // 结束进度条
    iView.LoadingBar.finish()
    // 回到页面顶部
    window.scrollTo(0, 0)
})

export default router
