// https://dev.to/sabbirsobhani/font-awesome-with-vuejs-3-59ee
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "gitart-vue-dialog/dist/style.css";
import { GDialog } from "gitart-vue-dialog";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("GDialog", GDialog)
  .use(router)
  .mount("#app");
