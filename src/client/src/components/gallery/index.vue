<script setup lang="ts">
import Lightgallery from 'lightgallery'
import lgZoom from 'lightgallery/plugins/zoom'
import { searchData } from '../search/autocompletePlugin'
import { onMounted, ref, toRefs } from 'vue'
import ListGridIcon from '../list-grid-icon/index.vue'
import figureList from './figure-list.vue'

const INFO = toRefs(searchData).searchRes

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

const showGrid = ref(true)
const switchListOrgrid = (isGridFlag: boolean) => {
  showGrid.value = isGridFlag
}
</script>

<template>

  <div class="switch">
    <ListGridIcon @change="switchListOrgrid" />
  </div>
  <div class="gallery-container" :class="showGrid ? 'grid' : 'list'" ref="galleryRef" v-if="INFO.length">
    <figure-list key="key1" v-if="showGrid"></figure-list>
    <figure-list key="key2" v-else></figure-list>
  </div>
</template>

<style lang="stylus">
@import url('lightgallery/css/lightgallery.css')
@import url('lightgallery/css/lg-zoom.css')

.gallery-container
  padding-top 100px
  padding-right 120px
  transition all 3s ease-in-out
  display grid
  &.grid
    grid-template-columns: repeat(auto-fill, 270px)
    .text-box
      height 90px
    .gallery-item
      width 250px
      height 290px
      margin 20px 10px
      text-align center
      transition background-color .5s linear
      &:hover
        background-color var(--c-hover-color)
        cursor pointer
    .gallery-text-icon, .gallery-text-size
      width 100%
      height calc(100% / 3)
    .gallery-text-name
      padding 10px 0 5px
      width 100%
      height calc(100% / 3)
    .gallery-image
      width 100%
      height 65.172%
    img
      max-width 100%
      max-height 100%
      margin 0 auto
      border-radius 10px
  &.list
    grid-template-columns 1fr
    .text-box
      flex 1
      display flex
      align-items center
      justify-content space-around
      text-align center
      height 75px
    .gallery-image
      height 100%
      width 98px
      margin-right 30px
    .gallery-text-name, .gallery-text-size, .gallery-text-icon
      width 100%
      height calc(100% / 3)
    .gallery-item
      display flex
      align-items center
      // width 683px
      height 140px
      &:hover
        background-color var(--c-hover-color)
        cursor pointer
      img
        max-width 100%
        max-height 100%
        margin 0 auto
        border-radius 10px
.switch
  position fixed
  top 80px
  right 50px
  z-index 99
</style>
