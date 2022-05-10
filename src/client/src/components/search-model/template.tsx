import { defineComponent } from 'vue'
// const htmlstring = '<b>111</b>'
// export  default  defineComponent ( {  render ( )  {  return  < div > Test < / div >  } } )
export default defineComponent({ 
    props: ['htmlstring'],
    render () {
        debugger
        console.log('111111111')
        return <p v-html={this.htmlstring}></p> 
    }
})
