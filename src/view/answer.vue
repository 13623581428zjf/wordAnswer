<template>
	<div class="contentWaper">
		<div class="answerBg" :class="{diyu:currentStage>=201?true:false}"></div>
		<div class="ub ub-ac ub-pc count">
			<div class="ub ub-ac ub-pc">{{codeNum}}</div>
		</div>
		<div class="ub ub-ac ub-pc titleBox">
			<div class="customs" :class="{aniCustoms:animate}">第{{currentStage}}关</div>
			<div class="ub ub-pc answerTitle" :class="{aniAnswerTitle:animate}">{{questionTitle}}</div>
		</div>
		<div class="ub ub-ver ub-pc btns">
			<div class="ub ub-ac ub-pc btn-wrap btn" v-for="(item ,index) in items" :class="{clickC:item.isClick,errorC:item.wrong,rightC:item.right,aniAnswerTitle:animate}" @click="clickItem(item,index)">
				<span :class="{errorC:item.wrong,rightC:item.right}"></span>
				<div class="ub ub-ac ub-pc line1">{{item.title}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import AnswerBtn from '../components/ansButton'
	import app from '../public.js'
	import Bus from '../bus.js'
	//倒计时
	function countDownNum(obj) {
		if(obj.codeNum < 11 && obj.codeNum >= 1) {
			obj.codeNum -= 1;
			if(obj.codeNum == 0) {
				clearInterval(obj.timer);
				obj.timer = 0;
				app.getAction('worldCupAnswer/updateCurStage', {}, function(res) {
					console.log('销毁', res)
					var that = this;
					if(res.code === 0) {
						var query = {
								data: {
									curStage: obj.currentStage - 1,
									peopleNum: res.data.peopleNum,
									percentage: res.data.percentage,
									nickPic: res.data.user.avatar,
									logo: res.data.team.logo,
									rank: res.data.team.rank,
									cnName: res.data.team.cnName,
									stage: res.data.stage,
									nick: res.data.user.nick,
								}
							}
							app.setsessionStorage('answerQuery', query);
						obj.$router.push({
							path: '/lookError'
						});
					} else {
						app.toast(res.msg);
					}
				}, function(error) {
					app.toast('数据请求失败');
				})
			}
		}
	}
	export default {
		components: {
			AnswerBtn
		},
		data() {
			return {
				codeNum: 10,
				timer: 0,
				loginState: {},
				currentStage: 1,
				ids: {},
				teamId: '',
				partId: '',
				questionIndex: 0,
				questions: [],
				animate: false,
				questionTitle: '',
				questionId: '',
				items: [],
				currentStage: 1,
			}
		},
		mounted() {
			//			this.teamId = this.$route.query.teamId;
			//			this.partId = this.$route.query.partId;
			var that = this;
			window.addEventListener("popstate", function(e) {
				console.log(12345678)
				that.codeNum = 10;
				clearInterval(that.timer);
				that.timer = 0;
				app.getAction('worldCupAnswer/updateCurStage', {}, function(res) {
					console.log('code', res.code)
					if(res.code === 0) {
						console.log('update', res)
						that.$router.push({
							path: '/main',
							//							query: {
							//								id: that.partId
							//							}
						});
					}
				}, function(error) {
					that.$router.push({
						path: '/main',
						//						query: {
						//							id: that.partId
						//						}
					});
				})

			}, false);
			TencentSports.userModule.fetchInfo(function(user) {
				if(user.isLogin === false) {
					that.$router.push({
						path: '/'
					});
				} else {
					that.getQuestion();
				}
			})

		},
		methods: {
			pushHistory() {
				var state = {
					title: "呵呵呵",
					url: window.location.href
				};
				window.history.pushState(state, "title", window.location.href);
			},
			clearSet() {
				var that = this;
				clearInterval(that.timer);
				that.timer = 0;
				//that.codeNum = 10;
			},
			getQuestion() {
				var that = this;
				that.codeNum = 10;
				that.questions = [];
				that.questionIndex = 0;
				that.clearSet();
				that.animate = false;
				app.getAction('worldCupAnswer/getOneQuestion', {}, function(res) {
					console.log('获取题目返回数据', res);
					if(res.code === 0) {
						that.questions = res.data;
						var data = that.questions[that.questionIndex];
						that.questionId = data.id;
						that.questionTitle = data.title;
						that.items = data.options.map(function(item) {
							var obj = {};
							obj.title = item;
							obj.wrong = false;
							obj.right = false;
							obj.isClick = false;
							obj.clicked = false;
							return obj;
						})
						that.animate = true;
						setTimeout(function() {
							that.timer = setInterval(function() {
								countDownNum(that);
							}, 1000);
						}, 2000)
					} else if(res.code === 3) {
						app.toast('你答对了所有题目，给你点赞！');
						that.updateCurStage();
					} else {
						app.toast(res.msg);
					}
				}, function(error) {
					app.toast('网络不给力！');
					that.updateCurStage();
				})
			},
			getOneQuestion(data) {
				var that = this;
				that.clearSet();
				that.codeNum = 10;
				that.animate = false;
				that.questionId = data.id;
				that.questionTitle = data.title;
				setTimeout(function() {
					that.items = data.options.map(function(item) {
						var obj = {};
						obj.title = item;
						obj.wrong = false;
						obj.right = false;
						obj.isClick = false;
						obj.clicked = false;
						return obj;
					})
					that.animate = true;
					setTimeout(function() {
						that.timer = setInterval(function() {
							countDownNum(that);
						}, 1000);
					}, 2000)
				}, 500)
			},
			/*提交答案*/
			clickItem(item, index) {
				if(this.codeNum <= 1) {
					return;
				}
				if(!this.timer) {
					return;
				}
				if(this.items.every(item => item.clicked === false)) {
					var that = this;
					console.log(item)
					this.initData(item);
					item.isClick = true;
					item.clicked = true;
					console.log({
						questionId: that.questionId,
						submitOption: (index + 1)
					})
					app.getAction('worldCupAnswer/submitQuestion', {
						questionId: that.questionId,
						submitOption: (index + 1)
					}, function(res) {
						if(res.code === 0) {
							console.log('答题正确' + that.questionId, res);
							that.initData(item);
							item.right = true;
							that.clearSet();
							that.questionIndex++;
							setTimeout(function() {
								that.initData(item);
								that.currentStage++;
								if(that.questionIndex <= that.questions.length - 1) {
									that.getOneQuestion(that.questions[that.questionIndex]);
								} else {
									that.getQuestion();
								}
							}, 500)
						} else if(res.code === 1) {
							console.log('答题错误', res);
							that.initData(item);
							item.wrong = true;
							that.clearSet();
							var query = {
								data: {
									curStage: that.currentStage - 1,
									peopleNum: res.data.user.peopleNum,
									percentage: res.data.user.percentage,
									nickPic: res.data.user.avatar,
									logo: res.data.team.logo,
									rank: res.data.team.rank,
									cnName: res.data.team.cnName,
									stage: res.data.stage,
									nick: res.data.user.nick,
								}
							}
							app.setsessionStorage('answerQuery', query);
							setTimeout(function() {
								that.$router.push({
									path: '/lookError'
								});
							}, 500)
						} else {
							that.clearSet();
							console.log('答题有问题', res);
							app.toast(res.msg);
							that.updateCurStage();
						}
					}, function(error, textStatus) {
						//						alert('error.status: '+ error.status+'textStatus:'+textStatus);
						app.toast('网络问题，请再次选择答案', 'middle', 1500);
						that.items.map(function(item) {
							item.wrong = false;
							item.right = false;
							item.isClick = false;
							item.clicked = false;
							return item;
						})
						//that.clearSet();
						//app.toast('答题失败');
						//that.updateCurStage();	
					})
				}
			},
			updateCurStage() {
				var that = this;
				setTimeout(function() {
					app.getAction('worldCupAnswer/updateCurStage', {}, function(res) {
						if(res.code === 0) {
							var query = {
								data: {
									curStage: that.currentStage - 1,
									peopleNum: res.data.peopleNum,
									percentage: res.data.percentage,
									nickPic: res.data.user.avatar,
									logo: res.data.team.logo,
									rank: res.data.team.rank,
									cnName: res.data.team.cnName,
									stage: res.data.stage,
									nick: res.data.user.nick,
								}
							}
							app.setsessionStorage('answerQuery', query);
							setTimeout(function() {
								that.$router.push({
									path: '/lookError'
								});
							}, 500)
						} else {
							app.toast(res.msg);
						}
					}, function(error) {
						app.toast('数据请求失败');
					})
				}, 3000)
			},
			initData(item) {
				item.wrong = false;
				item.right = false;
				item.isClick = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '../sass/style.scss';
	.answerBg {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 0;
		background-image: url(../imgs/img-bg-c.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.count {
		padding-top: 50px;
		div {
			width: 194px;
			height: 194px;
			background-image: url(../imgs/fllow.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			font-size: 82px;
			color: #333333;
		}
	}
	
	.titleBox {
		width: 100%;
		min-height: 64px;
		margin-top: 118px;
		div {
			color: #ffffff;
			font-size: 32px;
		}
		div.customs {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) scale(0);
			z-index: 10;
			opacity: 0;
		}
		div.aniCustoms {
			-webkit-animation-duration: 1.5s;
			animation-duration: 1.5s;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
			-webkit-animation-name: customs;
			animation-name: customs;
		}
		div.answerTitle {
			width: 80%;
			transform: scale(0);
			opacity: 0;
		}
		div.aniAnswerTitle {
			-webkit-animation-duration: .8s;
			animation-duration: .8s;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
			animation-delay: 1.2s;
			-webkit-animation-delay: 1.2s;
			-webkit-animation-name: answerTitle;
			animation-name: answerTitle;
		}
	}
	
	@keyframes customs {
		0% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}
		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.5);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}
	}
	
	@keyframes answerTitle {
		from {
			transform: scale(0);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
	
	.btns {
		width: 72%;
		margin: 90px auto 0;
	}
	
	.btn-wrap {
		width: 100%;
		height: 112px;
		border-radius: 90px;
		background-color: #e2c797;
		color: #333333;
		font-size: 36px;
		padding: 0 100px;
		box-sizing: border-box;
		span {
			position: absolute;
			width: 100px;
			height: 100%;
			left: 0;
			top: 0;
			background-position: center;
			background-repeat: no-repeat;
			background-size: 38%;
		}
		span.errorC {
			background-image: url(../imgs/wrong.png);
		}
		span.rightC {
			background-image: url(../imgs/right.png);
		}
	}
	
	.btn-wrap.errorC {
		background-color: #eb9593;
	}
	
	.btn-wrap.rightC {
		background-color: #7ecaa4;
	}
	
	.btn-wrap.clickC {
		background-color: #dab068;
	}
	
	.btn {
		margin-bottom: 30px;
		opacity: 0;
		transform: scale(0);
	}
	
	.btn.aniAnswerTitle {
		-webkit-animation-duration: .8s;
		animation-duration: .8s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		animation-delay: 1.2s;
		-webkit-animation-delay: 1.2s;
		-webkit-animation-name: answerTitle;
		animation-name: answerTitle;
	}
</style>