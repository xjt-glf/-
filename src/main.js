import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from "./router"
import axios from 'axios'
import VueAxios from 'vue-axios'
import  Qs from 'qs'
import echarts from 'echarts'
import { Message } from 'element-ui';
import { get, post } from "../request/index.js"

import Moment from 'moment'
import scroll from 'vue-seamless-scroll'


import './assets/css/global.css'
import './assets/css/gaodeMap.css'
//导入字体图标
import './assets/fonts/iconfont.css'
import './assets/css/scene.css'
import './assets/css/icon.css'
import './assets/js/directive'
import VueAMap from 'vue-amap'; //地图类
// import BaiduMap from 'vue-baidu-map'
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({ 
//   key: '47fa34c25cbfdd6f85544eb3107738f1',// 高德key
//   plugin: [// 插件集合 （插件按需引入）'AMap.Geolocation'
//   'AMap.Geocoder',
//   "AMap.Autocomplete", //输入提示插件
//   "AMap.PlaceSearch", //POI搜索插件
//   "AMap.Scale", //右下角缩略图插件 比例尺
//   "AMap.OverView", //地图鹰眼插件
//   'AMap.Geolocation',
//   "AMap.ToolBar", //地图工具条
//   "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
//   "AMap.PolyEditor", //编辑 折线多，边形
//   "AMap.CircleEditor", //圆形编辑器插件
//   "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
// 	  ],//
// });
// Vue.use(BaiduMap, {
//   ak: '2480O5pnkEvPjBrqEQ7ldlu3hDMdajRA'
// })
Vue.use(ElementUI);
Vue.use(router);
Vue.use(scroll)

/* Vue.use(axios); */
Vue.prototype.$axios = axios;// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$echarts =window.echarts;
Vue.prototype.serverURL = 'http://proj17.hpcner.com';

// Vue.prototype.serverURL = 'http://47.93.214.129:9003';
// Vue.prototype.caclulationURL = 'http://47.93.214.129:9002';
// Vue.prototype.communicationURL = 'http://47.93.214.129:9004';
Vue.prototype.communicationURL2 = 'http://proj6.hpcner.com';
Vue.prototype.serverURL2 = 'http://proj5.hpcner.com';
Vue.prototype.caclulationURL3 = 'http://proj4.hpcner.com';
Vue.prototype.qs = Qs;
Vue.prototype.$echarts = echarts
Vue.prototype.$message = Message
Vue.prototype.equip='http://proj16.hpcner.com';
Vue.prototype.event='http://proj15.hpcner.com';
Vue.prototype.moment=Moment
// 临时改成云端
// Vue.prototype.$HPCNServerURL='http://10.128.163.43';
// Vue.prototype.$HPCNServerURL='http://proj23.emr-c.com';

// Vue.prototype.$HPCNServerURLWithPort='http://10.128.163.43:20008'
// 临时改成云端
// Vue.prototype.$HPCNServerURLWithPort='http://proj23.emr-c.com'

// Vue.prototype.$HPCNServerCloud='http://proj23.emr-c.com'

// 改成本地
// Vue.prototype.$HPCNServerURLWithPort='http://192.168.0.218:20008'
// Vue.prototype.$HPCNServerURL='http://192.168.0.218';
// Vue.prototype.$HPCNServerCloud='http://192.168.0.218'
Vue.prototype.$HPCNServerURLWithPort='http://localhost:20008'
Vue.prototype.$HPCNServerURL='http://10.129.91.174';
Vue.prototype.$HPCNServerCloud='http://localhost'
// Vue.prototype.$HPCNServerURLWithPort='http://10.129.91.174:20008'
// Vue.prototype.$HPCNServerURL='http://10.129.91.174';
// Vue.prototype.$HPCNServerCloud='http://10.129.91.174'
new Vue({
  el: '#app',
  router,
  // render: h => h(App)
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
})
