import ajax from '@/libs/requestApi'
import url from '@/libs/url'
//import Vue from 'vue'
import util from '@/libs/util'
const vm = new Vue({})
const actions = {
    state: {},
    actions: {
        //获取用户列表
        GET_USER_LIST_INFO: ({
            commit
        }, data) => {
            let params = {
                pageNo: data.publicPage,
                pageSize: 10
            }
            let body = Object.assign(params,data.searchInfo)
            ajax.requestPost(url.user_search_for_page_url, body)
                .then(resp => {
                    if (resp.data.success) {
                        let arr = resp.data.data.items
                        let statusArr = ['未认证', '已认证', '审核未通过']
                        arr.map(item => {
                            item.createTime = util.formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss')
                            item.auditStatus = statusArr[item.auditStatus]
                        })
                        commit('INIT_USER_LIST', {
                            searchInfo: data.searchInfo,
                            publicPage: data.publicPage,
                            result: arr,
                            currentPage: resp.data.data.page,
                            totalPage: resp.data.data.totalCount
                        })
                    } else {
                        vm.$Message.error("数据获取失败")
                    }
                })
        },
        //获取管理员列表
        GET_ADMIN_LIST_INFO: ({
            commit
        }, data) => {
            let params = {
                pageNo: data.publicPage,
                pageSize: 10
            }
            ajax.requestPost(url.search_admin_user_info_for_page, data.searchInfo, params)
                .then(resp => {

                    if (resp.data.success) {
                        let arr = resp.data.data.items
                        arr.map(item => {
                            if (item.status == 1) {
                                item.status = "有效"
                            } else {
                                item.status = "无效"
                            }
                        })
                        commit('INIT_ADMIN_LIST', {
                            searchInfo: data.searchInfo,
                            publicPage: data.publicPage,
                            result: arr,
                            currentPage: resp.data.data.page,
                            totalPage: resp.data.data.totalCount
                        })
                    } else {
                        vm.$Message.error("数据获取失败")
                    }

                })
        },
        //获取角色列表
        GET_ROLE_LIST_INFO: ({
            commit
        }, data) => {
            let params = {
                pageNo: data.publicPage,
                pageSize: 10
            }
            ajax.requestPost(url.search_admin_role_info_for_page, data.searchInfo, params)
                .then(resp => {
                    if (resp.data.success) {
                        let arr = resp.data.data.items
                        arr.map(item => {
                            if (item.status == 1) {
                                item.status = "有效"
                            } else {
                                item.status = "无效"
                            }
                        })
                        commit('INIT_ROLE_LIST', {
                            searchInfo: data.searchInfo,
                            publicPage: data.publicPage,
                            result: arr,
                            currentPage: resp.data.data.page,
                            totalPage: resp.data.data.totalCount
                        })
                    } else {
                        vm.$Message.error("数据获取失败")
                    }
                })
        },

        //获取资源列表
        GET_ADMIN_RESOURCE_LIST_INFO: ({
            commit
        }, searchInfo, publicPage = 1) => {
            ajax.requestGet(url.get_admin_resource_list_url)
                .then(resp => {
                    if (resp.data.success) {
                        let obj = resp.data.data.allLabels
                        util.recursion(obj, "childAdminResources", false)
                        commit('INIT_RESOURCE_LIST', {
                            result: obj
                        })
                    } else {
                        vm.$Message.error("数据获取失败")
                    }
                })
        },

        //获取笔记分页信息
        GET_NOTE_LIST_INFO: ({ commit }, data) => {
            let params = {
                pageNo: data.publicPage,
                pageSize: 10
            }
            let body = Object.assign(params,data.searchInfo)
            ajax.requestPost(url.get_list_for_page_url, body).then(resp => {
                if (resp.data.success) {
                    let statusArr = ['待审核', '审核通过', '审核不通过']
                    let stickArr = ['未置顶', '已置顶']
                    let arr = resp.data.data.items
                    arr.map(item => {
                        item.createTime = util.formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss')
                        item.auditStatus = statusArr[item.auditStatus]
                        item.noteStick = stickArr[item.noteStick]
                        item.categoryName = item.categoryName?item.categoryName:""
                    })
                    commit('INIT_NOTE_LIST', {
                        searchInfo: data.searchInfo,
                        publicPage: data.publicPage,
                        result: arr,
                        currentPage: resp.data.data.page,
                        totalPage: resp.data.data.totalCount
                    })
                } else {
                    vm.$Message.error("数据获取失败")
                }
            })
        },

        //评论分页信息
        GET_COMMENT_LIST_INFO: ({ commit }, data) => {
            let params = {
                pageNo: data.publicPage,
                pageSize: 10
            }
            ajax.requestPostUrl(url.comment_list_url, params).then(resp => {
                if (resp.data.success) {
                    let arr = resp.data.data.items
                    let statusArr = ["删除", "正常"]
                    arr.map(item => {
                        item.status = statusArr[item.status]
                        item.createTime = item.createTime?util.formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss'):""
                    })
                    commit('INIT_COMMENT_LIST', {
                        searchInfo: data.searchInfo,
                        publicPage: data.publicPage,
                        result: arr,
                        currentPage: resp.data.data.page,
                        totalPage: resp.data.data.totalCount
                    })
                } else {
                    vm.$Message.error("数据获取失败")
                }
            })
        },

        //回复评论分页信息
        GET_REPLY_COMMENT_LIST_INFO: ({ commit }, data) => {
            let params = {
                commentId: data.searchInfo,
                pageNo: data.publicPage,
                pageSize: 10
            }
            ajax.requestPostUrl(url.comment_reply_list_url, params).then(resp => {
                if (resp.data.success) {
                    let arr = resp.data.data.items
                    let statusArr = ["删除", "正常"]
                    arr.map(item => {
                        item.createTime = util.formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss')
                        item.status = statusArr[item.status]
                    })
                    commit('INIT_REPLY_COMMENT_LIST', {
                        searchInfo: data.searchInfo,
                        result: arr,
                        currentPage: resp.data.data.page,
                        totalPage: resp.data.data.totalCount,
                        publicPage: data.publicPage
                    })
                } else {
                    vm.$Message.error("数据获取失败")
                }
            })
        },
    }
}

export default actions