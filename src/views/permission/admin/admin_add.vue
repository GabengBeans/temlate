<template>
    <div>
        <Form :label-width="80">
            <FormItem label="昵称:">
                <Input clearable v-model="data.nickname" />
            </FormItem>
            <FormItem label="真实姓名:">
                <Input clearable v-model="data.realname" />
            </FormItem>
            <FormItem label="账号:">
                <Input clearable v-model="data.username" />
            </FormItem>
            <FormItem label="初始密码:">
                <Input clearable v-model="data.password" />
            </FormItem>
            <FormItem label="手机号:">
                <Input clearable v-model="data.phone" />
            </FormItem>
            <FormItem label="邮箱:">
                <Input clearable v-model="data.mail" />
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
