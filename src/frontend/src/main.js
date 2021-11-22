import Vue from "vue";
import { Fragment } from "vue-frag";
import App from "./App.vue";
import router from "./router";

Vue.component("Fragment", Fragment);

Vue.config.productionTip = false;

// TODO: удалить с приходом Vuex
Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
