<template>
		<router-view></router-view>
</template>

<script>
	import Login from './views/Login.vue'
	import Header from '../components/Header.vue'
	import Sidebar from '../components/Sidebar.vue'
	// import select from  '../components/select.vue'
	import Home from  '../components/Home.vue'
	//import main from  '../components/main.vue'
	
//import computing from './views/computing'
export default {
	name:'App',
	provide(){
		return{
			reload:this.reload
		}
	},
	data(){
		return{
			selectAll:''
		}
	},
	methods:{
		reload(){
			this.$nextTick(function(){
				console.log('reload')
			})
		}
	}
}
</script>

<style>
	@import "./assets/css/main.css";
	@import "./assets/css/color-dark.css";
#app {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
