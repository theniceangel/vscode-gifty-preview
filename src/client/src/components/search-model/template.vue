<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['htmlstring'],
  render() {
    debugger
    return <p v-html={this.htmlstring}></p>
  }
})
</script>
