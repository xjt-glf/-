<template>
  <div style="color:white">
    <el-dialog
    title="基本信息统计"
    :visible.sync="bframeL2_show"
    width="30%"
    :modal=false

    :fullscreen=true
    :before-close="changeShow"
    >   
      <div class="demo-collapse">
        <el-collapse v-model="activeNames">
          <el-collapse-item  title="物资" name="1">
            <el-table
            :data="materiel"
            style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="名称:">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属单位:">
                      <span>{{ props.row.sub}}</span>
                    </el-form-item>
                    <el-form-item label="ID:">
                      <span>{{ props.row.id}}</span>
                    </el-form-item>
                    <el-form-item label="所属单位ID:">
                      <span>{{ props.row.subId}}</span>
                    </el-form-item>
                    <el-form-item label="分类:">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="位置:">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="描述:">
                      <span>{{ props.row.desc }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="ID"
                prop="id">
              </el-table-column>
              <el-table-column
                label="名称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="描述"
                prop="desc">
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="队伍" name="2">
            <el-table
            :data="procession"
            style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="名称:">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="人数:">
                      <span>{{ props.row.number }}</span>
                    </el-form-item>
                    <el-form-item label="所属单位:">
                      <span>{{ props.row.sub}}</span>
                    </el-form-item>
                    <el-form-item label="ID:">
                      <span>{{ props.row.id}}</span>
                    </el-form-item>
                    <el-form-item label="所属单位ID:">
                      <span>{{ props.row.subId}}</span>
                    </el-form-item>
                    <el-form-item label="分类:">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="位置:">
                      <span>{{ props.row.address }}</span>
                    </el-form-item> <br/>
                    <el-form-item label="描述:">
                      <span>{{ props.row.desc }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="ID"
                prop="id">
              </el-table-column>
              <el-table-column
                label="名称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="描述"
                prop="desc">
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="资源" name="3">
            <el-table
            :data="resource"
            style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="名称:">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属单位:">
                      <span>{{ props.row.sub}}</span>
                    </el-form-item>
                    <el-form-item label="ID:">
                      <span>{{ props.row.id}}</span>
                    </el-form-item>
                    <el-form-item label="所属单位ID:">
                      <span>{{ props.row.subId}}</span>
                    </el-form-item>
                    <el-form-item label="分类:">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="位置:">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="描述:">
                      <span>{{ props.row.desc }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="ID"
                prop="id">
              </el-table-column>
              <el-table-column
                label="名称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="描述"
                prop="desc">
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: "bframeL2",
    props: {
        bframeL2_show:Boolean
    },
    data() {
      return {
        activeNames:'',
        resource:[
          {
            id:"21312",
            name:"食品",
            desc:"重量45kg",
            address:"{123.123, 39.123}",
            category:"food",
            subId:"00123",
            sub:"救援支援队",
          },
          {
            id:"2131231",
            name:"药物",
            desc:"重量30kg",
            address:"{123.123, 39.123}",
            category:"medical",
            subId:"00123",
            sub:"救援支援队",
          },
        ],
        procession:[
          {
            id:"213121",
            name:"救援小队",
            desc:"救援人员",
            address:"{123.123, 39.123}",
            category:"medical_procession",
            subId:"00123",
            sub:"救援支援队",
            number:12
          }
        ],
        materiel:[
          {
            id:"21312",
            name:"建筑材料",
            desc:"重量123kg",
            address:"{123.123, 39.123}",
            category:"building",
            subId:"01231",
            sub:"支援队",
          },
        ]
      }
    },
    methods:{
      changeShow(){
        this.activeNames = ''
        this.$parent.showBframeL2();
      },
      
    }
}
</script>
<style scoped>
 .demo-table-expand {
    font-size: 0;
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>