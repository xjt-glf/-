<!-- 登录页面 -->
<template>
	 <div class="login_container">
		 <div class="login_box">
			 <!--头像区域 -->
			 <div class="avatar_box">
			 	<img src="https://iccs-file.oss-cn-beijing.aliyuncs.com/ICCS/logo.jpg"/>
			 </div>
			 
			<!--登陆表单区域-->
			 <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" label-width="0px" class="login_form">
				<!--用户名-->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="zym"></el-input>
				</el-form-item>
				<!--密码-->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password" placeholder="123456"></el-input>
				</el-form-item>
				<!--按钮区-->
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
					<!-- <el-button type="text" @click="forget">忘记密码</el-button> -->
				</el-form-item>
			 </el-form>
		 </div>
	 </div>
 </template>
 
 <script>
	 import Login from '../assets/css/Login.css'
	 export default{
		 data(){
			 return{
				 userid:'',
				 res:{},
				 mes:'',
				 //这是登录表单的数据绑定对象
				 loginForm:{
					 username:'zym',
					 password:'123456',
				 },
				 //这是表单的验证规则对象
				 loginFormRules:{
					 //验证用户名是否合法
					 username:[
						 { required: true, message: '请输入登录名称', trigger: 'blur' },
						 { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					 ],
					 //验证密码是否合法
					 password:[
						 { required: true, message: '密码', trigger: 'blur' },
						 { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
					 ]
				 }
			 }
		 },
	 methods:{
		 //点击重置按钮,重置登录表单
		resetLoginForm(){
			//console.log(this);
			this.$refs.loginFormRef.resetFields();
		},
		login(){
			console.log("进入登录页面");
			this.$refs.loginFormRef.validate( valid=>{
				if(!valid) return;
				//console.log(this.loginForm.password)
				/* let that = this;
				let url =; */
				// this.$post('http://proj3.hpcner.com/login',{"userName":this.loginForm.username,"password":this.loginForm.password}).then((response) => {
			    // //console.log(res)
				
				// //console.log(this.userid)
				// // console.log(response)
				// this.mes=response.message
				// //console.log(response.status)
				// // if(this.mes!=='成功') return this.$message.error('登录失败');
				// this.$message.success('登录成功');//console.log(('登录成功'))
				// this.res=response.data.token
				// this.userid=response.data.id
				// window.localStorage.setItem("token",this.res);
				// window.localStorage.setItem("accountId",this.userid);
				// window.localStorage.setItem("username",this.loginForm.username);
				// window.localStorage.setItem("userInfo",JSON.stringify(response.data));
				// this.$router.push('/Home');
				// })
				this.$router.push('/Home');
				//console.log('登录成功');
			});
		},
	 },
	mounted () {
		// this.login();
		// this.resetLoginForm();
	}

  }
 </script>
 
 <style scoped>
	 
	 
 </style>
