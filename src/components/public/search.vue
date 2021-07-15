<template>
  <div class="search" :style="{backgroundColor:bgColor}">
      <img class="search-icon" :src="icon" alt="">
      <span class="search-hint" :style="{color:hintColor}">Search Your Item</span>
  </div>
</template>

<script>
export default {
    props: {
        // icon in search box
        icon: {
            default: require("@img/search.svg"),
            type: String
        },
        hintColor: {
            default: "#999999"

        },
        bgColor: {
            default: "#ffffff",
            type: String
        }

    }

};
</script>

<style lang='scss'>

.search {
    background-color: white;
    width: 100%;
    margin:px2rem(6);
    border-radius: px2rem(22);
    display:flex;
    align-items: center;

    &-icon{
        margin-left: $marginSize;
        width:px2rem(16);
    }
    &-hint{
        margin-left:$marginSize;
        font-size: $minfoSize;
        color:$hintColor;
    }
}

</style>
