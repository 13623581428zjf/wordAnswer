<template>
    <transition name='fade'>
    	<div v-show='visible' :class='position' class='loadingstyle'>
	    	<div class="spinner">
			  <div class="rect1"></div>
			  <div class="rect2"></div>
			  <div class="rect3"></div>
			  <div class="rect4"></div>
			  <div class="rect5"></div>
			</div>
	         <span>{{message}}</span>
	    </div>
    </transition>
</template>

<script>
   import pageChange from '../../mixins/index'
	export default {
		mixins: [pageChange],
        data() {
            return {
                visible: false,
                message : '',
                position : ''
            };
        }
    }
</script>


<style scoped lang="scss">
.loadingstyle {
    position: fixed;
    left:50%;
    transform:translate(-50%,-50%) scale(1);
    word-wrap:break-word;
    padding:40px 10px;
    text-align: center;
    z-index:9999;
    font-size:24px;
    width:180px;
    color: #fff;
    font-size:"微软雅黑";
    border-radius: 5px;
    background: rgba(0,0,0,0.7);
    overflow: hidden;
}
.loadingstyle span{
	display: block;
	padding-top:30px;
	font-size:24px;
}
.loadingstyle.middle{
    top:50%;
}
.loadingstyle.top{
    top:20%;
}
.loadingstyle.bottom{
    top:80%;
}
.loadingstyle.leave{
    top:200%;
}
.fade-enter-active, .fade-leave-active {
  transition: transform .5s;
}
.fade-enter, .fade-leave-active {
	transform:translate(-50%,-50%) scale(0);
}
.spinner {
  margin:0 auto;
  width: 100px;
  height: 60px;
  text-align: center;
  font-size: 24px;
}
 
.spinner > div {
  background-color: #67CF22;
  height: 100%;
  width: 6px;
  display: inline-block;
   
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
 
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>
