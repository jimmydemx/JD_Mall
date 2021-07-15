import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = "https://www.fastmock.site/mock/fff8fab997109159872653f2d8ea8b98/hybrid_mall";

// interceptors all request will be first put in interceptors

axios.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    return Promise.reject(error);
});

Vue.prototype.$axios = axios;
