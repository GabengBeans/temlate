<template>
  <div>
    <Card>
      <Button type="success" @click="showAddOne()">添加一级资源</Button>
    </Card>
    <Row>
      <Col span="12">
      <Card style="min-width:400px;">
        <Tree :data="$store.state.mutations.search_resource_list_result" :render="renderContent"></Tree>
      </Card>
      </Col>
      <Col span="12" v-if="showResourceDetail">
      <Card style="min-width:400px;">
        <div style="text-align:center;font-size:18px;color:#f60">{{resourceDetailData.title}}</div>
        <br>
        <Form>
          <FormItem style="font-size:16px" label="资源ID：">
            <b>{{resourceDetailData.id}}</b>
          </FormItem>
          <FormItem style="font-size:16px" label="排序：">
            <b>{{resourceDetailData.orderNum}}</b>
          </FormItem>
          <FormItem label="资源名称：">
            <b>{{resourceDetailData.name}}</b>
          </FormItem>
          <FormItem label="资源模块名称：">
            <b>{{resourceDetailData.modelName}}</b>
          </FormItem>
          <FormItem label="创建时间：">
            <b>{{resourceDetailData.createTime}}</b>
          </FormItem>
          <FormItem label="更新时间：">
            <b>{{resourceDetailData.updateTime}}</b>
          </FormItem>
        </Form>
      </Card>
      </Col>
      <Col span="12" v-if="showResourceEdit">
      <Card style="min-width:400px;">
        <div style="text-align:center;font-size:18px;color:#f60">{{resourceEditData.title}}</div>
        <br>
        <Form :label-width="100">
          <!-- <FormItem style="font-size:16px" label="资源ID：">
            <Input clearable v-model="resourceDetailData.id" />
          </FormItem> -->
          <!-- <FormItem label="父级资源名称：">
            <Input clearable v-model="resourceEditData.name" />
          </FormItem> -->
          <FormItem label="排序：">
            <Input clearable v-model="resourceEditData.orderNum" />
          </FormItem>
          <FormItem label="资源名称：">
            <Input clearable v-model="resourceEditData.name" />
          </FormItem>
          <FormItem label="资源模块名称：">
            <Input clearable v-model="resourceEditData.modelName" />
          </FormItem>
          <FormItem v-if="parentId==-1" label="图标：">
            <!-- <Input clearable v-model="resourceEditData.newIcon" /> -->
            <Select v-model="resourceEditData.newIcon" style="width:200px">
              <Option v-for="item in icons" :value="item" :key="item.key">
                <Icon size="20" :type="item" />　{{item}}
              </Option>
            </Select>
            {{"　"}}
            <Icon :type="resourceEditData.newIcon" size="20" />
          </FormItem>
          <!-- <FormItem label="创建时间：">
            <Input clearable v-model="resourceDetailData.createTime" />
          </FormItem>
          <FormItem label="更新时间：">
            <Input clearable v-model="resourceDetailData.updateTime" />
          </FormItem> -->
        </Form>
        <br>
        <div style="text-align:center">
          <Button type="success" @click="saveResourceEdit()">保存</Button>
        </div>
      </Card>
      </Col>
      <Col span="12" v-if="showResourceAdd">
      <Card style="min-width:400px;">
        <div style="text-align:center;font-size:18px;color:#f60">{{reseourceAddData.title}}</div>
        <br>
        <Form :label-width="100">
          <FormItem label="父级资源名称：" v-if="reseourceAddData.parentId!=-1">
            <b>{{reseourceAddData.parentName}}</b>
          </FormItem>
          <FormItem label="资源名称：">
            <Input clearable v-model="reseourceAddData.name" />
          </FormItem>
          <FormItem label="资源模块名称：">
            <Input clearable v-model="reseourceAddData.modelName" />
          </FormItem>
          <FormItem v-if=" parentId ==-1" label="图标：">
            <Select v-model="reseourceAddData.newIcon" style="width:200px">
              <Option v-for="item in icons" :value="item" :key="item.key">
                <Icon size="20" :type="item" />　{{item}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <br>
        <div style="text-align:center">
          <Button type="success" @click="saveResourceAdd()">添加</Button>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import util from "@/libs/util";
import url from "@/libs/url";
import ajax from "@/libs/requestApi";
import config from "../config";
export default {
  data() {
    return {
      parentId: "",
      icons: [],
      showResourceAdd: false,
      showResourceDetail: false,
      showResourceEdit: false,
      reseourceAddData: {
        title: "",
        name: "",
        modelName: "",
        parentId: -1,
        parentName: ""
      },
      resourceEditData: {},
      resourceDetailData: {}
    };
  },
  created() {
    this.$store.dispatch("GET_ADMIN_RESOURCE_LIST_INFO");
    this.icons = config.icons;
  },
  methods: {
    showAddOne() {
      this.reseourceAddData.title = "添加一级资源";
      this.reseourceAddData.parentId = -1;
      this.showResourceAdd = true;
      this.showResourceDetail = false;
      this.showResourceEdit = false;
      this.parentId = -1;
    },
    saveResourceAdd() {
      let data = {
        parentId: this.reseourceAddData.parentId,
        modelName: this.reseourceAddData.modelName,
        name: this.reseourceAddData.name,
        newIcon: this.reseourceAddData.newIcon
      };
      ajax.requestPost(url.add_admin_resource_url, data).then(resp => {
        if (resp.data.success) {
          this.reseourceAddData.name = "";
          this.reseourceAddData.modelName = "";
          this.$store.dispatch("GET_ADMIN_RESOURCE_LIST_INFO");
          this.$Message.success("添加成功");
        } else {
          this.$Message.error(resp.data.msg);
        }
      });
    },
    saveResourceEdit() {
      let data = {
        id: this.resourceEditData.id,
        modelName: this.resourceEditData.modelName,
        name: this.resourceEditData.name,
        orderNum: this.resourceEditData.orderNum,
        newIcon: this.resourceEditData.newIcon
      };
      ajax.requestPost(url.update_admin_resource_url, data).then(resp => {
        if (resp.data.success) {
          let obj = this.$store.state.mutations.search_resource_list_result;
          for (let x = 0; x < obj.length; x++) {
            if (obj[x].id == this.resourceEditData.id) {
              obj[x].name = this.resourceEditData.name;
            } else {
              for (let y = 0; y < obj[x].children.length; y++) {
                if (obj[x].children[y].id == this.resourceEditData.id) {
                  obj[x].children[y].name = this.resourceEditData.name;
                }
              }
            }
          }
          this.$store.dispatch("GET_ADMIN_RESOURCE_LIST_INFO");
          this.$Message.success("保存成功");
        } else {
          this.$Message.error(resp.data.msg);
        }
      });
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-flex",
            width: "100%",
            justifyContent: "space-between"
          }
        },
        [
          h("span", [
            h(
              "span",
              {
                style: {
                  fontSize: "16px"
                }
              },
              data.name
            )
          ]),
          h("span", [
            data.parentId == -1
              ? h(
                  "Button",
                  {
                    props: {
                      type: "success"
                    },
                    style: {
                      marginRight: "8px"
                    },
                    on: {
                      click: () => {
                        this.reseourceAddData.title = "添加二级资源";
                        this.reseourceAddData.parentId = data.id;
                        this.reseourceAddData.parentName = data.name;
                        this.showResourceAdd = true;
                        this.showResourceDetail = false;
                        this.showResourceEdit = false;
                        this.parentId = data.id;
                      }
                    }
                  },
                  "添加二级资源"
                )
              : "",
            h(
              "Button",
              {
                props: Object.assign({}, this.buttonProps, {
                  type: "success",
                  disabled: data.status == 1 ? true : false
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    let params = {
                      adminResourceId: data.id
                    };
                    ajax
                      .requestPostUrl(url.enabling_admin_resource_url, params)
                      .then(resp => {
                        if (resp.data.success) {
                          data.status = 1;
                          this.$Message.success("启用成功");
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
                props: Object.assign({}, this.buttonProps, {
                  type: "error",
                  disabled: data.status == 1 ? false : true
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    let params = {
                      adminResourceId: data.id
                    };
                    ajax
                      .requestPostUrl(url.disable_admin_resource_url, params)
                      .then(resp => {
                        if (resp.data.success) {
                          data.status = 0;
                          let parentNodeKey = node.parent;
                          let childArr = [];
                          let bool = true;
                          let parentId;
                          let parentObj;
                          for (let x = 0; x < root.length; x++) {
                            if (root[x].nodeKey == parentNodeKey) {
                              parentId = root[x].node.id;
                              childArr = root[x].node.children;
                              parentObj = root[x].node;
                            }
                          }
                          for (let x = 0; x < childArr.length; x++) {
                            if (childArr[x].status) {
                              bool = false;
                            }
                          }
                          if (parentId) {
                            if (bool) {
                              let params = {
                                adminResourceId: parentId
                              };
                              ajax
                                .requestPostUrl(
                                  url.disable_admin_resource_url,
                                  params
                                )
                                .then(resp => {
                                  parentObj.status = 0;
                                });
                            }
                          }
                          this.$Message.success("禁用成功");
                        }else{
                          this.$Message.error(resp.data.msg)
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
                props: Object.assign({}, this.buttonProps, {
                  type: "primary"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    for (let x in data) {
                      this.$set(this.resourceEditData, x, data[x]);
                    }
                    this.$set(this.resourceEditData, "title", "资源编辑");
                    this.showResourceEdit = true;
                    this.showResourceDetail = false;
                    this.showResourceAdd = false;
                    this.parentId = data.parentId;
                  }
                }
              },
              "编辑"
            ),
            h(
              "Button",
              {
                props: Object.assign({}, this.buttonProps, {
                  type: "info"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    let obj = data;
                    for (let x in obj) {
                      if (x == "createTime") {
                        this.$set(
                          this.resourceDetailData,
                          x,
                          util.formatDate(
                            new Date(obj[x]),
                            "yyyy-MM-dd hh:mm:ss"
                          )
                        );
                      } else if (x == "updateTime") {
                        this.$set(
                          this.resourceDetailData,
                          x,
                          util.formatDate(
                            new Date(obj[x]),
                            "yyyy-MM-dd hh:mm:ss"
                          )
                        );
                      } else {
                        this.$set(this.resourceDetailData, x, obj[x]);
                      }
                    }
                    this.$set(this.resourceDetailData, "title", "资源详情");
                    this.showResourceDetail = true;
                    this.showResourceEdit = false;
                    this.showResourceAdd = false;
                  }
                }
              },
              "详情"
            )
          ])
        ]
      );
    }
  }
};
</script>
<style>
</style>
