<template>
  <div>
    <public-search :data='searchConfig' :mark='mark'></public-search>
    <admin-user-table></admin-user-table>
    <public-change-page :mark='mark' :currentPage='$store.state.mutations.search_admin_list_page_info.currentPage' :totalPage='$store.state.mutations.search_admin_list_page_info.totalPage'>
    </public-change-page>
  </div>
</template>
<script>
import config from "../config";
import publicSearch from "@/views/public-components/search";
import AdminUserTable from "./admin_table";
import publicChangePage from "@/views/public-components/changePage";
import ajax from "@/libs/requestApi";
import url from "@/libs/url";
export default {
  data() {
    return {
      mark: "admin_user",
      searchConfig: ""
    };
  },
  created() {
    this.$store.dispatch("GET_ADMIN_LIST_INFO", {
      searchInfo: this.$store.state.mutations.search_admin_list_info,
      publicPage: this.$store.state.mutations.search_admin_list_public_page
    });
    let params = {
      pageNo: 1,
      pageSize: 999
    };
    ajax
      .requestPost(url.search_admin_role_info_for_page, {}, params)
      .then(resp => {
        let obj = resp.data.data.items;
        let items = {};
        for (let x = 0; x < obj.length; x++) {
          if (obj[x].status == 1 && obj[x].id != 1) {
            items["op" + obj[x].id] = {
              num: obj[x].id,
              value: obj[x].roleName
            };
          }
        }
        Object.assign(config.lockedUserSearch.roleId.tag, items);
        this.searchConfig = config.lockedUserSearch;
      });
  },
  components: {
    publicSearch,
    AdminUserTable,
    publicChangePage
  }
};
</script>
<style>
</style>
