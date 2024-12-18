<template>
    <div class="base_stat_left_rect">
      <h1>信息统计</h1>
      <button class="base_stat_left_btn" style="top:6%">环境信息</button>
      
      <p class="base_stat_env_info">{{env_info}}</p>
               
      <button class="base_stat_left_btn" style="top:40%">方案特点</button>
      
      <p class="base_stat_scheme_info">{{scheme_info}}</p>
      
      <button class="base_stat_left_btn" style="top:70%" @click="show_per">总体性能</button>
      
      <p class="base_stat_performance">通信、定位总体性能</p>
       
      <button class="base_stat_left_btn" style="top:84%" @click="compare">方案对比</button>
      <button class="base_stat_back" @click="back">收回</button>         
    </div>
</template>

<script>
import bus from './base_bus';//总线
export default {
  name : "base_stat",
  data() {
    return {
      env_info:"",
      scheme_info:"",
    };
  },
  methods: {
      show_per(){
        document.getElementsByClassName('bounce-frame-base-info')[0].style.zIndex=1025;
      },
      compare(){
        if(this.$parent.$refs.base_controller.cal_mode()!=3)return ;
        this.$axios.post("http://proj25.emr-c.com/v3/switch",{"mode":"4",
        "scheme":this.$parent.$refs.base_controller.scheme}).then((res)=>{
          if(res.code!=200){
            alert(res.msg);
            return ;
          }
          let routeData = this.$router.resolve({
                path: '/Home',
                query:{type:"net_move_compare",scheme:this.$parent.$refs.base_controller.scheme},
          })
          console.log(routeData.href);
          window.open(routeData.href, '_blank');
        });
      },
      back(){
        document.getElementsByClassName('bounce-frame-base-stat')[0].style.zIndex=-1;
        document.getElementsByClassName('bounce-frame-base-stat-sleep')[0].style.zIndex=1025;
        document.getElementsByClassName('bounce-frame-base-user-info')[0].style.left="4%";
        document.getElementsByClassName('bounce-frame-base-figure-1')[0].style.left="4%";
        document.getElementsByClassName('bounce-frame-base-figure-2')[0].style.left="4%";
        document.getElementsByClassName('bounce-frame-base-info')[0].style.left="4%";
      }
  }
};
</script>

<style>
.base_stat_left_rect {
  left:5%;
  width: 100%;
  height: 100%;
  background-color: rgba(112,128,144,0.7);/*#BBFFFF;*/
  border:1px solid #000000;
  border-radius: 8px;
}
.base_stat_left_rect h1 {
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  position:absolute;
  top:2%;
  left:50%;
  transform: translateX(-50%);
}
.base_stat_left_btn {
  margin-top: 10px;
  margin-left: 5%;
  position:absolute;
  left: 2%;
  width: 80%;
  height: 30px;
  border: 0px;
  border-radius: 8px;
  font-size: 16px;
  border:1px solid rgb(8, 6, 54);
}
.base_stat_env_info{
  top: 12%;
}
.base_stat_scheme_info{
  top: 46%;
}
.base_stat_performance{
  top:75%;
}
.base_stat_back{
  margin-top: 10px;
  margin-left: 5%;
  width: 30px;
  height: 30%;
  border: 0px;
  border-radius: 8px;
  font-size: 16px;
  border:1px solid rgb(8, 6, 54);
  top:50%;
  right:0%;
  position:absolute;
  writing-mode: vertical-lr;
  transform: translateY(-50%);
}

.base_stat_left_rect p{
  margin:10px;
  font-size: 14px;
  left:2%;
  width:80%;
  position:absolute;
}
</style>