const url={
    //用户登录
    user_login_url:'/admin/v1/oauth/token',//获取token
    query_menus_url:'/admin/v1/menus/query_menus',//根据权限获取菜单列表

    update_password:'/admin/v1/admin_user/update_password',//修改密码

    user_search_for_page_url:'/admin/user/list_for_page',//获取用户列表信息
    user_detail_url:'/admin/user/detail',//用户详情
    user_audit_url:'/admin/user/audit',// 用户审核


    get_list_for_page_url:'/admin/user_note/list_for_page',//笔记分页查询
    get_note_detail_url:'/admin/user_note/note_detail',//笔记详情
    note_stick_url:'/admin/user_note/note_stick',//笔记置顶
    note_audit_url:'/admin/user_note/note_audit',//笔记审核

    comment_list_url:'/comment/comment_list',//评论列表
    comment_delete_url:'/comment/comment_delete',//评论删除
    comment_reply_list_url:'/comment/comment_reply_list',//回复分页查询
    comment_reply_delete_url:'/comment/comment_reply_delete',//回复评论删除

    search_admin_user_info_for_page:'/admin/v1/admin_user/search_admin_user_info_for_page',//获取管理员角色信息
    disable_admin_user_url:'/admin/v1/admin_user/disable_admin_user',//禁用管理员
    enabling_admin_user_url:'/admin/v1/admin_user/enabling_admin_user',//启用管理员
    admin_user_detail_url:'/admin/v1/admin_user/detail',//获取管理员信息
    find_grant_admin_role_url:'/admin/v1/admin_user/find_grant_admin_role',//获取当前管理员创建的角色信息
    get_roleList_url:'/admin/v1/admin_user/role_list',//获取角色列表  
    edit_admin_user_url:'/admin/v1/admin_user/edit_admin_user',//编辑管理员信息
    grant_admin_role_url:'/admin/v1/admin_user/grant_admin_role',
    add_admin_user:'/admin/v1/admin_user/add_admin_user',//添加管理员

    add_admin_resource_url:'/admin/v1/admin_resource/add_admin_resource',//添加资源
    get_admin_resource_list_url:'/admin/v1/admin_resource/search_admin_resource_list',//获取资源列表
    update_admin_resource_url:'/admin/v1/admin_resource/update_admin_resource',// 更新管理员资源
    enabling_admin_resource_url:'/admin/v1/admin_resource/enabling_admin_resource',//启用资源
    disable_admin_resource_url:'/admin/v1/admin_resource/disable_admin_resource',//禁用资源

    search_admin_role_info_for_page:'/admin/v1/admin_role/search_admin_role_info_for_page',//获取角色列表信息
    disable_admin_role_url:'/admin/v1/admin_role/disable_admin_role',//禁用角色
    enabling_admin_role_url:'/admin/v1/admin_role/enabling_admin_role',//启用角色
    admin_role_detail_url:'/admin/v1/admin_role/detail',//获取角色详情
    find_grant_admin_resource_url:'/admin/v1/admin_role/find_grant_admin_resource',//获取资源
    edit_grant_admin_resource_url:'/admin/v1/admin_role/grant_admin_resource',//编辑角色资源
    add_admin_role_url:'/admin/v1/admin_role/add_admin_role',//添加管理员角色
}

export default url