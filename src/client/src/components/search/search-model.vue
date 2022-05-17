 <template>
  <div class="search-model-wrapper" v-show="show" @click="closeFn">
    <div id="autocomplete" class="autocomplete"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import { createAutocomplate } from './createAutocomplate'
import { ImageMetaData, createAutocompletePlugin } from './autocompletePlugin'

let imgList = ref(new Array())
setTimeout(() => {
  let proxy: any = inject('imagesMetaData') as ImageMetaData[]
  debugger
  imgList.value = proxy && proxy.value
  console.log(333333, imgList)
}, 300)

const emit = defineEmits(['close'])
const closeFn = (e: any) => {
  // console.log('on-search-btn-click', e.target)
  if (e.target.className === 'search-model-wrapper') {
    emit('close')
  }
}
const submitFn = (query?: string, res?: ImageMetaData[]) => {
  // console.log('Do sth before closing search panel if needed', query, res)
  emit('close', res)
}

const props = defineProps({
  show: Boolean
})

onMounted(() => {
  createAutocomplate({
    container: '#autocomplete',
    placeholder: 'Search Text',
    plugins: [createAutocompletePlugin({ submitFn, perPage: 5, data: imgList.value })]
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
