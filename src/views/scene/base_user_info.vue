<template>
    <div class="base_user_info">
        <p style="text-align: center">用户数据</p>
        <p style="text-align: center">{{user_name}}</p>
        <p style="text-align: center">{{lnglat}}</p>
        <button class="base_user_info_close" @click="back_button">×</button>
    </div>
  </template>
  
<script>
import bus from './base_bus';//总线
  export default {
    name : "base_user_info",
    data() {
      return {
        user_name:"",
        lnglat:"",
      };
    },
    methods: {
        back_button(){
            this.$parent.$refs.base_controller.base_figure_id="";
            this.$parent.$refs.base_figure_zoom_in.back_button();
            document.getElementsByClassName('bounce-frame-base-user-info')[0].style.zIndex=-1;
            document.getElementsByClassName('bounce-frame-base-figure-1')[0].style.zIndex=-1;
            document.getElementsByClassName('bounce-frame-base-figure-2')[0].style.zIndex=-1;
        },
        set_info(data){
            this.user_name=data.name;
            this.lnglat="经纬度"+data.lng.toFixed(6)+","+data.lat.toFixed(6);
        },
        clear(){
            this.user_name="";
            this.lnglat="经纬度";
        }
    }
  };
  </script>
  
  <style>
  .base_user_info_close{
    text-align: 'center';
    height:20px;
    width:20px;
    position:absolute;
    top:0%;
    right:0%;
    background: rgba(255,255,255,1);
    cursor: pointer;
  }
  </style>