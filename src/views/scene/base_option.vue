<template>
    <div class="base_option">
        <button class="base_option_btn_scheme" :style="{background:style_scheme}" @click="show_list">{{scheme_word}}</button>
        <button class="base_option_btn_net" :style="{background:style_net}" @click="change_net">{{net_word}}</button>
    </div>
  </template>
  
<script>
import bus from './base_bus';//总线
  export default {
    name : "base_option",
    data() {
      return {
        button_scheme_show:false,
        button_net_show:false,

        button_scheme_list_show:false,
        style_scheme:"rgb(244,244,244)",
        style_net:"rgb(244,244,244)",

        scheme_word:"通导部署方案",
        net_word:"开启网随人动",
      };
    },
    methods: {
        show_list(){
            this.button_scheme_list_show=!this.button_scheme_list_show;
            if(this.button_scheme_list_show){
                document.getElementsByClassName('bounce-frame-base-scheme-list')[0].style.zIndex=1025;
            }
            else{
                document.getElementsByClassName('bounce-frame-base-scheme-list')[0].style.zIndex=-1;
            }
        },
        change_scheme(){
            if(this.button_scheme_show==true && this.button_net_show==true){
                this.change_net();
            }
            this.button_scheme_show=!this.button_scheme_show;
            if(this.button_scheme_show){
                this.style_scheme="rgb(253, 178, 81)";
            }
            else{
                this.style_scheme="rgb(244, 244, 244)";
            }
        },
        change_net(){
            if(this.button_scheme_show==false && this.button_net_show==false){
                return;
            }
            this.button_net_show=!this.button_net_show;
            if(this.button_net_show){
                this.style_net="rgb(253, 178, 81)";
                this.net_word="关闭网随人动";
            }
            else{
                this.style_net="rgb(244, 244, 244)";
                this.net_word="开启网随人动";
            }
            this.$parent.$refs.base_controller.set_net_move(this.button_net_show);
        },
    },
    mounted(){
        this.style_scheme="rgb(244,244,244)";
        this.style_net="rgb(244,244,244)";
    }
  };
  </script>
  
  <style>
  .base_option_btn_scheme {
    width: 40%;
    height: 90%;
    left:25%;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    border:1px solid rgb(8, 6, 54);
    position: absolute;
    transform: translate(-50%,-50%);
    background: 'rgb(244, 244, 244)';
  }
  .base_option_btn_net {
    width: 40%;
    height: 90%;
    left:75%;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    border:1px solid rgb(8, 6, 54);
    position: absolute;
    transform: translate(-50%,-50%);
    background: 'rgb(244, 244, 244)';
  }
  </style>