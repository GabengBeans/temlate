const mutations={
    state: {
        //用户列表公共信息
        search_user_list_info:{},
        search_user_list_result:[],
        search_user_list_page_info:{
            currentPage:'',
            totalPage:''
        },
        search_user_list_public_page:1,

        //管理员列表公共信息
        search_admin_list_info:{},
        search_admin_list_result:[],
        search_admin_list_page_info:{
            currentPage:'',
            totalPage:''
        },
        search_admin_list_public_page:1,

        //角色列表公共信息
        search_role_list_info:{},
        search_role_list_result:[],
        search_role_list_page_info:{
            currentPage:'',
            totalPage:''
        },
        search_role_list_public_page:1,

        //资源列表
        search_resource_list_result:[],

        //笔记列表公共信息
        search_note_list_info:{},
        search_note_list_result:[],
        search_note_list_page_info:{
            currentPage:'',
            totalPage:''
        },
        search_note_list_public_page:1,

        //评论列表公共信息
        search_comment_list_info:{},
        search_comment_list_result:[],
        search_comment_list_page_info:{
            currentPage:'',
            totalPage:''
        },
        search_comment_list_public_page:1,

        //回复评论
        search_reply_comment_list_info:{},
        search_reply_comment_list_result:[],
        search_reply_comment_list_page_info:{
            currentPage:'',
            totalPage:''
        },
        search_reply_comment_list_public_page:1
    },
    mutations:{
        //初始化用户列表
        INIT_USER_LIST:(state,{searchInfo,publicPage,result,currentPage,totalPage})=>{
            state.search_user_list_info = searchInfo
            state.search_user_list_public_page = publicPage
            state.search_user_list_result = result
            state.search_user_list_page_info.currentPage = currentPage
            state.search_user_list_page_info.totalPage = totalPage
        },

        //初始化管理员列表
        INIT_ADMIN_LIST:(state,{searchInfo,publicPage,result,currentPage,totalPage})=>{
            state.search_admin_list_info = searchInfo
            state.search_admin_list_public_page = publicPage
            state.search_admin_list_result = result
            state.search_admin_list_page_info.currentPage = currentPage
            state.search_admin_list_page_info.totalPage = totalPage
        },

        //初始化角色列表
        INIT_ROLE_LIST:(state,{searchInfo,publicPage,result,currentPage,totalPage})=>{
            state.search_role_list_info = searchInfo
            state.search_role_list_public_page = publicPage
            state.search_role_list_result = result
            state.search_role_list_page_info.currentPage = currentPage
            state.search_role_list_page_info.totalPage = totalPage
        },

        //初始化资源列表
        INIT_RESOURCE_LIST:(state,{result})=>{
            state.search_resource_list_result = result
        },

        //初始化笔记列表
        INIT_NOTE_LIST:(state,{searchInfo,publicPage,result,currentPage,totalPage})=>{
            state.search_note_list_info = searchInfo
            state.search_note_list_public_page=publicPage
            state.search_note_list_result = result
            state.search_note_list_page_info.currentPage = currentPage
            state.search_note_list_page_info.totalPage = totalPage
        },

        //初始化评论列表
        INIT_COMMENT_LIST:(state,{searchInfo,publicPage,result,currentPage,totalPage})=>{
            state.search_comment_list_public_page=publicPage
            state.search_comment_list_result = result
            state.search_comment_list_page_info.currentPage = currentPage
            state.search_comment_list_page_info.totalPage = totalPage
            state.search_comment_list_info = searchInfo
        },

        //初始化回复评论列表
        INIT_REPLY_COMMENT_LIST:(state,{searchInfo,publicPge,result,currentPage,totalPage})=>{
            state.search_reply_comment_list_info = searchInfo
            state.search_reply_comment_list_result = result
            state.search_reply_comment_list_page_info.currentPage = currentPage
            state.search_reply_comment_list_page_info.totalPage = totalPage
            state.search_reply_comment_list_public_page = publicPge
        },
    }
}

export default mutations
