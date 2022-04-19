<template>
  <div class="menu-container">
    <span class="left-icon" v-tooltip.tooltip="TIPS.copy" @click.stop="onCopy">
      <icon-copy />
    </span>
    <span v-tooltip.tooltip="TIPS.open" @click.stop="onOpen">
      <icon-open />
    </span>
  </div>
</template>

<script setup lang="ts">
import IconCopy from './icon-copy.vue'
import IconOpen from './icon-open.vue'
import { vscodeWebviewAPI } from '../../vscode-webview-api'

const props = defineProps({
  url: String,
  path: String
})

const TIPS = {
  copy: '复制链接',
  open: '编辑器内打开图片'
}

const onCopy = () => {
  vscodeWebviewAPI.postMessage({
    command: 'copy',
    text: props.url
  })
}

const onOpen = () => {
  vscodeWebviewAPI.postMessage({
    command: 'open',
    path: props.path
  })
}
</script>

<style lang="stylus">
.menu-container
  margin-top 10px
  font-size 20px
  color var(--c-main-color)
  .left-icon
    margin-right 20px
</style>