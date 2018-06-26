<template>
  <div id='user_table'>
    <br>
    <Button type='success' @click='showAddAdmin=true'>添加角色</Button>
    <div id='public_table'>
      <Table border stripe :columns='columns' :data='$store.state.mutations.search_role_list_result'>
      </Table>
    </div>
    <Modal v-model='showAddAdmin' width='360'>
      <p slot='header' style='color:#f60;text-align:center'>
        <span>添加角色</span>
      </p>
      <div style='text-align:center'>
        <role-add :data='roleDataAdd'></role-add>
      </div>
      <div slot='footer'>
        <Button type='error' size='large' @click='showAddAdmin = false'>取消</Button>
        <Button type='success' size='large' @click='addAdminRole()'>确定</Button>
      </div>
    </Modal>

    <Modal v-model='showRoleDetail' width='500'>
      <p slot='header' style='color:#f60;text-align:center'>
        <span>角色详情</span>
      </p>
      <div style='text-align:center'>
        <role-detail :data='roleDataDetail'></role-detail>
      </div>
      <div slot='footer'>
        <Button type='success' size='large' long @click='showRoleDetail = false'>确定</Button>
      </div>
    </Modal>

    <Modal v-model='showRoleEdit' width='360'>
      <p slot='header' style='color:#f60;text-align:center'>
        <span>角色分配资源</span>
      </p>
      <div style='text-align:center'>
        <role-edit :data='roleDataEdit' :roleList='roleList'></role-edit>
      </div>
      <div slot='footer'>
        <Button type='error' size='large' @click='showRoleEdit = false'>取消</Button>
        <Button type='success' size='large' @click='editRole()'>确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from "@/libs/util";
import url from "@/libs/url";
import ajax from "@/libs/requestApi";
import roleAdd from "./role_add";
import roleDetail from "./role_detail";
import roleEdit from "./role_edit";
//import axios from 'axios';
export default {
  components: {
    roleAdd,
    roleDetail,
    roleEdit
  },
  name: "user_table",
  data() {
    return {
      roleList: [],
      roleDataAdd: {
        roleName: ""
      },
      roleDataEdit: {},
      roleDataDetail: {},
      showRoleDetail: false,
      showRoleEdit: false,
      showAddAdmin: false,
      columns: [
        {
          title: "角色ID",
          key: "id"
        },
        {
          title: "角色名称",
          key: "roleName"
        },
        {
          title: "状态",
          key: "status"
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
                        .requestPostUrl(url.disable_admin_role_url, {
                          adminRoleId: params.row.id
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.$Message.success(
                              "角色名称：“" + params.row.roleName + "” 禁用成功"
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
                        .requestPostUrl(url.enabling_admin_role_url, {
                          adminRoleId: params.row.id
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.$Message.success(
                              "角色名称：“" + params.row.roleName + "” 启用成功"
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
                    size: "small",
                    disabled: params.row.status == "无效" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      function getAdminUserDetail() {
                        return ajax.requestGet(url.admin_role_detail_url, {
                          adminRoleId: params.row.id
                        });
                      }
                      function getFindGrantAdminRole() {
                        return ajax.requestGet(
                          url.find_grant_admin_resource_url,
                          { adminRoleId: params.row.id }
                        );
                      }
                      axios
                        .all([getAdminUserDetail(), getFindGrantAdminRole()])
                        .then(
                          axios.spread((res1, res2) => {
                            // console.log(res1);
                            //console.log(res2);
                            this.showRoleEdit = true;
                            let edit = res1.data.data;
                            let resource = res2.data.data;
                            //console.log(res1);
                            for (let x in edit) {
                              if (x == "createTime") {
                                this.$set(
                                  this.roleDataEdit,
                                  x,
                                  util.formatDate(
                                    new Date(edit.createTime),
                                    "yyyy-MM-dd hh:mm:ss"
                                  )
                                );
                              } else if (x == "updateTime") {
                                this.$set(
                                  this.roleDataEdit,
                                  x,
                                  util.formatDate(
                                    new Date(edit.updateTime),
                                    "yyyy-MM-dd hh:mm:ss"
                                  )
                                );
                              } else if (x == "status") {
                                let statusArr = ["无效", "有效"];
                                this.$set(
                                  this.roleDataEdit,
                                  x,
                                  statusArr[edit[x]]
                                );
                              } else {
                                this.$set(this.roleDataEdit, x, edit[x]);
                              }
                            }
                            util.recursion(
                              resource.allLabels,
                              "childAdminResources",
                              false
                            );
                            util.recursion(
                              resource.currentLoginAdminResource,
                              "childAdminResources",
                              false
                            );
                            resource.allLabels = Object.assign(
                              resource.currentLoginAdminResource,
                              resource.allLabels
                            );

                            this.$set(
                              this.roleDataEdit,
                              "tree",
                              resource.allLabels
                            );
                          })
                        );
                    }
                  }
                },
                "分配资源"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                    disabled: params.row.status == "无效" ? true : false
                  },
                  on: {
                    click: () => {
                      function getAdminUserDetail() {
                        return ajax.requestGet(url.admin_role_detail_url, {
                          adminRoleId: params.row.id
                        });
                      }
                      function getFindGrantAdminRole() {
                        return ajax.requestGet(
                          url.find_grant_admin_resource_url,
                          { adminRoleId: params.row.id }
                        );
                      }
                      axios
                        .all([getAdminUserDetail(), getFindGrantAdminRole()])
                        .then(
                          axios.spread((res1, res2) => {
                            if (res1.data.success && res2.data.success) {
                              this.showRoleDetail = true;
                              let detail = res1.data.data;
                              let resource = res2.data.data;
                              //console.log(res1);
                              for (let x in detail) {
                                if (x == "createTime") {
                                  this.$set(
                                    this.roleDataDetail,
                                    x,
                                    util.formatDate(
                                      new Date(detail.createTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "updateTime") {
                                  this.$set(
                                    this.roleDataDetail,
                                    x,
                                    util.formatDate(
                                      new Date(detail.updateTime),
                                      "yyyy-MM-dd hh:mm:ss"
                                    )
                                  );
                                } else if (x == "status") {
                                  let statusArr = ["无效", "有效"];
                                  this.$set(
                                    this.roleDataDetail,
                                    x,
                                    statusArr[detail[x]]
                                  );
                                } else {
                                  this.$set(this.roleDataDetail, x, detail[x]);
                                }
                              }
                              util.recursion(
                                resource.allLabels,
                                "childAdminResources",
                                true
                              );
                              this.$set(
                                this.roleDataDetail,
                                "tree",
                                resource.allLabels
                              );
                            }
                          })
                        )
                        .catch(error => {
                          this.$Message.error("请求错误，请联系管理员");
                          console.log(error);
                        });
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
    editRole() {
      if (this.roleDataEdit.roleName == "") {
        this.$Message.error("请补全信息");
        return;
      }
      let arr = [];
      let obj = this.roleDataEdit.tree;
      for (let x = 0; x < obj.length; x++) {
        if (obj[x].checked) {
          arr.push(obj[x].id);
          for (let y = 0; y < obj[x].children.length; y++) {
            arr.push(obj[x].children[y].id);
          }
        } else {
          for (let y = 0; y < obj[x].children.length; y++) {
            if (obj[x].children[y].checked) {
              arr.push(obj[x].children[y].id);
              arr.push(obj[x].id);
            }
          }
        }
      }
      arr = util.unique(arr);
      //console.log(arr)
      ajax
        .requestPostUrl(url.edit_grant_admin_resource_url, {
          adminRoleId: this.roleDataEdit.id,
          ids: arr.join(",")
        })
        .then(resp => {
          if (resp.data.success) {
            this.showRoleEdit = false;
            this.$Message.success("保存成功");
          } else this.$Message.error(resp.data.msg);
        });
    },
    addAdminRole() {
      for (let x in this.roleDataAdd) {
        if (this.roleDataAdd[x] == "") {
          this.$Message.error("请补全信息");
          return;
        }
      }
      ajax.requestPost(url.add_admin_role_url, this.roleDataAdd).then(resp => {
        if (resp.status == 200) {
          if (resp.data.success) {
            this.showAddAdmin = false;
            this.$store.dispatch("GET_ROLE_LIST_INFO", {
              searchInfo: this.$store.state.mutations.search_role_list_info,
              publicPage: this.$store.state.mutations
                .search_role_list_public_page
            });
            this.$Message.success("添加成功");
          } else {
            this.$Message.error(resp.data.msg);
          }
        }
      });
    }
  }
};
</script>


<style>
</style>
