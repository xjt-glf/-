<template>
  <div class="base_info">
      <!--缩回按钮-->
      <button class="base_info_back_button" @click="back_button">
          ×
      </button>

      <div class="base_info_figure">
        <Base_figure ref="base_figure">
        </Base_figure>
      </div>
  </div>
</template>

<script>
import Base_figure from './base_figure.vue';
import bus from './base_bus';//总线
export default {
  name : "base_info",
  components:{Base_figure},
  data() {
    return {
      info_title:"",
      info_article:""
    };
  },
  methods: {
      clear(){
        this.set_info('','');
      },
      set_info(title,article){
          this.info_title=title;
          this.info_article=article;
      },
      back_button(){
        this.$parent.$refs.base_figure_zoom_in.back_button();
        document.getElementsByClassName('bounce-frame-base-info')[0].style.zIndex=-1;
      },
      //figure的parent必须有这个函数，最终指向base_controller
      set_zoom_in_close(close_func){
        this.$parent.$refs.base_controller.set_zoom_in_close(close_func);
      },
      //figure的parent必须有这个函数，最终指向base_controller
      set_zoom_in_option(args){
        this.$parent.$refs.base_controller.set_zoom_in_option(args);
      }
  }
};
</script>

<style>
.base_info{
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
}
.base_info_back_button{
  width: 5%;
  height: 7%;
  top:0%;
  right:0%;
  background-color: rgba(255,255,255);
  position: absolute;
  cursor: pointer;
}
.base_info_figure{
  width: 100%;
  height: 93%;
  top:7%;
  position: absolute;
  z-index:1025;
}
</style>