<template>
    <div>
      
    </div>
</template>
<script>
export default {
    name: "sub-vue",
    props: ['AMap','map'],
    data() {
      return {
        dialogVisible:true,
        // 遮罩层
        // loading: true,
        // title: "",
        // 查询参数
      };
    },
    created() {
    },
    methods: { 
      childClick(){
        console.log(this.AMap);
        this.$parent.addIcon('xiaofangche',[115.372647,39.53935],46,28,'消防车1');
        
      }
    }
  };
</script>
<style>

</style>
