<template>
	
    <div>
	<el-card class="box-card" style="height: auto;">
		  <el-breadcrumb separator-class="el-icon-arrow-right">
		  		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  </el-breadcrumb>
		  </br>	
        <h1>主页面</h1>
       欢迎!
	    </el-card>
    </div>
</template>

<script>
   export default {
    }
</script>
<style scoped>
	.box-card{
		position: relative;
		margin-top: 30px;
		/* padding-top: 20px; */
		/* height: 100%; */
		width: 100%;
	}
</style>