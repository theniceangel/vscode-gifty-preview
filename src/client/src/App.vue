<script setup lang="ts">
import { ref, watch } from 'vue'
import gallery from './components/gallery/index.vue'
import searchBtn from './components/search/search-btn.vue'
import headerBar from './components/header-bar/index.vue'
import searchModel from './components/search/search-model.vue'
import { StarportCarrier } from "vue-starport"

const show = ref(false)
const toggleSearchHandler = (str: string) => {
  if(str === 'open') {
    show.value = true
  }else if(str === 'close') {
    show.value = false
  }else {
    show.value = !show.value
  }
}

watch(show, (newV, oldV) => {
  /* ... */
  if(show) {
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('#autocomplete .aa-Input');
      input && input.focus()
      // input && input.select()
    })
  }
})

</script>

<template>
  <div>
    <header-bar>
      <search-btn @toggle-search="toggleSearchHandler" />
    </header-bar>
    <StarportCarrier>
      <gallery class="gallery-wrapper"></gallery>
    </StarportCarrier>
      <!-- <RouterView class="gallery-wrapper" /> -->
  </div>
  <search-model :show="show" @close="show = false"></search-model>
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
.back-btn {
  position: fixed;
  top: 300px;
  right: 100px;
  z-index: 9;
}
.back-btn2 {
  top: 400px;
}
/* debug transition */
/* [data-starport-craft] {
  background: #0805;
}
[data-starport-proxy]:not([data-starport-landed]) {
  background: #8005;
} */
</style>
