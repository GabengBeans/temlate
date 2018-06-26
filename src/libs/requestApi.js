//import axios from 'axios';
import env from '../../build/env';
//import Vue from 'vue'
import baseConfig from './config';


const config = {}
const vm = new Vue({})
config.baseConfig = baseConfig;

const ajaxUrl = env === 'development' ?
    config.baseConfig.devUrl :
    env === 'production' ?
    config.baseConfig.proUrl :
    config.baseConfig.testUrl;

axios.defaults.baseURL = ajaxUrl; //请求接口地址
axios.defaults.timeout = 10 * 1000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (sessionStorage.getItem('token')) {
        config.headers = {
            'token': sessionStorage.getItem('token')
        }
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    vm.$Message.error(error)
    console.log("请求错误:" + error)
    return
});
axios.interceptors.response.use(function (response) {
    if (response.status == 200) {
        return response
    } 
}, function (error) {
    // 对响应错误做点什么
    // console.log(error)
    // if (error.response.stauts == 401) {
    //     vm.$Message.error("权限验证失败")
    //     return
    // } else if (error.response.status == 400) {
    //     vm.$Message.error("数据请求错误")
    //     return
    // } else if (error.response.status == 500) {
    //     vm.$Message.error("服务器错误")
    //     return
    // } else {
    //     vm.$Message.error("未知错误")
    //     return
    // }
    return Promise.reject(error);
});

config.requestPostUrl = function (url, params) {
    return new Promise((resolve, reject)=>{
        axios({
            method: "post",
            url: url,
            params: params
        }).then(resp => {
            resolve(resp)
        }).catch(err => {
            console.log(err)
            vm.$Message.error("请求错误")
        })
    })

}

config.requestPost = function (url, data, params = {}) {

    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url,
            data: data,
            params: params
        }).then(resp => {
            resolve(resp)
        }).catch(err => {
            console.log(err)
            vm.$Message.error("请求错误")
        })
    })
}

config.requestGet = function (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: url,
            params: params
        }).then(resp => {
            resolve(resp)
        }).catch(err => {
            console.log(err)
            vm.$Message.error("请求错误")
        })
    })
}

export default config