<template>
    <div class="base_scene_radio">
        <input type="radio" v-model="picked" id="base_scene_simulation" value="simulation" @change="changeHandler"/>
		<label for="base_scene_simulation">模拟</label>
		<input type="radio" v-model="picked" id="base_scene_real" value="real" @change="changeHandler"/>
		<label for="base_scene_real">真实</label>
    </div>
</template>
<script>
export default{
    name: "base_scene_radio",
    data(){
        return {
            picked:null,
        }
    },
    methods:{
        changeHandler(){
            
            if(this.picked=="simulation"){
                if(this.$parent.$refs.base_controller.base_show){
                    this.$parent.$refs.base_controller.display_draw();
                }
                this.$parent.$refs.base_scene_args.init();
                document.getElementsByClassName('bounce-frame-base-scene-args')[0].style.zIndex=1025;
            }
            else if(this.picked=="real"){
                document.getElementsByClassName('bounce-frame-base-scene-args')[0].style.zIndex=-1;
                if(this.$parent.$refs.base_controller.base_show){
                    this.$parent.$refs.base_controller.display_draw();
                }
                this.$axios.post("http://proj25.emr-c.com/v3/switch_scene",{"real_data":1}).then((res)=>{
                    if(res.code!=200){
                        alert(res.msg);
                        return ;
                    }
                    alert("已切换至真实模式");
                    this.$parent.$refs.base_controller.is_real=true;
                    this.$parent.$refs.base_controller.display_draw();
                }).catch(err=>{
                    alert(JSON.stringify(err));
                });
                
            }
        }
    }
}
</script>
