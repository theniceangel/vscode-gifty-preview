 <template>
    <div class="search-model-wrapper" v-show="show" @click="closeFn">
        <div id="autocomplete" class="autocomplete"></div>
        <!-- <ais-instant-search :search-client="searchClient" index-name="instant_search_demo_query_suggestions">
            <ais-search-box />
            <ais-hits>
                <template v-slot:item="{ item }">
                    <h2>{{ item.name }}</h2>
                </template>
            </ais-hits>
        </ais-instant-search> -->
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import createAutocomplate from './createAutocomplate'

const emit = defineEmits(['close'])
const closeFn = (e: any) => {
    console.log('on-search-btn-click', e.target)
    if (e.target.className === 'search-model-wrapper') {
        emit('close')
    }
}

const props = defineProps({
    show: Boolean
})

onMounted(() => {
    createAutocomplate()
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
    // padding 20%
// .autocomplete
//     color #262627
//     font-family inherit
//     font-size 16px
//     font-weight 400
//     line-height 1em
//     margin 0
//     padding 0
//     text-align left
//     width 300px
//     height 50px
//     background darkslategrey
</style>

<style lang="stylus">
.autocomplete.autocomplete
    width 600px
    height 600px
    overflow scroll
    position relative
    margin 100px auto
    button
        background none
        border none
.ais-InstantSearch
    width 600px
    height 600px
    overflow scroll
    position relative
    margin 100px auto
</style>