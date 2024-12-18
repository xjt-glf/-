<template>
	<div>
	<el-card class="box-card">
		<!-- 顶部进度条 -->
		 <el-breadcrumb separator-class="el-icon-arrow-right">
		   <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		   <el-breadcrumb-item :to="{ path: '/' }">计算模块</el-breadcrumb-item>
		   <el-breadcrumb-item>AI模型部署</el-breadcrumb-item>
		 </el-breadcrumb> 		    

		
		<el-form label-width="100px" :inline="true" style="margin-top: 15px;">
			<el-row :gutter="20">
				<el-form-item label="一级分类：">
					<el-select v-model="modelType" placeholder="请选择一级分类" @change="getOptions2" size="mini">
						<el-option v-for="(item, index) in options" :key="index" :label="item.chineseName" :value="item.keyWord"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="二级分类：">
					<el-select v-model="modelSubtype" placeholder="请选择二级分类" @change="selectTwo" size="mini">
						<el-option v-for="(item, index) in options1" :key="index" :label="item.chineseName" :value="item.keyWord"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label-width="10px">
					<el-button type="primary" icon="el-icon-search" @click="onSubmit" size="mini">查询</el-button>
					<el-button type="primary" @click="onClear" size="mini">重置</el-button>	 
				</el-form-item>
			</el-row>
		</el-form>
		
	  <!-- 下方表格-->
	  <div >
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
		    <el-tab-pane label="训练模型" name="1">
<!-- 					:data="tableData" stripe  style="width: 100%" -->
					<el-table 
					:header-cell-style="{background:'#B4E5FB'}"
					:data="tableData"
					style="width: 100%"
					:row-class-name="tableRowClassName">
					  <el-table-column prop="modelName" label="模型名称" min-width="25%" align="center" header-align="center"></el-table-column>
					  <el-table-column prop="updateDescription" label="更新描述" min-width="25%" align="center" header-align="center"></el-table-column>
					  <el-table-column prop="gmtCreate" label="更新时间" min-width="25%" align="center" header-align="center"></el-table-column>
					  <el-table-column prop="modelId" label="操作" min-width="25%" align="center" header-align="center">
						  <template slot-scope="scope">
						  <el-button
						  style="font-size: 13px;"
						    type="primary"
						    
						    size="mini"
						    @click="onSee(scope.row)"
						   >详情</el-button>
						  </template>
					  </el-table-column>
					</el-table>
			</el-tab-pane>
		    <el-tab-pane label="推演模型" name="2">
				<el-table 
				:header-cell-style="{background:'#B4E5FB'}"
				:data="tableData1"
				style="width: auto"
				:row-class-name="tableRowClassName">
				  <el-table-column prop="modelName" label="模型名称" min-width="25%" align="center" header-align="center"></el-table-column>
				  <el-table-column prop="updateDescription" label="更新描述" min-width="25%" align="center" header-align="center"></el-table-column>
				  <el-table-column prop="gmtCreate" label="更新时间" min-width="25%" align="center" header-align="center"></el-table-column>
				  <el-table-column prop="operation" label="操作" min-width="25%" align="center" header-align="center">
					  <template slot-scope="scope">
					  <!-- <el-button type="primary" size="mini" @click="onSee">详情</el-button> -->
					  <el-button
					  style="font-size: 13px;"
					    type="primary"
					    
					    size="mini"
					    @click="onSee(scope.row)"
					   >详情</el-button>
					  </template>
				  </el-table-column>
				</el-table>
			</el-tab-pane>
		   
		  </el-tabs>
		  
		  <p></p>
		  <div style="margin-left: 35%;">
		      <el-pagination
		  	  background
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :current-page="currentPage"
		        :page-size="pagesize"
		        layout="total, prev, pager, next, jumper"
		        :total="total">
		      </el-pagination>
		    </div>
	  </div>
	</el-card>
	</div>
</template>

<script>
	export default{
		    methods: {
				handleSizeChange(val) {
				  console.log(`每页 ${val} 条`);
				  this.pagesize = val;
				},
				handleCurrentChange(val) {
				  console.log(`当前页: ${val}`);
				  console.log(this.tabName );
				  this.currentPage = val;
				  
				  if(this.tabName == "tab-1"){
					 this.getTableList();  
				  }else
				  {
					   this.getTableList1();
				  }
				 
				},
				tableRowClassName({row,rowIndex}) {
				   if ((rowIndex + 1) % 2 === 0) {
				       return 'warning-row';
				    } 
				    //else{return '';} 
				    },
		        /* handleClick(tab, event) {
					console.log(tab, event);
					
		        }, */
				onSubmit() {
					this.currentPage=1;
					if(this.tabName == "tab-1"){
						this.getTableList();
					}else if(this.tabName == "tab-2"){
						this.getTableList1();
					}
				},
				 handleClick(tab, event) {
				        
						this.tabName=event.target.getAttribute('id');
						//this.currentPage = 1;
						console.log(this.tabName)
						console.log(this.label)
				        //console.log(event.target.getAttribute('id'))  //获取到当前元素的id
						/* if(this.label==''&&this.label2==''){
							return;
						}else{
							
						} */
						if(this.tabName == "tab-1"){
						        this.getTableList();
								/* let that = this;
								  let url = that.caclulationURL + '/aiModel/train/postInfoByPage';
								  let params  = {"category1":this.label,"category2":this.label2,"nowPage":this.currentPage,"pageSize":this.pagesize};
								  this.$post(url,params).then((response) => {
								  this.total = response.data.totalRecords;
								  console.log(response.data.totalRecords)
								}) */
						      }else if(this.tabName == "tab-2"){
						      	//this.getTableList1();
								/* let that = this;
								let url = that.caclulationURL + '/aiModel/deduction/postInfoByPage';
								let params  = {"category1":this.label,"category2":this.label2,"nowPage":this.currentPage,"pageSize":this.pagesize};
								this.$post(url,params).then((response) => {
								this.total = response.data.totalRecords; */
								//console.log(response.data.totalRecords)
								//console.log(response.data.result)
								//})
								this.currentPage=1;
								this.getTableList1();
						      }
						
				      },
			  /* 接口调用*/
			  
			    getTableList() {
					
					let that = this;
				    let url = that.caclulationURL3 + '/aiModel/train/postInfoByPage';
				    let params  = {"category1":this.label,"category2":this.label2,"nowPage":this.currentPage,"pageSize":this.pagesize};
				    this.$post(url,params).then((response) => {
				    this.tableList = response.data && response.data.result || [];
				    this.tableData = this.tableList;
					this.total = response.data && response.data.totalRecords || 0;
				    //console.log(response.data.result)
			      })		 	
			    },
			    getTableList1() {
				    let that = this;
				    let url = that.caclulationURL3 + '/aiModel/deduction/postInfoByPage';
				    let params  = {"category1":this.label,"category2":this.label2,"nowPage":this.currentPage,"pageSize":this.pagesize};
				    this.$post(url,params).then((response) => {
				    this.tableList1 = response.data && response.data.result || [];
				    this.tableData1 = this.tableList1;
					this.total = response.data && response.data.totalRecords || 0;
					//this.total = response.data.totalRecords;
					//console.log(response.data.totalRecords)
				   // console.log(response.data.result)
			      })		 	
			    },
			    /* 结束*/
			    /*本地调用选择器接口*/
			   /* getOptions(){
				    let that = this;
				    let url = that.caclulationURL + '/aiModel/postClassInfoByPage';
				    console.log(this.key); //获取选择器select当前选中的值
				    let params  = {};
				    this.$post(url,params).then((response) => {
				    this.options0 = response.data;
				    this.options1 = this.options0;
			        console.log(this.options1);
				    })
			    }, */
				getOptions(){
					let that = this;
				    let url ='http://proj3.hpcner.com/dictionary/getChildNameList?keyword=model-class';
				   // console.log("1111"+this.name1); //获取选择器select当前选中的值
				    this.$post(url).then((response) => {
					this.options0=response.data;
				    this.options = this.options0;
				    //console.log(this.options0);
				//	this.getTableList();
					})
				},
				
				getOptions2(){
					
					this.label=this.modelType
					console.log(this.label);
					this.modelSubtype = '';
					let that = this;
				    let url ='http://proj3.hpcner.com/dictionary/getChildNameList?keyword='+this.modelType;
				   // console.log("1111"+this.name1); //获取选择器select当前选中的值
				    this.$post(url).then((response) => {
					this.options01=response.data;
				    this.options1 = this.options01;
					window.localStorage.setItem("mT",this.modelType);
				    //console.log(this.options01);
				//	this.getTableList();
					})
				},
/* 				
				
			    selectOne(){
				    //console.log(this.selecyedId.value);
				    this.key=this.selecyedId.value
					this.label=this.selecyedId.label
					//console.log(this.label)
				    // console.log(this.selecyedId.subclass);
				    this.options2 = this.selecyedId.subclass;
				    //获取选择器select当前选中的值
				   // this.getOptions();  
			    }, */
			  selectTwo(){
				  this.label2=this.modelSubtype
				  //console.log(this.label2)
				  console.log(this.modelSubtype)
				  window.localStorage.setItem("mS",this.modelSubtype);
				  //this.tabName='tab-1';
				  console.log(this.tabName);
				  //this.getTableList();
				  //this.getTableList1();
				  if(this.tabName == "tab-1"){
				  		this.getTableList();  
				  }else
				  {
				  		this.getTableList1();
				  }
			  },
			  
			  
			   onSee(row){
				   this.$router.push({
				   		path: '/AIviews',
					   query: row
			       })
			    },
				onClear() {
					this.tableData=[],
					this.tableData1=[],
					this.label=','
					this.label2='',
					window.localStorage.removeItem("mT");
					window.localStorage.removeItem("mS");
					this.total=[],
				  this.value = '';
				this.value1 = '';
				  this.modelType='';
					this.modelSubtype='';
				  this.currentPage = 1;
				  this.pageSize = 5;
				},
			},
			data() {
				return {
					modelType:'',
					modelSubtype:'',
					activeName: '1',
					tableList:[],//中间数据存储数组
					tableData:[],
					tableList1:[],//中间数据存储数组
					tableData1:[],
					selecyedId:'',//已选中的角色Id值
					selecyedId1:'',//第2级已选中的角色Id值
					//key:0,
					options0:[],
					options: [],
					options1: [],
					options2: [],	
					options01: [],
					value:'',
					value1: '',
					input:'',
					isCollapse:false,
					currentPage: 1,
					pagesize:5,
					total:0,
					tabName:'tab-1',
					fullHeight: document.documentElement.clientHeight
					}				
				},
			mounted() {
				/* this.getTableList();
			    this.getTableList1(); */
				this.label = window.localStorage.getItem("mT");
				this.label2 = window.localStorage.getItem("mS");
				this.modelType=this.label
				this.modelSubtype=this.label2
				this.getTableList();
				this.getTableList1();
			    this.getOptions();
				this.modelType && this.getOptions2();
				/* const that = this
				    window.onresize = () => {
				        return (() => {
				            window.screenWidth = document.body.clientWidth
				            that.screenWidth = window.screenWidth
							window.fullHeight = document.documentElement.clientHeight
							that.fullHeight = window.fullHeight
				        })()
				    } */
			},
			/* watch:{
				
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