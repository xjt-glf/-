<template>
    <div style="color:white">
        <el-dialog
        
        :visible.sync="detectedImg_show"
        :width="dialogWidth"
        :modal=false
        :show-close=false
        :fullscreen=true
        :before-close="closeImgVue"
        >
        <!-- 未最小化时的标题栏 -->
        <div
            v-show="!isMiniSize"
            slot="title"
            class="dialog-header"
        >
        <!-- 标题栏左侧标题文字 -->
            <div class="left-title" style="display:inline-block">
            <span class="span">目标识别检测视频</span>
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
                @click="closeImgVue"
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
            <span class="span">目标识别检测视频</span>
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
                @click="closeImgVue"
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
                <el-image :src=detectedImgUrl   class="image" style="position:absolute;margin-right: 20px;" :preview-src-list="srcList" width="95%" height="auto"></el-image>
                <span style="position:absolute;margin-top: 41%;margin-left: 5px;">带宽：{{ bandwidth }} Mbps</span>
                <span style="position:absolute;margin-top: 45%;margin-left: 5px;">时延：{{ delay }} ms</span>
                <span style="position:absolute;margin-top: 49%;margin-left: 5px;">帧率：{{ fps }} FPS</span>

                <span style="position:absolute;margin-top: 37%;right: 25px;">无人机飞行高度：{{ height }} M</span>
                <span style="position:absolute;margin-top: 41%;right: 25px;">无人机飞行经纬度：{{ pos }} </span>
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
        markerId:Number,
        detectedImg_show:Boolean,
        detectedImgUrl:String,
        AMap:Object,
        map:Object,
        srcList:Array,
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
            targetCount: 0,
            modality: 0,
        }

    },
    created(){
        // console.log(this.bframeL1_show);
    },
    methods:{
        changeShow(){
            this.$parent.changeDetectedImgVue();
        },
        closeImgVue(){
            this.$parent.changeDetectedImgVue();
        },
        getDetectedImgVueByMarkerId(id){
            // 根据id去拿图片
            console.log(id+" "+this.markerId);
            var options = {
                method: 'GET',
                url: 'http://10.128.163.43:20008//TargetDetection//getPic',
                params: {obj_id: this.markerId}
            };

            this.$axios.request(options).then((response) => {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        },
        // 放大或者缩小
        miniSize() {
            // 
            console.log("miniSize方法"+this.isMiniSize)
            this.isMiniSize = !this.isMiniSize;
            if(this.isMiniSize){
                // 最小化
                this.dialogWidth = '12%';
                var imgVueElement = document.getElementsByClassName('bounce-frame-right-img')[0]
                console.log(imgVueElement);
                imgVueElement.style.width="35%"
                imgVueElement.style.transform="translate(-50%,-50%)";
            }
            else{
                // 全屏
                this.dialogWidth = '37%';
                var imgVueElement = document.getElementsByClassName('bounce-frame-right-img')[0]
                console.log(imgVueElement);
                imgVueElement.style.width="100%";
                imgVueElement.style.transform="none";
            }
        },
        // 关闭弹窗
        close() {
            //强制触发父组件的事件来关闭dialog
            this.$emit('closeDialog')
            /*
            父组件中调动如下：

            1.父组件调用子组件：
            <biaAngSmallDialog 
                :isShowDialog="isShowDialog" 
                @closeDialog="closeHandle">

            </push-data>

            2.父组件方法：
                closeHandle () {
                    this.isShowDialog = false  // 控制取消和X按钮，关闭弹窗
                } 
            */
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