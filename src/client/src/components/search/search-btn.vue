<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['toggle-search'])

// 判断当前系统环境 是否是MAC
const isMac = ref(/macintosh|mac os x/i.test(navigator.userAgent))

// 监听键盘事件
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('toggle-search', 'close')
  }
  // The `Cmd+K` shortcut both opens and closes the modal.
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
    emit('toggle-search')
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKeyDown);
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown);
})

</script>
<template>
  <div class="search-button" @click.stop="$emit('toggle-search', 'open')">
    <span class="button-container">
      <icon-search-normal class="search-icon" />
      <span class="button-placeholder">Search</span>
    </span>
    <span class="button-keys">
      <span v-if="isMac" class="button-key">⌘</span>
      <span v-else class="button-key ctrl">Ctrl</span>
      <span class="button-key">K</span>
    </span>
  </div>
</template>
<style lang="stylus">
    .search-icon
       color var(--c-main-color)
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
    .ctrl
      font-size 12px
      width 25px
</style>
