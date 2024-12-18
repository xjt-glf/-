<template>
    <div>
        <Header></Header>
        <div>
        <el-container class="container_1">
            <el-container v-bind:style="{ 'height': fullHeight*0.90 + 'px'}"><!-- style="height: 1950px;"   v-bind:style="{ 'height': screenHidth + 'px'}" -->
                <el-aside :width="isCollapse?'80px':'220px' " style="background-color: #333333; height:100%">
                <div  class="collapse-btn" @click="toggleCollapse">
                    <i v-if="!isCollapse" class="el-icon-s-fold"></i>
                    <i v-else class="el-icon-s-unfold"></i></div>	
                    <el-menu router :collapse-transition="true" 
                    :collapse="isCollapse" unique-opened 
                    background-color="#2B3968" text-color="#fff" 
                    active-text-color="#F0F8FF"
                    :default-active="this.$route.path"
                    >
                    <el-submenu index="设备">
                        <!-- 一级菜单的模板区域-->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-s-order"></i>
                            <span style="font-family: 'ArialMT', 'Arial';
                            font-weight: 600;
                            font-size: 14px;
                            letter-spacing: normal;
                            color: #F0F8FF;
                            line-height: normal;">设备管理</span>
                        </template>

                        <el-menu-item index="/manageEquip">设备库管理</el-menu-item>
                        <el-menu-item index="/manageEquipType">设备分类管理</el-menu-item>
                        <!-- <el-menu-item index="/managePerson">人员管理</el-menu-item>
                        <el-menu-item index="/manageFire">火场信息管理</el-menu-item>   -->
                    </el-submenu>

                    <el-submenu index="人员">
                        <!-- 一级菜单的模板区域-->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-s-order"></i>
                            <span style="font-family: 'ArialMT', 'Arial';
                            font-weight: 600;
                            font-size: 14px;
                            letter-spacing: normal;
                            color: #F0F8FF;
                            line-height: normal;">人员管理</span>
                        </template>

                        <!-- <el-menu-item index="/manageEquip">设备库管理</el-menu-item> -->
                        <!-- <el-menu-item index="/manageEquipType">分类管理</el-menu-item> -->
                        <el-menu-item index="/managePerson">人力资源管理</el-menu-item>
                        <el-menu-item index="/managePersonType">人力资源分类管理</el-menu-item>

                        <!-- <el-menu-item index="/manageFire">火场信息管理</el-menu-item>   -->
                    </el-submenu>

                    <!-- <el-submenu index="火场">
                        
                        <template slot="title">
                            
                            <i class="el-icon-s-order"></i>
                            <span style="font-family: 'ArialMT', 'Arial';
                            font-weight: 600;
                            font-size: 14px;
                            letter-spacing: normal;
                            color: #F0F8FF;
                            line-height: normal;">火灾信息管理</span>
                        </template>

                        
                        <el-menu-item index="/manageFire">火灾信息管理</el-menu-item>
                        
                    </el-submenu> -->


                    </el-menu>
                </el-aside>
                <el-main  style="height: auto;width: 100%;padding: 20px;">
                    <router-view ></router-view>
                </el-main>
            </el-container>
        </el-container>
        </div>
    </div>
</template>

<script>
import Header from '../../../components/Header.vue';
export default{
    components:{Header},
    data(){
        return{
            isCollapse:false,
			screenWidth: document.documentElement.clientWidth,
			fullHeight: document.documentElement.clientHeight
        }
    },
    methods:{
        collapseOn(){
			if(this.screenWidth<=1200)
			{
				console.log(this.screenWidth)
				this.isCollapse=true;
			}
		},
	    //点击按钮，切换导航栏的折叠与展开
	    toggleCollapse(){
			this.isCollapse=!this.isCollapse;
					
	    },
    },
    created() {	
		this.collapseOn();
	},
    watch:{
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
}
</script>
<style scoped>
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
    /* background-color: #E5ECFC; */
	 background-color: #F0F0F0;
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
.collapse-btn {
    background-color: #333333;
    font-size: 22px;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 0.4em;
    cursor: pointer;
}
</style>