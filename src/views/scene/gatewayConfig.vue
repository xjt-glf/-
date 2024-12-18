<template>
    <div>
        <h1>{{ dev_inf.name }}</h1>
    <form name="main_form" method = "post" action = "/updatesettings">
        <!-- <input type="hidden" name="dev_page_id_main" :value= dev_inf.id >
        <input type="hidden" id="auto_update_flag" name="auto_update_flag" :value=auto_update_flag> -->
        <table>
            <tr>
                <td>ip地址：</td>
                <td>{{ dev_inf.ip }}</td>
            </tr>
            <tr>
                <td>网卡选择：</td>
                <td>
                    <!-- <select name="AdapterMenu" id="AdapterMenu"> 
                {% for item in dev_inf.adapters %}
                   <option value= "{{ item }}">{{ item }}</option>
                {% endfor %} 
                    </select> -->
                    <el-select v-model="selectedPersonsTypes" clearable placeholder="请选择">
                        <el-option
                            v-for="item in dev_inf.adapters"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </td>
            </tr>
        </table>
        <div style="border:1px solid #CCC"></div>
        <table>
            <tr>
                <td><input type='checkbox' name='choose_delay' value="true">网络时延设置 (ms)</td>
                <td><input type='text' name ='delay' :placeholder=data_state.delay></td>
            </tr>
            <tr>
                <td><input type='checkbox' name='choose_bias' value="true">网络时延偏移 (ms)</td>
                <td><input type='text' name ='bias' :placeholder=data_state.bias></td>
            </tr>
            <tr>
                <td><input type='checkbox' name='choose_bias_prob' value="true">偏移发生概率 (%)</td>
                <td><input type='text' name ='bias_prob' :placeholder=data_state.bias_prob></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td><input type='checkbox' name='choose_loss' value="true">丢包率 (%)</td>
                <td><input type='text' name ='loss' :placeholder=data_state.loss></td>
            </tr>
            <tr>
                <td><input type='checkbox' name='choose_duplicate' value="true">重复率 (%)</td>
                <td><input type='text' name ='duplicate' :placeholder=data_state.duplicate></td>
            </tr>
            <tr>
                <td><input type='checkbox' name='choose_corrupt' value="true">损坏率 (%)</td>
                <td><input type='text' name ='corrupt' :placeholder=data_state.corrupt></td>
            </tr>
        </table>
        <div style="border:1px solid #CCC"></div>
        <table>
            <tr>
                <td><input type='checkbox' name='choose_rate_up' value="true">上传速率 (Kbit/s)</td>
                <td><input type='text' name ='rate_up' :placeholder=data_state.up_speed ></td>
            </tr>
            <tr>
                <td><input type='checkbox' name='choose_rate_down' value="true">下载速率 (Kbit/s)</td>
                <td><input type='text' name ='rate_down' :placeholder=data_state.down_speed ></td>
            </tr>
            <tr>
                <td>配置文件上传：</td>
                <td><input type='file' name ='config_file'></td>
            </tr>
        </table>
    </form>
        <form method="post" action="/clear" onsubmit="return alert_clear_confirm();">
            <input type="hidden" id="clear_flag" name="clear_flag">
            <input type="hidden" id="adapter_tmp" name="adapter_tmp">
            <input type="hidden" name="dev_page_id" :value=dev_inf.id>
            <input type="hidden" id="auto_update_flag_2" name="auto_update_flag" :value=auto_update_flag >
            <td><input type = "submit" value = "清除网络设置"></td>
        </form>
        <div style="border:1px solid #CCC"></div>
        <p><input type = "button" value = "提交" onclick="alert_submit_confirm();"></p>
        <table>
            <tr>
                <td><input type = "button" value = "更新状态" onclick="update_state_now();"></td>
            </tr>
            <tr>
                <td>自动读取状态</td>
                <td>
                    <p class="btn-on" onclick="on_off()">
                        <!-- 圆点 -->
                        <span class="btn-on-circle"></span>
                        <!-- 文字 -->
                        <span class="btn-on-text">ON</span>
                      </p>
                </td>
            </tr>
        </table>
        <a onclick="post_auto_update_flag();" href="/index">返回</a>
    {% if information %}
        <p><strong>状态</strong>: {{ information }}</p>
    {% endif %}
    </div>
</template>
<script>
export default{
    data(){
        return{
            dev_inf:null,
        }
    },
    methods:{
        
    },
    created() {	
		// 控制台打印hello 
        console.log("111");
	},
    watch:{
		
	},
}
</script>
<style>
    /* 开关按钮 */
    .btn-on{
      width: 60px;
      height: 25px;
      margin: 0 3px;
      border-radius: 25px;
      font-size: 14px;
    }
    .btn-on{
      cursor: pointer;
      position: relative;
      border: 1px solid white;
      background-color: #12B090;
    }
    .btn-on-circle{
      position: absolute;
      width: 15px;
      height: 15px;
      top: 5px;
      left: 5px;
      background-color: rgb(255, 255, 255);
      border-radius: 50%;
      box-shadow: 0 0 10px white;
      transition: all .5s;
    }
    .btn-on-text{
      position: absolute;
      right: 10px;
      line-height: 25px;
      color: white;
      transition: all .5s;
    }
  </style>