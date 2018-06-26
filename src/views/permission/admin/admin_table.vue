<template>
  <div id='user_table'>
      <br>
    <Button type="success"  @click="showAddAdmin=true">添加管理员</Button>
    <div id='public_table'>
         <Table  border stripe :columns="columns" :data="$store.state.mutations.search_admin_list_result">
    </Table>
    </div>
    <Modal v-model="showAddAdmin" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>添加管理员</span>
      </p>
      <div style="text-align:center">
        <admin-add :data="userDataAdd" :roleList="roleList"></admin-add>
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="showAddAdmin = false">取消</Button>
        <Button type="success" size="large" @click="addAdminUser()">确定</Button>
      </div>
    </Modal>
    <Modal v-model="showUserDetail" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>用户详情</span>
      </p>
      <div style="text-align:center">
        <admin-detail :data="userDataDetail"></admin-detail>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="showUserDetail = false">确定</Button>
      </div>
    </Modal>
    <Modal v-model="showUserEdit" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>用户分配角色</span>
      </p>
      <div>
        <admin-edit :data="userDateEdit" :roleList="roleList"></admin-edit>
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="showUserEdit = false">取消</Button>
        <Button type="success" size="large" @click="editUserRole()">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from "@/libs/util";
import adminAdd from "./admin_add";
import adminDetail from "./admin_detail";
import adminEdit from "./admin_edit";
import ajax from "@/libs/requestApi";
import url from "@/libs/url";
//import axios from 'axios'
export default {
  components: {
    adminAdd,
    adminDetail,
    adminEdit
  },
  name: "user_table",
  data() {
    return {
      roleList: [],
      userDataAdd: {
        nickname: "",
        realname: "",
        username: "",
        password: "123456",
        phone: "",
        mail: "",
        status: 1
      },
      userDateEdit: {},
      userDataDetail: {},
      showUserDetail: false,
      showUserEdit: false,
      showAddAdmin: false,
      columns: [
        {
          title: "用户ID",
          key: "id"
        },
        {
          title: "昵称",
          key: "nickname",
          ellipsis: "false"
        },
        {
          title: "账号",
          key: "username",
          ellipsis: "false"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "用户角色",
          key: "roleName"
        },
        {
          title: "操作",
          key: "phone",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: params.row.status == "无效" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      ajax
                        .requestPostUrl(url.disable_admin_user_url, {
                          adminUserId: params.row.id
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.$Message.success(
                              "昵称：“" + params.row.nickname + "” 禁用成功"
                            );
                            params.row.status = "无效";
                          } else {
                            this.$Message.error(resp.data.msg);
                          }
                        });
                    }
                  }
                },
                "禁用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled: params.row.status == "有效" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      ajax
                        .requestPostUrl(url.enabling_admin_user_url, {
                          adminUserId: params.row.id
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.$Message.success(
                              "昵称：“" + params.row.nickname + "” 启用成功"
                            );
                            params.row.status = "有效";
                          } else {
                            this.$Message.error(resp.data.msg);
                          }
                        });
                    }
                  }
                },
                "启用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      function getAdminUserDetail() {
                        return ajax.requestGet(url.admin_user_detail_url, {
                          adminUserId: params.row.id
                        });
                      }
                      function getFindGrantAdminRole() {
                        return ajax.requestGet(url.find_grant_admin_role_url, {
                          adminUserId: params.row.id
                        });
                      }
                      function getRoleList() {
                        return ajax.requestGet(url.get_roleList_url);
                      }
                      axios
                        .all([
                          getAdminUserDetail(),
                          getFindGrantAdminRole(),
                          getRoleList()
                        ])
                        .then(
                          axios.spread((res1, res2, res3) => {
                            if (
                              res1.data.success &&
                              res2.data.success &&
                              res3.data.success
                            ) {
                              this.showUserEdit = true;
                              let detail = res1.data.data;
                              let role = res2.data.data[0];
                              let roleList = res3.data.data;
                              this.roleList = [];
                              for (let x = 0; x < roleList.length; x++) {
                                let obj = {
                                  label: "",
                                  id: ""
                                };
                                obj.label = roleList[x].roleName;
                                obj.id = roleList[x].id;
                                this.roleList.push(obj);
                              }
                              for (let x in detail) {
                                if (x == "createTime") {
                                  this.$set(
                                    this.userDateEdit,
                                    x,
                                    util.formatDate(
                                      new Date(detail.createTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "updateTime") {
                                  this.$set(
                                    this.userDateEdit,
                                    x,
                                    util.formatDate(
                                      new Date(detail.updateTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "status") {
                                  let statusArr = ["无效", "有效"];
                                  this.$set(
                                    this.userDateEdit,
                                    x,
                                    statusArr[detail[x]]
                                  );
                                } else {
                                  this.$set(this.userDateEdit, x, detail[x]);
                                }
                              }
                              if (role && role.id) {
                                this.$set(this.userDateEdit, "roleId", role.id);
                              } else {
                                this.$set(this.userDateEdit, "roleId", "");
                              }
                            }
                          })
                        );
                    }
                  }
                },
                "分配角色"
              ),
              // ]
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      function getAdminUserDetail() {
                        return ajax.requestGet(url.admin_user_detail_url, {
                          adminUserId: params.row.id
                        });
                      }
                      function getFindGrantAdminRole() {
                        return ajax.requestGet(url.find_grant_admin_role_url, {
                          adminUserId: params.row.id
                        });
                      }
                      axios
                        .all([getAdminUserDetail(), getFindGrantAdminRole()])
                        .then(
                          axios.spread((res1, res2) => {
                            if (res1.data.success && res2.data.success) {
                              this.showUserDetail = true;
                              let detail = res1.data.data;
                              let role = res2.data.data[0];
                              //console.log(res1);
                              for (let x in detail) {
                                if (x == "createTime") {
                                  this.$set(
                                    this.userDataDetail,
                                    x,
                                    util.formatDate(
                                      new Date(detail.createTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "updateTime") {
                                  this.$set(
                                    this.userDataDetail,
                                    x,
                                    util.formatDate(
                                      new Date(detail.updateTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "status") {
                                  let statusArr = ["无效", "有效"];
                                  this.$set(
                                    this.userDataDetail,
                                    x,
                                    statusArr[detail[x]]
                                  );
                                } else {
                                  this.$set(this.userDataDetail, x, detail[x]);
                                }
                              }
                              if (role && role.roleName) {
                                this.$set(
                                  this.userDataDetail,
                                  "roleName",
                                  role.roleName
                                );
                              } else {
                                this.$set(
                                  this.userDataDetail,
                                  "roleName",
                                  "未分配角色"
                                );
                              }
                            }
                          })
                        );
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    editUserRole() {
      if (
        !(
          this.userDateEdit.nickname &&
          this.userDateEdit.roleId &&
          this.userDateEdit.username
        )
      ) {
        this.$Message.error("请补全信息");
        return;
      }
      let This = this;
      function editAdminUser() {
        let data = {
          id: This.userDateEdit.id,
          nickname: This.userDateEdit.nickname,
          username: This.userDateEdit.username
        };
        return ajax.requestPost(url.edit_admin_user_url, data);
      }
      function grantAdminRole() {
        return ajax.requestPostUrl(url.grant_admin_role_url, {
          adminUserId: This.userDateEdit.id,
          roleId: This.userDateEdit.roleId
        });
      }
      axios.all([editAdminUser(), grantAdminRole()]).then(
        axios.spread((res1, res2) => {
          if (res1.data.success && res2.data.success) {
            This.showUserEdit = false;
            this.$store.dispatch("GET_ADMIN_LIST_INFO", {
              searchInfo: this.$store.state.mutations.search_admin_list_info,
              publicPage: this.$store.state.mutations
                .search_admin_list_public_page
            });
            This.$Message.success("保存成功");
          }
        })
      );
    },
    addAdminUser() {
      for (let x in this.userDataAdd) {
        if (this.userDataAdd[x] == "") {
          this.$Message.error("请补全信息");
          return;
        }
      }
      ajax.requestPost(url.add_admin_user, this.userDataAdd).then(resp => {
        if (resp.data.success) {
          this.showAddAdmin = false;
          this.$store.dispatch("GET_ADMIN_LIST_INFO", {
            searchInfo: this.$store.state.mutations.search_admin_list_info,
            publicPage: this.$store.state.mutations
              .search_admin_list_public_page
          });
          this.$Message.success("添加成功");
        } else {
          this.$Message.success(resp.data.msg);
        }
      });
    }
  }
};
</script>
