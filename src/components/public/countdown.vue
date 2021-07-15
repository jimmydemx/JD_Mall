<template>
    <div class="count-down">
        <span class="count-down-end-time">Hurry!</span>
        <span class="count-down-surplus">{{timeCount | filterTime}}</span>

    </div>

</template>

<script>

export default {
    data () {
        return {
            Count: 6 * 3600 + 18 * 60 + 18
        };
    },
    computed: {
        timeCount: function () {
            this.p();
            return `${Math.floor(this.Count / 3600)}:${Math.floor(this.Count % 3600 / 60)}:${this.Count % 3600 % 60}`;
        }
    },
    methods: {
        p () {
            setTimeout(() => {
                if (this.Count !== 0) { this.Count = this.Count - 1; }
            }, 1000);
        }

    },
    beforeDestroy () {
        clearTimeout();
    }
};
</script>

<style  lang="scss">

.count-down{
    display:inline-block;
    font-size:$infoSize;
    margin-left:$marginSize;

    span{
        display:inline-block;
        padding: px2rem(2) px2rem(4);
    }

    &-end-time{
        background-color: $mainColor;
        border-top-left-radius: px2rem(4);
        border-bottom-left-radius: px2rem(4);
        border:px2rem(1) solid $mainColor;
        color:white;

    }
    &-surplus{
        background-color: white;
        border-top-right-radius: px2rem(4);
        border-bottom-left-radius: px2rem(4);
        border:px2rem(1) solid $mainColor;
        color:$mainColor;
    }

}

</style>
