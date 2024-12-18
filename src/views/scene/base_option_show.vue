<template>
    <div class="base_option_show">
        <h3>部署方案：{{scheme_word}}</h3>
        <h3>网随人动：{{net_move_word}}</h3>
    </div>
</template>
<script>
export default{
    name :"base_option_show",
    data(){
        return{
            scheme_word:"未选择部署方案",
            net_move_word:"关闭",
        };
    },
    methods:{
        set(scheme,net_move){
            if(net_move==true){
                this.net_move_word="开启";
            }
            else{
                this.net_move_word="关闭";
            }
            let trans_map={
                "null":"未选择部署方案",
                "deploy_yanghongshuo":"定位部署",
                "deploy_kmeans_xieyaqi":"通信部署",
                "deploy_zhuwendi":"通导部署"
            }
            this.scheme_word=trans_map[scheme];
        },
    }
}
</script>
<style>

</style>