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
      index: {
        type: Number,
        default: 0,
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
    emits: ["on-select", "update:index"],
    created() {
      console.log("created");
    },
    mounted() {
      this.selectedItem = this.$props.data[this.$props.index] || null;
    },
    watch: {
      index(val) {
        this.selectedItem = this.$props.data[val] || null;
      },
    },
    methods: {
      onClick(item: Ref<ListItem>) {
        this.selectedItem = item;
        const idx = this.$props.data.indexOf(item);
        this.$emit("update:index", idx);
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
