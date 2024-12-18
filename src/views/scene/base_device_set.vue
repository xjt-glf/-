<template>
    <div class="base_device_set">
        <div style="position:absolute;top:0%;height:40%;width:100%;">
            <div :style="{'max-height': '100%' }" style="overflow-y:scroll;" >
                <div v-for="(item,key) in device_list" v-bind:style="{background:Number(key)%2==0?'rgba(210, 221, 245, 1)':'rgba(234, 239, 250, 1)',height:'50px'}">
                    <el-row style="height:20%;width:100%;" v-if="isFresh">
                        <div style="height:100%;width:24%;left:2%;position:absolute;font-size:14px;">
                            <h3 style="text-align: center; display: flex; align-items: center;">
                                {{item[0]}}
                            </h3>
                        </div>
                        <div style="height:100%;width:35%;left:26%;position:absolute">
                            <el-button :style="{background: button_color_pos(item[1])}" @click="change_pos(key)">定位保障
                            </el-button>
                        </div>
                        <div style="height:100%;width:35%;left:63%;position:absolute">
                            <el-button :style="{background: button_color_video(item[2])}" @click="change_video(key)">视频通话保障
                            </el-button>
                        </div>
                    </el-row>
                </div>
            </div>
        </div>
        <div style="position:absolute;top:45%;height:40%;width:100%;">
            <div :style="{'max-height': '100%' }" style="overflow-y:scroll;" >
                <div v-for="(item,key) in air_line" v-bind:style="{background:Number(key)%2==0?'rgba(210, 221, 245, 1)':'rgba(234, 239, 250, 1)',height:'50px'}">
                    <el-row style="height:20%;width:100%;" v-if="isFresh">
                        <div style="height:100%;width:24%;left:2%;position:absolute;font-size:14px">
                            <h3 style="text-align: center; display: flex; align-items: center;">
                                {{item[0]}}
                            </h3>
                        </div>
                        <div style="height:100%;width:72%;left:26%;position:absolute">
                            <el-button :style="{background: button_color_airline(item[1])}" @click="change_airline(key)">航迹显示
                            </el-button>
                        </div>
                        
                    </el-row>
                </div>
            </div>
        </div>
        <input type="button" @click="reset" value="全部重置" class="base_device_set_reset">
        <input type="button" @click="set_back" value="收起" class="base_device_set_back">
    </div>
</template>
<script>
export default{
    data(){
        return {
            url_set_device:"http://proj25.emr-c.com/v3/set_device",
            isFresh:false,
            device_list:{},
            air_line:{},
        };
    },
    methods:{
        //每次更新device_list的时候调用一次update()
        update(){
            this.isFresh=false;
            this.$nextTick(()=>{
                this.isFresh=true;
            });
        },
        button_color_pos(x){
            if(x==0){
                return 'rgb(253,179,80)';
            }
            else{
                return 'rgb(255,255,255)';
            }
        },
        button_color_video(x){
            if(x==1){
                return 'rgb(253,179,80)';
            }
            else{
                return 'rgb(255,255,255)';
            }
        },
        button_color_airline(x){
            if(x==1){
                return 'rgb(253,179,80)';
            }
            else{
                return 'rgb(255,255,255)';
            }
        },
        get_gps(){
            let ret=[];
            for(let i=0;i<this.device_list.length;i++){
                ret.push(this.device_list[i][1]);
            }
            return ret;
        },
        get_video(){
            let ret=[];
            for(let i=0;i<device_list.length;i++){
                ret.push(device_list[i][2]);
            }
            return ret;
        },
        change_pos(key){
            this.$axios.post("http://proj25.emr-c.com/v3/set_device",{"user_device_id":Number(key),"gps_enable":1-this.device_list[key][1],"video_enable":this.device_list[key][2]}).then(
                (res)=>{
                    if(res.code!=200){
                        alert(res.msg);
                    }
                }
            ).catch(err=>{
                alert(JSON.stringify(err));
            });
        },
        change_video(key){
            this.$axios.post("http://proj25.emr-c.com/v3/set_device",{"user_device_id":Number(key),"gps_enable":this.device_list[key][1],"video_enable":1-this.device_list[key][2]}).then(
                (res)=>{
                    if(res.code!=200){
                        alert(res.msg);
                    }
                }
            ).catch(err=>{
                alert(JSON.stringify(err));
            });
        },
        change_airline(key){
            this.$parent.$refs.base_controller.air_line[key].able=1-this.$parent.$refs.base_controller.air_line[key].able;
            this.update();
        },
        set_back(){
            document.getElementsByClassName("bounce-frame-base-device-set")[0].style.zIndex=-1;
            document.getElementsByClassName("bounce-frame-base-device-set-sleep")[0].style.zIndex=1025;
        },
        reset(){
            this.$axios.post("http://proj25.emr-c.com/v3/set_device",{"user_device_id":0,"gps_enable":0,"video_enable":0}).then(
                (res)=>{
                    if(res.code!=200){
                        alert(res.msg);
                    }
                }
            ).catch(err=>{
                alert(JSON.stringify(err));
            });
        },
    },
    mounted(){
        this.update();
    }
}
</script>
<style>
.base_device_set{
    width:100%;
    height:100%;
    position:absolute;
    background:rgba(255,255,255,0.5);
}
.base_device_set_reset{
    width:20%;
    bottom:12%;
    height:5%;
    left:40%;
    position:absolute;
}
.base_device_set_back{
    width:20%;
    bottom:0%;
    height:5%;
    left:40%;
    position:absolute;
}
</style>