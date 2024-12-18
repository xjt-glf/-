<template>
    <div class="base_device_set_sleep">
        <div class="base_device_set_sleep_title">
            用户需求选择
        </div>
        <input type="button" @click="set_extend" value="展开" class="base_device_set_extend">
    </div>
</template>
<script>
export default{
    data(){
        return {
            
        };
    },
    methods:{
        set_extend(){
            document.getElementsByClassName("bounce-frame-base-device-set-sleep")[0].style.zIndex=-1;
            document.getElementsByClassName("bounce-frame-base-device-set")[0].style.zIndex=1025;
        }
    }
}
</script>
<style>
.base_device_set_sleep{
    width:100%;
    height:100%;
    position:absolute;
    background:rgba(255,255,255,0.5);
}
.base_device_set_sleep_title{
    width:100%;
    height:20%;
    position:absolute;
    top:5%;
    text-align: center;
}
.base_device_set_extend{
    width:20%;
    bottom:5%;
    height:30%;
    left:40%;
    position:absolute;
}
</style>