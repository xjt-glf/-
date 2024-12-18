<template>
    <div class="base_figure_zoom_in">
        <button class="base_figure_zoom_in_close" @click="back_button">×</button>
        <p class="base-figure-zoom-in-snap">{{title}}:{{number}}{{unit}}</p>
        <div class="base-figure-zoom-in-my-echart" ref="my_echart" >
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
            unit:"",
            close:null,
        };
    },
    methods:{
        set_option(args){
            this.title=args.title;
            this.number=args.number;
            this.unit=args.unit;
            let options=deep_copy.deepClone(args.options);
            options["title"]["textStyle"]={"fontSize":40};
            options["xAxis"]["nameTextStyle"]={"fontSize":25};
            options["yAxis"]["nameTextStyle"]={"fontSize":25};
            options["xAxis"]["axisLabel"]={"fontSize":25};
            options["yAxis"]["axisLabel"]={"fontSize":25};
            this.my_chart.setOption(options);
        },
        set_close(close_func){
            this.close=close_func;
        },
        back_button(){
            if(this.close==null)return ;
            this.close();
            this.close=null;
        },
    },
    mounted(){
        this.my_chart = echarts.init(this.$refs.my_echart);
    }
}
</script>
<style>
.base-figure-zoom-in-snap{
    text-align: center;
    top:0%;
    left:0%;
    height:11%;
    width:100%;
    position:absolute;
    font-size:40px;
    z-index: 10;
}
.base-figure-zoom-in-my-echart{
    height:89%;
    width:100%;
    top:11%;
    left:0%;
    position:absolute;
    z-index: 10;
}
.base_figure_zoom_in_close{
    text-align: 'center';
    height:40px;
    width:40px;
    position:absolute;
    top:0%;
    right:0%;
    background: rgba(255,255,255,1);
    z-index: 20;
    font-size:36px;
    cursor: pointer;
}
</style>