<template>
    <div class="base_heat">
        
    </div>
</template>
<script>
import bus from './base_bus';

export default{
    name: "base_heat",
    props: {
      AMap:Object,
      map:Object,
    },
    data(){
        return {
            loca:null,
            base_heatmap:null,//显示通导态势的图层
            legend:null,//图例
            colors:['rgba(255,30,0,0.5)','rgba(253,61,0,0.5)','rgba(252,112,0,0.5)','rgba(248,153,0,0.5)'    //红的
            ,'rgba(225,174,0,0.5)','rgba(228,208,23,0.5)','rgba(231,242,45,0.5)',                         //黄的
            'rgba(185,235,59,0.5)','rgba(150,227,58,0.5)','rgba(115,220,57,0.5)','rgba(76,175,80,0.5)'],  //绿的
            /*颜色*/
            level:[500000,700000,1000000,1500000,2000000,2500000,3000000,4000000,5000000,6000000,8000000],//速率
        };
    },
    mounted(){
    },
    methods:{
        init(){
            this.loca = new Loca.Container({
                map:this.map,
            });
            this.legend = new Loca.Legend({
                title: {
                    label: '通信速率(bps)',
                    fontColor: 'rgba(255,255,255,1.0)',
                    fontSize: '16px',
                },
                style: {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    right: '20%',
                    bottom: '5%',
                    fontSize: '12px',
                },
                dataMap: [
                    { label: '>8M', color: this.colors[10] },
                    { label: '6M~8M', color: this.colors[9] },
                    { label: '5M~6M', color: this.colors[8] },
                    { label: '4M~5M', color: this.colors[7] },
                    { label: '3M~4M', color: this.colors[6] },
                    { label: '2.5M~3M', color: this.colors[5] },
                    { label: '2M~2.5M', color: this.colors[4] },
                    { label: '1.5M~2M', color: this.colors[3] },
                    { label: '1M~1.5M', color: this.colors[2] },
                    { label: '700k~1M', color: this.colors[1] },
                    { label: '500k~700k', color: this.colors[0] },
                ],
            });
            this.base_heatmap=new Loca.GridLayer({
                zIndex: 10,
                visible: true,
                opacity: 1,
            });
            let geo=new Loca.GeoJSONSource({
                data: {
                        "features":[],
                        "type": "FeatureCollection"
                        }
            });
            this.base_heatmap.setSource(geo);
            this.loca.add(this.base_heatmap);
            this.base_heatmap.hide();
        },
        hide(){
            this.base_heatmap.hide();
            
            this.legend.remove();
            
        },
        show(){
            this.base_heatmap.show();
            
            this.legend.addTo(this.loca);
            
        },
        //option是一个字典，确定了坐标系，cor_P是P点相对坐标（形如列表[x,y]），返回P点的经纬度（形如列表[lng,lat]）
        coordinate_to_lnglat(option, cor_P){
            let ll_O=(option["ll_O"].concat());
            let cor_O=(option["cor_O"].concat());
            let ll_A=(option["ll_A"].concat());
            let cor_A=(option["cor_A"].concat());
            let ll_B=(option["ll_B"].concat());
            let cor_B=(option["cor_B"].concat());

            cor_A = [cor_A[0] - cor_O[0], cor_A[1] - cor_O[1]];
            cor_B = [cor_B[0] - cor_O[0], cor_B[1] - cor_O[1]];
            cor_P = [cor_P[0] - cor_O[0], cor_P[1] - cor_O[1]];
            let det = cor_A[0] * cor_B[1] - cor_A[1] * cor_B[0];

            let rat_P = [cor_B[1] * cor_P[0] - cor_B[0] * cor_P[1], -cor_A[1] * cor_P[0] + cor_A[0] * cor_P[1]];
            rat_P[0] /= det;
            rat_P[1] /= det;

            let vec_A = [ll_A[0] - ll_O[0], ll_A[1] - ll_O[1]];
            let vec_B = [ll_B[0] - ll_O[0], ll_B[1] - ll_O[1]];

            let ll_P = [ll_O[0] + rat_P[0] * vec_A[0] + rat_P[1] * vec_B[0], ll_O[1] + rat_P[0] * vec_A[1] + rat_P[1] * vec_B[1]];
            return ll_P;
        },

        //option是一个字典，确定了坐标系，ll_P是P点经纬度（形如列表[lng,lat]），返回P点的相对坐标（形如列表[x,y]）
        lnglat_to_coordinate(option, ll_P){
            let new_option={
                "ll_O": (option["cor_O"]),
                "cor_O": (option["ll_O"]),
                "ll_A": (option["cor_A"]),
                "cor_A": (option["ll_A"]),
                "ll_B": (option["cor_B"]),
                "cor_B": (option["ll_B"])
            };
            return this.coordinate_to_lnglat(new_option, ll_P);
        },
        

        /* points是一个关键节点列表，如[[114,39.7],[115,39.5]]
        side_len代表整个区域的边长(m)，grid_size对应相对坐标中的网格大小
        关键节点即当前用户与无人机位置
        把这些节点圈在一个side_len m*side_len m的正方形中，并以正方形的一个顶点和顶点的两条邻边为轴确定直角坐标系
        相对坐标下是一个grid_size*grid_size的正方形
        返回的是这个坐标系对应的option字典，可以用于坐标转换coordinate_to_lnglat和lnglat_to_coordinate*/
        determine_coordinate(points, side_len, grid_size){
            let min_lng=200;
            let max_lng=-200;
            let min_lat=200;
            let max_lat=-200;
            for(let i=0;i<points.length;i++){
            let pos=points[i];
            min_lng = Math.min(min_lng, pos[0]);
            max_lng = Math.max(max_lng, pos[0]);
            min_lat = Math.min(min_lat, pos[1]);
            max_lat = Math.max(max_lat, pos[1]);
            }  
            let center = [(min_lng+max_lng)/2,(min_lat+max_lat)/2];

            let R=6371000; //地球半径
            let r=R*Math.cos(center[1]/180*Math.PI);

            let delta_lng=side_len/2.0/r/Math.PI*180.0;
            let delta_lat=side_len/2.0/R/Math.PI*180.0;
            let ll_O = [center[0] - delta_lng, center[1] - delta_lat];
            let ll_A = [center[0] + delta_lng, center[1] - delta_lat];
            let ll_B = [center[0] - delta_lng, center[1] + delta_lat];
            return {"ll_O":ll_O,
                    "cor_O":[0.0,0.0],
                    "ll_A":ll_A,
                    "cor_A":[grid_size,0],
                    "ll_B":ll_B,
                    "cor_B":[0.0,grid_size]};
        },
        /*格式为 [["lng":114,"lat":39,"count":3.8]] data=[]即清空*/
        /*side即最小正方形边长 */
        setData(data){
          this.heat_count={};
          let geo_datas=[];
          for(let i=0;i<data.length;i++){
            let lnglat=[data[i].lng,data[i].lat];
            let count=data[i].count;
            if(this.heat_trans(count)>0){
              geo_datas.push({
                  "type": "Feature",
                  "properties": {
                    "count": count
                  },
                  "geometry": {
                    "coordinates": lnglat,
                    "type": "Point"
                  }
              });
            }
          }
          
          let geo=new Loca.GeoJSONSource({
              data: {
                      "features":geo_datas,
                      "type": "FeatureCollection"
                    }
          });
          this.base_heatmap.setSource(geo);
        },
        heat_trans(heats){
          for(let i=0;i<this.level.length;i++){
            if(heats<this.level[i])return i;
          }
          return this.level.length;
        },
        funcColor(index, feature){//根据热力平均值计算配色
          let avg=0,ranks=0;
          for(let i=0;i<feature.coordinates.length;i++){
            let cor=feature.coordinates[i];
            avg+=cor.properties.count;
          }
          avg=avg/feature.coordinates.length;
          ranks=this.heat_trans(avg)-1;
          return this.colors[ranks];
        },
        /*{"side":10}*/
        setOptions(options){
            let side=options.side;
            let unit="meters";
            
            /*红（小）到绿（大）的0~10级配色 */
            this.base_heatmap.setStyle({
                unit: unit,
                radius:side/1.4142,
                gap: 0,
                topColor: this.funcColor});
        },
        set(data,options){
            this.setOptions(options);
            this.setData(data);
        }
    }
}
</script>

<style>

</style>