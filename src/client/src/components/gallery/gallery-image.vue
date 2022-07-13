<template>
  <div class="gallery-image-wrapper">
    <img :src="img" data-src="img" />
  </div>
</template>

<script setup lang="ts">
  const { img } = defineProps<{
    img: string
  }>()
</script>

<style scoped lang="stylus">
@import url('lightgallery/css/lightgallery.css')
@import url('lightgallery/css/lg-zoom.css')

img
  max-width 100%
  max-height 100%
  margin 0 auto
  border-radius 10px
.gallery
  width 100%
  height 100%
  position relative
  transition-property all
  transition-timing-function cubic-bezier(0.4, 0, 0.2, 1)
  transition-duration 800ms
.gallery-image-wrapper
  overflow hidden
  height 100%
  display flex
  align-items center
  justify-self center
  transition: all 3s ease-in-out
</style>