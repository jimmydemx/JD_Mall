<template>
  <div id="app">
    <!-- <homepage/> -->
    <router-view/>
  </div>
</template>

<script>
// import homepage from "@c/mainpage/index.vue";
export default {
    components: {
        // homepage
    }
};
</script>>
<style lang="scss">
#app {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $bgColor;

}
</style>
