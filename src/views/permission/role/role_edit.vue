<template>
    <div>
        <Form :label-width="90">
            <FormItem label="用户角色:">
                <Input clearable v-model="data.roleName" />
            </FormItem>
            <FormItem label="角色授权信息:">
            </FormItem>
        </Form>
        <detail-tree :trees="data.tree"></detail-tree>
    </div>
</template>
<script>
import detailTree from "./role_edit_tree";
export default {
  props: ["data"],
  components: {
    detailTree
  }
};
</script>
<style>

</style>
