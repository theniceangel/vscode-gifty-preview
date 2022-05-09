<script setup lang="ts">
import { ref } from 'vue'
import gallery from './components/gallery/index.vue'
import searchBtn from './components/search-btn/index.vue'
import headerBar from './components/header-bar/index.vue'
import searchModel from './components/search-model/index2.vue'

const show = ref(false)
const openSearchModel = () => {
  show.value = true
  console.log('openSearchModel')
}
</script>

<template>
  <div>
    <headerBar>
      <searchBtn @onSearchBtnClick="openSearchModel" />
    </headerBar>
    <gallery class="gallery-wrapper" />
  </div>
  <searchModel :show="show" @close="show = false"></searchModel>
</template>

<style>
:root {
  --c-main-color: #3eaf7c;
  --c-dark-color: #2c3e50;
  --c-light-color: #90a4b7;
  --c-hover-color: #f8f8f8;
  --docsearch-muted-color: #969faf;
  --docsearch-container-background: #656c85cc;
  --docsearch-searchbox-background: #ebedf0;
  --docsearch-key-gradient: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
  --docsearch-key-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
}
body {
  margin: 0
}

.gallery-wrapper {
  padding-top: 100px
}
</style>