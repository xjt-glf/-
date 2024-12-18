<template>
  <div class="base_device_list_topo" id="base_device_list_topo_box">
    <canvas id="base_device_list_topo_canvas" style="{height:size;width:size}"> </canvas>
  </div>
</template>
<script>
import * as tools from "./base_topo_class.js";
export default {
  data() {
    return {size:100,};
  },
  methods: {
    draw(name,matrix){
        let canvas=document.getElementById('base_device_list_topo_canvas');
        let box = document.getElementById("base_device_list_topo_box");
        this.size = Math.min(box.offsetHeight,box.offsetWidth);
        tools.draw(canvas,name,matrix,this.size);
    }
  },
};
</script>

<style>
.base_device_list_topo {
  position: absolute;
  width: 100%;
  height: 100%;
}
#base_device_list_topo_canvas{
  position: absolute;
  left:50%;
  transform:translateX(-50%);
}
</style>