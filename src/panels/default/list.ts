import { readFileSync } from "fs";
import { join } from "path";
import { createApp, App, toRaw, Ref } from "vue";

export interface ListItem {
  /**
   * 列表显示的文本
   */
  text: string;
}
export function MyList(app: App) {
  app.component("MyList", {
    template: readFileSync(join(__dirname, "../../../static/template/vue/my-list.html"), "utf-8"),
    props: {
      data: {
        type: Array<ListItem>,
        default() {
          return [];
        },
      },
      height: {
        type: Number,
        default: 330,
      },
    },
    data() {
      return {
        selectedItem: null,
      };
    },
    emits: ["on-select"],
    created() {
      console.log("created");
    },
    methods: {
      onClick(item: Ref<ListItem>) {
        this.selectedItem = item;
        this.$emit("on-select", toRaw(item));
      },
      getStyle() {
        const ret = [];
        ret.push(`height:${this.$props.height}px`);
        return ret.join(";");
      },
      getItemStyle(item: ListItem) {
        const ret = [];
        let bgColor = item === this.selectedItem ? "red" : "";
        ret.push(`background-color:${bgColor}`);
        return ret.join(";");
      },
    },
  });
}
