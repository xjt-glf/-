<!-- 顶端大标题框架 -->
<template>
	<div>
    <div class="header">
		 <div class="logo">火灾应急后台管理</div>
		
        <div class="header-right">
            <div class="header-user-con">
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/message">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
               <!-- <div class="user-avator">
                      <img src="https://iccs-file.oss-cn-beijing.aliyuncs.com/ICCS/logo.jpg">
				</div> -->
                <!-- 用户名下拉菜单 -->
				<span style="color: #ffffff;font-size: 17px;">
				    <!-- {{this.username}} -->
                    root
				</span>
				<el-dropdown @command="handleCommand">
				  <span class="el-dropdown-link">
				    <i class="el-icon-caret-bottom"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="user">首页</el-dropdown-item>
                    <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
            </div>
        </div>
    </div>
	</div>
</template>

<script>
export default {
	methods:{
		// 获取用户名
		getName(){
			this.username = window.localStorage.getItem("username");
			// console.log(this.username)
		},
		// 退出登录返回到登录页面或者返回首页
		handleCommand(command) {
		        console.log(command)
				if(command=="loginout"){
					window.localStorage.clear();
					this.$router.push('/Login');
				}else{
					this.$router.push('/Home');
				}
		      },
		loginout(){
			this.$router.push('/Login')
		}
	},
	mounted() {
		this.getName();
	},

	data(){
		return {
		    username:'',
		    message:2,
		};
	}
};
 </script>

<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
	color: #FFFFFF;
	background-color: rgba(17, 22, 42, 1)
}

.img27 img{
	  width:400px;
	  height: 180px;
	  position:absolute;
	  display: flex;
	  left: 50%;
	  transform: translate(-50%, -40%);
	  /* display: -webkit-flex;
	  align-items:center;
	  justify-content:center; */
 }

.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
	
}
.header .logo {
	
    /* box-sizing: border-box; */
	/* padding-left: 500px; */
	/* padding-right: 50%; */
   width: 250px;
    line-height: 70px;
	position:absolute;
	display: flex;
	/* transform: translate(-45%, 30%);*/
	 left: 50%;
	transform: translate(-50%, 8%); 
	display: -webkit-flex;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fffFFf;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
