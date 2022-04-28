<script setup lang="ts">
import IconSearchNormal from './icon-search-normal.vue'

const emit = defineEmits(['on-search-btn-click'])
const searchFn = () => {
    console.log('on-search-btn-click')
    emit('on-search-btn-click')
}
</script>
<template>
    <div class="search-button" @click.stop="searchFn">
        <span class="button-container">
            <icon-search-normal class="search-icon" />
            <span class="button-placeholder">Search</span>
        </span>
        <span class="button-keys">
            <span class="button-key">⌘</span>
            <span class="button-key">S</span>
        </span>
    </div>
</template>
<style lang="stylus">
    .search-icon
       color #f57d46
</style>
<style lang="stylus" scoped>
    .search-wrapper
        width 200px
        height 30px
        padding 0 10px
        border-radius 30px
        border 1px solid #ddd
    .search-button
        display inline-flex
        width 200px
        height 36px
        background var(--docsearch-searchbox-background)
        color var(--docsearch-muted-color)
        cursor pointer
        user-select none
        border 0
        border-radius 40px
        justify-content space-between
        align-items center
        margin 0 0 0 16px
        padding 0 8px
        font-weight 500
    .button-container
        display flex
        justify-content center
        align-items center
    .button-placeholder
        display inline-block
    .button-keys
        min-width calc(40px + 0.8em)
        display flex
    .button-key
        background var(--docsearch-key-gradient)
        box-shadow var(--docsearch-key-shadow)
        color var(--docsearch-muted-color)
        height 18px
        width 20px
        border-radius 3px
        justify-content center
        align-items center
        margin-right 0.4em
        padding-bottom 2px
        display flex
        position relative
        top -1px
</style>