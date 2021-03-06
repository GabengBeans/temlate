import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

// export const page404 = {
//     path: '/*',
//     name: 'error-404',
//     meta: {
//         title: '404-页面不存在'
//     },
//     component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
// };

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
// export const appRouter = [
//     {
//         path: '/user',
//         icon: 'person',
//         name: 'user',
//         title: '用户管理',
//         component: Main,
//         children: [
//             { path: 'user_index', title: '用户列表', name: 'user_index', component: resolve => { require(['@/views/user/user_index'], resolve); } }
//         ]
//     },
//     {
//         path: '/note',
//         icon: 'ios-paper',
//         name: 'note',
//         title: '笔记管理',
//         component: Main,
//         children: [
//             { path: 'note_index', title: '笔记审核', name: 'note_index', component: resolve => { require(['@/views/note/note/note_index'], resolve); } },
//             { path: 'comments_index', title: '评论管理', name: 'comments_index', component: resolve => { require(['@/views/note/comments/comments_index'], resolve); } }
//         ]
//     },
//     {
//         path: '/permission',
//         icon: 'locked',
//         name: 'permission',
//         title: '权限管理',
//         component: Main,
//         children: [
//             { path: 'admin_index', title: '管理员列表', name: 'admin_index', component: resolve => { require(['@/views/permission/admin/admin_index'], resolve); } },
//             { path: 'role_index', title: '角色列表', name: 'role_index', component: resolve => { require(['@/views/permission/role/role_index'], resolve); } },
//             { path: 'resource_index', title: '资源列表', name: 'resource_index', component: resolve => { require(['@/views/permission/resource/resource_index'], resolve); } },
//         ]
//     }
// ];
export const appRouter = []
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    //page404
];
