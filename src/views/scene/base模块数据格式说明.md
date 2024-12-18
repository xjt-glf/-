# 前端工作数据流

前端根据网随人动、方案的选择，向服务器请求数据，拿到的数据直接交给base_json_trans，由它转换为统一格式，保存在base_overlay_data中，再由base_json_trans绘制。

## base_json_trans的返回

首先分为shapes，heats，figures共3项

```json
{
	"shapes":{
        "1":{
            "type":"ren","width":15,"height":15,"position":[114,32,100],
            "text":"0",
            "add_events":{"click":["user_info","figure_1","figure_2"]}
        },
        "2":{
            "type":"wurenji","width":30,"height":30,"position":[114,30,100],
            "text":"0",
            "add_events":{}
        },
        "tar2":{
            "type":"wurenji","width":30,"height":30,"position":[114,30.5,100],
            "add_events":{}
        },
        
        "1-2":{
        	"type":"link","style":"solid","arrow":"single","color":"red","line":[[114,32,100],[114,30,100]],"SNR":{"1-2":{"SNR":20,"name":"用户1-无人机2"}},
            "add_events":{},
    	},
        "2-tar2":{
            "type":"link","style":"solid","arrow":"single","color":"red","line":[[114,30,100],[114,30.5,100]],
                "add_events":{},
            }
    },
    "heats":{
        "radius":25,
        "data":[{"lng":114,"lat":30,"count":0.8},{"lng":115,"lat":38,"count":0.7}]
    },
	"figures":{
        "1":{
            "user_info":{"name":"用户1","lng":114,"lat":32},
            "figure_1":30,
            "figure_2":20,
            "figure_device":{"name":"用户1","rate":10,"net_pos":[114,30],"GPS_pos":[115,30],"pos_auc":5}
        }
    },
    "setting":{"user":{"1":["用户1",1,1]},"bs":{"2":["无人机2",1]}}
    "topo_show":{
       	"name":["用户1","无人机2"],
        "maxtrix":[[0,1],[1,0]]
    }
}
```

shapes是普通覆盖物选项，里面的键代表一个图形，比如图标或者线的名称。

"type"表示类型，"ren"是人员，"wurenji"是无人机，"link"代表链路。

人员和无人机都是图标，图标有width表示像素宽度，height表示像素高度，position表示位置，"text"表示标签内容。

add_events是事件列表，click代表点击事件，mouseover代表鼠标移近事件。

每个事件对应一个动作列表，目前暂定的动作有user_info即显示用户信息，figure_1即显示第一张表，figure_2即显示第2张表，figure_device代表设备信息里面的表格。



链路的style规定了线段类型，solid为实线，dashed为虚线。

arrow规定了箭头的个数，zero表示无箭头，single表示单箭头，double表示双箭头。

color规定了颜色，可以是英文，也可以是#FFFFFF这样的十六进制数

lines即两端点的坐标的数组，规定箭头方向从lines[0]到lines[1]，箭头方向适用于单箭头。

SNR即链路信噪比信息（字典），最多包含双方向的信噪比（单位是dB）



heats是热力图选项，核心为data。data数组里面存储了经度、纬度、热力值。radius代表热力点的半径。



figures是表格选项，里面的键代表一个图形，比如图标或者线的名称。

figure_1:30、figure_2:20代表分别在第一张表和第二张表的折线图中加入数字30和20。



topo对应拓扑示意图，name是顺序标注的设备名称，matrix是对应顺序的链路关系矩阵。



设备编号统一为id（一个独一无二的数字）

目标无人机的id统一为tar+编号

链路的id统一为ID+"-"+ID

