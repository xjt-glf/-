<template>
    <div style="color:white">
        <el-dialog
        
        :visible.sync="ifShowDialog"
        :width="dialogWidth"
        :modal=false
        :show-close=false
        :fullscreen=true
        :before-close="closeVue"
        >
        <!-- 未最小化时的标题栏 -->
        <div
            v-show="!isMiniSize"
            slot="title"
            class="dialog-header"
        >
        <!-- 标题栏左侧标题文字 -->
            <div class="left-title" style="display:inline-block">
            <span class="span">目标识别检测视频-全局</span>
            </div>
            <!-- 标题栏右侧缩小按钮和关闭按钮 -->
            <div class="icons" style="display:inline-block;right:0;position: absolute;">
            <i
                title="缩小"
                class="i el-icon-minus"
                style="font-size: 24px"
                @click="miniSize"
            ></i>
            <i
                title="关闭"
                class="i el-icon-close"
                style="font-size: 24px"
                @click="closeVue"
            ></i>
            </div>
        </div>
        <!-- 最小化后的标题栏 -->
        <div
            v-show="isMiniSize"
            slot="title"
            class="dialog-header"
        >
        <!-- 标题栏左侧标题文字 -->
            <div class="left-title" style="display:inline-block">
            <span class="span">目标识别检测视频-全局</span>
            </div>
            <!-- 标题栏右侧缩小按钮和关闭按钮 -->
            <div class="icons" style="display:inline-block;right:0;position: absolute;">
            <i
                title="放大"
                class="i el-icon-full-screen"
                style="font-size: 24px"
                @click="miniSize"
            ></i>
            <i
                title="关闭"
                class="i el-icon-close"
                style="font-size: 24px"
                @click="closeVue"
            ></i>
            </div>
        </div>
        
        <!-- title="目标检测结果图片" -->
        
            <div class="imgg" v-show="true" style="color: yellow;">
                <!-- <img src="/src/images/Scene/audio.png" width="30" height="30" alt=""> -->
                <!-- <span style="vertical-align:top"><img src="/src/images/Scene/audio.png" style="vertical-align:top" width="30" height="30" alt="">当前通话质量良好</span>
                <br> -->
                <!-- <el-button style="margin-top:15px" v-if="!noiseReductionFlag" @click="noiseReduction">降噪关</el-button>
                <el-button style="margin-top:15px" type="success" v-if="noiseReductionFlag" @click="noiseReduction" >降噪开</el-button> -->
                <!-- <el-button type="danger" @click="changeShow">挂断</el-button> -->
                <el-image :src=detectedImgUrl  v-if=isMiniSize class="image" style="position:absolute;margin-right: 20px;" width="95%" height="auto"></el-image>
                <el-image :src=detectedImgUrl  v-if=!isMiniSize class="image" style="position:absolute;margin-right: 20px;height: 90%;width:90%;transform: translate(-50%,0);left: 50%;" width="90%;" height="auto"></el-image>
                <span style="position:absolute;margin-top: 37%;margin-left: 5px;">带宽：{{ bandwidth }} Mbps</span>
                <span style="position:absolute;margin-top: 49%;margin-left: 5px;">时延：{{ delay }} ms</span>
                <!-- <span style="position:absolute;margin-top: 49%;margin-left: 5px;">帧率：{{ fps }} FPS</span> -->
                <span style="position:absolute;margin-top: 45%;margin-left: 5px;">任务类型：{{ taskType }} </span>
                <span style="position:absolute;margin-top: 41%;margin-left: 5px;">检测类型：{{ detectType }} </span>

                <span style="position:absolute;margin-top: 33%;right: 25px;">无人机飞行高度：{{ height }} M</span>
                <span style="position:absolute;margin-top: 37%;right: 25px;">无人机飞行经度：{{ pos_longitude }} </span>
                <span style="position:absolute;margin-top: 41%;right: 25px;">无人机飞行纬度：{{ pos_latitude }} </span>

                <span style="position:absolute;margin-top: 45%;right: 25px;">目标数量：{{ targetCount }} </span>
                <span style="position:absolute;margin-top: 49%;right: 25px;">相机模态：可见光 </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "detectedImg",
    props: {
        ifShowDialog:Boolean,
        AMap:Object,
        map:Object,
    },
    data() {
        return {
            // srcList:[]
            isMiniSize: true,
            dialogWidth:'30%',//动态设置dialog宽度
            bandwidth: 0,
            delay: 30,
            fps: 0,
            height: 0,
            pos: '0,0',
            pos_longitude:0,
            pos_latitude:0,
            targetCount: 0,
            modality: 0,
            detectedImgUrl: "",
            interval: null,
            serverURL:null,
            taskType: null,
            detectType: null,
            localImgUrl: "http://192.168.0.218/data/small_target_identification/0.jpg",
        }

    },
    created(){
        // console.log(this.bframeL1_show);
    },
    mounted(){
        this.serverURL=this.$HPCNServerURL;
        // this.$parent.removeAllMarkers();
        window.global_target=this;
        this.getDetectedImg();
        this.interval=setInterval(this.getDetectedImg,5000)
    },
    methods:{
        changeShow(){
            this.clearThisInterval();
            this.$parent.showTargetRecogGlobal();
            this.$parent.removeAllGlobalDetectedObject()
        },
        closeVue(){
            this.clearThisInterval();
            this.$parent.showTargetRecogGlobal();
            this.$parent.removeAllGlobalDetectedObject()
        },
        clearThisInterval(){
            clearInterval(this.interval);
        },
        // getLength(){
        //     var str="/home/hpcn/HPCN-ResourceSchedule/processed/";
        //     console.log(str.length);
        // },
        getDetectedImg(){
            const options = {
                method: 'GET',
                // 本地
                url: this.$HPCNServerURL+":20008//TargetDetection//getLatestData"
                // 云
                // url: this.$HPCNServerCloud+"/TargetDetection//getLatestData"
            };

            this.$axios.request(options).then((response)=> {
                console.log(response);
                // if(response.data.resultData["camera_longitude"]==0||response.data.resultData["camera_latitude"]==0)
                //     return;
                this.map.setCenter([response.data.resultData["camera_longitude"],response.data.resultData["camera_latitude"]]);
                //    清除地图上所有图标后拿新图标
                // this.$parent.clearAllDetectedMarkers();
                this.$parent.removeAllGlobalDetectedObject();
                // this.detectedImgUrl=response.data.resultData["oss_img_path"];
                console.log(response.data.resultData['local_img_path'].substring(43));
                this.detectedImgUrl=this.$HPCNServerURL+'/data/'+response.data.resultData['local_img_path'].substring(43);

                // this.detectedImgUrl='http://192.168.0.218/data/'+response.data.resultData['local_img_path'].substring(43);
                // $HPCNServerURL
                // console.log(this.detectedImgUrl);
                // http://ossfile.hpcner.com/target_identification/%E8%BD%A6%E8%BE%86/car.png?Expires=2000893933&OSSAccessKeyId=LTAI5tLLj9yWk9K9xtqsaVSf&Signature=pIPMcU%2Bcfb7zz3ec9epN7px7%2FNo%3D
                // console.log("111111");
                // this.detectedImgUrl="http://ossfile.hpcner.com/target_identification/%E8%BD%A6%E8%BE%86/car.png?Expires=2000893933&OSSAccessKeyId=LTAI5tLLj9yWk9K9xtqsaVSf&Signature=pIPMcU%2Bcfb7zz3ec9epN7px7%2FNo%3D";
                // 处理图标渲染逻辑
                this.height=response.data.resultData["camera_height"];
                // this.pos=response.data.resultData["camera_longitude"]+","+response.data.resultData["camera_latitude"];
                this.pos_longitude=response.data.resultData['camera_longitude'];
                this.pos_latitude=response.data.resultData['camera_latitude'];

                this.delay=response.data.resultData["time_delay"];
                this.delay=response.data.resultData["time_delay"];
                this.bandwidth=response.data.resultData["bandwidth"];
                this.taskType=response.data.resultData["task_type"];
                this.detectType=response.data.resultData["det_type"];

                this.targetCount=response.data.objects.length;
                response.data.objects.forEach(object => {
                    console.log(object.type+ [object.longitude,object.latitude]); 
                    var detectedImgUrl
                    // object.type='car';
                    // object.longitude=116.35172;
                    // object.latitude=40.35574;
                    // object.latitude=39.961657;
                    switch(object.type){
                        
                        case 'fire':
                            detectedImgUrl="/src/images/Scene/huomiao.png"
                            this.$parent.addIconRipple([object.longitude,object.latitude]);
                            this.$parent.addGlobalIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'火点_目标检测所得',null,object["oss_img_path"]);
                            // addGlobalIconDetectedObject
                            break;
                        case 'car':
                            // console.log("carcarcarcarcar");
                            detectedImgUrl="/src/images/Scene/detectedcar.png";
                            this.$parent.addIconRipple([object.longitude,object.latitude]);
                            this.$parent.addGlobalIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'车辆_目标检测所得',null,object["oss_img_path"]);
                            
                            break;
                        case 'person':
                            // console.log("peoplepeoplepeoplepeople")
                            detectedImgUrl="/src/images/Scene/ren.png";
                            this.$parent.addIconRipple([object.longitude,object.latitude]);
                            this.$parent.addGlobalIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'人员_目标检测所得',null,object["oss_img_path"]);
                            break;
                    }
                });

            }).catch(function (error) {
                console.error(error);
            });
        },
        // 放大或者缩小
        miniSize() {
            // 
            // console.log("miniSize方法"+this.isMiniSize)
            this.isMiniSize = !this.isMiniSize;
            if(this.isMiniSize){
                // 最小化
                this.dialogWidth = '12%';
                var imgVueElement = document.getElementsByClassName('bounce-frame-global-target-recog')[0]
              
                imgVueElement.style.width="35%"
                imgVueElement.style.transform="translate(-50%,-50%)";
            }
            else{
                // 全屏
                this.dialogWidth = '37%';
                var imgVueElement = document.getElementsByClassName('bounce-frame-global-target-recog')[0]
                
                imgVueElement.style.width="100%";
                imgVueElement.style.transform="none";
            }
        },
        // 关闭弹窗
        close() {
            this.$emit('closeDialog')
        },
        
    }
}
</script>
<style scoped>
.imgg{
    width:100%;
    height: auto;
    /* position:absolute; */
}
.big-and-small-view {
  overflow-y: scroll;
  position: relative;
}
/* 弹窗header相关样式 */
.DialogClass dialog-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  cursor: auto;
  position: relative;;
}
.DialogClass dialog-header .div{
  flex: 1;
}

.DialogClass .left-title{
  margin-top: 3px;
  display: inline-block;
}

.DialogClass .left-title .span{
  text-align: left;
  font-size: 16px;
  color: #000000;
}

.DialogClass .icons{
  display: flex;
  justify-content: flex-end;
}

.DialogClass .icons .i{
  color: #000000;
  display: block;
  padding: 3px;
}

.DialogClass .icons .i:hover{
  background: #dcdfe6;
  cursor: pointer;
}
</style>