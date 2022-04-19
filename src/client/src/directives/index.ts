import type { App } from 'vue'
import tooltipDirective from './tooltip'
import './tooltip.styl'

// register all directives
const directives = (app: App) => {
  tooltipDirective(app)
}

export default directives
