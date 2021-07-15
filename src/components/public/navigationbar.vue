<template>
<!--
    use Slot for the navigation bar
    the navigation bar changesdepenending on toolbar

 -->
 <div class="nav-bar z-index-max" :class="{'bottom-line':pageName}" :style="navBarStyle">
     <div class="left" @click="$emit('onLeftClick')">
         <img src="@img/back.svg" alt="" v-if="isShowBack">
         <slot name="nav-left"></slot>
     </div>

     <div class="center" v-if="pageName">
         <span class="page-title" v-if="isDefault">{{pageName}}</span>
         <slot name="nav-center"></slot>
     </div>

     <div class="right">
         <slot name="nav-right"></slot>

     </div>

 </div>
</template>

<script>
export default {
    props: {
        // title of the back
        pageName: {
            type: String,
            default: ""

        },
        isDefault: {
            default: true,
            type: Boolean
        },
        /*
            show the back button or not
        */
        isShowBack: {
            type: Boolean,
            default: true

        },
        navBarStyle: {
            type: Object,
            default: function () {
                return {
                    backgroundColor: "white"
                };
            }

        }
    }

};
</script>

<style lang="scss">
@import "@css/components/navigationbar.scss"

</style>
