<template>
  <swiper   :slides-per-view="3"
    :space-between="50" :options="swiperOptions">
      <swiper-slide v-for="(item,index) in swiperImgs" :key="index">
          <img :style="{height:height}" :src="item" alt="" class="swiper-slide-img">

     </swiper-slide>

       <template v-slot:pagination>
            <div class="swiper-pagination"></div>
        </template>
  </swiper>
</template>

<script>
// import "swiper/swiper-bundle.css";
// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import Vue from "vue";
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay } from "swiper/swiper.esm";
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter";
import "swiper/swiper-bundle.css";
SwiperClass.use([ Pagination, Mousewheel, Autoplay ]);
Vue.use(getAwesomeSwiper(SwiperClass));
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);

export default {
    props: {
        // slide height
        height: {
            type: String,
            default: "auto"
        },
        swiperImgs: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },

        /*
            pagination have 2 types(or more)
            paginationType=1: dot
            paginationType=2: numbers
        */
        paginationType: {
            type: String,
            default: "1"

        }

    },
    components: {
        Swiper,
        SwiperSlide
    },
    data () {
        return {
            swiperOptions: {
                pagination: {
                    // el: ".swiper-pagination",
                    // type: "bullets",
                    // bulletClass: "custom-bullet-class"
                },
                loop: true,
                speed: 800,
                autoplay: {
                    disableOnInteraction: false,
                    delay: 1000
                },
                autoHeight: true

            }

        };
    },
    methods: {
        /*
            configure diffrent pagination layout
        */
        initPaginationLayout () {
            //  console.log(this.paginationType);
            switch (this.paginationType) {
            case "1":
                this.swiperOptions.pagination = {
                    el: ".swiper-pagination",
                    type: "bullets",
                    bulletClass: "custom-bullet-class"

                };
                break;
            case "2":
                this.swiperOptions.pagination = {
                    el: ".swiper-pagination",
                    type: "fraction"

                };
                console.log(this.swiperOptions.pagination);
                break;
            }
        }

    },
    created () {
        this.initPaginationLayout();
    }
};
</script>

<style lang='scss'>
    .swiper-slide-img{
        width: 100vw;
    }
    .swiper-pagination{
        bottom: px2rem(12);
        .custom-bullet-class{
            box-sizing: border-box;
            border-radius: 100%;
            height:px2rem(6);
            width:px2rem(6);
            border:px2rem(1) solid #fff;
            margin: 0 px2rem(4);
            display:inline-block;
            opacity:1;
        .swiper-pagination-bullet-active{
            background-color: white;

        }
        }
    }
    .swiper-pagination-fraction{
        //position: relative;
        left:auto;
        right:0;
        width:auto;
        font-size:$infoSize;
        background-color: rgba(0,0,0,0.3);
        padding: px2rem(6) px2rem(18);
        border-top-left-radius: px2rem(16);
        border-bottom-left-radius: px2rem(16);
        bottom:px2rem(32);
        color:white;

        .swiper-pagination-current{
            font-size: $titleSize;
            font-weight: bold;
        }
    }

</style>
