 <template>
  <div class="search-model-wrapper" v-show="show" @click="closeFn">
    <div id="autocomplete" class="autocomplete"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { createAutocomplate } from './createAutocomplate'
import { ImageMetaData, createAutocompletePlugin } from './autocompletePlugin'

const imgList = inject('imagesMetaData') as ImageMetaData[]

const emit = defineEmits(['close'])
const closeFn = (e: any) => {
  if (e.target.className === 'search-model-wrapper') {
    emit('close')
  }
}
const submitFn = (query?: string, res?: ImageMetaData[]) => {
  emit('close', res)
}

const props = defineProps({
  show: Boolean
})

onMounted(() => {
  createAutocomplate({
    container: '#autocomplete',
    placeholder: 'Search Text',
    plugins: [createAutocompletePlugin({ submitFn, perPage: 5, data: imgList })]
  })
})

</script>

<style lang="stylus" scoped>
.search-model-wrapper
  width 100%
  height 100vh
  overflow hidden
  position absolute
  background-color #656c85cc
  top 0
.autocomplete
  width 600px
  max-height 600px
  overflow scroll
  position relative
  margin 100px auto
  button
      background none
      border none
</style>

<style lang="stylus">
.ais-InstantSearch
  width 600px
  height 600px
  overflow scroll
  position relative
  margin 100px auto
.aa-Label svg
  color var(--c-main-color)
.aa-Item
  b
    color var(--c-main-color)
  img
    width 20px
    height 20px
    display inline-bolck
  .url-text
    font-size 12px
  .title-text
    margin-bottom 5px
.aa-Form
  border: 1px solid transparent
  box-shadow: none
.aa-Form:focus, .aa-Form:active, .aa-Form:focus-within
  border: 1px solid var(--c-main-color)
  box-shadow: none
</style>
