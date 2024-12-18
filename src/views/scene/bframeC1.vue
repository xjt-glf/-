<template>
    <div class="bframec1">
        <!-- bframec1: bounce-frame-center-1 中间弹窗1 -->

        <el-dialog
        title="设备库资源列表"
        :visible.sync="bframeC1_show"
        width="30%"
        :modal=false

        :fullscreen=true
        :before-close="changeShow"
        >
        <!-- <span>这是居中弹窗1</span> -->
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="changeShow">取 消</el-button>
            <el-button type="primary" @click="changeShow">确 定</el-button>
        </span> -->
        <div>
          <el-button type="primary" @click="openFilelineEditiorMenu">编辑火线</el-button>
        </div>
          <!-- <div class="filter">
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

            <el-button type="primary" style="margin-left:1%" @click="getDevicesData">查询</el-button>

          </div> -->

          <el-container >
            <el-main>
              <el-table 
                :header-cell-style="{background:'#B4E5FB'}" 
                :data="selectedObjectTypeList" 
                style="width:auto;font-size:13px;margin-top: 15px">

                <el-table-column  v-if="false" prop="objType" label="personOrEquipOrFire" min-width="15%" align="center"
                  header-align="center"></el-table-column>

                <el-table-column prop="type" label="资源类型" min-width="15%" align="center"
                  header-align="center"></el-table-column>

                <el-table-column prop="icon" label="资源图标" min-width="15%" align="center"
                  header-align="center">
                      <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。 -->
                      <!-- slot插槽可以传递任何属性或html元素，但是在调用组件的页面中我们可以使用 template slot-scope="props"来获取插槽上的属性值，获取到的值是一个对象。 -->
                      <template slot-scope="scope">
                      <!-- scope.row获取当前行所有数据 作用域插槽获取当前行的数据（可以是图片连接如下：:src="scope.row.iconImgLarge"） -->
                          <el-image style="width: 50px; height: 50px" :src="scope.row.icon" fit=""></el-image>
                      </template>
                  </el-table-column>

                <!-- <el-table-column v-if="false" prop="iconUrl" label="资源图标url" min-width="15%" align="center"
                  header-align="center"></el-table-column> -->

                <el-table-column prop="count" label="资源数量(已派遣/待命中)" min-width="15%" align="center"
                  header-align="center"></el-table-column>

                <el-table-column prop="" label="操作" min-width="15%" align="center"
                  header-align="center">
                  <template slot-scope="scope">
                    <!-- <el-button type="primary" size="mini" @click="onSee(scope.row)">修改</el-button>
                    <el-button type="danger" size="mini" style="margin-left: 0px;" @click="onDelete(scope.row)">删除</el-button> -->
                    <!-- <el-button type="primary" size="mini" @click="addToSelectedLabelTypeObjectList(scope.row)">添加到标注列表</el-button> -->
                    <el-button type="primary" size="mini" @click="addMarkerToCurrentMapCenter(scope.row)">标注到地图中心</el-button>
                    
                  </template>
                  
                </el-table-column>
              </el-table>
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-size="pageSize" :page-sizes="[4]"
                layout="total, sizes,prev, pager, next, jumper" :total="total"
                style="text-align: center;margin-top: 10px;">
              </el-pagination>
            </el-main>
          
          </el-container>
        </el-dialog>
    </div>
</template>
<script>
import { format } from 'echarts/lib/export';

export default {
    name: "sub-vue",
    props: {
        bframeC1_show:Boolean,
        AMap:Object,
        map:Object,
    },
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
        selectedDevicesTypes:'',
        selectedDevicesStatus:'',
        devices:[],
        selectedDevices:[],
        pageSize: 4,
		    currentPage: 1,
        total:0,
        ObjectTypeList:[],
        selectedObjectTypeList:[],
        toAddObjectTypeList:[],
      };
    },
    created() {
    },
    methods: { 
      openFilelineEditiorMenu(){
        if(!this.$parent.getIfShowSituation()){
          this.$message.error("请在 状态信息 中查看火线后再进行编辑");
          return ;
        }
        this.$parent.openFilelineEditiorMenu();
      },
      fireLineEditButton(){
        // 弃用
        var parentDoms=document.getElementsByClassName('el-dialog__header');
        console.log(parentDoms);
        var parentDom=document.getElementsByClassName('el-dialog__header')[1];
        var fireLineEditButton1=document.createElement('el-button');
        fireLineEditButton1.setAttribute('type','primary');
        fireLineEditButton1.setAttribute('size','mini');
        fireLineEditButton1.setAttribute("value",'编辑火线');
        fireLineEditButton1.setAttribute("onclick", "javascript:testMethod();");
        console.log(fireLineEditButton1);
        parentDom.appendChild(fireLineEditButton1);
      },
      changeShow(){
        this.$parent.showBframeC1();
      },
      testMethod(){
        console.log(this.map.getCenter());
      },
      handleSizeChange(val) {
        // console.log("handleSizeChange"+val);
        this.pageSize = val;
        this.selectedObjectTypeList=this.ObjectTypeList.slice((val-1)*this.pageSize-1,(val)*this.pageSize)    
      },
      handleCurrentChange(val) {
        this.currentPage = val;  
        // console.log("handleCurrentChange"+val);    
        if(val==1){
          this.selectedObjectTypeList=this.ObjectTypeList.slice(0,4);
        }
        else{
         
          this.selectedObjectTypeList=this.ObjectTypeList.slice((val-1)*this.pageSize,(val)*this.pageSize)        
        }
        // console.log(this.selectedDevicesTypes)
        // if(this.selectedDevicesTypes==''){
        //   this.selectedDevicesTypes=null;
        // }
      },
      getMapCenterPosition(){
        var centerPosition=null;
        centerPosition=this.map.getCenter();
        // console.log(centerPosition);
        centerPosition=[centerPosition.lng,centerPosition.lat];
        return centerPosition;
      },
      addToSelectedLabelTypeObjectList(row){
        var selectedObjectType={};
        selectedObjectType["objectName"]=row.type;
        selectedObjectType["icon"]=row.icon;
        this.toAddObjectTypeList.push(selectedObjectType);
        this.$parent.receiveSelectedLabelTypeObjectListFromBframeC1(this.toAddObjectTypeList);
      },
      addMarkerToCurrentMapCenter(row){
        // this.testMethod();
        // return ;
        console.log("addMarkerToCurrentMapCenter方法执行");
        // var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置单击了地图！'
        // console.log(text)
        var typeName=null;
        var objType=null;
        var iconUrlOnOSS=row.icon;
        var selectedMarkerType=row.type;
        var objectType=row.objType;
        console.log("当前选中类型为 "+selectedMarkerType);
        typeName=selectedMarkerType;
        // 拿到selectedMarkerType对应的objectType:equil/person/fire
        let that=this;
        let options = {method: 'GET', url: 'http://47.94.10.119:20008/ResourceCategory/getResource'};
        this.$axios.request(options).then(function (response) {
            response.data.forEach(item =>{
                if(item.objectName==selectedMarkerType)
                    objType=item.objectType;
            })
            // console.log(objType);
            var url=null;
            var updateUrl=null;
            switch(objType){
                case "equip":
                    url="http://proj23.emr-c.com//SituationDisplay/getDevicePosition";
                    updateUrl='http://proj23.emr-c.com//EquipMange/updateEquip'
                    break;
                case "person":
                    url='http://proj23.emr-c.com/SituationDisplay/getPersonPosition';
                    updateUrl='http://47.94.10.119:20008/PeopleMange/modPeople'
                    break;
                case "fire":
                    url=""
                    break;
            }
            let thatt=that;
            console.log(typeName);
            // console.log(url);
            // console.log(that.getCurrentTime());
            if(objectType=='fire'){
                
              var currentTime=that.getCurrentTime();
              var lng=that.map.getCenter().lng;
              var lat=that.map.getCenter().lat;
              const options = {
                method: 'GET',
                url: 'http://proj23.emr-c.com//addFirePoint',
                params: {
                  status: '进行中',
                  time:currentTime,
                  lng: lng,
                  lat: lat,
                }
              };

              that.$axios.request(options).then(res=> {
                //      "data": { tmd后端真会偷懒，不传时间参数就能为空？就不会搞个系统当前时间？？？？？？？？？？？？？？
                // 	"id": 33,
                // 	"lng": 0,
                // 	"lat": 0,
                // 	"radius": 0,
                // 	"info": null,
                // 	"time": null,
                // 	"status": null,
                // 	"detected": false
                // }
// this.addIcon(this.device_markers[index].iconImgUrl,[item["lng"],item["lat"]],28,28,item.info,item.id,item.status,"火苗",item.model,"fire");
                  // this.$parent.addIcon(this.device_markers[index].iconImgUrl,[item["lng"],item["lat"]],28,28,item.info,item.id,item.status,"火苗",item.model,"fire");
                  // this.$parent.get
                  that.$parent.addIcon(iconUrlOnOSS,that.getMapCenterPosition(),24,24,null,res.data.id,null,typeName,null,objectType,null)
                  return ;
              }).catch(function (error) {
                console.error(error);
              });

            }
            thatt.$axios({
              method: "get",
              url:url,
              params:{
                'page':1,//4
                'pagenum':-1,//1
                type:typeName,
                status:"待命中",
              }
            }).then(response => {
                if(response.data.length==0){
                    thatt.$message.error("当前类型无空闲资源!");
                    return;
                }
                console.log(response);
                var id=response.data[0].id;
                console.log(id);
                // return ;
                var theFirstAvailableDeviceId=id;
                // console.log("拿到的第一个空闲设备的id是:"+id);
                //更改状态
                const options = {
                    method: 'GET',
                    url: updateUrl,
                    params: {
                        id: id, 
                        status:"已派遣",
                        lng: thatt.map.getCenter().lng,
                        lat: thatt.map.getCenter().lat,
                    }
                };
                let thattt=thatt;
                thattt.$axios.request(options).then(function (response) {
                    // console.log(response);
                    // console.log(response.data);
                    if(response.status=='200'){
                        // that.$message.success("修改成功");
                        // that.closeDialog();
                        // that.getDevicePosition();
                        // console.log(theFirstAvailableDeviceId);
                        //             addIcon(imgType,position,width,height,info,id,status,type,model,objType,angle)
                        thattt.$parent.addIcon(iconUrlOnOSS,thattt.getMapCenterPosition(),33,33,null,theFirstAvailableDeviceId,null,typeName,null,objectType,null);
                        thattt.getAvailableResourceList();
                        // thattt.device_markers[that.selectedMarkerType-1].remain--;
                    }else{
                        thattt.$message.error("空闲设备状态同步异常!");
                    }
                    // console.log(that.position.split(',')[0]+that.position.split(',')[1]);
                    
                }).catch(function (error) {
                    console.error(error);
                });
            })
        }).catch(function (error) {
            console.error(error);
        });
      },
      getAvailableResourceList(){
        // 1. 调用接口返回：1.设备名、2.设备对应的图片在oss的地址，3.当前可用资源数量
        this.ObjectTypeList=[];
        this.selectedObjectTypeList=[];
          const options = {
            method: 'GET',
            // url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
            url: this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",
            // params: {objectType: 'equip'}
          };
        let that=this;
        this.$axios.request(options).then(function (response) {
          // console.log(response.data);
          that.total=response.data.length;
          response.data.forEach( objType =>{
            // console.log(objType);
            var equipTypeObj={};
            // equipTypeObj["iconUrl"]=objType["imgUrl"];
            equipTypeObj["objType"]=objType["objectType"]
            equipTypeObj["type"]=objType["objectName"];
            equipTypeObj["icon"]=objType["imgUrl"];
            equipTypeObj["count"]=objType["usedCount"]+"/"+objType["availableCount"];
            that.ObjectTypeList.push(equipTypeObj);
          })
          that.selectedObjectTypeList=that.ObjectTypeList.slice((that.currentPage-1)*that.pageSize,(that.currentPage)*that.pageSize);
        }).catch(function (error) {
          console.error(error);
        });
        // 2. 表格数据 上述3+4：添加到标注列表

        // 3. 调用gaodeMap的方法，在左上角添加

        // 4. 调用/修改gaodeMap的方法,在地图点击添加图标,从设备库中取出对应空闲设备状态置为'已派遣',同步设备库设备信息,需要根据设备/人员类型查询

        // 5. 推出标注模式,删除清空左上角标注列表
        
      },
      getDevicesData(){
        if(this.selectedDevicesTypes==''){
          this.selectedDevicesTypes=null;
        }
        if(this.selectedDevicesStatus==''){
          this.selectedDevicesStatus=null;
        }
        // console.log(this.selectedDevicesStatus)
        const options = {
            method: 'GET',
            url: 'http://proj23.emr-c.com//SituationDisplay/getDevicePosition',
            params: {
              page: '1',
              pagenum: '-1',
              type:this.selectedDevicesTypes,
              status:this.selectedDevicesStatus,
            }
            // type:'uav',status:'已派遣'
          };
        let that=this;
        this.$axios.request(options).then(function (response) {
            that.devices=[];
            // console.log(response.data);
            // that.devices=response.data;
            var selectedDevicesTemp=[];
            response.data.forEach(item =>{
                var device={};
                device["id"]=item["id"];
                device["type"]=item["type"];
                device["status"]=item["status"];
                device["info"]=item["info"];
                if(item["latitude"]==null){
                  device["loc"]=''
                }else{
                  device["loc"]=item["latitude"]+','+item["longitude"];
                }
                that.devices.push(device);
              }
            )

            that.total=response.data.length;
            // that.selectedDevices=selectedDevicesTemp;
            that.selectedDevices=that.devices.slice(0, 5);
            // console.log(that.selectedDevices);
            
            
          }).catch(function (error) {
            console.error(error);
          });
      },
      getCurrentTime(){
            var date = new Date();//当前时间
            var month = this.zeroFill(date.getMonth() + 1);//月
            var day = this.zeroFill(date.getDate());//日
            var hour = this.zeroFill(date.getHours());//时
            var minute = this.zeroFill(date.getMinutes());//分
            var second = this.zeroFill(date.getSeconds());//秒   
            //当前时间
            return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
      },
      zeroFill(i){
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
      },
    },
    mounted() {
      // this.fireLineEditButton();
      this.getAvailableResourceList();
      
    }
  };
</script>
<style >
/* .filter{ */
  /* height: 50px; */
  /* width: 100%; */
  /* background: rgb(255,255,255,0.5); */
  /* padding-left: 10%; */
/* } */
.bframec1{
  height: 100%;
  width: 100%;
  /* background-color: rgb(61,73,106,0.8); */
  /* border: 1px solid rgb(13, 210, 236); */
}
.el-dialog{
    background: rgb(61,73,106,0.7);;
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
.el-card__body, .el-main{
  padding: 0px;
}
.el-table--enable-row-hover{
  margin-top: 0px;
}
</style>