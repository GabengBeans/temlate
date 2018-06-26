<template>
    <div>
        <Form :label-width="80">
            <FormItem label="昵称:">
                <Input clearable v-model="data.nickname" />
            </FormItem>
            <FormItem label="用户角色:">
                <Select v-model="data.roleId">
                    <Option v-for="item in roleList" :value="item.id" :key="item.value">{{ item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="账号:">
                <Input clearable v-model="data.username" />
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
  props: ["data", "roleList"]
};
</script>
<style>

</style>
