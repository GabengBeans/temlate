<template>
    <div>
        <Tree :data="trees" show-checkbox multiple :render="renderContent"></Tree>
    </div>
</template>
<script>
import util from "@/libs/util";
export default {
  props: ["trees"],
  data() {
    return {
    };
  },

  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width:"1vw"
          }
        },
        [
          h("span", [
            h("span", data.name)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
              }
            },
          )
        ]
      );
    }
  }
};
</script>
<style>

</style>
