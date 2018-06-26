<template>
    <div id='public_table'>
        <Table border stripe :columns='tableColumns' :data='$store.state.mutations.search_user_list_result'>
        </Table>
        <Modal v-model="showAudit" width="500">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>审核</span>
            </p>
            <div>
                <Form>
                    <FormItem label="头像" :label-width='90' class="item">
                        <img :src="userDetailInfo.avatar_url" />
                    </FormItem>
                    <FormItem label="昵称" :label-width='90' class="item">
                        <span>{{userDetailInfo.nickName}}</span>
                    </FormItem>
                    <FormItem label="真实姓名" :label-width='90' class="item">
                        <span>{{userDetailInfo.realName}}</span>
                    </FormItem>
                    <FormItem label="性别" :label-width='90' class="item">
                        <span>{{userDetailInfo.sex?'男':'女'}}</span>
                    </FormItem>
                    <FormItem label="手机号" :label-width='90' class="item">
                        <span>{{userDetailInfo.phone}}</span>
                    </FormItem>
                    <FormItem label="注册时间" :label-width='90' class="item">
                        <span>{{userDetailInfo.createTime}}</span>
                    </FormItem>
                    <FormItem label="医院" :label-width='90' class="item">
                        <span>{{userDetailInfo.hospital}}</span>
                    </FormItem>
                    <FormItem label="医生编号" :label-width='90' class="item">
                        <span>{{userDetailInfo.doctorNo}}</span>
                    </FormItem>
                    <FormItem label="科室" :label-width='90' class="item">
                        <span>{{userDetailInfo.department}}</span>
                    </FormItem>
                </Form>

            </div>
            <div slot="footer" style="display:flex;justify-content: space-around">
                <Button type="error" @click="candelAudit">不通过</Button>
                <Button type="success" @click="okAudit">通过</Button>
            </div>
        </Modal>
          <Modal v-model="showDetail" width="500">
            <p slot="header" style="text-align:center">
                <span>用户详情</span>
            </p>
            <div>
                <Form>
                    <FormItem label="头像" :label-width='90' class="item">
                        <img :src="userDetailInfo.avatar_url" />
                    </FormItem>
                    <FormItem label="昵称" :label-width='90' class="item">
                        <span>{{userDetailInfo.nickName}}</span>
                    </FormItem>
                    <FormItem label="真实姓名" :label-width='90' class="item">
                        <span>{{userDetailInfo.realName}}</span>
                    </FormItem>
                    <FormItem label="性别" :label-width='90' class="item">
                        <span>{{userDetailInfo.sex?'男':'女'}}</span>
                    </FormItem>
                    <FormItem label="手机号" :label-width='90' class="item">
                        <span>{{userDetailInfo.phone}}</span>
                    </FormItem>
                    <FormItem label="注册时间" :label-width='90' class="item">
                        <span>{{userDetailInfo.createTime}}</span>
                    </FormItem>
                    <FormItem label="医院" :label-width='90' class="item">
                        <span>{{userDetailInfo.hospital}}</span>
                    </FormItem>
                    <FormItem label="医生编号" :label-width='90' class="item">
                        <span>{{userDetailInfo.doctorNo}}</span>
                    </FormItem>
                    <FormItem label="科室" :label-width='90' class="item">
                        <span>{{userDetailInfo.department}}</span>
                    </FormItem>
                </Form>

            </div>
            <div slot="footer" style="display:flex;justify-content: space-around">

            </div>
        </Modal>
    </div>
</template>
<script>
import ajax from "@/libs/requestApi.js";
import url from "@/libs/url";
import util from "@/libs/util";
export default {
  name: "user_table",
  data() {
    return {
      showDetail: false,
      showAudit: false,
      userDetailInfo: {},
      tableColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "昵称",
          key: "nickName",
          width: 160
        },
        {
          title: "真实姓名",
          key: "realName"
        },
        {
          title: "电话号码",
          key: "servant",
          ellipsis: "false"
        },
        {
          title: "医院",
          key: "hospital"
        },
        {
          title: "科室",
          key: "department"
        },
        {
          title: "医生编号",
          key: "doctorNo"
        },
        {
          title: "注册时间",
          key: "createTime"
        },
        {
          title: "审核状态",
          key: "auditStatus"
        },
        {
          title: "操作",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled: params.row.auditStatus == "未认证" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showAudit = true;
                      ajax
                        .requestGet(url.user_detail_url, {
                          userId: params.row.id
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.userDetailInfo = resp.data.data;
                            this.userDetailInfo.createTime = util.formatDate(
                              new Date(this.userDetailInfo.createTime),
                              "yyyy-MM-dd hh:mm:ss"
                            );
                            this.showAuit = true;
                          }
                        });
                    }
                  }
                },
                "审核"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      ajax
                        .requestGet(url.user_detail_url, {
                          userId: params.row.id
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.userDetailInfo = resp.data.data;
                            this.userDetailInfo.createTime = params.row.createTime
                            this.showDetail = true;
                          }
                        });
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Message.error("暂不能使用")
                    }
                  }
                },
                "禁用"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    okAudit() {
      let data = {
        userId: this.userDetailInfo.id,
        auditStatus: 1
      };
      ajax.requestPost(url.user_audit_url, data).then(resp => {
        if (resp.data.success) {
          this.showAudit = false;
          this.$Message.success("审核通过");
          this.$store.dispatch("GET_USER_LIST_INFO", {
            searchInfo: this.$store.state.mutations.search_user_list_info,
            publicPage: this.$store.state.mutations.search_user_list_public_page
          });
        } else {
          this.$Message.error(resp.data.msg);
        }
      });
    },
    candelAudit() {
      let data = {
        userId: this.userDetailInfo.id,
        auditStatus: 2
      };
      ajax.requestPost(url.user_audit_url, data).then(resp => {
        if (resp.data.success) {
          this.showAudit = false;
          this.$Message.success("审核不通过");
          this.$store.dispatch("GET_USER_LIST_INFO", {
            searchInfo: this.$store.state.mutations.search_user_list_info,
            publicPage: this.$store.state.mutations.search_user_list_public_page
          });
        } else {
          this.$Message.error(resp.data.msg);
        }
      });
    }
  }
};
</script>
<style>
@import "../../styles/publicStyle.less";
.item {
  border-bottom: 1px solid black;
  text-align: center;
}
.item img {
  max-width: 200px;
  max-height: 200px;
}
</style>
