import Vue from 'vue'
import Message from './xtx-message.vue'

const MessageConstructor = Vue.extend(Message)
let instance
const MessageTip = function (options = {}) {
//   console.log(options)
  instance = new MessageConstructor({
    data: options
  })
  document.body.appendChild(instance.$mount().$el) // this.$el拿到组件实际上的dom，把他挂载到body上
  setTimeout(() => {
    document.body.removeChild(instance.$mount().$el)
  }, 3000) // 3秒之后自动移除dom组件
}

export default MessageTip
