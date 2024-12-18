<template>
    <div class="base_figure">
        <p class="base-figure-snap">{{title}}:{{number}}{{unit}}</p>
        <div class="base-figure-my-echart" ref="my_echart" @click="start_draw_zoom_in()" >
        </div>
    </div>    
</template>
<script>
import bus from './base_bus';
import * as echarts from 'echarts';
import * as deep_copy from './deep_copy.js';
export default {
    name: "base_controller",
    props: {
    },
    data() {
        return {
            my_chart:null,
            title:"",
            number:"",
            history_data:{},
            total_time:0,
            unit:"",
            border:null,
            tmp_options:{},
            show_zoom_in:false,
        };
    },
    methods:{
        set_option(style){
            this.tmp_options={
                tooltip: {
                    backgroundColor: 'rgba(204, 221, 255, 0.6)',
                    trigger: 'axis',
                    borderColor: '#CCDDFF',
                    textStyle: { color: '#2562DC' }
                },
                color: ['#635df7', '#f15d5d'],
                grid: {right: "20%",bottom:"13%",top:"20%"},
                xAxis:{name: style.xName,
                        nameRotate: '0',
                        nameLocation: 'end',
                        min:"dataMin",
                        max:"dataMax",
                        interval:1,
                        nameTextStyle:{
                            fontSize: 14,
                        },
                        axisLabel:{
                            fontSize:14,
                        }, 
                    },
                yAxis:{name: style.yName,
                        nameRotate: '0',
                        nameLocation: 'end',
                        nameTextStyle:{
                            fontSize: 14,
                        },
                        axisLabel:{
                            fontSize:14,
                        },
                    },
                title:{
                    show:true,
                    text:style.title,//主标题文本
                    left:"center",
                    textStyle:{
                        fontSize:18,
                    },
                }
            }
            this.tmp_options=deep_copy.deepClone(this.tmp_options);
            this.my_chart.setOption(this.tmp_options);
        },
        add_time(){
            this.total_time+=1;
        },
        add_data(id,number){
            if( !(id in this.history_data) ){
                this.history_data[id]=[];
            }
            this.history_data[id].push(number);
            if(this.history_data[id].length>10){
                this.history_data[id].shift();
            }
        },
        draw(id,number_type,abbr,number_unit){
            this.set_option({xName:"时间/s",yName:abbr+'/'+number_unit,title:number_type+"-时间图"})
            let lines=[];
            if(!(id in this.history_data))return ;
            let n=this.history_data[id].length;
            for(let i=0;i<n;i++){
                lines.push([this.total_time-n+i,this.history_data[id][i]]);
            }
            this.title=number_type;
            this.number=this.history_data[id][n-1].toFixed(6);
            this.unit=number_unit;
            let options={
                series: [{
                    name:"data",
                    data: lines,
                    type: 'line'
                }]
            }
            this.tmp_options["series"]=options["series"];
            this.tmp_options=deep_copy.deepClone(this.tmp_options);
            this.my_chart.setOption(options);
            if(this.show_zoom_in){
                this.draw_zoom_in();
            }
        },
        clear(){
            this.history_data={};
            this.number="";
            this.total_time=0;
            this.unit="";
            this.title="";
            this.border=null;
        },
        start_draw_zoom_in(){
            //1.将大图展开
            this.show_zoom_in=true;
            document.getElementsByClassName("bounce-frame-base-figure-zoom-in")[0].style.zIndex=1024;
            let dom=this.$parent;
            if("base_controller" in dom.$refs){
                dom=dom.$refs.base_controller;
            }
            dom.set_zoom_in_close(this.close_zoom_in);
            this.draw_zoom_in();
        },
        close_zoom_in(){//用户手动关闭zoom_in的显示
            this.show_zoom_in=false;
            document.getElementsByClassName("bounce-frame-base-figure-zoom-in")[0].style.zIndex=-1;
        },
        
        draw_zoom_in(){
            let args={};
            args.options=this.tmp_options;
            args.title=this.title;
            args.number=this.number;
            args.unit=this.unit;
            let dom=this.$parent;
            if("base_controller" in dom.$refs){
                dom=dom.$refs.base_controller;
            }
            dom.set_zoom_in_option(args);
        }

    },
    mounted(){
        this.my_chart = echarts.init(this.$refs.my_echart);
    }
}
</script>
<style>
.base-figure-snap{
    text-align: center;
    top:0%;
    left:0%;
    height:11%;
    width:100%;
    position:absolute;
    font-size:16px;
}
.base-figure-my-echart{
    height:89%;
    width:100%;
    top:11%;
    left:0%;
    position:absolute;
}
</style>