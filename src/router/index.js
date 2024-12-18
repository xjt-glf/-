import Vue from "vue";
import VueRouter from "vue-router";
import {createRouter, createWebHashHistory} from "vue-router";
import Login from "../views/Login.vue";
import index from "../views/index.vue";
import Welcome from"../views/Welcome.vue";


import Home from '../../components/Home.vue'
import test123 from "../views/scene/test123.vue"
import gaodeMap from "../views/scene/gaodeMap"
import VueMap from "../views/scene/vueMap"
import manageLib from "../views/scene/manageLib"
import manageEquip from "../views/scene/manageEquip"
import gatewayConfig  from "../views/scene/gatewayConfig"
import manageEquipType from "../views/scene/manageEquipType"

import managePerson from "../views/scene/managePerson"
import managePersonType from "../views/scene/managePersonType"
import schemeDetail from "../views/scene/schemeDetail"

import manageFire from "../views/scene/manageFire"
import { name } from "file-loader";



Vue.use(VueRouter);
const router = new VueRouter({

  routes:[  
    {
        path: '/',
    	name:'Login',
    	component:Login
    },
	{
	    path: '/Login',
		name:'Login',
		component:Login
	},
	{
	  path:'/Home',
      name:'Home',
      component:Home,
	  redirect:'/gaodeMap',
	  children:[{
		  path:'/Welcome',
		  component:Welcome,
		  meta: {
		  
		      keepAlive: true
		  
		     }
		  },
		{
			path:'/test123',
			name:'test123',
			component:test123,
			},
		{
			path:'/gaodeMap',
			name:'gaodeMap',
			component:gaodeMap,
			},
		{
			path:'/vueMap',
			name:'vueMap',
			component:VueMap,
			},
	  ]
    },
	{
		path:'/gatewayConfig',
		name:'/gatewayConfig',
		component:gatewayConfig,
	},
	{
		path:'/schemeDetail',
		name:'/schemeDetail',
		component:schemeDetail,
		// redirect:'/manageEquip',
	},
	{
		path:'/manageLib',
		name:'manageLib',
		component:manageLib,
		redirect:'/manageEquip',
		children:[
			{
				path:'/manageEquip',
				component:manageEquip,
				meta: {	
					keepAlive: true
				}
			},
			{
				path:'/manageEquipType',
				component:manageEquipType,
				meta: {	
					keepAlive: true
				}
			},
			{
				path:'/managePerson',
				component:managePerson,
				meta: {	
					keepAlive: true
				   }
				},
			{
				path:'/managePersonType',
				component:managePersonType,
				meta: {	
					keepAlive: true
					}
				},
			{
				path:'/manageFire',
				component:manageFire,
				meta: {	
					keepAlive: true
					}
				},
		  
			{
			  path:'/test123',
			  name:'test123',
			  component:test123,
			},
		]
	  },
	
  ],
})


//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
	//to 将要访问的路径
	//from 代表从哪个路径跳转而来
	// next 是一个函数，表示放行
	//next() 放行 next('/Login')强制跳转
	if(to.path=='/Login')return next();
	//获取toke
	const tokenStr = window.localStorage.getItem('token')
	if(!tokenStr) return next('/Login')
	next()
})


export default router




