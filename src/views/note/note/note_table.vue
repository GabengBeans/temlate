<template>
    <div id='public_table'>
        <Table border stripe :columns='tableColumns' :data='$store.state.mutations.search_note_list_result'>
        </Table>
        <Modal v-model="showAudit" width="600">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>笔记审核</span>
            </p>
            <div>
                <Form>
                    <FormItem label="昵称" :label-width='90' class="item">
                        <span>{{noteDetailInfo.nickName}}</span>
                    </FormItem>
                    <FormItem label="笔记比标题" :label-width='90' class="item">
                        <span>{{noteDetailInfo.noteTitle}}</span>
                    </FormItem>
                    <FormItem label="分类" :label-width='90' class="item">
                        <span>{{noteDetailInfo.categoryName}}</span>
                    </FormItem>
                    <FormItem label="笔记内容" :label-width='90' class="item">
                        <span>{{noteDetailInfo.noteContent}}</span>
                    </FormItem>
                    <!-- <FormItem label="创建时间" :label-width='90' class="item">
                        <span>{{noteDetailInfo.createTime}}</span>
                    </FormItem> -->
                    <FormItem label="图片" :label-width='90' class="item" >
                      <div class="demo-upload-list" v-for="item in noteDetailInfo.noteMediaResults"  v-if="item.mediaType==1" v-bind:key="item.index" >
                          <template >
                            <img  :src="item.mediaUrl">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.mediaUrl)"></Icon>
                            </div>
                        </template>
                      </div>
                    </FormItem>
                    <FormItem label="视频" :label-width='90' class="item">
                        <div class="demo-upload-list" v-for="item in noteDetailInfo.noteMediaResults" v-if="item.mediaType==2" v-bind:key="item.index" >
                          <template  >
                            <img  :src="item.mediaUrl">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleVideo(item.videoUrl)"></Icon>
                            </div>
                        </template>
                      </div>
                    </FormItem>
                </Form>

            </div>
            <div slot="footer" style="display:flex;justify-content: space-around">
                <Button type="error" @click="candelAudit">不通过</Button>
                <Button type="success" @click="okAudit">通过</Button>
            </div>
        </Modal>
        <Modal v-model="showDetail" width="600">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>笔记详情</span>
            </p>
            <div>
                <Form>
                    <FormItem label="昵称" :label-width='90' class="item">
                        <span>{{noteDetailInfo.nickName}}</span>
                    </FormItem>
                    <FormItem label="笔记比标题" :label-width='90' class="item">
                        <span>{{noteDetailInfo.noteTitle}}</span>
                    </FormItem>
                    <FormItem label="分类" :label-width='90' class="item">
                        <span>{{noteDetailInfo.categoryName}}</span>
                    </FormItem>
                    <FormItem label="笔记内容" :label-width='90' class="item">
                        <span>{{noteDetailInfo.noteContent}}</span>
                    </FormItem>
                    <!-- <FormItem label="创建时间" :label-width='90' class="item">
                        <span>{{noteDetailInfo.createTime}}</span>
                    </FormItem> -->
                    <FormItem label="图片" :label-width='90' class="item" >
                      <div class="demo-upload-list" v-for="item in noteDetailInfo.noteMediaResults"  v-if="item.mediaType==1" v-bind:key="item.index" >
                          <template >
                            <img  :src="item.mediaUrl">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.mediaUrl)"></Icon>
                            </div>
                        </template>
                      </div>
                    </FormItem>
                    <FormItem label="视频" :label-width='90' class="item">
                        <div class="demo-upload-list" v-for="item in noteDetailInfo.noteMediaResults" v-if="item.mediaType==2" v-bind:key="item.index" >
                          <template  >
                            <img  :src="item.mediaUrl">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleVideo(item.videoUrl)"></Icon>
                            </div>
                        </template>
                      </div>
                    </FormItem>
                </Form>

            </div>
            <div slot="footer" style="display:flex;justify-content: space-around">
            </div>
        </Modal>
        <Modal v-model="visible">
          <p slot="header" style="text-align:center">
              <span>展示大图</span>
          </p>
          <img :src="imgName" v-if="visible" style="width: 100%">
          <div slot="footer">
          </div>
        </Modal>
        <Modal v-model="videoVisible">
          <p slot="header" style="text-align:center">
              <span>视频</span>
          </p>
          <video :src="videoUrl" controls="controls" v-if="videoVisible" autoplay="autoplay" style="width: 100%"></video>
          <div slot="footer">
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
      showAudit: false,
      showDetail: false,
      noteDetailInfo: {},
      imgName: "",
      visible: false,
      videoUrl: "",
      videoVisible: false,
      tableColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "发布人昵称",
          key: "nickName",
          width: 160
        },
        {
          title: "标签",
          key: "categoryName"
        },
        {
          title: "审核状态",
          key: "auditStatus"
        },
        {
          title: "笔记标题",
          key: "noteTitle"
        },
        {
          title: "置顶状态",
          key: "noteStick"
        },
        {
          title: "创建时间",
          key: "createTime"
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
                    disabled: params.row.auditStatus == "待审核" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.noteDetailInfo = {};
                      ajax
                        .requestGet(url.get_note_detail_url, {
                          userNoteId: params.row.id
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.noteDetailInfo = resp.data.data;
                            //this.noteDetailInfo.createTime = util.formatDate(new Date(this.noteDetailInfo.createTime),'yyyy-MM-dd hh:mm:ss')
                            this.showAudit = true;
                          } else {
                            this.$Message.error(resp.data.msg);
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
                      this.noteDetailInfo = {};
                      ajax
                        .requestGet(url.get_note_detail_url, {
                          userNoteId: params.row.id
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.noteDetailInfo = resp.data.data;
                            //this.noteDetailInfo.createTime = util.formatDate(new Date(this.noteDetailInfo.createTime),'yyyy-MM-dd hh:mm:ss')
                            this.showDetail = true;
                          } else {
                            this.$Message.error(resp.data.msg);
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
                    type: "primary",
                    size: "small",
                    disabled: params.row.noteStick == "已置顶" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      ajax
                        .requestPostUrl(url.note_stick_url, {
                          userNoteId: params.row.id,
                          noteStick: 1
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.$store.dispatch("GET_NOTE_LIST_INFO", {
                              searchInfo: this.$store.state.mutations
                                .search_note_list_info,
                              publicPage: this.$store.state.mutations
                                .search_note_list_public_page
                            });
                            this.$Message.success("已置顶");
                          } else {
                            this.$Message.error(resp.data.msg);
                          }
                        });
                    }
                  }
                },
                "置顶"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: params.row.noteStick == "未置顶" ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      ajax
                        .requestPostUrl(url.note_stick_url, {
                          userNoteId: params.row.id,
                          noteStick: 0
                        })
                        .then(resp => {
                          if (resp.data.success) {
                            this.$store.dispatch("GET_NOTE_LIST_INFO", {
                              searchInfo: this.$store.state.mutations
                                .search_note_list_info,
                              publicPage: this.$store.state.mutations
                                .search_note_list_public_page
                            });
                            this.$Message.success("已取消置顶");
                          } else {
                            this.$Message.error(resp.data.msg);
                          }
                        });
                    }
                  }
                },
                "取消置顶"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleVideo(name) {
      this.videoUrl = name;
      this.videoVisible = true;
    },
    okAudit() {
      let params = {
        userNoteId: this.noteDetailInfo.id,
        auditStatus: 1
      };
      ajax.requestPostUrl(url.note_audit_url, params).then(resp => {
        if (resp.data.success) {
          this.showAudit = false;
          this.$Message.success("审核通过");
          this.$store.dispatch("GET_NOTE_LIST_INFO", {
            searchInfo: this.$store.state.mutations.search_note_list_info,
            publicPage: this.$store.state.mutations.search_note_list_public_page
          });
        } else {
          this.$Message.error(resp.data.msg);
        }
      });
    },
    candelAudit() {
      let params = {
        userNoteId: this.noteDetailInfo.id,
        auditStatus: 2
      };
      ajax.requestPostUrl(url.note_audit_url, params).then(resp => {
        if (resp.data.success) {
          this.showAudit = false;
          this.$Message.success("审核不通过");
          this.$store.dispatch("GET_NOTE_LIST_INFO", {
            searchInfo: this.$store.state.mutations.search_note_list_info,
            publicPage: this.$store.state.mutations.search_note_list_public_page
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
@import "../../../styles/publicStyle.less";
.item {
  border-bottom: 1px solid rgb(201, 193, 193);
  text-align: center;
}
.item img {
  max-width: 200px;
  max-height: 200px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
