<template>
	<div>
	<el-card class="box-card">
		<!-- 顶部进度条 -->
		  <el-breadcrumb separator-class="el-icon-arrow-right">
		    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		    <el-breadcrumb-item :to="{ path: '/' }">计算模块</el-breadcrumb-item>
		    <el-breadcrumb-item>任务管理</el-breadcrumb-item>
		  </el-breadcrumb>
		  </br>
	  <!-- 下方表格-->
	  <div >
		<el-tabs v-model="activeName" type="card">
		    <el-tab-pane label="任务队列" name="first">
				<el-table
				ref="table"
				      :data="tableData"
				      style="width: auto"
					  row-key="id"
					  default-expand-all="true"
					  lazy
					  :load="load"
					  :tree-props="{children: 'recordChildren', hasChildren: 'hasChildren'}" 
					  @selection-change="handleSelectionChange"
					  :header-cell-style="{background:'#B4E5FB'}"
					  :row-class-name="tableRowClassName">
				      <el-table-column
				        prop="taskName"
				        label="任务名称"
				        min-width="28%"
						align="center"
						header-align="center">
				      </el-table-column>
					  <el-table-column
					    prop="nameId"
					    label="节点名称"
					    min-width="25%"
						align="center"
						header-align="center">
						<template slot-scope="scope">
							<span v-if="!scope.row.taskName">节点{{scope.row.nodeId}}</span>
							<span v-if="scope.row.taskName">全部{{scope.row.nodeId}}</span>
							</template>
					  </el-table-column>
					  <el-table-column
					    prop="transmissionSize"
					    label="传输数据量"
					    min-width="25%"
						align="center"
						header-align="center">
						<template slot-scope="scope">
							<span>{{scope.row.transmissionSize}}KB</span>
						</template>
					  </el-table-column>
					  <el-table-column
					    prop="calculationRequire"
					    label="算力需求"
					    min-width="28%"
						align="center"
						header-align="center">
						<template slot-scope="scope">
							<span>{{scope.row.calculationRequire}}%</span>
							<el-progress 
							style="color"
							class="el-progress"
							:text-inside="true" 
							:stroke-width="18" 
							:percentage="Math.ceil(scope.row.calculationRequire)" 
							status="exception"
							@click="handleClick(scope.row)"
							></el-progress>
							</template>
					  </el-table-column>
				      <el-table-column
				        prop="cpuUsage"
				        label="CPU占用"
				        min-width="28%"
						align="center"
						header-align="center">
						<template slot-scope="scope">
							<span>{{scope.row.cpuUsage}}%</span>
							<el-progress 
							:text-inside="true" 
							:stroke-width="18" 
							:percentage="Math.ceil(scope.row.cpuUsage)" 
							status="exception"
							@click="handleClick(scope.row)"
							></el-progress>
							</template>
				      </el-table-column>
				      <el-table-column
				        prop="memoryUsage"
				        label="内存占用"
						min-width="28%"
						align="center"
						header-align="center"
						>
						<!-- v-for="(item,index) in labList" -->
						<template slot-scope="scope">
							<span>{{scope.row.memoryUsage}}%</span>
							<el-progress 
							:text-inside="true" 
							:stroke-width="18" 
							:percentage="Math.ceil(scope.row.memoryUsage)" 
							status="exception"
							@click="handleClick(scope.row)"
							></el-progress>
							</template>
				      </el-table-column>
					  <el-table-column
					    prop="state"
					    label="处理状态"
					    min-width="28%"
						align="center"
						header-align="center">
					  </el-table-column>
					  <el-table-column
					    prop="estimatedCompletionTime"
					    label="预计完成时间"
					    min-width="28%"
						align="center"
						header-align="center">
						<template slot-scope="scope">
							<span>{{scope.row.estimatedCompletionTime}}min</span>
						</template>
					  </el-table-column>
					  <el-table-column
					    prop="scheduler"
					    label="任务调度"
					    min-width="80%"
						align="center"
						header-align="center">
						<template slot-scope="scope">
							<el-button @click="priority(scope.$index, scope.row)"
						            type="primary"
						            size="mini"
						            v-if="scope.row.taskName"
									:disabled="scope.row.priorityStatus == '1'"
						    >优先</el-button>
							<el-button @click="manage(scope.$index, scope.row)"
							        type="success"
							        size="mini"
							        v-if="scope.row.taskName"
									:disabled="scope.row.schedulingLogStatus == '1'"
							>调度日志</el-button>
							<el-button @click="pause(scope.$index, scope.row)"
							        type="warning"
							        size="mini"
							        v-if="scope.row.taskName"
									:disabled="scope.row.pauseStatus == '1'"
									
							>暂停</el-button>
							<el-button @click="stop(scope.$index, scope.row)"
							        type="danger"
							        size="mini"
							        v-if="scope.row.taskName"
									:disabled="scope.row.stopStatus == '1'"
							>终止</el-button>
							
							<el-button @click="manageChildren(scope.$index, scope.row)"
							        type="success"
							        size="mini"
							        v-if="!scope.row.taskName"
									:disabled="scope.row.schedulingStatus == '1'"
							>调度</el-button>
							<el-button @click="pauseChildren(scope.$index, scope.row)"
							        type="warning"
							        size="mini"
							        v-if="!scope.row.taskName"
									:disabled="scope.row.pauseStatus == '1'"
							>暂停</el-button>
							<el-button @click="stopChildren(scope.$index, scope.row)"
							        type="danger"
							        size="mini"
							        v-if="!scope.row.taskName"
									:disabled="scope.row.stopStatus == '1'"
							>终止</el-button>
						</template>
					  </el-table-column>
				    </el-table>
			</el-tab-pane>  
		  </el-tabs>
	  </div>
	  <p></p>
	  <div style="margin-left: 35%;">
	      <el-pagination
	  	  background
	        @size-change="handleSizeChange"
	        @current-change="handleCurrentChange"
	        :current-page="currentPage"
	        :page-size="pagesize"
	        layout="total,prev, pager, next, jumper"
	        :total="total">
	      </el-pagination>
	    </div>
	</el-card>
	</div>
</template>

<script>
	export default{
		data() {
		      return {
				id:1,
				labList:[],
				labList1:[],
				percentage:0,
		        activeName: 'first',
				tableList:[],//中间数据存储数组
				tableData:[],
				currentPage: 1,
				pagesize:5,
				total:0,
				fullHeight: document.documentElement.clientHeight,
				status:'',
				taskName:'',
				taskId:''
		      };
		    },
		    methods: {
				handleSizeChange(val) {
				  //console.log(`每页 ${val} 条`);
				  this.pagesize = val;
				},
				handleCurrentChange(val) {
				  //console.log(`当前页: ${val}`);
				  this.currentPage = val;
				  this.getTableList();
				},
			    handleSelectionChange(){ 
			    },
				
				
				priority(index, row) {
				  //this.ban1 = true;
				  //this.id=index+1;
				  
				  this.taskName=row.taskName;
				  console.log(this.taskName);
				  this.status="优先";
				  this.getTableList1();
				  //this.status="暂停";
				  //this.getTableList2();
				  //console.log(this.id)
				},
				manage(index, row) {
				  //this.ban1 = true;
				  //this.id=index+1;
				  this.taskName=row.taskName;
				  console.log(this.id);
				  this.status="调度日志";
				  this.getTableList1();
				  //this.status="暂停";
				  //this.getTableList2();
				  //console.log(this.id)
				},
				pause(index, row) {
				  //this.ban1 = true;
				  //this.id=index+1;
				  this.taskName=row.taskName;
				  console.log(this.id);
				  this.status="暂停";
				  this.getTableList1();
				  //this.status="暂停";
				  //this.getTableList2();
				  //console.log(this.id)
				},
				stop(index, row) {
				  //this.ban1 = true;
				  //this.id=index+1;
				  this.taskName=row.taskName;
				  console.log(this.id);
				  this.status="终止";
				  this.getTableList1();
				  //this.status="暂停";
				  //this.getTableList2();
				  //console.log(this.id)
				},
				manageChildren(index, row) {
				  //this.ban1 = true;
				  this.taskId=row.id-10;
				  
				  if(this.taskId<=9){
				  	this.taskName="图像采集";
				  	this.id=this.taskId;
				  }else if(this.taskId>10&&this.taskId<20){
				  	 this.taskName="视频采集";
				  	this.id=this.taskId-10;
				  }else if(this.taskId>20&&this.taskId<30){
				  	this.taskName="地势勘测";
				  	this.id=this.taskId-20;
				  }else{
				  	this.taskName="勘测报告";
				  	this.id=this.taskId-30;
				  }
				  this.id=row.nodeId;
				  console.log(this.id);
				  console.log(this.taskName);
				 //console.log(this.id);
				  this.status="调度";
				  this.getTableList2();
				  //this.status="暂停";
				  //this.getTableList2();
				  //console.log(this.id)
				},
				
				pauseChildren(index, row) {
				  //this.ban1 = true;
				  this.taskId=row.id-10;
				  
				  if(this.taskId<=9){
				  	this.taskName="图像采集";
				  	this.id=this.taskId;
				  }else if(this.taskId>10&&this.taskId<20){
				  	 this.taskName="视频采集";
				  	this.id=this.taskId-10;
				  }else if(this.taskId>20&&this.taskId<30){
				  	this.taskName="地势勘测";
				  	this.id=this.taskId-20;
				  }else{
				  	this.taskName="勘测报告";
				  	this.id=this.taskId-30;
				  }
				  this.id=row.nodeId;
				  console.log(this.id);
				  console.log(this.taskName);
				  this.status="暂停";
				  
				  this.getTableList2();
				  //this.status="暂停";
				  //this.getTableList2();
				  //console.log(this.id)
				},
				stopChildren(index, row) {
				  //this.ban1 = true;
				  //this.id=row.id-30;
				  this.taskId=row.id-10;
				  
				  if(this.taskId<=9){
				  	this.taskName="图像采集";
					this.id=row.nodeId;
				  }else if(this.taskId>10&&this.taskId<20){
				  	 this.taskName="视频采集";
					 this.id=this.taskId-10;
				  }else if(this.taskId>20&&this.taskId<30){
				  	this.taskName="地势勘测";
					this.id=this.taskId-20;
				  }else{
				  	this.taskName="勘测报告";
					this.id=this.taskId-30;
				  }
				  this.id=row.nodeId;
				  console.log(this.id);
				  //console.log(this.taskName);
				  this.status="终止";
				  this.getTableList2();
				  //this.status="暂停";
				  //this.getTableList2();
				  //console.log(this.id)
				},
				
			  /* 接口尝试*/
			 getTableList() {
				 let that = this;
				 let url = that.caclulationURL3 + '/taskManagement/postAllDataByPage';
				 let params  = {"sceneName":"场景1","eventName":"场景事件1","nowPage":this.currentPage,"pageSize":this.pagesize};
				 this.$post(url,params).then((response) => {
				 this.tableList = response.data.result;
				 this.tableData = this.tableList;
				 console.log(this.tableData)
				 this.total = response.data.totalRecords;
				 //this.pagesize = response.data.nowSize;
			    })		 	
			  },
			  /* 尝试结束*/
			  
			  
			  getTableList1() {
			  	let that = this;
			  	let url = that.caclulationURL3+ '/taskManagement/setTaskManagementStatus';
			  	let params  = {"sceneName":"场景1","eventName":"场景事件1","nowPage":this.currentPage,"pageSize":this.pagesize,"task":this.taskName,"status":"优先"}
			  	this.$post(url,params).then((response) => {
			  	this.tableList = response.data.result;
			  	this.tableData = this.tableList;
			  	console.log(response.data)
			  	this.total = response.data.totalRecords;
			  	//this.pagesize = response.data.nowSize;
			     })		 	
			   },
			   
			   getTableList2() {
			   	let that = this;
			   	let url = that.caclulationURL3+ '/taskManagement/setRecordManagementStatus';
			   	let params  = {"sceneName":"场景1","eventName":"场景事件1","nowPage":this.currentPage,"pageSize":this.pagesize,"task":this.taskName,"status":this.status,"nodeId":this.id}
			   	this.$post(url,params).then((response) => {
			   	this.tableList = response.data.result;
			   	this.tableData = this.tableList;
			   	console.log(response.data)
				console.log(this.taskId);
				console.log(this.taskName);
				console.log(this.status);
			   	this.total = response.data.totalRecords;
			   	//this.pagesize = response.data.nowSize;
			      })		 	
			    },
			  
			  tableRowClassName({row, rowIndex}) {
			     if ((rowIndex + 1) % 2 === 0) {
			         return 'warning-row';
			      } 
			       return '';
			      },
			  load(tree, treeNode, resolve) {
				  selectMachineTypeChildren(tree.id).then(res => {//根据所点击行的id调接口获取第二层数据
				     if (res.code === 200) {
				       resolve(res.data.list)//渲染children数据
				     }
				   })
			  }
		    },
			mounted() {
			 //zthis.getTableList();
			  this.getTableList();
			  //this.$refs.element.$el.offsetHeight;
			  /* const that = this
			      window.onresize = () => {
			          return (() => {
			              window.screenWidth = document.body.clientWidth
			              that.screenWidth = window.screenWidth
			  			window.fullHeight = document.documentElement.clientHeight
			  			that.fullHeight = window.fullHeight
			          })()
			      } */
			   /* this.getList(); */
			},
		/* 	watch:{
				
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
								//监听表格高度
								console.log(this.$refs.table.$el.offsetHeight);
				                that.timer = false
				            },400)
				        }
				    }
			}, */
			
		
	}
</script>

<style>
	.el-progress>>>path:first-child {
	    stroke: #5500ff;
	  }
	.el-card__header{
		text-align: center;
		
	}
	.text {
	  font-size: 14px;
	}
	
	.item {
	  margin-bottom: 18px;
	}
	
	.clearfix:before,
	.clearfix:after {
	  display: table;
	  content: "";
	}
	.clearfix:after {
	  clear: both
	}
	
	.box-card{
		position: relative;
		margin-top: 30px;
		/* padding-top: 20px; */
		height: 100%;
		width: 100%;
	}
</style>

