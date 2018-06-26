//import Vue from 'vue';
//import iView from 'iview';
import util from '../libs/util';
//import VueRouter from 'vue-router'
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';
import {page404} from './page404'

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);
if(sessionStorage.getItem('menus')){
    let  menus = util.createMenus(JSON.parse(sessionStorage.getItem('menus')))
    router.addRoutes(menus)
    router.addRoutes(page404)
}
router.beforeEach((to, from, next) => {
    iview.LoadingBar.start();
    util.title(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            util.title();
            next({
                name: 'home_index'
            });
        } else {
            let menus =[]
            if(sessionStorage.getItem('menus')){
                menus = util.createMenus(JSON.parse(sessionStorage.getItem('menus')))
            }
            util.toDefaultPage([otherRouter, ...menus], to.name, router, next);
        }
    }
});

router.afterEach((to) => {
    //util.openNewPage(router.app, to.name, to.params, to.query);
    iview.LoadingBar.finish();
    window.scrollTo(0, 0);
});
