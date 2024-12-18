<template>
  <button class="base_stat_extend" @click="extend">信息统计展开</button>
</template>
<script>

export default {
    data(){
        return {};
    },
    methods:{
        extend(){
            document.getElementsByClassName('bounce-frame-base-stat')[0].style.zIndex=1025;
            document.getElementsByClassName('bounce-frame-base-stat-sleep')[0].style.zIndex=-1;
            document.getElementsByClassName('bounce-frame-base-user-info')[0].style.left="17%";
            document.getElementsByClassName('bounce-frame-base-figure-1')[0].style.left="17%";
            document.getElementsByClassName('bounce-frame-base-figure-2')[0].style.left="17%";
            document.getElementsByClassName('bounce-frame-base-info')[0].style.left="17%";
          }
    }
}
</script>
<style>
.base_stat_extend{
  margin-top: 10px;
  margin-left: 5%;
  width: 30px;
  height: 100%;
  border: 0px;
  border-radius: 8px;
  font-size: 16px;
  border:1px solid rgb(8, 6, 54);
  top:50%;
  left:0%;
  position:absolute;
  writing-mode: vertical-lr;
  transform: translateY(-50%);
}
</style>