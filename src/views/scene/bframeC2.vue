<template>
    <div>
      <!-- bframec1: bounce-frame-center-1 中间弹窗1 -->
      <el-dialog
      :title="'应急预案名称: '+ plan.name"
      :visible.sync="bframeC2_show"
      width="30%"
      :modal=false

      :fullscreen=true
      :before-close="changeShow">
        <div class="box">
          <el-card class="box-card" style="height:auto;">
            <div class="filter">
              <span>资源类型</span>
              <el-select v-model="filterParams.type" clearable placeholder="请选择类型">
              <el-option
                v-for="item in objTypes"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
              </el-option>
              </el-select>

              <span>资源状态</span>
              <el-select v-model="filterParams.status" clearable placeholder="请选择状态">
              <el-option
                v-for="item in objStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>

              <el-button type="primary" style="margin-left:1%" @click="filterObjsFunc">查询</el-button>
              <el-button type="primary" @click="reSetFilter">重置</el-button>
              <el-button type="primary" style="margin-left:22%" @click="addObj">添加设备</el-button>
              

            </div>
            <el-container style="padding: 10px 25px 0 25px">
              <el-main style="overflow:hidden;">
                <el-table 
                :header-cell-style="{background:'#B4E5FB'}" 
                :data="selectedObjs" 
                style="width:auto;font-size:13px;margin-top: 15px;">
                <el-table-column prop="id" label="资源id" min-width="10%" align="center"
                  header-align="center"></el-table-column>
                               
                  <el-table-column prop="name" label="设备名称" min-width="10%" align="center"
                  header-align="center"></el-table-column>

                <el-table-column prop="objectType" label="资源类型" min-width="10%" align="center"
                  header-align="center"></el-table-column>

                <el-table-column prop="status" label="当前状态" min-width="10%" align="center"
                  header-align="center"></el-table-column>

                <el-table-column prop="info" label="备注信息" min-width="25%" align="center"
                  header-align="center"></el-table-column>
                
                <el-table-column prop="lon" label="当前经度" min-width="15%" align="center"
                  header-align="center"></el-table-column>
                
                <el-table-column prop="lat" label="当前纬度" min-width="15%" align="center"
                  header-align="center"></el-table-column>
                
                <el-table-column prop="" label="操作" min-width="15%" align="center"
                  header-align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" style="margin-left: 0px;" @click="onSeeDirs(scope.row)">查看指令</el-button>
                    <el-button type="danger" size="mini"  @click="onDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
                </el-table>
                <el-pagination background @current-change="handleCurrentChange"
                  :current-page="currentPage" :page-count="pageSize"
                  layout="total,prev, pager, next, jumper" :total="total"
                  style="text-align: center;margin-top: 10px;">
                </el-pagination>
              </el-main>
            
            </el-container>
          </el-card>
			  </div>
      </el-dialog>
      
      <!-- 新增救援对象弹窗 -->
      <el-dialog
        id="addObjForm"
        width="35%"
        
        title="添加应急资源对象表单"
        :visible.sync="addObjFormVisible"
        :fullscreen="true"
        :modal="false"
        append-to-body>
        <div id="select">
          <el-cascader
          v-model="resourseType"
          placeholder="选择资源类型"
          :options="resourseOptions"
          expand-trigger = "click"
          filterable>
          </el-cascader>
          <el-button type="primary" @click="remoteObjGet">查看可选资源</el-button>
        </div>
        <div id="result">
          <el-select v-model="selectedObj" placeholder="请输入">
            <el-option
              v-for="option in providedOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="addToPlan">添加至应急预案</el-button>
        </div>

      </el-dialog>
       
      <!-- 救援对象指令弹窗，在gaode里面添加 -->
    </div>
</template>
<script>
export default {
    name: "bframeC2",
    props: {
        bframeC2_show:Boolean,
        showBframeC3:Function
    },
    data() {
      return {
        objStatus:[
          {value:'待命中', lable:'待命中'},
          {value:'test', lable:'测试'},

        ],
        objTypes:[
          {value:'equip', lable:'设备'},
          {value:'test', lable:'测试'},
        ],

        currentPage:1,        // 当前的页面
        pageSize:10,          // 页面大小
        // total:0,              // 数据总数

        plan: {},             // 应急预案信息
        objs:[],              // 应急救援资源对象信息
        filterParams:{        // 过滤参数信息
          type:'',
          status:''
        },
        filterObjs:[],        // 过滤后的应急救援对象
        selectedObjs:[],      // 当前被展示的应急救援对象

        addObjFormVisible:false, // 添加应急救援资源是否展示标志


        // 下面是实现添加应急救援对象所需要的变量
        resourseOptions: [{
            value: 'equip',
            label: '设备',
            children: [{
                value: '救护车',
                label: '救护车' 
              }, { 
                value: '指挥所',
                label: '指挥所' 
              }, {
                value: '无人机',
                label: '无人机' 
              }, {
                value: '消防车',
                label: '消防车' 
              }, {
                value: '风力灭火器',
                label: '风力灭火器' 
              },
			      ]
          }, {
            value: 'person',
            label: '人员',
            children: [{
              value: '医疗人员',
              label: '医疗人员'
              }, {
              value: '受灾人员',
              label: '受灾人员'
              }, {
              value: '消防员',
              label: '消防员'
              },
			      ]
          },
        ],
        resourseType:[],
        providedOptions: [],
        selectedObj: ''

      }
    },
    methods: { 
      changeShow(){
        this.plan = {}
        this.$parent.showBframeC2();
      },


      getObjs(){
        const options = {
          method: 'GET',
          url: 'http://47.94.10.119:20008//RROMange/getRRO',
          params:{
            plan_id: this.plan.id
          }
        }
        this.$axios.request(options)
        .then(response=>{
          this.objs = response.data
        })
        .catch(err=>{
          this.$message.error("请求异常！");
        })
      },


      receivePlan(plan){
        this.plan = plan
        /**
         * todo 添加请求plan所包含的应急救援对象
         */
        // const options = {
        //   method: 'GET',
				//   url: 'http://proj23.emr-c.com//EquipMange//delEquip',
				//   params: {id: row.id}
        // }
        this.getObjs()
      },
      filterObjsFunc(){
        this.filterObjs = this.objs
          .filter(item=>(this.filterParams.type)?item.objectType == this.filterParams.type:true)
          .filter(item=>(this.filterParams.status)?item.status == this.filterParams.status:true);
      },
      reSetFilter(){
        this.filterParams.status = null;
        this.filterParams.type = null;
        this.filterObjs = this.objs;
        this.handleCurrentChange(1);
      },
      addObj(){
        this.addObjFormVisible = true;
      },

      onSeeDirs(row){
        this.showBframeC3();
        this.$bus.$emit('sendObj', row);
      },
      onDelete(row) {
        /**
         * todo 添加删除资源对象功能
         */
        const options = {
          method: 'GET',
          url: 'http://47.94.10.119:20008//RROMange/delRRO',
          params:{
            id: row.id
          }
        }
        this.$axios.request(options)
        .then(response=>{
          this.getObjs()
        })
        .catch(err=>{
          this.$message.error("请求异常！");
        })
      },

      handleCurrentChange(current){
        this.currentPage = current
        this.selectedObjs = this.filterObjs.slice((current-1)*this.pageSize, current*this.pageSize)
      },


      remoteObjGet(){
        let options = {
          method: 'GET',
          params:{
            type:this.resourseType[1],
            status:'待命中'
          }
        }
        if(this.resourseType[0] == 'equip'){
          options.url = 'http://proj23.emr-c.com//SituationDisplay/getDevicePosition'
        }
        else if(this.resourseType[0] == 'person') {
         
          options.url =  'http://47.94.10.119:20008//SituationDisplay/getPersonPosition'
          options.params.page = 1
          options.params.pagenum = -1
        }
        else {
          return 
        }
        console.log(options);
        this.$axios.request(options)
        .then(response=>{
          console.log(response.data);
          this.providedOptions = response.data
          this.providedOptions.forEach((item)=>{
            item["value"] = item.id
            item["label"] = item.id + '-' + item.info
          })
          // response.data.forEach((item)=>{
          //   providedOptions.push({
          //     value:item.id,
          //     label:item.id,
          //     device_id: item.id,
          //   })
          // })
        })
        .catch(err=>{
          this.$message.error("请求异常！");
        })
      },
      addToPlan(){
        const options = {
          method: 'GET',
          url: 'http://47.94.10.119:20008//RROMange/addRRO',
          params:{
            plan_id: this.plan.id,
            device_id: this.selectedObj,
            objectType: this.resourseType[0] 
          }
        }
        this.$axios.request(options)
        .then(response=>{
          this.addObjFormVisible = false
          this.getObjs()
        })
        .catch(err=>{
          this.$message.error("请求异常！");
        })
      }
    },
    computed:{
      total(){
        return this.filterObjs.length
      }
    },
    watch:{
      objs:function(newValue, oldValue){
        this.reSetFilter()
      },
      filterObjs:function() {
        this.handleCurrentChange(1)
      }
    },
    mounted(){
      this.$bus.$on('sendPlan', this.receivePlan)
    },
    beforeDestroy(){
      this.$bus.$off('sendPlan')
    }
  };
</script>

<style scoped>
  .left {
    width: 300px !important;
  }
  .filter{
    /* height: 50px; */
    /* width: 100%; */
    /* background: rgb(255,255,255,0.5); */
    padding-left: 25px;
    padding-top: 20px;
  }
  .el-container main {
    display: flex;
    flex-direction: column;
    min-height: 72vh;
  }
  
  .el-pagination {
    margin-top: auto;
  }


  .el-main {
    padding: 0px !important;
  }
  .box .box-card {
      position: relative;
      margin-top: 10px;
      /* padding-top: 20px; */
      /* height: 1000px; */
      width: 100%;
  }
  .dialog-center{
    height: 65%;
    /* height: auto; */
    width: 20%;
    /* z-index: -1; */
    border-radius:5px 5px 5px 5px;
    /* background-color: rgb(65, 62, 62,0.6); */
    position: absolute;
    left: 12%;
    top: 50%;
    transform: translate(-50%,-50%);

  }

  .mydialog {
      background: rgb(61,73,106,0.7);
  }
</style>

<style>
  #addObjForm {
    left: 25%;
    top: 5%;
    height: 30%;
    width: 50%;
  }

  #addObjForm .el-dialog__body {
    width: auto;
  }

  #addObjForm .el-dialog__body #select {
    display: flex;
    justify-content: center; /* 水平居中对齐 */
    align-items: center; /* 垂直居中对齐 */
  }



</style>