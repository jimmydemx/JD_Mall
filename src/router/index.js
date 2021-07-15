import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@c/mainpage/index.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/goodslist",
        name: "goodslist",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // goodslist.Hash[].js
        component: () => import(/* webpackChunkName: "goodslist" */ "@c/Goods/Goodlist.vue")
    }, {
        path: "/goodsDetails",
        name: "goodsDetails",
        component: () => import(/* webpackChunkName: "goodsdetails" */ "@c/Goods/GoodsDetails.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;
