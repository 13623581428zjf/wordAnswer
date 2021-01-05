<template>
	<div class="app">
		<!--背景-->
		<div class="indexBgtwo"></div>
		<!--排行榜-->
		<div class="ub ub-pj list">
			<!--答题排行榜-->
			<div class="answer-list">
				<div class="ub ub-pc">球迷排行榜</div>
				<!--1 2 3 4 5-->
				<div class="ub ub-ac lists" v-for="(item,index) in allyhUser" @click="answerList">
					<div><img src="../imgs/icon-champion.png" v-if="index==0">
						<img src="../imgs/icon-secondplace.png" v-if="index==1">
						<img src="../imgs/icon-thirdplace.png" v-if="index==2">
					</div>
					<div>{{index+1}}</div>
					<div>
						<img :src="item.avatar" />
						<!--答题排行榜国旗logo-->
						<img :src="item.team.logo" />
					</div>
					<div>{{item.nick}}</div>
				</div>
				<!--更多排行榜-->
				<div class="ub ub-pc lists" @click="answerList">
					更多&nbsp;&nbsp;>
				</div>
			</div>
			<!--球队排行榜-->
			<div class="ball-list">
				<div class="ub ub-pc">球队排行榜</div>
				<!--1 2 3 4 5-->
				<div class="ub ub-ac right-lists" v-for="(item,index) in ballUser" @click="answerListtwo">
					<div><img src="../imgs/icon-champion.png" v-if="index==0">
						<img src="../imgs/icon-secondplace.png" v-if="index==1">
						<img src="../imgs/icon-thirdplace.png" v-if="index==2">
					</div>
					<div>{{index+1}}</div>
					<div><img :src="item.logo" /></div>
					<div>{{item.cnName}}</div>
				</div>
				<!--更多排行榜-->
				<div class="ub ub-pc lists" @click="answerListtwo">
					更多&nbsp;&nbsp;>
				</div>
			</div>
		</div>
		<!--答题次数-->
		<div class="answer-num">
			<!--今日答题次数-->
			<div class="name-log">{{yongHu.nick}}</div>
			<div class="day-answer">
				<div class="ub ub-pj answer-nums">今日答题次数:{{yongHu.remainDayTimes}}/5</div>
				<div class="ub ub-pj answer-guan">最高闯关:{{yongHu.maxStage}}关</div>
				<p>hahahah</p>
				<div class="list-logo" v-if="yongHu.isVip == 1"><img src="../imgs/icon-vip.png" /></div>
				<div class="ub ub-pc list-ans">排名：{{yongHu.rank}}</div>
				<div class="head-logo-red">
					<div class="head-logo-blue">
						<div class="head-logos">
							<img :src="yongHu.avatar" />
						</div>
					</div>
				</div>
				<!--我的主队，主队排名-->
				<div class="team-home">
					<div>
						<!--判断是否已经选择主队-->
						<span v-show="myTeam ==!true" style="position:relative">
							<img  class="las" :class="{active:yongHus.isOut==0}" :src="yongHus.logo" />
							<img  class="taotai" v-if="yongHus.isOut==1" src="../imgs/icon-obsolete.png" />
						</span>
					</div>
					<div>{{yongHus.rank}}</div>
				</div>
				<!--排名文字-->
				<div class="ub ub-pj team-font">
					<!--判断是否已经选择主队-->
					<div>
						<strong v-if="yongHus.isOut==0">我的主队</strong>
						<strong style="color: #0080DE;" v-if="yongHus.isOut==1&&yongHu.isVip == 1||yongHu.oldTeamId==null" @click='returnTeam'>重选主队</strong>
					</div>
					<div>主队排名</div>
				</div>
			</div>
		</div>.
		<!--为球队答题-->
		<!--主队不存在button没有颜色-->
		<div class="myTeam-button-ones" v-if="yongHus.isOut==1">
			<div class="myTeam-button-twos">
				<div class="myTeam-button-threes" @click="answerTeam">为{{yongHus.cnName}}答题</div>
			</div>
		</div>
		<!--为主队答题-->
		<div class="myTeam-button-one" v-if="yongHus.isOut==0">
			<div class="myTeam-button-two">
				<div class="myTeam-button-three" @click="zhuduiTeam">为主队答题</div>
			</div>
		</div>
		<!--游戏规则-->
		<div class="ub ub-ac play-rule" @click="playRule">游戏规则</div>
		<div v-show="ruleShows">
			<mask-alert>
				<div class="ruloRule"><img src="../imgs/img-rule.png" /></div>
				<div class="ruleText">
					<div class="closePlayrule" @click="closePlayrule">
						<img src="../imgs/icon-close-w.png" />
					</div>
					<br />
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>每个账号只能选择一支球队为其答题积累懂球值，若球队被淘汰则选择该球队的账号不能继续答题，已完成的答题成绩会保留在排行榜中；</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>腾讯体育会员可在主队被淘汰后拥有一次再选主队的机会，并保留之前的答题成绩；</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>每道题为1关，每关10秒答题时间，每过1关可为主队加1点懂球值；</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>每个账号每天有5次答题机会，每次答错为止；</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>球迷排行榜前5位将获得一年腾讯体育高级会员；</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>球迷排行榜6-10位将获得一年腾讯体育会员；</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>游戏采用大逃杀淘汰赛制，具体赛程如下:</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>-6月30日，16强球队球迷答题开始</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>-7月4日，淘汰排名靠后的8支球队</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>-7月8日，淘汰排名靠后的4支球队</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>-7月12日，淘汰排名靠后的2支球队</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>-7月16日，决出最后冠军球队</div>
					</div>
					<div class="ub textWrap">
						<div>&bull;</div>
						<div>-游戏截止至2018年7月16日12:00 。
						</div>
					</div>
				</div>
			</mask-alert>
		</div>
		<!--德国队已经被淘汰，不能继续为其答题-->
		<!--<div class="ruleTexts">
			{{yongHus.cnName}}已经被淘汰<br>不能继续为其答题
			<i><img @click="closetoastTeam" src="../imgs/icon-close-w.png"/></i>
		</div>-->
		<!--重新选择球队弹框-->
		<mask-alert v-show='returnsTeam'>
			<div class="ruleText">
				<div class="inTeamTips">
					重新选择球队后，<br />您的最高闯关数据将会保留
					<br />
				</div>
				<div class="inTeamBtns">
					<div class="eigh"></div>
					<div class="active" @click="sureTeam">确定</div>
					<div @click="cancleShow">取消</div>
				</div>
			</div>
		</mask-alert>
		<!--答题排行榜-->
		<div class="answerList" v-show="rankShow">
			<div class="podit">
				<div class="closeAnserlist" @click="closeAnserlist"></div>
				<div class="eigh"></div>
				<div class="eigh"></div>
				<div class="ub ub-pc billboard">懂球闯关排行榜</div>
			</div>
			<div class="ub ub-pj ub-f1 billboardList" v-for="(item,index) in answerLiall">
				<div><img src="../imgs/icon-champion.png" v-if="index==0">
					<img src="../imgs/icon-secondplace.png" v-if="index==1">
					<img src="../imgs/icon-thirdplace.png" v-if="index==2">
				</div>
				<div>{{index+1}}</div>
				<div><img :src="item.avatar" /></div>
				<div>{{item.nick}}</div>
				<div>{{item.maxStage}}关</div>
				<div><img :class="{gray:item.team.isOut==1}" :src="item.team.logo" />
				</div>

			</div>
		</div>
		<!--球队排行榜-->
		<div class="answerList" v-show="allShow">
			<div class="podittwo">
				<div class="closeAnserlist" @click="allListtwo"></div>
				<div class="eigh"></div>
				<div class="eigh"></div>
				<div class="ub ub-pj time">
					<div>7月8日将淘汰懂球值靠后的4支球队<br>快为你的主队答题拉人助威吧!</div>
				</div>
				<div class="ub ub-pc listball">
					<div style="color: gainsboro;border: 1px solid gainsboro;opacity: .5;">16强</div>
					<div>
						<p>------</p>
					</div>
					<div>8强</div>
					<div>
						<p>------</p>
					</div>
					<div>4强</div>
					<div>
						<p>------</p>
					</div>
					<div>2强</div>
					<div>
						<p>------</p>
					</div>
					<div>冠军</div>
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
				<div class="order"></div>
			</div>
			<div class="ub ub-pc orzhr">球队懂球值排行榜</div>
			<br />
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
	</div>
</template>
<script>
	import MaskAlert from '../components/maskAlert'
	import app from '../public.js'
	export default {
		components: {
			MaskAlert
		},
		data() {
			return {
				myTeam: false,
				showLogo: true,
				returnsTeam: false,
				rankShow: false,
				allShow: false,
				rankShowho: false,
				ruleShows: false,
				answerLi: '',
				getTeaNine: '',
				loginState: {},
				yongHu: '',
				answerLiall: '',
				yongHus: {},
				bianlo: '',
				bianloss: '',
				allyhUser: '',
				ballUser: '',
				yongHususer: '',
				answerball: '',
			}
		},
		mounted() {
			var that = this;
			bizBoss.report({
				pagename: 'question',
				module: 'juepage',
				target: 'whole',
				useraction: 'baoguangjue'
			})
			/*用户信息*/
			app.getAction('worldCupAnswer/index', {}, function(res) {
				that.allyhUser = res.data.userRank;
				that.ballUser = res.data.teamRank;
				that.yongHu = res.data.user;
				that.yongHus = res.data.team;
				that.yongHususer = res.data.team.cnName;
			}, function(err) {
				console.log(err);
			})
		},
		computed: {},
		methods: {
			/*为德国队答题：，没选主队*/
			answerTeam: function() {
				app.toast(this.yongHususer + '已经被淘汰不能继续为其答题')
			},
			/*关闭没选主队弹框*/
			closetoastTeam: function() {
				this.toastTeam = false;
			},
			/*重选主队*/
			returnTeam: function() {
				this.returnsTeam = true;
			},
			/*确认重新选择主队*/
			sureTeam: function() {
				this.returnsTeam = false;
				this.returnT = false;
				this.showLogo = false;
				this.myTeams = true;
			},
			/*取消选择主队*/
			cancleShow: function() {
				this.returnsTeam = false;
			},
			/*选择主队*/
			selectTeams: function() {
				this.$router.push('/share')
			},
			sureTeam: function() {
				this.$router.push('/share')
			},
			/*为主队答题*/
			zhuduiTeam: function() {
				if(this.yongHu.remainDayTimes == 0) {
					app.toast('今日剩余次数已用完');
					return;
				}
				this.$router.push({
					path: '/answer',
					query: {
						teamid: this.yongHu.teamId
					}
				})

				console.log('为主队答题')
			},
			/*答题闯关排行榜*/
			answerList: function() {
				var that = this;
				this.rankShow = true;
				this.rankShowho = true;
				/*答题排行榜*/
				app.getAction('worldCupAnswer/userRank', {}, function(res) {
					that.answerLiall = res.data;
				}, function(err) {
					console.log(err);
				})

			},
			/*球队闯关排行榜*/
			answerListtwo: function() {
				var that = this;
				this.allShow = true;
				this.allShow = true;
				this.rankShowho = true;
				/*获取球队排行榜*/
				app.getAction('worldCupAnswer/teamRank', {}, function(res) {
					that.getTeaNine = res.data;
					console.log(that.getTeaNine)
				}, function(err) {
					console.log(err)
				})

			},
			/*关闭闯关排行榜*/
			closeAnserlist: function() {
				this.rankShow = false;
				this.rankShowho = false;
			},
			/*关闭球队排行榜*/
			allListtwo: function() {
				this.allShow = false;
				this.allShow = false;
				this.rankShowho = false;
			},
			/*打开游戏规则*/
			playRule: function() {
				this.ruleShows = true;
			},
			/*关闭游戏规则*/
			closePlayrule: function() {
				this.ruleShows = false;
			},

		}
	}
</script>
<style scoped lang="scss">
	@import '../sass/style.scss';
	/*背景*/
	
	.indexBgtwo {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 0;
		background-image: url(../imgs/img-bg-c.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	/*排行榜*/
	
	.list {
		width: 100%;
		position: fixed;
		top: 4%;
		bottom: 96%;
		left: 0;
		right: 0;
		/*答题排行榜*/
		.answer-list {
			width: 43%;
			height: 430px;
			border-radius: 18px;
			background: rgba(0, 0, 0, .3);
			margin-left: 5.5%;
			color: #add4f3;
			font-size: 28px;
			box-sizing: border-box;
			z-index: 0;
			padding-top: 15px;
			div {
				height: 45px;
			}
		}
		/*球队排行榜*/
		.ball-list {
			width: 43%;
			height: 430px;
			font-size: 28px;
			border-radius: 18px;
			background: rgba(0, 0, 0, .3);
			margin-right: 5.5%;
			padding-top: 15px;
			box-sizing: border-box;
			color: #add4f3;
			div {
				height: 45px;
			}
		}
	}
	
	.right-lists {
		padding-bottom: 15px;
		box-sizing: border-box;
		margin-top: 15px;
		padding-left: 15px;
		opacity: .8;
		div {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: white;
		}
		div:last-child {
			width: 40%;
			margin-left: 10%;
		}
		div:nth-of-type(3) {
			width: 55px;
			height: 41px;
			-webkit-filter: brightness(1.3);
			filter: brightness(1.3);
			img {
				width: 100%;
				height: 100%;
				z-index: 1000;
			}
		}
		div:nth-of-type(1) img {
			width: 20px;
			height: 14px;
		}
		div:nth-of-type(1) {
			text-align: center;
		}
		div {
			width: 14%;
		}
	}
	/*1 2 3 4 5*/
	
	.lists {
		padding-bottom: 10px;
		box-sizing: border-box;
		margin-top: 15px;
		padding-left: 15px;
		opacity: .8;
		div {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: white;
		}
		div:last-child {
			width: 40%;
			margin-left: 8%;
		}
		div:nth-of-type(3) {
			width: 38.5px;
			height: 38.5px;
			border-radius: 19.5px;
			border: 1.3px solid white;
			img {
				width: 100%;
				height: 100%;
			}
			img:nth-of-type(2) {
				position: absolute;
				width: 23px;
				height: 14px;
				margin: 28px -16px;
				border: 1.3px solid white;
				-webkit-filter: brightness(1.3);
				filter: brightness(1.3);
			}
		}
		div:nth-of-type(1) img {
			width: 20px;
			height: 14px;
		}
		div:nth-of-type(1) {
			text-align: center;
		}
		div {
			width: 14%;
		}
	}
	
	.lists:last-child {
		color: #0085E7;
		font-size: 24px;
		margin: 13px 0;
		margin-left: 5%;
	}
	/*答题次数*/
	
	.answer-num {
		width: 100%;
		position: fixed;
		top: 45%;
		left: 0;
		right: 0;
	}
	/*答题次数*/
	
	.answer-num {
		margin-top: 7%;
		/*今日答题次数*/
		.day-answer {
			width: 88%;
			height: 320px;
			border-radius: 18px;
			position: absolute;
			left: 6%;
			background: rgba(0, 0, 0, .3);
			.answer-nums {
				color: white;
				opacity: 0.8;
				margin: 12px 0;
				font-size: 26px;
				/*border:1px solid firebrick;*/
				letter-spacing: 4px;
				opacity: .7;
				position: relative;
				left: 180px;
				top: 0;
				div {
					border: 1px solid black;
				}
			}
			.answer-guan {
				color: white;
				opacity: 0.8;
				margin: 12px 0;
				opacity: .7;
				font-size: 26px;
				/*border:1px solid firebrick;*/
				letter-spacing: 4px;
				position: relative;
				left: 180px;
				top: 2%;
				div {}
			}
			p {
				width: 90%;
				height: 0.1px;
				opacity: .1;
				position: relative;
				left: 50%;
				margin-left: -300px;
				border: 2px solid whitesmoke;
			}
			.answer-guan {}
			.answer-guan {
				height: 65px;
			}
			.list-ans {
				color: white;
				opacity: 0.8;
				position: absolute;
				right: 1.3%;
				top: 18.5%;
				width: 170px;
			}
			.list-logo {
				position: absolute;
				right: 5%;
				top: -7%;
				img {
					width: 40px;
					height: 56px;
				}
			}
			.head-logo-red {
				width: 120px;
				height: 120px;
				border-radius: 65px;
				background: #DB0000;
				position: absolute;
				left: 4%;
				top: -16%;
			}
			.head-logo-blue {
				width: 117px;
				height: 117px;
				border-radius: 64px;
				/*border: 1px solid firebrick;*/
				background: #0083E3;
				position: absolute;
				left: 13%;
				top: 6%;
			}
			.head-logos {
				width: 105px;
				height: 105px;
				border-radius: 14px;
				position: absolute;
				left: -8%;
				top: -2%;
				img {
					width: 100%;
					height: 100%;
					border-radius: 80px;
					border: 5.5px solid white;
				}
			}
		}
	}
	
	.name-log {
		color: white;
		font-size: 30px;
		position: absolute;
		left: 30%;
		top: -46px;
		/*border:1px solid firebrick;*/
		width: 100%;
		height: 50px;
		opacity: .7;
		font-weight: 700;
	}
	/*我的主队，主队排名*/
	
	.team-home {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 0;
		/*border: 1px solid firebrick;*/
		div {
			display: flex;
			width: 50%;
			height: 90px;
			line-height: 140px;
			align-items: center;
			justify-content: center;
			span img {
				opacity: .5;
				width: 115px;
				height: 80px;
				margin-bottom: 14px;
			}
			span img.active {
				opacity: 1;
				margin-bottom: 14px;
			}
		}
		div:last-child {
			color: white;
			font-weight: 100;
			font-size: 50px;
			font-weight: 600;
		}
	}
	/*排名文字*/
	
	.team-font {
		color: white;
		font-size: 28px;
		div {
			width: 50%;
			text-align: center;
			strong {
				color: white;
				font-size: 28px;
				font-weight: 400;
			}
		}
	}
	/*为球队答题*/
	
	.myTeam-button-one {
		width: 480px;
		height: 70px;
		position: fixed;
		bottom: 13%;
		left: 50%;
		margin-left: -248px;
		background: #E20000;
		border-radius: 100px;
	}
	
	.myTeam-button-ones {
		width: 480px;
		height: 70px;
		position: fixed;
		bottom: 13%;
		left: 50%;
		margin-left: -248px;
		background: #858585;
		border-radius: 100px;
	}
	
	.myTeam-button-two {
		width: 480px;
		height: 70px;
		position: fixed;
		bottom: 11.6%;
		left: 50%;
		background: #0095FF;
		margin-left: -225px;
		border-radius: 100px;
	}
	
	.myTeam-button-twos {
		width: 480px;
		height: 70px;
		position: fixed;
		bottom: 11.6%;
		left: 50%;
		background: #858585;
		margin-left: -225px;
		border-radius: 100px;
	}
	
	.myTeam-button-three {
		width: 480px;
		height: 70px;
		line-height: 70px;
		text-align: center;
		position: fixed;
		bottom: 12.3%;
		left: 50%;
		background: white;
		opacity: .9;
		margin-left: -235px;
		border-radius: 100px;
		font-size: 38px;
		font-weight: 800;
	}
	
	.myTeam-button-threes {
		width: 480px;
		height: 70px;
		line-height: 70px;
		text-align: center;
		position: fixed;
		bottom: 12.3%;
		left: 50%;
		background: white;
		margin-left: -235px;
		border-radius: 100px;
		font-size: 38px;
		font-weight: 800;
		opacity: .5;
	}
	/*游戏规则*/
	
	.play-rule {
		position: fixed;
		color: white;
		bottom: 6%;
		left: 50%;
		font-size: 28px;
		margin-left: -40px;
	}
	
	.inTeamTips {
		padding-top: 12%;
		i img {
			width: 30px;
			height: 30px;
			position: absolute;
			right: 5%;
			top: 10%;
		}
	}
	
	.eigh {
		width: 100%;
		height: 30px;
		border: none!important;
	}
	/*答题排行榜*/
	
	.answerList {
		width: 100%;
		background-size: 100% 100%;
		background-position: center;
		background: url(../imgs/img-bg-c.png) no-repeat;
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
		top: 6%;
		left: 90%;
		width: 38px;
		height: 38px;
		background: url(../imgs/icon-close-b.png) no-repeat right;
		background-size: 100% 100%;
		z-index: 0;
	}
	
	.billboard {
		font-size: 40px;
		font-weight: 500;
		margin: 10px 0;
	}
	/*球队排行榜列表*/
	
	.podit {
		height: 200px;
		position: sticky;
		top: 0;
		z-index: 1000;
		background: url(../imgs/img-bg-c.png) no-repeat;
	}
	
	.podittwo {
		height: 365px;
		position: sticky;
		top: 0;
		z-index: 1000;
		/*border: 2px solid firebrick;*/
		background: url(../imgs/img-bg-c.png) no-repeat;
	}
	
	.billboardList {
		/*border: 1px solid firebrick;*/
		height: 100px;
		align-items: center;
		justify-content: center;
		line-height: 100px;
		div {}
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
			width: 29%;
			margin-left: 2%;
			font-size: 24px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
		padding: 10px 30px;
		box-sizing: border-box;
	}
	
	.listball {
		padding: 20px 0;
		box-sizing: border-box;
		div {
			width: 11%;
			height: 60px;
			text-align: center;
			line-height: 60px;
		}
		div:nth-of-type(odd) {
			width: 65px;
			height: 65px;
			line-height: 65px;
			text-align: center;
			border-radius: 32.5px;
			border: 2px solid #0095FF;
		}
		div:nth-of-type(even) {
			p {
				width: 70px;
				height: 50px;
				line-height: 65px;
				text-align: center;
				margin-left: 8%;
			}
		}
		div:nth-of-type(9) {
			border: 1.5px solid #DCB76B;
		}
		div:last-child {
			display: none;
		}
		.logoye {
			position: absolute;
			right: 62px;
			top: -5px;
			img {
				width: 20px;
				height: 17px;
			}
		}
	}
	
	.dayMmonth {
		div {
			width: 19.5%;
			height: 80px;
			text-align: center;
			line-height: 30px;
		}
	}
	
	.order {
		border-bottom: 0.3px solid white;
		padding-top: 1px;
		box-sizing: border-box;
		width: 93%;
		margin-left: 3.5%;
		opacity: .2;
	}
	
	.orzhr {
		font-weight: 500;
		font-size: 36px;
		margin-top: 8px;
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
		top: -5%;
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
		top: 3%;
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
		width: 70px;
		height: 65px;
		top: 65px;
		right: -30px;
	}
	
	.ruleText::-webkit-scrollbar {
		display: none
	}
	
	.answerList::-webkit-scrollbar {
		display: none
	}
	
	.ruleText::-webkit-scrollbar {
		display: none
	}
	
	.gray {
		opacity: .5;
	}
</style>