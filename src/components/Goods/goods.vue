<template>
<!--
    this is the list for the comodities/items, there are 3 layout patterns:
    1. one item in one row: goods-list
    2. 2 items in one  row: goods-grid
    3. waterfall: waterfall

 -->

 <!--
     change the order of goods by click using order defined in this.GoodsOptions
     needs to define a method to re-order the goods
  -->
    <div class="goods" :class="layoutClass" :style="{height:goodViewHeight}">
        <div class="goods-item" :class="layoutItemClass" v-for="(item,index) in sortGoodsData"
        :key=index ref="goodsItem" :style="goodsItemStyles[index]" @click="onItemClick(item)">
            <img class="goods-item-img" :src="item.img" :style="imgStyle[index]">
            <div class="goods-item-desc">
                <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint':!item.isHave}">
                <direct v-if="item.isDirect"/>
                <outofstock v-if="!item.isHave"/>
                {{item.name}}
                </p>
                <div class="goods-item-desc-data">
                    <p class="goods-item-desc-data-price">${{item.price | priceValue}}</p>
                    <p class="goods-item-desc-data-volume">{{item.volume}} Sold</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import direct from "@c/Goods/direct.vue";
import outofstock from "@c/Goods/outofStock.vue";
export default {
    components: {
        direct, outofstock
    },
    props: {
        /*
            layoutType to recieve which layout partern
            will be used, depends on the click button of
            the user:
            sort:1=default 1-2=price high to low 1-3 sold amounted
                 2: in stock first 3, from JD first
        */
        layoutType: {
            type: String,
            default: "1"
        },
        sort: {
            type: String,
            default: "1"

        }

    },
    data () {
        return {
            goodsinfo: [],
            MAX_IMG_HEIGHT: 178,
            MIN_IMG_HEIGHT: 130,
            imgStyle: [],
            ITEM_MARGIN_SIZE: 8,
            goodsItemStyles: [],
            goodViewHeight: "100%",

            // Sorted to be presented
            sortGoodsData: [],

            // setting 3 layout pattern
            // one row layout
            // 2 item in one row layout
            layoutClass: "goods-grid",
            layoutItemClass: "goods-grid-item"
            // 2 items in one row layout
            // waterfall

        };
    },
    mounted () {
        this.initData();
    },
    methods: {
        initData: function () {
            this.$axios.get("/goods").then(({ data }) => {
                this.goodsinfo = data.list;
                this.setSortGoodsData();
                this.initLayout();
            }, error => console.log(error));
        },

        /*
            initLayout:initiate the layout

        */
        initLayout () {
            this.goodViewHeight = "100%";
            this.goodsItemStyle = [];
            this.imgStyle = [];

            // switch layout type

            switch (this.layoutType) {
            case "1":
                this.layoutClass = "goods-list";
                this.layoutItemClass = "goods-list-item";
                break;
            case "2":
                this.layoutClass = "goods-grid";
                this.layoutItemClass = "goods-grid-item";
                break;
            case "3":
                this.layoutClass = "goods-waterfall";
                this.layoutItemClass = "goods-waterfall-item";
                this.initImgStyles();
                // call the Waterfall,after all DOM are created complted
                this.$nextTick(() => {
                    this.initWaterfall();
                });
                break;
            }
        },

        /*
        create a random height form each pic
        */
        imgHeight: function () {
            // Math.random() 0=1 * Height range + lowest Height
            var result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT);
            return result;
        },
        /*
            apply randowm height to pic
        */
        initImgStyles () {
            this.goodsinfo.forEach(item => {
                var imgHeight = this.imgHeight() + "px";
                this.imgStyle.push({
                    height: imgHeight
                });
            });
        },
        /*
            create Waterfall:
            1. get all item element
            2. get height of all item, set margin for each item
            3. leftHeightTotal, rightHeightTotal: relateve to the top of Waterfall
            4. the smaller one(of  leftHeightTotal, rightHeightTotal) will get the left pic below
        */
        initWaterfall: function () {
            // get all item
            var $goodsItems = this.$refs.goodsItem;
            if (!$goodsItems) return;

            // create 2 variable
            var leftHeightTotal = 0;
            var rightHeightTotal = 0;
            $goodsItems.forEach(($el, index) => {
                var goodsItemStyle = {};
                var elHeihgt = $el.clientHeight + this.ITEM_MARGIN_SIZE;
                // comprare the height of left and right side
                // if left<right put next pic on the left ,else on the right
                if (leftHeightTotal <= rightHeightTotal) {
                    goodsItemStyle = {
                        left: "0px",
                        top: leftHeightTotal + "px"
                    };
                    // update the left height
                    leftHeightTotal += elHeihgt;
                } else {
                    goodsItemStyle = {
                        right: "0px",
                        top: rightHeightTotal + "px"
                    };
                    rightHeightTotal += elHeihgt;
                }
                // get all the style
                this.goodsItemStyles.push(goodsItemStyle);
            });
            // compare the height of left and right
            this.goodViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + "px";
        },

        /*
            sort out goods by order,
            1, default, 2....
        */
        setSortGoodsData: function () {
            switch (this.sort) {
            // default
            case "1":
                // copy goodsinfo (from axios) to sortGoodsData
                this.sortGoodsData = this.goodsinfo.slice(0);
                break;
            // price high to low
            case "1-2":
                this.sortGoodsData = this.getSortGoodsDataFromKey("price");
                break;
            // sold hight to low
            case "1-3":
                this.sortGoodsData = this.getSortGoodsDataFromKey("volume");
                break;
            case "2":
                this.sortGoodsData = this.getSortGoodsDataFromKey("isHave");
                // console.log(this.getSortGoodsDataFromKey("isHave"));
                break;
            case "3":
                this.sortGoodsData = this.getSortGoodsDataFromKey("isDirect");
                break;
            }
        },

        /*
            this is to sort out in many different cases
            Array.prototype.sort(a,b),return 1/-1/0 a<b? a b: b a
            if a=b order remain the same

        */
        getSortGoodsDataFromKey (key) {
            // console.log(this.sortGoodsData[0][key]);
            return this.sortGoodsData.sort((goods1, goods2) => {
                var v1 = goods1[key];
                var v2 = goods2[key];

                // compare v1 v2
                // boolean (in stock from JD)
                if (typeof v1 === "boolean") {
                    if (v1) {
                        return -1;
                    }
                    if (v2) {
                        return 1;
                    }
                    return 0;
                }
                // type=float(price)
                if (parseFloat(v1) >= parseFloat(v2)) {
                    return -1;
                } return 1;
            });
        },

        /*
            click on the goods and jump to detailed page
        */
        onItemClick (item) {
            // if the item out of stock, no jump
            if (!item.isHave) {
                alert("this item is out of Stock");
                return;
            }
            this.$router.push({
                name: "goodsDetails",
                params: {
                    goods: item

                }
            });
        }

    },
    watch: {
        layoutType () {
            this.initLayout();
        },
        sort (newv) {
            // console.log("sort", this.sort);
            this.setSortGoodsData();
        }

    }
};
</script>

<style lang="scss">
    @import "@css/components/goods.scss"

</style>
