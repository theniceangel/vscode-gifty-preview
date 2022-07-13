<template>
  <div class="gallery-image-name">{{ name }}</div>
</template>

<script setup lang="ts">
const { name } = defineProps<{
  name: string
}>()
</script>

<style scoped lang="stylus">
@import url('lightgallery/css/lightgallery.css')
@import url('lightgallery/css/lg-zoom.css')
.gallery-image-name
  color #333
  font-weight bold
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  text-align center
</style>