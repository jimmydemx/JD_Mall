<template>
    <div class="goods-list-page">
        <navigationbar @onLeftClick="onBackClick" :pageName="'Goods List'">
        <template v-slot:nav-right>
            <img :src="layoutType.icon" @click="onChangeLayoutTypeClick"  alt="">
        </template>
        </navigationbar>
        <div class="goods-list-page-content">
            <goodsoptions  @optionsChange="onGoodsOptionsChange" />
            <goods :layoutType="layoutType.type" :sort="sortType"/>
        </div>
    </div>

</template>

<script>
import goodsoptions from "@c/Goods/goodsOptions.vue";
import navigationbar from "@c/public/navigationbar.vue";
import goods from "@c/Goods/goods.vue";
export default {
    components: {
        navigationbar,
        goodsoptions,
        goods
    },
    data () {
        return {
            layoutTypeData: [
                {
                    // list
                    type: "1",
                    icon: require("@img/list-type.svg")
                }, {
                    // grid
                    type: "2",
                    icon: require("@img/grid-type.svg")
                }, {
                    // WaterFall
                    type: "3",
                    icon: require("@img/waterfall-type.svg")
                }
            ],
            layoutType: {
                type: "1",
                icon: require("@img/list-type.svg")
            },
            // sort out goods
            sortType: "1"
        };
    },
    methods: {
        onChangeLayoutTypeClick () {
            if (this.layoutType.type === "1") {
                this.layoutType = this.layoutTypeData[1];
            } else if (this.layoutType.type === "2") {
                this.layoutType = this.layoutTypeData[2];
            } else {
                this.layoutType = this.layoutTypeData[0];
            }
        },
        onBackClick () {
            this.$router.go(-1); // jump to the last router address
        },
        /*
            get events from good, parameter =GoodsOptions.id
        */
        onGoodsOptionsChange (sortType) {
            this.sortType = sortType;
            // console.log("this.sorttype", sortType);
        }

    },
    mounted () {

    }

};
</script>

<style lang="scss">
@import '@css/components/goodlist.scss';

</style>
