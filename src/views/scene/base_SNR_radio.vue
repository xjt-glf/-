<template>
    <div class="base_SNR_radio">
        <el-row style="position:absolute;top:10%;">
            <el-radio v-model="choice" label="all">全部</el-radio>
        </el-row>
        <el-row style="position:absolute;top:30%;">
            <el-radio v-model="choice" label="5">≥5dB</el-radio>
        </el-row>
        <el-row style="position:absolute;top:50%;">
            <el-radio v-model="choice" label="20">≥20dB</el-radio>
        </el-row>
        <el-row style="position:absolute;top:70%;">
            <el-radio v-model="choice" label="30">≥30dB</el-radio>
        </el-row>
    </div>
</template>
<script>
export default ({
    name : "base_SNR_radio",
    data() {
      return {
        choice:"all",
      };
    },
})
</script>
<style>
.base_SNR_radio{
    position:absolute;
    height:100%;
    width:100%;
    background-color: rgba(255,255,255,0.5);
    box-shadow: 0 0 30px rgba(0,0,0,.1);
    border-radius: 8px;
    /* border: 5px solid #e3e5e7; */
    color: #18191c;}
</style>