<template>
    <div  class="tool-bar">
        <div class="tool-bar-item" v-for="(item,index) in toolBarData" :key="index" @click="select(item,index,$event)">
            <img class="tool-bar-item-img" :src="[index===selectItemindex? item.hIcon: item.nIcon]" alt="">
            <p class="tool-bar-item-text" :class="{'tool-bar-item-text-h':index===selectItemindex}">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
export default {

    data () {
        return {
            selectItemindex: 0,
            toolBarData: [
                {
                    // default img
                    nIcon: require("@img/home-n.svg"),
                    // acitve
                    hIcon: require("@img/home-h.svg"),
                    name: "Home",
                    // compoenent to load
                    componentName: "home"

                },
                {
                    // default img
                    nIcon: require("@img/shopping-n.svg"),
                    // acitve
                    hIcon: require("@img/shopping-h.svg"),
                    name: "Cart",
                    // compoenent to load
                    componentName: "cart"

                },
                {
                    // default img
                    nIcon: require("@img/my-n.svg"),
                    // acitve
                    hIcon: require("@img/my-h.svg"),
                    name: "Me",
                    // compoenent to load
                    componentName: "me"

                }

            ]

        };
    },

    methods: {
        select (item, index, e) {
            this.selectItemindex = index;
            // console.log(e.target);
            this.$emit("onChangeSelect", item.componentName);
        }
    }

};
</script>

<style lang="scss">
@import'@css/components/toolbar.scss';
// .tool-bar{
//     display: flex;
//     height: px2rem(46);
//     align-items: center;
//     background-color: white;
//     box-shadow: 0 0 16px rgba($color: #000000, $alpha: 0.2);
//     border-top: 1px solid #e5e5e5;
//     &-item{
//         flex:1;

//         &-img{
//             display: block;
//             width: px2rem(22);
//             height: px2rem(22);
//             margin:0 auto;
//         }
//         &-text{
//             text-align: center;
//             font-size: $infoSize;
//             margin-top: px2rem(4);

//             &-h{
//                 color:$buttonBgColor;
//             }

//         }

//     }

// }

</style>
