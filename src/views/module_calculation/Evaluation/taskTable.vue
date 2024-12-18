<template>
	<div>
		<el-card class="box-card">
		  <div>
			  <el-breadcrumb separator-class="el-icon-arrow-right">
			    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			    <el-breadcrumb-item :to="{ path: '/' }">计算模块</el-breadcrumb-item>
			    <el-breadcrumb-item :to="{ path: '/Evaluation'}">性能评估</el-breadcrumb-item>
				<el-breadcrumb-item>任务报表</el-breadcrumb-item>
			  </el-breadcrumb>
			  </div>
			  </br>
			  <el-table
			      ref="table"
			      :header-cell-style="{background:'#B4E5FB'}"
			      :data="this.tableData"
			      style="width: auto"
			      :row-class-name="tableRowClassName">
			      <el-table-column
			        align="center"
			        header-align="center"
					prop="nodeId"
			        label="节点名称"
			        min-width="28%">
					<template slot-scope="scope">
						<span>节点{{scope.row.nodeId}}</span>
					</template>
			      </el-table-column>
			      <el-table-column
			        align="center"
			        header-align="center"
					prop="taskName"
			        label="任务名称"
			        min-width="28%">
			      </el-table-column>
			      <el-table-column
				    align="center"
				    header-align="center"
			        prop="executedTime"
			        label="执行时间"
					min-width="28%">
					<template slot-scope="scope">
						<span>{{scope.row.executedTime}}min</span>
					</template>
			      </el-table-column>
				  <el-table-column
				    align="center"
				    header-align="center"
				    prop="energyConsumption"
				    label="耗能"
					min-width="28%">
					<template slot-scope="scope">
						<span>{{scope.row.energyConsumption}}MB</span>
					</template>
				  </el-table-column>
			    </el-table>
				
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
		</el-card>
		</div>
		
</template>

<script>
  export default {
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
			tableRowClassName({row, rowIndex}) {
			   if ((rowIndex + 1) % 2 === 0) {
			       return 'warning-row';
			    }else{
					return '';
				} 
			     
			    },
			getTableList() {
				console.log(this.dataIndex);
			    let that = this;
			    let url = that.caclulationURL3 + '/taskReportTable/postReportsByPage&nodeId';
				//console.log(this.currentPage);
			    this.$post(url,{"sceneName":"场景1","eventName":"场景事件1","nodeId":this.dataIndex,"nowPage":this.currentPage,"pageSize":this.pagesize,"recentTime":30}).then((response) => {
			    console.log( response.data.totalRecords);
				console.log( response);
				this.tableList = response.data.result;
			    this.tableData = this.tableList;
				this.total=response.data.totalRecords
				//console.log( response);
			    })   
				   
			    },
	      },
    /* filters:{
		rounding(value){
			return value.toFixed(0)
		}
	}, */
	data() {
      return {
		
	    tableList:[],//中间数据存储数组
		tableData:[],
		currentPage:1,
		pagesize:5,
		total:0,
		fullHeight: document.documentElement.clientHeight,
		dataIndex1:0,
		dataIndex:0,
      }
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
		                that.timer = false
		            },400)
		        }
		    }
	}, */
	mounted () {
		//console.log(this.$refs.table.$el.offsetHeight);
		this.dataIndex = window.localStorage.getItem("dataIndex");
		//this.dataIndex=this.dataIndex1+1
		console.log(this.dataIndex)
		//this.$refs.element.$el.offsetHeight;
		this.getTableList();
	    /* const that = this
	        window.onresize = () => {
	            return (() => {
	                window.screenWidth = document.body.clientWidth
	                that.screenWidth = window.screenWidth
					window.fullHeight = document.documentElement.clientHeight
					that.fullHeight = window.fullHeight
	            })()
	        } */
	}

  }
</script>

<style>
	.el-table{
	  width: 100%;
	  .el-table__header-wrapper table,.el-table__body-wrapper table{
	    width: 100% !important;
	  }
	  .el-table__body, .el-table__footer, .el-table__header{
	    table-layout: auto;
	  }
	}
	.box-card{
		position: relative;
		margin-top: 30px;
		/* padding-top: 20px; */
		/* height: 100%; */
		width: 100%;
	}
	.el-table .warning-row {
	    background: oldlace;
	  }
	
	.el-table .success-row {
	    background: #f0f9eb;
	  }
</style>


 