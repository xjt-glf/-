<template>
	<div class="box">
		<el-card class="box-card" style="height:auto">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<!-- <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item> -->
			    <el-breadcrumb-item>人员管理</el-breadcrumb-item>
			   <el-breadcrumb-item>人员分类管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="filter">

				<el-button type="primary"  @click="addPersonType">添加人员类别</el-button>

			</div>
			
			<el-container style="padding: 10px 25px 0 25px">
				<el-main>
					<el-table 
					:header-cell-style="{background:'#B4E5FB'}" 
					:data="personTypeList" 
					style="width:auto;font-size:13px;margin-top: 15px">

					<el-table-column v-if="false" prop="id" label="id" min-width="15%" align="center"
						header-align="center"></el-table-column>

                    <el-table-column prop="type" label="人员类型" min-width="15%" align="center"
						header-align="center"></el-table-column>

                    <el-table-column prop="icon" label="人员图标" min-width="15%" align="center"
						header-align="center">
                            <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。 -->
                            <!-- slot插槽可以传递任何属性或html元素，但是在调用组件的页面中我们可以使用 template slot-scope="props"来获取插槽上的属性值，获取到的值是一个对象。 -->
                            <template slot-scope="scope">
                            <!-- scope.row获取当前行所有数据 作用域插槽获取当前行的数据（可以是图片连接如下：:src="scope.row.iconImgLarge"） -->
                                <el-image style="width: 50px; height: 50px" :src="scope.row.icon" fit=""></el-image>
                            </template>
                        </el-table-column>

                    <el-table-column prop="count" label="人员数量(已派遣/待命中)" min-width="15%" align="center"
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
			<div style="color:white" v-if="showDialog">
				<el-dialog
				title="更改人员绑定图标"
				:visible.sync="showDialog"
				width="30%"
				:modal=false
				:fullscreen=false
				:before-close="closeDialog"
				>
					<div class="">
						<!-- <div class='title'>基本信息</div> -->
						<div class='c'>人员种类: {{this.onSeeDevice.type}}</div>
						<!-- <div id='fireInfo'>{{this.onSeeDevice.id}}</div> -->
						<div class='c'>人员图标:
							<el-image style="width: 50px; height: 50px" :src="this.onSeeDevice.icon" fit=""></el-image>
						</div>
						<div class='c'>选择新的人员图标:
							<!-- <el-image style="width: 50px; height: 50px" :src="scope.row.icon" fit=""></el-image> -->
                        </div>
						<el-upload v-if="!uploaded"
							action="#"
							list-type="picture-card"
							:limit=1
							:multiple=false
							ref="pics"
							:file-list="fileList"
							:on-exceed="handleExceed"
							:on-error="uploaderror"
							:on-change="onChange"
							:before-upload="beforeAvatarUpload"
							
							:auto-upload=false>
								<i slot="default" class="el-icon-plus"></i>
								<div slot="file" slot-scope="{file}">
								<img
									class="el-upload-list__item-thumbnail"
									:src="file.url" alt=""
								>
								<span class="el-upload-list__item-actions">
									<span
									class="el-upload-list__item-preview"
									@click="handlePictureCardPreview(file)"
									>
									<i class="el-icon-zoom-in"></i>
									</span>
									<span
									v-if="!disabled"
									class="el-upload-list__item-delete"
									@click="handleDownload(file)"
									>
									<i class="el-icon-download"></i>
									</span>
									<span
									v-if="!disabled"
									class="el-upload-list__item-delete"
									@click="handleRemove(file)"
									>
									<i class="el-icon-delete"></i>
									</span>
								</span>
								</div>
						</el-upload>
						<!-- <template slot-scope="scope">
							<el-button type="primary" style="margin-top: 10px;" @click="updateEquip(row.id)">确认修改</el-button>
						</template> -->
						<el-button type="primary" style="margin-top: 10px;" @click="updateEquipIcon">确认修改</el-button>
					</div>
				</el-dialog>
			</div>
			<div style="color:white" v-if="showAddPersonDialog">
				<el-dialog
				title="添加人员类别"
				:visible.sync="showAddPersonDialog"
				width="30%"
				:modal=false
				:fullscreen=false
				:before-close="closeAddPersonDialog"
				>
					<div class="">
						<div class='c'>人员名称:<el-input v-model="ObjectNameAdd" clearable></el-input></div>
						<div class='c'>人员图标:
                        </div>
						<el-upload v-if="!uploaded"
							action="#"
							list-type="picture-card"
							:limit=1
							:multiple=false
							ref="pics"
							:file-list="fileList"
							:on-exceed="handleExceed"
							:on-error="uploaderror"
							:on-change="onChange"
							:before-upload="beforeAvatarUpload"
							
							:auto-upload=false>
								<i slot="default" class="el-icon-plus"></i>
								<div slot="file" slot-scope="{file}">
								<img
									class="el-upload-list__item-thumbnail"
									:src="file.url" alt=""
								>
								<span class="el-upload-list__item-actions">
									<span
									class="el-upload-list__item-preview"
									@click="handlePictureCardPreview(file)"
									>
									<i class="el-icon-zoom-in"></i>
									</span>
									<span
									v-if="!disabled"
									class="el-upload-list__item-delete"
									@click="handleDownload(file)"
									>
									<i class="el-icon-download"></i>
									</span>
									<span
									v-if="!disabled"
									class="el-upload-list__item-delete"
									@click="handleRemove(file)"
									>
									<i class="el-icon-delete"></i>
									</span>
								</span>
								</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">             
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
						<el-button v-if="!uploaded" type="primary" style="margin-top:10px ;margin-left:10px" v-on:click="uploadImg" round>上传图片</el-button>
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
			// suggest_location: null
			pageSize: 5,
			currentPage: 1,
			total:0,
			showDialog:false,
			onSeeDevice:{},
			firstShowDialog:false,
			showAddPersonDialog:false,
			selectedType:null,
            personTypeList:[],
			selectedPersonTypeList:[],

			uploaded:false,
			fileList:[],
			dialogVisible:false,
			dialogImageUrl:'',
			formData:null,
			ObjectNameAdd:'',
			disabled:false,
	    };
	  },
	  name: "app",

	  mounted() {
		this.getPersonTypeList();
	  },
	  computing(){
		this.getPersonTypeList()
	  },
	  methods: {
        handleRemove(file) {
			console.log(file);
			console.log(this.$refs.pics.uploadFiles);//拿到当前所有已选择的图片
			this.fileList.splice(0,1);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleDownload(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1个图片`);
		},
		uploadImg(){
			if(this.fileList.length==0){
				this.$message.error("请选择上传图片!");
				return;
			}
			// console.log("正在上传图片");	
			// console.log("fileList:"+this.fileList);
			// console.log("formData:"+this.formData);
			let config = {
				headers: {
				'Content-Type': 'multipart/form-data'
				}
			}
			//   console.log(this.fileList);
			//   console.log(this.formData);
			this.formData = new FormData();
			this.formData.append('imgFile',this.fileList[0].raw);
			this.formData.append("name", this.ObjectNameAdd);
			// form.append("imgFile", ["D:\\hpcn\\ICCS-B-Client23-1 - 副本\\src\\images\\Scene\\ren.png"]);
			this.formData.append("objectType", "person");
			// console.log(this.fileList[0].raw+" "+this.ObjectNameAdd);
			// console.log(this.fileList[0].raw)
			// return ;
			this.$axios.post("http://47.94.10.119:20008/ResourceCategory/addCategory", this.formData,config).then(res=>{
					if (res.status=="200") {
						this.$message.success("上传成功");
						// console.log("图片上传成功。")
						// console.log(res.data.img_path);
						this.formData=null;
						this.fileList=[];
						this.ObjectNameAdd=null;
						this.showAddPersonDialog=!this.showAddPersonDialog;
						this.getPersonTypeList();
					} else {
						console.log("图片上传失败。")
						this.$message.error("上传失败");
					}
				}
			)
		},
		beforeAvatarUpload(file) {
		},
		handleAvatarSuccess(res, file) {
			},
		uploaderror(){
			// console.log("上传失败");
		},
		onChange (file, fileList) {
			// console.log("执行了:on-change=onChange");
			let typeArray = ['image/jpg', 'image/jpeg', 'image/png' ]
			let isJPG = typeArray.indexOf(file.raw.type)
			if (isJPG === -1) {
			this.$message.error('上传图片只能是 jpg或者 png 格式！')
			fileList.pop()
			}
			this.fileList = fileList
		},

        addPersonType(){
			this.selectedAddType=null;
			this.showAddPersonDialog=true;
        },
        getPersonTypeList(){
            // 模拟数据
            // this.ObjectTypeList.push(
            //     {type:"救护车",icon:"/src/images/Scene/jiuhuche.png",count:"8/12"},
            //     );
            // this.ObjectTypeList.push(
            //     {type:"无人机",icon:"/src/images/Scene/wurenji1.png",count:"13/12"},  
            // );
            // this.ObjectTypeList.push(
            //     {type:"消防车",icon:"/src/images/Scene/xiaofangche.png",count:"3/9"},
            // );
            // console.log(this.ObjectTypeList);
            this.personTypeList=[];
            const options = {
                method: 'GET',
                url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
                params: {objectType: 'person'}
            };
			let that=this;
			this.$axios.request(options).then(function (response) {
				// console.log(response.data);
             that.total=response.data.length;
				response.data.forEach( objType =>{
                    // console.log(objType);
                    var equipTypeObj={};
					equipTypeObj["id"]=objType["id"];
                    equipTypeObj["type"]=objType["objectName"];
                    // equipTypeObj["icon"]="/src/images/Scene/"+objType["imgUrl"]+".png";
					equipTypeObj["icon"]=objType["imgUrl"]
					// console.log(equipTypeObj["icon"]);
                    equipTypeObj["count"]=objType["usedCount"]+"/"+objType["availableCount"];
                    that.personTypeList.push(equipTypeObj);
                })
				that.selectedPersonTypeList=that.personTypeList.slice(0, that.pageSize);
			}).catch(function (error) {
				console.error(error);
			});
        },
		closeDialog(){
			this.showDialog=false;
		},
		closeAddPersonDialog(){
			this.showAddPersonDialog=!this.showAddPersonDialog;
		},
		handleSizeChange(val) {
			// console.log("handleSizeChange "+val);
			this.pageSize = val;
			this.selectedObjectTypeList=this.ObjectTypeList.slice(0,this.pageSize);
			this.currentPage = 1;
		},
		handleCurrentChange(val) {
			// console.log("handleCurrentChange "+val);
			this.currentPage = val;      
			if(val==1){
				this.selectedObjectTypeList=this.ObjectTypeList.slice(0,this.pageSize)
			}
			else{
				this.selectedObjectTypeList=this.ObjectTypeList.slice((val-1)*this.pageSize,(val)*this.pageSize)        
			}
			// console.log(this.selectedDevicesTypes)
			// if(this.selectedDevicesTypes==''){
			// 	this.selectedDevicesTypes=null;
			// }
		},
		onSee(row){ 
			this.onSeeDevice["id"]=row.id;
            this.onSeeDevice["type"]=row.type;
            this.onSeeDevice["icon"]=row.icon;
            // console.log(row.icon);
            // /src/images/Scene/jiuhuche.png
            
			// this.firstShowDialog=true;
			this.showDialog=true;
		},
		onDelete(row){
			// console.log(row.id);
			// var id=row.id;
			const options = {
				method: 'GET',
				url: 'http://47.94.10.119:20008/ResourceCategory/delCategory',
				params: {id: row.id}
			};
			let that=this;
			this.$axios.request(options).then(function (response) {
				if(response.status=='200'){
					// console.log(response)
					that.$message.success('删除成功');
					that.getPersonTypeList();
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
		updateEquipIcon(){
			if(this.fileList.length==0){
				this.$message.error("请选择上传图片!");
				return;
			}
			// console.log("正在上传图片");	
			// console.log("fileList:"+this.fileList);
			// console.log("formData:"+this.formData);
			let config = {
				headers: {
				'Content-Type': 'multipart/form-data'
				}
			}
			//   console.log(this.fileList);
			//   console.log(this.formData);
			this.formData = new FormData();
			this.formData.append('id',this.onSeeDevice["id"]);
			this.formData.append('imgFile',this.fileList[0].raw);
			// console.log(this.fileList[0].raw+" "+this.ObjectNameAdd);
			// console.log(this.fileList[0].raw)
			// return ;
			this.$axios.post("http://47.94.10.119:20008/ResourceCategory/updateCategory", this.formData,config).then(res=>{
				if (res.status=="200") {
						this.$message.success("修改成功");
						// console.log("图片上传成功。")
						// console.log(res.data.img_path);
						this.formData=null;
						this.fileList=[];
						this.ObjectNameAdd=null;
						this.showDialog=false;
						this.getPersonTypeList();
					} else {
						// console.log("失败。")
						this.$message.error("上传失败");
					}
			})
		},
		
		
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