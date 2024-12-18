<template>
	<div>
		<el-container class="container_1">
			<el-container v-bind:style="{ 'height': fullHeight + 'px'}">
				<el-main  style="height: 100%;width: 100%;overflow: visible;">
					<router-view ></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<style scoped>
</style>

<script>
 import select from '../../components/select.vue'
  export default {
	  inject:['reload'],
	components:{select},
    data() {
            return {
				
			screenWidth: document.documentElement.clientWidth,
			fullHeight: document.documentElement.clientHeight
			}
    },
	methods: {
		
		
	},		
	created() {	
		
	},
	watch:{
		screenWidth(val){
		        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
				console.log("computing.screenWidth改变");
		        if(!this.timer){
		            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth					
		            this.screenWidth = val
		            this.timer = true
		            let that = this
		            setTimeout(function(){
		                that.timer = false
		            },400)
		        }
		    },
		fullHeight(val){
		        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
				console.log("computing.fullHeight改变");
		        if(!this.timer){
					
		            // 一旦监听到的fullHeight值改变，就将其重新赋给data里的screenWidth
		            this.fullHeight = val
		            this.timer = true
		            let that = this
					
		            setTimeout(function(){
		                // 打印screenWidth变化的值
		                //console.log(that.fullHeight)
		                that.timer = false
		            },400)
		        }
		    }
	},
	mounted () {	
		//this.get();
		console.log("computing.vue")
		// this.isRouterAlive= window.localStorage.getItem("isRouterAlive");
		// this.scene= window.localStorage.getItem("Selectorscene");
		// this.selectAll=window.localStorage.getItem("SelectorAll");
		
		// this.event=this.selectAll;
	    const that = this
		window.onresize = () => {
			return (() => {
				window.screenWidth = document.body.clientWidth
				that.screenWidth = window.screenWidth
				window.fullHeight = document.documentElement.clientHeight
				that.fullHeight = window.fullHeight
			})()
		};	
		window.computing=this;
	}
  };
</script>


<style scoped>

  .el-header {
	display: flex;
	justify-content: center;
    background-color: rgba(17, 22, 42, 1);;
    color: #F0F8FF;

  }
  .el-aside {
/* 	display: block;
	position: relative;
	overflow-y: scroll; */
    color: #333;
	font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial';
  }
  
  .el-menu{
  	border-right: none;
  }
  
  .el-main {
    /* background-color: #E5ECFC; */
	 background-color: #F0F0F0;
	 padding: 0px;
  }
  
  .el-icon-message{
	  size:a3;
  }
  
  .el-menu-item {
    background-color:#333333 !important;
	color:#F0F8FF;
	font-weight: 600;
	font-size: 14px;
  }
  .el-menu-item.is-active {
   background: -webkit-linear-gradient(left,hsla(205,100%,59%,60),hsla(200,100%,30%,1),hsla(250,0%,59%,0)) no-repeat;
}
</style>