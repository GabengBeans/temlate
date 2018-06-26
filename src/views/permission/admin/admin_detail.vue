<template>
    <div>
        
        <Form :label-width="80">
            <FormItem label="用户ID:" style="border-bottom:1px solid gray;text-align:center">
                <span>{{data.id}}</span>
            </FormItem>
            <FormItem label="昵称:" style="border-bottom:1px solid gray">
                <span>{{data.nickname}}</span>
            </FormItem>
            <FormItem label="用户角色:" style="border-bottom:1px solid gray">
                <span>{{data.roleName}}</span>
            </FormItem>
            <FormItem label="账号:" style="border-bottom:1px solid gray">
                <span>{{data.username}}</span>
            </FormItem>
            <FormItem label="状态:" style="border-bottom:1px solid gray">
                <span>{{data.status}}</span>
            </FormItem>
            <FormItem label="创建时间:" style="border-bottom:1px solid gray">
                <span>{{data.createTime}}</span>
            </FormItem>
            <FormItem label="更新时间:" style="border-bottom:1px solid gray">
                <span>{{data.updateTime}}</span>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
  props: ["data"]
};
</script>
<style>

</style>
