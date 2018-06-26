<template>
  <div id='public_change_page'  >
    <Page style='float:right; margin-right:10px' :current='Number(currentPage) || 1' :total='Number(totalPage) || 1' show-elevator @on-change='switch_page' >
    </Page>
  </div>
</template>
<script>
export default {
  name: "public_change_page",
  props: ["mark", "currentPage", "totalPage"],
  methods: {
    switch_page: function(index) {
      console.log(index);
      switch (this.mark) {
        case "admin_user":
          this.$store.dispatch("GET_ADMIN_LIST_INFO", {
            serachInfo: this.$store.state.mutations.search_admin_list_info,
            publicPage: index
          });
          break;

        case "admin_role":
          this.$store.dispatch("GET_ROLE_LIST_INFO", {
            serachInfo: this.$store.state.mutations.search_role_list_info,
            publicPage: index
          });
          break;

        case "user":
          this.$store.dispatch("GET_USER_LIST_INFO", {
            serachInfo: this.$store.state.mutations.search_user_list_info,
            publicPage: index
          });
          break;

        case "note":
          this.$store.dispatch("GET_NOTE_LIST_INFO", {
            serachInfo: this.$store.state.mutations.search_note_list_info,
            publicPage: index
          });
          break;

        case "reply_comments":
          this.$store.dispatch("GET_REPLY_COMMENT_LIST_INFO", {
            serachInfo: this.$store.state.search_reply_comment_list_info,
            publicPage: index
          });
          break;

        case "comments":
          console.log(index);
          this.$store.dispatch("GET_COMMENT_LIST_INFO", {
            searchInfo: this.$store.state.mutations.search_comment_list_info,
            publicPage: index
          });
          break;
      }
    }
  } //
};
</script>
<style>
@import "../../styles/publicStyle.less";
</style>

