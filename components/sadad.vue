 <template>
	 <div>
		<el-container v-bind:style="{ 'height': fullHeight*0.90 + 'px'}"><!-- style="height: 1950px;"   v-bind:style="{ 'height': screenHidth + 'px'}" -->
		   <el-aside :width="isCollapse?'80px':'220px'"style="background-color: #333333; height:100%">
		    <!-- <div class="collapse-btn" @click="toggleCollapse">
		        <i v-if="!isCollapse" class="el-icon-s-fold"></i>
		        <i v-else class="el-icon-s-unfold"></i>
		    </div> -->
		 <!--   style="
		     background-color: #333333;font-size: 10px;
		     line-height: 24px;
		     color: #FFFFFF;
		     text-align: center;
		     letter-spacing: 0.4em;
		     cursor: pointer;" -->
		   <div style="background-color: #333333;
  font-size: 22px;
  color: #FFFFFF;
  text-align: center;
  letter-spacing: 0.4em;
  cursor: pointer;" @click="toggleCollapse">
		        <i v-if="!isCollapse" class="el-icon-s-fold"></i>
		        <i v-else class="el-icon-s-unfold"></i></div>	
		 	<el-menu router :collapse-transition="true" 
		 	:collapse="isCollapse" unique-opened 
		 	background-color="#2B3968" text-color="#fff" 
		 	active-text-color="#F0F8FF"
		 	:default-active="this.$route.path"
		 	>
		 	<!-- class="el-menu-vertical-demo menu-Bar" -->
		     <!-- 一级菜单-->
		 	<el-submenu index="1">
		 		  <!-- 一级菜单的模板区域-->
		        <template slot="title">
		 			<!-- 图标 -->
		 			<i class="el-icon-upload"></i>
		 			<span style="font-family: 'ArialMT', 'Arial';
		 		    font-weight: 600;
		 		    font-size: 14px;
		 		    letter-spacing: normal;
		 		    color: #F0F8FF;
		 	        line-height: normal;">业务场景</span>
		 		</template>
		 		  <el-menu-item index="/Scene">
		 			  <template slot="title">
		 			    <!-- 文本-->
		 			    <span >业务场景管理</span>
		 			  </template>
		 			</el-menu-item>
		     </el-submenu>
		 	  
		     <el-submenu index="2">
		         <template slot="title"><i class="el-icon-edit"></i>
		 		<span style="font-family: 'ArialMT', 'Arial';
		 		  font-weight: 600;
		 		  font-size: 14px;
		 		  letter-spacing: normal;
		 		  color: #F0F8FF;
		 	    line-height: normal;">计算模块</span>
		 		</template>
		         <el-menu-item index="/task">
		         	<template slot="title">
		         	  <!-- 文本-->
		         	  <span>任务管理</span>
		         	</template>
		         </el-menu-item>
		         
		         <el-menu-item index="/AI">
		         	<template slot="title">
		         		<!-- 图标 -->
		 <!--        	  <i class="el-icon-location"></i> -->
		         	  <!-- 文本-->
		         	  <span>AI模型部署</span>
		         	</template>
		         </el-menu-item>
		         
		         <el-menu-item index="/Evaluation">
		         	<template slot="title">
		         		<!-- 图标 -->
		 <!--        	  <i class="el-icon-location"></i>
		  -->        	  <!-- 文本-->
		         	  <span>性能评估</span>
		         	</template>
		         </el-menu-item>
		     </el-submenu>
		 	  
		     <el-submenu index="3">
		         <template slot="title"><i class="el-icon-document"></i>
		 		<span style="font-family: 'ArialMT', 'Arial';
		 		  font-weight: 600;
		 		  font-size: 14px;
		 		  letter-spacing: normal;
		 		  color: #F0F8FF;
		 	    line-height: normal;">缓存模块</span>
		 		</template>
		 <!-- 			 @click="goTo('/views/page4')"   default-active="/Memory" @click="saveNavState('/Memory')"
		  -->        <el-menu-item index="/Memory">存储概览</el-menu-item>
		             <el-menu-item index="/Files">文件列表</el-menu-item>
		             <el-menu-item index="/CharacterManagement">存储任务调度</el-menu-item>
		             <el-menu-item index="/buffer">缓存性能监测</el-menu-item>
		       </el-submenu>
		 	  
		 	  <el-submenu index="4">
		 	    <template slot="title"><i class="el-icon-message"></i>
		 	  		<span style="font-family: 'ArialMT', 'Arial';
		 		  font-weight: 600;
		 		  font-size: 14px;
		 		  letter-spacing: normal;
		 		  color: #F0F8FF;
		 	    line-height: normal;">网络&通信</span>
		 	  		</template>
		 	      <el-menu-item index="/NetworkMonitor">组网监测</el-menu-item>
		 	      <el-menu-item index="/NetworkSet">组网配置</el-menu-item>
		 	      <el-menu-item index="/WAN">WAN管理</el-menu-item>
		 	    <el-menu-item index="/Commucation">通信设备</el-menu-item>
		 		</el-submenu>
		 		
		 		<el-submenu index="5">
		 		    <template slot="title"><i class="el-icon-star-off"></i>
		 				<span style="font-family: 'ArialMT', 'Arial';
		 		  font-weight: 600;
		 		  font-size: 14px;
		 		  letter-spacing: normal;
		 		  color: #F0F8FF;
		 	    line-height: normal;">边&端设备监控
		 		        </span>
		 			</template>
		 		    <!-- <el-menu-item index="UAV">无人机</el-menu-item> -->
		 		    <el-menu-item index="/HostMonitor">
		 				<template slot="title">
		 				  <!-- 文本-->
		 				  <span>边&端主机监控</span>
		 				</template>
		 			</el-menu-item>
		 		    <!-- <el-menu-item index="TeleDevice">通信设备</el-menu-item> -->
		 	</el-submenu>
		     </el-menu>
		   </el-aside>
		</el-container>
	 </div>
 </template>
 <script scoped>
   export default {
     data() {
             return {
 				options1: [{
 				          value: '选项1',
 				          label: '业务场景1'
 				        }, {
 				          value: '选项2',
 				          label: '业务场景2'
 				        }, {
 				          value: '选项3',
 				          label: '业务场景3'
 				        }, {
 				          value: '选项4',
 				          label: '业务场景4'
 				        }, {
 				          value: '选项5',
 				          label: '业务场景5'
 				        }],
 				        value1: [],
 						value2:[],
 				options2: [{
 				          value: '选项1',
 				          label: '事件1'
 				        }, {
 				          value: '选项2',
 				          label: '事件2'
 				        }, {
 				          value: '选项3',
 				          label: '事件3'
 				        }, {
 				          value: '选项4',
 				          label: '事件4'
 				        }, {
 				          value: '选项5',
 				          label: '事件5'
 				        }],		
 						value1: [],
 						value2:[],
             isCollapse:false,
 			screenWidth: document.documentElement.clientWidth,
 			fullHeight: document.documentElement.clientHeight
 			}
     },
 	methods: {
 /* 	    tableRowClassName() {
 			this.activeIndex=this.$route.path;
 			console.log(this.activeIndex)
 	    }, */
 		collapseOn(){
 			if(screenWidth<=1200)
 			{
 				console.log(screenWidth)
 				this.isCollapse=true;
 			}
 		},
 	    //点击按钮，切换导航栏的折叠与展开
 	    toggleCollapse(){
 			this.isCollapse=!this.isCollapse;
 					
 	    }
 	},		
 	created() {
 		this.tableRowClassName();	
 		this.collapseOn();
 	},
 	watch:{
 		$route(){
 			this.tableRowClassName()
 		},
 		screenWidth(val){
 		        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
 		        if(!this.timer){
 		            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
 					
 		            this.screenWidth = val
 		            this.timer = true
 		            let that = this
 		            setTimeout(function(){
 		                // 打印screenWidth变化的值
 		                //console.log(that.screenWidth)
 						/* if(screenWidth<=1200)
 						{
 							console.log(screenWidth)
 							this.isCollapse=true;	
 						}else{
 							this.isCollapse=!this.isCollapse;
 						} */
 		                that.timer = false
 		            },400)
 		        }
 		    },
 		fullHeight(val){
 		        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
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
 	    const that = this
 	        window.onresize = () => {
 	            return (() => {
 	                window.screenWidth = document.body.clientWidth
 	                that.screenWidth = window.screenWidth
 					window.fullHeight = document.documentElement.clientHeight
 					that.fullHeight = window.fullHeight
 	            })()
 	        },
 			this.collapseOn();
 	}
 /* 	mounted() {
 		this.tableRowClassName();
 	} */
 	/* 	mounted(){
 	    this.activeIndex = this.$router.path
 	    console.log(this.$router.path)
 	}, */    
 /* 		  saveNavState(activePath){
 			  window.sessionStorage.setItem('activePath',activePath)
 		  } */
 		  /* Memory(){
 			  this.$router.push({
 				  path:'/Buffer/Memory',
 			  })
 		  },
 		  goTo(path) {
 		                  this.$router.replace(path);
 		              }, */
   };
 </script>
 
 
 <style>
 /* 	.websit{
 	position: fixed;
 	display: flex;
 	width: 100%;
 	height: 100%;
 	} */
 	
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
     background-color: #E5ECFC;
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