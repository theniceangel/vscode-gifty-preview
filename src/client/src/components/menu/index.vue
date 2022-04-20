<template>
  <div class="menu-container">
    <span v-tooltip.tooltip="TIPS.copy" @click.stop="onCopy">
      <icon-copy />
    </span>
  </div>
</template>

<script setup lang="ts">
import IconCopy from './icon-copy.vue'
import { vscodeWebviewAPI } from '../../vscode-webview-api'

const props = defineProps({
  url: String
})

const TIPS = {
  copy: '复制链接'
}

const onCopy = () => {
  vscodeWebviewAPI.postMessage({
    command: 'copy',
    text: props.url
  })
}

</script>

<style lang="stylus">
.menu-container
  margin-top 10px
  font-size 20px
  color var(--c-main-color)
</style>