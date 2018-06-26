<template>
    <div>
        <Row>
            <Col :xs='13' :sm='13' :md='12' :lg='12'>
            <Form :label-width="90">
                <FormItem label="用户角色:">
                    <div>{{data.roleName}}</div>
                </FormItem>
                <FormItem label="状态:">
                    <div>{{data.status}}</div>
                </FormItem>
                <FormItem label="创建时间:">    
                    <div>{{data.createTime}}</div>
                </FormItem>
                <FormItem label="更新时间:">
                    <div>{{data.updateTime}}</div>
                </FormItem>
            </Form>
            </Col>
            <Col :xs='13' :sm='13' :md='12' :lg='12'>
            <div>
                角色授权信息：
            </div>
            <detail-tree :trees="data.tree"></detail-tree>
        </Col>
        </Row>

    </div>
</template>
<script>
import detailTree from "./role_detail_tree";
export default {
  props: ["data"],
  components: {
    detailTree
  }
};
</script>
<style>

</style>
