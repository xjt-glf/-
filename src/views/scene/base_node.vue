<template>
    <div class="base_node">

    </div>
</template>
<script>
import bus from './base_bus';
export default ({
    name: "base_node",
    props:{
        AMap:Object,
        map:Object,
    },
    data(){
        return {
            base_node_layer:null,//显示节点的图层
            base_markers:{},//标记字典，id:marker
        };
    },
    methods:{
        /*line形如[起点,终点]，每个点形如[经度,纬度]*/
        /*id是箭头的编号，id=线的编号+'arrow'*/
        /*color是颜色*/
        /*在终点处添加一个箭头 */
        base_add_arrow(options){
            let line=options.line;
            let color=options.color;
            let id=options.id;
            //经度、纬度
            let vector=[line[1][0]-line[0][0],line[1][1]-line[0][1]];
            //先拉伸到真实坐标下
            let theta=Math.PI/180.0*15;

            let lat_local=line[0][1];//取纬度
            vector[0]*=Math.cos(lat_local/180*Math.PI);
            //left是逆时针，right是顺时针
            let left_rot=[vector[0]*Math.cos(theta)-vector[1]*Math.sin(theta),vector[1]*Math.cos(theta)+vector[0]*Math.sin(theta)];
            let right_rot=[vector[0]*Math.cos(theta)+vector[1]*Math.sin(theta),vector[1]*Math.cos(theta)-vector[0]*Math.sin(theta)];
            let length=Math.sqrt(Math.pow(left_rot[0],2)+Math.pow(left_rot[1],2));
            if(length<1e-6){
                return ;
            }
            left_rot[0]/=length;
            left_rot[1]/=length;
            right_rot[0]/=length;
            right_rot[1]/=length;
            let zoom=this.map.getZoom();
            let relative=Math.pow(2,15-zoom)*0.0007;
            left_rot[0]*=relative;
            left_rot[1]*=relative;
            right_rot[0]*=relative;
            right_rot[1]*=relative;

            //再拉伸到经纬度坐标下
            left_rot[0]/=Math.cos(lat_local/180*Math.PI);
            right_rot[0]/=Math.cos(lat_local/180*Math.PI);
            
            let new_options={};
                new_options={
                line:[[line[1][0]-right_rot[0],line[1][1]-right_rot[1]],line[1]],
                id:id+"-0",
                style:'solid',
                color:color,
                arrow:'zero',
                strokeWeight:2,
            }
            this.base_add_poly(new_options);

            new_options={
                line:[[line[1][0]-left_rot[0],line[1][1]-left_rot[1]],line[1]],
                id:id+"-1",
                style:'solid',
                color:color,
                arrow:'zero',
                strokeWeight:2,
            }
            this.base_add_poly(new_options);
        },
        /*画线*/
        /*line形如[起点,终点]，每个点形如[经度,纬度]*/
        /*id是线的唯一编号，编号为起点id+'-'+终点id*/
        /*style有虚线'dashed'和实线'solid'*/
        /*color是颜色*/
        /*arrow是箭头样式，zero表示无箭头，single表示在终点设置一个箭头*/
        /*strokeWeight是粗细*/
        base_add_poly(options){
            let line=options.line;
            let id=options.id;
            let style=options.style;
            let color=options.color;
            let arrow=options.arrow;
            let strokeWeight=options.strokeWeight;
            let temp_poly = new this.AMap.Polyline({
                    path: line,
                    strokeStyle:style,
                    strokeWeight: strokeWeight,
                    strokeColor: color, // 线条颜色
                    lineJoin: 'round', // 折线拐点连接处样式
                    cursor:"pointer",
            });

            // 将折线添加至地图实例
            this.base_markers[id]=temp_poly;

            if(arrow=="zero"){
                return ;
            }
            if(arrow=="single"){
            //沿线方向添加一个箭头
                this.base_add_arrow({line:line,id:id+"-arrow",color:color});
            }
        },
        base_addLine(options){
            let line=options.line;
            let id=options.id;
            let style=options.style;
            let color=options.color;
            let arrow=options.arrow;
            if(!("strokeWeight" in options)){
                options["strokeWeight"]=5;
            }
            let strokeWeight=options.strokeWeight;
            this.base_add_poly({
                line:line,
                id:id,
                style:style,
                color:color,
                arrow:arrow,
                strokeWeight:strokeWeight,
            })
        },
        base_show_user_info(e){//显示用户信息
            let id=e.target.getExtData();
            this.$parent.base_figure_id=id;
            document.getElementsByClassName('bounce-frame-base-user-info')[0].style.zIndex=1025;
        },
        base_show_figure_1(e){//显示折线图1
            let id=e.target.getExtData();
            document.getElementsByClassName('bounce-frame-base-figure-1')[0].style.zIndex=1025;
        },
        base_show_figure_2(e){//显示折线图1
            let id=e.target.getExtData();
            document.getElementsByClassName('bounce-frame-base-figure-2')[0].style.zIndex=1025;
        },
        /*图标类型、[经,纬]、图标宽(px)、高、唯一标识、事件类型(Str) */
        base_addIcon(type,position,width,height,id,text,add_events){
            // 将 Icon 传入 marker
            let icon= new this.AMap.Icon({
                size: new this.AMap.Size(width,height),
                image: this.$parent.base_icon_url[type],
                imageSize: new this.AMap.Size(width, height),
            });
            
            let marker = new this.AMap.Marker({
            position:position,
            icon: icon,
            draggable:false,
            anchor: 'center', //设置锚点
            extData:id,
            });
            
            marker.setLabel({
                content: text, //设置文本标注内容
                direction: 'top' //设置文本标注方位
                });
            
            let action={
                user_info:this.base_show_user_info,
                figure_1:this.base_show_figure_1,
                figure_2:this.base_show_figure_2,
            }
            for(let event in add_events){
                let list_of_action=add_events[event];
                for(let i=0;i<list_of_action.length;i++){//绑定事件和回调函数
                    let act=list_of_action[i];
                    marker.on(event,action[act]);
                }
            }
            this.base_markers[id]=marker;//加入字典
        },
        init(){
            this.base_node_layer=new this.AMap.OverlayGroup();
            this.base_node_layer.setMap(this.map);
            this.base_node_layer.show();
        },
        show(){
            this.base_node_layer.addOverlays(Object.values(this.base_markers));
            this.base_node_layer.show();
        },
        hide(){
            this.base_node_layer.hide();
        },
        clear(){
            this.base_markers={};
            this.base_node_layer.clearOverlays();
        },
    }
})
</script>
<style>

</style>