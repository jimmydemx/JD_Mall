<template>

  <div class="mode-options">
      <div class="mode-options-item" v-for="(item,index) in dataSource" :key="index"
      @click="onItemclick(item)">
          <img :src="item.icon" alt="" class="mode-options-item-icon">
          <p class="mode-options-item-text">{{item.title}}</p>
           <!-- <router-link :to="{path:'/goodslist'}">121233</router-link> -->
         <!-- <router-view/> -->
      </div>

  </div>
</template>

<script>
export default {
    data: function () {
        return {
            dataSource: [
                {
                    id: "1",
                    icon: require("@img/jingDongChaoShi.png"),
                    title: "JD Mall"
                },
                {
                    id: "2",
                    icon: require("@img/haiTunQuanQiu.png"),
                    title: "Oversea"
                },
                {
                    id: "3",
                    icon: require("@img/jingDongFuShi.png"),
                    title: "Clothes"
                },
                {
                    id: "4",
                    icon: require("@img/jingDongShengXian.png"),
                    title: "Seafood"
                },
                {
                    id: "5",
                    icon: require("@img/jingDongDaoJia.png"),
                    title: "Home"
                },
                {
                    id: "6",
                    icon: require("@img/chongZhiJiaoFei.png"),
                    title: "Charge"
                },
                {
                    id: "7",
                    icon: require("@img/jingDongPinGou.png"),
                    title: "$ 0.99"
                },
                {
                    id: "8",
                    icon: require("@img/lingJuan.png"),
                    title: "Coupons"
                },
                {
                    id: "9",
                    icon: require("@img/zhuanQian.png"),
                    title: "Coins"
                },
                {
                    id: "10",
                    icon: require("@img/quanBu.png"),
                    title: "All"
                }
            ]
        };
    },
    methods: {
        onItemclick: function () {
            this.$router.push({
                name: "goodslist"
            });
        }

    }
};
</script>

<style lang="scss" scoped>

.mode-options{
  display: flex;
  flex-wrap: wrap;

    &-item{
        flex:0 0 20%;
        text-align: center;

        &-icon{
            width: 80%;

        }
        &-text{
            text-align: center;
            font-size:$minfoSize;
            margin: px2rem(6);

        }
    }
}
</style>
