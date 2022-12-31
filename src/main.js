import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/global.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'

import moment from 'moment'

import $ from 'jquery'

Vue.prototype.$ = $

Vue.prototype.$moment = moment

Vue.prototype.$url = 'http://127.0.0.1:8080/'

Vue.config.productionTip = false

Vue.use(ElementUI)

VMdPreview.use(vuepressTheme, {
  Prism,
  extend (md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  }
})

Vue.use(VMdPreview)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
