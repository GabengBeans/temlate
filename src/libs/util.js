
import semver from 'semver';
import packjson from '../../package.json';
//import axios from 'axios';
import env from '../../build/env';
import baseConfig from  './config';
import Main from '@/views/Main.vue';

const user_index = resolve => require(["@/views/user/index"], resolve)
const note_index = resolve => require(["@/views/note/note/index"], resolve)
const comments_index = resolve => require(["@/views/note/comments/index"], resolve)
const role_index = resolve => require(["@/views/permission/role/index"], resolve)
const admin_index = resolve => require(["@/views/permission/admin/index"], resolve)
const resource_index = resolve => require(["@/views/permission/resource/index"], resolve)

let util = {

};

util.getConfig      = baseConfig;

const ajaxUrl = env === 'development'
    ? util.getConfig.devUrl
    : env === 'production'
        ? util.getConfig.proUrl
        : util.getConfig.testUrl

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: util.getConfig.ajaxOutTime
});


util.title = function (title) {
    title = title || '大医实验室';
    window.document.title = title;
};



util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};
util.formatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };

    // 遍历这个对象
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            // console.log(`${k}`)
            //console.log(RegExp.$1)
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

util.recursion = function (obj, subName, detail) {
    if (!obj.length) {
        return false
    } else {
        for (let x = 0; x < obj.length; x++) {
            //Vue.set(obj[x],'expand',true)、
            if (subName == "childAdminResources" && detail) {
                obj[x].disabled = true
            }
            if (detail) {
                obj[x].expand = true
            }
            obj[x].children = obj[x][subName]
            util.recursion(obj[x].children, subName, detail)
        }
    }
}

util.unique = function unique(array) {
    var n = []; //一个新的临时数组 
    //遍历当前数组 
    for (var i = 0; i < array.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过， 
        //否则把当前项push到临时数组里面 
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}
util.createMenus = function (data) {
    if (data == undefined) {
        return new Array;
    }
    let path = {
        'user_index':user_index,
        'note_index':note_index,
        'comments_index':comments_index,
        'role_index':role_index,
        'admin_index':admin_index,
        'resource_index':resource_index
    }

    let menus = []
    for (let i = 0; i < data.length; i++) {
        menus.push({})
    }

    for (let i = 0; i < data.length; i++) {

        menus[i].path = "/" + data[i].modelName
        menus[i].icon = data[i].newIcon ? data[i].newIcon : data[i].icon
        menus[i].name = data[i].modelName
        menus[i].title = data[i].name
        menus[i].access = 1
        menus[i].component = Main
        menus[i].children = []
        for (let j = 0; j < data[i].childResources.length; j++) {
            menus[i].children.push({})
        }
        for (let j = 0; j < data[i].childResources.length; j++) {
            let tempPath = path[data[i].childResources[j].modelName]
            //console.log( typeof tempPath)
            menus[i].children[j].path = data[i].childResources[j].modelName
            menus[i].children[j].name = data[i].childResources[j].modelName
            menus[i].children[j].title = data[i].childResources[j].name
            menus[i].children[j].component = tempPath
        }

    }
    return menus
}
export default util;
