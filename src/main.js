import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
require("@/assets/main.scss");

import axios from "axios";
axios.defaults.baseURL = "https://apiecom.coursesbin.com";
createApp(App)
  .use(store)
  .use(router, axios)
  .mount("#app");
