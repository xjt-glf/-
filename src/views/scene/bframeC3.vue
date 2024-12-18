<template>
  <div>
    <el-dialog
      title="应急资源对象内指令"
      :visible.sync="bframeC3_show"
      width="30%"
      :modal="false"
      :fullscreen="true"
      :before-close="changeShow"
    >
      <div class="box">
        <el-card class="box-card" style="height: auto">
          <div class="filter">
            <span>应急对象名称: {{ obj.name }} -</span>
            <span>应急对象状态: {{ obj.status }} -</span>
            <span>应急对象类型: {{ obj.type }} </span>
            <el-button
              type="primary"
              style="float: right; margin-right: 2%"
              @click="addDirFun"
              >添加指令</el-button>
          </div>
          <el-container style="padding: 10px 25px 0 25px; width: 100%">
            <el-main style="overflow: hidden">
              <el-table
                :header-cell-style="{ background: '#B4E5FB' }"
                :data="selectedDirs"
                style="width: auto; font-size: 13px; margin-top: 15px"
              >
                <el-table-column
                  prop="id"
                  label="指令id"
                  min-width="15%"
                  align="center"
                  header-align="center"
                ></el-table-column>

                <el-table-column
                  prop="command"
                  label="指令类型"
                  min-width="15%"
                  align="center"
                  header-align="center"
                ></el-table-column>

                <el-table-column
                  prop="status"
                  label="指令状态"
                  min-width="15%"
                  align="center"
                  header-align="center"
                ></el-table-column>

                <el-table-column
                  prop="time"
                  label="指令执行时间"
                  :formatter="formatDate"
                  min-width="15%"
                  align="center"
                  header-align="center"
                ></el-table-column>

                <el-table-column
                  prop="lat"
                  label="目的地经度"
                  min-width="15%"
                  align="center"
                  header-align="center"
                ></el-table-column>

                <el-table-column
                  prop="lon"
                  label="目的地纬度"
                  min-width="15%"
                  align="center"
                  header-align="center"
                ></el-table-column>

                <el-table-column
                  prop="message"
                  label="备注信息"
                  min-width="15%"
                  align="center"
                  header-align="center"
                ></el-table-column>

                <el-table-column
                  prop=""
                  label="操作"
                  min-width="15%"
                  align="center"
                  header-align="center"
                >
                  <template slot-scope="scope">
                    <!-- <el-button
                      type="primary"
                      size="mini"
                      @click="onModify(scope.row)"
                      >修改</el-button
                    > -->
                    <el-button
                      type="danger"
                      size="mini"
                      @click="onDelete(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-count="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="total"
                style="text-align: center; margin-top: 10px"
              >
              </el-pagination>
            </el-main>
          </el-container>
        </el-card>
      </div>
    </el-dialog>
    <el-dialog
      class = "bframeC3FormDialog"
      width="35%"
      title="修改应急资源对象指令表单"
      :visible.sync="modifyDirVisible"
      :fullscreen="true"
      :modal="false"
      :before-close="cleanForm"
      append-to-body
    >
      <el-form ref="dirForm" :model="dirForm" label-width="80px">
        <el-form-item label="指令类型: ">
          <el-select v-model="dirForm.command" placeholder="请选择指令类型">
            <el-option label="移动" value="move"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="指令执行时间: ">
          <el-col :span="11">
            <el-date-picker v-model="dirForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item id="lan" v-show="dirForm.command=='move'" label="目的地经度: ">
          <el-input v-model.number="dirForm.lat" placeholder="请输入目的地的经度"></el-input>
        </el-form-item>
        <el-form-item id="lon" v-show="dirForm.command=='move'" label="目的地纬度:">
          <el-input v-model.number="dirForm.lon" placeholder="请输入目的地的纬度"></el-input>
        </el-form-item>
        <el-form-item label="指令状态: ">
          <el-select v-model="dirForm.status" placeholder="请选择指令状态">
            <el-option label="未执行" value="unbegun"></el-option>
            <el-option label="已执行" value="done"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指令备注: ">
          <el-input type="textarea" v-model="dirForm.message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitModifyDirForm">立即修改</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      class="bframeC3FormDialog"
      width="35%"
      title="添加应急资源对象指令表单"
      :visible.sync="addDirVisible"
      :fullscreen="true"
      :modal="false"
      :before-close="cleanForm"
      append-to-body
    >
      <el-form :model="dirForm" label-width="80px">
        <el-form-item label="指令类型: ">
          <el-select v-model="dirForm.command" placeholder="请选择指令类型">
            <el-option label="移动" value="move"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="指令执行时间: ">
          <el-col :span="11">
            <el-date-picker v-model="dirForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-col>
        </el-form-item> -->
        <el-form-item label="second: ">
          <el-input v-model.number="dirForm.second" placeholder="请输入second"></el-input>
        </el-form-item>
        <el-form-item id="lan" v-show="dirForm.command=='move'" label="目的地经度: ">
          <el-input type="number" v-model.number="dirForm.lat" placeholder="请输入目的地的经度"></el-input>
        </el-form-item>
        <el-form-item id="lon" v-show="dirForm.command=='move'" label="目的地纬度:">
          <el-input type="number" v-model.number="dirForm.lon" placeholder="请输入目的地的纬度"></el-input>
        </el-form-item>
        <el-form-item label="指令状态: ">
          <el-select v-model="dirForm.status" placeholder="请选择指令状态">
            <el-option label="未执行" value="unbegun"></el-option>
            <el-option label="已执行" value="done"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指令备注: ">
          <el-input type="textarea" v-model="dirForm.message"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitDirForm">立即创建</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "bframeC3",
  props: {
    bframeC3_show: Boolean,
  },
  data() {
    return {
      obj: {},

      currentPage: 1,
      pageSize: 10,

      dirs: [],
      selectedDirs: [],

      addDirVisible: false,
      modifyDirVisible: false,

      dirForm:{
        command:'',
        time:'',
        status:'',
        lat:'',
        lon:'',
        message:'',
        second:'',
      }
    };
  },
  methods: {
    submitModifyDirForm(){

    },
    changeShow() {
      this.obj = {};
      this.$parent.showBframeC3();
    },
    receiveObj(obj) {
      console.log(obj);
      this.obj = obj;
      /**
       * todo 根据传递的应急资源对象从数据库中查询包含的指令
       */
      this.getDirs(obj.id);
    },
    getDirs(id) {
      const options = {
        url:'http://47.74.10.119:20008//CommandManger/getCommand',
        method: 'GET',
        params:{
          plan_id:this.obj.plan_id,
          obj_id: this.obj.id
        }
      }
      this.$axios(options)
      .then((response)=>{
          this.dirs = response.data
        })
      .catch((err)=>{
        this.$message.error("请求异常！");
      })
      // this.dirs = [
      //   {
      //     command: "move",
      //     time: "12:23",
      //     status: 0,
      //     id: "1",
      //     lat: "123",
      //     lon: "23",
      //     message: "备注",
      //     obj_id: "1",
      //     plan_id: "1",
      //   },
      // ];
    },


    submitDirForm(){
      const options = {
          method: 'GET',
          url: 'http://47.94.10.119:20008//CommandManger/addCommand',
          params:{
            plan_id:this.obj.plan_id,
            obj_id:this.obj.id,
            time: this.dirForm.time,
            objectType:this.obj.objectType,
            message:this.dirForm.message,
            lat:this.dirForm.lat,
            lon:this.dirForm.lon,
            second:this.dirForm.second
          }
        }
      this.$axios(options)
      .then((response)=>{
        this.addDirVisible = false;
        this.getDirs();
      })
      .catch(err=>{
        this.$message.error("请求异常！");
      })

    },

    addDirFun() {
      this.addDirVisible = true;
    },

    cleanForm(done){
      Object.keys(this.dirForm).forEach(key => {this.dirForm[key] = null;});
      done()
    },
    onModify(row) {
      /**
       * todo 添加对指令的修改
       */
      this.dirForm = row
      this.modifyDirVisible= true
    },
    onDelete(row) {
      /**
       * todo 添加对指令的删除
       */
      const options = {
        url:'http://47.74.10.119:20008//CommandManger/delCommand',
        method: 'GET',
        params:{
          id:row.id
        }
      }
      this.$axios(options)
      .then((response)=>{
        this.getDirs()
      })
      .catch((err)=>{
        this.$message.error("请求异常！");
      })
    },

    handleCurrentChange(current) {
      this.currentPage = current;
      this.selectedDirs = this.dirs.slice(
        (current - 1) * this.pageSize,
        current * this.pageSize
      );
    },

    formatDate(row, column){
      let data = row[column.property]
          if(data == null) {
              return null
          }
          let dt = new Date(data)
          return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    }
  },
  computed:{
    total(){
      return this.dirs.length;
    }
  },
  watch:{
    dirs: function(newValue, oldValue) {
      this.handleCurrentChange(1)
    }
  },
  mounted() {
    this.$bus.$on("sendObj", this.receiveObj);
  },
  beforeDestroy() {
    this.$bus.$off("sendObj");
  },
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

  label{
    font-size: 20px;
  }
</style>

<style>
  .bframeC3FormDialog {
    top:15%;
    left: 25%;
    width: 50%;
    height: 65%;
  }
  .bframeC3FormDialog .el-dialog{
    background-color: rgba(61, 69, 92);
  }
  .bframeC3FormDialog .el-dialog .el-dialog__header span {
    font-size: 30px;
  }
  .bframeC3FormDialog .el-dialog .el-form .el-form-item__label {
    font-size: 20px;
    width:auto !important;
    color: aliceblue;
  }
  .bframeC3FormDialog .el-dialog .el-form .el-form-item__content {
    margin-left: auto !important;
  }
  .bframeC3FormDialog .el-dialog__body button {
    width: 50%;
    margin-left: 25%;
  }
  .bframeC3FormDialog #lan .el-form-item__content {
    margin-left:15% !important;
    width: 35%;
  }
  .bframeC3FormDialog #lon .el-form-item__content {
    margin-left:15% !important;
    width: 35%;
  }
</style>