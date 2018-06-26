<template>
    <div>
        <!-- <public-search :data='searchData' :mark='mark' ></public-search> -->
        <user-table ></user-table>
        <public-change-page
        :mark='mark'
        :currentPage='$store.state.mutations.search_comment_list_page_info.currentPage'
        :totalPage='$store.state.mutations.search_comment_list_page_info.totalPage'
        ></public-change-page>
    </div>
</template>

<script>
//import publicSearch from '@/views/public-components/search'
import userTable from "./comments_table";
import publicChangePage from "@/views/public-components/changePage";
import config from "../config";
export default {
  data() {
    return {
      mark: "comments",
      searchData: config.searchData
    };
  },
  components: {
    //publicSearch,
    userTable,
    publicChangePage
  },

  created() {
    this.$store.dispatch("GET_COMMENT_LIST_INFO", {
      searchInof: this.$store.state.mutations.search_comment_list_info,
      publicPage: this.$store.state.mutations.search_comment_list_public_page
    });
  }
};
</script>

<style>
</style>
