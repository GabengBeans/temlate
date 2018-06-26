<template>
  <div id='public_search'>
    <Row :gutter='16'>
      <Form label-position='right' :label-width='75'>
        <Col :xs='13' :sm='13' :md='8' :lg='5' v-for='item in data' :key='item.key' v-if='!item.desc' style='height:57px;'>
        <FormItem style='min-width:100px' :label='item.tagName'>
          <Select v-model='item.value' v-if='item.tag' style='width:150px'>
            <Option v-for='item in item.tag' :key='item.key' :value='item.num'>{{item.value}}</Option>
          </Select>
          <DatePicker v-else-if='item.date' v-model='item.value' type='date' placeholder='请选择日期'></DatePicker>
          <Input clearable v-model='item.value' v-else />
        </FormItem>
        </Col>
      </Form>
      <Button style='margin-left:38px' type='primary' shape='circle' icon='ios-search' @click.native='search'>搜索</Button>
    </Row>
    <Row :gutter='16'>
      <Form label-position='right' :label-width='75'>
        <Col :xs='13' :sm='13' :md='8' :lg='5' v-for='item in data' :key='item.key' v-if='item.desc'>
        <FormItem style='min-width:100px' :label='item.tagName' >
          <Input clearable v-model='item.value' v-if='item.desc' style='width:67vw' />
        </FormItem>
        </Col>
      </Form>
    </Row>
  </div>
</template>
<script>
export default {
  name: "public_search",
  props: ["data", "mark"],
  methods: {
    search: function() {
      let obj = {};
      for (let x in this.data) {
        if (this.data[x].value !== "") {
          obj[x] = this.data[x].value;
        }
      }

      switch (this.mark) {
        case "admin_user":
          this.$store.dispatch("GET_ADMIN_LIST_INFO", {
            searchInfo: obj,
            publicPage: 1
          });
          break;

        case "admin_role":
          this.$store.dispatch("GET_ROLE_LIST_INFO", {
            searchInfo: obj,
            publicPage: 1
          });
          break;

        case "user":
          this.$store.dispatch("GET_USER_LIST_INFO", {
            searchInfo: obj,
            publicPage: 1
          });
          break;

        case "note":
          console.log(obj.auditStatus);
          if (obj.auditStatus == "-1") delete obj.auditStatus;
          this.$store.dispatch("GET_NOTE_LIST_INFO", {
            searchInfo: obj,
            publicPage: 1
          });
          break;
      }
    }
  }
};
</script>

<style>
@import "../../styles/publicStyle.less";
</style>
