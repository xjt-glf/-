<template>
  <div>
	  <!-- 卡片组件-->
	<el-card class="box-card">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/' }">计算模块</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/AI' }">AI模型部署</el-breadcrumb-item>
		  <el-breadcrumb-item>AI模型样本数据</el-breadcrumb-item>
		</el-breadcrumb>
		</br>

	  <!-- 搜索 -->
	  <div style="margin-top: 15px">
	   <el-row :gutter="20">
	  	  <el-col :span="4"><el-input v-model="input" placeholder="输入文件名称查询"  size="mini"></el-input></el-col>
	  		 <el-button type="primary" icon="el-icon-search" @click="onSubmit" size="mini">查询</el-button>
	  		 <el-button type="primary" icon="el-icon-refresh" @click="onClear" size="mini">重置</el-button>
	  </el-row>
	  </div>

	  </br>
		
		  <!-- 表格控件-->
	      	  <el-table
			      size="large"
				  :header-cell-style="{background:'#B4E5FB'}"
	      	      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
	      	      style="width: 100%"
	      	      :row-class-name="tableRowClassName">
	      	      <el-table-column
				    align="center"
				    header-align="center"
	      	        prop="dataName"
	      	        label="文件名称"
	      	        min-width="25%">
	      	      </el-table-column>
	      	      <el-table-column
				    align="center"
				    header-align="center"
	      	        prop="dataSize"
	      	        label="文件大小"
	      	       min-width="25%">
	      	      </el-table-column>
	      	    </el-table>
				</br>
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
    //单页面中不支持前面的data:{}方式
    data() {
		return{
			input: '',//输入框内容
			total: 2,
			currentPage: 1,
			pagesize:5,
			tableList:[],//中间数据存储数组
			tableData:[]
      }
    },
        methods: {
            handleNodeClick(data) {
                  console.log(data);
                },
		    /* getTableList() {
		      this.$get('static/AIviews.json').then((response) => {
		      this.tableList = response;
		      this.tableData = this.tableList;
		      })
		    }, */
			getTableList() {
				let that = this;
				let url =that.caclulationURL3 +'/aiModel/train/postDataByPageAndName';
				let params  = {
					"modelId": this.$route.query.id,
					nowPage: this.currentPage,
					pageSize: this.pagesize,
					dataName: this.input,
				};
				this.$post(url,params).then((response) => {
				this.tableList = response.data && response.data.result || [];
				this.tableData = this.tableList;
				this.total = response.data && response.data.totalRecords || 0;
				console.log(response.data)
			  })		 	
			},
			downLoad(index, row) {
				this.$confirm('此操作将下载该文件到本机, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'success'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: '下载成功!'
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消下载'
				          });          
				        });
				        /* console.log(index, row); */
			},
			tableRowClassName({row, rowIndex}) {
			   if ((rowIndex + 1) % 2 === 0) {
			       return 'warning-row';
			    } /* else{
			       return 'success-row';
			     } */
			     return '';
			    },
			onSubmit() {
			  this.getTableList();
			},
			//重置
			onClear() {
			  this.value = '';
			  this.input = '';
			  this.tableData = this.tableList;
			  this.currentPage = 1;
			  this.pageSize = 5;
			},
			handleSizeChange(val) {
			  //console.log(`每页 ${val} 条`);
			  this.pagesize = val;
			  this.getTableList();
			},
			handleCurrentChange(val) {
			  //console.log(`当前页: ${val}`);
			  this.currentPage = val;
			  this.getTableList();
			},
			tableRowClassName({row, rowIndex}) {
			   if ((rowIndex + 1) % 2 === 0) {
			       return 'warning-row';
			    } 
			     return '';
			    },
        },
		mounted() {
		  this.getTableList()
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