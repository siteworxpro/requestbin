import 'highlight.js/scss/default.scss'
import 'highlight.js/scss/paraiso-dark.scss'

import Vue from 'vue'

const bin = () => import(/* webpackChunkName: "/page/bin" */ './page/bin.vue')

new Vue({
  el: '#app',
  components: {
    bin
  }
})