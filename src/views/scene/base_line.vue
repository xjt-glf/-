<template>
    <div class="base_line">

    </div>
</template>
<script>
import bus from './base_bus';
export default ({
    name: "base_line",
    props:{
        AMap:Object,
        map:Object,
    },
    data(){
        return {
            base_link_layer:null,
            base_links:{},//链路字典，id:polyline，id一般为两个标记的id直接拼接
        };
    },
    methods:{
        /*画线*/
        /*line形如[起点,终点]，每个点形如[经度,纬度]*/
        /*id是线的唯一编号，编号为起点id+'-'+终点id*/
        /*style有虚线'dashed'和实线'solid'*/
        /*color是颜色*/
        /*strokeWeight是粗细*/
        /*label即SNR，是一个HTML文本，点击直线后显示在地图侧边，省略label代表点击后无反应*/
        base_add_poly(options){
            let line=options.line;
            let id=options.id;
            let style=options.style;
            let color=options.color;
            let strokeWeight=options.strokeWeight;
            let label="<p>empty</p>";
            if('label' in options){
                label=options.label;
            }
            let temp_poly = new this.AMap.Polyline({
                    path: line,
                    strokeStyle:style,
                    strokeWeight: strokeWeight,
                    strokeColor: color, // 线条颜色
                    lineJoin: 'round', // 折线拐点连接处样式
                    extData:label,//
                    cursor:"pointer",
            });
            if('label' in options){
                temp_poly.on('click',this.bounce_SNR);
            }
            // 将折线添加至地图实例
            this.base_links[id]=temp_poly;
        },
        /*line形如[起点,终点]，每个点形如[经度,纬度]*/
        /*id是线的唯一编号，编号为起点id+'-'+终点id*/
        /*style有虚线'dashed'和实线'solid'*/
        /*color是颜色*/
        /*SNR是一个字典，key代表链路方向，比如uav0-user3即0号无人机到3号用户*/
        /*如果id='uav0-user3'，那么key有可能为uav0-user3和uav3-user0，对应的值是SNR（浮点数，单位是dB）*/
        base_addLine(options){
            let line=options.line;
            let id=options.id;
            let style=options.style;
            let color=options.color;
            let SNR=options.SNR;
            if(!("strokeWeight" in options)){
                options["strokeWeight"]=2;
            }
            let strokeWeight=options.strokeWeight;
            let label="";
            let cnt=0;
            for(let key in SNR){
                cnt++;
                let name=SNR[key].name;
                let snr_num=SNR[key].SNR;
                label+='<p>'+name+'</p>'+'<p>'+snr_num.toFixed(2)+'dB</p>';
            }
            let choice=this.$parent.$parent.$refs.base_SNR_radio.choice;
            if(choice=="all"){

            }
            else{
                choice=Number(choice);
                if(cnt<2)return ;
                let eps=1e-6;
                for(let key in SNR){
                    if(SNR[key].SNR+eps<choice)return ;
                }
            }
            this.base_add_poly({
                line:line,
                id:id,
                style:style,
                color:color,
                label:label,
                strokeWeight:strokeWeight,
            });
        },
        show(){
            this.base_link_layer.addOverlays(Object.values(this.base_links));
            this.base_link_layer.show();
        },
        hide(){
            this.base_link_layer.hide();
        },
        clear(){
            this.base_links={};
            this.base_link_layer.clearOverlays();
        },
        init(){
            this.base_link_layer=new this.AMap.OverlayGroup();
            this.base_link_layer.setMap(this.map);
            this.base_link_layer.show();
        },
        bounce_SNR(e){
            let label=e.target.getExtData();
            document.getElementsByClassName('bounce-frame-base-SNR-show')[0].style.zIndex=1025;
            this.$parent.$parent.$refs.base_SNR_show.set(label);
        }
    }
})
</script>
<style>

</style>