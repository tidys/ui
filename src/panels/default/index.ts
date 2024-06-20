import { readFileSync } from "fs-extra";
import { join } from "path";
import { createApp, App, ref } from "vue";
import { ListItem, MyList } from "./list";
const panelDataMap = new WeakMap<any, App>();
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
  listeners: {
    show() {
      console.log("show");
    },
    hide() {
      console.log("hide");
    },
  },
  template: readFileSync(join(__dirname, "../../../static/template/default/index.html"), "utf-8"),
  style: readFileSync(join(__dirname, "../../../static/style/default/index.css"), "utf-8"),
  $: {
    app: "#app",
    text: "#text",
  },
  methods: {
    hello() {
      if (this.$.text) {
        this.$.text.innerHTML = "hello";
        console.log("[cocos-panel-html.default]: hello");
      }
    },
  },
  ready() {
    if (this.$.text) {
      //   this.$.text.innerHTML = "Hello Cocos.";
    }
    const listArray = ref<ListItem[]>([]);
    if (this.$.app) {
      const app = createApp({
        data() {
          return {
            listArray,
          };
        },
        created() {
          for (let i = 0; i < 10; i++) {
            listArray.value.push({ text: `${i}` });
          }
        },
        methods: {
          onSelect(data: ListItem) {
            console.log(data.text);
          },
          onAdd() {
            listArray.value.push({ text: listArray.value.length.toString() });
          },
          onPop() {
            if (listArray.value.length) {
              listArray.value.pop();
            }
          },
        },
      });
      app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("ui-");
      MyList(app);

      app.mount(this.$.app);
      panelDataMap.set(this, app);
    }
  },
  beforeClose() {},
  close() {
    const app = panelDataMap.get(this);
    if (app) {
      app.unmount();
    }
  },
});
