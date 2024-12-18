<template>
  <div class="chistorybframe" style="color: white;">
    <!-- center-select-history-bounce-frame -->
    <el-dialog

    :visible.sync="ifShowDialog"
    width="30%"
    :modal=false

    :fullscreen=true
    :before-close="changeShow">

    <div slot="title" class="dialog-header">
      <!-- 标题栏左侧标题文字 -->
       <div class="left-title" style="display: inline-block;">
        <span class="span c">目标识别历史检测视频
          <el-date-picker v-model="startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期" style="margin-left: 20px;" v-if=true></el-date-picker>
          <!-- <el-date-picker v-model="startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker> -->
          <el-button type="primary" size="mini" style="margin-left: 5px;margin-bottom: 5px;" @click="startSelect">筛选</el-button>
          <!-- 下拉选择框 -->
          <!-- <el-select v-model="selectedModel" placeholder="选择模型" style="margin-left: 20px;">
              <el-option label="全部模型" value="all"></el-option>
          </el-select> -->
          <el-button type="primary" size="mini" style="margin-left: 5px;margin-bottom: 5px;" @click="startplay">播放</el-button>
        </span>
       </div>
    </div>

    <el-container style="padding: 10px 25px 0 25px">
      
      <el-main class="table" >
        <el-table
          :header-cell-style="{background:'#B4E5FB'}"
          :data="selectedTargetRecogHisList"
          style="width: auto;font-size: 13px;margin-top: 15px;" v-if="showtable">

          <el-table-column prop="name" label="项目名称" min-width="15%" align="center" header-align="center"></el-table-column>
          <el-table-column prop="type" label="模型类别" min-width="15%" align="center" header-align="center"></el-table-column>
          <el-table-column prop="date" label="日期" min-width="15%" align="center" header-align="center"></el-table-column>

        </el-table>

        <el-pagination background @current-change="handleCurrentChange"
              :current-page="currentPage" :page-count="pageSize"
              layout="total, prev, pager, next, jumper" :total="total"
              style="text-align: center;margin-top: 10px;"
              v-if="showtable">
        </el-pagination>
      </el-main>

      <!-- 播放历史识别视频 -->
      <div class="video" v-if="!showtable">
       

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
        <div class='c'>目标检测视频
                    <el-button type="info" size="mini" v-if="!showTimePicker" @click="resetStartTime">重置时间</el-button>
                    <el-date-picker    v-model="startTime"    type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期时间"  v-if="showTimePicker"></el-date-picker>
                    <el-button type="primary" size="mini" v-if="showStartButton" :disabled=buttonFobidded style="margin-left: 0px;margin-bottom: 5px;" @click="startPlay">开始</el-button>
					<el-button type="danger" size="mini" v-if="!showStartButton" :disabled=buttonFobidded style="margin-left: 0px;margin-bottom: 5px;" @click="pausePlay">暂停</el-button>
                </div>
            <div class="left-title" style="display:inline-block">
            <span class="span c">目标识别历史检测视频
                
            </span>
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
            <span class="span c">
                <el-button type="info" size="mini" v-if="!showTimePicker" @click="resetStartTime">重置时间</el-button>
                <el-date-picker    v-model="startTime"    type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"  placeholder="选择日期时间"  v-if="showTimePicker"></el-date-picker>
                <el-button type="primary" size="mini" v-if="showStartButton" :disabled=buttonFobidded style="margin-left: 0px;margin-bottom: 5px;" @click="startPlay">开始</el-button>
                <el-button type="danger" size="mini" v-if="!showStartButton" :disabled=buttonFobidded style="margin-left: 0px;margin-bottom: 5px;" @click="pausePlay">暂停</el-button>
            </span>
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
                <!-- 窗口 -->
                <!-- <el-image :src=detectedImgUrl  v-if=isMiniSize class="image" style="position:absolute;margin-right: 20px;" width="95%" height="auto"></el-image> -->
                <img id="img1Window" :src=detectedImgUrl1    v-if=isMiniSize class="image" style="z-index: 3;position:absolute;margin-right: 20px;" width="95%;" height="auto">
                <img id="img2Window" :src=detectedImgUrl2    v-if=isMiniSize class="image" style="z-index: 1;position:absolute;margin-right: 20px;" width="95%;" height="auto">
                <img id="img3Window" :src=detectedImgUrl3    v-if=isMiniSize class="image" style="z-index: 2;position:absolute;margin-right: 20px;" width="95%;" height="auto">
                <!-- 全屏 -->
                <!-- <el-image :src=detectedImgUrl  v-if=!isMiniSize class="image" style="position:absolute;margin-right: 20px;height: 90%;width:90%;transform: translate(-50%,0);left: 50%;" width="90%;" height="auto"></el-image> -->
                <img id="img1FullScreen" :src=detectedImgUrl1    v-if=!isMiniSize class="image" style="z-index: 3;position:absolute;height: 90%;width:90%;transform: translate(-50%,0);left: 50%;" width="90%;" >
                <img id="img2FullScreen" :src=detectedImgUrl2    v-if=!isMiniSize class="image" style="z-index: 1;position:absolute;height: 90%;width:90%;transform: translate(-50%,0);left: 50%;" width="90%;" >
                <img id="img3FullScreen" :src=detectedImgUrl3    v-if=!isMiniSize class="image" style="z-index: 2;position:absolute;height: 90%;width:90%;transform: translate(-50%,0);left: 50%;" width="90%;" >

                <span style="position:absolute;margin-top: 33%;margin-left: 5px;z-index: 4;">带宽：{{ bandwidth }} Mbps</span>
                <span style="position:absolute;margin-top: 45%;margin-left: 5px;z-index: 4;">时延：{{ delay }} ms</span>
                <!-- <span style="position:absolute;margin-top: 49%;margin-left: 5px;z-index: 4;">帧率：{{ fps }} FPS</span> -->
                <span style="position:absolute;margin-top: 41%;margin-left: 5px;z-index: 4;">任务类型：{{ taskType }} </span>
                <span style="position:absolute;margin-top: 37%;margin-left: 5px;z-index: 4;">检测类型：{{ detectType }} </span>

                <span style="position:absolute;margin-top: 33%;right: 25px;z-index: 4;">无人机飞行高度：{{ height }} M</span>
                <!-- <span style="position:absolute;margin-top: 41%;right: 25px;z-index: 4;">无人机飞行经纬度：{{ pos }} </span> -->

                <span style="position:absolute;margin-top: 37%;right: 25px;z-index: 4;">无人机飞行经度：{{ pos_longitude }} </span>
                <span style="position:absolute;margin-top: 41%;right: 25px;z-index: 4;">无人机飞行纬度：{{ pos_latitude }} </span>
                
                <span style="position:absolute;margin-top: 45%;right: 25px;z-index: 4;">目标数量：{{ targetCount }} </span>
                <span style="position:absolute;margin-top: 49%;right: 25px;z-index: 4;">相机模态：可见光 </span>
            </div>
            
        </el-dialog>










        
      </div>

    </el-container>

      
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
      interval:null,
      startTime:null,
      selectedModel:"all",
      exit:false,
      showStartButton:true,
      showTimePicker:true,
      pageSize:5,
      currentPage:1,
      total:0,
      selectedTargetRecogHisList:[],
      targetRecogHisList:[],
      showtable:true,

      isMiniSize: false,
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
      detectedImgUrl: null,
      imgEleChoose:1,
      detectedImgUrl1: null,
      detectedImgEle1FullScreen: null,
      detectedImgEle1Window: null,
      detectedImgUrl2: null,
      detectedImgEle2FullScreen: null,
      detectedImgEle2Window: null,
      detectedImgUrl3: null,
      detectedImgEle3FullScreen: null,
      detectedImgEle3Window: null,
      interval: null,
      ifFirstShow: true,
      nextNum: null,
      startTime:null,
      showTimePicker:true,
      buttonFobidded:false,
      showStartButton:true,
      exit:false,
      taskType: null,
      detectType: null,
    }
  },
  created(){

  },
  mounted(){
        console.log("9898")
        this.$parent.removeAllMarkers();
        this.$parent.removeAllGlobalDetectedObject();
        window.history_target=this;
        this.detectedImgEle1FullScreen=document.getElementById("img1FullScreen");
        console.log("989")
        console.log(this.detectedImgEle1FullScreen)
        this.detectedImgEle2FullScreen=document.getElementById("img2FullScreen");
        this.detectedImgEle3FullScreen=document.getElementById("img3FullScreen");
        // this.interval=setInterval(this.getDetectedImg,5000)
    },
  methods: { 
    changeShow(){
      this.clearThisInterval();
      this.exit=true;
      this.$parent.clearAllDetectedMarkers();
      
      this.$parent.showTargetRecogHistory();

      
    },
    clearThisInterval(){
      clearInterval(this.interval);
    },
    changeShow(){
            this.clearThisInterval();
            this.exit=true;
            this.$parent.clearAllDetectedMarkers();

            this.$parent.showTargetRecogHistory();
        },
        closeVue(){
            this.clearThisInterval();
            this.exit=true;
            this.$parent.clearAllDetectedMarkers();

            this.$parent.showTargetRecogHistory();
        },
        clearThisInterval(){
            clearInterval(this.interval);
        },
        resetStartTime(){
            this.showTimePicker=true;
            this.pausePlay();
            this.buttonFobidded=false;
            this.ifFirstShow=true;
        },
        miniSize() {
            // 
            console.log("miniSize方法"+this.isMiniSize)
            this.isMiniSize = !this.isMiniSize;
            if(this.isMiniSize){
                // 最小化
                this.dialogWidth = '22%';
                var imgVueElement = document.getElementsByClassName('bounce-frame-history-target-recog')[0]
              
                imgVueElement.style.width="35%"
                imgVueElement.style.transform="translate(-50%,-50%)";
            }
            else{
                // 全屏
                this.dialogWidth = '47%';
                var imgVueElement = document.getElementsByClassName('bounce-frame-history-target-recog')[0]
                
                imgVueElement.style.width="100%";
                imgVueElement.style.transform="none";
            }
        },
    startSelect(){
      console.log('请求一次数据');
      console.log("exit:" + this.exit);
      if(this.exit==true)return;
      const options = {
        method: 'GET',
        url: this.$HPCNServerURL+":20008//TargetDetection//getDetHistory",
        params:{
          start_time: this.startTime,
          pageNum: -1,
          pageSize: this.pageSize
        }
      };
      this.$axios.request(options)
      .then(response=>{
        console.log(response);
        // 返回的是一个JSONResult，data属性是SelectList，SelectList有total、SelectData
        // SelectData是查询列表List<TargetDetectedResultForDisplayVO>
        //TargetDetectedResultForDisplayVO包含结果数据，对象等
        const selectData = response.data.selectData;

        // // 将后端数据映射到前端需要的格式  [{"name":xxx,"type":xxx,"date":xxx},...]
        this.targetRecogHisList = [];
        console.log(selectData);
        for(let i = 0; i < selectData.length; i++) {
          let item = selectData[i]["resultData"];
          
          this.targetRecogHisList.push({"name":"图片" + (i+1) + ".jpg", "type":item.det_type, "date":item.det_time});
          
        }

        this.total = response.data.total; // 更新总记录数

        this.selectedTargetRecogHisList = this.targetRecogHisList.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
        );

      })
      // .catch(err=>{
      //   this.$message.error("请求异常！");
      // })
    },
    startplay(){
      this.showtable=!this.showtable;
      this.startPlay();
    },
    onDelete(row) {
      
    },

    handleSizeChange(val){
      this.pageSize = val;
      this.currentPage = 1;
      this.startSelect();
    },

    handleCurrentChange(current){
      this.currentPage = current;
      this.startSelect();
    },

    getDetectedImg(){
            console.log('请求了一次数据');
            if(this.exit==true)return;
            if(this.ifFirstShow){
                if((this.isMiniSize==false && this.detectedImgEle1FullScreen == null)
                    || (this.isMiniSize==true && this.detectedImgEle1Window == null)){
                    this.getImgElement()
                    console.log('拿了一次element')
                }
                var options = {
                    method: 'GET',
                    // 本地
                    url: this.$HPCNServerURL+":20008//TargetDetection//getDetResults",
                    // 云端
                    // url: "http://proj23.emr-c.com/TargetDetection//getDetResults",
                    params:{
    
                        time: this.startTime,
                    }
                };
                this.$axios.request(options).then(res=>{
                    console.log(res);
                    //    清除地图上所有图标后拿新图标
                    // this.$parent.removeAllMarkers();
                    this.$parent.clearAllDetectedMarkers();
                    this.map.setCenter([res.data.resultData["camera_longitude"],res.data.resultData["camera_latitude"]]);

                    // this.detectedImgUrl=res.data.resultData["oss_img_path"];
                    if(this.imgEleChoose==1){
                        // this.detectedImgUrl1='http://192.168.0.218/data/'+res.data.resultData['local_img_path'].substring(43);

                        // 本地

                        this.detectedImgUrl1=this.$HPCNServerURL+'/data/'+res.data.resultData['local_img_path'].substring(43);
                        // this.detectedImgUrl1=res.data.resultData["oss_img_path"];
                        
                        this.imgEleChoose=2;
                        // console.log("2")
                        // if(this.isMiniSize==false){
                        //   console.log("3")
                        //     this.detectedImgEle1FullScreen.style.zIndex=3
                        //     console.log("4")
                        //     this.detectedImgEle2FullScreen.style.zIndex=1
                        //     this.detectedImgEle3FullScreen.style.zIndex=2
                        // }else{
                        //     this.detectedImgEle1Window.style.zIndex=3
                        //     this.detectedImgEle2Window.style.zIndex=1
                        //     this.detectedImgEle3Window.style.zIndex=2
                        // }
                         console.log("1")
                    }else if(this.imgEleChoose==2){
                        // this.detectedImgUrl1='http://192.168.0.218/data/'+res.data.resultData['local_img_path'].substring(43);                      
                        this.imgEleChoose=3;
                        // 本地
                        this.detectedImgUrl1=this.$HPCNServerURL+'/data/'+res.data.resultData['local_img_path'].substring(43);
                        console.log("123",this.detectedImgUrl1);
                        // 云
                        // this.detectedImgUrl1=res.data.resultData["oss_img_path"];

                        // if(this.isMiniSize==false){
                        //     this.detectedImgEle1FullScreen.style.zIndex=2
                        //     this.detectedImgEle2FullScreen.style.zIndex=3
                        //     this.detectedImgEle3FullScreen.style.zIndex=1
                        // }else{
                        //     this.detectedImgEle1Window.style.zIndex=2
                        //     this.detectedImgEle2Window.style.zIndex=3
                        //     this.detectedImgEle3Window.style.zIndex=1
                        // }
                        console.log("2")
                    }else if(this.imgEleChoose==3){
                        // 本地
                        this.detectedImgUrl1=this.$HPCNServerURL+'/data/'+res.data.resultData['local_img_path'].substring(43);
                        // 云
                        this.imgEleChoose=1;
                        // this.detectedImgUrl1=res.data.resultData["oss_img_path"];

                        // if(this.isMiniSize==false){
                        //     this.detectedImgEle1FullScreen.style.zIndex=1
                        //     this.detectedImgEle2FullScreen.style.zIndex=2
                        //     this.detectedImgEle3FullScreen.style.zIndex=3
                        // }else{
                        //     this.detectedImgEle1Window.style.zIndex=1
                        //     this.detectedImgEle2Window.style.zIndex=2
                        //     this.detectedImgEle3Window.style.zIndex=3
                        // }
                        console.log("3")
                    }
                    this.height=res.data.resultData["camera_height"];
                    // this.pos=res.data.resultData["camera_longitude"]+","+res.data.resultData["camera_latitude"];
                    this.pos_longitude=res.data.resultData['camera_longitude'];
                    this.pos_latitude=res.data.resultData['camera_latitude'];
                    this.delay=res.data.resultData["time_delay"];
                    this.delay=res.data.resultData["time_delay"];
                    this.bandwidth=res.data.resultData["bandwidth"];
                    this.taskType=res.data.resultData["task_type"];
                    this.detectType=res.data.resultData["det_type"];

                    this.targetCount=res.data.objects.length;
                    // http://ossfile.hpcner.com/target_identification/%E8%BD%A6%E8%BE%86/car.png?Expires=2000893933&OSSAccessKeyId=LTAI5tLLj9yWk9K9xtqsaVSf&Signature=pIPMcU%2Bcfb7zz3ec9epN7px7%2FNo%3D
                    // 处理图标渲染逻辑
                    console.log(res)
                    res.data.objects.forEach(object => {
                        console.log(object.type);
                        var detectedImgUrl
                        switch(object.type){
                            case 'fire':
                                detectedImgUrl="/src/images/Scene/huomiao.png"
                                this.$parent.addIconRipple([object.longitude,object.latitude]);
                                this.$parent.addIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'火点_目标检测所得',null,object["oss_img_path"]);
                                break;
                            case 'car':
                                detectedImgUrl="/src/images/Scene/detectedcar.png";
                                this.$parent.addIconRipple([object.longitude,object.latitude]);
                                this.$parent.addIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'车辆_目标检测所得',null,object["oss_img_path"]);
                                break;
                            case 'person':
                                detectedImgUrl="/src/images/Scene/ren.png";
                                this.$parent.addIconRipple([object.longitude,object.latitude]);
                                this.$parent.addIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'人员_目标检测所得',null,object["oss_img_path"]);
                                break;
                        }
                        
                        
                    });
                    this.nextNum=res.data.resultData.id;
                    this.ifFirstShow=false;
                    if(!this.exit){
                        setTimeout(() => {
                            this.getDetectedImg();
                        }, 1000);
                    }
                })
                
            }
            else{
                // if(this.etectedImgEle1FullScreen == null){
                //     this.getImgElement()
                // }
                if((this.isMiniSize==false && this.detectedImgEle1FullScreen == null)
                    || (this.isMiniSize==true && this.detectedImgEle1Window == null)){
                    this.getImgElement()
                    // console.log('拿了一次element')
                }
                var options = {
                    method: 'GET',
                    // 本地
                    url: this.$HPCNServerURL+":20008//TargetDetection//getDetResults",
                    // 云端
                    // url: "http://proj23.emr-c.com/TargetDetection//getDetResults",
                    params:{
                        num:this.nextNum
                    }
                };
                console.log("111111111111111111111"+this.nextNum);
                this.$axios.request(options).then(res=>{
                    console.log(res);
                    if(res.message=='已结束'){
                        this.clearThisInterval();
                        return;
                    }
                    //    清除地图上所有图标后拿新图标
                    // this.$parent.removeAllMarkers();
                    this.$parent.clearAllDetectedMarkers();

                    // this.detectedImgUrl=res.data.resultData["oss_img_path"];
                    if(this.imgEleChoose==1){
                        // this.detectedImgUrl1='http://192.168.0.218/data/'+res.data.resultData['local_img_path'].substring(43);
                        // 本地
                        this.detectedImgUrl1=this.$HPCNServerURL+'/data/'+res.data.resultData['local_img_path'].substring(43);
                        // this.detectedImgUrl1=res.data.resultData["oss_img_path"];

                        this.imgEleChoose=2;
                        if(this.isMiniSize==false){
                            this.detectedImgEle1FullScreen.style.zIndex=3
                            this.detectedImgEle2FullScreen.style.zIndex=1
                            this.detectedImgEle3FullScreen.style.zIndex=2
                        }else{
                            this.detectedImgEle1Window.style.zIndex=3
                            this.detectedImgEle2Window.style.zIndex=1
                            this.detectedImgEle3Window.style.zIndex=2
                        }
                        // console.log("1")
                    }else if(this.imgEleChoose==2){
                        // this.detectedImgUrl1='http://192.168.0.218/data/'+res.data.resultData['local_img_path'].substring(43);
                        // 本地
                        this.detectedImgUrl1=this.$HPCNServerURL+'/data/'+res.data.resultData['local_img_path'].substring(43);
                        // this.detectedImgUrl1=res.data.resultData["oss_img_path"];


                        this.imgEleChoose=3;
                        if(this.isMiniSize==false){
                            this.detectedImgEle1FullScreen.style.zIndex=2
                            this.detectedImgEle2FullScreen.style.zIndex=3
                            this.detectedImgEle3FullScreen.style.zIndex=1
                        }else{
                            this.detectedImgEle1Window.style.zIndex=2
                            this.detectedImgEle2Window.style.zIndex=3
                            this.detectedImgEle3Window.style.zIndex=1
                        }
                        // console.log("2")
                    }else if(this.imgEleChoose==3){
                        // this.detectedImgUrl1='http://192.168.0.218/data/'+res.data.resultData['local_img_path'].substring(43);
                        // 本地
                        this.detectedImgUrl1=this.$HPCNServerURL+'/data/'+res.data.resultData['local_img_path'].substring(43);
                        // this.detectedImgUrl1=res.data.resultData["oss_img_path"];

                        this.imgEleChoose=1;
                        if(this.isMiniSize==false){
                            this.detectedImgEle1FullScreen.style.zIndex=1
                            this.detectedImgEle2FullScreen.style.zIndex=2
                            this.detectedImgEle3FullScreen.style.zIndex=3
                        }else{
                            this.detectedImgEle1Window.style.zIndex=1
                            this.detectedImgEle2Window.style.zIndex=2
                            this.detectedImgEle3Window.style.zIndex=3
                        }
                        // console.log("3")
                    }
                    console.log("-----------------");
                    this.height=res.data.resultData["camera_height"];
                    // this.pos=res.data.resultData["camera_longitude"]+","+res.data.resultData["camera_latitude"];
                    this.pos_longitude=res.data.resultData['camera_longitude'];
                    this.pos_latitude=res.data.resultData['camera_latitude'];
                    this.delay=res.data.resultData["time_delay"];
                    this.delay=res.data.resultData["time_delay"];
                    this.bandwidth=res.data.resultData["bandwidth"];
                    this.targetCount=res.data.objects.length;
                    this.taskType=res.data.resultData["task_type"];
                    this.detectType=res.data.resultData["det_type"];
                    this.map.setCenter([res.data.resultData["camera_longitude"],res.data.resultData["camera_latitude"]]);

                    // http://ossfile.hpcner.com/target_identification/%E8%BD%A6%E8%BE%86/car.png?Expires=2000893933&OSSAccessKeyId=LTAI5tLLj9yWk9K9xtqsaVSf&Signature=pIPMcU%2Bcfb7zz3ec9epN7px7%2FNo%3D
                    // 处理图标渲染逻辑
                    res.data.objects.forEach(object => {
                        console.log(object)
                        var detectedImgUrl
                        switch(object.type){
                            case 'fire':
                                detectedImgUrl="/src/images/Scene/huomiao.png"
                                this.$parent.addIconRipple([object.longitude,object.latitude]);
                                this.$parent.addIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'火点_目标检测所得',null,object["oss_img_path"]);
                                
                                break;
                            case 'car':
                                detectedImgUrl="/src/images/Scene/detectedcar.png";
                                this.$parent.addIconRipple([object.longitude,object.latitude]);
                                this.$parent.addIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'车辆_目标检测所得',null,object["oss_img_path"]);
                                break;
                            case 'person':
                                console.log("识别到一个person");
                                detectedImgUrl="/src/images/Scene/ren.png";
                                this.$parent.addIconRipple([object.longitude,object.latitude]);
                                this.$parent.addIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'人员_目标检测所得',null,object["oss_img_path"]);
                                break;
                        } 
                    });
                    this.nextNum=res.data.resultData.id;
                    this.ifFirstShow=false;
                    if(!this.exit){
                        setTimeout(() => {
                            this.getDetectedImg();
                        }, 1000);
                    }
                })
            }

            
        },
  startPlay(){
      // console.log("11111111");
      this.showStartButton=false;
      this.showTimePicker=false;
      this.exit=false;
      // this.interval=setInterval(this.getDetectedImg,500);
      this.getDetectedImg();
  },
  getImgElement(){
      if(this.isMiniSize==false){
          this.detectedImgEle1FullScreen=document.getElementById("img1FullScreen");
          this.detectedImgEle2FullScreen=document.getElementById("img2FullScreen");
          this.detectedImgEle3FullScreen=document.getElementById("img3FullScreen");
      }else{
          this.detectedImgEle1Window=document.getElementById("img1Window");
          this.detectedImgEle2Window=document.getElementById("img2Window");
          this.detectedImgEle3Window=document.getElementById("img3Window");
      }
      // console.log( this.detectedImgEle1FullScreen)
  },
  pausePlay(){
            this.exit=true;
            this.showStartButton=true;
        },
  }
};
</script>

<style>

.chistorybframe{
height: 100%;
width: 100%;
}

.el-dialog{
background: rgb(61,73,106,0.7);
}

/* .el-container main {
  display: flex;
  flex-direction: column;
  min-height: 72vh;
} */

.el-pagination{
margin-top: auto;
}

.el-main{
  padding: 0px !important;
}



.video{
  position: absolute;
  top: 10%;
  left: 0px;
  height:80%;
  width: 100%;
}

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