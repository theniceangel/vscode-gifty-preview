<script setup lang="ts">
import Lightgallery from 'lightgallery'
import lgZoom from 'lightgallery/plugins/zoom'
import Menu from '../menu/index.vue'
import { searchData } from '../search/autocompletePlugin'
import { onMounted, ref, toRefs } from 'vue'
import galleryImage from './gallery-image.vue'
import galleryTextSize from './gallery-text-size.vue'
import galleryTextName from './gallery-text-name.vue'
import starportSlot from './starport-slot.vue'

const INFO = toRefs(searchData).searchRes

const duration = ref(800)
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

const getLargeSize = (width: number|string, height: number|string) => {
  return `${width}-${height}`
}

</script>

<template>
  <figure
    class="gallery-item"
    v-for="(item, index) in INFO"
    :key="index"
    :data-src="item.remoteUrl"
    :data-lg-size="getLargeSize(item.width, item.height)"
  >
    <starport-slot type="image" :duration="duration" :index="index">
      <gallery-image :img="item.remoteUrl"/>
    </starport-slot>
    <figcaption class="text-box">
      <starport-slot type="text-name" :duration="duration" :index="index">
        <gallery-text-name :name="item.name"/>
      </starport-slot>
      <starport-slot type="text-size" :duration="duration" :index="index">
        <gallery-text-size :item="item"/>
      </starport-slot>
      <starport-slot type="text-icon" :duration="duration" :index="index">
        <Menu :url="item.remoteUrl" />
      </starport-slot>
    </figcaption>
  </figure>
</template>