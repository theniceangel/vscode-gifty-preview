<script setup lang="ts">
import IconGifty from '../../common/icons/icon-gifty.vue'
</script>
<template>
    <div class="header-bar-wrapper">
        <div class="header-bar">
            <a href="/" class="icon">
                <icon-gifty class="svg"/>
                <span>vscode-gifty-preview</span>
            </a>
            <slot></slot>
        </div>
    </div>
</template>
<style lang="stylus">
.header-bar-wrapper
    z-index 100
    width 100%
    position fixed
    background-color rgb(43 58 66 / 1)
    display flex
    justify-content center
.header-bar
    width 1024px
    color #1a6bac
    transition color .25s
    display flex
    align-items center
    justify-content space-between
    .icon
        display inline-flex
        height 50px
        align-items center
        text-decoration none
        color #fff
    .svg
        width 50px
        height 50px
</style>
