export const page404 = [
    {
        path: '/*',
        name: 'error-404',
        meta: {
            title: '404-页面不存在'
        },
        component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
    }
]
