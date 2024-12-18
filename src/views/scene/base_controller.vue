<template>
  <div class="base_controller">
    <div class="base-heat">
      <Base_heat ref="base_heat" :AMap="AMap" :map="map">
      </Base_heat>
    </div>
    <div class="base-line">
      <Base_line ref="base_line" :AMap="AMap" :map="map">
      </Base_line>
    </div>
    <div class="base-node">
      <Base_node ref="base_node" :AMap="AMap" :map="map">
      </Base_node>
    </div>
  </div>
</template>

<script>
import bus from './base_bus';
import Base_heat from './base_heat.vue';
import Base_line from './base_line.vue';
import Base_node from './base_node.vue';
import * as WGS2GCJ from './base_WGS2GCJ.js';
export default {
  name: "base_controller",
  components: {
    Base_heat,Base_line,Base_node
  },
  props: {
    AMap:Object,
    map:Object,
  },
  data() {
    return {
        base_icon_url:{
              'wurenji':"/src/images/Scene/wurenji.png",
              'ren':"/src/images/Scene/ren.png",
              'ren_inv':"/src/images/Scene/ren_inv.png",
              'ren_net':"/src/images/Scene/ren_net.png",
              'tar_wurenji':"/src/images/Scene/tar_wurenji.png",
              'video_tele':"/src/images/Scene/video_tele.png",
        },
        base_main_switch:false,
        base_figure_id:"",//表格显示哪个数据
        //scheme为方案，有null（没有选择）、com1（通信部署1）、com2（通信部署2）
        is_real:null,
        scheme:"null",
        net_move:false,//网随人动开关

        base_show:false,//是否显示节点信息
        base_link_show:false,//显示链路
        base_heat_show:false,//显示通导态势的图层
        stop:false,//暂停模式
        timer:null,//计时器
        to_init:true,//等待初始化
        is_compare:false,//是对比页面
        //航迹显示，key为无人机设备号，value是一个数组，元素为无人机的3D坐标
        air_line:{"2":{"able":0,"line":[[115.823635,39.923684,685],[115.824635,39.923684,685],[115.824635,39.922684,685]]},
        "3":{"able":0,"line":[[115.813635,39.923684,685],[115.814635,39.923684,685],[115.814635,39.922684,685]]},
        "4":{"able":0,"line":[[115.803635,39.923684,685],[115.804635,39.923684,685],[115.804635,39.922684,685]]},
        },
      };
  },
  created() {
  },
  destroyed () {
  },
  methods: { 
    //父组件调用的函数
    display(){
      this.base_main_switch=!this.base_main_switch;
      if(this.is_compare){
        this.display_draw();
        return ;
      }
      if(this.base_main_switch){
        document.getElementsByClassName('bounce-frame-base-scene-radio')[0].style.zIndex=1025;
      }
      else{
        document.getElementsByClassName('bounce-frame-base-scene-radio')[0].style.zIndex=-1;
        document.getElementsByClassName('bounce-frame-base-scene-args')[0].style.zIndex=-1;
      }
      this.$parent.$refs.base_scene_radio.picked=null;

      if(this.base_show){
        this.display_draw();
      }
    },
    display_draw(){
      if(this.map==null){
        if(this.timer!=null){
          clearTimeout(this.timer);
          this.timer=null;
        }
        this.timer=setTimeout(()=>{this.display_draw();},500);
      }
      if(this.to_init){//如果之前没有初始化，就初始化一下
        this.$refs.base_heat.init();
        this.$refs.base_line.init();
        this.$refs.base_node.init();
        this.to_init=false;
        if(this.is_compare){
          document.getElementsByClassName('base_stat_left_btn')[3].style.display="none";
          this.scheme=this.$route.query.scheme;
          this.net_move=true;
        }
      }
      this.base_show=!this.base_show;
      if(this.base_show){
          document.getElementsByClassName('bounce-frame-base-switch')[0].style.zIndex=1025;
          document.getElementsByClassName('bounce-frame-base-line-legend')[0].style.zIndex=1025;
          document.getElementsByClassName('bounce-frame-base-option-show')[0].style.zIndex=1025;
          document.getElementsByClassName('bounce-frame-base-device-list-sleep')[0].style.zIndex=1025;
          document.getElementsByClassName('bounce-frame-base-device-set-sleep')[0].style.zIndex=1025;
          document.getElementsByClassName('bounce-frame-base-stat-sleep')[0].style.zIndex=1025;
          document.getElementsByClassName('base_stat_left_btn')[0].style.display="none";
          document.getElementsByClassName('base_stat_left_btn')[1].style.display="none";
          document.getElementsByClassName('base_stat_left_btn')[2].style.display="none";
          document.getElementsByClassName('base_stat_left_btn')[3].style.display="none";

          document.getElementsByClassName("base_stat_env_info")[0].style.display="none";
          document.getElementsByClassName("base_stat_scheme_info")[0].style.display="none";
          document.getElementsByClassName("base_stat_performance")[0].style.display="none";

          this.$parent.$refs.base_device_list.init();
          if(!this.is_compare){
            console.log("原页面");
            document.getElementsByClassName('bounce-frame-base-option')[0].style.zIndex=1025;
            this.switch_mode_scheme();
          }
          else{
            console.log("对比页面");
            this.base_post();
          }
      }
      else{
          document.getElementsByClassName('bounce-frame-base-stat')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-stat-sleep')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-option')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-switch')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-line-legend')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-option-show')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-device-list')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-device-list-sleep')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-device-set')[0].style.zIndex=-1;
          document.getElementsByClassName('bounce-frame-base-device-set-sleep')[0].style.zIndex=-1;
          this.$parent.$refs.base_user_info.back_button();
          this.$parent.$refs.base_info.back_button();
          this.$parent.$refs.base_SNR_show.back_button();
          this.$parent.$refs.base_figure_zoom_in.back_button();
          if(this.$parent.$refs.base_option.button_net_show){
            this.$parent.$refs.base_option.change_net();
          }
          if(this.$parent.$refs.base_scheme_list.choose_scheme!='null'){
            let to_click=this.$parent.$refs.base_scheme_list.choose_scheme;
            this.$parent.$refs.base_scheme_list.change(to_click);
          }
          if(this.$parent.$refs.base_option.button_scheme_list_show){
            this.$parent.$refs.base_option.show_list();
          }
          if(this.base_link_show){
            this.$parent.$refs.base_switch.topo_switch();
          }
          if(this.base_heat_show){
            this.$parent.$refs.base_switch.heat_switch();
          }
          //
          if(this.timer!=null){
            clearTimeout(this.timer);
            this.timer=null;
          }
          this.base_clear();
          
          if(this.is_compare){
            this.$axios.post("http://proj25.emr-c.com/v3/switch_mode",{"mode":"3","scheme":this.scheme}).then(
              ()=>{
                window.close();
              }
            )
          }
          else{
            this.$axios.post("http://proj25.emr-c.com/v3/switch_mode",{"mode":"0","scheme":"xxx"}).then(
              ()=>{
                
              }
            )
          }
          
      }
    },
    //3D点坐标投影到2D，经度、纬度、高度，考虑火星坐标偏移和地图视角偏移（假3D效果）
    base_proj_point(tri){
      let h=tri[2];
      //let GCJ=[tri[0],tri[1]];
      let GCJ=WGS2GCJ.WGS2GCJTransform([tri[0],tri[1]]);
      let lng=GCJ[0],lat=GCJ[1];
      let R=6371000;
      let r=R*Math.cos(lat*Math.PI/180);
      
      let theta=this.map.getPitch()*Math.PI/180;//角度转弧度
      let alpha=-this.map.getRotation()*Math.PI/180;//旋转角
      let len=h*Math.tan(theta);//偏移量

      let lat_del=+len*Math.cos(alpha)*180/Math.PI/R;
      let lng_del=+len*Math.sin(alpha)*180/Math.PI/r;

      return [lng+lng_del,lat+lat_del];
    },
    //3D端点分别投影
    base_proj_line(line){
      let ans=[];
      for(let i=0;i<line.length;i++){
        ans.push(this.base_proj_point(line[i]));
      }
      return ans;
    },

    /*返回一个对象，键为设备的id（字符串），值为[lon,lat,h]*/
    get_user_gps_pos(user_list){
      let ret={};
      for(let i=0;i<user_list.length;i++){
        let obj=user_list[i];
        let id=obj.user_device_id.toString();
        /*
        ret[id]=([obj["user_device_longitude"],obj["user_device_latitude"],obj["user_device_height"]]);
        */
        //默认用户高度为0
        ret[id]=([obj["user_device_longitude"],obj["user_device_latitude"],0]);
      }
      return ret;
    },

    /*返回一个对象，键为设备的id（字符串），值为[lon,lat,h]，过滤经纬度为0的点*/
    get_bs_pos(bs_list){
      let ret={};
      for(let i=0;i<bs_list.length;i++){
        let obj=bs_list[i];
        let id=obj.bs_device_id.toString();
        if(obj["bs_device_longitude"]==null)continue;
        if(obj["bs_device_latitude"]==null)continue;
        if(Math.abs(obj["bs_device_latitude"])<1e-6 && Math.abs(obj["bs_device_longitude"])<1e-6)continue;
        if(obj["bs_device_height"]==null)obj["bs_device_height"]=0;
        ret[id]=([obj["bs_device_longitude"],obj["bs_device_latitude"],obj["bs_device_height"]]);
      }
      return ret;
    },

    /*返回一个对象，键为设备的id（字符串），值为[lon,lat,h]（数据没有就用null代替）*/
    get_net_pos(user_list){
      let ret={};
      if(this.is_real==false){
        for(let i=0;i<user_list.length;i++){
          let obj=user_list[i];
          let id=obj.user_device_id.toString();
          ret[id]=([null,null,null]);
        }
        return ret;
      }
      for(let i=0;i<user_list.length;i++){
        let obj=user_list[i];
        let id=obj.user_device_id.toString();
        /*
        ret[id]=([obj["user_device_longitude_range"],obj["user_device_latitude_range"],obj["user_device_height_range"]]);
        */
        ret[id]=([obj["user_device_longitude_range"],obj["user_device_latitude_range"],0]);
      }
      return ret;
    },

    /*返回一个对象，键为设备的id（字符串），值为gps_enable*/
    get_gps_enable(user_list){
      let ret={};
      for(let i=0;i<user_list.length;i++){
        let obj=user_list[i];
        let id=obj.user_device_id.toString();
        ret[id]=(obj["gps_enable"]);
      }
      return ret;
    },
    /*返回一个对象，键为设备的id（字符串），值为video_enable*/
    get_video_enable(user_list){
      let ret={};
      for(let i=0;i<user_list.length;i++){
        let obj=user_list[i];
        let id=obj.user_device_id.toString();
        ret[id]=(obj["video_enable"]);
      }
      return ret;
    },
    /*返回一个对象，键为设备的id（字符串），值为gps_time，null理解为1970-01-01 00:00:00*/
    get_gps_time(user_list){
      let ret={};
      for(let i=0;i<user_list.length;i++){
        let obj=user_list[i];
        let id=obj.user_device_id.toString();
        ret[id]=(obj["gps_time"]);
      }
      return ret;
    },
    get_topo(user_device_pos,bs_device_pos,topo){
      let topo_show={"name":[],"matrix":[]};
      let eps=1e-6;
      let cnt=0;//矩阵角标编号
      let map_mark={};//一个id对应一个矩阵角标
      for(let id in user_device_pos){
        topo_show.name.push("用户"+id);
        map_mark[id]=cnt++;
      }
      for(let id in bs_device_pos){
        topo_show.name.push("无人机"+id);
        map_mark[id]=cnt++;
      }
      for(let i=0;i<cnt;i++){
        topo_show.matrix.push([]);
        for(let j=0;j<cnt;j++){
          topo_show.matrix[i].push(0);
        }
      }
      for(let id_i in map_mark){
        let i=map_mark[id_i];
        for(let id_j in map_mark){
          let j=map_mark[id_j];
          let snr=topo[Number(id_i)-1][Number(id_j)-1];
          if(snr < eps) continue;
          topo_show.matrix[i][j]=1;
        }
      }
      return topo_show;
    },
    /*根据SNR矩阵和人员、无人机的id计算人员的最大速率*/
    /*一个人的速率=20*log2(1+10^(max_{j in bs} (SNR_{i,j}+SNR_{j,i})/10))*/
    get_rate(topo,user,bs){
      let rate=[];
      for(let i=0;i<topo.length;i++){
        let id=(i+1).toString();
        rate.push(0);
        if(!(id in user)){
          continue;
        }
        let max_SNR=0;
        for(let id_bs in bs){
          let j=Number(id_bs)-1;
          max_SNR=Math.max(max_SNR,topo[i][j]+topo[j][i]);
        }
        max_SNR/=2;
        if(max_SNR<1e-6)continue;
        rate[i]=20*Math.log2(1+Math.pow(10,max_SNR/10))/144;
      }
      return rate;
    },
    delete_iso(user_list,matrix){
      let size=matrix.length;
      let ret=[];
      for(let i=0;i<user_list.length;i++){
        let obj=user_list[i];
        let id=obj.user_device_id;
        let marker=Number(id)-1;
        let iso=true;
        for(let j=0;j<size;j++){
          if(matrix[marker][j]>0){
            iso=false;
            break;
          }
          if(matrix[j][marker]>0){
            iso=false;
            break;
          }
        }
        if(iso==false){
          ret.push(obj);
        }
      }
      return ret;
    },
    base_json_trans(json_data){
      
      const timestamp_now = Date.parse(new Date());

      let this_frame={shapes:{},heats:{},figures:{},topo_show:{},setting:{}};
      
      this_frame["mode_scheme"]={
        "mode": json_data.mode_scheme.mode,
        "scheme": json_data.mode_scheme.scheme
      }

      if(this_frame["mode_scheme"]["mode"]=="1"){
        this_frame["mode_scheme"]["scheme"]="null";
      }
      let shapes=this_frame.shapes;
      
      let topo_color="white";
      let scheme_color_map={
        "deploy_yanghongshuo":"red",
        "deploy_kmeans_xieyaqi":"blue",
        "deploy_zhuwendi":"purple",
      }
      if(json_data.mode_scheme.scheme in scheme_color_map){
        topo_color=scheme_color_map[json_data.mode_scheme.scheme];
      }
      //删除孤立点
      //json_data.user_devices=this.delete_iso(json_data.user_devices,JSON.parse(json_data.network_info.network_snr_matrix));

      let user_device_pos=this.get_user_gps_pos(json_data.user_devices);
      let bs_device_pos=this.get_bs_pos(json_data.bs_devices);
      let figures=this_frame.figures;
      let rate={};
      let pos_auc={};
      let topo=[];
      //解析network_info
      if(json_data.network_info!=null){
        rate=[];
        pos_auc=[];
        for(let i=0;i<20;i++){
          pos_auc.push(2.5);
        }
        topo=json_data.network_info.network_snr_matrix;
        topo=JSON.parse(topo);
        rate=this.get_rate(topo,user_device_pos,bs_device_pos);
      }
      
      let mode=json_data.mode_scheme.mode;

      //设置topo
      this_frame.topo_show=this.get_topo(user_device_pos,bs_device_pos,topo);
      //遍历topo矩阵，确认矩阵对应的角标+1在user或bs内才添加线段
      for(let i=0;i<topo.length;i++){
        let tri_from=[];
        let from_id="";
        let from_name="";
        let eps=1e-6;
        if(!((i+1).toString() in user_device_pos) && !((i+1).toString() in bs_device_pos))continue;
        from_id=(i+1).toString();
        if((i+1).toString() in user_device_pos){
          from_name="用户"+(i+1).toString();
          tri_from=user_device_pos[from_id];
        }
        else{
          from_name="无人机"+(i+1).toString();
          tri_from=bs_device_pos[from_id];
        }
        for(let j=i+1;j<topo.length;j++){
          let SNR1=topo[i][j],SNR2=topo[j][i];
          if(SNR1<eps && SNR2<eps)continue;//不予考虑
          
          let tri_to=[];
          let to_id="";
          let to_name="";
          if(!((j+1).toString() in user_device_pos) && !((j+1).toString() in bs_device_pos))continue;
          to_id=(j+1).toString();
          if((j+1).toString() in user_device_pos){
            to_name="用户"+(j+1).toString();
            tri_to=user_device_pos[to_id];
          }
          else{
            to_name="无人机"+(j+1).toString();
            tri_to=bs_device_pos[to_id];
          }
          /*可以确认这个链路是有效的*/

          let link_id=from_id+"-"+to_id;
          let SNR_opt={};
          if(SNR1 > eps)SNR_opt[from_id+"-"+to_id]={"name":from_name+'-'+to_name,"SNR":SNR1};
          if(SNR2 > eps)SNR_opt[to_id+"-"+from_id]={"name":to_name+'-'+from_name,"SNR":SNR2};
          shapes[link_id]={
            "type":"link",style:"solid","arrow":"zero","color":topo_color,line:[tri_from,tri_to],
            "SNR":SNR_opt,"strokeWeight":2,
          }
        }
      }
      if(this.base_figure_id!=""&&!isNaN(Number(this.base_figure_id))){
          let from_id=this.base_figure_id;
          let i=Number(from_id)-1;
          let max_snr_num=-1;
          let max_SNR=0;
          for(let j=0;j<topo.length;j++){
            let tmp=topo[i][j]+topo[j][i];
            if(tmp>max_SNR){
              max_SNR=tmp;
              max_snr_num=j;
            }
          }
          if(max_snr_num!=-1){//找到了
            let to_id=(max_snr_num+1).toString();
            let link_id;
            if(max_snr_num>i)link_id=from_id+"-"+to_id;
            else if(max_snr_num<i)link_id=to_id+"-"+from_id;
            else link_id="null";
            if(link_id != "null"){
              if(link_id in shapes){
                shapes[link_id].strokeWeight=5;
              }
            }
          }
        }
      //网络定位
      let net_pos=this.get_net_pos(json_data.user_devices);
      let gps_enable=this.get_gps_enable(json_data.user_devices);
      let video_enable=this.get_video_enable(json_data.user_devices);
      let gps_time=this.get_gps_time(json_data.user_devices);

      let setting=this_frame.setting;
      setting["user"]={};
      setting["bs"]={};
      //遍历用户
      for(let id in user_device_pos){
        let tri=user_device_pos[id];
        let user_id=id;
        
        let add_events;
        add_events={
            "click":["user_info","figure_1","figure_2"]
        }
        figures[user_id]={
              "user_info":{"name":"用户"+id,"lng":user_device_pos[id][0],"lat":user_device_pos[id][1]},
              "figure_1":rate[Number(id)-1],
              "figure_2":pos_auc[Number(id)-1],
              "figure_device":{
                "name":"用户"+id,
                "rate":rate[Number(id)-1].toFixed(6)+"Mbps",
                "GPS_pos":user_device_pos[id][0].toFixed(6)+","+user_device_pos[id][1].toFixed(6),
                "net_pos":((net_pos[id][0]==null)?"-":net_pos[id][0].toFixed(6))+','+((net_pos[id][1]==null)?"-":net_pos[id][1].toFixed(6)),
                "pos_auc":pos_auc[Number(id)-1].toFixed(6)+"m",
              }
        }
        
        let text="<div class='base_marker_name'><h3>"+id+"</h3></div>";
        if(this.base_figure_id==user_id){
          text="<div class='base_select_marker'><h3>当前选中</h3></div>"+text;
        }
        let ren_type='ren';
        if(gps_enable[id]==1){
          ren_type='ren_inv';
        }
        if(gps_time==null){
          gps_time="1970-01-01 00:00:00";
        }
        let gps_time_date=new Date(gps_time[id]);
        let gps_time_unix=gps_time_date.getTime();
        if(timestamp_now-gps_time_unix>300*1000){
          ren_type='ren_inv';
        }
        shapes[user_id]={
          "type":ren_type,"width":30,"height":30,"position":tri,"text":text,
          "add_events":add_events
        }
        if(this.is_real && gps_enable[id]==1){
          shapes[user_id+"-net"]={
            "type":'ren_net',"width":30,"height":30,"position":net_pos[id],"text":"<div class='base_marker_name'><h3>"+"网络定位"+"</h3></div>",
            "add_events":{}
          }
          shapes[user_id+"-net_link"]={
            "type":"link","style":"dashed","strokeWeight":5,"arrow":"zero","color":"black","line":[tri,net_pos[id]],
                "add_events":{},
          }
        }
        if(video_enable[id]==1){
          let delta=0.0005/Math.pow(2,this.map.getZoom()-15);
          shapes[user_id+"-video_tele"]={
            "type":'video_tele',"width":30,"height":30,"position":[tri[0]-delta,tri[1],tri[2]],"text":"<div class='base_marker_name'><h3>"+""+"</h3></div>",
            "add_events":{}
          }
        }
        setting.user[id]=(["用户"+id,gps_enable[id],video_enable[id]]);
      }
      
      //遍历无人机
      for(let id in bs_device_pos){
        let tri=bs_device_pos[id];
        let device_id=id;
        shapes[device_id]={
          "type":"wurenji","width":60,"height":60,"position":tri,"text":"<div class='base_marker_name'><p>"+id+"</p></div>",
          "add_events":{}
        }
      }

      //绘制航迹
      for(let id in this.air_line){
        let obj=this.air_line[id];
        setting.bs[id]=["无人机"+id,obj.able];
        if(obj.able!=1)continue;
        for(let i=0;i<obj.line.length-1;i++){
          let link_id=id+"-airline-"+i.toString();
          let tri_from=obj.line[i];
          let tri_to=obj.line[i+1];
          shapes[link_id]={
                "type":"link",style:"solid","strokeWeight":5,"arrow":"zero","color":"#000000",line:[tri_from,tri_to],
              }
        }
        
      }
      //展示算法结果的条件是开启算法以及不是对比模式
      if((mode=="2"||mode=="3"||mode=="4")&&this.is_compare==false){
        let algorithm={}
        if(json_data.algorithm_result.data!=""){
          algorithm=JSON.parse(json_data.algorithm_result.data);
        }
        
        if("device_target_pos" in algorithm){
          let device_target_pos=algorithm.device_target_pos;
          if(device_target_pos instanceof Array){//编号比较混乱，
            
            for(let i=0;i<device_target_pos.length;i++){
              let id=json_data.bs_devices[i].bs_device_id;
              let tri=[device_target_pos[i][0],device_target_pos[i][1],json_data.bs_devices[i].bs_device_height];
              let device_id='tar'+id;
              //let add_events={};
              let from_id=id;
              if(!(from_id in shapes)){
                continue;
              }
              let tri_from=shapes[from_id].position;
              let link_id=from_id+"-"+device_id;

              shapes[device_id]={
                "type":"tar_wurenji","width":45,"height":45,"position":tri,"text":"<div class='base_marker_name'><h3>"+'目标'+id+"</h3></div>",
                "add_events":{}
              }
              shapes[link_id]={
                "type":"link",style:"dashed","strokeWeight":5,"arrow":"single","color":"#FFFF00",line:[tri_from,tri],
              }
            }
          }
        }
      }

      this_frame.heats={
        "radius":50,
        "data":[],
      };
      
      this_frame.heats.data=[];
      if((typeof json_data.map_wangzao)=="object"){
        let heat_data=json_data.map_wangzao.data.state_graph_data;
        for(let i=0;i<heat_data.length;i++){
          let tri=heat_data[i];
          let pos=this.base_proj_point([tri[0],tri[1],0]);
          this_frame.heats.data.push({"lng":pos[0],"lat":pos[1],"count":tri[2]});
        }
      }
      else{
        this_frame.heats.data.push({"lng":115.826239,"lat":39.92492,"count":1000000});
      }
      return this_frame;
    },
    
    base_clear(){//清空所有的覆盖物
      //去除所有的图标和链路
      this.$refs.base_node.clear();
      this.$refs.base_line.clear();

      //隐藏图层
      this.$refs.base_node.hide();
      this.$refs.base_line.hide();
      this.$refs.base_heat.hide();
    },
    base_post_response(res){
      this.base_clear();//画前清除一下
      //全局不显示，停下来
      if(!this.base_show)return ;
      //切换方案中，也停下来
      if(this.stop)return ;
      if(res.code==200)
      {
        this.base_draw(this.base_json_trans(res.data));
        this.timer=setTimeout(()=>{this.base_post();},1000);
      }
      else{
        alert(res.msg);
      }
    },
    base_post(){//显示uav的业务
      if(!this.base_show)return ;
      let url="http://proj25.emr-c.com/v3/get_data";
      if(this.is_compare){
        url="http://proj25.emr-c.com/v3/get_comparative_data";
      }
      this.$axios.post(url,{"realtime":true,"timestamp":""})
          .then((res)=>{ //=>代表this指向本对象的作用域
            this.base_post_response(res);
          });
    },
    //绘制
    base_draw(temp_data){
      let shapes=temp_data.shapes;
      for(let id in shapes){
          //画图
          if(shapes[id].type=="link"){//是链路
            let options={
              line:this.base_proj_line(shapes[id].line),
              id:id,
              style:shapes[id].style,
              color:shapes[id].color,
              arrow:shapes[id].arrow,
              strokeWeight:shapes[id].strokeWeight,
            }
            if("SNR" in shapes[id]){
              options['SNR']=shapes[id].SNR;
              this.$refs.base_line.base_addLine(options);
            }
            else{
              this.$refs.base_node.base_addLine(options);
            }
          }
          else if(shapes[id].type in this.base_icon_url){//图标url存在，是标记
            this.$refs.base_node.base_addIcon(shapes[id].type,this.base_proj_point(shapes[id].position),
            shapes[id].width,shapes[id].height,id,shapes[id].text,shapes[id].add_events);
          }
      }
      let figures=temp_data.figures;
      
      this.$parent.$refs.base_figure_1.add_time();
      this.$parent.$refs.base_figure_2.add_time();
      this.$parent.$refs.base_info.$refs.base_figure.add_time();

      let sum_rate=0;
      let cnt_user=0;

      //设备信息展示
      let device_info={};
      for(let id in figures){
        let obj=figures[id];
        if("figure_1" in obj){
          let number=obj.figure_1;
          this.$parent.$refs.base_figure_1.add_data(id,number);
          if(temp_data.mode_scheme.scheme=="deploy_kmeans_xieyaqi"){
            sum_rate+=number;
            cnt_user++;
          }
        }
        if("figure_2" in obj){
          let number=obj.figure_2;
          this.$parent.$refs.base_figure_2.add_data(id,number);
          if(temp_data.mode_scheme.scheme=="deploy_yanghongshuo"){
            sum_rate+=number;
            cnt_user++;
          }
        }
        if("figure_device" in obj){
          device_info[id]=obj.figure_device;
        }
      }
      //设置设备列表
      this.$parent.$refs.base_device_list.possible_device=device_info;
      //设置拓扑
      this.$parent.$refs.base_device_list.topo=temp_data.topo_show;
      //绘制设备信息表格
      this.$parent.$refs.base_device_list.draw();

      //设置设备选项
      this.$parent.$refs.base_device_set.device_list=temp_data.setting.user;
      this.$parent.$refs.base_device_set.air_line=temp_data.setting.bs;
      this.$parent.$refs.base_device_set.update();

      let avg_rate=sum_rate/cnt_user;
      this.$parent.$refs.base_option_show.set(this.scheme,this.net_move);

      //绘制表格
      if(this.base_figure_id in temp_data.figures){
        if("user_info" in temp_data.figures[this.base_figure_id]){
          this.$parent.$refs.base_user_info.set_info(temp_data.figures[this.base_figure_id].user_info);
        }

        if("figure_1" in temp_data.figures[this.base_figure_id]){
          this.$parent.$refs.base_figure_1.draw(this.base_figure_id,"实时通信速率","速率","Mbps");
        }
        if("figure_2" in temp_data.figures[this.base_figure_id]){
          this.$parent.$refs.base_figure_2.draw(this.base_figure_id,"实时定位精度","精度","m");
        }

      }else{
        this.$parent.$refs.base_user_info.clear();
      }
      //确定方案信息
      if(temp_data.mode_scheme.scheme=="deploy_kmeans_xieyaqi"){
        this.$parent.$refs.base_info.$refs.base_figure.add_data('avg',avg_rate);
        this.$parent.$refs.base_info.$refs.base_figure.draw("avg","实时平均通信速率","速率","Mbps");
        this.$parent.$refs.base_stat.env_info="京西基地属于北方山地林区。由于地形和气候的多样性，北方林区支持着丰富多样的生态系统。这些地区可以包括高山针叶林、落叶阔叶林、常绿阔叶林、亚高山草甸、高山草甸等多种生境类型。由于山地的海拔高度不同，北方山地林区通常呈现出明显的垂直生态带分布。";
        this.$parent.$refs.base_stat.scheme_info="K均值算法是一种简单而高效的聚类算法，适用于处理高维数据和球形簇分布的情况。然而，它需要预先指定簇数K，并对初始质心和异常值敏感";
      }
      if(temp_data.mode_scheme.scheme=="deploy_yanghongshuo"){
        this.$parent.$refs.base_info.$refs.base_figure.add_data('avg',avg_rate);
        this.$parent.$refs.base_info.$refs.base_figure.draw("avg","实时平均定位精度","精度","m");
        this.$parent.$refs.base_stat.env_info="京西基地属于北方山地林区。由于地形和气候的多样性，北方林区支持着丰富多样的生态系统。这些地区可以包括高山针叶林、落叶阔叶林、常绿阔叶林、亚高山草甸、高山草甸等多种生境类型。由于山地的海拔高度不同，北方山地林区通常呈现出明显的垂直生态带分布。";
        this.$parent.$refs.base_stat.scheme_info="定位算法简介";
      }
      //显示方案相关信息
      if((temp_data["mode_scheme"]["mode"]=="2"||temp_data["mode_scheme"]["mode"]=="3"||temp_data["mode_scheme"]["mode"]=="4")&&this.is_compare==false){
        document.getElementsByClassName('base_stat_left_btn')[0].style.display="inline";
        document.getElementsByClassName('base_stat_left_btn')[1].style.display="inline";
        document.getElementsByClassName('base_stat_left_btn')[2].style.display="inline";

        document.getElementsByClassName("base_stat_env_info")[0].style.display="inline";
        document.getElementsByClassName("base_stat_scheme_info")[0].style.display="inline";
        document.getElementsByClassName("base_stat_performance")[0].style.display="inline";
      }
      else{
        document.getElementsByClassName('base_stat_left_btn')[0].style.display="none";
        document.getElementsByClassName('base_stat_left_btn')[1].style.display="none";
        document.getElementsByClassName('base_stat_left_btn')[2].style.display="none";

        document.getElementsByClassName("base_stat_env_info")[0].style.display="none";
        document.getElementsByClassName("base_stat_scheme_info")[0].style.display="none";
        document.getElementsByClassName("base_stat_performance")[0].style.display="none";
      }

      //显示方案对比
      if((temp_data["mode_scheme"]["mode"]=="3")&&this.is_compare==false&&this.is_real==false){
        document.getElementsByClassName('base_stat_left_btn')[3].style.display="inline";
      }
      else{
        document.getElementsByClassName('base_stat_left_btn')[3].style.display="none";
      }
      //把图层添加到地图上
      if(this.base_show)
      {
        this.$refs.base_node.show();
      }else
      {
        this.$refs.base_node.hide();
      }
        
      if(this.base_link_show)
      {
        this.$refs.base_line.show();
      }else
      {
        this.$refs.base_line.hide();
      }
        
      if(this.base_heat_show)
      {
        this.$refs.base_heat.set(temp_data.heats.data,{"side":2*temp_data.heats.radius});
        this.$refs.base_heat.show();
      }else
      {
        this.$refs.base_heat.hide();
      }
    },
    cal_mode(){
      /*1.网随人动未开启且未选择部署方案。
        2.网随人动未开启且选择部署方案
        3.网随人动开启且选择部署方案 */
      let mode="";
      if(this.scheme=="null" && this.net_move==false){
        mode="1";
      }
      else if(this.scheme!="null" && this.net_move==false){
        mode="2";
      }
      else if(this.scheme!="null" && this.net_move==true){
        mode="3";
      }
      else{
        console.log("wrong");
      }
      return mode;
    },
    switch_mode_scheme(){
      this.stop=true;
      let mode=this.cal_mode();
      
      this.$axios.post("http://proj25.emr-c.com/v3/switch_mode",{"mode":mode,"scheme":this.scheme}).then((res)=>{
        if(res['code']==200){
          if(this.timer!=null){
            clearTimeout(this.timer);
            this.timer=null;
          }
          this.timer=setTimeout(()=>{this.stop=false;this.base_post();},1000);
        }
        else{
          console.log("wrong switch!");
        }
      });
      
    },
    //重设方案需要暂停
    set_scheme(id){
      let id_trans={"null":"null","1":'deploy_yanghongshuo','2':'deploy_kmeans_xieyaqi','3':'deploy_zhuwendi'};
      this.scheme=id_trans[id];
      this.switch_mode_scheme();
    },
    //重设模式需要暂停
    set_net_move(state){
      this.net_move=state;
      this.switch_mode_scheme();
    },
    set_topo_show(state){
      this.base_link_show=state;//显示链路
    },
    set_heat_show(state){
      this.base_heat_show=state;//显示通导态势的图层
    },
    //设置放大表格的关闭回调函数
    set_zoom_in_close(close_func){
        this.$parent.$refs.base_figure_zoom_in.set_close(close_func);
    },
    //设置放大表格的显示参数
    set_zoom_in_option(args){
      this.$parent.$refs.base_figure_zoom_in.set_option(args);
    }
  },
  mounted(){
  },
  beforeDestroy () {
  }
};
</script>
<style>
  .base-heat{
    height: 0%;
    width: 0%;
    position: absolute;
  }

  /* 图标旁边的标注的css*/
  .amap-marker-label{
          border: 0;
          background-color: transparent;
      }
  .base_marker_name{
      text-align: center;
      position: relative;
      top: 0;
      right: 0;
      min-width: 0;
      color: rgb(255, 255, 255) ;
  }
  .base_select_marker{
      text-align: center;
      font-size: 15px;
      position: relative;
      top: 0;
      right: 0;
      min-width: 0;
      color: rgb(255, 255, 0) ;
  }
</style>