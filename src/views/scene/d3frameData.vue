<template>
  <div class="d3frameData">
      
      <el-dialog
      v-dialogDrag
      :visible.sync="d3fameData_show"
      title="数据管理"
      width="50%"
      :modal=false
      :append-to-body=true
      :close-on-click-modal =false
      :before-close="beforeClose"
      :key="Math.random()"

      > 
    <!--d3inputbox></d3inputbox-->
      <el-container>
          <!--el-main-->
              <el-table              
              :header-cell-style="{background:'#B4E5FB'}" 
              :data="selectedDatas" 
              style="width:auto;font-size:13px;margin-top: 15px">>
              <el-table-column prop="id" label="序号" min-width="15%" align="center"
                header-align="center"></el-table-column>
            
              <el-table-column prop="name" label="名称" min-width="15%" align="center"
                header-align="center"></el-table-column>

              <el-table-column  label="数据管理" min-width="15%" align="center"
                header-align="center">
                <template slot-scope="scope">
                  <el-link @click="handleDelete(scope.row)">删除</el-link>
                  <el-link @click="handleRename(scope.row)">重命名</el-link>
                  <el-link @click="beforeDownload(scope.row)">下载</el-link>
                </template>
              </el-table-column>
              <el-table-column  label="模型管理" min-width="15%" align="center"
                header-align="center">
                <template slot-scope="scope">
                  <el-link @click="handelReC(scope.row)">重建模型</el-link>
                  <el-link @click="beforeShowModel(scope.row)">展示模型</el-link>
                </template>
              </el-table-column>
              </el-table>
              <el-pagination background 
              @size-change="handleSizeChange" 
              @current-change="handleCurrentChange"
              :current-page="currentPage" 
              :page-size="pageSize" 
              :page-sizes="[5]"
              layout="total, sizes,prev, pager, next, jumper" 
              :total="total"
              style="text-align: center;margin-top: 10px;">
              </el-pagination>
                <el-footer>
                  <input id="selectFile" type="file" ref="xFile" style="display:none;"  value="fileList" multiple>
                  <el-button  @click="handleSelectFile">选择文件</el-button>
                  <el-button :disabled="!isNamed" @click="handleSubmit">上传</el-button>
                  <el-progress :percentage="upLoadProgress" v-show="submited" :text-inside="false"></el-progress>
                </el-footer> 
          <!--/el-main-->
      </el-container>
      </el-dialog>
  </div>
  
</template>
<script>
import { saveAs } from 'file-saver';
import axios from 'axios'

export default{
  name:'d3data',
  props:{
      d3fameData_show:Boolean,
  },
  components:{
    
  },
  data(){
      return {
          pageSize: 5,
          currentPage: 1,
          total:0,
          Datas:[],
          selectedDatas:[],
          testshow:false,
          uploadPara:{date: "",name: ''},
          uploading:false,  
          upLoadProgress: 0,
          fileList:'',
          isNamed:false,
          submited:false,
          submitting:false,
          }
  },
  watch:{
  },
  methods:
  {
    beforeShowModel(rowObj){
      let tid = rowObj.id;
      let tname = rowObj.name
      //console.log(tid)
      const params = {
        'setId':tid,
      }
      this.$get('/back/dataset/getModelPath',params).then((response)=>{
        console.log(response)
      }).catch((err)=>{
        console.log(err)
      })
    },
    changeShow(){
      this.$parent.showd3frameData();
      
    },

    beforeClose(done){
      
      if(!this.submitting){
        this.$parent.showd3frameData();
        done(true)
      }
      else{
        return false
      }
      
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectedDatas=this.Datas.slice((val-1)*this.pageSize-1,(val)*this.pageSize)    
    },
    handleCurrentChange(val) {
      this.currentPage = val;      
      if(val==1){
        this.selectedDatas=this.Datas.slice(0,5)
      }
      else{
        this.selectedDatas=this.Datas.slice((val-1)*this.pageSize,(val)*this.pageSize)        
      }
      //console.log(this.selectedDevicesTypes)
    },
    refresh(){
      this.testshow=true;
      const options = {
              method: 'GET',
              url: 'http://127.0.0.1:8080/d3data',
              params: {
              }
      };
      let that = this;
      this.$axios.request(options).then((response)=>{
          that.getDevicesData(response)
          that.currentPage=1
          }
      ).catch((err)=>{
          console.log(err)
      })
    },
    getDevicesData(response){
        if(response!=0){
          let that = this;
          //console.log(response)
          that.Datas=[];
          var selectedDatasTemp=[];
          response.forEach(item =>{
              var data={};
              data["id"]=item["id"];
              data["name"]=item["name"];
              that.Datas.push(data);
          }
          )

          that.total=response.length;
          that.selectedDatas=that.Datas.slice(0, 5);
        }
          //console.log('over')
    },
    handleDelete(rowObj){
      let that = this;

      this.$confirm("确认删除?", "提示", {
      iconClass: "el-icon-question", //自定义图标样式
      confirmButtonText: "确认", //确认按钮文字更换
      cancelButtonText: "取消", //取消按钮文字更换
      showClose: true, //是否显示右上角关闭按钮
      type: "warning", //提示类型  success/info/warning/error
    }).then(()=>{
        let tid = rowObj.id;
        let tname = rowObj.name

        //console.log(tid)
        const params = {
          'setId':tid,
        }
        
        that.$get('/back/dataset/deleteDS',params).then((response)=>{
          console.log(response)
          that.refresh();
        }
        ).catch((err)=>{
          console.log(err)
        })

    })

    },
    beforeDownload(rowObj){
      let tid = rowObj.id;
        let tname = rowObj.name

        //console.log(tid)
        const params = {
          'setId':tid,
        }
        this.$get('/back/dataset/getDSPath',params).then((response)=>{
          console.log(response)
        }).catch((err)=>{
          console.log(err)
        })
    },
    handleDownload(rowObj){
      const axio = this.$axios
      function downloadFile(id,filename,th){
        let that = th
        return new Promise((resolve, reject) => {
          that.$axios({
            method:'get',
            url: 'http://127.0.0.1:8080/dataDownloadFile',
            params:{
              'id' :id,
              'filename':filename
            }
            //responseType: 'arraybuffer'
          }).then((result)=>{
            resolve(result)
          }).catch((err)=>{
            reject(err)
          })
          })
      }
      let tid = rowObj.id;
      let tname = rowObj.name
      

      const promises = []
      
      //console.log(tid)
      const params = {
        'id':tid,
        'name':tname,
        
      }
      let that = this;
      this.$get('http://127.0.0.1:8080/dataDownload',params).then((response)=>{
        console.log(response)
        for(var i =0;i<response.length;i++){
          console.log(response[i])
          let filename = response[i]
          const promise = new Promise(function(resolve,reject){
            saveAs('http://127.0.0.1:8080/dataDownloadFile?id='+tid+'&filename='+filename,filename)
          })
          // const promise = downloadFile(tid,response[i],that).then((response)=>{
          //   //saveAs(response,filename)
          // }).catch((err)=>{
          //   console.log(err)
          // })
          // //downloadFile1('http://127.0.0.1:8080/dataDownloadFile?id='+tid+'&filename='+response[i])
          // promises.push(promise)
        }
        Promise.all(promises)
      }
      ).catch((err)=>{
        console.log(err)
      })
    },
    handelReC(rowObj){
      let tid = rowObj.id;
      let tname = rowObj.name

        const params ={
          'setId':tid,
          
        }
        this.$get('/back/dataset/startRC2',params).then((response)=>{
          console.log(response)
          this.refresh();
          alert("开始重建")
        }).catch((err)=>{
          console.log(err)
        })

      
    },
    testclick(el){
      alert('正在开发')
      console.log(el)
    },
    getDate(){

      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      var time = year + "-" + month + "-" + date;
      console.log(time)
      return time
    },
    onChangeUploadData(name,that){
      return new Promise(function(resolve,reject){
        that.uploadPara.name = name
        that.uploadPara.date = that.getDate()
      resolve()
    })
    },
    handleSelectFile(){
      const that = this
      if(this.uploadPara.name=='')
      {
      this.$prompt('请输入名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
      }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '名称: ' + value
          });
          this.onChangeUploadData(value,that).then(
            this.$refs.xFile.click()
          ).catch((err)=>{
            console.log(err)
          })
          
        }).catch((err) => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
        this.isNamed=true;
      }

      

    },
    showFile(){
      let fileInputer =  document.getElementById('selectFile')
      console.log(fileInputer.value)
      console.log(fileInputer.files)
      
    },
    handleSubmit(){
      let fileInputer =  document.getElementById('selectFile')
      let formdata = new FormData();
      formdata.append('date',this.uploadPara.date)
      formdata.append('name',this.uploadPara.name)
      for (const file of fileInputer.files) {
          formdata.append('dataset',file,file.name);
      }
      let that = this
      this.submited=true;
      this.submitting=true;
      axios({
        method:'post',
        url:'/back/dataset/newDS',
        data:formdata,
        headers: {
              'Content-Type': 'multipart/form-data'
              },
        onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
            if (progressEvent.lengthComputable) {
                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              that.upLoadProgress= Math.round(progressEvent.loaded / progressEvent.total * 100) //实时获取上传进度
            }
        }

      }).then((response)=>{
        this.submitting=false;
        console.log(response)
        this.refresh()
      }).catch((err)=>{
        this.submitting=false;
        console.log(err)
      })
      // console.log(formdata.values())
      // this.$post('/back/dataset/newDS',formdata).then((response)=>{
      //   console.log(response)
      // }).catch((err)=>{
      //   console.log(err)
      // })
    }
  },
  mounted(){
    const options = {
              method: 'GET',
              url: 'http://127.0.0.1:8080/d3data',
              params: {
              }
      };
      let that = this;
      this.$axios.request(options).then((response)=>{
          that.getDevicesData(response)

          }
      ).catch((err)=>{
          console.log(err)
      })

  },
  created(){

  }
  

}

</script>
<style >
.el-dialog{
  background: rgba(61,73,106,1);
}
</style>
