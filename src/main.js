import Vue from "vue";
import App from "./App.vue";
import "@js/htmlFontSize";
import "@js/js/axios.config.js";
import "@js/js/filters.js";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
