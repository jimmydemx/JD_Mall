<template>
<div class="goods-details">
    <navigationbar :isShowBack="false" :navBarStyle="navBarStyle">
         <template v-slot:nav-left>
            <div class="goods-details-nav-left" @click="onBackClick">
                <img src="@img/back-2.svg" alt="">
            </div>
        </template>
    </navigationbar>
    <div class="goods-details-content">
        <myswiper :height="SWIPER_IMAGE_HEIGHT+'px'" :swiperImgs="goodsData.swiperImgs"
        :paginationType="'2'"
        />

            <div class="goods-details-content-desc">

                <div class="goods-details-content-desc-item">
                     <!-- price -->
                    <p class="goods-details-content-desc-item-price">${{goodsData.price}}</p>
                    <!-- name -->
                    <p class="goods-details-content-desc-item-name">

                      <!-- direct from JD -->
                     <direct v-if="goodsData.isDirect"/>
                     {{goodsData.name}}
                    </p>
                </div>
                <div class="goods-details-content-desc-item">
                     <!-- chosen goods -->
                    <p class="goods-details-content-desc-item-select">chosen
                          <span class="single-row-text">{{goodsData.name}}</span>
                    </p>

                     <!-- additonal support -->
                    <div class="goods-details-content-desc-item-support">
                         <ul class="goods-details-content-desc-item-support-list">
                            <li class="goods-details-content-desc-item-support-list-item"
                              v-for="(item, index) in attachData" :key="index">
                                 <img src="@img/support.svg" alt="">
                                 <span>{{item}}</span>
                            </li>
                         </ul>
                    </div>
                </div>
                <!-- description of goods -->
                <div class="goods-details-content-desc-detail">
                    <img v-for="(item,index) in goodsData.detailImgs" :key='index' :scr="item" alt="">
                </div>

            </div>

    </div>

        <!-- shopping cart -->
        <div class="goods-details-buy">
            <div class="goods-details-buy-add">
                Add to Cart
            </div>
            <div class="goods-details-buy-now">
                Buy Now
            </div>
        </div>

</div>
</template>

<script>
import navigationbar from "@c/public/navigationbar.vue";
import myswiper from "@c/public/mySwiper.vue";
import direct from "@c/Goods/direct.vue";
export default {
    components: {
        navigationbar, myswiper, direct
    },
    data () {
        return {
            SWIPER_IMAGE_HEIGHT: 364,
            navBarStyle: {
                backgroundColor: ""
            },
            goodsData: {},
            attachData: [
                "Overseas",
                "Warrenty",
                "One-Day delivery",
                "no Coupon allowed",
                "3-day delivery",
                "free delivery"

            ]

        };
    },
    methods: {
        onBackClick () {
            this.$router.go(-1);
        }

    },
    mounted () {
        this.goodsData = this.$route.params.goods;
    }

};
</script>

<style lang="scss">
@import "@css/components/goodsDetails.scss";

</style>
