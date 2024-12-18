<template>
    <div class="base_SNR_show">
        <div class="base_SNR_show_info" ref="text">
        </div>
        <div class="base_SNR_show_close" @click="back_button">×</div>
    </div>
</template>
<script>
export default ({
    name: "base_SNR_show",
    props:{
    },
    data(){
        return {

        };
    },
    methods:{
        set(str){
            this.$refs.text.innerHTML=str;
        },
        back_button(){
            document.getElementsByClassName('bounce-frame-base-SNR-show')[0].style.zIndex=-1;
        }
    }
})
</script>

<style scoped>
.base_SNR_show_info{
    height:100%;
    width:100%;
    position:absolute;
    top:0%;
    left:0%;
}
.base_SNR_show_close{
    text-align: 'center';
    height:20px;
    width:20px;
    font-size: 18px;
    position:absolute;
    top:0%;
    right:0%;
    background: rgba(255,255,255,1);
    cursor: pointer;
  }
</style>