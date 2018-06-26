<template>
  <div>
    <public-search :data="searchConfig" :mark='mark' ></public-search>
    <role-user-table></role-user-table>
    <public-change-page 
    :mark='mark' 
    :currentPage='$store.state.mutations.search_role_list_page_info.currentPage'
    :totalPage='$store.state.mutations.search_role_list_page_info.totalPage'
   >
    </public-change-page>
  </div>
</template>
<script>
import config from "../config";
import publicSearch from "@/views/public-components/search";
import roleUserTable from "./role_table";
import publicChangePage from "@/views/public-components/changePage";
export default {
  data() {
    return {
      mark: "admin_role",
      searchConfig: config.lockedRoleSearch
    };
  },
  created() {
    this.$store.dispatch("GET_ROLE_LIST_INFO", {
      searchInfo: this.$store.state.mutations.search_role_list_info,
      publicPage: this.$store.state.mutations.search_role_list_public_page
    });
  },
  components: {
    publicSearch,
    roleUserTable,
    publicChangePage
  }
};
</script>
<style>
</style>
