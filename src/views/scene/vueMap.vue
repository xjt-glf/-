<template>
    <div id="about">
      <!-- <h3 class="title">{{ msg }}</h3> -->
        <ul  class="nav">
            <!-- <li  class="nav-li logo"><a href='javascript:void(0);' style="font-size:large">应急指挥平台</a>
            </li> -->
            <!-- <li  class="nav-li logo"><img src="src/images/Scene/stop.png" class="logo">
            </li> -->
            <li  class="nav-li fl"><a href='javascript:void(0);'>地图选项</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">天气</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="changeSelected($event)">卫星地图</a></li>
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
                </div>
            </li>      
        </ul>
        <div class="amap-wrapper">
            <baidu-map
            class="bm-view"
            ak="2480O5pnkEvPjBrqEQ7ldlu3hDMdajRA"
            :center="mapItem.center"
            :zoom="mapItem.zoom"
            :scroll-wheel-zoom="mapItem.scrollWheelZoom">
                <!-- <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> -->
                <bm-marker :position="{lng: 116.364594, lat: 39.96725}" :dragging="true" ></bm-marker>
                <bm-control anchor="BMAP_ANCHOR_TOP_LEFT">
                    <button @click="addZoom(8)">缩放至最大</button>
                    <button @click="addZoom(5)">还原</button>
                    <button @click="addZoom(3)">缩放至最小</button>
                </bm-control>
            </baidu-map>
            <!-- <el-amap class="amap-box" :vid="'amap-vue'"></el-amap> -->
        </div>
    </div>
  </template>
  
  <script>
import BmScale from "vue-baidu-map/components/controls/Scale"
import BaiduMap from "vue-baidu-map/components/map/Map.vue"
import BmControl from "vue-baidu-map/components/controls/Control"
import BmMarker from "vue-baidu-map/components/overlays/Marker"
import BmLabel from "vue-baidu-map/components/overlays/Label"

  export default {
    name:"maps",
    components:{BmScale,BaiduMap,BmControl,BmMarker,BmLabel},
    data () {
      return {
        msg: 'vue-amap向你问好！',
        mapItem:{
            center:{
                lng:116.364594,
                lat:39.96725
            },
            zoom:7,
            scrollWheelZoom:true
        }
      }
    },
    methods:{
        initNav(){
            // let that=this
            window.onload=function()  {    
                // that.initMap();    
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
        changeSelected(e){
            if(e.currentTarget.innerHTML[0]!="√"){
                e.currentTarget.innerHTML = "√  "+e.currentTarget.innerHTML
                e.currentTarget.style.background="rgb(0,151 ,167)"
            }else{
                e.currentTarget.innerHTML = e.currentTarget.innerHTML.slice(1)
                e.currentTarget.style.background="rgb(65,62 ,62)"
            }
        },
        addZoom (level) {
            this.mapItem.zoom = level
        },
    },
    mounted(){
        this.initNav();
    }
  }
  </script>
  
  <style>
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
    .about{
        height: 100%;
        width: 100%;
        /* display: flex; */
    }
    .amap-wrapper {
    width: 100%;
    height: 800px;
    }
    .nav-li > ul{
        text-align: center;
        padding-inline-start: 0px;
    }
    .bm-view{
        width:100%;
        height: 800px;
    }
  </style>