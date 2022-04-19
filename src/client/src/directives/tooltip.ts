import type { App, DirectiveBinding } from 'vue'

// https://codesandbox.io/s/8e9k3

const tooltip = (app: App) => {
  app.directive('tooltip', {
    mounted(el, binding) {
      init(el, binding)
    },
    updated(el, binding) {
      init(el, binding)
    }
  })
}

function init(el: HTMLElement, binding: DirectiveBinding) {
  let position = binding.arg || 'top'
  let tooltipText = binding.value || ''
  el.setAttribute('position', position)
  el.setAttribute('tooltip', tooltipText)
}

export default tooltip
