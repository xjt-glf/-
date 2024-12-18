<template>
    <div class="base_scheme_list">
        <button class="base_scheme_list_1" :style="{background:list_color['1']}" @click="change('1')">定位部署</button>
        <button class="base_scheme_list_2" :style="{background:list_color['2']}" @click="change('2')">通信部署</button>
        <button class="base_scheme_list_3" :style="{background:list_color['3']}" @click="change('3')">通导部署</button>
    </div>
  </template>
  
<script>
import bus from './base_bus';//总线
  export default {
    name : "base_scheme_list",
    data() {
      return {
        choose_scheme:"null",
        list_color:{"1":"rgb(244,244,244)","2":"rgb(244,244,244)","3":"rgb(244,244,244)"},
      };
    },
    methods: {
      change(name){
        let tmp=this.choose_scheme;
        //禁止在网随人动打开时关闭方案
        if(name==this.choose_scheme && this.$parent.$refs.base_option.button_net_show){
          return ;
        }
        if(this.choose_scheme=="null"){
          this.list_color[name]='rgb(253, 178, 81)';
          this.choose_scheme=name;
        }
        else if(this.choose_scheme==name){
          this.list_color[name]='rgb(244, 244, 244)';
          this.choose_scheme='null';
        }
        else{
          this.list_color[this.choose_scheme]='rgb(244, 244, 244)';
          this.list_color[name]='rgb(253, 178, 81)';
          this.choose_scheme=name;
        }
        if((this.choose_scheme=="null" && tmp!="null")||(this.choose_scheme!="null" && tmp=="null")){
          this.$parent.$refs.base_option.change_scheme();
        }
        this.$parent.$refs.base_controller.set_scheme(this.choose_scheme);
      },
    },
    mounted(){
    }
  };
  </script>
  
  <style>
  .base_scheme_list_1 {
    width: 90%;
    height: 30%;
    left:50%;
    top: 16%;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    border:1px solid rgb(8, 6, 54);
    position: absolute;
    transform: translate(-50%,-50%);
    background: 'rgb(244, 244, 244)';
  }
  .base_scheme_list_2 {
    width: 90%;
    height: 30%;
    left:50%;
    top: 50%;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    border:1px solid rgb(8, 6, 54);
    position: absolute;
    transform: translate(-50%,-50%);
    background: 'rgb(244, 244, 244)';
  }
  .base_scheme_list_3 {
    width: 90%;
    height: 30%;
    left:50%;
    top: 84%;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    border:1px solid rgb(8, 6, 54);
    position: absolute;
    transform: translate(-50%,-50%);
    background: 'rgb(244, 244, 244)';
  }
  </style>