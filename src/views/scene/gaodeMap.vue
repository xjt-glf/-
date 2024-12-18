<template>
    <!--地图容器-->
    <!-- T -->
    <div class="about1">
        <!-- <div v-show="false" style="width:1400px;height:1px"></div> -->
        <ul class="markersmenu" v-if="markersmenu_show">
            <!-- 改用v-for模式 -->
            <li class="drop-li" v-for="(selectedLabelTypeObject,index) in selectedLabelTypeObjectList" :key="index">
                <div style="width:50px;height:50px">
                    <img  :src= "selectedLabelTypeObject.icon" width="32" height="32">
                    <el-radio v-model="selectedMarkerType" :label="selectedLabelTypeObject.objectName"  :iconImgUrl="selectedLabelTypeObject.icon" style="padding-left:7px" @click.native="getRadioValue($event)">&nbsp;</el-radio>
                    <!-- <span style="padding-left:8px">{{ device_markers[0].remain }}</span> -->
                </div>
            </li>
        </ul>

        <ul class="mapopt">
            <li  class="nav-li fl"><a href='javascript:void(0);'>地图选项</a>
                <ul class="dorp-box">
                    <li class="drop-li"><a href="javascript:void(0);" v-on:click="showWeather($event)">天气</a></li>
                    <li class="drop-li"><a href="javascript:void(0);" id="maptype" v-on:click="mapType($event)">地图类型</a></li>
                    <!-- <li class="drop-li"><a href="javascript:void(0);" @click="resetPosition">重置定位</a></li> -->
                </ul>
            </li>
            <li  class="nav-li fl"><a href='javascript:void(0);'>标注</a>
                <ul class="dorp-box">
                    <li class="drop-li" ><a href="javascript:void(0);" id="mouseTool" v-on:click="showMouseToolMeasurement($event)">标注测量</a></li>
                    
                    <li class="drop-li"><a href="javascript:void(0);" id="mouseTool2" v-on:click="showMouseToolLabel($event)">标注图形</a></li>
                    
                    <li class="drop-li"><a href="javascript:void(0);" id="mouseTool3" v-on:click="showPositionPicker($event)">拖拽选址</a></li>
                </ul>
            </li>
        </ul>
        <!-- <div class="test"></div> -->
        <div class="header">
            <div class="event-name">
                <span>
                    当前事件:
                </span>
                京西基地应急模拟
            </div>
            <div class="platform-name">
                <div class="title1">
                    应急指挥平台
                </div>
            </div>
            
            <ul  class="nav" style="padding-left:27%;padding-top: 6px;" v-show="eventOne_flag">
                <!-- <li  class="">            
                    <div class="pickerInput">
                        <input type="text" id="pickerInput" placeholder="地图搜索">  
                    </div>
                </li> -->
                
                <li  class="nav-li fl"><a href='javascript:void(0);'>灾情态势</a>
                    <ul class="dorp-box">

                        <li class="drop-li drop-li-sec"><a href="javascript:void(0);" v-on:click="showBframeL1($event)">火灾信息</a>
                            <ul class="dorp-box dorp-box-sec">
                                <!-- <li class="drop-li"><a href="javascript:void(0);" v-on:click="showDevice($event)">设备部署</a></li> -->
                                <li class="drop-li"><a href="javascript:void(0);" v-on:click="showCoverMenu($event)">状态信息</a></li>
                                <!-- <li class="drop-li"><a href="javascript:void(0);" v-on:click="showHeatMap($event)">热力图</a></li>
                                <li class="drop-li"><a href="javascript:void(0);" v-on:click="showSituation($event)">火势图</a></li> -->
                                <!-- <li class="drop-li"><a href="javascript:void(0);" v-on:click="showDevice($event)">态势预测</a></li> -->
                                <li class="drop-li"><a href="javascript:void(0);" id="labelMarkerId" @click="showBframeC1">手动标注</a></li>
                                <!-- <li class="drop-li"><a href="javascript:void(0);" id="labelMarkerId" v-on:click="labelMarker($event)">手动标注</a></li> -->
                                <!-- <li class="drop-li"><a href="javascript:void(0);" id="labelMarkerId" @click="editFireline">编辑火线</a></li> -->
                            </ul>
                        </li>
                        <li class="drop-li drop-li-sec"><a href="javascript:void(0);" >智能业务</a>
                            <ul class="dorp-box dorp-box-sec">
                                <li class="drop-li"><a href="javascript:void(0);" @click="showd3frameData">地图数据管理</a></li>
                                <li class="drop-li"><a href="javascript:void(0);" @click="d3_showbutton">3维地图</a></li>
                                <li class="drop-li"><a href="javascript:void(0);" @click="showTargetRecogGlobal">实时目标识别</a></li>
                                <li class="drop-li"><a href="javascript:void(0);" @click="showTargetRecogHistory">目标识别历史</a></li>
                                <li class="drop-li"><a href="javascript:void(0);" @click="showAudioNoiseReduction">音频降噪</a></li>
                                <!-- <li class="drop-li"><a href="javascript:void(0);" @click="alertMessage">目标识别</a></li> -->
                            </ul>

                        </li>
                        <li class="drop-li drop-li-sec"><a href="javascript:void(0);" >资源调度</a>
                            <ul class="dorp-box dorp-box-sec">
                                <!-- 方法名未修改 -->
                                <li class="drop-li"><a href="javascript:void(0);" @click="showSchemeCoopSmallGoal">小目标</a></li>
                                <li class="drop-li"><a href="javascript:void(0);" @click="showSchemeEdgeSmallGoal">火灾</a></li>
                                <li class="drop-li"><a href="javascript:void(0);" @click="showSchemeCoopFire">云边协同</a></li> 
                                <li class="drop-li"><a href="javascript:void(0);" @click="showSchemeEdgeFire">单点</a></li>   
                                <li class="drop-li"><a href="#/schemeDetail" target=_blank>推演记录详情</a></li>  
                            </ul> 
                        </li>
                    </ul>
                </li>

                <li  class="nav-li fl"><a href='javascript:void(0);' @click="showBframeL2">救灾指挥</a>
                    <ul class="dorp-box"> 
                        <li class="drop-li"><a href="javascript:void(0);" @click="showBframeL3">行动筹划</a></li>
                        <li class="drop-li"><a href="javascript:void(0);" @click="alertMessage">手动标注</a></li>
                        <!-- <li class="drop-li"><a href="javascript:void(0);" @click="alertMessage">行动方案</a></li> -->
                        <!-- <li class="drop-li"><a href="javascript:void(0);" >火势图</a></li> -->
                        
                    </ul>
                </li>
                
            </ul>
            <ul  class="nav" style="margin-left:61%;" v-show="eventOne_flag">
                <li  class="nav-li fl"><a href='javascript:void(0);' id="tongdaobaozhang">通导保障</a>
                    <ul class="dorp-box">
                        <li class="drop-li"><a href="javascript:void(0);" @click="base_net_move_switch">网随人动</a></li>
                    </ul>
                </li>
                <li  class="nav-li fl" style="padding-top:5px"><a href='javascript:void(0);'>系统管理</a>
                    <ul class="dorp-box " >
                        <li class="drop-li drop-li-sec"><a href="#/manageEquip" target=_blank>设备库管理</a></li> 
                        <!-- <li class="drop-li drop-li-sec"><a href="javascript:void(0);"><router-link to="/manageEquip">设备库管理</router-link> </a></li> -->
                        <!-- <router-link to="/home">Home</router-link>  -->
                    </ul>
                </li>   
                <li  class="">            
                    <div class="pickerInput">
                        <input type="text" id="pickerInput" placeholder="地图搜索">  
                    </div>
                </li>      
            </ul>
            <div class="username">
                <span style="color:#ffffff;font-size:17px">
                    {{this.username}}
                </span>
            </div>
            <div class="user-avator">
                    <img src="https://iccs-file.oss-cn-beijing.aliyuncs.com/ICCS/logo.jpg" >
            </div>
        </div>
        
        <div id="container">
            <!-- <div class="sub-vue-1" v-if="subvue1_show">
                <subvue1 :AMap="AMap" :map="map"> </subvue1>
            </div> -->

            <div class="target-recog-global" v-if="targetRecogGlobal_show">
                <span style="color: #ffffff;">
                    {{ description }}
                </span>
            </div>
            <div class="target-recog-history" v-if="targetRecogHistory_show">
                <span style="color: #ffffff;">
                    {{ description }}
                </span>
            </div>

            <div class="d3_input-card3" v-show="d3_btn_show">
                <input id="d3_model_btn" type="button" class="d3_btn" value="展示模型" v-show="!d3_model_show" v-on:click="d3_showModel"/>
                <input id="d3_model_btn" type="button" class="d3_btn" value="小窗展示" v-show="d3_model_show" v-on:click="showd3frame"/>
                <input id="d3_model_btn" type="button" class="d3_btn" value="关闭模型"  v-show="d3_model_show" v-on:click="d3_closeModel"/>
                <!-- <input id="d3_model_btn" type="button" class="d3_btn" value="开始取点"  v-show="d3frame_show" v-on:click="d3_clickE"/> -->
                <input id="d3_model_btn" type="button" class="d3_btn" value="取点模式切换"  v-show="d3frame_show" v-on:click="d3_clickE"/>
                <el-slider v-model="d3light_intensity"  v-show="d3_model_show" :show-tooltip="false" :min="0" :max="1" :step="0.01" v-on:change="d3_render"></el-slider>


            </div>

            <div class="scheme-coop-small-goal" v-if="schemeCoopSmallGoal_show">
                <Scheme_coop_small_goal ref="scheme_coop_small_goal" :schemeCoopSmallGoal_show="schemeCoopSmallGoal_show">
                    
                </Scheme_coop_small_goal>
            </div>

            <div class="scheme-coop-fire" v-if="schemeCoopFire_show" style="">
                <Scheme_coop_fire ref="scheme_coop_fire" :schemeCoopFire_show="schemeCoopFire_show">
                    
                </Scheme_coop_fire>
            </div>

            <div class="scheme-edge-small-goal" v-if="schemeEdgeSmallGoal_show">
                <Scheme_edge_small_goal ref="scheme_edge_small_goal" :schemeEdgeSmallGoal_show="schemeEdgeSmallGoal_show">
                    
                </Scheme_edge_small_goal>
            </div>

            <div class="scheme-edge-fire" v-if="schemeEdgeFire_show">
                <Scheme_edge_fire ref="scheme_edge_fire" :schemeEdgeFire_show="schemeEdgeFire_show">
                    
                </Scheme_edge_fire>
            </div>
            
            <div class="bounce-frame-left">
                <BframeL1 :bframeL1_show="bframeL1_show">

                </BframeL1>
            </div>

            <div class="bounce-frame-left2">
                <BframeL2 :bframeL2_show="bframeL2_show"></BframeL2>
            </div>

            <div class="bounce-frame-left3">
                <BframeL3 :bframeL3_show="bframeL3_show" @addMarker="addMarker_zgs" @removeMarker="removeMarker_zgs" @setPosition="setMarkerPosition" :showBframeC2="showBframeC2"></BframeL3>
            </div>

            <div class="bounce-frame-center" >
                <!-- 弹窗类型1 center W:2/3 H:2/3 -->
                <BframeC1 :bframeC1_show="bframeC1_show" ref="BFrameC1" :AMap="AMap" :map="map">

                </BframeC1>
            </div>

            <div class="bounce-frame-center2" > 
                <!-- 弹窗类型1 center W:2/3 H:2/3 -->
                <BframeC2 :bframeC2_show="bframeC2_show" :showBframeC3="showBframeC3">

                </BframeC2>
            </div>

            <div class="bounce-frame-center3" >
                <BframeC3 :bframeC3_show="bframeC3_show">

                </BframeC3>
            </div>

            <div class="bounce-frame-right">
                <!-- 弹窗类型2 right W:1/3 H:2/3 -->
            </div>

            <div class="d3frame-class">
                <D3frame ref="d3frame"  
                
                :d3frame_show="d3frame_show" 
                :modelsrc="this.d3_model_src"
                :pSRT="this.d3_srt"
                :pModelrat="this.d3_srt['Euler']"
                :pCoords="this.Coords['MODEL']"
                v-if="d3frame_show" 
                >

                </D3frame>
            </div>
            <div class="d3frameData-class" >
                <D3frameData  v-if='d3fameData_show' ref="d3framedata" :d3fameData_show="d3fameData_show">
                </D3frameData>
            </div>

            <div class="bounce-frame-right-audio">
                <!-- 弹窗类型2 right W:1/3 H:2/3 -->
                <BframeRAudio :bframeRAudio_show="bframeRAudio_show" :AMap="AMap" :map="map">

                </BframeRAudio>
            </div>
            <div class="audio-noise-reduction">
                <AudioNoiseReduction :audioNoiseReduction_show="audioNoiseReduction_show" :AMap="AMap" :map="map">
                    
                </AudioNoiseReduction>
            </div>
            <div class="bounce-frame-right-img">
                <!-- 弹窗类型2 right W:1/3 H:2/3 -->
                <detectedImgVue :detectedImg_show="detectedImg_show" ref="detectedImgVue" :detectedImgUrl="detectedImgUrl" :AMap="AMap" :map="map" :srcList="imgSrcList" :markerId="selectedDetectedMarkerId">

                </detectedImgVue>
            </div>
            <div class="bounce-frame-global-target-recog" >
                <!-- 全局目标识别视频窗口 -->
                <Global_target_recog ref="global_target_recog_vue" :AMap="AMap" :map="map" :ifShowDialog="targetRecogGlobal_show" v-if="targetRecogGlobal_show">

                </Global_target_recog>
            </div>
            <div class="bounce-frame-history-target-recog" >
                <!-- 历史目标识别视频窗口 -->
                <History_target_recog ref="history_target_recog_vue" :AMap="AMap" :map="map" :ifShowDialog="targetRecogHistory_show" v-if="targetRecogHistory_show">

                </History_target_recog>
            </div>
            <div class="bounce-frame-right-video">
                <!-- 弹窗类型2 right W:1/3 H:2/3 -->
                <BframeRVideo :bframeRVideo_show="bframeRVideo_show" :AMap="AMap" :map="map">

                </BframeRVideo>
            </div>
            <div class="bounce-frame-base-controller">
                <Base_controller ref="base_controller" :AMap="AMap" :map="map">
                </Base_controller>
            </div>
            
            <div class="bounce-frame-base-stat">
                <Base_stat ref="base_stat" >
                </Base_stat>
            </div>
            <div class="bounce-frame-base-stat-sleep">
                <Base_stat_sleep ref="base_stat_sleep" >
                </Base_stat_sleep>
            </div>
            <div class="bounce-frame-base-info">
                <Base_info ref="base_info" >
                </Base_info>
            </div>
            
            <div class="bounce-frame-base-option">
                <Base_option ref="base_option" >
                </Base_option>
            </div>
            
            <div class="bounce-frame-base-scheme-list">
                <Base_scheme_list ref="base_scheme_list" >
                </Base_scheme_list>
            </div>

            <div class="bounce-frame-base-switch">
                <Base_switch ref="base_switch">
                </Base_switch>
            </div>
            <div class="bounce-frame-base-user-info">
                <Base_user_info ref="base_user_info">
                </Base_user_info>
            </div>
            <div class="bounce-frame-base-figure-1">
                <Base_figure_1 ref="base_figure_1">
                </Base_figure_1>
            </div>
            <div class="bounce-frame-base-figure-2">
                <Base_figure_2 ref="base_figure_2">
                </Base_figure_2>
            </div>
            <div class="bounce-frame-base-figure-zoom-in">
                <Base_figure_zoom_in ref="base_figure_zoom_in">
                </Base_figure_zoom_in>
            </div>
            <div class="bounce-frame-base-SNR-show">
                <Base_SNR_show ref="base_SNR_show">
                </Base_SNR_show>
            </div>
            <div class="bounce-frame-base-SNR-radio">
                <Base_SNR_radio ref="base_SNR_radio">
                </Base_SNR_radio>
            </div>
            <div class="bounce-frame-base-line-legend">
                <Base_line_legend ref="base_line_legend">
                </Base_line_legend>
            </div>
            <div class="bounce-frame-base-option-show">
                <Base_option_show ref="base_option_show">
                </Base_option_show>
            </div>
            <div class="bounce-frame-base-scene-radio">
                <Base_scene_radio ref="base_scene_radio">
                </Base_scene_radio>
            </div>
            <div class="bounce-frame-base-scene-args">
                <Base_scene_args ref="base_scene_args">
                </Base_scene_args>
            </div>
            <div class="bounce-frame-base-device-list">
                <Base_device_list ref="base_device_list">
                </Base_device_list>
            </div>
            <div class="bounce-frame-base-device-list-sleep">
                <Base_device_list_sleep ref="base_device_list_sleep">
                </Base_device_list_sleep>
            </div>
            <div class="bounce-frame-base-device-set">
                <Base_device_set ref="base_device_set">
                </Base_device_set>
            </div>
            <div class="bounce-frame-base-device-set-sleep">
                <Base_device_set_sleep ref="base_device_set_sleep">
                </Base_device_set_sleep>
            </div>
            <div class="cover-info" >
                <div class="input-item">
                    <label for="cover_person">
                        <input type="radio" name=""  id="cover_person" v-on:click="showCoverClickTimer($event)"><span class="input-text">人员</span> 
                    </label>
                    <!-- <input type="radio" name="" value="cover_person"><span class="input-text">人员</span>  -->
                    <label for="cover_vehicle">
                        <input type="radio" name=""  id="cover_equip"  v-on:click="showCoverClickTimer($event)"><span class="input-text">设备</span> 
                    </label>
                    <!-- <label for="cover_aircraft">
                        <input type="radio" name="" value="cover_aircraft" id="cover_aircraft" v-on:click="showCoverClick($event)"><span class="input-text" style="width: 5rem;">飞行器</span>
                    </label> -->
                    
                </div>
                <div class="input-item">
                    <label for="cover_fire_point">
                        <input type="radio" name="" id="cover_fire_point" v-on:click="showCoverClick($event)"><span class="input-text">火点</span> 
                    </label>
                    <label for="cover_fire_line">
                        <input type="radio" name="" id="cover_fire_line" v-on:click="showCoverClick($event)"><span class="input-text">火线</span> 
                    </label>
                    <!-- <label for="cover_fire_heatmap">
                        <input type="radio" name="" id="cover_fire_heatmap" v-on:click="showCoverClick($event)"><span class="input-text">热力图</span> 
                    </label> -->
                    
                </div>
            </div>
            <div class="weather" v-show="weather_info.weatherShow">
                <span>位置:  {{weather_info.city}}</span>
                <span>天气:  {{weather_info.weather}}     温度:  {{weather_info.temperature}} °C</span>
                <span>风向:  {{weather_info.windDirection}}   {{weather_info.windPower}}级</span>
                <span>湿度:  {{weather_info.humidity}}</span>
            </div>
            <div class="input-card" style="width: 11rem;" v-show="mouseToolMeasure_show">
                <div class="input-item">
                    <input type="radio" name='func' value='rule'><span class="input-text">距离测量</span>
                    <input type="radio" name='func' value='measureArea'><span class="input-text">面积测量</span>
                </div>
                <div class="input-item">
                    <input id="close" type="button" class="btn" value="清除并退出" v-on:click="exitMouseToolClear"/>
                    <input id="close" type="button" class="btn" value="保留后退出" v-on:click="exitMouseToolReserve"/>
                </div>
            </div>  
            <div class="input-card1" style="width: 15rem;" v-show="mouseToolLabel_show">
                <div class="input-item">
                    <input type="radio" name='func1' value='marker'><span class="input-text">画点</span>
                    <input type="radio" name='func1' value='polyline'><span class="input-text">画折线</span>
                    <input type="radio" name='func1' value='polygon'><span class="input-text" style="width:5rem;">画多边形</span>
                </div>
                <div class="input-item">
                    <input type="radio" name='func1' value='rectangle'><span class="input-text">画矩形</span>
                    <input type="radio" name='func1' value='circle'><span class="input-text">画圆</span>
                </div>
                <div class="input-item">
                    <input id="clear" type="button" class="btn" value="清除" v-on:click="MouseToolLabelClear"/>
                    <input id="close" type="button" class="btn" value="清除并关闭" v-on:click="exitMouseToolLabelClear"/>
                    <input id="close" type="button" class="btn" value="保留并关闭" v-on:click="exitMouseToolLabelReserve"/>
                </div>
            </div>
            <div class="input-card2" style="width: 15rem;" v-if="positionPicker_show">
                <div>
                    <div class='title'>选择模式</div>
                    <input type='radio' name='mode' style="padding-left:15px;" value='dragMap' checked>拖拽地图模式
                    <br>
                    <input type='radio' name='mode' style="padding-left:15px" value='dragMarker'>拖拽Marker模式
                </div>
                <div>
                    <!-- <button id='start'>开始选点</button>
                    <button id='stop'>关闭选点</button> -->
                    <input id="start" type="button" class="btn1" style="margin-bottom:5px;margin-top: 5px;" value="开始选点" />
                    <input id="stop" type="button" class="btn1" style="margin-bottom:5px;margin-top: 5px;" value="关闭选点" />
                </div>
                <div>
                    <div class='title'>选址结果</div>
                    <div class='c'>经纬度:</div>
                    <div id='lnglat'></div>
                    <div class='c'>地址:</div>
                    <div id='address'></div>
                    <div class='c'>最近的路口:</div>
                    <div id='nearestJunction'></div>
                    <div class='c'>最近的路:</div>
                    <div id='nearestRoad'></div>
                    <div class='c'>最近的POI:</div>
                    <div id='nearestPOI'></div>
                </div>
            </div>
            <div class="redirection-button-area">
                <img src="/src/images/Scene/reset.png" style="width:70%;height: 70%;object-fit: cover;padding-top: 4px;" @click="resetPosition()" alt="">
            </div>
            <div class="edit-fireLine-area" v-if="showFilelineEditiorMenu">
                <el-button-group>
                    <el-button type="info" :disabled="chooseCreate" icon="el-icon-circle-plus-outline" @click="createPolyline()">新建火线</el-button>
                    <!-- <el-button type="info" icon="el-icon-circle-plus-outline" @click="initPolyline()">新建火线</el-button> -->
                    <el-button type="primary" :disabled="chooseEdit" icon="el-icon-edit" @click="editPolyline()">编辑火线</el-button>
                    <!-- <el-button type="primary" icon="el-icon-edit" @click="createPolyline()">编辑火线</el-button> -->
                    <el-button type="warning" icon="el-icon-delete" @click="savePolyEditor()">暂存编辑</el-button>
                    <el-button type="success" icon="el-icon-success" @click="saveAndExitPolyEditor()">保存退出</el-button>
                    <!-- <el-button type="danger" icon="el-icon-delete" >删除火线</el-button> -->
                </el-button-group>
            </div>
            <!-- 页面底部的按钮 -->
            <div v-if=isShow>
                <el-button class="footer-unfold" type="primary" block @click="ShowInformation" >展开信息 ⬆</el-button>
            </div>
            <!-- 页面展开后 -->
            <div v-if=!isShow class="footer-fold">
                <el-button type="primary" block @click="ShowInformation">收起信息 ⬇</el-button>

                <table  border="1" cellspacing="0"
                cellpadding="0" width=100% class="table_information">
                    <thead height=100vh>
                        <tr color=red>
                         <th>模型名称</th>
                         <th>开发板ip</th>
                         <th>运行状态</th>
                         <th>更新时间</th>
                         <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr height="45vh">
                            <td>云端模型</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <el-button type="primary" block @click="ShowInformation">修改</el-button>
                            </td>
                        </tr>
                        <tr height="45vh">
                            <td>云边联动模型</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <el-button type="primary" block @click="ShowInformation">修改</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
    

</template>


<!-- <script src="//webapi.amap.com/ui/1.1/main.js?v=1.1.1"></script> -->
<script type="text/javascript">
import AMapLoader from '@amap/amap-jsapi-loader';
// import subvue1 from './subvue1';
import BframeC1 from './bframeC1';
import BframeC2 from './bframeC2';
import BframeC3 from './bframeC3';
import BframeL1 from './bframeL1';
import BframeL2 from './bframeL2';
import BframeL3 from './bframeL3';
import BframeRAudio from './bframeRAudio';
import AudioNoiseReduction from './audio_noise_reduction';
import BframeRVideo from './bframeRVideo';
import detectedImgVue from './detectedImg';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import D3frame from './d3frame.vue';
import D3frameData from './d3frameData.vue';
import Base_controller from './base_controller.vue';
import Base_stat from './base_stat.vue';
import Base_stat_sleep from './base_stat_sleep.vue';
import Base_info from './base_info.vue';
import Base_option from './base_option.vue';
import Base_scheme_list from './base_scheme_list.vue';
import Base_switch from './base_switch.vue';
import Base_user_info from './base_user_info.vue';
import Base_figure_1 from './base_figure.vue';
import Base_figure_2 from './base_figure.vue';
import Base_figure_zoom_in from './base_figure_zoom_in.vue';
import Scheme_coop_small_goal from './scheme_coop_small_goal';
import Scheme_coop_fire from './scheme_coop_fire';
import Scheme_edge_small_goal from './scheme_edge_small_goal';
import Scheme_edge_fire from './scheme_edge_fire';
import Global_target_recog from './global_target_recog'
import History_target_recog from './history_target_recog';
import Base_SNR_show from './base_SNR_show.vue';
import Base_SNR_radio from './base_SNR_radio.vue';
import Base_line_legend from './base_line_legend.vue';
import Base_option_show from './base_option_show.vue';
import Base_scene_radio from './base_scene_radio.vue';
import Base_scene_args from './base_scene_args.vue';
import Base_device_list from './base_device_list.vue';
import Base_device_list_sleep from './base_device_list_sleep.vue';
import Base_device_set from './base_device_set.vue';
import Base_device_set_sleep from './base_device_set_sleep.vue';
// import detectedImgVue from './detectedImg.vue';



// import AMapUI from 'AMapUI';
    window._AMapSecurityConfig = {
        securityJsCode:'469c87f75e05e016cd4b5884f43f622f',
    }
  //  import AMapLoader from '@amap/amap-jsapi-loader'; //引入
   export default {
    components: {  BframeC1,BframeC2,BframeC3,BframeL1,BframeL2,BframeL3,BframeRAudio,BframeRVideo,D3frame,D3frameData,detectedImgVue
        ,Base_controller,Base_stat,Base_stat_sleep,Base_info,Base_option,Base_scheme_list,Base_switch,Base_user_info,Base_figure_1,Base_figure_2,Base_figure_zoom_in,Base_SNR_show,Base_SNR_radio,Base_line_legend,Base_option_show,Base_scene_radio,Base_scene_args,Base_device_list,Base_device_list_sleep,Base_device_set,Base_device_set_sleep,
        Scheme_coop_small_goal,Scheme_coop_fire, Scheme_edge_small_goal, Scheme_edge_fire,Global_target_recog,History_target_recog,AudioNoiseReduction
    },
    name: "gaode",
    data() {
       return {
            username:"admin",
            // geocoder:null,
            description:"",
            selectedMarkerType:null,
            markersmenu_show:true,
            map:null,
            AMap:null,
            AMapUI:null,
            weather_obj:null,
            weather_info:{
                weatherShow:false,
                LngLatX:116.364594,
                LngLatY:39.96725,
                humidity:null,
                city:null,
                weather:null,
                temperature:null,
                windDirection:null,
                windPower:null,
            },
            positionPicker_show:false,
            positionPicker_obj:null,
            mouseToolMeasure_show:false,
            mouseToolLabel_show:false,
            mouseToolMeasure_obj:null,
            mouseToolLabel_obj:null,
            mouseToolLabelOverlays:[],
            mouseTool:null,
            map_type:null,
            infoWindow:null,
            isShow:true,
            // 本地dev时请使用该路径
            icons_marker:[
                {type:'xiaofangche',imgURL:"./src/images/Scene/xiaofangche.png"},
                {type:'jiuhuche',imgURL:"/src/images/Scene/jiuhuche.png"},
                {type:'zhishengji',imgURL:"/src/images/Scene/zhishengji.png"},
                {type:'wurenji1',imgURL:"/src/images/Scene/wurenji1.png"},
                {type:'zhihuisuo1',imgURL:"/src/images/Scene/zhihuisuo1.png"},
                {type:'huomiao',imgURL:"/src/images/Scene/huomiao.png"},
                {type:'jiantou',imgURL:"/src/images/Scene/jiantou.png"},
                {type:'yihurenyuan',imgURL:"/src/images/Scene/yihurenyuan.png"},
                {type:'shoukunrenyuan',imgURL:"/src/images/Scene/shoukunrenyuan.png"},
                {type:'xiaofangyuan',imgURL:"/src/images/Scene/xiaofangyuan.png"},
            ],

            device_markers:[
                // {type:'xiaofangche',covers:[],remain:0},
                // {type:'jiuhuche',covers:[],remain:0},
                // {type:'zhishengji',covers:[],remain:0},
                // {type:'wurenji1',covers:[],remain:0},
                // {type:'zhihuisuo1',covers:[],remain:0},
                // {type:'huomiao',covers:[],remain:null},
                // {type:'jiantou',covers:[],remain:null},
                // {type:'yihurenyuan',covers:[],remain:0},
                // {type:'shoukunrenyuan',covers:[],remain:null},
                // {type:'xiaofangyuan',covers:[],remain:0},
                // {type:'xiaofangche',position:[116.364594,39.96725],info:'消防车1',marker:null},
                // {type:'xiaofangche',position:[116.364594,39.96725],info:'消防车2',marker:null},
                // {type:'zhihuisuo1',position:[116.364594,39.96725],info:'机动指挥所',marker:null},
            ],
            heatmap_obj:null,
            heatmap_show:false,
            myheatmapData:[
                // + 0.469032  + 0.397491
                {lng: 115.377891 + 0.469032, lat: 39.51986 + 0.397491, count: 20},
                {lng: 115.385127 + 0.469032, lat: 39.522384 + 0.397491, count: 30},
                {lng: 115.388264 + 0.469032, lat: 39.526154 + 0.397491, count: 20},
                {lng: 115.388971 + 0.469032, lat: 39.531708 + 0.397491, count: 50},
                {lng: 115.386579 + 0.469032, lat: 39.538262 + 0.397491, count: 80},
                {lng: 115.371748 + 0.469032, lat: 39.518095 + 0.397491, count: 100},
                {lng: 115.376966 + 0.469032, lat: 39.533754 + 0.397491, count: 60},
                {lng: 115.379306 + 0.469032, lat: 39.529792 + 0.397491, count: 70},
                {lng: 115.369379 + 0.469032, lat: 39.535356 + 0.397491, count: 100},
                {lng: 115.376449 + 0.469032, lat: 39.528949 + 0.397491, count: 90},
                {lng: 115.363786 + 0.469032, lat: 39.531153 + 0.397491, count: 50},
                {lng: 115.365581 + 0.469032, lat: 39.525528 + 0.397491, count: 40},
                {lng: 115.367984 + 0.469032, lat: 39.522008 + 0.397491, count: 70},
                {lng: 115.372114 + 0.469032, lat: 39.521586 + 0.397491, count: 80},
                {lng: 115.381382 + 0.469032, lat: 39.52301 + 0.397491, count: 100},
                {lng: 115.36581 + 0.469032, lat: 39.521272 + 0.397491, count: 100},
                {lng: 115.369851 + 0.469032, lat: 39.526736 + 0.397491, count: 80},
                {lng: 115.369393 + 0.469032, lat: 39.529267 + 0.397491, count: 100},
            ],
            fire_points:[
                // 115.836331,39.916785 
                // 115.848233,39.918195
                // 
                // 
                // 
                {id:'fire_point_1',longitude:115.830369,latitude:39.924239,isDetected:false,imgUrl:null,marker:null},
                {id:'fire_point_2',longitude:115.836353,latitude:39.916611,isDetected:false,imgUrl:null,marker:null},
                {id:'fire_point_3',longitude:115.848231,latitude:39.918067,isDetected:false,imgUrl:null,marker:null},
                {id:'fire_point_4',longitude:115.861395,latitude:39.93131,isDetected:false,imgUrl:null,marker:null},
                {id:'fire_point_5',longitude:115.844524,latitude:39.941316,isDetected:false,imgUrl:null,marker:null},
            ],
            situation_show:false,
            device_show:false,
            eventOne_flag:true,
            eventTwo_flag:false,
            eventThr_flag:false,
            eventFour_flag:false,
            subvue1_show:true,
            bframeC1_show:false,
            bframeC2_show:false,
            bframeC3_show:false,
            bframeR1_show:false,
            bframeL1_show:false,
            bframeL2_show:false,
            bframeL3_show:false,
            bframeRAudio_show:false,
            bframeRVideo_show:false,
            audioNoiseReduction_show:false,
            users_show:false,
            comSit_show:false,
            markers:[
                // {id;'设备的id',marker:设备在地图上的的marker,status:在地图上是否锁定(已锁定，已解锁), info:设备备注信息,type:设备种类,model:型号}
            ],
            cover_info_show:false,
            fire_markers:[],
            person_markers:[],
            vehicle_markers:[],
            aircraft_markers:[],
            // 手动标注添加到左上角标注栏的对象类型
            selectedLabelTypeObjectList:[
            ],
            iconImgUrl:null,
            theClickMarkerNow:null,
            fireLinePointMarkers:[
                // {fireLineId:"",fireLinePointsMarkers:[]}, 已舍弃 ，直接存所有marker
            ],
            polylines:[
                // {fireLineId:"",polyLine:null},
            ],
            polyEditor:null,
            allFireLinePaths:[],
            allPolylines:null,
            newPolyline:null,
            // SavePolyEditor前是 新建火线 还是 编辑火线 这两种方式下执行的保存编辑功能不同
            beforeSavePolyEditor:null,
            chooseCreate:false,
            chooseEdit:false,
            showFilelineEditiorMenu:false,
            detectedPerson_markers:[],
            detectedVehicle_markers:[],
            // 全局目标识别出来的对象，单独存放
            globalDetectedMarkers:[],

            detectedFire_markers:[],
            iconRipple_markers:[],
            detectedImgUrl:null,
            detectedImg_show:false,
            imgSrcList:[],
            autoCloseInfoWindowTimer:null,
            autoCloseInfoWindowTime:0,
            schemeCoopFire_show:false,
            schemeCoopSmallGoal_show:false,
            schemeEdgeSmallGoal_show:false,
            schemeEdgeFire_show:false,
            screenWidth: document.documentElement.clientWidth,  //视窗部分宽度
			fullHeight: document.documentElement.clientHeight,//视窗部分高度 即<html>高度
            showCovPeople: false,
            covPeopleInterval: null,
            showCovEquip: false,
            covEquipInterval: null,
            showCovFirePoint: false,
            showCovFireLine: false,
            selectedDetectedMarkerId:null,
            targetRecogGlobal_show:false,
            targetRecogHistory_show:false,

            //
            d3_btn_show:false,
            d3_model_show:false,
            d3_gllayer:null,
            d3_camera:null,
            d3_renderer:null,
            d3_model_src:"/src/images/Scene/Duck.gltf",
            d3frame_click_event:false,
            d3frame_show:false,
            d3fameData_show:false,
            d3light_intensity:0.5,
            d3_srt:null,
            Coords:null,

        
            geocoder:null,
            

            planLoadId2Marker: new Map(),

        }
    },
    methods: {
      initMap() {
        AMapLoader.load({
            key:"47fa34c25cbfdd6f85544eb3107738f1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.AutoComplete','AMap.PlaceSearch','AMap.ToolBar','AMap.Scale',
                'AMap.HawkEye','AMap.MapType','AMap.Geolocation','AMap.Weather','AMap.MouseTool',
                'AMap.HeatMap','AMap.ControlBar','AMap.Geocoder','AMap.InfoWindow','AMap.PolylineEditor'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            AMapUI: {
                // 是否加载 AMapUI，缺省不加载
                version: "1.1", // AMapUI 缺省 1.1
                plugins: [], // 需要加载的 AMapUI ui插件
            },
            Loca:{                // 是否加载 Loca， 缺省不加载
                version: '2.0.0'  // Loca 版本
            },
        }).then((AMap)=>{
            // console.log(AMapUI)
            let that=this;
            this.AMapUI=AMapUI;
            this.AMap=AMap;
            this.infoWindow=new AMap.InfoWindow({offset: new AMap.Pixel(0, 0)});
            // console.log(this.AMap);

            // console.log(AMap)
            this.map = new AMap.Map("container",{  //设置地图容器id
                viewMode:"3D",    //是否为3D地图模式
                zoom:14,           //初始化地图级别
                // center:[116.364594,39.96725], //初始化地图中心点位置
                // center:[115.375903,39.527503], //初始化地图中心点位置
                center:[115.826239,39.92492], 
                // center:[116.3575,39.961657], 
                pitch:45,
                keyboardEnable:false,
                zooms:[1,16],//扩大到刚好能显示
            });
            var controlBar = new AMap.ControlBar({
                position:{
                right:'105px',
                bottom:'10px'
                },
                showZoomBar:true,
                showControlButton:true,
            });
            controlBar.addTo(this.map);
            this.geocoder = new AMap.Geocoder();
            var auto = new AMap.AutoComplete({
                input: "pickerInput"
            });
            var polylineEditorOptions={
                createOptions:{
                    borderWeight: 10, // 线条宽度，默认为 1
                    strokeColor: 'red', // 线条颜色
                    lineJoin: 'round' ,// 折线拐点连接处样式
                    isOutline: true,
                    outlineColor: '#ffeeff',
                    borderWeight: 2,
                    // strokeColor: "#3366FF",
                    strokeOpacity: 0.5,
                    strokeWeight: 6,
                    // 折线样式还支持 'dashed'
                    strokeStyle: "dashed",
                    // strokeStyle是dashed时有效
                    strokeDasharray: [15, 5],
                    // lineJoin: 'round',
                    lineCap: 'round',
                    zIndex: 50,
                }
            };
            var polyEditor = new AMap.PolylineEditor(this.map, null,polylineEditorOptions);
            // console.log(polyEditor);
            this.polyEditor=polyEditor;
            this.polyEditor.on('add',function(data){
                // console.log("触发了PolylineEditor的add事件，新增的polyline：")
                // console.log(data.target.$x);
                that.newPolyline=data.target;
            });
            this.polyEditor.on('end',function(data){
                // console.log("执行polyEditor.close()触发了PolylineEditor的end事件，返回的polyline:")
                // console.log(data.target.$x);
                that.newPolyline=data.target;
            });
            this.polyEditor.on('addnode',function(data){
                // console.log("触发了PolylineEditor的addnode事件，返回的polyline:")
                // console.log(data.target.$x);
                that.newPolyline=data.target;
            });
            this.polyEditor.on('adjust',function(data){
                // console.log("触发了PolylineEditor的adjust事件，返回的polyline:")
                // console.log(data.target.$x);
                that.newPolyline=data.target;
            });
            this.polyEditor.on('removenode',function(data){
                // console.log("触发了PolylineEditor的removenode事件，返回的polyline:")
                // console.log(data.target.$x);
                that.newPolyline=data.target;
            });

            var placeSearch = new AMap.PlaceSearch({
                map: this.map
            });  //构造地点查询类
            auto.on("select", select);//注册监听，当选中某条记录时会触发
            function select(e) {
                // console.log("111");
                placeSearch.setCity(e.poi.adcode);
                placeSearch.search(e.poi.name);  //关键字查询查询
            }
            this.map_type=new AMap.MapType({defaultType:1,showTraffic:false,showRoad:false});
            this.map.addControl(this.map_type);
            document.getElementsByClassName('amap-ctrl-list-layer')[0].style.visibility = 'hidden'
            this.map.addControl(new AMap.ToolBar());
            this.map.addControl(new AMap.Scale());
            // this.map.addControl(new AMap.HawkEye({isOpen:true}));
            // this.map.addControl(new AMap.MapType());
            // this.map.addControl(this.mapType);
            // this.map.removeControl(this.mapType);
            this.weather_obj = new AMap.Weather();
            this.mouseToolMeasure_obj = new AMap.MouseTool(this.map); 
            this.mouseToolLabel_obj = new AMap.MouseTool(this.map); 
            //热力图
            var heatmapOpts = {
                //3d 相关的参数
                '3d': {
                    //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
                    heightBezier: [0.4, 0.2, 0.4, 0.8],
                    //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
                    gridSize: 2,
                    heightScale: 1
                }
            };

            //初始化heatmap对象
            //不再维护，请使用 LOCA 热力图
            this.heatmap_obj = new AMap.HeatMap(this.map, heatmapOpts);
            // console.log(heatmapData)
             
            // heatmap.setDataSet({
            //     // data: heatmapData,
            //     data:this.myheatmapData,
            //     max: 100
            // });
            // this.clickOn();
        }).catch(e=>{
            console.log(e);
        })
        // AMapUI.load()
      },
      initNav(){
        // let that=this
        // window.onload=function()  {    
            // that.initMap();    
            var oBtn=document.querySelectorAll(".nav-li"); //获取一级菜单元素
            oBtn.forEach(e => {
                e.onmouseover=function(){
            // this.style.display="none";
                    if(!this.querySelector('.dorp-box')){
                        
                    }
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
            oBtn=document.querySelectorAll(".drop-li-sec"); //获取二级菜单元素
            // console.log(oBtn.length)
            oBtn.forEach(e => {
                e.onmouseover=function(){
            // this.style.display="none";
                    if(!this.querySelector('.dorp-box-sec')){
                        return
                    }
                    this.querySelector('.dorp-box-sec').style.display="block"
                    //给二级菜单添加阴影
                    this.querySelector('.dorp-box-sec').style.boxShadow=" 0 2px 2px gray"
                    }
                    //鼠标出
                e.onmouseout=function(){
                    if(!this.querySelector('.dorp-box-sec')){
                        return
                    }
                    this.querySelector('.dorp-box-sec').style.display="none"
                    this.querySelector('.dorp-box-sec').style.boxShadow='none'
                }
            });

            // var nav=document.querySelector(".nav");
            // nav.onmouseover=function(){
            //     nav.style.background ="rgb(23, 26, 32,0.4)"
            //     nav.style.color="rgb(255,255,255)"
            // }
            // nav.onmouseout=function(){
            //     nav.style.background ="rgb(23, 26, 32,0)"
            //     nav.style.color="rgb(0,0,0)"
            // }
        // }

        // document.getElementById('eventOne').style.color='red';
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
      resetPosition(){
        this.map.setCenter([115.826239,39.92492]);
      },
      addMarker(LngLatX,LagLatY){ 
        var icon= new this.AMap.Icon({
            // 图标尺寸
            // size: new this.AMap.Size(46, 28),
            size: new this.AMap.Size(width,height),
            // 图标的取图地址
            image: imgUrl,
            // 图标所用图片大小
            imageSize: new this.AMap.Size(width, height),
        });
      },
      addIconDetectedObject(imgType,position,width,height,id,type,objType,angle,detectedImgPathOnOSS){
        console.log("调用gaodeMap addIcon")
        console.log(imgType+" "+position+" "+width+" "+height+" "+id+" "+type+" "+objType+" "+detectedImgPathOnOSS+" "+detectedImgPathOnOSS);
        // type为 "car person fire " 为算法识别的对象类型  objType 为"人员_目标检测所得，车辆_目标检测所得，火点_目标检测所得，用来标记marker弹窗的标题""
        if(!angle){
            angle=0;
        }
        var extData={};
        extData={};
        extData["id"]=id;
        extData["type"]=type;
        extData["objType"]=objType;
        extData["detectedImgPathOnOSS"]=detectedImgPathOnOSS;

        var icon= new this.AMap.Icon({
            // 图标尺寸
            // size: new this.AMap.Size(46, 28),
            size: new this.AMap.Size(width,height),
            // 图标的取图地址
            image: imgType,
            // 图标所用图片大小
            imageSize: new this.AMap.Size(width, height),
        });
        var marker = new this.AMap.Marker({
        // position: [116.358104,39.961554],
            position:position,
            icon: icon,
            draggable:true,
            angle:angle,
            // anchor: 'top-center', //设置锚点
            anchor: 'center',
            offset: new this.AMap.Pixel(0,0), //设置偏移量
            // anchor: 'center',
            // label: {
            //     direction: 'top',
            //     content: info,
            //     offset: labelOffset,
            // },
            // height:1000,
            zooms:[13,19],
            extData:extData,
        });
        console.log(marker);
        marker.on('mouseover',this.markerClick);
        marker.setDraggable(false);
        // console.log(objType);
        if(objType=='人员_目标检测所得'){
            this.detectedPerson_markers.push(marker);
            this.map.add(marker);
            return ;
        }else if(objType=='车辆_目标检测所得'){
            this.detectedVehicle_markers.push(marker);
            console.log("111");
            this.map.add(marker);
            return ;
        }else if(objType=='火点_目标检测所得'){
            this.detectedFire_markers.push(marker);
            this.map.add(marker);
            return ;
        }
        console.log("addIcon结束")
      },
      addGlobalIconDetectedObject(imgType,position,width,height,id,type,objType,angle,detectedImgPathOnOSS){
        // console.log("调用gaodeMap addIcon")
        // console.log(imgType+" "+position+" "+width+" "+height+" "+id+" "+type+" "+objType+" "+detectedImgPathOnOSS+" "+detectedImgPathOnOSS);
        // type为 "car person fire " 为算法识别的对象类型  objType 为"人员_目标检测所得，车辆_目标检测所得，火点_目标检测所得，用来标记marker弹窗的标题""
        if(!angle){
            angle=0;
        }
        var extData={};
        extData={};
        extData["id"]=id;
        extData["type"]=type;
        extData["objType"]=objType;
        extData["detectedImgPathOnOSS"]=detectedImgPathOnOSS;

        var icon= new this.AMap.Icon({
            // 图标尺寸
            // size: new this.AMap.Size(46, 28),
            size: new this.AMap.Size(width,height),
            // 图标的取图地址
            image: imgType,
            // 图标所用图片大小
            imageSize: new this.AMap.Size(width, height),
        });
        var marker = new this.AMap.Marker({
        // position: [116.358104,39.961554],
            position:position,
            icon: icon,
            draggable:true,
            angle:angle,
            // anchor: 'top-center', //设置锚点
            anchor: 'center',
            offset: new this.AMap.Pixel(0,0), //设置偏移量
            // anchor: 'center',
            // label: {
            //     direction: 'top',
            //     content: info,
            //     offset: labelOffset,
            // },
            // height:1000,
            zooms:[13,19],
            extData:extData,
        });
        console.log(marker);
        marker.on('mouseover',this.markerClick);
        marker.setDraggable(false);
        // console.log(objType);
        if(objType=='人员_目标检测所得'){
            this.globalDetectedMarkers.push(marker);
            this.map.add(marker);
            return ;
        }else if(objType=='车辆_目标检测所得'){
            this.globalDetectedMarkers.push(marker);
            // console.log("111");
            this.map.add(marker);
            return ;
        }else if(objType=='火点_目标检测所得'){
            this.globalDetectedMarkers.push(marker);
            this.map.add(marker);
            return ;
        }
        // console.log("addIcon结束")
      },
      removeAllGlobalDetectedObject(){
        this.globalDetectedMarkers.forEach(marker=>{
            this.map.remove(marker);
        })
        this.globalDetectedMarkers=[];
        this.removeAllRippleMarkers();
      },
      addIcon(imgType,position,width,height,info,id,status,type,model,objType,angle){
        // ###########################################  如果只是单纯在地图上打marker，劝你重写一个addIcon,这堆屎山，千万别动###################

        // type 为小类型如："无人机"  "消防车" "消防员",objType为所属大类型 person/equip/fire
        //根据接口拿到的数据，根据imgType从icons_marker中拿到图片地址并创建一个icon对象，渲染到地图，向device_markers添加对应marker
        // var imgUrl=null;
        if(!angle){
            angle=0;
        }
        var index=0;
        for(var i=0;i<this.device_markers.length;i++){
            // console.log(this.selectedMarkerType+" "+this.device_markers[i].type)
            // console.log(type+" "+this.device_markers[i].type)

            if(type == this.device_markers[i].type){
                // imgUrl=this.icons_marker[i].imgURL;
                index=i;
                break;
            }
        }
        // console.log(index);
        var icon= new this.AMap.Icon({
            // 图标尺寸
            // size: new this.AMap.Size(46, 28),
            size: new this.AMap.Size(width,height),
            // 图标的取图地址
            image: imgType,
            // 图标所用图片大小
            imageSize: new this.AMap.Size(width, height),
        });
        
        // 将 Icon 传入 marker
       
            var marker = new this.AMap.Marker({
            // position: [116.358104,39.961554],
                position:position,
                icon: icon,
                draggable:true,
                angle:angle,
                // anchor: 'top-center', //设置锚点
                anchor: 'center',
                offset: new this.AMap.Pixel(0,0), //设置偏移量
                // anchor: 'center',
                // label: {
                //     direction: 'top',
                //     content: info,
                //     offset: labelOffset,
                // },
                // height:1000,
                zooms:[13,19],
                extData:null,
            });
            
            // console.log(marker);
    
        
        // marker.on('click', this.markerClick);
        if(type!="火线火点"){
            marker.on('mouseover',this.markerClick);
        }
        // marker.on('mouseover',this.markerClick);

        // marker.on('mouseout',this.closeInfoWindow);
        // marker.on('click',this.markerClick);
        // console.log(marker);
        marker.setDraggable(false);
        
        var device={};
        device["id"]=id;
        device["marker"]=marker;
        device["status"]='锁定';
        device["info"]=info;
        device["type"]=type;
        device["model"]=model;
        device["objType"]=objType;
        // if(objType=='人员_目标检测所得'){
        //     this.detectedPerson_markers.push(device);
        //     this.map.add(marker);
        //     return ;
        // }else if(objType=='车辆_目标检测所得'){
        //     this.detectedVehicle_markers.push(device);
        //     this.map.add(marker);
        //     return ;
        // }

        if(type=="火线火点"){
            // var i=0;
            // for(i=0;i<this.fireLinePointMarkers.length;i++){
            //     if( id == this.fireLinePointMarkers[i].fireLineId ){
            //         // imgUrl=this.icons_marker[i].imgURL;
            //         this.fireLinePointMarkers[i].fireLinePointsMarkers.push(marker);
            //     }
            // }
            // if(i==this.fireLinePointMarkers.length){
            //     var newFireLineObj={}
            //     newFireLineObj["fireLineId"]=id;
            //     newFireLineObj["fireLinePointsMarkers"]=[];
            //     newFireLineObj["fireLinePointsMarkers"].push(marker);
            //     this.fireLinePointMarkers.push(newFireLineObj);
            // }
            this.fireLinePointMarkers.push(marker);
        }else{
            this.device_markers[index].covers.push(device);
        }

        // this.device_markers[index].covers.push(device);

        
        this.map.add(marker);
        // this.setContenteditable();
      }, 
      addIconReturnMarker(imgType,position,width,height,info,id,status,type,model){
        var imgUrl=null;
        var index=0;
        for(var i=0;i<this.icons_marker.length;i++){
            if(imgType == this.icons_marker[i].type){
                imgUrl=this.icons_marker[i].imgURL;
                index=i;
                break;
            }
        }
        var icon= new this.AMap.Icon({
            size: new this.AMap.Size(width,height),
            image: imgUrl,
            imageSize: new this.AMap.Size(width, height),
        }); 
        var marker = new this.AMap.Marker({
            position:position,
            icon: icon,
            draggable:true,
            anchor: 'top-center', //设置锚点
            offset: new this.AMap.Pixel(0,0), //设置偏移量
            zooms:[13,19],
        });
        marker.on('mouseover',this.markerClick);
        marker.setDraggable(false);
        
        var device={};
        device["id"]=id;
        device["marker"]=marker;
        device["status"]='锁定';
        device["info"]=info;
        device["type"]=type;
        device["model"]=model;
        this.device_markers[index].covers.push(device);
        this.map.add(marker);
        return marker;
      },
      addIconRipple(position){
        var icon= new this.AMap.Icon({
            // 图标尺寸
            // size: new this.AMap.Size(46, 28),
            size: new this.AMap.Size(60,60),
            // 图标的取图地址
            image: "/src/images/Scene/ripple.gif",
            // 图标所用图片大小
            imageSize: new this.AMap.Size(60, 60),
        });
        
        // 将 Icon 传入 marker
       
        var marker = new this.AMap.Marker({
        // position: [116.358104,39.961554],
            position:position,
            icon: icon,
            draggable:true,
            angle:0,
            // anchor: 'top-center', //设置锚点
            anchor: 'center',
            offset: new this.AMap.Pixel(0,0), //设置偏移量
            // anchor: 'center',
            // label: {
            //     direction: 'top',
            //     content: info,
            //     offset: labelOffset,
            // },
            // height:1000,
            zooms:[13,19],
            extData:null,
        });
        this.iconRipple_markers.push(marker);
        this.map.add(marker);
      },
      markerClick(e){
    

        // 处理定时器
        if(this.autoCloseInfoWindowTime==0){
            this.autoCloseInfoWindowTime=3;
            this.InfoWindowTimeDown();
        }else{
            this.autoCloseInfoWindowTime=3;
        }
        
        var index=-1;
        // for(var i =0;i<this.markers.length;i++){
        //     if(this.markers[i].marker==e.target){
        //         index=i;
        //         break;
        //     }
        // }
        var personOrVehicleMarker=e.target.getExtData();
        console.log(personOrVehicleMarker);
        // return ;
        var cover={};
        var detectedImgPathOnOSS=null;
        if(personOrVehicleMarker){
            cover['id']=personOrVehicleMarker["id"];
            cover['model']=personOrVehicleMarker["type"];
            cover['info']='目标检测所得';
            cover['type']=personOrVehicleMarker["objType"];
            detectedImgPathOnOSS=personOrVehicleMarker["detectedImgPathOnOSS"];
            // this.selectedDetectedMarker
        }else{
            for(var i=0;i<this.device_markers.length;i++){
                for(var j=0;j<this.device_markers[i].covers.length;j++){
                    // this.map.remove(this.device_markers[i].markers[j]);
                    if(e.target==this.device_markers[i].covers[j].marker){
                        cover=this.device_markers[i].covers[j];
                        index=i;
                    }    
                }
            }
        }
        console.log(cover);
        this.theClickMarkerNow=cover;
        // console.log(cover);
        // console.log(cover);
        var info=[];
        // info.push("<div><div style=\"padding:0px 0px 0px 4px;\"><b>"+this.markers[index].type+"</b>");
        info.push("<div><div style=\"padding:0px 0px 0px 4px;\"><b>"+cover.type+"</b>");
        info.push("id: "+cover.id);
        info.push("型号: "+cover.model);
        info.push("备注 : "+cover.info)
        info.push("坐标 :"+e.target.getPosition());
       
        if(cover.status=='锁定'){   //根据markers[]里的status属性判定
            info.push("当前状态 : 已锁定 <a class=\"amap-info-window-a\" href=\"javascript:void(0);\" >解锁</a>")
        }else{
            info.push("当前状态 : 已解锁 <a class=\"amap-info-window-a\" href=\"javascript:void(0);\" >锁定</a>")
        }
        // 当前修改marker的大类型
        if(cover.type=='医疗人员'||cover.type=='消防员'){
            info.push(
            "<a class=\"amap-info-window-audio\" href=\"javascript:void(0);\" style=\"vertical-align:top\"><img src=\"/src/images/Scene/audio.png\" width=\"20\" height=\"20\" style=\"vertical-align:top\">语音通话</a>"+
            "<a class=\"amap-info-window-video\" href=\"javascript:void(0);\" style=\"padding-left:15px;vertical-align:top\"><img src=\"/src/images/Scene/video.png\" width=\"25\" height=\"25\" style=\"vertical-align:top\">视频通话</a>");
        }else if(cover.type=='无人机'){
            info.push(
            "<a class=\"amap-info-window-upload\" href=\"javascript:void(0);\" style=\"vertical-align:top\"><img src=\"/src/images/Scene/upload.png\" width=\"20\" height=\"20\" style=\"vertical-align:top\">数据回传</a>");
        }
        if(cover.type=='火苗' || cover.type=='人员_目标检测所得'|| cover.type=='车辆_目标检测所得'){
            // info.push("<img src=\"/src/images/Scene/audio.png\" width=\"20\" height=\"20\" alt=\"\">"+
            // "<a class=\"amap-info-window-audio\" href=\"javascript:void(0);\" >语音通话</a>"+
            // "<a class=\"amap-info-window-video\" href=\"javascript:void(0);\" style=\"padding-left:15px;\">视频通话</a>");
            info.push(
            "<a class=\"amap-info-window-operation\" href=\"javascript:void(0);\" style=\"vertical-align:top\">删除</a>");
        }else{
            info.push(
            "<a class=\"amap-info-window-operation\" href=\"javascript:void(0);\" style=\"vertical-align:top\">撤回</a>");
        }
        if(cover.type=='人员_目标检测所得'|| cover.type=='车辆_目标检测所得'){
            info.push(
            "<a class=\"amap-info-window-operation-seeImg\" href=\"javascript:void(0);\" style=\"vertical-align:top\">查看识别图像</a>")
        }
        
        info.push("</div></div>");
        // info.push("当前设备状态 : 已锁定 <a class=\"amap-info-window-a\" href=\"javascript:void(0);\" @click=\"markerDrag(e)\">解锁</a></div></div>")
        this.infoWindow.setContent(info.join("<br/>") );
        let that=this;
		this.infoWindow.open(this.map, e.target.getPosition());
        // 弹窗内容渲染完成
        // 给其中按钮绑定方法实现业务
        if(cover.type=='人员_目标检测所得'|| cover.type=='车辆_目标检测所得'){
            var infoWindowOperation=document.getElementsByClassName('amap-info-window-operation-seeImg')[0];
            infoWindowOperation.onclick=function(){
                // that.markerDrag(e,cover);
                // that.removeMarker(cover.marker);
                // console.log("屎山！！！！！！！！！！！！！！！");
                // console.log(detectedImgPathOnOSS);
                that.selectedDetectedMarkerId=cover['id'];
                that.changeDetectedImgVue(detectedImgPathOnOSS,cover['id']);
                // that.closeInfoWindow();
                // 在此调用接口删除数据库中对应的火点对象
            }
        }
        
        // 处理撤回请求   ?????????????????????????????????????????????????
        if(false){
        // if(cover.type=='火苗'){
            var infoWindowOperation=document.getElementsByClassName('amap-info-window-operation')[0];
            infoWindowOperation.onclick=function(){
                // that.markerDrag(e,cover);
                that.removeMarker(cover.marker);
                that.closeInfoWindow();
                // 在此调用接口删除数据库中对应的火点对象
            }
        }else{
            var infoWindowOperation=document.getElementsByClassName('amap-info-window-operation')[0];
            infoWindowOperation.onclick=function(){
                // that.markerDrag(e,cover);
                if(cover.type=='人员_目标检测所得'|| cover.type=='车辆_目标检测所得'||cover.type=="火点_目标检测所得"){
                    // 直接删除强制return
                    that.removeMarker(e.target);
                    that.closeInfoWindow();
                    return ;
                }
                that.removeMarker(cover.marker);
                // console.log(cover.objType);
                that.closeInfoWindow();
                var updateUrl=null;
                var updateStatus=null;
                // that.device_markers[index].remain++;
                console.log(cover.objType);
                if(cover.objType=='person'){
                    // updateUrl='http://47.94.10.119:20008/PeopleMange/modPeople';
                    updateUrl=this.$HPCNServerURLWithPort+"PeopleMange/modPeople";
                    updateStatus='待命中';
                }else if(cover.objType=='equip'){
                    // updateUrl='http://proj23.emr-c.com//EquipMange/updateEquip';
                    updateUrl=this.$HPCNServerURLWithPort+"/EquipMange/updateEquip";

                    updateStatus='待命中';
                }else if(cover.objType=='fire'){
                    // updateUrl='http://proj23.emr-c.com//updateFirePoint';
                    updateUrl=this.$HPCNServerURLWithPort+"/updateFirePoint";

                    updateStatus='已结束';
                }else{
                    this.$message.error("未知类型");
                    return ;
                }
                
                const options = {
                    method: 'GET',
                    url: updateUrl,
                    params: {
                        id: cover.id,                     
                        status:updateStatus, 
                    }
                };
                let thatt=that;
                that.$axios.request(options).then(function (response) {
                    // console.log(response);
                    // console.log(response.data);
                    if(response.status=='200'){
                        // thatt.$message.success("修改成功");
                        // that.closeDialog();
                        // that.getDevicePosition();
                        that.$refs.BFrameC1.getAvailableResourceList();
                    }else{
                        // thatt.$message.error("设备库状态同步失败");
                    }
                    // console.log(that.position.split(',')[0]+that.position.split(',')[1]);
                    
                }).catch(function (error) {
                    console.error(error);
                });


        
                // 在此调用接口同步该cov的状态 已派遣->待命中
            }
        }
        // console.log(e.target.getPosition());
        var infoWindowA=document.getElementsByClassName('amap-info-window-a')[0];
        if(cover.type=='医疗人员'||cover.type=='消防员'){
            var infoWindowAudio=document.getElementsByClassName('amap-info-window-audio')[0];
            var infoWindowVideo=document.getElementsByClassName('amap-info-window-video')[0];
            // console.log(infoWindowA);
            // infoWindowA.onclick=this.markerDrag(e); 会自动执行
            let that=this;
            infoWindowAudio.onclick=function(){
                // that.markerDrag(e,cover);
                that.showBframeRAudio();
            }
            infoWindowVideo.onclick=function(){
                that.showBframeRVideo(e,cover);

            }
        }
        infoWindowA.onclick=function(){
            that.markerDrag(e,cover);
        }
        var mmm="mmm";
        // // let that=this;
        // function checkIfNeelResetSleepTime(marker){
        //     console.log(marker);
        //     console.log(that.theClickMarkerNow);
        //     if(marker == that.theClickMarkerNow){
        //         that.closeInfoWindow();
        //     }
        // }

        // this.sleep(3000).then(this.checkIfNeelResetSleepTime(cover));
        // this.sleep(3000,cover).then((mmm)=>{
        //     console.log("等待了3S")
        //     // this.checkIfNeelResetSleepTime(cover)
        //     console.log(that.mmm);
        // });

        // this.sleep(3000,cover);


        // this.sleep(3000,()=>{
        //     this.checkIfNeelResetSleepTime(cover);
        // })
        // console.log("结束了1次markerClick方法");
      },
      addMarker_zgs(info){
        switch(info.name){
            case '无人机':
                info.imgType = 'wurenji1';
                break;
            case '消防车':
                info.imgType = 'xiaofangche';
                break;
            case '救护车':
                info.imgType = 'jiuhuche';
                break;
            case '直升机':
                info.imgType = 'zhishengji';
                break;
            case '指挥所':
                info.imgType = 'zhihuisuo1';
                break;
            case '医疗人员':
                info.imgType = 'yihurenyuan';
                break;
            case '受困人员':
                info.imgType = 'shoukunrenyuan';
                break;
            case '消防员':
                info.imgType = 'xiaofangyuan';
                break;
        }
        var imgUrl=null;
        var index=0;
        for(var i=0;i<this.icons_marker.length;i++){
            if(info.imgType == this.icons_marker[i].type){
                imgUrl=this.icons_marker[i].imgURL;
                index=i;
                break;
            }
        }
        var icon= new this.AMap.Icon({
            size: new this.AMap.Size(46, 28),
            image: imgUrl,
            imageSize: new this.AMap.Size(46, 28),
        }); 
        var marker = new this.AMap.Marker({
            position:[info.lon, info.lat],
            icon: icon,
            draggable:true,
            anchor: 'top-center', //设置锚点
            offset: new this.AMap.Pixel(0,0), //设置偏移量
            zooms:[13,19],
        });
        marker.setDraggable(false);
        this.planLoadId2Marker.set(info.id, marker);
        this.map.add(marker)
      },
      removeMarker_zgs(id){
        this.map.remove(this.planLoadId2Marker.get(id));
        this.planLoadId2Marker.delete(id);
      },
      setMarkerPosition(info){
        var marker = this.planLoadId2Marker.get(info.id)
        if(marker) {
            marker.setPosition([info.lon, info.lat])
        }
      },
      changeDetectedImgVue(ImgPath,markerId){
        // 重写 开启定时器任务，刷新 根据id去拿图片
        // console.log(markerId);
        this.detectedImgUrl=ImgPath;
        // 
        this.imgSrcList=[];
        this.imgSrcList.push(ImgPath);
        // this.detectedImgVue_show=true;
        this.detectedImg_show =!this.detectedImg_show;
          // console.log(this.bframeC1_show);
        // 弹窗唯一
        if(this.detectedImg_show){
            // if(this.bframeRVideo_show){
            //     this.showBframeRVideo();
            // }
            document.getElementsByClassName('bounce-frame-right-img')[0].style.zIndex=1025;
            let that=this;
            // this.$detectedImgVue.
            this.getDetectedImgInterval=setInterval(function(){that.$refs.detectedImgVue.getDetectedImgVueByMarkerId(markerId);},1000);
        }else{
            // console.log("关闭窗口") 清除定时器
            document.getElementsByClassName('bounce-frame-right-img')[0].style.zIndex=-1;
            clearInterval(this.getDetectedImgInterval);
        }
      },
      getDetectedImgVueByMarkerId1(id){
        // 根据id去拿图片
        console.log(id);
      },
      closeImgVue(){
        this.detectedImg_show=false;
        document.getElementsByClassName('bounce-frame-right-img')[0].style.zIndex=-1;
      },
      sleep (ms, callback) {
        setTimeout(callback, ms)
        // return new Promise((resolve) => setTimeout(resolve, time));
      },
      checkIfNeelResetSleepTime(marker){
        console.log(marker);
            console.log(this.theClickMarkerNow);
            if(marker == this.theClickMarkerNow){
                this.closeInfoWindow();
            }
      },
      removeMarker(marker){
        this.map.remove(marker);
      },
      markerDrag(e,cover){
        
        // 修改markers里的status属性
        if(cover.status=='锁定'){
            // console.log(cover.status);
            // this.markers[index].status='解锁';
            cover.status='解锁'
            e.target.setDraggable(true);
            
        }else{
            // console.log(cover.status);
            var updateUrl;
            cover.status='锁定';
            // 在此调用方法回传给后端 修正设备数据
            e.target.setDraggable(false);
            //同步设备库坐标状态
            var pos=cover.marker.getPosition();
            if(cover.objType=='person'){
                // updateUrl='http://47.94.10.119:20008/PeopleMange/modPeople';
                updateUrl=this.$HPCNServerURLWithPort+"/PeopleMange/modePeople"
            }else if(cover.objType=='equip'){
                // updateUrl='http://proj23.emr-c.com//EquipMange/updateEquip';
                updateUrl=this.$HPCNServerURLWithPort+"/EquipMange/updateEquip"
            }else if(cover.objType=='fire'){
                // updateUrl='http://proj23.emr-c.com//updateFirePoint';
                updateUrl=this.$HPCNServerURLWithPort+"/updateFirePoint";
            }else{
                this.$message.error("未知类型");
                return ;
            }

            // console.log(pos);
            const options = {
			method: 'GET',
			url: updateUrl,
			params: {
				id: cover.id, 
				lng: pos.lng,
				lat: pos.lat,
			}
			};
			let that=this;
			this.$axios.request(options).then(function (response) {
				// console.log(response);
				// console.log(response.data);
				if(response.status=='200'){
					// that.$message.success("同步成功");
					// that.closeDialog();
					// that.getDevicePosition();
				}else{
					that.$message.error("坐标信息同步失败");
				}
				// console.log(that.position.split(',')[0]+that.position.split(',')[1]);
				
			}).catch(function (error) {
				console.error(error);
			});
        }
        this.markerClick(e);
        // console.log("已解锁")
        // e.target.setDraggable(true);
      },
      markerdblevent(e){
        console.log("触发双击事件");
        // console.log(e.target.dom);
        var dom=e.target.dom;
        var amap_marker_label=dom.getElementsByClassName('amap-marker-label')[0];
        var isNewMarker=false;
        var label_div=null;
        if(amap_marker_label==null){
            isNewMarker=true;
            label_div=document.createElement('div');
            // label_div.setAttribute('contenteditable','true');
            label_div.classList.add('amap-marker-label');
            label_div.style.top="-27px";
            label_div.style.left="0px";
            label_div.innerText="请此处输入";
            // label_div.style="top: -27px; left: -9px;"
            dom.appendChild(label_div);
            amap_marker_label=label_div;
        }
        console.log(amap_marker_label);
        amap_marker_label.onmouseover=function(){
            // console.log("111")
            amap_marker_label.setAttribute('contenteditable','true');
        };
        amap_marker_label.onmouseout=function(){
            console.log("onmouseout");
            var labelText=amap_marker_label.innerText;
            console.log(labelText);
            if(isNewMarker){
                dom.removeChild(label_div);
            }
            e.target.setLabel( {
                    direction: 'top',
                    content: labelText,
                    // offset: labelOffset,
                })
            amap_marker_label.onmouseover=null;
            amap_marker_label.onmouseout=null;
        };
        // amap_marker_label.setAttribute('contenteditable','true');
        // console.log(amap_marker_label);
        // var labelText=amap_marker_label.innerText;
        // console.log(labelText);
        // e.target.setLabel( {
        //             direction: 'top',
        //             content: "双击之后的label",
        //             // offset: labelOffset,
        //         })
      },
      setContenteditable(){
        var amap_marker_labels=document.getElementsByClassName('amap-marker-label');
        for(var i=0;i<amap_marker_labels.length;i++){
            // var edit=document.getElementsByClassName('w-e-text')[0]
            // edit.setAttribute('contenteditable','false');
            amap_marker_labels[i].setAttribute('contenteditable','true');
        }
      },
      changeSelected(e){
        // console.log(e.type)
        if(e.currentTarget.innerHTML[0]!="√"){
            e.currentTarget.innerHTML = "√  "+e.currentTarget.innerHTML
            e.currentTarget.style.background="rgb(0,151 ,167)"
        }else{
            e.currentTarget.innerHTML = e.currentTarget.innerHTML.slice(1)
            e.currentTarget.style.background="rgb(65,62 ,62)"
        }
      },
      showWeather(e,city){
        let that=this;
        //执行实时天气信息查询
        this.weather_obj.getLive('北京市', function(err, data) {
            that.weather_info.city=data.city;
            that.weather_info.humidity=data.humidity;
            that.weather_info.temperature=data.temperature;
            that.weather_info.weather=data.weather;
            that.weather_info.windDirection=data.windDirection;
            that.weather_info.windPower=data.windPower;
            // console.log(err, data);
        });
        if(e){
            this.changeSelected(e);
        }
        this.weather_info.weatherShow=!this.weather_info.weatherShow;
        // console.log(this.weatherShow)
      },
      showMouseToolMeasurement(e){
        this.changeSelected(e);
        this.mouseToolMeasure_show=!this.mouseToolMeasure_show;
        // console.log(this.mouseToolMeasure_show)
        if(!this.mouseToolMeasure_show){

            return;
        }
        if(this.mouseToolMeasure_show){
            //退出手动标注模式 冲突操作
            if(this.markersmenu_show){
                // console.log('冲突已解决')
                this.clickOff();
                this.markersmenu_show=false;
                this.changeMouseToolSelected('labelMarkerId')
                
                // var eve=document.getElementById('labelMarkerId');
                // this.labelMarker(eve);
            }
        }
        if(this.mouseToolLabel_show){
            this.exitMouseToolLabelReserve();
        }
        let that=this;
        // var mouseTool = new this.AMap.MouseTool(this.map);  
        var mouseTool = this.mouseToolMeasure_obj ;
        // this.mouseTool=mouseTool;
        function draw(type){
        switch(type){
            case 'rule':{
                // console.log("1111111")
                mouseTool.rule({
                    startMarkerOptions : {//可缺省
                        icon: new that.AMap.Icon({
                            size: new that.AMap.Size(19, 31),//图标大小
                            imageSize:new that.AMap.Size(19, 31),
                            image: "//webapi.amap.com/theme/v1.3/markers/b/start.png"
                        }),
                        offset: new AMap.Pixel(-9, -31)
                    },
                    endMarkerOptions : {//可缺省
                        icon: new that.AMap.Icon({
                            size: new that.AMap.Size(19, 31),//图标大小
                            imageSize:new that.AMap.Size(19, 31),
                            image: "//webapi.amap.com/theme/v1.3/markers/b/end.png"
                        }),
                        offset: new that.AMap.Pixel(-9, -31)
                    },
                    midMarkerOptions : {//可缺省
                        icon: new that.AMap.Icon({
                            size: new that.AMap.Size(19, 31),//图标大小
                            imageSize:new that.AMap.Size(19, 31),
                            image: "//webapi.amap.com/theme/v1.3/markers/b/mid.png"
                        }),
                        offset: new that.AMap.Pixel(-9, -31)
                    },
                    lineOptions : {//可缺省
                        strokeStyle: "solid",
                        strokeColor: "#FF33FF",
                        strokeOpacity: 1,
                        strokeWeight: 2
                    }
                    //同 RangingTool 的 自定义 设置，缺省为默认样式
                });
                break;
            }
            case 'measureArea':{
                mouseTool.measureArea({
                    strokeColor:'#80d8ff',
                    fillColor:'#80d8ff',
                    fillOpacity:0.3
                //同 Polygon 的 Option 设置
                });
                break;
            }
        }
        }
        var radios = document.getElementsByName('func');
        for(var i=0;i<radios.length;i+=1){
            radios[i].onchange = function(e){
                // console.log(e.target.value)
                draw(e.target.value)
            }
        }
        // draw('rule')

        // document.getElementById('close').onclick = function(){
        //     mouseTool.close(true)//关闭，并清除覆盖物
        //     for(var i=0;i<radios.length;i+=1){
        //         radios[i].checked = false;
        //     }
        //     that.mouseTool_show=false;
        // }
      },
      showMouseToolLabel(e){    
        // console.log("调用了showMouseToolLabel")
        this.changeSelected(e);
        this.mouseToolLabel_show = !this.mouseToolLabel_show;
        // console.log(this.mousuToolLabel_show)
        if(!this.mouseToolLabel_show){
            // if(this.markersmenu_show){
            //     this.clickOn();
            // }
            return;
        }
        if(this.mouseToolLabel_show){
            //退出手动标注模式 冲突操作
            if(this.markersmenu_show){
                // console.log('冲突已解决')
                this.clickOff();
                this.markersmenu_show=false;
                this.changeMouseToolSelected('labelMarkerId')
                
                // var eve=document.getElementById('labelMarkerId');
                // this.labelMarker(eve);
            }
        }
        if(this.mouseToolMeasure_show){
            
            this.exitMouseToolReserve();
        }
        let that=this;
        // var mouseTool = new this.AMap.MouseTool(this.map);  
        var mouseTool = this.mouseToolLabel_obj ; 
        //监听draw事件可获取画好的覆盖物
        // console.log(mouseTool);
        // var overlays = [];
        mouseTool.on('draw',function(e){
            that.mouseToolLabelOverlays.push(e.obj);
        })     
        function draw(type){
            switch(type){
                case 'marker':{
                    mouseTool.marker({
                    //同Marker的Option设置
                    });
                    break;
                }
                case 'polyline':{
                    mouseTool.polyline({
                    strokeColor:'#80d8ff'
                    //同Polyline的Option设置
                    });
                    break;
                }
                case 'polygon':{
                    mouseTool.polygon({
                    fillColor:'#00b0ff',
                    strokeColor:'#80d8ff'
                    //同Polygon的Option设置
                    });
                    break;
                }
                case 'rectangle':{
                    mouseTool.rectangle({
                    fillColor:'#00b0ff',
                    strokeColor:'#80d8ff'
                    //同Polygon的Option设置
                    });
                    break;
                }
                case 'circle':{
                    mouseTool.circle({
                    fillColor:'#00b0ff',
                    strokeColor:'#80d8ff'
                    //同Circle的Option设置
                    });
                    break;
                }
            }
        }
        var radios = document.getElementsByName('func1');
        for(var i=0;i<radios.length;i+=1){
            radios[i].onchange = function(e){
                draw(e.target.value)
            }
        }
      },
      exitMouseToolClear(){
        this.mouseToolMeasure_obj.close(true);
        this.mouseToolMeasure_show=false;
        this.changeMouseToolSelected('mouseTool');
      },
      exitMouseToolReserve(){
        this.mouseToolMeasure_obj.close(false);
        this.mouseToolMeasure_show=false;
        this.changeMouseToolSelected('mouseTool');
      },  
      changeMouseToolSelected(id){
        var e=document.getElementById(id);
        // console.log('修改了:'+id+'的状态')
        // console.log(e);
        if(e.innerHTML[0]!="√"){
            e.innerHTML = "√  "+e.innerHTML
            e.style.background="rgb(0,151 ,167)"
        }else{
            e.innerHTML = e.innerHTML.slice(1)
            e.style.background="rgb(65,62 ,62)"
        }
      },
      MouseToolLabelClear(){
            this.map.remove(this.mouseToolLabelOverlays)
            this.mouseToolLabelOverlays = [];
      },
      exitMouseToolLabelClear(){
        this.mouseToolLabel_obj.close(true);//关闭，并清除覆盖物
        this.mouseToolLabel_show=false;
        this.changeMouseToolSelected('mouseTool2');
        //     for(var i=0;i<radios.length;i+=1){
        //         radios[i].checked = false;
        //     }
      },
      exitMouseToolLabelReserve(){
        this.mouseToolLabel_obj.close(false);
        this.mouseToolLabel_show=false;
        this.changeMouseToolSelected('mouseTool2');
      },
      mapType(e){
        this.changeSelected(e);
        var e=document.getElementById('maptype');
        // console.log(e);
        if(e.innerHTML[0]!="√"){
            document.getElementsByClassName('amap-ctrl-list-layer')[0].style.visibility = 'hidden'
        }else{
            document.getElementsByClassName('amap-ctrl-list-layer')[0].style.visibility = 'visible'
        }
      },
      showPositionPicker(e){
        this.changeSelected(e);
        this.positionPicker_show=!this.positionPicker_show;
        if(!this.positionPicker_show){
            this.positionPicker_obj.stop();
            return;
        }
        this.positionPicker();
      },
      positionPicker(){
        let that=this;
        // console.log(this.AMapUI)
        this.AMapUI.load(['ui/misc/PositionPicker'], function(PositionPicker) {
            // var map = new AMap.Map('container', {
            //     zoom: 16,
            //     scrollWheel: false
            // })
            var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: that.map
            });

            that.positionPicker_obj=positionPicker;

            positionPicker.on('success', function(positionResult) {
                document.getElementById('lnglat').innerHTML = positionResult.position;
                document.getElementById('address').innerHTML = positionResult.address;
                // console.log(positionResult);
                document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
                document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
                document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;
                // console.log(positionResult)
            });
            positionPicker.on('fail', function(positionResult) {
                document.getElementById('lnglat').innerHTML = ' ';
                document.getElementById('address').innerHTML = ' ';
                document.getElementById('nearestJunction').innerHTML = ' ';
                document.getElementById('nearestRoad').innerHTML = ' ';
                document.getElementById('nearestPOI').innerHTML = ' ';
                // console.log("positionPicker.onfail")
            });
            var onModeChange = function(e) {
                positionPicker.setMode(e.target.value)
            }
            var startButton = document.getElementById('start');
            var stopButton = document.getElementById('stop');
            var dragMapMode = document.getElementsByName('mode')[0];
            var dragMarkerMode = document.getElementsByName('mode')[1];
            startButton.addEventListener('click', function() {
                // console.log(that.map.getBounds().getSouthWest());
                positionPicker.start(that.map.getBounds().getCenter())
            })
            stopButton.addEventListener('click', function() {
                positionPicker.stop();
                document.getElementById('lnglat').innerHTML = ' ';
                document.getElementById('address').innerHTML = ' ';
                document.getElementById('nearestJunction').innerHTML = ' ';
                document.getElementById('nearestRoad').innerHTML = ' ';
                document.getElementById('nearestPOI').innerHTML = ' ';
            })
            dragMapMode.addEventListener('change', onModeChange)
            dragMarkerMode.addEventListener('change', onModeChange);
            positionPicker.start();
            that.map.panBy(0, 1);

            // map.addControl(new AMap.ToolBar({
            //     liteStyle: true
            // }))
        });
      },
      getDevicePosition(){
        const options = {
        method: 'GET',
        url: 'http://39.105.54.174:9017//SituationDisplay/getDevicePosition'
        };

        axios.request(options).then(function (response) {
        console.log(response.data);
        }).catch(function (error) {
        console.error(error);
        });
      },
      showHeatMap(e){
        // this.changeSelected(e);
        this.heatmap_show=!this.heatmap_show;
        if(!this.heatmap_show){
            this.heatmap_obj.setDataSet({
                // data: heatmapData,
                data:[],
                max: 100,
                // zooms:[13,19],
            });
        }else{
            this.heatmap_obj.setDataSet({
                // data: heatmapData,
                data:this.myheatmapData,
                max: 100
            });
        }
      },
      editFireline(){
        this.situation_show=true;
      },
      openFilelineEditiorMenu(){
        // 把火线上的火点去掉
        this.fireLinePointMarkers.forEach(marker =>{
            this.map.remove(marker);
        })
        this.showFilelineEditiorMenu=true;
      },
      getIfShowSituation(){
        return this.situation_show;
      },
      showSituation(){
        // 调用火线接口,对于每条火线的每个坐标点添加特定的火点
        // 添加的火点图标存储到阿里云上先不改变
        // 调用addIcon接口时，id参数为空,在
        // this.changeSelected(e);
        this.situation_show=!this.situation_show;
        if(!this.situation_show){
            // 把火线上的火点去掉
            // console.log("编辑后的fireLinePointMarkers数量："+this.fireLinePointMarkers.length);
            this.fireLinePointMarkers.forEach(marker =>{
                this.map.remove(marker);
            })
            // console.log(this.allPolylines);
            this.map.remove(this.allPolylines);
        }
        else{
            this.drawPolyline();
        }

        return;
        
        if(!this.situation_show){
            // this.map.remove(this.polyline)
            //也可以通过this.polyline.show()/polyline.hide()控制隐藏显示
            for(var i=0;i<this.polylines.length;i++){
                this.map.remove(this.polylines[i].polyLine);
            }
            for(var i=0;i<this.fireLinePointMarkers.length;i++){
                for(var j=0;j<this.fireLinePointMarkers[i].fireLinePointsMarkers.length;j++){
                    this.map.remove(this.fireLinePointMarkers[i].fireLinePointsMarkers[j]);
                }
            } 
            this.polylines=[];
            this.fireLinePointMarkers=[];
            return ;
        }
        var firePointImgUrl="http://ossfile.hpcner.com/resource_icon/fire/huomiao.png?Expires=1680605536&OSSAccessKeyId=LTAI5tLLj9yWk9K9xtqsaVSf&Signature=1fZyNMh7Pcty2XmFmbuhw4R8%2BHs%3D";
        const options = {method: 'GET', url: 'http://47.94.10.119:20008//FireLine/getFireLine'};

        this.$axios.request(options).then( res => {
            // console.log(res.data);
            res.data.forEach( fire_line =>{
                // 将所有火线火点坐标保存下来
                // 将火线id存储到this.fireLinePointMarkers里
                var fireLinePointsPath = [];
                var fireLineId=fire_line["fire_line_id"];
                 
                // 绘制曲线并添加火线火点图标
                fire_line.location.forEach(fire_point => {
                    // console.log(fire_point);
                    fireLinePointsPath.push(new this.AMap.LngLat(fire_point.longitude,fire_point.latitude));
                    // 调用时传火线id，在addIcon里面将新添加的marker添加到对应的 fireLinePointMarkers 里面
                    this.addIcon(firePointImgUrl,[fire_point.longitude,fire_point.latitude],33,33,null,fireLineId,null,"火线火点",null)
                })

                // 创建折线实例
                var polyLine = new this.AMap.Polyline({
                    path: fireLinePointsPath,  
                    borderWeight: 10, // 线条宽度，默认为 1
                    strokeColor: 'red', // 线条颜色
                    lineJoin: 'round' ,// 折线拐点连接处样式
                    isOutline: true,
                    outlineColor: '#ffeeff',
                    borderWeight: 2,
                    // strokeColor: "#3366FF",
                    strokeOpacity: 0.5,
                    strokeWeight: 6,
                    // 折线样式还支持 'dashed'
                    strokeStyle: "dashed",
                    // strokeStyle是dashed时有效
                    strokeDasharray: [15, 5],
                    // lineJoin: 'round',
                    lineCap: 'round',
                    zIndex: 50,
                });

                // 将折线添加至地图实例
                var polyLineObj={};
                polyLineObj["fireLineId"]=fireLineId;
                polyLineObj["polyLine"]=polyLine;
                this.polylines.push(polyLineObj);
                this.map.add(polyLine);
                
            })
        }).catch(function (error) {
            console.error(error);
        });
        return;
        var path = [
            // new this.AMap.LngLat(116.368904,39.913423),
            // new this.AMap.LngLat(116.382122,39.901176),
            // new this.AMap.LngLat(116.387271,39.912501),
            // new this.AMap.LngLat(116.398258,39.904600),
            new this.AMap.LngLat(115.364594 + 0.469032,39.534451 + 0.397491),
            new this.AMap.LngLat(115.361277 + 0.469032,39.526438 + 0.397491),
            new this.AMap.LngLat(115.363955 + 0.469032,39.524163 + 0.397491),
            new this.AMap.LngLat(115.364945 + 0.469032,39.521296 + 0.397491),
            new this.AMap.LngLat(115.367407 + 0.469032,39.518844 + 0.397491),
            new this.AMap.LngLat(115.371678 + 0.469032,39.51802 + 0.397491),
            new this.AMap.LngLat(115.375394 + 0.469032,39.519028 + 0.397491),
            new this.AMap.LngLat(115.379164 + 0.469032,39.520341 + 0.397491),
            new this.AMap.LngLat(115.382755 + 0.469032,39.520817 + 0.397491),
            new this.AMap.LngLat(115.386883 + 0.469032,39.521685 + 0.397491),
            new this.AMap.LngLat(115.388665 + 0.469032,39.525607 + 0.397491),
            new this.AMap.LngLat(115.391734 + 0.469032,39.528926 + 0.397491),
            new this.AMap.LngLat(115.392248 + 0.469032,39.533502 + 0.397491),
            new this.AMap.LngLat(115.389297 + 0.469032,39.537551 + 0.397491),
            new this.AMap.LngLat(115.386271 + 0.469032,39.539611 + 0.397491),
            new this.AMap.LngLat(115.381692 + 0.469032,39.542012 + 0.397491),
            new this.AMap.LngLat(115.375458 + 0.469032,39.543383 + 0.397491),
            new this.AMap.LngLat(115.371594 + 0.469032,39.541202 + 0.397491),
            new this.AMap.LngLat(115.368325 + 0.469032,39.539091 + 0.397491),
            new this.AMap.LngLat(115.364594 + 0.469032,39.534451 + 0.397491),
            
        ];

        // 创建折线实例
        this.polyline = new this.AMap.Polyline({
            path: path,  
            borderWeight: 10, // 线条宽度，默认为 1
            strokeColor: 'red', // 线条颜色
            lineJoin: 'round' // 折线拐点连接处样式
        });

        // 将折线添加至地图实例
        this.map.add(this.polyline);
      },
      showDevice(e){
        this.alertMessage();
        this.changeSelected(e);
        this.device_show=!this.device_show;
        if(!this.device_show){
            // this.positionPicker_obj.stop();
            for(var i=0;i<this.device_markers.length;i++){
                for(var j=0;j<this.device_markers[i].markers.length;j++){
                    this.map.remove(this.device_markers[i].markers[j]);
                }
            }
            return;
        }else{
            const options = {
                method: 'GET',
                // url: 'http://proj23.emr-c.com//SituationDisplay/getDevicePosition',
                url:this.$HPCNServerURLWithPort+"/SituationDisplay/getDevicePosition",
                params: {page: '1', pagenum: '-1'}
            };
            var devices=[];
            let that=this;
            this.$axios.request(options).then(function (response) {
                // console.log(response.data);
                devices=response.data;
                // console.log(devices);
                devices.forEach(item =>{
                    if(item.status=='已派遣'){
                        // console.log(item.type);
                        // console.log(item["latitude"]+' '+item["longitude"])
                        switch(item.type){
                            case '消防车':
                                that.addIcon('xiaofangche',[item["longitude"],item["latitude"]],46,28,item.info,item.id,item.status,item.type,item.model);
                                break;
                            case '无人机':
                                that.addIcon('zhishengji',[item["longitude"],item["latitude"]],46,28,item.info,item.id,item.status,item.type,item.model);
                                break;
                            case '救护车':
                                // that.addIcon('xiaofangdui',[item["longitude"],item["latitude"]],28,28,item.info,item.id,item.status,item.type,item.model)
                                break;
                            case '指挥所':
                                that.addIcon('zhihuisuo1',[item["longitude"],item["latitude"]],46,28,item.info,item.id,item.status,item.type,item.model);
                                break;
                            case '风力灭火器':
                                that.addIcon('huomiao',[item["longitude"],item["latitude"]],30,35,item.info,item.id,item.status,item.type,item.model);
                                break;
                        }
                    }
                    
                })


            // }).catch(function (error) {
            //     console.error(error);
            });
            
            // console.log('111111')
            // this.addIcon('xiaofangche',[115.372647,39.53935],46,28,'消防车1');
            // this.addIcon('xiaofangche',[115.380361,39.539728],46,28,'消防车2');
            // this.addIcon('xiaofangche',[115.368555,39.518597],46,28,'消防车3');
            // this.addIcon('xiaofangdui',[115.37177,39.532135],46,28,'消防队1');
            // this.addIcon('xiaofangdui',[115.383931,39.526307],46,28,'消防队2');
            // this.addIcon('xiaofangdui',[115.366677,39.532903],46,28,'消防队3');
            // this.addIcon('zhishengji',[115.37733,39.525038],46,28,null);
            // this.addIcon('zhihuisuo1',[115.371128,39.508611],46,28,'机动指挥车');
            // this.addIcon('huomiao',[115.365701,39.520637],30,35,null);
            // this.addIcon('huomiao',[115.371842,39.517925],30,35,null);
            // this.addIcon('huomiao',[115.369285,39.529397],30,35,null);
            // this.addIcon('jiantou',[115.36142,39.526472],50,50,'4级');
            // + 0.469032  + 0.397491

            // this.addIcon('xiaofangche',[115.841679,39.936841],46,28,'消防车1');
            // this.addIcon('xiaofangche',[115.849393,39.937219],46,28,'消防车2');
            // this.addIcon('xiaofangche',[115.837587,39.916088],46,28,'消防车3');
            // this.addIcon('xiaofangdui',[115.840802,39.929626],46,28,'消防队1');
            // this.addIcon('xiaofangdui',[115.852963,39.923798],46,28,'消防队2');
            // this.addIcon('xiaofangdui',[115.835709,39.930394],46,28,'消防队3');
            // this.addIcon('zhishengji',[115.846362,39.922529],46,28,null);
            // this.addIcon('zhihuisuo1',[115.829914,39.92639],46,28,'机动指挥车');
            // this.addIcon('huomiao',[115.834733,39.918128],30,35,null);
            // this.addIcon('huomiao',[115.840874,39.915416],30,35,null);
            // this.addIcon('huomiao',[115.838317,39.926888],30,35,null);
            // this.addIcon('jiantou',[115.830452,39.923963],50,50,'4级');
        }
      },
      selectEvent(e){
        // var menus=document.getElementsByClassName('nav-li2')
        // for(var i=0;i<menus.length;i++){
        //     menus[i].classList.remove('selected-menu');
        // }
        document.getElementById('eventOne').style.color='black';
        document.getElementById('eventTwo').style.color='black';
        document.getElementById('eventThr').style.color='black';
        document.getElementById('eventFour').style.color='black';
        e.currentTarget.parentElement.classList.add('selected-menu') ;
        e.currentTarget.style.color='red';
        var selectEventId=e.currentTarget.id;
        // console.log(selectEventId);
        this.eventOne_flag=false;
        this.eventTwo_flag=false;
        this.eventThr_flag=false;
        this.eventFour_flag=false;
        if(selectEventId !='eventOne' && this.markersmenu_show){    
                this.clickOff();
                this.markersmenu_show=false;
                this.changeMouseToolSelected('labelMarkerId')
                
            }
        switch(selectEventId){
            case 'eventOne':
                this.eventOne_flag=true;
                break;
            case 'eventTwo':
                this.eventTwo_flag=true;
                break;   
            case 'eventThr':
                this.eventThr_flag=true;
                break;
            case 'eventFour':
                this.eventFour_flag=true;
                break;
        }
      },
      labelMarker(e){
        if(e){
            this.changeSelected(e);
        }
        // this.markersmenu_show=!this.markersmenu_show;
        if(!this.markersmenu_show){
            // console.log(this.markersmenu_show)
            this.clickOff();
        }
        else{
            // console.log(this.markersmenu_show)
            // this.exitMouseToolReserve();
            // this.exitMouseToolLabelReserve();
            
            this.clickOn();
        }
      },
      receiveSelectedLabelTypeObjectListFromBframeC1(selectedLabelTypeObjectList){
        // this.SelectedLabelTypeObjectList=SelectedLabelTypeObjectList;
        // console.log("接受到的SelectedLabelTypeObjectList为："+SelectedLabelTypeObjectList);
        this.selectedLabelTypeObjectList=selectedLabelTypeObjectList;
      },
      addPoint(e) {
        this.geocoder.getAddress(e.lnglat, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
            this.marker = new this.AMap.Marker({
                position: e.lnglat,
                anchor: 'bottom-center',
                offset: new this.AMap.Pixel(0, 0),
                content: 'xxxxx', // 内容省略了
                map: this.map,
            });
            } else {
            // 获取不到经纬度信息的情况
            this.$message.warning('此位置无经纬度，无法新建点位');
            }
        });
      },
      getRadioValue(e){
        if(e.target.tagName == 'INPUT'){
            return
        }
        this.iconImgUrl=e.currentTarget.getAttribute('iconImgUrl');
        // console.log(this.iconImgUrl);
      },
      showInfoClick(e){
        // var text = '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置单击了地图！'
        // console.log(text)
        var imgType=null;
        var typeName=null;
        var width=0;
        var height=0;
        var objType=null;
        var Url;
        if(!this.selectedMarkerType)return;
        if(this.mouseToolMeasure_show){
            this.exitMouseToolReserve()
        }
        if(this.mouseToolLabel_show){
            this.exitMouseToolLabelReserve()
        }
        console.log("当前选中类型为 "+this.selectedMarkerType);
        typeName=this.selectedMarkerType;
        
        // 拿到selectedMarkerType对应的objectType:equil/person/fire
        let that=this;
        let options = {
            method: 'GET',
            // url: 'http://47.94.10.119:20008/ResourceCategory/getResource'
            url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource"
        };
        this.$axios.request(options).then(function (response) {
            response.data.forEach(item =>{
                if(item.objectName==that.selectedMarkerType)
                    objType=item.objectType;
            })
            // console.log(objType);
            var url=null;
            var updateUrl=null;
            switch(objType){
                case "equip":
                    // url="http://proj23.emr-c.com//SituationDisplay/getDevicePosition";
                    // updateUrl='http://proj23.emr-c.com//EquipMange/updateEquip'
                    url=this.$HPCNServerURLWithPort+"/SituationDisplay/getDevicePosition";
                    updateUrl=this.$HPCNServerURLWithPort+"/EquipMange/updateEquip"
                    break;
                case "person":
                    // url='http://proj23.emr-c.com/SituationDisplay/getPersonPosition';
                    // updateUrl='http://47.94.10.119:20008/PeopleMange/modPeople'
                    url=this.$HPCNServerURLWithPort+"/SituationDisplay/getPersonPosition";
                    updateUrl=this.$HPCNServerURLWithPort+"/PeopleMange/modPople"
                    break;
                case "fire":
                    url=""
                    break;
            }
            let thatt=that;
            console.log(thatt.selectedMarkerType);
            console.log(url);
            thatt.$axios({
			    method: "get",
			    url:url,
			    params:{
				    'page':1,//4
				    'pagenum':-1,//1
				    type:thatt.selectedMarkerType,
              	    status:"待命中",
			    }
			}).then(response => {
                if(response.data.length==0){
                    thatt.$message.error("当前类型无空闲资源!");
                    return;
                }
                console.log(response);
				var id=response.data[0].id;
                theFirstAvailableDeviceId=id;
                // console.log("拿到的第一个空闲设备的id是:"+id);
                //更改状态
                const options = {
                    method: 'GET',
                    url: updateUrl,
                    params: {
                        id: id, 
                        status:"已派遣",
                        lng: e.lnglat.getLng(),
                        lat: e.lnglat.getLat(),
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
                        thattt.addIcon(thattt.iconImgUrl,[e.lnglat.getLng(),e.lnglat.getLat()],33,33,null,theFirstAvailableDeviceId,null,typeName,null);
                        thatt.$refs.BFrameC1.getAvailableResourceList();
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

        return ;


        // switch(this.selectedMarkerType){
        //     case '1':
        //         imgType="xiaofangche";
        //         typeName="消防车"
        //         width=40;
        //         height=40;
        //         break;
        //     case '2':
        //         imgType="jiuhuche";
        //         typeName="救护车"
        //         width=40;
        //         height=40;
        //         break;
        //     case '3':
        //         imgType="zhishengji";
        //         typeName="直升机"
        //         width=46;
        //         height=28;
        //         break;
        //     case '4':
        //         imgType="wurenji1";
        //         typeName="无人机"
        //         width=30;
        //         height=35;
        //         break;
        //     case '5':
        //         imgType="zhihuisuo1";
        //         typeName="指挥所"
        //         width=50;
        //         height=50;
        //         break;
        //     case '6':
        //         imgType="huomiao";
        //         typeName="火点"
        //         width=20;
        //         height=25;
        //         break;
        //     // case '7':
        //     //     imgType="jiantou";
        //     //     width=46;
        //     //     height=28;
        //     //     break;
        //     case '8':
        //         imgType="yihurenyuan";
        //         typeName="医护人员"
        //         width=28;
        //         height=28;
        //         break;
        //     case '9':
        //         imgType="shoukunrenyuan";
        //         typeName="受困人员"
        //         width=28;
        //         height=28;
        //         break;
        //     case '10':
        //         imgType="xiaofangyuan";
        //         typeName="消防员"
        //         width=28;
        //         height=28;
        //         break;
        // }

        // 在此调用接口查询选中设备的availableCount,如果 >1 则--，usedCount ++。-> 直接查设备库，修改状态字段会自动更新.
        // if(this.device_markers[this.selectedMarkerType-1].remain==0){
        //     return ;
        // }
        var theFirstAvailableDeviceId=null;
        //在此从设备库中取出一个对应型号的待命中的设备，更改其状态、位置等信息
        this.$axios({
			method: "get",
			url:"http://proj23.emr-c.com//SituationDisplay/getDevicePosition",
			params:{
				'page':1,//4
				'pagenum':-1,//1
				type:this.selectedMarkerType,
              	status:"待命中",
			}
			}).then(response => {
                console.log(response);
				var id=response.data[0].id;
                theFirstAvailableDeviceId=id;
                // console.log("拿到的第一个空闲设备的id是:"+id);
                //更改状态
                return ;
                const options = {
                    method: 'GET',
                    url: 'http://proj23.emr-c.com//EquipMange/updateEquip',
                    params: {
                        id: id, 
                        status:"已派遣",
                        lng: e.lnglat.getLng(),
                        lat: e.lnglat.getLat(),
                    }
                };
                let that=this;
                this.$axios.request(options).then(function (response) {
                    // console.log(response);
                    // console.log(response.data);
                    if(response.status=='200'){
                        // that.$message.success("修改成功");
                        // that.closeDialog();
                        // that.getDevicePosition();
                        // console.log(theFirstAvailableDeviceId);
                        that.addIcon(imgType,[e.lnglat.getLng(),e.lnglat.getLat()],width,height,null,theFirstAvailableDeviceId,null,typeName,null);
                        that.device_markers[that.selectedMarkerType-1].remain--;
                    }else{
                        that.$message.error("空闲设备状态同步异常!");
                    }
                    // console.log(that.position.split(',')[0]+that.position.split(',')[1]);
                    
                }).catch(function (error) {
                    console.error(error);
                });

			  }).catch(err => {
			    console.log(err);
			    this.$message.error("空闲设备请求异常!");
			  });
        
        
        // console.log(theFirstAvailableDeviceId);
        // this.addIcon(imgType,[e.lnglat.getLng(),e.lnglat.getLat()],width,height,null,theFirstAvailableDeviceId,null,typeName,null);
        // this.device_markers[this.selectedMarkerType-1].remain--;
        
        // document.querySelector("#text").innerText = text;
      },
      closeInfoWindow(){
        // console.log("鼠标移出覆盖物范围");
        this.infoWindow.close();
      },
      clickOn(){
        // console.log("绑定事件!");  
        this.map.on('click', this.showInfoClick);
        // map.on('dblclick', showInfoDbClick);
        // map.on('mousemove', showInfoMove);
      },
      clickOff(){
        // console.log("解除事件绑定!"); 
        this.map.off('click', this.showInfoClick);
        // map.off('dblclick', showInfoDbClick);
        // map.off('mousemove', showInfoMove);
      },
      showBframeC1(){
        // console.log("调用父组件的showBframec1方法");
        this.labelMarker();
        this.bframeC1_show =! this.bframeC1_show;
        // console.log(this.bframeC1_show);
        // 弹窗唯一
        if(this.bframeC1_show){
            if(this.bframeR1_show){
                this.showBframeR1();
            }
            if(this.bframeL1_show){
                this.showBframeL1();
            }
            document.getElementsByClassName('bounce-frame-center')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('bounce-frame-center')[0].style.zIndex=-1;
        }
      },
      showBframeC2(){
        this.bframeC2_show =! this.bframeC2_show;
        // 弹窗唯一
        if(this.bframeC2_show){
            if(this.bframeR1_show){
                this.showBframeR1();
            }
            if(this.bframeL1_show){
                this.showBframeL1();
            }
            document.getElementsByClassName('bounce-frame-center2')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('bounce-frame-center2')[0].style.zIndex=-1;
        }
      },
      showBframeC3(){
        this.bframeC3_show =! this.bframeC3_show;
        // 弹窗唯一
        if(this.bframeC3_show){
            if(this.bframeR1_show){
                this.showBframeR1();
            }
            if(this.bframeL1_show){
                this.showBframeL1();
            }
            document.getElementsByClassName('bounce-frame-center3')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('bounce-frame-center3')[0].style.zIndex=-1;
        }
      },
      showBframeR1(e){
        if(e){
            this.changeSelected(e);
        }
        // console.log("调用父组件的方法");
        this.bframeR1_show =! this.bframeR1_show;
        if(this.bframeR1_show){
            if(this.bframeC1_show){
                this.showBframeC1();
            }
            document.getElementsByClassName('bounce-frame-right')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('bounce-frame-right')[0].style.zIndex=-1;
        }
      },
      showBframeL1(){
          console.log(this.bframeL1_show);
        //   console.log('11111111111');
          this.bframeL1_show =! this.bframeL1_show;
          // console.log(this.bframeC1_show);
        // 弹窗唯一
        if(this.bframeL1_show){
            if(this.bframeC1_show){
                this.showBframeC1();
            }
            document.getElementsByClassName('bounce-frame-left')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('bounce-frame-left')[0].style.zIndex=-1;
        }
      },
      showBframeL2(){
        this.bframeL2_show =! this.bframeL2_show;
        if(this.bframeL2_show){
            if(this.bframeC1_show){
                this.showBframeC1();
            }
            document.getElementsByClassName('bounce-frame-left2')[0].style.zIndex=1025;
        }
        else{
            document.getElementsByClassName('bounce-frame-left2')[0].style.zIndex=-1;
        }
      },
      showBframeL3(){
        this.bframeL3_show = !this.bframeL3_show;
        if(this.bframeL3_show){
            if(this.bframeC1_show){
                this.showBframeC1();
            }
            document.getElementsByClassName('bounce-frame-left3')[0].style.zIndex=1025;
        }
        else{
            document.getElementsByClassName('bounce-frame-left3')[0].style.zIndex=-1;
        }
      },
      showBframeRAudio(){
        this.bframeRAudio_show =! this.bframeRAudio_show;
          // console.log(this.bframeC1_show);
        // 弹窗唯一
        if(this.bframeRAudio_show){
            if(this.bframeRVideo_show){
                this.showBframeRVideo();
            }
            document.getElementsByClassName('bounce-frame-right-audio')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('bounce-frame-right-audio')[0].style.zIndex=-1;
        }
      },
      showBframeRVideo(){
        this.bframeRVideo_show =! this.bframeRVideo_show;
          // console.log(this.bframeC1_show);
        // 弹窗唯一
        if(this.bframeRVideo_show){
            if(this.bframeRAudio_show){
                this.showBframeRAudio();
            }
            document.getElementsByClassName('bounce-frame-right-video')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('bounce-frame-right-video')[0].style.zIndex=-1;
        }
      },
      showAudioNoiseReduction(){
        this.audioNoiseReduction_show =! this.audioNoiseReduction_show;
        if(this.audioNoiseReduction_show){
            document.getElementsByClassName('audio-noise-reduction')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('audio-noise-reduction')[0].style.zIndex=-1;
        }
      },
      showUsers(e){
        // 控制菜单打勾效果
        this.changeSelected(e);
      },
      showComSit(e){
        this.changeSelected(e);
      },
      alertMessage(){
        alert("开发中");
      },
      clearAllDetectedMarkers(){
        this.detectedPerson_markers.forEach(marker=>{
            this.map.remove(marker);
        })
        this.detectedPerson_markers=[];

        this.detectedVehicle_markers.forEach(marker=>{
            this.map.remove(marker);
        })
        this.detectedVehicle_markers=[];
        this.removeAllRippleMarkers();
      },
      removeAllMarkers(){
        let that=this;
        //                                                                              清除人的图标同时状态信息里取消选中
        console.log("调用了一次removeAllMarkers方法")
        var inputelement = document.getElementById("cover_person");
        if(inputelement.value==1||inputelement.value==0){
            let personTypes=[];
            var options = {
                method: 'GET',
                // url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
                url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",
                params: {objectType: 'person'}
            };
            this.$axios.request(options).then(function (response) {
                console.log(response)
                response.data.forEach(item=>{
                    personTypes.push(item["objectName"]);
                })
                // console.log(equipsTypes);
                for(var i=0;i<that.device_markers.length;i++){
                    // console.log(that.device_markers[i].type)
                    if(personTypes.indexOf(that.device_markers[i].type) != -1){
                        // console.log("true");
                        for(var j=0;j<that.device_markers[i].covers.length;j++){
                            that.map.remove(that.device_markers[i].covers[j].marker);
                        }
                        that.device_markers[i].covers=[];
                    }  
                }
                console.log("11111111111111");
            }).catch(function (error) {
                console.error(error);
            });
            this.detectedPerson_markers.forEach(marker=>{
                this.map.remove(marker);
            })
            this.detectedPerson_markers=[];
            console.log("111111111111");
            clearInterval(this.covPeopleInterval);
            inputelement.value=0;
            inputelement.checked=0;
        }
        
        
        //                                                                              清除设备的图标
        inputelement = document.getElementById("cover_equip");
        if(inputelement.value==1||inputelement.value==0){
            let equipsTypes=[];
            options = {
                method: 'GET',
                // url: 'http://47.94.10.119:20008/ResourceCategory/getResource,
                url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",
                params: {objectType: 'equip'}
            };
            // let that=this;
            this.$axios.request(options).then(function (response) {
                response.data.forEach(item=>{
                    equipsTypes.push(item["objectName"]);
                })
                // console.log(equipsTypes);
                for(var i=0;i<that.device_markers.length;i++){
                    // console.log(that.device_markers[i].type)
                    if(equipsTypes.indexOf(that.device_markers[i].type) != -1){
                        // console.log("true");
                        for(var j=0;j<that.device_markers[i].covers.length;j++){
                            that.map.remove(that.device_markers[i].covers[j].marker);
                        }
                        that.device_markers[i].covers=[];
                    }  
                }
            }).catch(function (error) {
                // console.error(error);
            });
            this.detectedVehicle_markers.forEach(marker=>{
                this.map.remove(marker);
            })
            this.detectedVehicle_markers=[];
            clearInterval(this.covEquipInterval);
            inputelement.value=0;
            inputelement.checked=0;
        }
        //                                                                              清除火点图标
        inputelement = document.getElementById("cover_fire_point");
        if(inputelement.value==1||inputelement.value==0){
            for(var i=0;i<that.device_markers.length;i++){
            // console.log(that.device_markers[i].type)
            if(that.device_markers[i].type=="火苗"){
                // console.log("true");
                for(var j=0;j<that.device_markers[i].covers.length;j++){
                    that.map.remove(that.device_markers[i].covers[j].marker);
                }
                that.device_markers[i].covers=[];
            }
            this.detectedFire_markers.forEach(marker=>{
                this.map.remove(marker);
            })
            this.detectedFire_markers=[];
            inputelement.value=0;
            inputelement.checked=0;
        }
        }
        for(var j=0;j<this.iconRipple_markers.length;j++){
                this.map.remove(this.iconRipple_markers[j]);
            }
        this.iconRipple_markers=[];
        
        //                                                                              关闭火线
        inputelement = document.getElementById("cover_fire_line");
        if(inputelement.value==1||inputelement.value==0){
            this.showSituation();
            inputelement.value=0;
            inputelement.checked=0;
        }
      },
      removeAllRippleMarkers(){
        // console.log("removeAllRippleMarkers");
        for(var j=0;j<this.iconRipple_markers.length;j++){
                this.map.remove(this.iconRipple_markers[j]);
            }
        this.iconRipple_markers=[];
      },
      showCoverClick(e){    
        // console.log(e.currentTarget);
        if(e.currentTarget.value==1){
            //取消选中，删除覆盖物
            e.currentTarget.value=0;
            e.currentTarget.checked=0;
            var options=null;
            let that=this;
            switch(e.currentTarget.id){
                case 'cover_person':
                    let personTypes=[];
                    options = {
                        method: 'GET',
                        url: this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",
                        params: {objectType: 'person'}
                    };
                    this.$axios.request(options).then(function (response) {
                        response.data.forEach(item=>{
                            personTypes.push(item["objectName"]);
                        })
                        // console.log(equipsTypes);
                        for(var i=0;i<that.device_markers.length;i++){
                            // console.log(that.device_markers[i].type)
                            if(personTypes.indexOf(that.device_markers[i].type) != -1){
                                // console.log("true");
                                for(var j=0;j<that.device_markers[i].covers.length;j++){
                                    that.map.remove(that.device_markers[i].covers[j].marker);
                                }
                                that.device_markers[i].covers=[];
                            }  
                        }
                    }).catch(function (error) {
                        // console.error(error);
                    });
                    this.detectedPerson_markers.forEach(marker=>{
                        this.map.remove(marker);
                    })
                    this.detectedPerson_markers=[];
                    break;
                case 'cover_equip':
                    // console.log("关闭equip覆盖物")
                    let equipsTypes=[];
                    options = {
                        method: 'GET',
                        url: this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",
                        params: {objectType: 'equip'}
                    };
                    // let that=this;
                    this.$axios.request(options).then(function (response) {
                        response.data.forEach(item=>{
                            equipsTypes.push(item["objectName"]);
                        })
                        // console.log(equipsTypes);
                        for(var i=0;i<that.device_markers.length;i++){
                            // console.log(that.device_markers[i].type)
                            if(equipsTypes.indexOf(that.device_markers[i].type) != -1){
                                // console.log("true");
                                for(var j=0;j<that.device_markers[i].covers.length;j++){
                                    that.map.remove(that.device_markers[i].covers[j].marker);
                                }
                                that.device_markers[i].covers=[];
                            }  
                        }
                    }).catch(function (error) {
                        // console.error(error);
                    });
                    this.detectedVehicle_markers.forEach(marker=>{
                        this.map.remove(marker);
                    })
                    this.detectedVehicle_markers=[];
                    
                    break;
                case 'cover_fire_point':
                    // let equipsTypes=[];
                    // options = {
                    //     method: 'GET',
                    //     url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
                    //     params: {objectType: 'equip'}
                    // };
                    // let that=this;
                    // this.$axios.request(options).then(function (response) {
                    //     response.data.forEach(item=>{
                    //         equipsTypes.push(item["objectName"]);
                    //     })
                        // console.log(equipsTypes);
                    for(var i=0;i<that.device_markers.length;i++){
                        // console.log(that.device_markers[i].type)
                        if(that.device_markers[i].type=="火苗"){
                            // console.log("true");
                            for(var j=0;j<that.device_markers[i].covers.length;j++){
                                that.map.remove(that.device_markers[i].covers[j].marker);
                            }
                            that.device_markers[i].covers=[];
                        }  
                    }
                    // }).catch(function (error) {
                    //     // console.error(error);
                    // });
                    break;
                case 'cover_fire_line':
                    // console.log("cover_fire_line");
                    this.showSituation();
                    break;
                case 'cover_fire_heatmap':
                    // console.log("cover_fire_line");
                    this.showHeatMap();
                    break;
            }
        }else{
            //选中，渲染覆盖物
            e.currentTarget.value=1;
            switch(e.currentTarget.id){
                case 'cover_person':
                    // console.log("cover_person");
                    this.getCovPerson();
                    break;
                case 'cover_equip':
                    this.getCovEquip();
                    break;
                case 'cover_fire_point':
                    this.getCovFirepoint();
                    break;
                case 'cover_fire_line':
                    // console.log("cover_fire_line");
                    this.showSituation();
                    break;
                case 'cover_fire_heatmap':
                    // console.log("cover_fire_line");
                    this.showHeatMap();
                    break;
            }
        }
      },
      showCoverClickTimer(e){
        if(e.currentTarget.value==1){
            e.currentTarget.value=0;
            e.currentTarget.checked=0;
            switch(e.currentTarget.id){
                case 'cover_person':
                    let personTypes=[];
                    var options = {
                        method: 'GET',
                        // url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
                        url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",
                        params: {objectType: 'person'}
                    };
                    this.$axios.request(options).then(response => {
                        response.data.forEach(item=>{
                            personTypes.push(item["objectName"]);
                        })
                        // console.log(equipsTypes);
                        for(var i=0;i<this.device_markers.length;i++){
                            // console.log(that.device_markers[i].type)
                            if(personTypes.indexOf(this.device_markers[i].type) != -1){
                                // console.log("true");
                                for(var j=0;j<this.device_markers[i].covers.length;j++){
                                    this.map.remove(this.device_markers[i].covers[j].marker);
                                }
                                this.device_markers[i].covers=[];
                            }  
                        }
                    }).catch(function (error) {
                        // console.error(error);
                    });
                    this.detectedPerson_markers.forEach(marker=>{
                        this.map.remove(marker);
                    })
                    this.detectedPerson_markers=[];
                    clearInterval(this.covPeopleInterval);
                    this.removeAllRippleMarkers();
                    this.clearAllDetectedMarkers();


                break;
                case 'cover_equip':
                    // console.log("关闭equip覆盖物")
                    let equipsTypes=[];
                    options = {
                        method: 'GET',
                        // url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
                        url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",
                        params: {objectType: 'equip'}
                    };
                    // let that=this;
                    this.$axios.request(options).then((response)=> {
                        response.data.forEach(item=>{
                            equipsTypes.push(item["objectName"]);
                        })
                        // console.log(equipsTypes);
                        for(var i=0;i<this.device_markers.length;i++){
                            // console.log(that.device_markers[i].type)
                            if(equipsTypes.indexOf(this.device_markers[i].type) != -1){
                                // console.log("true");
                                for(var j=0;j<this.device_markers[i].covers.length;j++){
                                    this.map.remove(this.device_markers[i].covers[j].marker);
                                }
                                this.device_markers[i].covers=[];
                            }  
                        }
                    }).catch(function (error) {
                        // console.error(error);
                    });
                    this.detectedVehicle_markers.forEach(marker=>{
                        this.map.remove(marker);
                    })
                    this.detectedVehicle_markers=[];
                    clearInterval(this.covEquipInterval);
                    this.removeAllRippleMarkers();
                    this.clearAllDetectedMarkers();


                break;
            }
        }else{
            e.currentTarget.value=1;
            switch(e.currentTarget.id){
                case 'cover_person':
                    // console.log("cover_person");
                    this.getCovPerson();
                    this.covPeopleInterval=setInterval(this.getCovPerson,5000);
                    break;
                case 'cover_equip':
                    this.getCovEquip();
                    this.covEquipInterval=setInterval(this.getCovEquip,5000);
                    break;
            }
        }
      },
      showCoverMenu(e){
        this.changeSelected(e);
        this.cover_info_show=!this.cover_info_show;
        if(this.cover_info_show){
            document.getElementsByClassName('cover-info')[0].style.zIndex=1025;
        }else{
            document.getElementsByClassName('cover-info')[0].style.zIndex=-1;
        }
      },
      getCovPerson(){
        // console.log("执行了一次getCovPerson")
        let personTypes=[];
        var options = {
            method: 'GET',
            // url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
            url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",
            params: {objectType: 'person'}
        };
        this.$axios.request(options).then( (response) => {
            console.log(response)
            response.data.forEach(item=>{
                personTypes.push(item["objectName"]);
            })
            // console.log(equipsTypes);
            for(var i=0;i<this.device_markers.length;i++){
                // console.log(that.device_markers[i].type)
                if(personTypes.indexOf(this.device_markers[i].type) != -1){
                    // console.log("true");
                    for(var j=0;j<this.device_markers[i].covers.length;j++){
                        this.map.remove(this.device_markers[i].covers[j].marker);
                    }
                    this.device_markers[i].covers=[];
                }  
            }
            // console.log(personTypes);
            this.detectedPerson_markers.forEach(marker=>{
                this.map.remove(marker);
            })
            this.detectedPerson_markers=[];

            var optionss = {
                method: 'GET',
                url: this.$HPCNServerURL+":20008/SituationDisplay/getPersonPosition",
                params: {page: '1', pagenum: '-1'}
            };
            // console.log("11111111")
            this.$axios.request(optionss).then(response=> {
                // console.log(response)
                for(var i=0;i<response.data.length;i++){
                    var item=response.data[i];
                    var index=-1;
                    if(item.status=='待命中'){
                        continue;
                    }
                    for(index=0; index<this.device_markers.length; index++){
                        if(item.type==this.device_markers[index].type)break;
                    }
                    // 不存在该类型设备/在设备库中新添了一类object，且当前元素属于该类，此时this.device_markers不存在该类别，更新。
                    if(index==this.device_markers.length){
                        // 更新
                        this.initDevicesRemain();
                        // 重新执行,
                        this.getCovPerson();
                        // 强制终止，防止无限递归
                        return ;
                    }
                    item["model"]="";
                    this.addIcon(this.device_markers[index].iconImgUrl,[item["longitude"],item["latitude"]],28,28,item.info,item.id,item.status,item.type,item.model,"person");
                }
            }).catch(function (error) {
                console.error(error);
            });
            optionss = {
                method: 'GET',
                url: this.$HPCNServerURL+":20008//TargetDetection//getObject",
                params: {type: 'person'}
            };

            this.$axios.request(optionss).then(res=> {
                console.log(res);
                var detectedPersonImgUrl="/src/images/Scene/ren.png";
                res.data.forEach(person =>{
                    // this.addIconRipple([person["longitude"],person["latitude"]]);
                    this.addIconDetectedObject(detectedPersonImgUrl,[person.longitude,person.latitude],25,25,person.id,person['type'],'人员_目标检测所得',null,person["oss_img_path"]);
                })
            }).catch(function (error) {
            });
        }).catch(function (error) {
            // console.error(error);
        });
        

        
      },
      getCovAircraft(){
        const options = {
            method: 'GET',
            // url: 'http://proj23.emr-c.com/SituationDisplay/getUAVPosition',
            url:this.$HPCNServerURLWithPort+"/SituationDisplay/getUAVPosition",
            params: {page: '1', pagenum: '-1'}
        };
        this.$axios.request(options).then(response=> {
            for(var i=0;i<response.data.length;i++){
                var item=response.data[i];
                var index=-1;
                if(item.status=='待命中'){
                    continue;
                }
                for(index=0; index<this.device_markers.length; index++){
                    if(item.type==this.device_markers[index].type)break;
                }
                item["model"]="";
                this.addIcon(this.device_markers[index].iconImgUrl,[item["longitude"],item["latitude"]],28,28,item.info,item.id,item.status,item.type,item.model,"equip");
            }
        }).catch(function (error) {
            console.error(error);
        });
      },
      getCovEquip(){

        // console.log("关闭equip覆盖物")
        let equipsTypes=[];
        var options = {
            method: 'GET',
            // url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
            url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",

            params: {objectType: 'equip'}
        };
        // let that=this;
        this.$axios.request(options).then( (response) => {
            response.data.forEach(item=>{
                equipsTypes.push(item["objectName"]);
            })
            // console.log(equipsTypes);
            for(var i=0;i<this.device_markers.length;i++){
                // console.log(that.device_markers[i].type)
                if(equipsTypes.indexOf(this.device_markers[i].type) != -1){
                    // console.log("true");
                    for(var j=0;j<this.device_markers[i].covers.length;j++){
                        this.map.remove(this.device_markers[i].covers[j].marker);
                    }
                    this.device_markers[i].covers=[];
                }  
            }
            this.detectedVehicle_markers.forEach(marker=>{
                this.map.remove(marker);
            })
            this.detectedVehicle_markers=[];

            var optionss = {
                method: 'GET',
                // url: 'http://proj23.emr-c.com/SituationDisplay/getDevicePosition',
                url:this.$HPCNServerURLWithPort+"/SituationDisplay/getDevicePosition",
                params: {page: '1', pagenum: '-1'}
            };
            this.$axios.request(optionss).then(response=> {  
                console.log(response);
                for(var i=0;i<response.data.length;i++){
                    var item=response.data[i];
                    var index=-1;
                    if(item.status=='待命中'){
                        continue;
                    }
                    for(index=0; index<this.device_markers.length; index++){
                        if(item.type==this.device_markers[index].type)break;
                    }
                    if(index==this.device_markers.length){
                        // 更新
                        this.initDevicesRemain();
                        // 重新执行,
                        this.getCovEquip();
                        // 强制终止，防止无限递归
                        return ;
                    }
                    item["model"]="";
                    // console.log(item.type);
                    this.addIcon(this.device_markers[index].iconImgUrl,[item["longitude"],item["latitude"]],28,28,item.info,item.id,item.status,item.type,item.model,"equip");
                    
                }
            }).catch(function (error) {
                console.error(error);
            });

            optionss = {
                method: 'GET',
                url: this.$HPCNServerURL+":20008//TargetDetection//getObject",
                params: {type: 'car'}
            };

            this.$axios.request(optionss).then(res=> {
                console.log(res);
                var detectedPersonImgUrl="/src/images/Scene/detectedcar.png";
                res.data.forEach(equip =>{
                    // console.log(equip);
                    // this.addIconRipple([equip["longitude"],equip["latitude"]]);
                    this.addIconDetectedObject(detectedPersonImgUrl,[equip.longitude,equip.latitude],25,25,equip.id,equip.type,'车辆_目标检测所得',null,equip["oss_img_path"]);
                    // this.$parent.addIconDetectedObject(detectedImgUrl,[object.longitude,object.latitude],25,25,object.id,object['type'],'人员_目标检测所得',null,object["oss_img_path"]);
                })
                // console.log(res.data);
            }).catch(function (error) {
                // console.error(error);
            });

        }).catch(function (error) {
            // console.error(error);
        });
      },
      testAddIcon(){
        var detectedImgUrl="/src/images/Scene/ren.png";
        this.addIconDetectedObject(detectedImgUrl,[116.3575,39.961657],25,25,999,'人员_目标检测所得','人员_目标检测所得',null,"oss");
      },
      getCovFirepoint(){
        var iconImgUrl="/src/images/Scene/huomiao.png"
        const options = {
            method: 'GET',
            // url: 'http://proj23.emr-c.com/getFirePoint',
            url:this.$HPCNServerURLWithPort+"/getFirePoint",
            params: {status:'进行中'}
        };
        this.$axios.request(options).then(response=> {  
            console.log(response);
            for(var i=0;i<response.data.length;i++){
                var item=response.data[i];
                var index=-1;
                // if(item.status=='待命中'){
                //     continue;
                // }
                for(index=0; index<this.device_markers.length; index++){
                    if(this.device_markers[index].type=="火苗")break;
                }
                item["model"]="";
                // console.log(item.type);
                // console.log(this.device_markers[index].iconImgUrl);
                // this.addIcon(this.device_markers[index].iconImgUrl,[item["lng"],item["lat"]],24,24,item.info,item.id,item.status,"火苗",item.model,"fire");
                this.addIcon(iconImgUrl,[item["lng"],item["lat"]],24,24,item.info,item.id,item.status,"火苗",item.model,"fire");

            }
        }).catch(function (error) {
            console.error(error);
        });
      },
      initDevicesRemain(){
        let options = {
            method: 'GET',
            // url: 'http://47.94.10.119:20008/ResourceCategory/getResource'
            url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",

        };

        this.$axios.request(options).then(res => {
            // {type:'xiaofangche',covers:[],remain:0}
            res.data.forEach(item => {
                let i =0;
                for(i = 0;i< this.device_markers.length;i++){
                    if(this.device_markers[i].type==item["objectName"])
                    // device_markers存在当前种类，跳过
                        break;
                }
                // device_markers不存在当前种类设备/人/火
                if(i==this.device_markers.length){
                    let newDeviceType={};
                    newDeviceType["type"]=item["objectName"];
                    newDeviceType["iconImgUrl"]=item["imgUrl"];
                    newDeviceType["covers"]=[];
                    newDeviceType["remain"]=item["availableCount"];
                    this.device_markers.push(newDeviceType);
                }
            })
            // console.log(this.device_markers);
        }).catch(function (error) {
            console.error(error);
        });

        // options = {
        //     method: 'GET',
        //     url: 'http://proj23.emr-c.com/SituationDisplay/getAmbulancePosition',
        //     params: {page: '1', pagenum: '-1'}
        // };
        // let that=this;
        // this.$axios.request(options).then(function (response) {
        //     for(var i=0;i<response.data.length;i++){
        //         var item=response.data[i];
        //         // console.log(item.type);
        //         if(item.status=='待命中'){
        //             switch(item.type){
        //                 case '救护车':
        //                     that.device_markers[1].remain++;
        //                     break;
        //                 case '消防车':
        //                     that.device_markers[0].remain++;
        //                     break;
        //                 default:break;
        //             }   
        //             continue;
        //         }
        //     }
        // });
        // options = {
        //     method: 'GET',
        //     url: 'http://proj23.emr-c.com/SituationDisplay/getUAVPosition',
        //     params: {page: '1', pagenum: '-1'}
        // };
        // this.$axios.request(options).then(function (response) {
        //     for(var i=0;i<response.data.length;i++){
        //         var item=response.data[i];
        //         // console.log(item.type);
        //         if(item.status=='待命中'){
        //             switch(item.type){
        //                 case '无人机':
        //                     that.device_markers[3].remain++;
        //                     break;
        //                 case '直升机':
        //                     that.device_markers[2].remain++;
        //                     break;
        //                 default:break;
        //             }   
        //             continue;
        //         }
        //     }
        // });
        // options = {
        //     method: 'GET',
        //     url: 'http://proj23.emr-c.com/SituationDisplay/getPersonPosition',
        //     params: {page: '1', pagenum: '-1'}
        // };
        // this.$axios.request(options).then(function (response) {
        //     for(var i=0;i<response.data.length;i++){
        //         var item=response.data[i];
        //         // console.log(item.type);
        //         if(item.status=='待命中'){
        //             switch(item.type){
        //                 case '消防员':
        //                     that.device_markers[9].remain++;
        //                     break;
        //                 case '医疗人员':
        //                     that.device_markers[7].remain++;
        //                     break;
        //                 default:break;
        //             }   
        //             continue;
        //         }
        //     }
        // });
      },
      getEquipsTypeList(){
        this.equipsTypes=[];
        const options = {
            method: 'GET',
            // url: 'http://47.94.10.119:20008/ResourceCategory/getResource',
            url:this.$HPCNServerURLWithPort+"/ResourceCategory/getResource",

            params: {objectType: 'equip'}
        };
        let that=this;
        this.$axios.request(options).then(function (response) {
            response.data.forEach(item=>{
                that.equipsTypes.push(item["objectName"]);
            })
        }).catch(function (error) {
            // console.error(error);
        });
	  },
      initPolyline(){
        var path1 = [
            [116.453322, 39.920255],
            [116.460703, 39.897555],
            [116.452292, 39.892353],
            [116.439846, 39.891365]
        ];
        var path2 = [
            [116.403322, 39.920255],
            [116.410703, 39.897555],
            [116.402292, 39.892353],
            [116.389846, 39.891365]
        ]
        var paths=[]
        paths.push(path1);
        paths.push(path2);
        var polylines = new AMap.Polyline({
            path: paths,
            strokeColor: "green",
            strokeWeight: 6,
            strokeOpacity: 0.9,
            zIndex: 50,
            bubble: true,
        })
        this.map.add(polylines);
        this.map.setCenter([116.453322, 39.920255]);
        // var polyEditor=new this.AMap.PolylineEditor(this.map,polyline1)
        // paths 存在PolylineEditor.singleLineListHandler.list.path  list:Array[n] n个path ;path:Array[m] 每个path下面的坐标序列 数组

        this.polyEditor.setTarget(polylines);
        console.log(this.polyEditor);
        this.polyEditor.open();
      },
      drawPolyline(){
        var firePointImgUrl="http://ossfile.hpcner.com/resource_icon/fire/huomiao.png?Expires=1680605536&OSSAccessKeyId=LTAI5tLLj9yWk9K9xtqsaVSf&Signature=1fZyNMh7Pcty2XmFmbuhw4R8%2BHs%3D";
        const options = {
            method: 'GET',
            // url: 'http://47.94.10.119:20008//FireLine/getFireLine'
            url:this.$HPCNServerURLWithPort+"/FireLine/getFireLine",
        };

        this.$axios.request(options).then( res => {
            // console.log(res.data);
            this.allFireLinePaths=[];
            this.fireLinePointMarkers=[];
            var firePointImgUrl ='/src/images/Scene/firelinefire.png';
            res.data.forEach( fire_line =>{
                // 将所有火线火点坐标保存下来
                // 将火线id存储到this.fireLinePointMarkers里
                var fireLinePointsPath = [];
                // var fireLineId=fire_line["fire_line_id"];
                 
                // 绘制曲线并添加火线火点图标
                fire_line.location.forEach(fire_point => {
                    // console.log(fire_point);
                    fireLinePointsPath.push(new this.AMap.LngLat(fire_point.longitude,fire_point.latitude));
                    // 调用时传火线id，在addIcon里面将新添加的marker添加到对应的 fireLinePointMarkers 里面
                    this.addIcon(firePointImgUrl,[fire_point.longitude,fire_point.latitude],25,25,null,null,null,"火线火点",null,'fire',null)
                    // this.addIcon(firePointImgUrl,[fire_point.longitude,fire_point.latitude],33,33,null,fireLineId,null,"火线火点",null)
                })
                this.allFireLinePaths.push(fireLinePointsPath);
                
            })
            // 创建折线实例
            this.allPolylines = new this.AMap.Polyline({
                // 所有的火线都存储在一个polyline对象里,只有这样才能在polylineEditor里统一编辑。
                path: this.allFireLinePaths,  
                borderWeight: 10, // 线条宽度，默认为 1
                strokeColor: 'red', // 线条颜色
                lineJoin: 'round' ,// 折线拐点连接处样式
                isOutline: true,
                outlineColor: '#ffeeff',
                borderWeight: 2,
                // strokeColor: "#3366FF",
                strokeOpacity: 0.5,
                strokeWeight: 6,
                // 折线样式还支持 'dashed'
                strokeStyle: "dashed",
                // strokeStyle是dashed时有效
                strokeDasharray: [15, 5],
                // lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
                // draggable:true,
            });
            this.polyEditor.setTarget(this.allPolylines);
            // console.log("第一次调用 drawPolyline 接口后的polyEditor");
            // console.log(this.polyEditor);
            // console.log("此时_poly属性包含数据库传来的初始火线")
            this.map.add(this.allPolylines);
            // 将折线添加至地图实例
                // var polyLineObj={};
                // polyLineObj["fireLineId"]=fireLineId;
                // polyLineObj["polyLine"]=polyLine;
                // this.polylines.push(polyLineObj);
                // this.map.add(polyLine);
        }).catch(function (error) {
            console.error(error);
        });
      },
      createPolyline(){
        this.chooseEdit=true;
        this.beforeSavePolyEditor="createPolyline";
        this.newPolyline=null;
        let that=this;
        // this.polyEditor.on('add',function(data){
        //     console.log("触发了新增火线事件，新增的polyline：")
        //     console.log(data.target);
        //     that.newPolyline=data.target;
        // });
        this.polyEditor.setTarget();
        this.polyEditor.open();
        // _poly.$x[0] :Arrays[n] 对应着新编辑的5个点
      },
      savePolyEditor(){
        // if(!this.newPolyline)return;
        this.polyEditor.close();
        if(this.beforeSavePolyEditor == "editPolyline"){
            var path=[]
            this.map.remove(this.allPolylines);
            this.allFireLinePaths=[];
            if(this.newPolyline.$x){
                this.newPolyline.$x.forEach( polyline => {
                    // console.log(point);
                    path=[];
                    polyline.forEach(point =>{
                        path.push(new this.AMap.LngLat(point[0],point[1]))
                    }) 
                    this.allFireLinePaths.push(path);
                })
                
            }
            
            this.allPolylines = new this.AMap.Polyline({
                // 所有的火线都存储在一个polyline对象里,只有这样才能在polylineEditor里统一编辑。
                path: this.allFireLinePaths,  
                borderWeight: 10, // 线条宽度，默认为 1
                strokeColor: 'red', // 线条颜色
                lineJoin: 'round' ,// 折线拐点连接处样式
                isOutline: true,
                outlineColor: '#ffeeff',
                borderWeight: 2,
                // strokeColor: "#3366FF",
                strokeOpacity: 0.5,
                strokeWeight: 6,
                // 折线样式还支持 'dashed'
                strokeStyle: "dashed",
                // strokeStyle是dashed时有效
                strokeDasharray: [15, 5],
                // lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
            });
            // console.log(this.allPolylines);
            this.map.add(this.allPolylines);
            // console.log(this.polyEditor)
            // _poly.$x[0] :Arrays[n] 对应着新编辑的5个点
            // 调用添加火线接口将其添加到数据库之中
            this.newPolyline=null;
        }else if(this.beforeSavePolyEditor == "createPolyline"){
            var path=[];
            this.map.remove(this.newPolyline);
            this.map.remove(this.allPolylines);
            this.newPolyline.$x[0].forEach( point => {
                // console.log(point);
                path.push(new this.AMap.LngLat(point[0],point[1]));
            })
            this.allFireLinePaths.push(path);
            this.allPolylines = new this.AMap.Polyline({
                // 所有的火线都存储在一个polyline对象里,只有这样才能在polylineEditor里统一编辑。
                path: this.allFireLinePaths,  
                borderWeight: 10, // 线条宽度，默认为 1
                strokeColor: 'red', // 线条颜色
                lineJoin: 'round' ,// 折线拐点连接处样式
                isOutline: true,
                outlineColor: '#ffeeff',
                borderWeight: 2,
                // strokeColor: "#3366FF",
                strokeOpacity: 0.5,
                strokeWeight: 6,
                // 折线样式还支持 'dashed'
                strokeStyle: "dashed",
                // strokeStyle是dashed时有效
                strokeDasharray: [15, 5],
                // lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
            });
            // console.log(this.allPolylines);
            this.map.add(this.allPolylines);
            this.newPolyline=null;
        }
        this.beforeSavePolyEditor = "savePolyEditor";
        this.chooseCreate=false;
        this.chooseEdit=false;
      },
      saveAndExitPolyEditor(){
        if(this.beforeSavePolyEditor != "savePolyEditor"){
            this.$message.error("请 暂存编辑 后再退出");
            return ;
        }
        // console.log(this.allFireLinePaths);
        // return ;
        const options = {
            method: 'POST',
            // url: 'http://proj23.emr-c.com/FireLine/reset',
            url: this.$HPCNServerURLWithPort+"/FireLine/reset",
            headers: {'content-type': 'application/json'},
            data: this.allFireLinePaths,
        };
        let that=this;
        this.$axios.request(options).then(res=> {
            // console.log(response.data);
            var firePointImgUrl ='/src/images/Scene/firelinefire.png'
            if(res.status=="200"){
                // this.situation_show=false;
                this.showFilelineEditiorMenu=false;
                this.$message.success("保存成功");
                this.newPolyline=null;
                this.allFireLinePaths.forEach(fireline =>{
                    fireline.forEach(firepoint=>{
                        // console.log(firepoint);
                        this.addIcon(firePointImgUrl,[firepoint.lng,firepoint.lat],25,25,null,null,null,"火线火点",null,'fire',null)
                        // addIcon(imgType,position,width,height,info,id,status,type,model,objType,angle)
                    })
                } )
                this.showFilelineEditiorMenu=false;
            }else{
                this.$message.error("火线同步异常")
            }
            // that.situation_show=fasle;
        }).catch(function (error) {
            console.error(error);
        });
      },
      editPolyline(){
        this.chooseCreate=true;
        this.beforeSavePolyEditor="editPolyline";
        this.polyEditor.setTarget(this.allPolylines);
        this.polyEditor.open();
      },
      InfoWindowTimeDown(){
        // console.log("执行了InfoWindowTimeDown")
        this.autoCloseInfoWindowTime--;
        if(this.autoCloseInfoWindowTime==0){
            this.closeInfoWindow();
            return ;
        }
        this.autoCloseInfoWindowTimer = setTimeout(this.InfoWindowTimeDown, 1000);
      },
      showSchemeCoopFire(){
        this.schemeCoopFire_show=!this.schemeCoopFire_show;
        if(this.schemeCoopFire_show){
            // this.$refs.scheme-coop-small-goal.changeShow();
            if(this.schemeCoopSmallGoal_show){
                this.$refs.scheme_coop_small_goal.changeShow();
            }
        }
      },
      showSchemeCoopSmallGoal(){
        this.schemeCoopSmallGoal_show=!this.schemeCoopSmallGoal_show;
        if(this.schemeCoopSmallGoal_show){
            if(this.schemeCoopFire_show){
                this.$refs.scheme_coop_fire.changeShow();
            }
        }
      },
      showSchemeEdgeFire(){
        this.schemeEdgeFire_show=!this.schemeEdgeFire_show;
        if(this.schemeEdgeFire_show){
            if(this.schemeEdgeSmallGoal_show){
                this.$refs.scheme_edge_small_goal.changeShow();
            }
        }
      },
      showSchemeEdgeSmallGoal(){
        this.schemeEdgeSmallGoal_show=!this.schemeEdgeSmallGoal_show;
        if(this.schemeEdgeSmallGoal_show){
            if(this.schemeEdgeFire_show){
                this.$refs.scheme_edge_fire.changeShow();
            }
        }
      },
      showTargetRecogGlobal(){
        this.description = "AI灾情感知-目标识别-实时目标识别";
        this.targetRecogGlobal_show =!this.targetRecogGlobal_show;
        setTimeout(() => {
            
        }, 500);
        if(this.targetRecogGlobal_show){
            document.getElementsByClassName('bounce-frame-global-target-recog')[0].style.zIndex=1025;
            // 解决互斥 目标识别检测视频-对象，关闭，清除图标，清除定时器
            if(this.detectedImg_show){
                // 关闭弹窗
                document.getElementsByClassName('bounce-frame-right-img')[0].style.zIndex=-1;
                // 清除图标
                clearInterval(this.getDetectedImgInterval);
            }
            if(this.targetRecogHistory_show){
                this.targetRecogHistory_show = false;
                // 关闭目标识别历史弹窗
                document.getElementsByClassName('bounce-frame-history-target-recog')[0].style.zIndex=-1;
                // 清除 目标识别历史vue组件的定时器任务
                this.$refs.history_target_recog_vue.clearInterval();
            }
            
            let that=this;
            // this.getDetectedImgInterval=setInterval(function(){that.$refs.detectedImgVue.getDetectedImgVueByMarkerId(markerId);},1000);
        }else{
            // console.log("关闭窗口") 清除定时器
            document.getElementsByClassName('bounce-frame-global-target-recog')[0].style.zIndex=-1;
            // clearInterval(this.getDetectedImgInterval);
        }
      },
      showTargetRecogHistory(){
        this.description = "AI灾情感知-目标识别-目标识别历史";
        this.targetRecogHistory_show=!this.targetRecogHistory_show;

        setTimeout(() => {
            
        }, 500);
        if(this.targetRecogHistory_show){
            document.getElementsByClassName('bounce-frame-history-target-recog')[0].style.zIndex=1025;
            // 解决互斥 目标识别检测视频-对象，,目标检测全局 关闭，清除图标，清除定时器
            if(this.detectedImg_show){
                // 关闭对象目标识别弹窗
                document.getElementsByClassName('bounce-frame-right-img')[0].style.zIndex=-1;
                // 清除图标
                clearInterval(this.getDetectedImgInterval);
            }
            if(this.targetRecogGlobal_show){
                this.targetRecogGlobal_show = false;
                // 关闭全局目标识别弹窗
                document.getElementsByClassName('bounce-frame-global-target-recog')[0].style.zIndex=-1;
                // 清除 全局目标识别vue组件的定时器任务
                this.$refs.global_target_recog_vue.clearInterval();
            }
            
            let that=this;
            // this.getDetectedImgInterval=setInterval(function(){that.$refs.detectedImgVue.getDetectedImgVueByMarkerId(markerId);},1000);
        }else{
            // console.log("关闭窗口") 清除定时器
            document.getElementsByClassName('bounce-frame-history-target-recog')[0].style.zIndex=-1;
            // clearInterval(this.getDetectedImgInterval);
        }
      },



      showd3frameData(){
        this.d3fameData_show=!this.d3fameData_show;
      },
      showd3frame(){
        this.d3frame_show =! this.d3frame_show;
        console.log(this.d3_srt)
        console.log(this.d3_srt['Euler'])
        console.log(this.Coords['MODEL'])
        //this.$refs.d3frame.setSRT(this.d3_srt)
        //this.$refs.d3frame.setRotation(this.d3_srt['Euler'])
        //this.$refs.d3frame.Coords = this.Coords['MODEL']

        if(this.d3frame_show)
        {

            document.getElementsByClassName('d3frame-class')[0].style.zIndex=1025;
        }
        else{
            document.getElementsByClassName('d3frame-class')[0].style.zIndex=-1;
        }

      },
      d3_clickE(){
        // this.d3frame_click_event=true;
        this.$refs.d3frame.d3frame_click_event=!this.$refs.d3frame.d3frame_click_event;
        if(this.$refs.d3frame.d3frame_click_event){
            alert('开始取点')
        }
        else{
            alert('停止取点')
        }

      }
      ,
      d3_showbutton(){
        this.d3_btn_show=true;
        function lonlatToMercator(lonlat){
            var mercator = [0,0];
            
            let x = lonlat[0] * 20037508.34 / 180;
            let y = Math.log(Math.tan((90 + lonlat[1]) * Math.PI / 360)) / (Math.PI / 180);
            
            y = y * 20037508.34 / 180;
            
            mercator[0] = x;
            mercator[1]= y;
            
            return mercator;
        };
        function swap(ls,l1,l2)
        {
            
            tmp = ls[l1];
            ls[l1] = ls[l2];
            ls[l2] = tmp;
        }
        this.Coords = {
            
            'MODEL':[//123,213 ,321,231,132,312
                //[0,0,0],
                //[1,0,0], 
                //[0,2,0]
            //[0.521688,-0.547792,1.217831], 
            
            //[0.321315,0.631059,1.260130],
            //[0.740842,0.690823,1.371026]
            [0.321315,0.631059,1.260130],
            [0.740842,0.690823,1.371026],
            [0.521688,-0.547792,1.217831],
            [1.202344,-0.507633,1.371081]
            ],
            'SEKAI':[
                //[115.726249,39.88128,300],
                //[115.729573,39.881349,300],
                //[115.726644,39.885585,300]
                //[114.6061, 39.911221,-699.816902757842854043701663613],

                [114.573737, 39.704995,-1590.0780987944890512153506279],
                [114.582893, 39.700325,-2198.46124324299671570770442486],
                [114.592344, 39.726422,-1705.64769582444841944379732013],
                [114.607996, 39.719933,-2616.88123627788809244520962238]

            ]
        }
        var customCoords = this.map.customCoords

        
        for(var i=0;i<4;i++)
        {
            var tmp = lonlatToMercator([this.Coords['SEKAI'][i][0],this.Coords['SEKAI'][i][1]])//customCoords.lngLatsToCoords([Coords['SEKAI'][i][0],Coords['SEKAI'][i][1]])[0]

            this.Coords['SEKAI'][i][0]=tmp[0]
            this.Coords['SEKAI'][i][1]=tmp[1]
        }
        let that = this

        
        this.$axios.post('http://47.94.10.119:20007/rtmat',this.Coords).then(function (response) {
            that.d3_srt=response
        }).catch(function (error) {
            console.log(error);
        });
        this.d3_model_src='/static/modelSample/Sampel/Duck/Duck.gltf';//'/static/modelSample/Sampel/S/modelDraco.gltf';
        this.d3_model_src='/static/modelSample/Sampel/house/modelDraco.gltf';


      },
      
      d3_closeModel(){
            this.map.remove(this.gllayer);
            this.d3_btn_show=false;
            this.d3_model_show=false;
            this.d3frame_click_event=false;
      },
      d3_showModel(){
            
            var Coords = {
                'MODEL':[
                [0.321315,0.631059,1.260130],
                [0.740842,0.690823,1.371026],
                [0.521688,-0.547792,1.217831],
                [1.202344,-0.507633,1.371081]
                ]};

            var scene;
            // 数据转换工具
            var customCoords = this.map.customCoords;
            // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
            var trans = [this.d3_srt['Transition'][0],this.d3_srt['Transition'][1],this.d3_srt['Transition'][2]]//[12752000.257 , 4825137.1484, 3600.0106]
            var PositionMoc = [trans[0], trans[1]];
            var PositionLntLat = [this.map.coordsToLngLat(PositionMoc).lng,this.map.coordsToLngLat(PositionMoc).lat];

            customCoords.setCenter(PositionLntLat);
            this.map.setCenter(PositionLntLat);
            var Scale = this.d3_srt['Scale']/10;
            var rot = [this.d3_srt['Euler'][0],this.d3_srt['Euler'][1],this.d3_srt['Euler'][2]]//[178.2057,123.1923,-24.2622]//[178.20475605,12.18981162,-24.26333361]

            var rotxyz = {x:rot[0],y:rot[1],z:rot[2]}
            var hight =trans[2];
            var object;
            var objPosition = PositionLntLat;
            console.log(objPosition);
            function setRotation(rotation) {
                var x = Math.PI / 180 * ((rotation.x) || 0);
                var y = Math.PI / 180 * (rotation.y || 0);
                var z = Math.PI / 180 * (rotation.z || 0);
                object.rotation.set(x, y, z);
            }

            function setPosition(object,lnglat,height) {
                // 对模型的经纬度进行转换
                var position = customCoords.lngLatsToCoords([
                    lnglat
                ])[0];
                object.position.setX(position[0])
                object.position.setY(position[1])
                object.position.setZ(height)
            }
            function setAngle(angle) {
                var x = object.rotation.x;
                var z = object.rotation.z;
                var y = Math.PI / 180 * angle;
                object.rotation.set(x, y, z);
            }
            
            let that = this

            this.gllayer = new AMap.GLCustomLayer({
            // 图层的层级
                    zIndex: 10,
                    // 初始化的操作，创建图层过程中执行一次。
                    init: (gl) => {
                        // 这里我们的地图模式是 3D，所以创建一个透视相机，相机的参数初始化可以随意设置，因为在 render 函数中，每一帧都需要同步相机参数，因此这里变得不那么重要。
                        // 如果你需要 2D 地图（viewMode: '2D'），那么你需要创建一个正交相机
                        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1 << 30);

                        this.renderer = new THREE.WebGLRenderer({
                            context: gl,  // 地图的 gl 上下文
                            // alpha: true,
                            // antialias: true,
                            // canvas: gl.canvas,
                        });

                        
                        this.renderer.autoClear = false;
                        scene = new THREE.Scene();

                        
                        this.aLight = new THREE.AmbientLight(0xffffff);
                        this.dLight = new THREE.DirectionalLight(0xffffff, 1);
                        this.dLight.position.set(1000, -100, 900);
 
                        scene.add(this.dLight);
                        scene.add(this.aLight);
                        // var radius = 10, segemnt = 16, rings = 16;
                        // var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
                        // var sphere = new THREE.Mesh(
                        // new THREE.SphereGeometry(radius,segemnt,rings),
                        //     sphereMaterial
                        // );
                        // sphere.geometry.verticesNeedUpdate = true;
                        // sphere.geometry.normalsNeedUpdate = true;
                        // sphere.position.set(0,0,0);
                        // scene.add(sphere);
                        // scene.position.set(100,100,100)
                        // var s = that.d3_srt['Scale']
                        // var r = that.d3_srt['Rotation']
                        // var t =  that.d3_srt['Transition']
                        // for(var i=0;i<4;i++)
                        // {
                            
                            // var sobject = setSphere(Coords['MODEL'][i],s=s,r=r,t=t,that)
                            
                        //     //scene.add(sobject)
                        // }


 
                        var loader = new GLTFLoader();
                        loader.load(this.d3_model_src, (gltf) => {
                            object = gltf.scene;
                            object.scale.set(Scale,Scale, Scale);
                            //console.log(object.scale.set());

                            // console.log(222)
                            
                            setPosition(object,objPosition,hight);

                            scene.add(object);
                            setRotation(rotxyz);
                            this.map.render();
                        });
                        //console.log(1);
                    },
                    render: () => {
                        // 这里必须执行！！重新设置 three 的 gl 上下文状态。
                        this.renderer.resetState();
                        // 重新设置图层的渲染中心点，将模型等物体的渲染中心点重置
                        // 否则和 LOCA 可视化等多个图层能力使用的时候会出现物体位置偏移的问题
                        customCoords.setCenter(objPosition);
                        var { near, far, fov, up, lookAt, position } = customCoords.getCameraParams();

                        // 2D 地图下使用的正交相机
                        // var { near, far, top, bottom, left, right, position, rotation } = customCoords.getCameraParams();
                        //12757836.107562793 4796378.46177964 -3278.708044571506
                        // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
                        this.camera.near = near;
                        this.camera.far = far;
                        this.camera.fov = fov;
                        this.camera.position.set(...position);
                        this.camera.up.set(...up);
                        this.camera.lookAt(...lookAt);
                        this.camera.updateProjectionMatrix();
                        this.aLight.intensity = this.d3light_intensity;
                        // 2D 地图使用的正交相机参数赋值
                        // camera.top = top;
                        // camera.bottom = bottom;
                        // camera.left = left;
                        // camera.right = right;
                        // camera.position.set(...position);
                        // camera.updateProjectionMatrix();

                        this.renderer.render(scene, this.camera);

                        // 这里必须执行！！重新设置 three 的 gl 上下文状态。
                        this.renderer.resetState();
                        
                    },
                });
            //console.log(2);
            this.map.add(this.gllayer);
            this.d3_model_show=true;
            // function onWindowResize() { 
            //     this.camera.aspect = window.innerWidth / window.innerHeight; 
            //     this.camera.updateProjectionMatrix(); 
            //     this.renderer.setSize(window.innerWidth, window.innerHeight); 
            // } 
            // window.addEventListener('resize', onWindowResize);

            //this.map.remove(this.gllayer);
            //this.d3_btn_show=false;
      },
      d3_render(){
        this.map.render();
      },
      base_net_move_switch(){
        this.$refs.base_controller.display();
      },
      ShowInformation(){
        this.isShow = !this.isShow;
      }
    },
    mounted() {
      //挂载阶段调用，DOM初始化完成进行地图初始化
        this.initNav();
        this.initMap();
        this.initDevicesRemain();
        window.gaodeMap=this;
        window.onresize = () => {
            console.log('onResize');
			return (() => {
				window.screenWidth = document.body.clientWidth
				this.screenWidth = window.screenWidth
				window.fullHeight = document.documentElement.clientHeight
				this.fullHeight = window.fullHeight
			})()
		};	
        // window.mapp=this;
      //初始化this.device_markers[i].remain。
        if("type" in this.$route.query){//根据query参数设置界面的菜单选项
            if(this.$route.query.type=="net_move_compare"){
                setTimeout(()=>{
                    this.$refs.base_controller.is_compare=true;    
                    this.$refs.base_controller.display();
                },4000);
            }
        }
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
 
<style>
    
 </style>