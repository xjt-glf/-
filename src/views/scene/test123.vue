<template>
    <!--地图容器-->
    <div class="about">
        <ul  class="nav clearfix">
            <!-- <li  class="nav-li logo"><a href='javascript:void(0);' style="font-size:large">应急指挥平台</a>
            </li> -->
            <!-- <li  class="nav-li logo"><img src="src/images/Scene/stop.png" class="logo">
            </li> -->
            <li  class="nav-li fl"><a href='javascript:void(0);'>地图选项</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">天气</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">卫星地图</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">强对照3D地图</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">地球模式</a></li>
                </ul>
            </li>
            <li  class="nav-li fl"><a href='javascript:void(0);'>标注</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">标注模式</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">去除标注</a></li>
                </ul>
            </li>
            <!-- <li  class="nav-li fl"><a href='javascript:void(0);'>经验</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">站长历程</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">团队介绍</a></li>
                </ul>
            </li>
            <li  class="nav-li fl"><a href='javascript:void(0);'>学堂</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">站长历程</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">团队介绍</a></li>
                </ul>
            </li>
            <li  class="nav-li fl"><a href='javascript:void(0);'>交作业</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">站长历程</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">团队介绍</a></li>
                </ul>
            </li>
            <li  class="nav-li fl"><a href='javascript:void(0);'>欣赏</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">站长历程</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">团队介绍</a></li>
                </ul>
            </li> -->
            <li  class="nav-li fl"><a href='javascript:void(0);'>态势感知</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">人员定位</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">火点定位</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">火线图</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">火点蔓延模拟</a></li>
                </ul>
            </li>
            <li  class="nav-li fl"><a href='javascript:void(0);'>资源检索</a>
                <ul class="dorp-box">
                    <!-- <li class="drop-li"><a href=''>人员监控</a></li> -->
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">人员管理</a></li>
                    <!-- <li class="drop-li"><a href='#' οnclick="return false;">资源监控</a></li> -->
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">资源监控</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">现场信息</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">多平台联动</a></li>
                </ul>
            </li>
            <li  class="">            
                <div>
                    <input type="text" id="pickerInput">
                    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:250px;height:auto; display:none;"></div>
                </div>
            </li> 
            
            
        </ul>
        <div id="allmap">

        </div>
    </div>
    

</template>

<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=2.0&ak=tnyNijhAtGCGe9uPwfQCvCLCwOkqnGRj&callback=initMap"></script>


<script>
  //  import AMapLoader from '@amap/amap-jsapi-loader'; //引入
  
   export default {
    name: "gaode",
    data() {
       return {
            map:null,
        }
    },
    methods: {
      initMap() {
        var map = new BMapGL.Map("allmap", {
            enableMapClick: false
        });    // 创建Map实例
        
        map.centerAndZoom(new BMapGL.Point(116.358104,39.961554), 15);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        // map.setHeading(64.5);   //设置地图旋转角度
        map.setTilt(0);       //设置地图的倾斜角度
        // map.setMapType(BMAP_EARTH_MAP);
        //map.setMapType(BMAP_SATELLITE_MAP);
        map.setMapStyleV2({     
            styleId: '33d33faa1a67800943a0ada244212dbd'
        });
        var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);
        var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
        map.addControl(cityCtrl);
        // var copyRightCtrl = new BMapGL.CopyrightControl();  // 添加城市列表控件
        // map.addControl(copyRightCtrl);
        map.removeControl(new BMapGL.CopyrightControl());
        this.map=map;
      },
      initNav(){
        window.onload=function()  {                      
            var oBtn=document.querySelectorAll(".nav-li"); //获取一级菜单元素
            oBtn.forEach(e => {
                e.onmouseover=function(){
            // this.style.display="none";
                    this.querySelector('.dorp-box').style.display="block"
                    //给二级菜单添加阴影
                    this.querySelector('.dorp-box').style.boxShadow=" 0 2px 2px gray"
                    }
                    //鼠标出
                e.onmouseout=function(){
                    this.querySelector('.dorp-box').style.display="none"
                    this.querySelector('.dorp-box').style.boxShadow='none'
                }
            });
        }
        
      },
      initPicker(){
        let that=this;
        var ac = new BMapGL.Autocomplete({ //建立一个自动完成的对象
            input: "pickerInput",
            location: this.map,
            });
            
        // var myValue;
        ac.addEventListener("onhighlight", function(e) {
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province 
                +  _value.city 
                +  _value.district 
                +  _value.street 
                +  _value.business;
            }    
            str = "FromItem<br />index = " + e.fromitem.index 
            + "<br />value = " + value;
            
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province 
                +  _value.city 
                +  _value.district 
                +  _value.street 
                +  _value.business;
            }    
            str += "<br />ToItem<br />index = " + e.toitem.index 
            + "<br />value = " + value;
            document.getElementById("searchResultPanel").innerHTML = str;
        });
        var myValue;
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            document.getElementById("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            
            setPlace();
        });
        function setPlace(){
		// map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                that.map.centerAndZoom(pp, 18);
                that.map.addOverlay(new BMapGL.Marker(pp));    //添加标注
            }
            var local = new BMapGL.LocalSearch(that.map, { //智能搜索
            onSearchComplete: myFun
            });
            local.search(myValue);
	    }
      },
      addMarker(LngLatX,LagLatY){ 
        //1
      },
      addIcon(LngLatX,LagLatY,imagePath){

        // 添加marker  有效---------------------------------------
        var point = new BMapGL.Point(LngLatX,LagLatY);    
        this.map.centerAndZoom(point, 15);    
        // var marker = new BMapGL.Marker(point);        // 创建标注    
        // this.map.addOverlay(marker);    

        var myIcon = new BMapGL.Icon(imagePath, new BMapGL.Size(23, 25), {    
            // 指定定位位置。   
            // 当标注显示在地图上时，其所指向的地理位置距离图标左上    
            // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
            // 图标中央下端的尖角位置。    
            //anchor: 'center'    //BMapGL的anchor参数与高德不同
            // 设置图片偏移。   
            // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
            // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
            //imageOffset: new BMapGL.Size(0, 0 - index * 25)   // 设置图片偏移    
        });
        var marker=new BMapGL.Marker(point,{icon:myIcon});
        this.map.addOverlay(marker); 

      }, 
      changeSelected(e){
        if(e.currentTarget.innerHTML[0]!="√"){
            e.currentTarget.innerHTML = "√  "+e.currentTarget.innerHTML
            e.currentTarget.style.background="rgb(0,151 ,167)"
        }else{
            e.currentTarget.innerHTML = e.currentTarget.innerHTML.slice(1)
            e.currentTarget.style.background="rgb(65,62 ,62)"
        }
      }
    },
    mounted() {
      //挂载阶段调用，DOM初始化完成进行地图初始化
      this.initMap();
      this.initNav();
      this.initPicker();
      this.addIcon(116.364594,39.96725,'src/images/Scene/stop.png');
    }
   }
 </script>
   

<style>
    .logo{
        height: 33px;
    }
    .about{
        height: 100%;
        width: 100%;
        /* display: flex; */
    }
    .tangram-suggestion-main{
        z-index: 9999999999;
    }
    #allmap{
        z-index: 1024;
        width: 100%;
        min-width: 1440px;
        height: 746px;
        /* flex:1;
        min-height: 0; */
        overflow: hidden;
        margin:0;
        font-family:"微软雅黑";
    }
    .nav{
        min-width: 1440px;
        z-index: 1025;
        margin-bottom: 0px;
        margin-top: 0px;
        height: 35px;
        background-color:#171a20;
        position: relative;
    }
    .nav-li>a{   
        padding:8px 20px;   
        color:#eeeeee;   
        display:block;   
        text-decoration:none;   
        font-size:14px;   
        line-height:18px;
    }
    .dorp-box{
        z-index: 1024;
        transition-duration: 1s;
        position:absolute;
        /* top:50px; */
        background-color:#413e3e; 
        min-width:90px;
        display:none;
    }
    .drop-li>a{ 
        padding:8px 0px;  
        color:#ffffff;  
        display:block; 
        text-decoration:none;  
        font-size:12px;
    }   
    .drop-li>a:hover{
        background-color: rgb(66,71,71) !important;
    }
    .nav > li{           
        display: inline-block;
    }
    .nav > li:hover{
        background-color: rgb(66, 71, 71);
    }
    li{
        list-style-type:none;
    }
    body{
        margin: 0px;
    }
    .nav-li > ul{
        text-align: center;
        padding-inline-start: 0px;
    }
    #container{
        width: 100%;
        height: 700px;
        background-color: aliceblue;
    }
    /* body, html,#allmap {width: 100%;flex:1;min-height: 0;overflow: hidden;margin:0;font-family:"微软雅黑";} */
 </style>