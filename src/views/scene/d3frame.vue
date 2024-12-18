<template>
    <div class="d3frame">
        <el-dialog
        
        v-dialogDrag
        title=""

        :visible.sync="d3frame_show"
        :modal=false
        :append-to-body=true
        :close-on-click-modal =false
        :before-close="changeShow"
        > 
        <model-gltf 
        
        backgroundColor=rgb(61,73,106)
        :DatumCoord ="this.Coords"
        :rotation="this.modelOrat" 
        :position="this.position"
        :initPitch="initPitch"
        @on-click='computeLnglat' 
        @imgrotation="setImgrotation"
        @camRot="handlecamRot"
        :src="cModelsrc"></model-gltf>
        <vue-drag-resize-rotate style="border:0px;position:absolute;right:20px;bottom:5px;align-content: center;width:50px;height:50px;"
        :parent="true"
        :draggable="false"
        :resizable="false"
        :rotatable="false"
        :r="imgrotation"
        >
        <img id="imgznz"  style="weight:100%;height:100%;" src="../../images/Scene/znz.png"/>
        </vue-drag-resize-rotate>
        </el-dialog>
        
    </div>
</template>
<script>
import { ModelObj,ModelGltf } from '..//..//vue-3d-model';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import VueDragResizeRotate from "@gausszhou/vue-drag-resize-rotate";
export default{
    name:"d3model",
    props: {
        pSRT:{
            type:Object,
            default(){
                return {
                    'Scale':0,
                    'Rotation':[[1,0,0],[0,1,0],[0,0,1]],
                    'Transition':[[0],[0],[0]],
                }
            }
        },
        pModelrat:{
            type:Array,
            default(){
                return {x:0,
                    y:0,
                    z:0
                }
            }
        },
        pCoords:{
            type:Array,
            default(){
                return [[0,0,0]]
            }
        },
        d3frame_show:Boolean,
        d3frame_click_event:Boolean,
        modelsrc:{
            type:String,
            default(){
                return '/src/images/Scene/Duck.gltf'
            }
        }
    },
    components: { ModelObj,ModelGltf ,VueDragResizeRotate},
    data(){
        return{
            cModelsrc:this.modelsrc,
            Coords:this.pCoords,
            modelrat:this.pModelrat,
            scale:0,
            rotation:[[0,0,0],[0,0,0],[0,0,0]],
            transtion:[[0],[0],[0]],
            srt:this.pSRT,
            position:{x:0,y:0,z:0},
            imgrotation:0,
            //modelOrat:null,//{x:0,y:0,z:0},
        }

    },
    watch:{
        modelsrc:{
            deep:true,
            handler(newValue,val){
                this.cModelsrc=newValue;
            }
        },
        pCoords:{
            deep:true,
            handler(newValue,val){
                this.Coords=newValue;
            }
        },
        pSRT:{
            deep:true,
            handler(newValue,val){
                this.srt = newValue;
                this.scale=newValue['Scale']
                //console.log(this.scale)
                this.rotation = newValue['Rotation']
                this.transtion = newValue['Transition']
            }
        },
        pModelrat:{
            deep:true,
            handler(newValue,val){
                this.modelrat = newValue
            }
        }
    },
    created(){

    },
    methods:{
        handlecamRot(rot){
            //console.log(rot)
            this.$parent.map.setRotation(rot.xy,true)
            this.$parent.map.setPitch(rot.z,true)
        },
        setImgrotation(nval){
            this.imgrotation=nval
        },
        changeShow(){
        this.$parent.showd3frame();
        
        },
        setRotation(rot)
        {
            
            this.modelrat.x = Math.PI / 180 * ((rot[0]) || 0);
            this.modelrat.y = Math.PI / 180 * (rot[1] || 0);
            this.modelrat.z = Math.PI / 180 * (rot[2] || 0);
            
        },
        setSRT(response){
            this.scale=response['Scale']
            //console.log(this.scale)
            this.rotation = response['Rotation']
            this.transtion = response['Transition']
            
            //console.log(this.rotation)
            //console.log(this.transtion)
        },
        computeLnglat(event){
            if(this.d3frame_click_event){
                if(event){

                var tPoint = [0,0,0];
                for(var i =0;i<3;i++){
                    //console.log(tPoint);
                    tPoint[i] = this.rotation[i][0]*event['point']['x']+this.rotation[i][1]*event['point']['y']+this.rotation[i][2]*event['point']['z']
                    //console.log(tPoint);
                    tPoint[i]*=this.scale;
                    //console.log(tPoint);
                    tPoint[i]=parseFloat(this.transtion[i])+parseFloat(tPoint[i])

                }
                
                var PositionMoc = [tPoint[0], tPoint[1]];
                //console.log(PositionMoc);
                var PositionLntLat = [this.$parent.map.coordsToLngLat(PositionMoc).lng,this.$parent.map.coordsToLngLat(PositionMoc).lat];
                }
            }
        }
    },
    computed:{
        modelOrat:function(){
            return  {
                x:Math.PI / 180 * ((this.modelrat[0]) || 0),
                y:Math.PI / 180 * (this.modelrat[1] || 0),
                z:Math.PI / 180 * (this.modelrat[2] || 0)}
        },
        initPitch:function(){
            //return this.$parent.map.getPitch()
        }
    },
    mounted(){
       
    }

}
</script>
<style scoped>
/deep/ .el-dialog__wrapper{

  pointer-events: none;
}
/deep/ .el-dialog{
    background: rgba(61,73,106,1);
    pointer-events: auto;
    position:absolute;
    bottom: 0;
    left:0;
    width: 37%;
    height:85%;
}
/deep/ .el-dialog__body{
    height:90%;

}
</style>
