<template>
	<div class="dd">
		<!--背景-->
		<div class="imageBox" id="imageBox"></div>
		<div class="bg bg1" ref="poster" id='bigBox'>
			<div class="ub ub-pc wordFont">世界杯球迷鉴定</div>
			<div class="bigBox" id="picBox">
				<div class="logonam" id="logo"><img :src="nickPic" />
				</div>
				<div class="middleBox">
					<div class="smallBox">
						<div class="logon">
							{{nick}}
						</div>
						<div class="assice">
							成功闯关<span>{{score}}</span>关<br /> 为{{cnName}}球迷赢得<span>{{score}}</span>懂球值<br /> 打败了
							<span>{{numb}}</span>位/<span>{{rate}}</span>球迷</div>

						<div class="ub ub-pc ballDi" v-if="stage==1">
							在懂球的路上你还是个新司机，路漫漫其修远兮,你得上下而求索啊
						</div>
						<div class="ub ub-pc ballDi" v-if="stage==2">
							在成为懂球帝的路上你已经迈出了坚实的一步, 继续加油啊骚年！
						</div>
						<div class="ub ub-pc ballDi" v-if="stage==3">
							棒呆！浑身都是知识点, 你可真是个小机灵鬼啊！
						</div>
						<div class="ub ub-pc ballDi" v-if="stage==4">
							天啦噜！你是真的懂球, 请问何时C位出道？
						</div>
						<div class="ub ub-pc ballDi" v-if="stage==5">
							在足球知识中，你是电，你是光, 你是真正的民间高人！
						</div>
						<br />
						<br />
						<br />

						<div class="ub ub-ac meTeam">
							<div class="meTeamleft">
								<div class="mtTe">我的主队:</div>
								<div class="fonts">目前懂球排名第<span> {{rank}} </span>位</div>
								<div class="fonts">来和我一起助力{{cnName}}队吧!</div>
							</div>
							<div class="meTeamright">
								<strong v-if="stage==1">吃瓜群众</strong>
								<strong v-if="stage==2">中坚球迷</strong>
								<strong v-if="stage==3">铁杆球迷</strong>
								<strong v-if="stage==4">民间教练</strong>
								<strong v-if="stage==5">真职业球迷</strong>
								<div><img :src="logo" />
								</div>
								<div>{{cnName}}队</div>
								<div><img src="../imgs/img-seal.png" />
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="erma">
				<img src="../imgs/img-flag.png" />
				<div class="ub ub-pc">扫描鉴定你的球迷段位</div>
			</div>
		</div>
		<div class=bg>
			<div class="ub ub-pc wordFont">世界杯球迷鉴定</div>

			<div class="bottopLogos" v-show="!bottopLogos">
				<div class="leftone">
					<p class="pO">
						<p class="pT">
							<p class="ub ub-pc pTH" @click="sessdcd">继续答题助力</p>
						</p>
					</p>
				</div>
				<div class="lefttwo">
					<p class="pO">
						<p class="pT">
							<p class="ub ub-pc pTH" @click="ther">这里全是真球迷</p>
						</p>
					</p>
				</div>
				<div class="rightone">
					<p class="pO">
						<p class="pT">
							<p class="ub ub-pc pTH" @click="ballM">球迷排行榜</p>
						</p>
					</p>
				</div>
				<div class="righttwo">
					<p class="pO">
						<p class="pT">
							<p class="ub ub-pc pTH" @click="ballT">球队排行榜</p>
						</p>
					</p>
				</div>
			</div>
		</div>

		<!--答题排行榜-->
		<div class="answerList" v-show="rankShow">
			<div class="ub ub-pc disls">
				<div class="podit">
					<div class="closeAnserlist" @click="closeAnserlist"></div>
					<div class="eigh"></div>
					<div class="eigh"></div>
					<div class="ub ub-pc billboard">懂球闯关排行榜</div>
				</div>
			</div>
			<br />
			<br />
			<br />
			<div class="ub ub-pj ub-f1 billboardList" v-for="(item,index) in answerLiall">
				<div><img src="../imgs/icon-champion.png" v-if="index==0">
					<img src="../imgs/icon-secondplace.png" v-if="index==1">
					<img src="../imgs/icon-thirdplace.png" v-if="index==2">
				</div>
				<div>{{index+1}}</div>
				<div><img :src="item.avatar" /></div>
				<div>{{item.nick}}</div>
				<div>{{item.maxStage}}关</div>
				<div><img :class="{gray:item.team.isOut==1}" :src="item.team.logo" /></div>
			</div>
		</div>

		<!--球队排行榜-->
		<div class="answerList" v-show="allShow">
			<aside>
				<div class="closeAnserlists" @click="allListtwo"></div>
			</aside>
			<br /><br />
			<div class="ub ub-pj time">
				<div>7月8日将淘汰懂球值靠后的4支球队<br>快为你的主队答题拉人助威吧!</div>
			</div>
			<div class="ub ub-pc listball">
				<div style="color: gainsboro;border: 1px solid gainsboro;opacity: .5;">16</div>
				<div>
					<p>------</p>
				</div>
				<div>8</div>
				<div>
					<p>------</p>
				</div>
				<div>4</div>
				<div>
					<p>------</p>
				</div>
				<div>2</div>
				<div>
					<p>------</p>
				</div>
				<div>1</div>
				<sub class="logoye"><img src="../imgs/icon-champion.png"/></sub>
				<div>
					<p>----</p>
				</div>
			</div>
			<div class="ub ub-pc dayMmonth">
				<div>6月30日</div>
				<div>7月4日</div>
				<div>7月8日</div>
				<div>7月12日</div>
				<div>7月16日</div>
			</div>
			<div class="order"></div><br />
			<div class="ub ub-pc orzhr">球队排行榜</div>
			<div class="ub ub-pc orzhr">(懂球值)</div><br />
			<div class="ub ub-pc balllistd" v-for='(item,index) in getTeaNine'>
				<div><img src="../imgs/icon-champion.png" v-if="index==0">
					<img src="../imgs/icon-secondplace.png" v-if="index==1">
					<img src="../imgs/icon-thirdplace.png" v-if="index==2">
				</div>
				<div>{{index+1}}</div>
				<div><img :src="item.logo" /></div>
				<div>{{item.cnName}}</div>
				<div>{{item.getBallNumber}}
					<p><img v-show='item.isOut==1' style="width: 20px;min-height: 20px;position: absolute;right: 15px;top: 0px;" src="../imgs/icon-obsolete.png" /></p>
				</div>
			</div>
		</div>
		<!--长按保存-->
		<div class="changgech" :class="{
				'changgech-bot-default': !isChanggechBot,
				'changgech-bot0': isChanggechBot
			}">
			<div>长按保存你的球迷鉴证书</div>
		</div>
	</div>
</template>
<script>
	var getPixelRatio = function(context) {
		var backingStore = context.backingStorePixelRatio ||
			context.webkitBackingStorePixelRatio ||
			context.mozBackingStorePixelRatio ||
			context.msBackingStorePixelRatio ||
			context.oBackingStorePixelRatio ||
			context.backingStorePixelRatio || 1;
		return(window.devicePixelRatio || 1) / backingStore;
	};
	import MaskAlert from '../components/maskAlert'
	import app from '../public.js'
	export default {
		components: {
			MaskAlert
		},
		data() {
			return {
				bottopLogos: false,
				nowan: false,
				score: null,
				rate: null,
				numb: null,
				logo: null,
				nickPic: null,
				rank: null,
				cnName: null,
				stage: null,
				nick: null,
				/*答题排行榜所以*/
				answerLiall: '',
				//闯关排行榜
				rankShow: false,
				/*闯关排行榜遮罩*/
				rankShowho: false,
				//球队排行榜
				allShow: false,
				getTeaNine: '',
				isChanggechBot: false,
			}
		},
		created() {
			var that = this;
			var answerQuery = app.getsessionStorage('answerQuery');
			console.log(answerQuery)
			console.log(answerQuery.data.curStage);
			this.score = answerQuery.data.curStage;
			this.rate = answerQuery.data.percentage;
			this.numb = answerQuery.data.peopleNum;
			this.logo = answerQuery.data.logo;
			this.nickPic = answerQuery.data.nickPic;
			this.rank = answerQuery.data.rank;
			this.cnName = answerQuery.data.cnName;
			this.stage = answerQuery.data.stage;
			this.nick = answerQuery.data.nick;
			console.log(this.stage);
			/*答题排行榜*/
			app.getAction('worldCupAnswer/userRank', {}, function(res) {
				that.answerLiall = res.data;
				that.bianlo = res.data;
				for(var i = 0; i < that.bianlo.length; i++) {
					that.bianloss = that.bianlo[i].team.logo;
				}
				that.answerLilogo = res.data.team;
			}, function(err) {
				console.log(err);
			})
			/*获取球队排行榜*/
			app.getAction('worldCupAnswer/teamRank', {}, function(res) {
				that.getTeaNine = res.data;
			}, function(err) {
				console.log(err)
			})
		},
		mounted() {
			var that = this;
			that.pushHistory();
			window.addEventListener("popstate", function(e) {
				that.$router.push({
					path: '/main'
				});
			}, false);
			this.$nextTick(() => {
				setTimeout(() => {

					var _this = this;
					let content_html = this.$refs.poster;　　　 //要转化的div
					let width = content_html.offsetWidth;
					let height = content_html.offsetHeight;
					let offsetTop = content_html.offsetTop;
					let canvas = document.createElement('canvas');
					let context = canvas.getContext('2d');
					var scaleBy = getPixelRatio(context);
					canvas.width = width * scaleBy;
					canvas.height = height * scaleBy; //+offsetTop
					canvas.style.width = width + 'px';
					canvas.style.height = height + 'px';
					context.scale(scaleBy, scaleBy);
					var opts = {
						useCORS: true,
						allowTaint: false, //允许加载跨域的图片
						tainttest: true, //检测每张图片都已经加载完成
						scale: scaleBy, // 添加的scale 参数
						canvas: canvas, //自定义 canvas
						logging: false, //日志开关，发布的时候记得改成false
						width: width, //dom 原始宽度
						height: height //dom 原始高度,
					};
					setTimeout(function() {
						html2canvas(content_html, opts).then(function(canvas) {
							var h = document.getElementById('picBox').offsetTop - document.getElementById('logo').offsetHeight / 2;
							var w = document.getElementById('picBox').offsetLeft;

							var dataUrl = canvas.toDataURL();
							var img = document.createElement("img");
							img.src = dataUrl;
							img.style.width = width + 'px';
							img.style.height = height + 'px';
							document.getElementById('bigBox').innerHTML = '';
							document.getElementById('bigBox').append(img);
							$('#bigBox').addClass('picBox').removeClass('bg1').css({
								'z-index': 9,
								'overflow': 'hidden'
							}).find('img').addClass('pic').css({
								position: 'absolute',
								'margin-left': -w,
								'margin-top': -h
							})
						});
					}, 100)
				}, 0)
			})
			//			app.getAction('worldCupAnswer/submitQuestion', {
			//				questionId: that.questionId,
			//						submitOption: (index + 1)
			//			}, function(res) {
			//				console.log(res)
			//			}, function(err) {
			//				console.log(err)
			//			})
			/*使长按保存按钮展示*/
			//			var chAng = document.getElement('')
			//			this.isChanggechBot = true
			setTimeout(() => {
				this.isChanggechBot = true
			}, 0)
			console.log('==================')

		},
		watch: {
			isChanggechBot(val) {
				if(val === true) {
					setTimeout(() => {
						this.isChanggechBot = false
					}, 4000)
				}
			}
		},
		computed: {

		},
		methods: {
			pushHistory() {
				var state = {
					title: "呵呵呵",
					url: window.location.href
				};
				window.history.pushState(state, "title", window.location.href);
			},
			sessdcd: function() {
				console.log('继续答题')
				this.$router.push('/main')
			},
			ther: function() {
				location.href = 'http://sports.qq.com/kbsweb/kbsshare/group.htm?moduleId=145&title=%E6%88%91%E5%B8%88%E4%B8%BB%E5%9C%BA%3A%E5%AF%BB%E6%89%BE%E5%90%8C%E5%A5%BD%E7%90%83%E8%BF%B7%EF%BC%8C%E5%8A%A0%E5%85%A5%E7%83%AD%E8%AE%AE%E4%B8%96%E7%95%8C%E6%9D%AF%E7%A4%BE%E5%8C%BA&from=singlemessage&isappinstalled=0'
			},
			ballM: function() {
				this.rankShow = true;
				this.rankShowho = true;
			},
			ballT: function() {
				this.allShow = true;
			},
			/*关闭闯关排行榜*/
			closeAnserlist: function() {
				this.rankShow = false;
				this.rankShowho = false;
				console.log(1)
			},
			allListtwo: function() {
				this.allShow = false;
				this.allShow = false;
				this.rankShowho = false;
			}

		}
	}
</script>

<style scoped lang="scss">
	@import '../sass/style.scss';
	@import '../sass/share.scss';
	/*背景*/
	
	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 0;
		background-image: url(../imgs/img-bg-c.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.bg.bg1 {
		height: auto;
	}
	
	.wordFont {
		font-size: 55px;
		color: white;
		padding: 60px 0;
		box-sizing: border-box;
		font-weight: 900;
	}
	
	.bigBox {
		width: 80%;
		height: 700px;
		margin: 10% 4%;
		position: relative;
		left: 5%;
		background: #E20000;
		border-radius: 15px;
		z-index: 0;
		/*overflow:hidden;*/
		/*position: fixed;
		top: 40%;
		left: 10%;
		margin-top: -350px;*/
	}
	
	.picBox {
		width: 88%;
		height: 800px;
		/*margin: 10% 4%;*/
		position: relative;
		left: 5%;
		border-radius: 15px;
		z-index: 0;
		/*overflow:hidden;*/
		position: fixed;
		top: 40%;
		left: 10%;
		margin-top: -350px;
		transform: scale(0.85);
	}
	
	.middleBox {
		width: 100%;
		height: 705px;
		background: #0095FF;
		border-radius: 15px;
		position: relative;
		left: 3%;
		top: 2%;
		z-index: 0;
	}
	
	.smallBox {
		width: 100%;
		height: 700px;
		border-radius: 15px;
		position: relative;
		left: -1.5%;
		top: -0.6%;
		background: -webkit-linear-gradient(left top, #7d2059, #2162a2);
		background: -o-linear-gradient(top right, #7d2059, #2162a2);
		background: -moz-linear-gradient(top right, #7d2059, #2162a2);
		background: linear-gradient(to top right, #7d2059, #2162a2);
	}
	
	.assice {
		width: 65%;
		margin-left: 33%;
		color: #add4f3;
		font-size: 28px;
		padding-top: 5%;
		box-sizing: border-box;
		letter-spacing: 2px;
		padding-bottom: 10px;
		span {
			color: #FFC73D;
			font-weight: 700;
		}
	}
	
	.logonam {
		position: absolute;
		width: 115px;
		height: 115px;
		z-index: 1000;
		left: 30px;
		top: -58px;
		img {
			width: 100%;
			height: 100%;
			border: 4px solid #9CD6FF;
			border-radius: 59px;
		}
	}
	
	.logon {
		color: #9CD6FF;
		font-size: 32px;
		z-index: 1000;
		font-weight: 600;
		position: absolute;
		top: 8%;
		left: 5%;
		height: 80px;
		line-height: 80px;
		width: 21.6%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.ballDi {
		color: white;
		margin: 40px 0;
		letter-spacing: 9px;
		padding: 0 40px;
		font-size: 30px;
		box-sizing: border-box;
		letter-spacing: 2px;
		text-align: center;
	}
	
	.meTeam {
		width: 100%;
		height: 250px;
		background: -webkit-linear-gradient(left top, #af7697, #8d90b3);
		background: -o-linear-gradient(top right, #af7697, #8d90b3);
		background: -moz-linear-gradient(top right, #af7697, #8d90b3);
		background: linear-gradient(to top right, #af7697, #8d90b3);
	}
	
	.meTeamleft {
		height: 100%;
		padding: 10px 40px;
		box-sizing: border-box;
		width: 70%;
		color: #331b59;
		letter-spacing: 1px;
		font-weight: 600;
		/*border: 1px solid firebrick;*/
		div {
			margin-top: 13px;
			font-size: 26px;
		}
		span {
			color: red;
			font-weight: 800;
			font-size: 28px;
		}
	}
	
	.meTeamright {
		width: 30%;
		height: 100%;
		/*border: 3px solid black;*/
		div:nth-of-type(1) {
			width: 120px;
			height: 80px;
			margin: 70px 15%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		div:nth-of-type(2) {
			width: 100%;
			text-align: center;
			color: #28125A;
			margin-top: -60px;
		}
		div:nth-of-type(3) {
			width: 173px;
			height: 165px;
			position: absolute;
			top: -110px;
			right: -40px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.fonts {
		font-weight: 300;
		font-size: 31px;
	}
	
	.bottopLogos {
		width: 100%;
		position: fixed;
		bottom: 8%;
		top: 74%;
		left: 14%;
		/*border: 1px solid red;*/
		display: flex;
		flex-wrap: wrap;
		div {
			width: 40%;
			height: 60px;
			/*border: 1px solid forestgreen;*/
			padding: 35px 0;
			font-size: 28px;
			font-weight: 600;
			.pO {
				width: 80%;
				height: 41px;
				background: #0095FF;
				margin: 0 5%;
				border-radius: 75px;
				position: relative;
				left: 5px;
				top: 16px;
				bottom: 0;
				box-sizing: border-box;
			}
			.pTH {
				width: 80%;
				height: 55px;
				line-height: 60px;
				background: #fff;
				margin: 0 5%;
				border-radius: 75px;
				position: relative;
				left: 2px;
				top: -42px;
				bottom: 0;
			}
		}
	}
	
	.erma {
		width: 100%;
		z-index: 1000;
		left: 0;
		padding: 4% 0;
		box-sizing: border-box;
		img {
			width: 159px;
			height: 159px;
			position: relative;
			left: 50%;
			margin-left: -82px;
		}
		div {
			color: white;
			margin-top: 20px;
		}
	}
	
	.answerList {
		width: 100%;
		background: url(../imgs/img-bg-c.png) no-repeat;
		background-size: 100% 100%;
		background-position: center;
		position: fixed;
		left: 0%;
		right: 0%;
		top: 0%;
		bottom: 0%;
		z-index: 1000;
		overflow-y: scroll;
		color: white;
	}
	
	.closeAnserlist {
		position: absolute;
		left: 50%;
		width: 38px;
		height: 38px;
		background: url(../imgs/icon-close-b.png) no-repeat right;
		background-size: 100% 100%;
		z-index: 0;
		top: 50%;
		margin-top: 20px;
	}
	
	.closeAnserlists {
		position: fixed;
		left: 50%;
		width: 38px;
		height: 38px;
		background: url(../imgs/icon-close-b.png)no-repeat;
		background-size: 100% 100%;
		z-index: 1000;
		margin-top: 20px;
		margin-left: 290px;
	}
	
	.billboard {
		font-size: 30px;
		margin: 10px 0;
	}
	/*球队排行榜列表*/
	
	.billboardList {
		/*border: 1px solid firebrick;*/
		height: 100px;
		align-items: center;
		justify-content: center;
		line-height: 100px;
		div {
			/*border: 2px solid gold;*/
		}
		span img {
			border: 1px solid firebrick;
		}
		div:nth-of-type(1) {
			width: 5%;
			text-align: right;
			/*border: 3px solid cadetblue;*/
			img {
				width: 20px;
				height: 13.7px;
			}
		}
		div:nth-of-type(2) {
			width: 5%;
			text-align: center;
			font-size: 33px;
		}
		div:nth-of-type(3) {
			width: 15%;
			text-align: center;
			/*border: 3px solid cadetblue;*/
			img {
				width: 70px;
				height: 70px;
				border-radius: 35px;
				margin: 20px 0;
			}
		}
		div:nth-of-type(4) {
			width: 30%;
			margin-left: 2%;
			/*border: 3px solid cadetblue;*/
			font-size: 24px;
		}
		div:nth-of-type(5) {
			width: 20%;
			/*border: 3px solid cadetblue;*/
			font-size: 24px;
		}
		div:nth-of-type(6) {
			width: 15;
			text-align: center;
			/*border: 3px solid cadetblue;*/
			width: 75px;
			height: 50px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.closeAnserlist {
		position: absolute;
		left: 50%;
		top: 2%;
		left: 90%;
		width: 38px;
		height: 38px;
		background: url(../imgs/icon-close-b.png) no-repeat right;
		background-size: 100% 100%;
		z-index: 1000;
	}
	
	.billboard {
		font-size: 30px;
		margin: 10px 0;
	}
	/*球队排行榜列表*/
	
	.billboardList {
		/*border: 1px solid firebrick;*/
		height: 100px;
		align-items: center;
		justify-content: center;
		line-height: 100px;
		div {
			/*border: 2px solid gold;*/
		}
		span img {
			border: 1px solid firebrick;
		}
		div:nth-of-type(1) {
			width: 5%;
			text-align: right;
			/*border: 3px solid cadetblue;*/
			img {
				width: 20px;
				height: 13.7px;
			}
		}
		div:nth-of-type(2) {
			width: 5%;
			text-align: center;
			font-size: 33px;
		}
		div:nth-of-type(3) {
			width: 15%;
			text-align: center;
			/*border: 3px solid cadetblue;*/
			img {
				width: 70px;
				height: 70px;
				border-radius: 35px;
				margin: 20px 0;
			}
		}
		div:nth-of-type(4) {
			width: 30%;
			margin-left: 2%;
			/*border: 3px solid cadetblue;*/
			font-size: 24px;
		}
		div:nth-of-type(5) {
			width: 20%;
			/*border: 3px solid cadetblue;*/
			font-size: 24px;
		}
		div:nth-of-type(6) {
			width: 15;
			text-align: center;
			/*border: 3px solid cadetblue;*/
			width: 75px;
			height: 50px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	/*球队排行榜*/
	
	.time {
		font-size: 33px;
		padding: 29px 30px;
		box-sizing: border-box;
	}
	
	.listball {
		margin: -5px 0;
		div {
			width: 12%;
			height: 60px;
			text-align: center;
			line-height: 60px;
		}
		div:nth-of-type(odd) {
			width: 50px;
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-radius: 25px;
			border: 2px solid #0095FF;
		}
		div:nth-of-type(even) {
			p {
				width: 70px;
				height: 50px;
				line-height: 50px;
				text-align: center;
			}
		}
		div:nth-of-type(9) {
			border: 1.5px solid #DCB76B;
		}
		div:last-child {
			display: none;
		}
		.logoye {
			width: 20px;
			height: 17px;
			position: relative;
			right: 44px;
			top: -25px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.dayMmonth {
		div {
			width: 19%;
			height: 30px;
			text-align: center;
			line-height: 40px;
			margin: 24px 0;
		}
		div:nth-of-type(1) {
			margin-left: -20px;
		}
	}
	
	.order {
		border-bottom: 0.3px solid white;
		padding-top: 1px;
		box-sizing: border-box;
		width: 93%;
		margin-left: 3.5%;
		opacity: .1;
	}
	
	.orzhr {
		margin-top: 10px;
		font-size: 30px;
	}
	
	.balllistd {
		height: 6%;
		div:nth-of-type(1) {
			width: 10%;
			text-align: right;
			img {
				width: 20px;
				height: 13px;
				margin: 25px 0;
			}
		}
		div:nth-of-type(2) {
			width: 10%;
			text-align: center;
			font-size: 30px;
			padding: 14px 0;
			box-sizing: border-box;
		}
		div:nth-of-type(3) {
			width: 20%;
			text-align: center;
			img {
				width: 75px;
				height: 50px;
				margin: 10px 0;
			}
		}
		div:nth-of-type(4) {
			width: 25%;
			font-size: 28px;
			padding: 11px 0;
			box-sizing: border-box;
		}
		div:nth-of-type(5) {
			width: 35%;
			font-size: 30px;
			padding: 11px 0;
			box-sizing: border-box;
			text-align: center;
		}
	}
	
	.ruloRule {
		width: 389px;
		height: 100px;
		position: absolute;
		top: -9%;
		left: 50%;
		margin-left: -190px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	
	.closePlayrule {
		width: 30px;
		height: 30px;
		position: fixed;
		right: 7%;
		top: 5%;
		img {
			width: 100%;
			height: 100%;
		}
	}
	
	.las {
		width: 150px;
		height: 100px;
		position: relative;
		top: 40px;
		left: 0
	}
	
	.taotai {
		position: absolute;
		width: 80px;
		height: 80px;
		top: 20px;
		right: 0;
	}
	
	strong {
		color: white;
		font-weight: 500;
		font-size: 33px;
		transform: rotate(-17deg);
		position: absolute;
		top: -21%;
		right: -3%;
	}
	
	.mtTe {
		font-size: 26px;
	}
	
	.changgech {
		/*position: absolute;*/
		/*height: 260px;*/
		height: 0;
		width: 100%;
		line-height: 300px;
		position: fixed;
		/*bottom: 240px;*/
		background: white;
		font-size: 35px;
		text-align: center;
		/*bottom: -260px;*/
		bottom: 0;
		z-index: 9;
		transition: height 1s;
	}
	
	.changgech-bot-default {
		height: 0;
	}
	
	.changgech-bot0 {
		height: 260px;
	}
	
	.podit {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
		line-height: 70px;
		text-align: center;
		z-index: 10;
		background: url(../imgs/img-bg-c.png)no-repeat;
	}
	
	.answerList::-webkit-scrollbar {
		display: none
	}
	
	aside {
		width: 100%;
		height: 80px;
		position: fixed;
		top: 0;
		z-index: 1000;
		background: url(../imgs/img-bg-c.png) no-repeat;
	}
	
	.gray {
		opacity: .5;
	}
</style>