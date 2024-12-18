<template>
	<div class="box">
		<el-card class="box-card" style="height:auto">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<!-- <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item> -->
			    <el-breadcrumb-item>火灾应急后台管理</el-breadcrumb-item>
			   <el-breadcrumb-item>设备库管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="filter">
				<span>设备类型</span>
				<el-select v-model="selectedDevicesTypes" clearable placeholder="请选择类型">
				<el-option
					v-for="item in devicesTypes"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
				</el-select>

				<span>设备状态</span>
				<el-select v-model="selectedDevicesStatus" clearable placeholder="请选择状态">
				<el-option
					v-for="item in devicesStatus"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
				</el-select>

				<el-button type="primary" style="margin-left:1%" @click="getDevicePosition">查询</el-button>
				<el-button type="primary" style="margin-left:26%" @click="addDevice">添加设备</el-button>
				<!-- <el-button type="primary">重置</el-button> -->

			</div>
			
			<el-container style="padding: 10px 25px 0 25px">
				<el-main>
					<el-table 
					:header-cell-style="{background:'#B4E5FB'}" 
					:data="selectedDevices" 
					style="width:auto;font-size:13px;margin-top: 15px">
					<el-table-column prop="id" label="设备id" min-width="15%" align="center"
						header-align="center"></el-table-column>
					
					<el-table-column prop="type" label="设备类型" min-width="15%" align="center"
						header-align="center"></el-table-column>

					<el-table-column prop="status" label="当前状态" min-width="15%" align="center"
						header-align="center"></el-table-column>
					
					<el-table-column prop="model" label="设备型号" min-width="15%" align="center"
						header-align="center"></el-table-column>

					<el-table-column prop="task" label="分配任务" min-width="15%" align="center"
						header-align="center"></el-table-column>

					<el-table-column prop="info" label="备注信息" min-width="15%" align="center"
						header-align="center"></el-table-column>
					
					<el-table-column prop="loc" label="当前坐标" min-width="15%" align="center"
						header-align="center"></el-table-column>
					
					<el-table-column prop="" label="操作" min-width="15%" align="center"
						header-align="center">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="onSee(scope.row)">修改</el-button>
							<el-button type="danger" size="mini" style="margin-left: 0px;" @click="onDelete(scope.row)">删除</el-button>
						</template>
						
						</el-table-column>
					</el-table>
					<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="currentPage" :page-size="pageSize" :page-sizes="[3,5,10]"
						layout="total, sizes,prev, pager, next, jumper" :total="total"
						style="text-align: center;margin-top: 10px;">
					</el-pagination>
				</el-main>
			
			</el-container>
			<div style="color:white" v-if="firstShowDialog">
				<el-dialog
				title="设备详情"
				:visible.sync="showDialog"
				width="30%"
				:modal=false
				:fullscreen=false
				:before-close="closeDialog"
				>
					<div class="">
						<!-- <div class='title'>基本信息</div> -->
						<div class='c'>设备id: {{this.onSeeDevice.id}}</div>
						<!-- <div id='fireInfo'>{{this.onSeeDevice.id}}</div> -->
						<div class='c'>设备类型:
							<el-select v-model="selectedType" placeholder="请选择">
								<el-option
								v-for="item in types"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- <div id='firePointNum'>{{this.onSeeDevice.type}}</div> -->
						<div class='c'>当前状态:
							<el-select v-model="selectedStatus" placeholder="请选择">
								<el-option
								v-for="item in status"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>	
						</div>
						<!-- <div id='fireLineLength'>{{this.onSeeDevice.status}}</div> -->
						<div class='c'>设备型号:<el-input v-model="model" clearable></el-input></div>
						<!-- <div id='fireArea'>{{this.onSeeDevice.model}}</div> -->
						<div class='c'>分配任务:<el-input v-model="task" clearable autosize></el-input></div>
						<!-- <div id='fireArea'>{{this.onSeeDevice.task}}</div> -->
						<!-- <el-input v-model="input" placeholder=task></el-input> -->
						<div class='c'>设备说明:<el-input v-model="info" clearable></el-input></div>
						<div class='c'>设备坐标:<el-input v-model="position" clearable></el-input></div>
						<!-- <div id=''>{{this.onSeeDevice.loc}}</div>   -->
						<el-button type="primary" style="margin-top: 10px;" @click="updateEquip">确认修改</el-button>
					</div>
				</el-dialog>
			</div>
			<div style="color:white" v-if="showAddDeviceDialog">
				<el-dialog
				title="添加设备"
				:visible.sync="showAddDeviceDialog"
				width="30%"
				:modal=false
				:fullscreen=false
				:before-close="closeAddDeviceDialog"
				>
					<div class="">
						<!-- <div class='title'>基本信息</div> -->
						<!-- <div class='c'>设备id: {{this.onSeeDevice.id}}</div> -->
						<!-- <div id='fireInfo'>{{this.onSeeDevice.id}}</div> -->
						<div class='c'>设备类型:
							<el-select v-model="selectedAddType" placeholder="请选择">
								<el-option
								v-for="item in devicesTypes"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- <div id='firePointNum'>{{this.onSeeDevice.type}}</div> -->
						<div class='c'>当前状态:
							<el-select v-model="selectedAddStatus" placeholder="请选择">
								<el-option
								v-for="item in status"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>	
						</div>
						<!-- <div id='fireLineLength'>{{this.onSeeDevice.status}}</div> -->
						<div class='c'>设备型号:<el-input v-model="modelAdd" clearable></el-input></div>
						<!-- <div id='fireArea'>{{this.onSeeDevice.model}}</div> -->
						<div class='c'>分配任务:<el-input v-model="taskAdd" clearable autosize></el-input></div>
						<!-- <div id='fireArea'>{{this.onSeeDevice.task}}</div> -->
						<!-- <el-input v-model="input" placeholder=task></el-input> -->
						<div class='c'>设备说明:<el-input v-model="infoAdd" clearable></el-input></div>
						<div class='c'>设备坐标:<el-input v-model="positionAdd" clearable></el-input></div>
						<!-- <div id=''>{{this.onSeeDevice.loc}}</div>   -->
						<el-button type="primary" style="margin-top: 10px;" @click="addEquip">提交表单</el-button>
					</div>
				</el-dialog>
			</div>
			
			</el-card>
			</div>
</template>

<script>
	export default {
	  data() {
	    return {
			devicesTypes:[{
				value: '救护车',
				label: '救护车'
				},{
				value: '指挥所',
				label: '指挥所'
				},{
				value: '无人机',
				label: '无人机'
				},{
				value: '消防车',
				label: '消防车'
				},{
				value: '风力灭火器',
				label: '风力灭火器'
				},
			],
			devicesStatus:[{
				value: '已派遣',
				label: '已派遣'
				},{
				value: '待命中',
					label: '待命'
				},
			],
			// suggest_location: null
			event_value:'',
			eventId:'',
			eventName:'',
			event_options:[],
			tempList:[],
			devicePosition:[],
			pageSize: 5,
			currentPage: 1,
			total:0,
			time:"",
			formatTime:'' ,
			selectedDevicesTypes:'',
			selectedDevicesStatus:'',
			devices:[],
			selectedDevices:[],
			showDialog:false,
			onSeeDevice:null,
			firstShowDialog:false,
			showAddDeviceDialog:false,
			selectedDeviceId:null,
			task:"no_task",
			info:"no_info",
			types:[{
				value: '无人机',
				label: '无人机'
				}, {
				value: '消防车',
				label: '消防车'
				}, {
				value: '救护车',
				label: '救护车'
				}, {
				value: '指挥所',
				label: '指挥所'
				}, 
			],
			selectedType:null,
			status:[{
				value: '已派遣',
				label: '已派遣',
				},{
				value: '待命中',
				label: '待命中',	
				}
			],
			selectedStatus:null,
			model:null,
			position:null,
			selectedAddType:null,
			selectedAddStatus:null,
			taskAdd:null,
			infoAdd:null,
			modelAdd:null,
			positionAdd:null,
	    };
	  },
	  name: "app",

	  mounted() {
	  	//this.getEvents()
		this.getDevicePosition();
		this.getDevicesTypeList();
	  },
	  computing(){
		  this.getDevicePosition()
		  this.getDevicesTypeList();
	  },
	  methods: {
		getDevicesTypeList(){
			this.devicesTypes=[];
			const options = {
				method: 'GET',
				url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
				params: {objectType: 'equip'}
			};
			let that=this;
			this.$axios.request(options).then(function (response) {
				// console.log(response.data);
				response.data.forEach(item=>{
					var devicesTypeItem={};
					devicesTypeItem["value"]=item["objectName"];
					devicesTypeItem["label"]=item["objectName"];
					that.devicesTypes.push(devicesTypeItem);
				})
			}).catch(function (error) {
				// console.error(error);
			});
		},
		closeDialog(){
			this.showDialog=!this.showDialog;
		},
		closeAddDeviceDialog(){
			this.showAddDeviceDialog=!this.showAddDeviceDialog;
		},
	    restoreDefault(suggestLocation) {
	      // this.suggest_location = suggestLocation;
	    },
		handleSizeChange(val) {
			// console.log("handleSizeChange "+val);
			this.pageSize = val;
			this.selectedDevices=this.devices.slice(0,this.pageSize);
			this.currentPage = 1;
		},
		handleCurrentChange(val) {
			// console.log("handleCurrentChange "+val);
			this.currentPage = val;      
			if(val==1){
				this.selectedDevices=this.devices.slice(0,this.pageSize)
			}
			else{
				this.selectedDevices=this.devices.slice((val-1)*this.pageSize,(val)*this.pageSize)        
			}
			// console.log(this.selectedDevicesTypes)
			if(this.selectedDevicesTypes==''){
				this.selectedDevicesTypes=null;
			}
		},	
		getDevicePosition(){
			if(this.selectedDevicesTypes==''){
				this.selectedDevicesTypes=null;
			}
			if(this.selectedDevicesStatus==''){
				this.selectedDevicesStatus=null;
			}
			let that=this;
			this.$axios({
			method: "get",
			// url:"http://proj20.hpcner.com/paddle/getHisTable",
			url:"http://proj23.emr-c.com//SituationDisplay/getDevicePosition",
			params:{
				// 'page':this.pageSize,//4
				'page':1,//4

				// 'pagenum':this.currentPage,//1
				'pagenum':-1,//1
				type:this.selectedDevicesTypes,
              	status:this.selectedDevicesStatus,
			}
			}).then(response => {
				this.devices=[];
				// console.log(response.data);
				// that.devices=response.data;
				var selectedDevicesTemp=[];
				response.data.forEach(item =>{
					var device={};
					device["id"]=item["id"];
					device["type"]=item["type"];
					device["status"]=item["status"];
					device["model"]=item["model"];
					device["task"]=item["task"];
					device["info"]=item["info"];
					if(item["latitude"]==null){
						device["loc"]=''
					}else{
						device["loc"]=item["longitude"]+','+item["latitude"];
					}
					this.devices.push(device);
				}
				)

				this.total=response.data.length;
				// that.selectedDevices=selectedDevicesTemp;
				this.selectedDevices=this.devices.slice(0, this.pageSize);
				// console.log(that.selectedDevices);
			  }).catch(err => {
			    console.log(err);
			    this.$message.error("请求异常！");
			  });
		},
		onSee(row){ 
			this.firstShowDialog=true;
			console.log(row);
			this.onSeeDevice=row;
			this.selectedDeviceId=row.id;
			this.task=row.task;
			this.info=row.info;
			this.selectedType=row.type;
			this.selectedStatus=row.status;
			this.position=row.loc;
			// console.log(this.position);
			this.model=row.model;
			// this.$router.push({
			// 	name: 'dedDetail',
			// 	params:{
			// 		detId:row.detId
			// 	}
			// })
			this.showDialog=!this.showDialog;
		},
		onDelete(row){
			// var id=row.id;
			const options = {
				method: 'GET',
				url: 'http://proj23.emr-c.com//EquipMange//delEquip',
				params: {id: row.id}
			};
			let that=this;
			this.$axios.request(options).then(function (response) {
				if(response.status=='200'){
					that.$message.success('删除成功');
					that.getDevicePosition();
					that.currentPage = 1;
				}else{
					that.$message.error("请求异常");
				}
			}).catch(function (error) {
				console.error(error);
			});
		},
		reset(){
			this.time=''
			this.eventName=''
			this.getDevicePosition()
		},
		updateEquip(){
			const options = {
			method: 'GET',
			url: 'http://proj23.emr-c.com//EquipMange/updateEquip',
			params: {
				id: this.selectedDeviceId, 
				info: this.info, 
				model:this.model,
				status:this.selectedStatus,
				task:this.task,
				type:this.selectedType,
				lng: this.position?this.position.split(',')[0]:null,
				lat: this.position?this.position.split(',')[1]:null,
			}
			};
			let that=this;
			this.$axios.request(options).then(function (response) {
				// console.log(response);
				// console.log(response.data);
				if(response.status=='200'){
					that.$message.success("修改成功");
					that.closeDialog();
					that.getDevicePosition();
				}else{
					that.$message.error("请求异常");
				}
				// console.log(that.position.split(',')[0]+that.position.split(',')[1]);
				
			}).catch(function (error) {
				console.error(error);
			});
		},
		addDevice(){
			this.selectedAddStatus=null;
			this.infoAdd=null;
			this.selectedAddType=null;
			this.positionAdd=null;
			this.showAddDeviceDialog=true;
			this.modelAdd=null;
			this.taskAdd=null;
		},
		addEquip(){
			if(this.selectedAddType==null){
				this.$message.error("类型不能为空");
				return;
			}
			const options = {
				method: 'GET',
				url: 'http://proj23.emr-c.com//EquipMange/addEquip',
				params: {
					// id: '11', 
					info: this.infoAdd, 
					lng: this.positionAdd?this.positionAdd.split(',')[0]:null,
					lat: this.positionAdd?this.positionAdd.split(',')[1]:null, 
					type:this.selectedAddType,
					status: this.selectedAddStatus,
					model:this.modelAdd,
					task:this.taskAdd,
				}
			};
			let that=this;
			this.$axios.request(options).then(function (response) {
				console.log(response.data);
				if(response.status=='200'){
					that.$message.success("添加成功");
					that.closeDialog();
					that.getDevicePosition();
				}else{
					that.$message.error("请求异常");
				}
				that.selectedAddType=null;
				that.showAddDeviceDialog=false;
			}).catch(function (error) {
				console.error(error);
			});
		}
	  }
	};
</script>

<style scoped>
.left {
  width: 300px !important;
}
.filter{
  /* height: 50px; */
  /* width: 100%; */
  /* background: rgb(255,255,255,0.5); */
  padding-left: 25px;
  padding-top: 20px;
}
.el-main {
  padding: 0px !important;
}
.box .box-card {
    position: relative;
    margin-top: 10px;
    /* padding-top: 20px; */
    /* height: 1000px; */
    width: 100%;
}
.dialog-center{
    height: 65%;
    /* height: auto; */
    width: 20%;
    /* z-index: -1; */
    border-radius:5px 5px 5px 5px;
    /* background-color: rgb(65, 62, 62,0.6); */
    position: absolute;
    left: 12%;
    top: 50%;
    transform: translate(-50%,-50%);

}

.mydialog {
    background: rgb(61,73,106,0.7);
}

.el-dialog__body {
  padding-top:0;
  padding-bottom: 0;
  color: white;
  font-size: 18px;
  }
.LjDialog-footer {
    text-align: right;
    margin: 30px 0 0 0;
}
.el-dialog__title {
    color: white;
    caret-color: transparent;
}
</style>