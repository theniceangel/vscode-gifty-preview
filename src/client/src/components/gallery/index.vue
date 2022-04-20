<script setup lang="ts">
import Lightgallery from 'lightgallery'
import lgZoom from 'lightgallery/plugins/zoom'
import Menu from '../menu/index.vue'
import { onMounted, ref, inject } from 'vue'

type ImageMetaData = {
  remoteUrl: string
  size: string,
  width: number,
  height: number,
  name: string
}

const INFO = inject('imagesMetaData') as ImageMetaData[]

const galleryRef = ref(null)
const createLightBox = () => {
  Lightgallery(galleryRef.value!, {
    speed: 500,
    plugins: [lgZoom],
    download: false
  })
}
onMounted(() => {
  createLightBox()
})

const getLargeSize = (width: number, height: number) => {
  return `${width}-${height}`
}

</script>

<template>

  <div class="gallery-container" ref="galleryRef" v-if="INFO.length">
    <figure class="gallery-item" v-for="(item, index) in INFO" :key="index" :data-src="item.remoteUrl"
      :data-lg-size="getLargeSize(item.width, item.height)">
      <div class="gallery-image-wrapper">
        <img :src="item.remoteUrl" />
      </div>
      <figcaption>
        <div class="gallery-image-name">{{ item.name }}</div>
        <div class="gallery-image-size">尺寸: {{ item.width }} x {{ item.height }} ({{ item.size }})</div>
        <Menu :url="item.remoteUrl" />
      </figcaption>
    </figure>
  </div>
</template>

<style lang="stylus">
@import url('lightgallery/css/lightgallery.css')
@import url('lightgallery/css/lg-zoom.css')
.gallery-container
  display flex
  justify-content flex-start
  flex-wrap wrap
.gallery-item
  width 250px
  height 270px
  padding 20px 10px
  margin 0
  text-align center
  transition background-color .5s linear
  &:hover
    background-color var(--c-hover-color)
    cursor pointer
.gallery-image-wrapper
  overflow hidden
  height 70%
  display flex
  align-items center
  justify-self center
  img
    max-width 100%
    max-height 100%
    margin 0 auto
    border-radius 10px
.gallery-image-name
  color #333
  font-weight bold
  margin 10px 0 5px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
.gallery-image-size
  color var(--c-light-color)
</style>