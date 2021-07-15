<template>
<div class="goods-options z-index-2">

    <ul class="goods-options-list">
        <li class="goods-options-list-item">
            <div class="goods-options-list-item-content" v-for="(item,index) in  optionsData" :key=index
             @click="onSelect(index)">
                <span class="goods-options-list-item-content-name" :class="{'content-name':index===selectOptions.id-1}">{{item.name}}</span>
                <span class="goods-options-list-item-content-pointer triangle"
                :class="[!DropdownGoods && index===selectOptions.id-1?'goods-options-list-item-content-pointer-open':'goods-options-list-item-content-pointer-close']" v-if="item.subs"></span>
                <!-- 'reverse-triangle':DropdownGoods&&index===selectOptions.id-1} -->
            </div>
        </li>
    </ul>

    <transition name="fold-height">
        <div class="options-sub-content z-index-2" v-show="DropdownGoods">
            <ul class="options-sub-content-list">
                <li class="options-sub-content-list-item" v-for="(item, index) in selectOptions.subs" :key=index
                @click="onSelectSub(index)">
                    <div class="options-sub-content-list-item-content">
                        <span class="options-sub-content-list-item-content-name" :class="{'content-name':index===selectSub}">{{item.name}}</span>
                        <img src="@img/options-select.svg" alt="" class="options-sub-content-list-item-content-select" v-if="index===selectSub">
                    </div>
                </li>
            </ul>
        </div>
    </transition>

    <!-- cover the background items grey -->
    <div class="cover" v-show="DropdownGoods" @click="DropdownGoods=false">

    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            DropdownGoods: false,
            selectOptions: {},
            selectSub: 0,
            optionsData: [ {
                id: "1",
                name: "Default",
                subs: [
                    {
                        id: "1",
                        name: "Default"
                    },
                    {
                        id: "1-2",
                        name: "Price:(High to Low)"

                    },
                    {
                        id: "1-3",
                        name: "Popularity(High to Low)"

                    }

                ]
            }, {
                id: "2",
                name: "In Stock first"
            }, {
                id: "3",
                name: "from JD first"

            }

            ]

        };
    },
    mounted () {
        this.selectOptions = this.optionsData[0];
    },
    methods: {
        onSelect (index) {
            this.selectOptions = this.optionsData.filter(item => index + 1 === parseInt(item.id))[0];
            if (this.selectOptions.id - 1 === 0) {
                this.DropdownGoods = !this.DropdownGoods;
            }
            // console.log(this.selectOptions.id - 1);
        },
        onSelectSub (index) {
            // console.log(index);
            this.selectSub = index;
            this.selectOptions = this.optionsData[0].subs[index];
            // console.log(this.optionsData[0].subs[index]);
        }
    },
    watch: {
        selectOptions (newV) {
            /*
                monitor the selection

            */
            this.$emit("optionsChange", newV.id);
        }
    },

    beforeDestroy () {
        this.$off("optionsChange");
    }

};
</script>

<style lang="scss">
@import "@css/components/goodsOptions.scss";
.content-name{
    color:$mainColor;
}

</style>
