<template>
    <div style="color:white">
        <!-- <div class='title'>基本信息统计</div>
        <div class='c'>灾情信息:</div>
        <div id=''></div>
        <div class='c'>火点数:</div>
        <div id=''></div>
        <div class='c'>火线长:</div>
        <div id=''></div>
        <div class='c'>着火面积:</div>
        <div id=''></div>
        <div class='c'>着火类型:</div>
        <div id=''></div>
        <div class='c'>手动标注:</div>
        <div id=''></div> -->
        <el-dialog
        title="火灾基本信息统计"
        :visible.sync="bframeL1_show"
        width="30%"
        :modal=false

        :fullscreen=true
        :before-close="changeShow"
        >
        <!-- <span>这是居中弹窗1</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeShow">取 消</el-button>
            <el-button type="primary" @click="changeShow">确 定</el-button>
        </span> -->
            <div class="">
                <!-- <div class='title'>基本信息</div> -->
                <div class='c'>灾情信息:</div>
                <div id='fireInfo'>国家级安全应急科普基地东侧发生山火</div>
                <div class='c'>火点数:</div>
                <div id='firePointNum'>14</div>
                <div class='c'>火线长:</div>
                <div id='fireLineLength'>8.37公里</div>
                <div class='c'>着火面积:</div>
                <div id='fireArea'>5.16平方公里</div>
                <div class='c'>着火类型:</div>
                <div id='fireType'>小型山火</div>
                <div class='c'>手动标注:</div>
                <div id=''></div> 
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "sub-vue",
    props: {
        bframeL1_show:Boolean
    },
    data() {
        return {

        }
    },
    created(){
        // console.log(this.bframeL1_show);
    },
    methods:{
        changeShow(){
            this.$parent.showBframeL1();
        },
    }
}
</script>
<style scoped>
/* .el-dialog{
    background: rgb(65, 62, 62,0.6);
} */
</style>