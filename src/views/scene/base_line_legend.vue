<template>
    <div class="base_line_legend">
        <p style="position:absolute;left:40%;top:0%;height=10%;">图例</p>
        <div style="position:absolute;height:10%;width:100%;left:0%;top:20%;">
            <img src="/src/images/Scene/UAV_move.png" alt="Smiley face" width="80" height="10" style="position:absolute;left:0%;top:50%">
            <p style="position:absolute;left:40%;top:0%">无人机运动方向</p>
        </div>
        <div style="position:absolute;height:10%;width:100%;left:0%;top:35%;">
            <img src="/src/images/Scene/null_link.png" alt="Smiley face" width="80" height="4" style="position:absolute;left:0%;top:50%">
            <p style="position:absolute;left:40%;top:0%">缺省链路</p>
        </div>
        <div style="position:absolute;height:10%;width:100%;left:0%;top:50%;">
            <img src="/src/images/Scene/pos_link.png" alt="Smiley face" width="80" height="4" style="position:absolute;left:0%;top:50%">
            <p style="position:absolute;left:40%;top:0%">定位链路</p>
        </div>
        <div style="position:absolute;height:10%;width:100%;left:0%;top:65%;">
            <img src="/src/images/Scene/com_link.png" alt="Smiley face" width="80" height="4" style="position:absolute;left:0%;top:50%">
            <p style="position:absolute;left:40%;top:0%">通信链路</p>
        </div>
    </div>
</template>
<script>
export default {
  name: "base_line_legend",
  data() {
    return {

    };
  },

}
</script>
<style>

</style>