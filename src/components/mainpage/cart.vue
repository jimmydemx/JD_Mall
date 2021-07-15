<template>
<div class="cart">
<navigationbar :pageName="'购物'" :isShowBack="false"/>
12313
</div>
</template>

<script>
import navigationbar from "@c/public/navigationbar.vue";
export default {
    components: { navigationbar }

};
</script>

<style>
.cart{
   font-size: 14px;
}
</style>
