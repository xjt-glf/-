<template>
	<div style="padding-left: 65%;padding-top: 4%;">
		<!-- <el-row :gutter="20">
			<el-col :span="9"> -->
			<div>  
			  <el-select v-model="value1" placeholder="请选择">
			    <el-option
			      v-for="item in options1"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			  </div>
			<!--  </el-col>
			  <el-col :span="10"> -->
			  <div class="grid-content bg-purple">
			   <el-select v-model="value2" placeholder="请选择"
			   style="margin-left: 20px;">
			    <el-option
			       v-for="item in options2"
			       :key="item.value"
			       :label="item.label"
			       :value="item.value">
			    </el-option>
			   </el-select>
			   </div>
		<!-- 	   </el-col>
			   </el-row> -->
			   </div>
</template>

<script>
	export default {
	  data() {
	          return {
					options1: [{
					          value: '选项1',
					          label: '业务场景1'
					        }, {
					          value: '选项2',
					          label: '业务场景2'
					        }, {
					          value: '选项3',
					          label: '业务场景3'
					        }, {
					          value: '选项4',
					          label: '业务场景4'
					        }, {
					          value: '选项5',
					          label: '业务场景5'
					        }],
					        value1: [],
							value2:[],
					options2: [{
					          value: '选项1',
					          label: '事件1'
					        }, {
					          value: '选项2',
					          label: '事件2'
					        }, {
					          value: '选项3',
					          label: '事件3'
					        }, {
					          value: '选项4',
					          label: '事件4'
					        }, {
					          value: '选项5',
					          label: '事件5'
					        }],		
							value1: [],
							value2:[],
				}
	  },
	  }
</script>

<style>
</style>
