import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import store from './store'
import Global from './globalData.js'
// import uniRequest from 'uni-request';
import uniFly from 'unifly';

Vue.prototype.GLOBAL = Global

Vue.config.productionTip = false
// Vue.config.withCredentials = true
Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)

// axios.defaults.withCredentials =true;
// Vue.prototype.$uniRequest = uniRequest
// uniRequest.defaults.withCredentials =true;
uniFly.headers['Content-Type'] = 'application/x-www-form-urlencoded';
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
