<template>
    <div class="base_device_list">
        <div class="base_device_list_device">
            <div class="base_device_list_device_content">
                <el-select v-model="device" style="width:90%" id="base_device_list_device_content" @change="selectChanged">
                    <!--:label是标签，:value对应v-model-->    
                    <el-option v-for="(item,key) in possible_device" :label=item.name :value=key>
                            
                        </el-option>
                </el-select>
            </div>
            <div class="base_device_list_device_name">
                <label for="base_device_list_device_content">设备</label>
            </div>
        </div>
        <div class="base_device_list_name">
            <span>{{device_name}}</span>
        </div>
        <div class="base_device_list_table">
            <div style="height:100%;width:100%">
                <el-row style="position:absolute;height:25%;width:100%;top:0%">
                    <el-col :span="1" class="base_device_list_box_1" style="width:38%;left:2%">通信速率</el-col>
                    <el-col :span="1" class="base_device_list_box_1" style="width:58%;left:40%">{{rate}}</el-col>
                </el-row>
                <el-row style="position:absolute;height:25%;width:100%;top:25%">
                    <el-col :span="1" class="base_device_list_box_2" style="width:38%;left:2%">位置（网络定位）</el-col>
                    <el-col :span="1" class="base_device_list_box_2" style="width:58%;left:40%">{{net_pos}}</el-col>
                </el-row>
                <el-row style="position:absolute;height:25%;width:100%;top:50%">
                    <el-col :span="1" class="base_device_list_box_1" style="width:38%;left:2%">位置（GPS）</el-col>
                    <el-col :span="1" class="base_device_list_box_1" style="width:58%;left:40%">{{GPS_pos}}</el-col>
                </el-row>
                <el-row style="position:absolute;height:25%;width:100%;top:75%">
                    <el-col :span="1" class="base_device_list_box_2" style="width:38%;left:2%">定位精度</el-col>
                    <el-col :span="1" class="base_device_list_box_2" style="width:58%;left:40%">{{pos_auc}}</el-col>
                </el-row>
            </div>
        </div>
        <div class="frame_base_device_list_topo">
            <Base_device_list_topo ref="base_device_list_topo">
            </Base_device_list_topo>
        </div>
        <input type="button" @click="list_back" value="收起" class="base_device_list_back">
    </div>
</template>
<script>
import Base_device_list_topo from './base_device_list_topo.vue';
export default{
    name: "base_scene_args",
    components:{
        Base_device_list_topo,
    },
    data(){
        return {
            possible_device:{
            },
            device:"",
            device_name:"",
            topo:{"name":[],"matrix":[]},
            rate:"",
            net_pos:"",
            GPS_pos:"",
            pos_auc:"",
        }
    },
    methods:{
        init(){
            this.possible_device={};
            this.device="";
            this.topo={"name":[],"matrix":[]};

        },
        selectChanged(){
            this.device_name=this.possible_device[this.device].name;
        },
        draw(){
            if(this.device in this.possible_device){
                let obj=this.possible_device[this.device];
                this.rate=obj.rate;
                this.net_pos=obj.net_pos;
                this.GPS_pos=obj.GPS_pos;
                this.pos_auc=obj.pos_auc;
            }
            
            
            if(this.topo.name.length>0)
                this.$refs.base_device_list_topo.draw(this.topo.name,this.topo.matrix);
            
        },
        list_back(){
            document.getElementsByClassName('bounce-frame-base-device-list')[0].style.zIndex=-1;
            document.getElementsByClassName('bounce-frame-base-device-list-sleep')[0].style.zIndex=1025;
        }
    }
}
</script>
<style>
.base_device_list_device_name{
    position:absolute;
    left:0%;
    top:0%;
    height:100%;
    width:30%;
    text-align:center;
}
.base_device_list_device_content{
    position:absolute;
    left:30%;
    top:0%;
    height:100%;
    width:70%;
}
.base_device_list{
    background: rgba(255, 255, 255, 0.5);
    width:100%;
    height:100%;
}
.base_device_list_device{
    width:100%;
    height:10%;
    position: absolute;
    top:0%;
}
/*设备名称*/
.base_device_list_name{
    width:100%;
    height:10%;
    position: absolute;
    top:10%;
    text-align:center;
}
.base_device_list_table{
    width:100%;
    height:30%;
    position: absolute;
    top:20%;
}
.base_device_list_box_1{
    background: rgba(210, 221, 245, 1);
    height:100%;
    text-align:center;
}
.base_device_list_box_2{
    background: rgba(234, 239, 250, 1);
    height:100%;
    text-align:center;
}
.frame_base_device_list_topo{
    width:100%;
    height:40%;
    position: absolute;
    top:50%;
}
.base_device_list_back{
    width:20%;
    bottom:0%;
    height:5%;
    left:40%;
    position:absolute;
}
</style>