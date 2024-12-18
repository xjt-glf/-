<template>
  <div class="bframec1">
      <div v-show="this.base_table_show" class="echarts-box" id="myEchart">
      </div>
      
  </div>
</template>

<script>
import * as echarts from 'echarts';
//import user_json_data from '../../../static/json/test.json';
import user_json_data from '../../../static/json/simple_test.json';
export default {
  name: "sub-vue",
  props: {
      bframeR1_show:Boolean,
      AMap:Object,
      map:Object,
  },
  data() {
    return {
        base_icon_url:{
              'wurenji':"/src/images/Scene/wurenji.png",
              'ren':"/src/images/Scene/ren.png",
        },
        base_markers:{},//标记字典，id:marker
        base_links:{},//链路字典，id:polyline，id一般为两个标记的id直接拼接
        base_echart:null,//表格
        base_base_show:false,//是否显示图标？
        base_table_show:false,//是否显示表格？
        base_tabel_property:{},//字典，根据图标/链路的id查询图表数据
        base_tabel_id:"",//表格显示哪个数据
        base_ani_data:[],//全部的数据都在这里了
        base_ani_frame:0,//动画下一帧
        base_move_time:0,//动画总帧数
        base_draw_timer:null,//计时器
    };
  },
  created() {
      this.base_draw_timer= setInterval(this.base_draw, 1000);
  },
  destroyed () {
      clearInterval(this.base_draw_timer);
  },
  methods: { 
    changeShow(){
      //联系父组件关闭弹窗
      this.$parent.changeMouseToolSelected("tongJiBiaoGe");
      this.$parent.showBframeR1();
      //
    },
    displayUsers(){
      // console.log("父组件调用了子组件的displayUsers方法");
      this.base_showBase();
    },
    displayComSit(){
      // console.log("父组件调用了子组件的displayComSit方法");
      //通导态势
    },
    displayTable(){
      // console.log("父组件调用了子组件的displayTable方法");
      this.base_open_table();
    },
    base_json_trans(){
      for(let i=0;i<user_json_data["points"].length;i++)//帧
      {
          let this_frame={};
          for(let j=0;j<user_json_data["points"][i]["Links_for_20_usrs"].length;j++)
          {
              let user_pos=user_json_data["points"][i]["Links_for_20_usrs"][j][0];
              let base_pos=user_json_data["points"][i]["Links_for_20_usrs"][j][1];
              this_frame["person"+j.toString()]={
                  "type":"ren","width":30,"height":30,"position":user_pos,
                  "add_event":"",
              };
              this_frame["base"+j.toString()]={
                  "type":"wurenji","width":30,"height":30,"position":base_pos,
                  "add_event":"",
              };
              this_frame["base"+j.toString()+"-person"+j.toString()]={
                  "type":"link","line":[base_pos,user_pos],
                  "add_event":""
              };
          }
          this.base_ani_data.push(this_frame);
      }
    },
    init_user_data(){
      this.base_ani_data=[];
      this.base_ani_data=user_json_data;//不转化
      //this.base_json_trans();//转化

      this.base_move_time=this.base_ani_data.length;//长度
      let chartDom = document.getElementById('myEchart');
      this.base_echart = echarts.init(chartDom);
    },
    /*图标类型、[经,纬]、图标宽(px)、高、唯一标识、事件类型(Str) */
    base_addIcon(type,position,width,height,id,add_event){
      
      // 将 Icon 传入 marker
      
      let icon= new this.AMap.Icon({
          size: new this.AMap.Size(width,height),
          image: this.base_icon_url[type],
          imageSize: new this.AMap.Size(width, height),
      });
      let marker = new this.AMap.Marker({
          position:position,
          icon: icon,
          draggable:false,
          anchor: 'center', //设置锚点
          extData:id,
          zooms:[13,19],
      });
      
      if(add_event=="Chart")//弹出表格
      {
          marker.on('click',this.base_show_table);//exData即为表格的ID
      }
      marker.setMap(this.map);
      this.base_markers[id]=marker;//加入字典
    },

    base_addLine(line,id,add_event){
      let temp_poly = new this.AMap.Polyline({
              path: line,  
              strokeWeight: 3, // 线条宽度，默认为 1
              strokeColor: 'red', // 线条颜色
              lineJoin: 'round', // 折线拐点连接处样式
              extData:id,//
              cursor:"pointer",
      });
      if(add_event=="Chart")//弹出表格
      {
          temp_poly.on('click',this.base_show_table);//exData即为表格的ID
      }
      // 将折线添加至地图实例
      temp_poly.setMap(this.map);
      this.base_links[id]=temp_poly;
    },
    base_set_echarts(id){
      if( !(id in this.base_tabel_property) )return ;
      let X_name=this.base_tabel_property[id]['x'];
      let Y_name=this.base_tabel_property[id]['y'];
      let show_data=this.base_tabel_property[id]['data']; //show_data是一个数组，里面包含了若干条线
      let options = {
          tooltip: {
              backgroundColor: 'rgba(204, 221, 255, 0.6)',
              trigger: 'axis',
              borderColor: '#CCDDFF',
              textStyle: { color: '#2562DC' }
          },
          color: ['#635df7', '#f15d5d'],
          grid:{
              //与绝对定位相似，top，left，right，bottom 设定是根据上级盒子宽高来计算
              top:"20%",
              left:"10%",
              right:"10%",
              bottom:"10%"
          },
          xAxis:{name: X_name,
                  nameRotate: '0',
                  nameLocation: 'end',
                  min:"dataMin",
                },
          yAxis:{name: Y_name,
                  nameRotate: '0',
                  nameLocation: 'end'},
          series: show_data,
          title:{
              show:true,
              text:id,//主标题文本
              left:"center",
          }
      }
      this.base_echart.setOption(options);
    },
    base_show_table(e){
      let id=e.target.getExtData();
      this.base_tabel_id=id;
      this.base_set_echarts(id);
    },
    base_clear(){//清空所有的覆盖物以及表格
      //去除所有的图标和链路
          for (let key in this.base_markers) {
              this.base_markers[key].setMap(null);//标记移出地图
          }
          for (let key in this.base_links) {
              this.base_links[key].setMap(null);//链路移出地图
          }
          this.base_markers={};//置空
          this.base_links={};//置空
          this.base_tabel_property={};//置空
    },
    //用户动态选项的回调函数
    base_showBase(){
      this.base_base_show=!this.base_base_show;
      if(!this.base_base_show){
          this.base_clear();
          return;
      }else{
          this.base_draw();
      }
    },
    //计时器的回调函数
    base_draw(){
      if(!this.base_base_show)//不需要显示，先按照不显示即暂停处理
      {
          return ;
      }
      this.base_clear();//画前清除一下
      let temp_data=this.base_ani_data[this.base_ani_frame];//取出当前帧，是一个字典
      for(let id in temp_data){
          //画图
          if(temp_data[id].type=="link"){//是链路
              this.base_addLine(temp_data[id].line,id,temp_data[id].add_event);
          }
          else if(temp_data[id].type in this.base_icon_url){//图标url存在，是标记
              this.base_addIcon(temp_data[id].type,temp_data[id].position,
              temp_data[id].width,temp_data[id].height,id,temp_data[id].add_event);
          }

          //设置表格数据this.base_tabel_property
          if(temp_data[id].add_event=="Chart"){
              this.base_tabel_property[id]={
                  x:temp_data[id].x,//x轴名称
                  y:temp_data[id].y,//y轴名称
                  data:temp_data[id].data,//数据
              };
          }
      }
      this.base_set_echarts(this.base_tabel_id);
      //顺序播放
      this.base_ani_frame=(this.base_ani_frame+1)%this.base_move_time;
    },
    //显示表格
    base_open_table(e){
      this.base_table_show=!this.base_table_show;
    },
    
  },
  mounted() {
      this.init_user_data();
  }
};
</script>
<style>
.bframec1{
height: 100%;
width: 100%;
/* background-color: rgb(61,73,106,0.8); */
/* border: 1px solid rgb(13, 210, 236); */
}
.echarts-box{
      width:512px;
      height:288px;
      left:0px;
      top:0px;
      z-index: 1025; /**堆叠层次，越大在排版图层中越靠上（防止显示不出来） */
      display: flex;
      flex-direction: column;
      min-width: 0;
      word-wrap: break-word;
      background-color: rgba(65, 62, 62, 0.58); /*背景色，去除之后就是透明的*/
      color:white;
      background-color: rgb(255, 255, 255,0.6);
      background-clip: border-box;
      border-radius: .25rem;
      width: 22rem;
      border-width: 0;
      border-radius: 0.4rem;
      box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5); /*阴影，突出立体感*/
      position:relative;
      /*
      right: 20px;
      top:170px;*/
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      padding: 0.2rem 0.25rem;
  }
</style>