<template>
    <div style="height:100%">
        <div class="header">
		    <div class="logo">推演记录详情</div>
        </div>
        <!-- <Header></Header> -->
        <div>
            <el-container class="container_1">
                <el-container v-bind:style="{ 'height': fullHeight*0.92 + 'px'}"><!-- style="height: 1950px;"   v-bind:style="{ 'height': screenHidth + 'px'}" -->
                    <el-main  style="height: auto;width: 100%;padding: 20px;text-align:center">
                        
                        <div class="filter">
                            <span>业务分类：</span>
                            <el-select v-model="selectedBusinessType" clearable placeholder="请选择类型">
                            <el-option
                                v-for="item in businessTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            </el-select>

                            <span>推演方案：</span>
                            <el-select v-model="selectedDeductionPlan" clearable placeholder="请选择状态">
                            <el-option
                                v-for="item in deductionPlans"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                            </el-select>
                            <span>推演记录时间：</span>
                            <el-date-picker    v-model="startTime"    type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期时间"  ></el-date-picker>

                            <el-button type="primary" style="margin-left:1%" @click="getSchemeDetailData()">查询</el-button>
                            <el-upload style="position:absolute;margin-top: 10px;"
                                class="upload-demo"
                                action="http://10.128.163.43:20017//uploadFile"
                                
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :before-upload="beforeUpload"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary">点击上传视频/图片</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png/mp4文件</div>
                            </el-upload>
                            <!-- <el-button type="primary">重置</el-button> -->

                        </div>
                        <div class="node-canvas" style="margin-top: 15px;width:500px;height:300px;background-color: #F8F6ED;display:inline-block">
                            <!-- <canvas id="baseMapCanvas"   style="border:1px solid #d3d3d3;"></canvas> -->
                            <!-- <canvas id="activeNodeLineCanvas"   style="position:absolute;height:170px;width:271.02px;margin-left:5px"></canvas> -->
                            <!-- <img  id="backgroundImg" style="z-index: 1;;position: absolute;width:100%;height:100%;object-fit: cover;" src="../../images/Scene/background.png"> -->
                            <canvas id="baseMapCanvas"  width="500px" height="300px" style="z-index: 2;;height:300px;width:500px;"></canvas>
                            <!-- <canvas id="activeNodeLineCanvas"  width="500px" height="300px" style="z-index: 2;;height:300px;width:500px;"></canvas> -->
                            <!-- border:1px solid #d3d3d3; -->
                        </div>
                        <div class="node-canvas" style="margin-left:-504px;margin-top: 15px;width:500px;height:300px;;display:inline-block">  
                            <canvas id="activeNodeLineCanvas"  width="500px" height="300px" style="z-index: 2;;height:300px;width:500px;"></canvas>
                        </div>
                        <img v-show="false" id="comBoard" src="../../images/Scene/comBoard.png">
                        <img v-show="false" id="calBoard" src="../../images/Scene/calBorad.png">
                        <img v-show="false" id="computer" src="../../images/Scene/computer.png">
                        <img v-show="false" id="user" src="../../images/Scene/user.png">
                        <img v-show="false" id="edgeServer" src="../../images/Scene/edgeServer.png">
                        <img v-show="false" id="router" src="../../images/Scene/router.png">

                        <el-container style="padding: 0px 25px 0 25px;">
                            <el-main style="padding-top: 5px;">
                                <el-table 
                                :header-cell-style="{background:'#B4E5FB'}" 
                                :data="schemeDetailRecords" 
                                highlight-current-row
                                @current-change="handleCurrentChange1"
                                @row-click="clickRow"
                                style="width:auto;font-size:13px;margin-top: 15px">
                                <el-table-column prop="id" label="id" min-width="15%" align="center"
                                    header-align="center"></el-table-column>
                                
                                <el-table-column prop="det_time" label="推演时间" min-width="15%" align="center"
                                    header-align="center"></el-table-column>

                                <el-table-column prop="det_node" label="推演节点" min-width="15%" align="center"
                                    header-align="center"></el-table-column>
                                
                                <el-table-column prop="det_type" label="推演服务类型" min-width="15%" align="center"
                                    header-align="center"></el-table-column>
                                    
                                <el-table-column prop="task_type" label="推演任务类型" min-width="15%" align="center"
                                    header-align="center"></el-table-column>

                                <el-table-column prop="adt" label="传输数据量" min-width="15%" align="center"
                                    header-align="center"></el-table-column>

                                <el-table-column prop="time_delay" label="推演时延" min-width="15%" align="center"
                                    header-align="center"></el-table-column>

                                <el-table-column prop="img_size" label="帧图片尺寸" min-width="15%" align="center"
                                    header-align="center"></el-table-column>

                                <el-table-column prop="min_score" label="最低精确度" min-width="15%" align="center"
                                    header-align="center"></el-table-column>

                                <el-table-column prop="max_score" label="最高精确度" min-width="15%" align="center"
                                    header-align="center"></el-table-column>
                                
                                <el-table-column prop="oss_img_path" label="推演图片" min-width="15%" align="center"
                                    header-align="center">
                                    <template slot-scope="scope">
                                        <!-- scope.row获取当前行所有数据 作用域插槽获取当前行的数据（可以是图片连接如下：:src="scope.row.iconImgLarge"） -->
                                        <!-- <el-image style="width: 50px; height: 50px" :src="scope.row.icon" fit=""></el-image> -->
                                        <a :href="scope.row.oss_img_path" target=_blank>点击查看</a>
                                    </template>
                                </el-table-column>
                                
                                <!-- <el-table-column prop="" label="操作" min-width="15%" align="center"
                                    header-align="center">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="mini" @click="onSee(scope.row)">修改</el-button>
                                        <el-button type="danger" size="mini" style="margin-left: 0px;" @click="onDelete(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column> -->

                                </el-table>
                                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                    :current-page="currentPage" :page-size="pageSize" :page-sizes="[3,5,10]"
                                    layout="total, sizes,prev, pager, next, jumper" :total="total"
                                    style="text-align: center;margin-top: 10px;">
                                </el-pagination>
                            </el-main>
                        
                        </el-container>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>
<script>
import Header from '../../../components/Header.vue';
export default{
    components:{Header},
    data(){
        return{
            schemeDetailRecords:[],
            businessTypes:[
                {label:'小目标识别',value:'小目标识别'},
                {label:'火灾识别',value:'火点识别'},
            ], //array of objects with "name" and "id" keys.  name is the text to display and id is the value to store in the
            selectedBusinessType:null,
            deductionPlans:[
                {label:'云边协同',value:'cloud_edge'},
                {label:'单边检测',value:'edge'},
            ],
            selectedDeductionPlan:null,
			screenWidth: document.documentElement.clientWidth,  //视窗部分宽度
			fullHeight: document.documentElement.clientHeight,//视窗部分高度 即<html>高度

            baseMapCanvasCtx:null,
            activeNodeCanvasCtx:null,
            pageSize: 5,
			currentPage: 1,
			total:0,
            startTime:null,
            // nodePosition:[[160,170],[330,170],[252,250]],
            nodePosition:[[175,160],[323,158],[252,230]],

            nodeRectPositions:[[10,140],[300,140],[220,220]], //array of arrays with x,y,width,height for each node.  x,y is top left corner of rect.  width
            fileList:[],
            currentRow: null,
        }
    },
    methods:{
        initCanvas(){
            this.baseMapCanvasCtx=document.getElementById('baseMapCanvas').getContext('2d');
            this.activeNodeCanvasCtx=document.getElementById('activeNodeLineCanvas').getContext('2d');
            var htmlImgElementcomBoard=document.getElementById('comBoard');
            var htmlImgElementcalBoard=document.getElementById('calBoard');
            var htmlImgElementComputer=document.getElementById('computer');
            var htmlImgElementUser=document.getElementById('user');
            var htmlImgElementEdgeServer=document.getElementById('edgeServer');
            var htmlImgElementRouter=document.getElementById('router');
            this.activeNodeCanvasCtx.lineWidth = 1;
            this.activeNodeCanvasCtx.strokeStyle = 'red';

            // 画设备之间连线
            this.baseMapCanvasCtx.strokeStyle = 'blue';
            this.baseMapCanvasCtx.lineWidth = 1;
            // this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(35,40 );this.baseMapCanvasCtx.lineTo(130, 40);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.strokeStyle = 'blue'
            this.baseMapCanvasCtx.setLineDash( [ 0, 0, 0] )
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(130,40 );this.baseMapCanvasCtx.lineTo(195, 75);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(195,75 );this.baseMapCanvasCtx.lineTo(252, 105);this.baseMapCanvasCtx.stroke();
            // 黄色虚线
            this.baseMapCanvasCtx.strokeStyle = 'orange';
            this.baseMapCanvasCtx.setLineDash( [ 5, 5, 5] )
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(252,105 );this.baseMapCanvasCtx.lineTo(160, 170);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(252,105 );this.baseMapCanvasCtx.lineTo(340, 170);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(252,105 );this.baseMapCanvasCtx.lineTo(252, 250);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.setLineDash( [ 0,0,0] )
            this.drawArrow(175, 160, 252, 105,"orange");
            this.drawArrow(323, 158, 252, 105,"orange");
            this.drawArrow(252, 230, 252, 105,"orange");
            //通信板之间连线 
            // this.baseMapCanvasCtx.strokeStyle = 'gray';
            // this.baseMapCanvasCtx.lineWidth = 0.5;
            // this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(160,170 );this.baseMapCanvasCtx.lineTo(340, 170);this.baseMapCanvasCtx.stroke();
            // this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(340,170 );this.baseMapCanvasCtx.lineTo(252, 250);this.baseMapCanvasCtx.stroke();
            // this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(252,250 );this.baseMapCanvasCtx.lineTo(160, 170);this.baseMapCanvasCtx.stroke();
            // 通信板和算力板
            this.baseMapCanvasCtx.strokeStyle = 'green';
            this.baseMapCanvasCtx.lineWidth = 1;
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(160,170 );this.baseMapCanvasCtx.lineTo(50, 170);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(340,170 );this.baseMapCanvasCtx.lineTo(450, 170);this.baseMapCanvasCtx.stroke();
            this.baseMapCanvasCtx.beginPath();this.baseMapCanvasCtx.moveTo(252,250 );this.baseMapCanvasCtx.lineTo(370, 250);this.baseMapCanvasCtx.stroke();
            // canvas width:500px;height:300px

            // 画设备和名字
            // 图片失真canvas的宽高和属性的宽高是不一样的，所以导致的失真！！！因为属性的宽高是context的环境宽高，样式宽高和属性宽高默认都是300 150。
            this.baseMapCanvasCtx.fillStyle = 'black';
            // 设置字体
            this.baseMapCanvasCtx.font = '14px Arial';
            this.baseMapCanvasCtx.fillText('用户', 120, 15);
            // this.baseMapCanvasCtx.drawImage(htmlImgElementUser,5,20,60,40);
            // this.baseMapCanvasCtx.fillText('边缘服务器', 100, 15);
            this.baseMapCanvasCtx.drawImage(htmlImgElementUser,100,20,60,40);
            // this.baseMapCanvasCtx.drawImage(htmlImgElementRouter,175,60,40,30);

            this.baseMapCanvasCtx.fillText('通信板卡', 130, 210);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcomBoard,130,150,60,40);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcomBoard,310,150,60,40);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcomBoard,223,230,60,40);
            this.baseMapCanvasCtx.fillText('1', 100, 190);
            this.baseMapCanvasCtx.fillText('2', 380, 190);
            this.baseMapCanvasCtx.fillText('3', 290, 270);


            this.baseMapCanvasCtx.fillText('边缘服务器', 270, 105);
            // this.baseMapCanvasCtx.drawImage(htmlImgElementComputer,140,40,20,35);
            this.baseMapCanvasCtx.drawImage(htmlImgElementComputer,230,80,40,40);

            this.baseMapCanvasCtx.fillText('算力板卡', 20, 210);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcalBoard,20,150,60,40);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcalBoard,420,150,60,40);
            this.baseMapCanvasCtx.drawImage(htmlImgElementcalBoard,340,230,60,40);
            

        },
        drawActiveNode(){    
        },
        getSchemeDetailData(){
            // let options=null;
            // if(pageNum==null){

            // }
            // console.log(this.selectedBusinessType);
            // console.log(this.selectedDeductionPlan);
            // console.log(this.startTime);
            if(this.selectedBusinessType==''){
				this.selectedBusinessType=null;
			}
            if(this.selectedDeductionPlan==''){
				this.selectedDeductionPlan=null;
			}
            let options = {
                method: 'GET',
                url: 'http://proj23.emr-c.com//TargetDetection/getDetHistory',
                params: {
                    // 参数pageNum,pageSize ,det_type,task_type,start_time
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    det_type:this.selectedDeductionPlan,
                    task_type:this.selectedBusinessType,
                    start_time:this.startTime,
                }
            };
            this.$axios.request(options).then(res=>{
                console.log(res);
                if(res.status=='200'){
                    this.schemeDetailRecords=[];
                    if(res.data.selectData)res.data.selectData.forEach(element=>{
                        // console.log(element.resultData);
                        this.schemeDetailRecords.push(element.resultData);
                    })
                    this.total=res.data.total;
                    // console.log(this.schemeDetailRecords)
                }
            }).catch(function (error) {
                console.error(error);
            });
        },
        drawArrow(endX,endY,beginX,beginY,color){
            var l = 15; // 
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
        handleSizeChange(val){
            // console.log(val);
            this.pageSize=val;
            this.getSchemeDetailData()
        },
        
        handleCurrentChange(val){
            // console.log("当前pageNum:"+val);
            this.currentPage=val;
            // console.log("当前pageNum:"+this.currentPage);
            this.getSchemeDetailData();
            console.log(val)

        },
        clickRow(row){
            // console.log("触发了行点击事件");
            // console.log(row);
            var activeNodes=row.det_node.split(',')
            if(activeNodes.length==2){
                this.drawActiveNodeLine(activeNodes);
            }else if(activeNodes.length==1){
                this.drawActiveNodeRect(activeNodes);
            }
        },
        drawActiveArrow(endX,endY,beginX,beginY,color){
            // 判断相对位置关系
            // 真他妈臭
            // if(endY==beginY && endX>beginX){
            //     endX-=20;
            // }else if(endY == beginY && endX<beginX){
            //     endX+=20;
            // }else if(endX>beginX && endY>beginY){
            //     endX-=20;
            //     endY-=20;
            // }else if(endX<beginX && endY<beginY){
            //     endX+=20;
            //     endY+=20;
            // }else if(endX>beginX && endY<beginY){ 
            //     endX-=20;
            //     endY-=20;
            // }else if(endX<beginX && endY>beginY){
            //     endX+=20;
            //     endY-=20;
            // }
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
        drawActiveNodeRect(activeNodes){
            let targetNode=parseInt(activeNodes[0])-1;
            this.activeNodeCanvasCtx.clearRect(0,0,500,500);
            // [[160,170],[330,170],[252,250]] 60,40
            // console.log(this.nodeRectPositions[targetNode][0]);  
            this.activeNodeCanvasCtx.strokeRect(this.nodeRectPositions[targetNode][0],this.nodeRectPositions[targetNode][1],190,60);
        },
        drawActiveNodeLine(activeNodeArray){
            // for(let i=0;i<activeNodeArray.length;i++){
            //     let sourceNode= activeNodeArray[i];
            //     let endNode=activeNodeArray[]
            // }
            this.activeNodeCanvasCtx.clearRect(0,0,500,500);
            // this.activeNodeCanvasCtx.lineWidth = 1;
            // this.activeNodeCanvasCtx.strokeStyle = 'red';
            let endNode= parseInt(activeNodeArray[0]); //边
            let sourceNode=parseInt(activeNodeArray[1]);   //云
            // console.log(sourceNode);
            // console.log(endNode);
            // // 开始绘制路径
            // this.activeNodeCanvasCtx.beginPath();
            // // 移动至起点
            // this.activeNodeCanvasCtx.moveTo(this.nodePosition[sourceNode-1][0], this.nodePosition[sourceNode-1][1]);
            // // 绘制线段
            // this.activeNodeCanvasCtx.lineTo(this.nodePosition[endNode-1][0], this.nodePosition[endNode-1][1]);
            // this.activeNodeCanvasCtx.stroke();
            // 绘制箭头
            this.drawActiveArrow(252, 105,this.nodePosition[endNode-1][0],this.nodePosition[endNode-1][1],);
        },
        handlePreview(){

        },
        handleRemove(){

        },
        beforeRemove(){

        },
        handleExceed(){

        },
        upload(param){
            // const formData = new FormData()
            // formData.append('file', param.file)
            // // const url = 'http://10.128.163.43:20017//uploadFile'
            // // this.$axios.post(url, formData).then(data => {
            // //     console.log(data)
            // // }).catch(response => {
            // //     console.log('图片上传失败')
            // // })

            // // const form = new FormData();
            // // form.append("file", ["D:\\JAVA_Learn\\caihua.png"]);

            // const options = {
            // method: 'POST',
            // url: 'http://10.128.163.43:20017//uploadFile',
            // headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
            // data: '[form]'
            // };

            // this.$axios.request(options).then(function (response) {
            // console.log(response.data);
            // }).catch(function (error) {
            // console.error(error);
            // });
            const form = new FormData();
            form.append("file", param.file);

            const options = {
            method: 'POST',
            url: 'http://10.128.163.43:20017//uploadFile',
            headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
            data: form
            };
            console.log(form)
            this.$axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        },
        beforeUpload(file){
            console.log(11111111111);
        },
        handleCurrentChange1(val){
            console.l
            this.currentRow = val;
        },
        // setCurrent(row) {
        //     this.$refs.singleTable.setCurrentRow(row);
        // },
        
    },
    created() {	
        
		
	},
    // 
    mounted(){
        setTimeout(() => {
            this.initCanvas();
        }, 100);
        window.scheme=this;
        // 监听dialog元素的高度宽度改变
        // const targetNode = document.querySelector('.scheme-coop-fire');
		// // 观察器的配置（需要观察什么变动）
		// const config = { attributes: true, childList: false, subtree: false };
		// // 当观察到变动时执行的回调函数
		// const callback = function(mutationsList, observer) {
		//     // Use traditional 'for loops' for IE 11
		//     for(let mutation of mutationsList) {
		//         if (mutation.type === 'childList') {
		//             console.log('A child node has been added or removed.');
		//         }
		//         else if (mutation.type === 'attributes') {
		// 			// if(status) {
		// 			// 	console.log('我在慢慢变长');
		// 			// } else {
		// 			// 	console.log('我在慢慢变短');
		// 			// }
        //             console.log("检测到scheme-coop-fire属性改变");
		//         }
		//     }
		// };
        // // 创建一个观察器实例并传入回调函数
		// const observer = new MutationObserver(callback);
		
		// // 以上述配置开始观察目标节点
		// observer.observe(targetNode, config);
		
		// 之后，可停止观察
		// observer.disconnect();


        // window.onresize = () => {
        //     console.log('onResize');
		// 	return (() => {
		// 		window.screenWidth = document.body.clientWidth
		// 		this.screenWidth = window.screenWidth
		// 		window.fullHeight = document.documentElement.clientHeight
		// 		this.fullHeight = window.fullHeight
		// 	})()
		// };	
    },
    watch:{
		screenWidth(val){
                console.log("screenWidth发生变化");
		        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
		        if(!this.timer){
		            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
					
		            this.screenWidth = val
		            this.timer = true
		            let that = this
		            setTimeout(function(){
		                // 打印screenWidth变化的值
		                //console.log(that.screenWidth)
						/* if(screenWidth<=1200)
						{
							console.log(screenWidth)
							this.isCollapse=true;	
						}else{
							this.isCollapse=!this.isCollapse;
						} */
		                that.timer = false
		            },400)
		        }
		    },
		fullHeight(val){
                console.log("fullHeight发生变化");
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
	},
}
</script>
<style scoped>
/* 	.websit{
	position: fixed;
	display: flex;
	width: 100%;
	height: 100%;
	} */
.header {
    text-align: center;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;   
    font-size: 22px;
    color: #FFFFFF;
    background-color: rgba(17, 22, 42, 1)
}
.header .logo {
	
    /* box-sizing: border-box; */
	/* padding-left: 500px; */
	/* padding-right: 50%; */
   width: 250px;
    line-height: 50px;
	position:absolute;
	display: flex;
	/* transform: translate(-45%, 30%);*/
	 left: 50%;
	transform: translate(-50%, 8%); 
	display: -webkit-flex;
}
.filter{
    display: block;
    text-align: left;
}
  .el-header {
	display: flex;
	justify-content: center;
    background-color: rgba(17, 22, 42, 1);;
    color: #F0F8FF;

  }
  .el-main {
    /* background-color: #E5ECFC; */
	 background-color: #F0F0F0;
  }
  

</style>