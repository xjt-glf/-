<template>
    <div class="base_switch">
      <button class="base_switch_topo" :style={background:topo_color} @click="topo_switch">
        网络拓扑
      </button>
      <button class="base_switch_heat" :style={background:heat_color} @click="heat_switch">
        态势图
      </button>
      
    </div>
  </template>
  
<script>
import bus from './base_bus';//总线
  export default {
    name : "base_switch",
    data() {
      return {
        topo_show:false,
        heat_show:false,
        topo_color:'rgb(244,244,244)',
        heat_color:'rgb(244,244,244)',
      };
    },
    methods: {
        topo_switch(){
            this.topo_show=!this.topo_show;
            if(this.topo_show){
              this.topo_color='rgb(253, 178, 81)';
              document.getElementsByClassName('bounce-frame-base-SNR-radio')[0].style.zIndex=1025;
            }
            else{
              document.getElementsByClassName('bounce-frame-base-SNR-radio')[0].style.zIndex=-1;
              this.topo_color='rgb(244, 244, 244)';
            }
            this.$parent.$refs.base_controller.set_topo_show(this.topo_show);
        },
        heat_switch(){
            this.heat_show=!this.heat_show;
            if(this.heat_show){
              this.heat_color='rgb(253, 178, 81)';
            }
            else{
              this.heat_color='rgb(244, 244, 244)';
            }
            this.$parent.$refs.base_controller.set_heat_show(this.heat_show);
        }
    },
    mounted(){
      this.topo_color='rgb(244,244,244)';
      this.heat_color='rgb(244,244,244)';
    }
  };
  </script>
  
  <style>
  .base_switch{
    position:absolute;
    height:100%;
    width:100%;
  }
  .base_switch_topo{
    position: absolute;
    left:10%;
    top:5%;
    height:40%;
    width:80%;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    border:1px solid rgb(8, 6, 54);
  }
  .base_switch_heat{
    position: absolute;
    left:10%;
    top:50%;
    height:40%;
    width:80%;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    border:1px solid rgb(8, 6, 54);
  }
  </style>