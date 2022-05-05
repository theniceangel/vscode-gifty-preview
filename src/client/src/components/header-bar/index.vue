<script setup lang="ts">
</script>
<template>
    <div class="header-bar-wrapper">
        <div class="header-bar">
            <a href="/" class="icon">
                <img src="./gifty.png" alt="">
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
    img
        width 50px
        height 50px
</style>