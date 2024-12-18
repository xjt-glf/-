<template>
    <div class="base_device_list_sleep">
        <div class="base_device_list_sleep_title">
            设备信息
        </div>
        <input type="button" @click="list_extend" value="展开" class="base_device_list_sleep_extend">
    </div>
</template>
<script>
export default{
    data(){
        return {};
    },
    methods:{
        list_extend(){
            document.getElementsByClassName('bounce-frame-base-device-list')[0].style.zIndex=1025;
            document.getElementsByClassName('bounce-frame-base-device-list-sleep')[0].style.zIndex=-1;
        }
    }
}
</script>
<style>
.base_device_list_sleep{
    background: rgba(255, 255, 255, 0.5);
    height:100%;
    width:100%;
    position:absolute;
}
.base_device_list_sleep_title{
    width:100%;
    height:20%;
    position:absolute;
    top:5%;
    text-align: center;
}
.base_device_list_sleep_extend{
    width:20%;
    bottom:0%;
    height:30%;
    left:40%;
    bottom:5%;
    position:absolute;
}
</style>
