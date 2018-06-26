<template>
    <div>
        <public-search :data='searchData' :mark='mark' ></public-search>
        <user-table ></user-table>
        <public-change-page
        :mark='mark'
        :currentPage='$store.state.mutations.search_user_list_page_info.currenPage'
        :totalPage='$store.state.mutations.search_user_list_page_info.totalPage'
        ></public-change-page>
    </div>
</template>

<script>
import publicSearch from "@/views/public-components/search";
import userTable from "./user_table";
import publicChangePage from "@/views/public-components/changePage";
import config from "./config";
export default {
  data() {
    return {
      mark: "user",
      searchData: config.searchData
    };
  },
  components: {
    publicSearch,
    userTable,
    publicChangePage
  },

  created() {
    this.$store.dispatch("GET_USER_LIST_INFO", {
      searchInfo: this.$store.state.mutations.search_user_list_info,
      publicPage: this.$store.state.mutations.search_user_list_public_page
    });
  }
};
</script>

<style>
</style>
