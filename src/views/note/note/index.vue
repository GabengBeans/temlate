<template>
    <div>
        <public-search :data='searchData' :mark='mark' ></public-search>
        <user-table ></user-table>
        <public-change-page
        :mark='mark'
        :currentPage='$store.state.mutations.search_note_list_page_info.currenPage'
        :totalPage='$store.state.mutations.search_note_list_page_info.totalPage'
        ></public-change-page>
    </div>
</template>

<script>
import publicSearch from "@/views/public-components/search";
import userTable from "./note_table";
import publicChangePage from "@/views/public-components/changePage";
import config from "../config";
export default {
  data() {
    return {
      mark: "note",
      searchData: config.searchNoteInfo
    };
  },
  components: {
    publicSearch,
    userTable,
    publicChangePage
  },

  created() {
    this.$store.dispatch("GET_NOTE_LIST_INFO", {
      searchInfo: this.$store.state.mutations.search_note_list_info,
      publicPage: this.$store.state.mutations.search_note_list_public_page
    });
  }
};
</script>

<style>
</style>
