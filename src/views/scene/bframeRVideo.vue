<template>
    <div style="color:white">
        <el-dialog
        title="视频通话窗口"
        :visible.sync="bframeRVideo_show"
        width="30%"
        :modal=false

        :fullscreen=true
        :before-close="changeShow"
        >
        
            <div class="">
                <div style="width:70%;height: 80px;"></div>
                <img src="/src/images/Scene/video.png" style="vertical-align:top" width="30" height="30" alt="">                
                <span style="vertical-align:top">当前信号良好</span>
                <br>
                <el-button style="margin-top:15px" v-if="!highDefinition" @click="changeClarity">标清</el-button>
                <el-button style="margin-top:15px" type="success" v-if="highDefinition" @click="changeClarity" >高清</el-button>
                <el-button type="danger" @click="changeShow">挂断</el-button>
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "bframeRAudio",
    props: {
        bframeRVideo_show:Boolean,
        AMap:Object,
        map:Object,
    },
    data() {
        return {
            highDefinition:true,
        }
    },
    created(){
        // console.log(this.bframeL1_show);
    },
    methods:{
        changeShow(){
            this.$parent.showBframeRVideo();
        },
        changeClarity(){
            this.highDefinition=!this.highDefinition;
        }
    }
}
</script>
<style scoped>

</style>