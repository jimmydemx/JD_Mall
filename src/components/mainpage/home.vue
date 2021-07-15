<template>
<div class='home' @scroll="onScrollChange">
    <navigationbar :pageName="'home'" :isShowBack="false" :navBarStyle="navBarStyle">
        <!-- define the slot ->index/me/art, use named slot-->
        <!-- left -->
            <template v-slot:nav-left>
                <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
            </template>
        <!-- middle -->
            <template v-slot:nav-center>
                <search :bgColor="navBarCurrentSlotStyle.bgColor" :hintColor="navBarCurrentSlotStyle.hintColor" :icon="navBarCurrentSlotStyle.icon"></search>
            </template>
        <!-- right -->
            <template v-slot:nav-right>
                <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
            </template>
    </navigationbar>
 <div class="home-content">
     <my-swiper :swiperImgs="swiperImgs" :height="SwiperHeight"/>
     <mactivity  class="activity-520">
         <div  v-for="(item,index) in activity" :key=index>
             <img :src="item.icon" alt="">
         </div>
     </mactivity>

     <mode-options/>

     <seconds :dataSource="SecondsData"/>

     <mactivity>
         <div class="activity-shoppingnow">
             <img :src="shoppingnow" alt=""/>
         </div>
     </mactivity>

    <goods/>
 </div>
</div>

</template>

<script>
import MySwiper from "@c/public/mySwiper.vue";
import mactivity from "@c/public/activity.vue";
import modeOptions from "@c/public/modeoptions.vue";
import seconds from "@c/public/seconds.vue";
import goods from "@c/Goods/goods.vue";
import navigationbar from "@c/public/navigationbar.vue";
import search from "@c/public/search.vue";

export default {
    components: {
        MySwiper, mactivity, modeOptions, seconds, goods, navigationbar, search
    },
    data () {
        return {
            shoppingnow: require("@img/haoHuoQiang.gif"),
            swiperImgs: [],
            SwiperHeight: "184px",
            activity: [],
            SecondsData: [],
            // keep the pattern of topbar :scroll/afterscroll
            navBarSlotStyle: {
                normal: {
                    leftIcon: require("@img/more-white.svg"),
                    search: {
                        bgColor: "#fffff",
                        hintColor: "#999999",
                        icon: require("@img/search.svg")

                    },
                    rightIcon: require("@img/message-white.svg")
                },
                highlight: {
                    leftIcon: require("@img/more.svg"),
                    search: {
                        bgColor: "#d7d7d7",
                        hintColor: "#ffffff",
                        icon: require("@img/search-white.svg")
                    },
                    rightIcon: require("@img/message.svg")
                }
            },
            navBarCurrentSlotStyle: {

            },
            navBarStyle: {
                position: "fixed",
                backgroundColor: ""
            },
            // scroll value
            scrollTopValue: -1,
            // anchor value
            ANCHOR_SCROLL_TOP: 160
        };
    },
    mounted () {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
        this.initData();
    },
    methods: {
        initData () {
            this.$axios.all([
                this.$axios.get("/swiper"),
                this.$axios.get("/activities"),
                this.$axios.get("/seconds")
            ]).then(this.$axios.spread((swiperData, activityData, SecondsData) => {
                // console.log("123", swiperData, activityData);
                this.swiperImgs = swiperData.data.list.map((item) => item.icon);
                this.activity = activityData.data.list;
                this.SecondsData = SecondsData.data.list;
                console.log(this.SecondsData);
            }));
            // this.$axios.get("/swiper").then(({ data }) => {
            //     console.log(data.list);
            //     this.swiperImgs = data.list.map((item) => item.icon);
            //     // console.log(this.swiperImgs);
            // }, (error) => {
            //     return Promise.reject(error);
            // });
            // this.$axios.get("/activities").then(({ data }) => {
            //     this.activity = data.list;
            //     console.log(data.list);
            // });
        },
        /*
            1.the distance of scroll, compare with ANCHOR_SCROLL_TOP
            2.navBar background Opacity
                current scroll/ANCHOR_SCROLL_TOP Opacity
            3.  Opacity>=1 change navBar normal->highlight
        */
        onScrollChange: function ($event) {
            this.scrollTopValue = $event.target.scrollTop;
            // navBar Opacity

            var opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;

            if (opacity >= 1) {
                this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
            } else {
                this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
            }

            this.navBarStyle.backgroundColor = "rgba(255,255,255," + opacity + ")";
        }
    }

};

</script>

<style lang="scss">
@import '@css/pages/home.scss'

</style>
