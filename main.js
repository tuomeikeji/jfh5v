import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import store from './store'
import Global from './globalData.js'
import axios from 'axios';
import qs from 'qs'

Vue.prototype.GLOBAL = Global

Vue.prototype.axios = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)

axios.defaults.withCredentials =true;//跨域配置

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
