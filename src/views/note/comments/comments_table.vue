<template>
    <div id='public_table'>
        <Table border stripe :columns='tableColumns' :data='$store.state.mutations.search_comment_list_result'>
        </Table>
        <Modal v-model="showReplyDetail" width="80%">
            <p slot="header" style="color:green;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>
                    回复详情
                </span>
            </p>
            <div>
              <Table border stripe :columns='replyColumns' :data='$store.state.mutations.search_reply_comment_list_result'>
              </Table>
              <public-change-page
              :mark='mark'
              :currentPage='$store.state.mutations.search_reply_comment_list_page_info.currentPage'
              :totalPage='$store.state.mutations.search_reply_comment_list_page_info.totalPage'
              ></public-change-page>
            </div>
            <div slot="footer" >
                <Button type="error" @click="candelComment">取消</Button>
            </div>
        </Modal>
        <Modal v-model="showReplyDeleteModal" width="500">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除回复评论</span>
            </p>
            <div style="font-size:20px;color:#f60;text-align:center">
                确认删除回复评论吗？
            </div>
            <div slot="footer" style="display:flex;justify-content: space-around">
                <Button type="error" @click="candelReplyComment">取消</Button>
                <Button type="success" @click="deleteReplyComment">确定</Button>
            </div>
        </Modal>
        <Modal v-model="showDelComment" width="500">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除评论</span>
            </p>
            <div style="font-size:20px;color:#f60;text-align:center">
                确认删除评论吗？
            </div>
            <div slot="footer" style="display:flex;justify-content: space-around">
                <Button type="error" @click="candelComment">取消</Button>
                <Button type="success" @click="deleteComment">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import ajax from "@/libs/requestApi.js";
import url from "@/libs/url";
import util from "@/libs/util";
import publicChangePage from "@/views/public-components/changePage";
export default {
  name: "user_table",
  data() {
    return {
      mark: "reply_comments",
      showReplyDetail: false,
      showDelComment: false,
      showReplyDeleteModal: false,
      deleteId: "",
      replyDeleteId: "",
      tableColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "笔记ID",
          key: "noteId"
        },
        {
          title:"评论者昵称",
          key:"nickName"
        },
        {
          title: "笔记标题",
          key: "noteTitle"
        },

        {
          title: "评论内容",
          key: "content"
        },
        {
          title: "评论时间",
          key: "createTime"
        },
        {
          title: "状态",
          key: "status"
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
                    type: "error",
                    size: "small",
                    disabled: params.row.status == "删除" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.deleteId = params.row.id;
                      this.showDelComment = true;
                    }
                  }
                },
                "删除评论"
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
                      this.$store.dispatch("GET_REPLY_COMMENT_LIST_INFO", {
                        searchInfo: params.row.id,
                        publicPage: 1
                      });
                      this.showReplyDetail = true;
                    }
                  }
                },
                "回复详情"
              )
            ]);
          }
        }
      ],
      replyColumns: [
        {
          title: "回复人昵称",
          key: "nickName"
        },
        {
          title: "回复内容",
          key: "content"
        },
        {
          title: "回复时间",
          key: "createTime"
        },
        {
          title: "状态",
          key: "status"
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
                    type: "error",
                    size: "small",
                    disabled: params.row.status == "删除" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.replyDeleteId = params.row.id;
                      this.showReplyDeleteModal = true;
                    }
                  }
                },
                "删除回复"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    deleteComment() {
      ajax
        .requestPostUrl(url.comment_delete_url, {
          commentId: this.deleteId
        })
        .then(resp => {
          if (resp.data.success) {
            this.showDelComment = false;
            this.$store.dispatch("GET_COMMENT_LIST_INFO", {
              searchInof: this.$store.state.mutations.search_comment_list_info,
              publicPage: this.$store.state.mutations
                .search_comment_list_public_page
            });
            this.$Message.success("删除成功");
          } else {
            this.$Message.error(resp.data.msg);
          }
        });
    },
    deleteReplyComment() {
      ajax
        .requestPostUrl(url.comment_reply_delete_url, {
          replyId: this.replyDeleteId
        })
        .then(resp => {
          console.log(resp);
          if (resp.data.success) {
            this.$store.dispatch("GET_REPLY_COMMENT_LIST_INFO", {
              searchInfo: params.row.id,
              publicPage: 1
            });
            this.$Message.success("删除成功");
            this.showReplyDeleteModal = false;
          } else {
            this.$Message.error(resp.data.msg);
          }
        });
    },
    candelComment() {
      this.showDelComment = false;
      this.showReplyDetail = false;
    },
    candelReplyComment() {
      this.showReplyDeleteModal = false;
    }
  },
  components: {
    publicChangePage
  }
};
</script>
<style>
@import "../../../styles/publicStyle.less";
.item {
  border-bottom: 1px solid black;
  text-align: center;
}
.item img {
  max-width: 200px;
  max-height: 200px;
}
</style>
