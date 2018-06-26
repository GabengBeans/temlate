<template>
    <div>
        <Form :label-width="80">
            <FormItem label="角色名称:">
                <Input clearable v-model="data.roleName" />
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
