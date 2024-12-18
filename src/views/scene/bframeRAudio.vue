<template>
    <div style="color:white">
        <el-dialog
        title="语音通话窗口"
        :visible.sync="bframeRAudio_show"
        width="30%"
        :modal=false

        :fullscreen=true
        :before-close="changeShow"
        >
        
            <div class="">
                <!-- <img src="/src/images/Scene/audio.png" width="30" height="30" alt=""> -->
                <span style="vertical-align:top"><img src="/src/images/Scene/audio.png" style="vertical-align:top" width="30" height="30" alt="">当前通话质量良好</span>
                <br>
                <el-button style="margin-top:15px" v-if="!noiseReductionFlag" @click="noiseReduction">降噪关</el-button>
                <el-button style="margin-top:15px" type="success" v-if="noiseReductionFlag" @click="noiseReduction" >降噪开</el-button>
                <el-button type="danger" @click="changeShow">挂断</el-button>
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "bframeRAudio",
    props: {
        bframeRAudio_show:Boolean,
        AMap:Object,
        map:Object,
    },
    data() {
        return {
            noiseReductionFlag:true,
        }
    },
    created(){
        // console.log(this.bframeL1_show);
    },
    methods:{
        changeShow(){
            this.$parent.showBframeRAudio();
        },
        noiseReduction(){
            this.noiseReductionFlag=!this.noiseReductionFlag;
        }
    }
}
</script>
<style scoped>

</style>