<template>
    <div class="base_scene_args">
        <div class="base_scene_arg_uav">
            <div class="base_scene_arg_content">
                <input type="text" v-model="uav_num" value="" id="base_scene_arg_uav"/>
            </div>
            <div class="base_scene_arg_name">
                <label for="base_scene_arg_uav">无人机数量</label>
            </div>
        </div>
        <div class="base_scene_arg_user">
            <div class="base_scene_arg_content">
                <input type="text" v-model="user_num" id="base_scene_arg_user" value=""/>
            </div>
            <div class="base_scene_arg_name">
                <label for="base_scene_arg_user">用户数量</label>
            </div>
        </div>
        <div class="base_scene_arg_position">
            <div class="base_scene_arg_content">
                <el-select v-model="position" style="width:40%" id="base_scene_arg_position">
                        <el-option v-for="item in possible_position"
                            :key="item" 
                            :label="possible_position[item]" 
                            :value="item">
                        </el-option>
                </el-select>
            </div>
            <div class="base_scene_arg_name">
                <label for="base_scene_arg_position">模拟位置</label>
            </div>
        </div>
        <div class="base_scene_arg_speed">
            <div class="base_scene_arg_content">
                <el-select v-model="speed" style="width:40%" id="base_scene_arg_speed">
                        <el-option v-for="item in possible_speed"
                            :key="item" 
                            :label="possible_speed[item]" 
                            :value="item">
                        </el-option>
                </el-select>
            </div>
            <div class="base_scene_arg_name">
                <label for="base_scene_arg_speed">模拟模式速度</label>
            </div>
        </div>
        <div class="base_scene_arg_submit">
            <input type="button" @click="submit" value="提交">
        </div>
    </div>
</template>
<script>
export default{
    name: "base_scene_args",
    data(){
        return {
            possible_position:{
                "1":"京西",
                /*"2":"云南",*/
            },
            possible_speed:{
                "1":"×1",
                "10":"×10",
                "100":"×100",
            },
            uav_num:"",
            user_num:"",
            position:"",
            speed:"",
        }
    },
    methods:{
        init(){
            this.uav_num="";
            this.user_num="";
            this.position="";
            this.speed="";
        },
        submit(){

            this.$axios.post("http://proj25.emr-c.com/v3/switch_scene",
            {"real_data":0,"bs_number":Number(this.uav_num),"user_number":Number(this.user_num),"user_rate":Number(this.speed),"location":Number(this.position)}).then((res)=>{
                if(res.code!=200){
                    alert(res.msg);
                    return ;
                }
                document.getElementsByClassName('bounce-frame-base-scene-args')[0].style.zIndex=-1;
                this.$parent.$refs.base_controller.is_real=false;
                this.$parent.$refs.base_controller.display_draw();
            }).catch((err)=>{
                alert(JSON.stringify(err));
            }
            );
            
        }
    }
}
</script>
<style>
.base_scene_args{
    background: rgba(255, 255, 255, 0.5);
    width:100%;
    height:100%;
}
.base_scene_arg_uav{
    width:100%;
    height:20%;
    position: absolute;
    top:0%;
}
.base_scene_arg_user{
    width:100%;
    height:20%;
    position: absolute;
    top:20%;
}
.base_scene_arg_position{
    width:100%;
    height:20%;
    position: absolute;
    top:40%;
}
.base_scene_arg_speed{
    width:100%;
    height:20%;
    position: absolute;
    top:60%;
}
.base_scene_arg_submit{
    width:20%;
    height:20%;
    left:40%;
    position: absolute;
    top:80%;
}
.base_scene_arg_name{
    position:absolute;
    left:0%;
    top:0%;
    height:100%;
    width:30%;
}
.base_scene_arg_content{
    position:absolute;
    left:30%;
    top:0%;
    height:100%;
    width:70%;
}
</style>