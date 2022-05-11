 <template>
  <div class="search-model-wrapper" v-show="show" @click="closeFn">
    <div id="autocomplete" class="autocomplete"></div>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, reactive, ref, inject, h, Fragment, render } from 'vue'
import { autocomplete } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';
import fuzzysort from 'fuzzysort';
import mocData from '../../common/ts/mock';
import Highlight from './template.vue';

const imgList = mocData;

type ImageMetaData = {
  remoteUrl: string
  size: string,
  width: number,
  height: number,
  name: string,
  resourceKey: string,
  highlight?: string
};

type ParamsType = {
  container: string | HTMLElement
  placeholder: string | HTMLElement
};
// 存储搜索词 和 搜索结果
const searchData = reactive({
  query: '',
  searchRes: mocData,
})

// 修改 搜索信息
const changeSearchData = (query: string, res: ImageMetaData[]) => {
  searchData.query = query
  searchData.searchRes = res
}

const createAutocomplate = (params: ParamsType) => {
  autocomplete<ImageMetaData>({
    ...params,
    openOnFocus: true,
    getSources() {
      return [
        {
          sourceId: 'links2',
          getItems({ query }) {
            const items = imgList
            let results = fuzzysort.go(query, items, {
              keys: ['name'],
              // Create a custom combined score to sort by. -100 to the desc score makes it a worse match
              scoreFn: (a) => Math.max(a[0] ? a[0].score : -1000, a[1] ? a[1].score - 100 : -1000),
            })

            let arr1 = results.map((result) => {
              let highlight = fuzzysort.highlight(result[0]) || undefined
              return {
                ...result.obj,
                highlight,
              }
            })
            let arr2 = arr1.filter((item) => item.highlight)

            return (
              (arr2.length &&
                arr2.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))) ||
              []
            )
          },
          getItemUrl({ item }) {
            return item.remoteUrl;
          },
          templates: {
            item({ item }) {
              return <Highlight htmlstring={item.highlight}></Highlight>
              // return (<p v-html={item.highlight}></p>)
            },
          },
        },
      ];
    },
    onSubmit(e) {
      console.log('onSubmit query', e.state.query)
      console.log('onSubmit items', e.state.collections[0].items)

      const query = e.state.query
      const res = e.state.collections[0].items
      changeSearchData(query, res)
      submitFn(query, res) // 触发搜索弹窗关闭的回调
    },
    renderer: { createElement: h, Fragment, render }
  });
};
const emit = defineEmits(['close'])
const closeFn = (e: any) => {
  console.log('on-search-btn-click', e.target)
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
    placeholder: 'Search Text'
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
    height 600px
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
</style>
