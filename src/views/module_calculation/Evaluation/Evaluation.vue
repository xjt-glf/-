<template>
	<div>
		<el-card class="box-card" style="height: auto;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/' }">计算模块</el-breadcrumb-item>
			  <el-breadcrumb-item>性能评估</el-breadcrumb-item>
			</el-breadcrumb>
			<p></p>
			<div style="margin-left:75%;">
				<el-row :gutter="20">
					<el-col :span="4.5">
						<h3>最近</h3>
					</el-col>
					<el-col :span="9" >
						<el-input
						    placeholder="请输入数字"
						    clearable
						    @input="numberChange(arguments[0],120)"
						    @change="numberChange(arguments[0],120)"
						    v-model="input"         
						    oninput="value=value.replace(/[^0-9.]/g,'')"
							@blur="getTableList()">
					    </el-input>
					</el-col>
					<el-col :span="7">
						<h3>分钟</h3>
					</el-col>
				</el-row>
			</div>
			</br>
			<div>
				<div style="cursor:hand;width:80%;height:500px" ref="chart" @click="handleClick();"></div>
			</div>
			</br></br>
			<div>
				<div style="width:80%;height:500px" ref="chart2"></div>
			</div>
		</el-card>
	</div>
</template>

<script>
    //局部引用
	const echarts = require('echarts');
	export default{
		data(){
		return {
			input: '',//输入框内容
			xAixs:[],
			percentage:[],
			percentage1:[],
			cpu:[],
			mem:[],
			trans:[],
			trans1:[],
			blank:[],
			dataIndex:0
			
		}
		},
	methods: {
		numberChange (val,maxNum) {
		     //转换数字类型
		     this.startScore = Number(val)
		     //重新渲染
		     this.$nextTick(()=>{
		        //比较输入的值和最大值，返回小的
		        let num = Math.min(Number(val),maxNum)
		        //输入负值的情况下， = 0（可根据实际需求更该）
		        if(num<0) {
		            this.startScore = this.normal_transmission_interval
		        }else {
		            //反之
		            this.startScore = num
		        }
		     })
		},

//		initCharts(){
		// 基于准备好的dom，初始化echarts实例
//		let myChart = echarts.init(this.$refs.chart);
		
//		let myChart2 = echarts.init(this.$refs.chart2);
		// 绘制图表
		/* 第一个柱状图 */
/* 		myChart.setOption({
			
			title: { text: '统计任务执行状态' },
			legend: {
			        data: ['任务数']
			    },
			tooltip: {
			    trigger: 'axis',
				formatter: '{b} :{c}',
			    axisPointer: {
			    type: 'shadow'
			       }
			   },
			   grid: {
			          left: '3%',
			          right: '4%',
			          bottom: '3%',
			          containLabel: true
			      }, 
			xAxis: {
			data: ["节点1","节点2","节点3","节点4","节点5","节点6","节点7"]
			},
			yAxis: {},
			series: [
			 {
			       type: 'bar',
				   name:'任务数',
			       data:[120, 200, 150, 80, 70, 110,130],//this.tableData,
				  			itemStyle: {
				  				  	normal: {
				  				  		label: {
				  							formatter:'{c}',
				  				  			show: true, //开启显示
				  				  			position: 'top', //在上方显示
				  				  			textStyle: { //数值样式
				  				  						color: 'black',
				  				  						fontSize: 16
				  				  						}
				  				  				}
				  				  			}
				  				  		},
				  				  
			 }
			]  
			
			}); */
			
			/* 第二个柱状图 */
/* 			myChart2.setOption({
				title: { text: '统计节点资源占用情况' },
				legend: {},
				tooltip: {},
				 dataset: {
				        source: [
				            ['product', 'CPU', '内存占用','数据传输'],
				            ['节点1', 320, 220, 150],
				            ['节点2', 332, 182, 232],
				            ['节点3', 301, 191, 201],
				            ['节点4', 334, 234, 154],
							['节点5', 390, 290, 190]
				        ]
				    },
				xAxis: {
				data: ["节点1","节点2","节点3","节点4","节点5"]
				},
				yAxis: {},
				series: [
				  {type: 'bar'},
				  {type: 'bar'},
				  {type: 'bar'},
				  ]
				});
		}, */
		handleClick(){
			
			this.$router.push({
					path: 'taskTable',
			})
		},
		getTableList() {
			window.localStorage.setItem("input",this.input);
			let that = this;
		    let url = that.caclulationURL3 + '/evaluation/postTaskNumOfNodes';
			
		    let params  ={"sceneName":"场景1", "eventName":"场景事件1","recentTime":30} ;
		    this.$post(url,params).then((response) => {
			this.xAixs=response.data1;
			this.percentage1=response.data2;
			window.localStorage.setItem("xAixs",this.xAixs);
			window.localStorage.setItem("percentage1",this.percentage1);
			//this.percentage=this.percentage1*this.input;
			for(let i=0;i<=response.data1.length;i++)
			{
				this.percentage[i]=this.percentage1[i]*this.input;
			}
		    //console.log(response.data1.length)
		  	console.log(this.percentage)
			let myChart = echarts.init(this.$refs.chart);
			// 绘制图表
			/* 第一个柱状图 */
			myChart.setOption({
				
				title: { text: '统计任务执行状态' },
				legend: {
				        data: ['任务数']
				    },	  		
				tooltip: {
				        trigger: 'axis',
						 		 formatter: '{b} :{c}',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
						 	    grid: {
						 	           left: '3%',
						 	           right: '4%',
						 	           bottom: '3%',
						 	           containLabel: true
						 	       },
				 yAxis: {
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				xAxis: {
						 	   type:'category',
						 	   data:this.xAixs//this.yAixs//["节点1","节点2","节点3","节点4","节点5","节点6","节点7"]
				},
				series: [
				 {
					 name:'任务数',
				       type: 'bar',
				       data: this.percentage,//this.xAixs,//[29000, 30000, 30100, 100100, 120000, 600000],//this.tableData,
						 		itemStyle: {
						 			  	normal: {
						 			  		label: {
						 						formatter:'{c}',
						 			  			show: true, //开启显示
						 			  			position: 'top', //在上方显示
						 			  			textStyle: { //数值样式
						 			  						color: 'black',
						 			  						fontSize: 16
						 			  						}
						 			  				}
						 			  			}
						 			  		},
						 			  
				 }
				]
				});  
				myChart.on('click', function (params) {
				        //window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
				        //getWorkTimeAtMonth(year + "-" + encodeURIComponent(params.name), encodeURIComponent(params.name));
				console.log(params.dataIndex);
				this.dataIndex=params.dataIndex+1;
				window.localStorage.setItem("dataIndex",this.dataIndex);
				    });		
						
						
			})
			//this.getTableList1();
		},
		
		getTableList1() {
			let that = this;
		    let url = that.caclulationURL3 + '/evaluation/postAllNodesData';
			
		    let params  ={"sceneName":"场景1", "eventName":"场景事件1"} ;
		    this.$post(url,params).then((response) => {
			this.xAixs=response.data1;
			if(this.input!=0){
			this.cpu=response.data2;
			this.mem=response.data3;
			this.trans=response.data4;	
			}
			
			//this.percentage=response.data2;
		    //console.log(response.data4)	
				  		
		   
				  			
				  			/* 第二个柱状图 */
							let myChart2 = echarts.init(this.$refs.chart2);
				  			myChart2.setOption({
				  				title: { text: '统计节点资源占用情况' },
				  				legend: {},
				  				tooltip: {
				  				        trigger: 'axis',
				  						 		 formatter: '{b} :{c}',
				  				        axisPointer: {
				  				            type: 'shadow'
				  				        }
				  				    },
				  				 /* dataset: {
				  				        source: [
				  				            ['product', 'CPU', '内存占用','数据传输'],
				  				            ['节点1', 320, 220, 150],
				  				            ['节点2', 332, 182, 232],
				  				            ['节点3', 301, 191, 201],
				  				            ['节点4', 334, 234, 154],
				  							['节点5', 390, 290, 190]
				  				        ]
				  				    }, */
				  				xAxis: {
									type: 'category',
									axisTick: { show: false },
									data: this.xAixs//["节点1","节点2","节点3","节点4","节点5"]
				  				},
				  				yAxis: {
									type: 'value',
									boundaryGap: [0, 0.01]
									},
				  				series: [
									{
									    name: 'CPU',
									    type: 'bar',
									    barGap: 0,
									    //label: labelOption,
									    emphasis: {
									    focus: 'series'
									    },
									    data: this.cpu,//[320, 332, 301, 334, 390],
										itemStyle: {
											  	normal: {
											  		label: {
														formatter:'{c}%',
											  			show: true, //开启显示
											  			position: 'top', //在上方显示
											  			textStyle: { //数值样式
											  						color: 'black',
											  						fontSize: 16
											  						}
											  				}
											  			}
											  		},
									},
									{
									    name: '内存占用',
									    type: 'bar',
									    //label: labelOption,
									    emphasis: {
									    focus: 'series'
									    },
									    data:this.mem,// [220, 182, 191, 234, 290]，
										itemStyle: {
											  	normal: {
											  		label: {
														formatter:'{c}%',
											  			show: true, //开启显示
											  			position: 'top', //在上方显示
											  			textStyle: { //数值样式
											  						color: 'black',
											  						fontSize: 16
											  						}
											  				}
											  			}
											  		},
									},
									{
									    name: '数据传输',
									    type: 'bar',
									    //label: labelOption,
									    emphasis: {
									    focus: 'series'
									    },
									    data:this.trans,// [150, 232, 201, 154, 190]，
										itemStyle: {
											  	normal: {
											  		label: {
														formatter:'{c}KB',
											  			show: true, //开启显示
											  			position: 'top', //在上方显示
											  			textStyle: { //数值样式
											  						color: 'black',
											  						fontSize: 16
											  						}
											  				}
											  			}
											  		},
									}
									
									
				  				  /* {type: 'bar'},
				  				  {type: 'bar'},
				  				  {type: 'bar'}, */
				  				  ]
				  				});
								})
		},		
	},
	//一加载页面就调用
	mounted () {
		this.xAixs = window.localStorage.getItem("xAixs");
		this.percentage1 = window.localStorage.getItem("percentage1");
		this.input = window.localStorage.getItem("input");
/* 		this.trans=[];
		this.mem=[];
		this.cpu=[];
		this.percentage=[]; */
	//this.initCharts();
	this.getTableList();
	this.getTableList1();
	}
	}
</script>
<style>
	.box-card{
		position: relative;
		margin-top: 30px;
		/* padding-top: 20px; */
		height: 100%;
		width: 100%;
	}
</style>

