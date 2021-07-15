<template>
  <div class="mp">
   <component :is="dycomponent" class="mp-component"/>
  <toolbar class="mp-toolvar" @onChangeSelect="whichComponent"/>
  </div>
</template>

<script>
import toolbar from "@c/public/toolbar.vue";
export default {
    components: {
        toolbar,
        home: () => import("@c/mainpage/home.vue"),
        cart: () => import("@c/mainpage/cart.vue"),
        me: () => import("@c/mainpage/me.vue")
    },
    data () {
        return {
            dycomponent: "home"
        };
    },
    methods: {
        whichComponent (comp) {
            this.dycomponent = comp;
            console.log(this.dycomponent);
        }
    }

};
</script>

<style lang="scss" scoped>
.mp{
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &-component{

    flex:1 0 0;

  }
  &-toolbar{
    flex:0 0 0;
  }
}
</style>
