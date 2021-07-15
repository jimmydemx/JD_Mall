<template>
<div class='me'>
    <navigationbar :pageName="'个人中心'"  :isShowBack="false"/>
f32r2
</div>
</template>

<script>
import navigationbar from "@c/public/navigationbar.vue";
export default {
    components: { navigationbar }

};
</script>

<style>
.me{
    font-size: 14px;
}
</style>
