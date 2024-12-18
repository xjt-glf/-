<template>
  <el-dialog
    title="基本信息"
    :visible.sync="bframeL3_show"
    :modal="false"
    :fullscreen="true"
    :before-close="close"
  >
    <div style="position: absolute; width: 90%; height: 80%; overflow: auto">
      <el-collapse v-model="activeName" @change="changeCollapse" accordion>
        <el-collapse-item
          v-for="plan in plans"
          :title="plan.name + '-' + plan.state"
          :name="plan.id"
          :key="plan.id"
        >
          <el-button type="info" plain @click="showActionPlan(plan)">预案编辑</el-button><br />
          <!-- <el-button @click="showActionPlan">案例匹配</el-button><br /> -->
          <!-- <el-button @click="showActionPlan">预计效果</el-button><br /> -->
          <el-button type="info" plain @click="showPlanLoadFun(plan)">预案加载</el-button><br />
          <el-button type="info" plain @click="releasePlan(plan.id)">预案发布</el-button><br />
          <el-button type="info" plain @click="deletePlan(plan.id)">预案删除</el-button><br />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div style="top: 90%; position: absolute; width: 90%">
      <el-button @click="addPlan">添加应急预案</el-button>
    </div>

    <!-- 添加应急预案弹窗 append-to-body -->
    <el-dialog
      width="35%"
      title="添加应急预案提交表单"
      :visible.sync="addPlanVisible"
      :fullscreen="false"
      :modal="true"
      append-to-body
    >
      <label>应急预案名称 :</label>
      <el-input v-model="planForm.name"></el-input><br /><br />
      <el-button type="primary" @click="submitForm">立即创建</el-button><br /><br />
    </el-dialog>

    <el-dialog
      id="expectedEffectContorl"
      width="30%"
      title="应急预案预计效果控制台"
      :visible.sync="expectedEffectVisible"
      :fullscreen="true"
      :modal="false"
      append-to-body
    >
      <div id="contorl">
        <el-button type="primary" @click="loadPlanObj">加载资源</el-button>
        <el-button type="primary" @click="mockExecute">模拟执行指令</el-button>
        <!-- <el-button type="primary">执行指令</el-button> -->
      </div>
    </el-dialog>

    <el-dialog
      width="30%"
      id="progress"
      :visible.sync="expectedEffectVisible"
      :fullscreen="true"
      :modal="false"
      append-to-body
    >
      <div >
        <el-progress :percentage="Math.round(count/total*100)" style="width: 100%;"></el-progress>
      </div>
    </el-dialog>

    
    <!-- <div>
        <el-checkbox v-model="isMaterielShow" @change="handleMaterielShow">物资</el-checkbox>
        <el-checkbox v-model="isProcessionShow" @change="handleProcessionShow">队伍</el-checkbox>
        <el-checkbox v-model="isResourceShow" @change="handleResourceShow">资源</el-checkbox>   
        <el-checkbox v-model="isArrowShow" @change="handleArrowShow">路径指引</el-checkbox>
      </div> -->
    <!-- <div class="function">
      <div class="message_show">
        <EmergencyPlanShow v-show="activeName" ></EmergencyPlanShow>
      </div>
      </div> -->
  </el-dialog>
</template>

<script>
import EmergencyPlanShow from "./EmergencyPlanShow.vue";
export default {
  name: "bframeL3",
  props: {
    bframeL3_show: Boolean,
    showBframeC2: Function,
  },
  components: { EmergencyPlanShow },
  data() {
    return {
      planForm: {
        name: "",
      },
      addPlanVisible: false,

      expectedEffectVisible: false,
      // isMaterielShow:false,
      // isProcessionShow:false,
      // isResourceShow:false,
      // isArrowShow:false,
      activeName: "",
      // icons: {
      //   medical_equipment: "/src/assets/imgs/medical_equipment.png",
      //   food: "/src/assets/imgs/food.png",
      //   firefighter_gear: "/src/assets/imgs/firefighter_gear.png",
      //   firefighting_equipment: "/src/assets/imgs/firefighting equipment.png",
      //   water_source: "/src/assets/imgs/water_source.png",
      //   emergency_rescue_personnel: "/src/assets/imgs/emergency_rescue_personnel.png",
      //   medical_personnel: "/src/assets/imgs/medical_personnel.png",
      //   monitoring_personnel: "/src/assets/imgs/monitoring_personnel.png",
      //   firefighter: "/src/assets/imgs/firefighter.png",
      // },
      // markers: [
      //   { type: "medical_equipment", info: "" },
      //   { type: "food", info: "" },
      //   { type: "firefighter_gear", info: "" },
      //   { type: "firefighting_equipment", info: "" },
      //   { type: "water_source", info: "" },
      //   { type: "emergency_rescue_personnel", info: "" },
      //   { type: "medical_personnel", info: "" },
      //   { type: "monitoring_personnel", info: "" },
      //   { type: "firefighter", info: "" },
      // ],
      plans: [],
      existMarkerId:[],
      timer:null,
      count:0,
      total:30,
    };
  },
  watch:{
    bframeL3_show:function(newValue){
      if(newValue){
        this.getPlans()
      }
    }
  },
  methods: {
    close(done) {
      // this.$parent.showBframeL3();
      this.$parent.bframeL3_show = false;
      done()
    },

    showActionPlan(plan) {
      this.showBframeC2();
      this.$bus.$emit("sendPlan", plan);
    },

    addPlan() {
      this.addPlanVisible = true;
    },

    submitForm() {
      const options = {
        method: 'GET',
        url: 'http://47.94.10.119:20008//ErpMange/addErp',
        params : { name:this.planForm.name }
      }
      this.$axios.request(options)
      .then(response=>{
        this.getPlans()
      })
      .catch(err=>{
        this.$message.error("请求异常！");
      })
      this.addPlanVisible = false;
      this.planForm = {};
    },

    showPlanLoadFun() {
      this.expectedEffectVisible = true;
    },

    releasePlan(id) {
      alert("发布预案！！！");
    },

    cleanMarker(){
      this.existMarkerId.forEach((id)=>{
        this.$emit("removeMarker", id)
      })
      this.existMarkerId.length = 0
    },

    changeCollapse(activeNames) {
      this.expectedEffectVisible = false;
      this.cleanMarker();
      clearInterval(this.timer);
    },

    getPlans(){
      const options = {
        method: 'GET',
        url: 'http://47.94.10.119:20008//ErpMange/getErp',
      }
      this.$axios.request(options)
      .then(response=>{
        this.plans = response.data
      })
      .catch(err=>{
        this.$message.error("请求异常！");
      })
    },

    deletePlan(id) {
      const options = {
        method: 'GET',
        url: 'http://47.94.10.119:20008//ErpMange/delErp',
        params:{
          id: id
        }
      }
      this.$axios.request(options)
      .then(response=>{
        this.getPlans()
      })
      .catch(err=>{
        this.$message.error("请求异常！");
      })
    },

    loadPlanObj(){
      this.cleanMarker()
      const options = {
          method: 'GET',
          url: 'http://47.94.10.119:20008//RROMange/getRRO',
          params:{
            plan_id: this.activeName
          }
        }
        this.$axios.request(options)
        .then(response=>{
          let objs = response.data
          objs.forEach((obj)=>{
            this.$emit("addMarker", obj)
            this.existMarkerId.push(obj.id)
          })
        })
        .catch(err=>{
          this.$message.error("请求异常！");
        })
    },

    mockExecute(){
      clearInterval(this.timer)
      this.cleanMarker()
      this.loadPlanObj()
      this.count = 0
      this.timer = setInterval(()=>{
        if(this.count < this.total){
          const options = {
          method: 'GET',
          url: 'http://47.94.10.119:20008//CommandManger/loadPlan',
          params:{
            plan_id: this.activeName,
            second: this.count
          }
        }
        this.$axios.request(options)
        .then(response=>{
          let objs = response.data
          objs.forEach((obj)=>{
            this.$emit("setPosition", obj)
          })
        })
        .catch(err=>{
          this.$message.error("请求异常！");
        })
          ++this.count;
        }
        else{
          clearInterval(this.timer)
        }
      }, 1000)
    }
  },
  // mounted(){
  //   var div = document.createElement()
  //   document.body.appendChild(div)
  // }
};
</script>
<style scoped>
button {
  width: 100%;
}
/* #dialog2>.el-button{
  width: 50%;
} */

.el-input {
  left: 4%;
  width: 75%;
}

/* .function{
  height: 85%;
  height: auto;
  width: 55%;
  z-index: 1022;
  border-radius:5px 5px 5px 5px;
  background-color: rgb(65, 62, 62,0.6);
  position: absolute;
  left: 70%;
  top: 55%;
  transform: translate(-50%,-50%);
} */

/* .message_show{
  height: 80%;
  height: auto;
  width: 100%;
  z-index: 1022;
  border-radius:5px 5px 5px 5px;
  background-color: rgb(65, 62, 62,0.6);
  position: absolute;
  top:10%;
} */
</style>

<style>
#expectedEffectContorl {
  left: 25%;
  top: 5%;
  height: 20%;
  width: 50%;
}

#progress {
  left: 80%;
  top: 5%;
  width: 15%;
  height: fit-content;
}

#progress .el-dialog__header {
  display: none;
}

#progress .el-dialog__body {
  padding: 0% !important;
}

#progress .el-progress-bar {
  padding-right: 0px !important;
}


#expectedEffectContorl .el-dialog__body {
  width: auto;
}

#expectedEffectContorl #contorl {
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}
/* #progress {
  left: 25%;
  top: 5%;
  height: 20%;
  width: 50%;
} */
</style>
