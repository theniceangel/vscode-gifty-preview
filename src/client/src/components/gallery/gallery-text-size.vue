<template>
  <div class="gallery-image-size">尺寸: {{ item.width }} x {{ item.height }} ({{ item.size }})</div>
</template>

<script setup lang="ts">
import type { ImageMetaData } from '../search/autocompletePlugin'

const { item } = defineProps<{
  item: ImageMetaData
}>()
</script>

<style scoped lang="stylus">
@import url('lightgallery/css/lightgallery.css')
@import url('lightgallery/css/lg-zoom.css')
.gallery-image-size
  color var(--c-light-color)
  text-align center
</style>