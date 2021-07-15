<template>
 <div class="seconds">
     <div class="seconds-wrap">
    <div>
        <span class="seconds-wrap-title">What's Hot</span>
        <countdown/>
     </div>
     <div class="seconds-content">
         <div class="seconds-content-item" v-for="(item, index) in dataSource" :key="index">
         <img class="seconds-content-item-icon" :src="item.icon" alt="" >
         <p class="seconds-content-item-price">{{item.price | priceValue}}</p>
         <p class="seconds-content-item-old-price">{{item.oldPrice | priceValue}}</p>
     </div>
    </div>
     </div>
 </div>
</template>

<script>
import countdown from "@c/public/countdown.vue";
export default {
    components: { countdown },
    props: {
        dataSource: {
            type: Array,
            required: true,
            default: function () {
                return [];
            }

        }

    }

};
</script>

<style lang="scss">

.seconds{
    border-radius:$radiusSize;
    margin:$marginSize;

    &-wrap{
        display:flex;
        flex-direction: column;
        padding:$marginSize;

        &-title{
            font-size:$titleSize;
        }
           }
    &-content{
        padding:$marginSize 0;
        display:flex;
        overflow:hidden;
        overflow-x:scroll;

        &-item{
            padding: 0 px2rem(12);
            text-align: center;

            &-icon{
                width:px2rem(66);
                height: px2rem(66);
            }
            &-price{
                color:$mainColor;
                font-size: $titleSize;
            }
            &-old-price{
                color:$hintColor;
                font-size: $infoSize;
                margin-top: px2rem(6);
                text-decoration-line: line-through;

            }
        }
    }
}
</style>
