<!--无关火灾 灾难组网监控 -->
<template>

		<div style="width: auto; height: auto;">
			<el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px" class="demo-ruleForm">
				<el-row type="flex" style="height: 80px;line-height:80px; margin-left: 5px; font-weight: 700;">
					事件
				</el-row>
				<el-row type="flex" class="row-bg">
					<el-col :span="20">
						<el-form-item label="场景" prop="event">
							<el-select v-model="taskForm.event" placeholder="请选择场景" @change="">
								<!-- 	<el-option v-for="item in eventTypes" :key="item" :label="item" :value="item">
								</el-option> -->
								<el-option label="洪水" value="洪水"></el-option>
								<el-option label="火灾" value="火灾"></el-option>
								<el-option label="地震" value="地震"></el-option>
								<el-option label="泥石流" value="泥石流"></el-option>
								<el-option label="塌方" value="塌方"></el-option>
								<el-option label="踩踏" value="踩踏"></el-option>
								<el-option label="矿难" value="矿难"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
						</el-row>
					<el-row>
						<el-col :span="20">
							<el-form-item label="场景级别" prop="scale">
								<el-select v-model="taskForm.scale" placeholder="请选择类型" @change="">
									<!-- 	<el-option v-for="item in eventScales" :key="item" :label="item" :value="item">
									</el-option> -->
									<el-option label="一般" value="一般"></el-option>
									<el-option label="较大" value="较大"></el-option>
									<el-option label="重大" value="重大"></el-option>
									<el-option label="特别重大" value="特别重大"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="20">
							<el-form-item label="场景类型" prop="environment">
								<el-select v-model="taskForm.environment" placeholder="请选择类型" @change="">
									<!-- <el-option v-for="item in siteTypes" :key="item" :label="item" :value="item">
									</el-option> -->
									<el-option label="居民区" value="居民区"></el-option>
									<el-option label="商业区" value="商业区"></el-option>
									<el-option label="森林" value="森林"></el-option>
									<el-option label="山地" value="山地"></el-option>
									<el-option label="工厂" value="工厂"></el-option>
									<el-option label="矿区" value="矿区"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="20">
							<el-form-item label="受灾人数" prop="number">
								<el-input v-model="taskForm.number" placeholder="请输入受灾人数" @change="">
								</el-input>
						
							</el-form-item>
						</el-col>
					</el-row>
	
				<el-row type="flex" style="height: 80px;line-height:80px; margin-left: 5px;font-weight: 700;">
					组网
				</el-row>
				<el-row type="flex" class="row-bg">
					<el-col :span="20">
						<el-form-item label="绑定组网" prop="network">
							<el-select v-model="taskForm.network" filterable placeholder="请选择组网" @change="">
									<el-option v-for="item in network_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
								<!-- <el-option label="组网1" value="1"></el-option>
								<el-option label="组网2" value="2"></el-option>
								<el-option label="组网3" value="3"></el-option> -->
							</el-select>
						</el-form-item>
					</el-col>

				</el-row>
					<div style="text-align: center; margin-top:20px; ">
					<!-- <el-button @click="submit('taskForm')" style="width: 130px;" type="success">确定</el-button> -->
					<el-button @click="resetForm('taskForm')" style="width: 130px;margin-bottom:20px">重置</el-button>

				</div>
			</el-form>
		</div>

</template>

<script>
	
	export default {
		data() {
			return {
				eventTypes: [],
				eventScales: [],
				siteTypes: [],
				network_options: [],
				taskForm: {
					event: "",
					scale: "",
					number: "",
					latitude:"",//纬度
					longitude:"",//经度
					radius:"",
					environment: "",
					network: "",
					
				},

				rules: {
					event: [{
						required: true,
						message: "请选择事件类型",
						trigger: "change"
					}],
					scale: [{
						required: true,
						message: "请选择事件规模",
						trigger: "change"
					}],
					number: [{
						required: true,
						message: "请选择事件规模",
						trigger: "change"
					}],
					environment: [{
						required: true,
						message: "请选择地点类型",
						trigger: "change"
					}],
					
				}
			};
		},

		created(){
			this.getNetworkOptions()
		},
		methods:{
			val(){
				this.$emit('taskForm',taskForm)
			},
			getNetworkOptions(){
				this.$axios({
					method: 'get', //delete
					url: '../static/deviceManagement/networkOptions.json',
				}).then(rep => {
					if (rep.data.success) {
						this.network_options = rep.data.data
						//console.log(this.type_options)	
					} else {
						this.$message.error('获取失败！')
					}
				}).catch(err => {
					//console.log(err)
					this.$message.error('请求异常！')
				})
			},
			resetForm(formName) {
			  this.$refs[formName].resetFields();
			},
			submit(formName){
				this.$refs[formName].validate(valid => {
				  if (valid) {
				   //console.log(this.taskForm)
				this.$emit('taskForm',this.taskForm)
				  } else {
				    console.log("error submit!!");
				    return false;
				  }
				});
			},
			validate(){
				this.$refs["taskForm"].validate(valid => {
				  if (valid) {
				// console.log(this.taskForm)
				this.$emit('taskForm',this.taskForm,true)
				this.$emit('bool',true)
				return true
				  } else {
				    console.log("error submit!!");
				    return false;
				  }
				});
			}
		}
		
	}
</script>

<style>

</style>
