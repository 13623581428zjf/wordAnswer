// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import 'lib-flexible'
//axios.defaults.withCredentials = true

Vue.prototype.$http = Axios;

Vue.filter('getNum', function(n) {
	return n < 99999 ? n : '99999+';
})
import LoadingBar from './components/loading-bar';
LoadingBar.config({
   color: '#5cb85c'
})
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if(to.meta.title) {
		document.title = to.meta.title;
	}
	LoadingBar.start();
	next();
})

router.afterEach(transition => {
	LoadingBar.finish();
});
/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app-box')