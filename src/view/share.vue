<template>
	<div id="app">
		<!--背景-->
		<div class="indexBgtwo"></div>
		<!--选择你的主队，为他答题-->
		<div class="ub ub-pc youTeam">选择你的主队，为ta答题</div>
		<!--选择主队国旗-->
		<div class="teamNational">
			<div v-for="item in getTea" >
				<div><img :class="{gray:item.isOut==1}"  :src="item.logo" @click="selectTeam(item)"/>
				     <!--<img style="opacity: .4;" v-if="item.isOut==0" :src="item.logo" />-->
				</div>
				<div>{{item.cnName}}</div>
			</div>
		</div>
		<!--top-->
		<div class="bottom-position"></div>
		<!--选择主队弹框-->
		<mask-alert v-show='selectTeams'>
			<div class="ruleText">
				<div><img :src="selectTeamInfo.logo" /></div>
				<div class="inTeamTips">
					您将确定加入{{selectTeamInfo.cnName}}阵营<br /> 确定就不能修改啦
					<br />
				</div>
				<div class="inTeamBtns">
					<div class="eigh"></div>
					<div class="active" @click="sureTeam">确定</div>
					<div @click="cancleShow">取消</div>
				</div>
			</div>
		</mask-alert>
	</div>
</template>
<script>
	import MaskAlert from '../components/maskAlert'
	import AnswerBtn from '../components/ansButton'
	import app from '../public.js'
	import Bus from '../bus.js'
	export default {
		components: {
			AnswerBtn,
			MaskAlert
		},
		data() {
			return {
				/*选择主队弹框*/
				selectTeams: false,
				getTea:'',
				selectTeamInfo:{
					logo:'',
					cnName:''
				},
			}
		},
		mounted() {
			var that = this;
			app.getAction('worldCupAnswer/getTeams', {},function(res) {
				that.getTea = res.data;
			}, function(err) {
				console.log(err)
			})
		},
		methods: {
			/*选择主队国旗*/
			selectTeam(item) {
				console.log(item)
				if(item.isOut == 0){
					this.selectTeams = true;
					this.selectTeamInfo = item;
					console.log(this.selectTeamInfo.id)
				}else{
					app.toast('该队在懂球战大逃杀中已被淘汰，请选择其他球队')
				}
			},
			/*确定*/
			sureTeam() {
				var that = this;
				console.log('确定选择',this.selectTeamInfo)
				app.getAction('worldCupAnswer/chooseTeam', {
					teamId:this.selectTeamInfo.id
				},function(res) {
					console.log(res)
					if(res.code === 0){
						/*跳到答题页面*/
						that.$router.push('/main')
					}
				}, function(err) {
					console.log(err)
				})
			},
			/*取消*/
			cancleShow: function() {
				console.log('取消')
				this.selectTeams = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '../sass/style.scss';
	@import '../sass/share.scss';
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
	/*选择主队*/
	
	.youTeam {
		color: white;
		font-size: 45px;
		height: 80px;
		padding: 60px 0;
		top:0;
		position: sticky;
	}
	/*选择主队国旗*/
	
	.teamNational {
		width: 100%;
		height: 85%;
		position: fixed;
		left: 0;
		bottom: 1%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		overflow: auto;
		div {
			width: 33%;
			word-wrap: break-word;
			word-break: break-all;
			overflow: hidden;
			color: white;
			font-size: 30px;
			text-align: center;
			div {
				margin: 20px 0;
			}
			div:nth-of-type(1) {
				width: 100%;
				height: 100%;
			}
			div:last-child {
				width: 100%;
				height: 100%;
				text-align: center;
				opacity: .9;
			}
			img {
				width: 150px;
				height: 100px;
			}
			.gray{
				opacity: .5;
			}
		}
		
	}
	
	::-webkit-scrollbar {
		/*隐藏滚轮*/
		display: none;
	}
	/*top*/
	
	.bottom-position {
		width: 100%;
		height: 1px;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	
	.eigh {
		width: 100%;
		height: 30px;
		border: none!important;
	}
	/*弹框*/
	
	.ruleText {
		padding-top: 40px;
		img {
			width: 150px;
			height: 100px;
			position: relative;
			left: 50%;
			margin-left: -84px;
		}
	}
</style>