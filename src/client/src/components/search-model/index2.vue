 <template>
    <div class="search-model-wrapper" v-show="show" @click="closeFn">
        <div id="autocomplete" class="autocomplete"></div>
    </div>
</template>

<script setup lang="tsx">
import { onMounted, ref, inject, h, Fragment, render } from 'vue'
import { createAutocompletePlugin } from './autocompletePlugin'
import { autocomplete, AutocompletePlugin } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';
import fuzzysort, { highlight } from 'fuzzysort';
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

type BasePlugin = AutocompletePlugin<any, undefined>;
type Container = string | HTMLElement;

type ParamsType = {
    container: Container,
    basePlugin: BasePlugin
};

const createAutocomplate = (params: ParamsType) => {
    autocomplete<ImageMetaData>({
        container: params.container,
        placeholder: 'Search Text',
        openOnFocus: true,
        // plugins: [params.basePlugin],
        getSources() {
            return [
                {
                    sourceId: 'links',
                    getItems({ query }) {
                        const items = imgList;
                        let results = fuzzysort.go(query, items, {
                            keys: ['name'],
                            // Create a custom combined score to sort by. -100 to the desc score makes it a worse match
                            scoreFn: a => Math.max(a[0] ? a[0].score : -1000, a[1] ? a[1].score - 100 : -1000)
                        });

                        let xx1 = results.map(result => {
                            let highlight = fuzzysort.highlight(result[0]);
                            return {
                                ...result.obj,
                                highlight
                            };
                        });
                        let xx2 = xx1.filter(item => item.highlight);

                        return xx2.filter(({ name }) =>
                            name.toLowerCase().includes(query.toLowerCase())
                        )||[];
                        // return items
                    },
                    getItemUrl({ item }) {
                        return item.remoteUrl;
                    },
                    // templates: {
                    //   item({ item }) {
                    //     return item.name;
                    //   },
                    // },
                    templates: {
                        item({ item }) {
                            // console.log(item.highlight)
                            // return <Highlight htmlSting={item.highlight}></Highlight>
                            debugger
                            return Highlight.render(item.highlight)
                            // return `<p>${item.highlight}</p>`;
                            // return (<p>{item.highlight}</p>)
                            // return (<p v-html={item.highlight}></p>)
                            // return html`<p v-html=${item.highlight}></p>`
                            // return html`<p>${item.highlight}</p>`;
                        },
                    },
                },
            ];
        },
        // renderer: { createElement: h, Fragment, render }
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
        basePlugin: createAutocompletePlugin({ submitFn, perPage: 5 })
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