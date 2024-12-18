<template>
    <div style="color:white" class="fa">
        <el-dialog
        title="小目标识别"
        :visible.sync="schemeCoopSmallGoal_show"
        width="30%"
        :modal=false
        

        :fullscreen=true
        :before-close="changeShow"
        >
        
            <div class="">
                
                <div class='c'>目标检测视频
                    <el-button type="info" size="mini" v-if="!showTimePicker" @click="resetStartTime">重置时间</el-button>
                    <el-date-picker    v-model="startTime"    type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期时间"  v-if="showTimePicker"></el-date-picker>
                    <el-button type="primary" size="mini" v-if="showStartButton" :disabled=buttonFobidded style="margin-left: 0px;margin-bottom: 5px;" @click="startPlay">开始</el-button>
					<el-button type="danger" size="mini" v-if="!showStartButton" :disabled=buttonFobidded style="margin-left: 0px;margin-bottom: 5px;" @click="pausePlay">暂停</el-button>
                </div>
                <div class="imgg" :style="{ 'height': dialogHeight*0.3724 + 'px'}">
                    <el-image :src=ImgUrl   class="image"  width="95%" height="auto"></el-image>
                </div>
                <div class="bottom">
                    <div class="bottom-left">
                        <input type="text"  class="inputt" disabled="disabled" value=" 当前带宽: 70 Mbps">

                        <input type="text"  class="inputt" disabled="disabled" value=" 任务类型: 小目标识别 ">
                        <input type="text"  class="inputt" disabled="disabled" value=" 边端算力: 5.8 GFLOPS ">
                        <input type="text"  class="inputt" disabled="disabled" value=" 云端算力: 10.4 GFLOPS">
                        <input type="text"  class="inputt" disabled="disabled" value=" 图像尺寸: 640 * 640 ">
                        <!-- <input type="text"  class="inputt" disabled="disabled" :value="' 图像尺寸: ' +imgSize"> -->

                        <input type="text"  class="inputt" disabled="disabled" value=" 参数量: 7.2 MB ">
                        <input type="text"  class="inputt" disabled="disabled" value=" 精确度(mAP): 0.552 ">
                        <input type="text"  class="inputt" disabled="disabled" :value="' 帧率: '+fps +' FPS'">
                    </div>
                    <div class="bottom-right">
                        
                        <!-- 数据传输量Echarts -->
                        <div ref="dataTransferVolume" style="width:100%;height:200px"></div>
                        <!-- 时延Echarts -->
                        <!-- <div ref="timeDelay" style="width:100%;height:200px"></div> -->
                        <div class="node-canvas" style="width:99%;height:172px;background-color: #F8F6ED;">
                            <!-- <canvas id="baseMapCanvas"   style="border:1px solid #d3d3d3;"></canvas> -->
                            <canvas id="activeNodeLineCanvas2"   style="position:absolute;height:172px;width:271.02px;margin-left:5px"></canvas>
                            <canvas id="baseMapCanvas2"   style="height:172px;width:271.02px;margin-left:5px"></canvas>
                            <!-- border:1px solid #d3d3d3; -->
                        </div>
                        <img v-show="false" id="comBoard2" src="../../images/Scene/comboard.jpg">
                        <img v-show="false" id="calBoard2" src="../../images/Scene/calboard.jpg">
                        <img v-show="false" id="wifiPoint2" src="../../images/Scene/wifiPoint.png">
                        <img v-show="false" id="user2" src="../../images/Scene/user.png">
                        <img v-show="false" id="edgeServer2" src="../../images/Scene/edgeServer.png">
                        <img v-show="false" id="router2" src="../../images/Scene/router.png">
                    </div>
                </div>
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: "scheduling_scheme_object",
    props: {
        schemeCoopSmallGoal_show:Boolean
    },
    data() {
        return {
            detectedImgUrl:null,
            dataTransferVolumeChart:null,
            dataTransferVolumeChartOption:{
                // title: {
                //     text: '数据传输量'
                // },
                tooltip: {},
                legend: {},
                grid:{
                    x:50,
                    y:50,
                    x2:50,
                    y2:50,
                    borderWidth:10
                },
                // X轴最大10条数据，多出的从头部移出，尾部添入
                xAxis: {
                    // type: 'value',
                    name: ' 帧数',
                    // 存帧数
                    data: []
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '数据量 kb',
                        min: 0,
                        max: 5000,
                        position: 'left',
                        // axisLabel: {
                        //     formatter: '{value} kb/s'    
                        // }
                    },
                    {
                        type: 'value',
                        name: '时延 ms',
                        min: 0,
                        max: 200,
                        position: 'right',
                        // axisLabel: {
                        //     formatter: '{value} ms'
                        // }
                    }
                ],
                series: [
                    {
                    name: '速率',
                    type: 'line',
                    smooth: true,
                    yAxisIndex :0,
                    // 存对应的数据传输量
                    data: []
                    },
                    {
                    name: '时延',
                    type: 'line',
                    smooth: true,
                    yAxisIndex :1,  
                    // 存对应的数据传输量
                    data: []
                    }
                ]
            },
            timeDelayChart:null,
            timeDelayChartOption:null,
            imgSize:'640 * 640',
            frameNum:0,
            ImgUrl:null,
            exit:false,
            oldFrameNum:0,
            fps:0,
            interval:null,
            startTime:null,
            showTimePicker:true,
            buttonFobidded:false,
            showStartButton:true,
            firstCallFlag:true,
            // 横轴坐标
            frameIndex:1,
            nodePosition:[[100,70],[200,70],[150,130]],
            nodeRectPositions:[[5,50],[175,50],[125,110]],
            baseMapCanvasCtx:null,
            activeNodeCanvasCtx:null,
            dialogHeight:0,
            dialogWidth:0,
            timer:false,
        } 
    },
    created(){
        // console.log("111111");
          
    },
    methods: {
        changeShow(){
            clearInterval(this.interval);
            this.exit=true;
            // console.log(document.getElementById('dataTransferVolume'));
            this.$parent.showSchemeCoopSmallGoal();
        },
        initEchartsAndCanvas(){
            this.dataTransferVolumeChart=echarts.init(this.$refs.dataTransferVolume);
            this.dataTransferVolumeChart.setOption(this.dataTransferVolumeChartOption);
            // 初始化画布
            this.baseMapCanvasCtx=document.getElementById('baseMapCanvas2').getContext('2d');
            this.activeNodeCanvasCtx=document.getElementById('activeNodeLineCanvas2').getContext('2d');
            var htmlImgElementcomBoard=document.getElementById('comBoard2');
            var htmlImgElementcalBoard=document.getElementById('calBoard2');
            var htmlImgElementwifiPoint=document.getElementById('wifiPoint2');
            var htmlImgElementUser=document.getElementById('user2');
            var htmlImgElementEdgeServer=document.getElementById('edgeServer2');
            var htmlImgElementRouter=document.getElementById('router2');
            this.activeNodeCanvasCtx.lineWidth = 1;
            this.activeNodeCanvasCtx.strokeStyle = 'red';
            // 使画布重叠
            // let canvasWidth=document.getElementsByClassName('node-canvas')[0].offsetWidth;
            // console.log(canvasWidth);
            // 给地图canvas设置高度宽度
            // let baseMapCanvas=document.getElementById('baseMapCanvas');
            // baseMapCanvas.style.position='absolute';
            // baseMapCanvas.style.width=canvasWidth-2;
            // baseMapCanvas.setAttribute('height','170px')
            // baseMapCanvas.setAttribute('width',canvasWidth+'px')
            // 设置绘制颜色
            this.baseMapCanvasCtx.fillStyle = 'black';
            // 设置字体
            this.baseMapCanvasCtx.font = '12px Arial';
            
            this.baseMapCanvasCtx.lineWidth = 1;
            // 通信板和网络接入点  带有箭头
            this.baseMapCanvasCtx.strokeStyle = 'orange';
            this.baseMapCanvasCtx.setLineDash( [ 5, 5, 5] )
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(152,25 );this.baseMapCanvasCtx.lineTo(100, 70);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(152,25 );this.baseMapCanvasCtx.lineTo(200, 70);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(152,25 );this.baseMapCanvasCtx.lineTo(150, 130);this.baseMapCanvasCtx.stroke();
            //绘制箭头
            
            // user->edge_server->router->wifipoint
            this.baseMapCanvasCtx.strokeStyle = 'blue';
            this.baseMapCanvasCtx.lineWidth = 1;
            this.baseMapCanvasCtx.setLineDash([0,0,0])
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(20,15 );this.baseMapCanvasCtx.lineTo(70, 15);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(70,15 );this.baseMapCanvasCtx.lineTo(115, 20);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(115,20 );this.baseMapCanvasCtx.lineTo(152, 30);this.baseMapCanvasCtx.stroke();

            //通信板之间连线 
            this.baseMapCanvasCtx.strokeStyle = 'gray';
            
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(100,70 );this.baseMapCanvasCtx.lineTo(200, 70);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(100,70 );this.baseMapCanvasCtx.lineTo(150, 130);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(200,70 );this.baseMapCanvasCtx.lineTo(150, 130);this.baseMapCanvasCtx.stroke();
            // 通信板和算力板
            this.baseMapCanvasCtx.strokeStyle = 'green';
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(100,70 );this.baseMapCanvasCtx.lineTo(25, 70);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(200,70 );this.baseMapCanvasCtx.lineTo(270, 70);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(150,130 );this.baseMapCanvasCtx.lineTo(220, 130);this.baseMapCanvasCtx.stroke();

            // 绘制设备图片 height:172px;width:271.02px
            this.baseMapCanvasCtx.drawImage(htmlImgElementUser,0,0,40,30);
            // this.baseMapCanvasCtx.fillText('边缘服务器', 100, 15);
            this.baseMapCanvasCtx.drawImage(htmlImgElementEdgeServer,50,0,40,30);
            this.baseMapCanvasCtx.drawImage(htmlImgElementRouter,100,10,30,20);

            this.baseMapCanvasCtx.drawImage(htmlImgElementcomBoard,80,60,40,20);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcomBoard,180,60,40,20);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcomBoard,130,120,40,20);

            this.baseMapCanvasCtx.drawImage(htmlImgElementwifiPoint,140,10,25,40);

            this.baseMapCanvasCtx.drawImage(htmlImgElementcalBoard,10,55,40,30);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcalBoard,250,55,40,30);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcalBoard,200,115,40,30);

            this.drawArrow(110, 60, 152, 25,"orange");
            this.drawArrow(190, 60, 152, 25,"orange");
            this.drawArrow(150,120, 152, 25,"orange");
            
            

        },
        drawArrow(endX,endY,beginX,beginY,color){
            var l = 10; // 
            var a = Math.atan2((endY - beginY), (endX - beginX));

            var x3 = endX - l * Math.cos(a + 30 * Math.PI/180); // θ=30
            var y3 = endY - l * Math.sin(a + 30 * Math.PI/180);
            var x4 = endX - l * Math.cos(a - 30 * Math.PI/180);
            var y4 = endY - l * Math.sin(a - 30 * Math.PI/180); 
            this.baseMapCanvasCtx.beginPath();
            this.baseMapCanvasCtx.moveTo(x3, y3);
            this.baseMapCanvasCtx.lineTo(endX, endY);
            this.baseMapCanvasCtx.lineTo(x4, y4)
            this.baseMapCanvasCtx.lineWidth = 1;
            this.baseMapCanvasCtx.strokeStyle = color;
            this.baseMapCanvasCtx.stroke();
        },
        drawActiveArrow(endX,endY,beginX,beginY,color){
            // 判断相对位置关系
            // 真他妈臭
            if(endY==beginY && endX>beginX){
                endX-=10;
            }else if(endY == beginY && endX<beginX){
                endX+=10;
            }else if(endX>beginX && endY>beginY){
                endX-=10;
                endY-=10;
            }else if(endX<beginX && endY<beginY){
                endX+=10;
                endY+=10;
            }else if(endX>beginX && endY<beginY){ 
                endX-=10;
                endY-=10;
            }else if(endX<beginX && endY>beginY){
                endX+=10;
                endY-=10;
            }
            this.activeNodeCanvasCtx.beginPath();
            // 移动至起点
            this.activeNodeCanvasCtx.moveTo(beginX,beginY);
            // 绘制线段
            this.activeNodeCanvasCtx.lineTo(endX, endY);
            this.activeNodeCanvasCtx.stroke();

            var l = 10; // 
            var a = Math.atan2((endY - beginY), (endX - beginX));

            var x3 = endX - l * Math.cos(a + 30 * Math.PI/180); // θ=30
            var y3 = endY - l * Math.sin(a + 30 * Math.PI/180);
            var x4 = endX - l * Math.cos(a - 30 * Math.PI/180);
            var y4 = endY - l * Math.sin(a - 30 * Math.PI/180); 
            this.activeNodeCanvasCtx.beginPath();
            this.activeNodeCanvasCtx.moveTo(x3, y3);
            this.activeNodeCanvasCtx.lineTo(endX, endY);
            this.activeNodeCanvasCtx.lineTo(x4, y4)
            this.activeNodeCanvasCtx.lineWidth = 1;
            this.activeNodeCanvasCtx.strokeStyle = color;
            this.activeNodeCanvasCtx.stroke();
        },
        drawActiveNodeLine(activeNodeArray){
            // for(let i=0;i<activeNodeArray.length;i++){
            //     let sourceNode= activeNodeArray[i];
            //     let endNode=activeNodeArray[]
            // }
            this.activeNodeCanvasCtx.clearRect(0,0,500,500);
            this.activeNodeCanvasCtx.lineWidth = 1;
            this.activeNodeCanvasCtx.strokeStyle = 'red';
            let sourceNode= parseInt(activeNodeArray[0]);
            let endNode=parseInt(activeNodeArray[1]);
            // // 开始绘制路径
            // this.activeNodeCanvasCtx.beginPath();
            // // 移动至起点
            // this.activeNodeCanvasCtx.moveTo(this.nodePosition[sourceNode-1][0], this.nodePosition[sourceNode-1][1]);
            // // 绘制线段
            // this.activeNodeCanvasCtx.lineTo(this.nodePosition[endNode-1][0], this.nodePosition[endNode-1][1]);
            // this.activeNodeCanvasCtx.stroke();
            // 绘制箭头
            this.drawActiveArrow(this.nodePosition[endNode-1][0],this.nodePosition[endNode-1][1],this.nodePosition[sourceNode-1][0], this.nodePosition[sourceNode-1][1]);
        },
        resetStartTime(){
            this.showTimePicker=true;
            this.pausePlay();
            this.buttonFobidded=false;
            this.firstCallFlag=true;
  
        },
        startPlay(){
            this.showStartButton=false;
            this.showTimePicker=false;
            this.exit=false;
            this.updateData(this.firstCallFlag);
        },
        pausePlay(){
            // 暂停播放
            // this.buttonFobidded=false;
            this.exit=true;
            this.showStartButton=true;
        },
        async updateData(firstCall){
            if(firstCall){
                this.dataTransferVolumeChartOption.xAxis.data=[];
                this.dataTransferVolumeChartOption.series[0].data=[];
                this.dataTransferVolumeChartOption.series[1].data=[];
                this.firstCallFlag=false;
                let options = {
                    method: 'GET',
                    url: 'http://proj23.emr-c.com//TargetDetection//getDetResults',
                    params: {
                        time: this.startTime, 
                        task_type:'小目标',
                    }
                };
                await this.$axios.request(options).then(res => {
                    // 绘制echarts
                    this.frameNum=res.data.resultData.id;
                    this.ImgUrl=res.data.resultData.oss_img_path;
                    this.dataTransferVolumeChartOption.xAxis.data.push(this.frameIndex);
                    this.dataTransferVolumeChartOption.series[0].data.push(res.data.resultData.adt);
                    this.dataTransferVolumeChartOption.series[1].data.push(res.data.resultData.time_delay);
                    this.dataTransferVolumeChart.setOption(this.dataTransferVolumeChartOption);
                    // 绘制canvsa
                    var activeNodes=res.data.resultData.det_node.split(',')
                    // console.log(activeNodes);
                    if(activeNodes.length==2){
                        this.drawActiveNodeLine(activeNodes);
                    }else if(activeNodes.length==1){
                        this.drawActiveNodeRect(activeNodes);
                    }
                    if(!this.exit){
                        setTimeout(() => {
                            this.updateData();
                    }, 20);
                }
                }).catch(function (error) {
                    console.error(error);
                });
                return ;
            }

            let options = {
                method: 'GET',
                url: 'http://proj23.emr-c.com//TargetDetection//getDetResults',
                params: {
                    // time: '2023-04-22 20:55:01',
                    task_type:'小目标',
                    num:this.frameNum,
                }
            };

            await this.$axios.request(options).then(res=> {
                // console.log(res)
                if(res.status=='201'){
                    console.log("已结束");
                    this.buttonFobidded=true;
                    return ;
                }
                // 保证曲线内最多只有10条数据
                if(this.dataTransferVolumeChartOption.xAxis.data.length>10){
                    // 移出第一条
                    this.dataTransferVolumeChartOption.xAxis.data.shift();
                    this.dataTransferVolumeChartOption.series[0].data.shift();
                    this.dataTransferVolumeChartOption.series[1].data.shift();
                }
                this.frameIndex+=1;
                this.frameNum=res.data.resultData.id;
                this.ImgUrl=res.data.resultData.oss_img_path;
                this.dataTransferVolumeChartOption.xAxis.data.push(this.frameIndex);
                this.dataTransferVolumeChartOption.series[0].data.push(res.data.resultData.adt);
                this.dataTransferVolumeChartOption.series[1].data.push(res.data.resultData.time_delay);
                this.dataTransferVolumeChart.setOption(this.dataTransferVolumeChartOption);
                
                // 绘制canvsa
                var activeNodes=res.data.resultData.det_node.split(',')
                    // console.log(activeNodes);
                    if(activeNodes.length==2){
                        this.drawActiveNodeLine(activeNodes);
                    }else if(activeNodes.length==1){
                        this.drawActiveNodeRect(activeNodes);
                    }

                if(!this.exit){
                    setTimeout(() => {
                        this.updateData();
                    }, 20);
                }
            }).catch(function (error) {
                console.error(error);
            });
        },
        calFPS(){
            this.fps=this.frameNum-this.oldFrameNum;
            this.oldFrameNum=this.frameNum;
        },
        drawActiveNodeRect(activeNodes){
            let targetNode=parseInt(activeNodes[0]);
            this.activeNodeCanvasCtx.clearRect(0,0,500,500);
            // [[160,170],[330,170],[252,250]] 60,40
            this.activeNodeCanvasCtx.strokeRect(this.nodeRectPositions[targetNode][0],this.nodeRectPositions[targetNode][1],120,40);
        },
        
    },
    mounted(){
        // 傻逼代码加载太慢，获取不到dom元素
        setTimeout(() => {
            this.initEchartsAndCanvas();
        }, 100);
        setTimeout(() => {
            // this.updateData();
            this.interval=setInterval(this.calFPS,1000);
        }, 100);
        // window.onresize = () => {
		// 	return (() => {
		// 		// window.screenWidth = document.body.clientWidth
		// 		// that.screenWidth = window.screenWidth
		// 		// window.fullHeight = document.documentElement.clientHeight
		// 		// that.fullHeight = window.fullHeight
        //         const targetNode = document.querySelector('.scheme-coop-small-goal');
        //         this.dialogHeight=targetNode.offsetHeight;
        //         this.dialogWidth=targetNode.offsetWidth;
		// 	})()
		// };	
        // 
        window.coop=this;
        // 监听dialog元素的高度宽度改变
        const targetNode = document.querySelector('.scheme-coop-small-goal');
        this.dialogHeight=targetNode.offsetHeight;
        // this.dialogWidth=targetNode.offsetWidth;
    },
    watch:{
        dialogHeight(val){
                console.log("dialogHeight发生变化"+this.dialogHeight);
		        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
                
		        if(!this.timer){
		            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
					
		            this.screenWidth = val
		            this.timer = true
		            let that = this
		            setTimeout(function(){
		                that.timer = false
		            },400)
		        }
		    },
        dialogWidth(val){
            console.log("dialogWidth发生了改变");
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
    }
}
</script>
<style scoped>
/* .el-dialog{
    background: rgb(65, 62, 62,0.6);
} */
.imgg{
    width:100%;
    /* height: 270.5px; */
}
.bottom{
    overflow: hidden;
    width:100%;
    height: 375px;
}
.fa{
    height: 700px;
}
.fa /deep/ .el-dialog__header {
    text-align: center;
    padding: 10px 0px 0px;
    /* height: 700px; */
}
.bottom-left{
    background-color: cornsilk;
    /* position: absolute; */
    width: 40%;
    height: 375px;
    /* display:inline-block; */
    float: left;
}
.bottom-right{
    background-color: cornsilk;
    /* position: absolute; */
    width: 59%;
    height: 375px;
    /* display:inline-block; */
    float: right;
}
.inputt{
    left: 50%;
    height: 22px;
    position: relative;
    margin-top: 3px;
    transform: translate(-50%)
}
#timeDelay{
    width:100%;
    height:100px;
}
.c /deep/ .el-input--prefix .el-input__inner {
    height: 30px;
}
.c /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 180px;
}
.c /deep/ .el-input__icon {
    line-height: 30px;
}
</style>