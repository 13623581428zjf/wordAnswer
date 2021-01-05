<template>
	<div id="app">
		<!--背景图片-->
		<div class="indexBg"></div>
		<!--谁更懂球，世界杯大逃杀-->
		<div class="wordDire">
			<img src="../imgs/img-header.png" />
		</div>
		<!--按钮：点击参与-->
		<div class="button-one">
			<div class="button-two">
				<div class="button-three" @click="next">点&nbsp;击&nbsp;参&nbsp;与</div>
			</div>
		</div>
		<!--保护主队不淘汰-->
		<div class="none-weed">
			<div>为了保护您的主队不被淘汰 <br /> 请动用你全部的知识点
			</div>
		</div>
		<!--底部logo-->
		<div class="bottom-logo"></div>
	</div>
</template>
<script>
	import app from '../public.js'
	export default {
		data() {
			return {
				loginState: {},
				nextsession: '',
			}
		},
		mounted() {
			bizBoss.report({
				pagename: 'question',
				module: 'frontpage',
				target: 'whole',
				useraction: 'baoguangfont'
			})
			var dataShare = {
				title: '世界杯懂球战大逃杀，真球迷才能是最后赢家',
				desc: '见证你是真伪球迷的时候到了',
				image: 'http://img1.gtimg.com/sports/pics/hv1/62/190/2282/148435562.jpg',
				url: app.visiableBase
			}
			window.TencentSports.supportApp.setShare(dataShare);
		},
		methods: {
			/*点击参与*/next: function() {
		var that = this;
		that.login();
	},
	login() {
		var that = this;
		TencentSports.userModule.fetchInfo(function(user) {
					if(user.isLogin) {
						app.getAction('worldCupAnswer/checkTeam', {}, function(res) {
									if(res.code === 0) {
										res.data.isChoose == '1' ? that.$router.push('/main'): that.$router.push('/share');
									}
								}, function(err) {
									console.log(err)
								})
					} else {
						//未登录去登录
						console.log("未登陆")
						if(window.TencentSports && typeof window.TencentSports.userModule.redirectToLogin === 'function') {
							window.TencentSports.userModule.redirectToLogin(null, null, null, function(isLogin) {
								//
							}, function(isLogin) {
								
							})
						}
					}
				})

			},
		},
	}
</script>
<style scoped lang="scss">
	@import '../sass/style.scss';
	@import '../sass/share.scss';
	/*谁更懂球，世界杯大逃杀*/
	
	.wordDire {
		width: 100%;
		height: 40%;
		position: fixed;
		left: 0;
		top: 13%;
	}
	
	img {
		width: 593px;
		height: 530px;
		position: absolute;
		left: 50%;
		margin-left: -320px;
	}
	
	.none-weed {
		font-size: 28px;
	}
</style>