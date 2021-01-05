import Vue from 'vue'
import Router from 'vue-router'

/*路由组件区*/
const Enter = r => require.ensure([], () => r(require('./view/enter.vue')))
const Main = r => require.ensure([], () => r(require('./view/main.vue')))
const LookError = r => require.ensure([], () => r(require('./view/lookError.vue')))
const Share = r => require.ensure([], () => r(require('./view/share.vue')))
const Answer = r => require.ensure([], () => r(require('./view/answer.vue')))

Vue.use(Router)
export default new Router({
	base: __dirname,
	routes: [
	{
		path: '/',
		component: Enter,
		meta: {
			title: '世界杯懂球战大逃杀'
		}
	},{
		path: '/main',
		component: Main,
		meta: {
			title: '世界杯懂球战大逃杀'
		}
	}, {
		path: '/lookError',
		component: LookError,
		meta: {
			title: '世界杯懂球战大逃杀'
		}
	},{
		path: '/share',
		component: Share,
		meta: {
			title: '世界杯懂球战大逃杀'
		}
	},  {
		path: '/answer',
		component: Answer,
		meta: {
			title: '世界杯懂球战大逃杀'
		}
	}],
})