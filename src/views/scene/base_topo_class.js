            class Circle{
                constructor(num,radius,p,text){
                    this.num = num;
                    this.radius = radius;
                    this.p = p;
                    this.text=text
                    this.drawPs = [];
                    this.aspect = 0;
                    this.fontSize = 20;
                    this.recW=0;
                    this.fontpos = [];
                }

                setRadius(newR){
                    this.radius = newR;
                }

                setText(newT){
                    this.text = newT;
                }

                setDrawPs(newP){
                    this.drawPs=newP;
                }
                setAspect(newA){
                    this.aspect=newA;
                }

                adjustRadiusByFont(fontSize){
                    this.recW = this.aspect*fontSize;
                    this.fontSize=fontSize;
                    this.radius=Math.sqrt(this.recW*this.recW+this.fontSize*this.fontSize);
                    //this.fontpos = [this.drawPs[0]-recW/2.0,this.drawPs[1]-this.fontSize/2.0];
                }
                adjustFontByRadius(){
                    this.fontSize = this.radius*Math.sqrt(1/(this.aspect*this.aspect+1));
                    this.recW  = this.fontSize*this.aspect;
                    //this.fontpos = [this.drawPs[0]-recW/2.0,this.drawPs[1]-this.fontSize/2.0];
                }
            }
            class Drawer{
                constructor(size,canvas){
                    this.size = size;
                    this.canvas = canvas;
                    
                    this.ctx =this.canvas.getContext('2d');
                    this.ctx.imageSmoothingEnabled = true;
                };
                pointsTrans(p) {
                    var newp = [p[0],-p[1]];
                    newp[0]+=(this.size/2.0);
                    newp[1]+=(this.size/2.0);
                    return newp;
                };
                line(startP,endP){
                    const p1 = this.pointsTrans(startP),p2 = this.pointsTrans(endP);
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1[0],p1[1]);
                    this.ctx.lineTo(p2[0],p2[1]);
                    this.ctx.stroke();
                };

                circle(p,radius){
                    const p1 = this.pointsTrans(p);
                    this.ctx.beginPath();
                    this.ctx.arc(p1[0],p1[1],radius,0,2*Math.PI);
                    this.ctx.stroke();
                };
                fontPos(cirPos,fonth,fontw,radius){
                    var cd = [cirPos[0],cirPos[1],0];
                    cd = normalize(cd);
                    var x= [1,0,0];
                    var cs = dot(cd,x);
                    var dis = radius+Math.sqrt(fonth*fonth+fontw*fontw);//(fontsize/2.0)/(2.0*Math.sqrt((1-cs*cs)));
                    var ncd = [-cd[0],-cd[1],-cd[2]];
                    var pos = V3V3add(V3Fmul(ncd,dis),cirPos);
                    return [pos[0],pos[1]]
                };
                tCircle(c,config){
                    var curPoint = c.p;
                    var d = [-curPoint[0],-curPoint[1],0];
                    d = normalize(d);
                    curPoint = V3V3add(V3Fmul(d,c.radius),curPoint); 
                    this.circle(curPoint,c.radius)
                    var fontp = this.fontPos(curPoint,c.fontSize,c.aspect*c.fontSize,c.radius);
                    if(config.fontflex){
                        this.drawFont(fontp,c.text,c.fontSize);
                    }
                    else{
                        this.drawFont(fontp,c.text,config.fontsize);
                    }
                    return curPoint
                };
                drawFont(p,text,fontSize){
                    this.ctx.font=fontSize+"px '微软雅黑'";
                    this.ctx.textAlign = "center";
                    var np = this.pointsTrans(p);
                    this.ctx.fillText(text,np[0],np[1],this.size);
                }
                fc(dis){

                }
                //贝塞尔曲线
                Bz2(ps,sf,ef,aSize,aB){
                    var np = [];
                    var color = 'rgb(0,0,0)'
                    var dis = Math.sqrt(ps[1][0]*ps[1][0]+ps[1][1]*ps[1][1]);
                    var dis2 = Math.sqrt((ps[2][0]-ps[0][0])*(ps[2][0]-ps[0][0])+(ps[2][1]-ps[0][1])*(ps[2][1]-ps[0][1]));
                    //可以使用random控制曲线的弯曲度
                    var rand = (0.5 * (1 - 0.6) + 0.6)*dis;
                    var bias = Math.pow(dis2-this.size/2.0,2)*((4*(dis-rand))/Math.pow(this.size,2))+rand;
                    var dirction = [ps[1][0],ps[1][1],0];
                    dirction = normalize(dirction);
                    var nmid = V3Fmul(dirction,bias);
                    ps[1] = [nmid[0],nmid[1]];
                    var ags=tangentBz2A(ps[0],ps[1],ps[2]);
                    for(var i = 0;i<ps.length;i++){
                        np.push(this.pointsTrans(ps[i]));
                    }
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(np[0][0],np[0][1]);
                    this.ctx.quadraticCurveTo(np[1][0],np[1][1],np[2][0],np[2][1]);
                    this.ctx.strokeStyle = color;
                    this.ctx.stroke();
                    if(sf){
                        this.arrow(ps[0],ags[0],aSize,aB);
                    }
                    if(ef){
                        this.arrow(ps[2],ags[1],aSize,aB);
                    }

                };
                arrow(p,radian,size,biasAngle){

                    var x3 = p[0] - size * Math.cos(radian + biasAngle * Math.PI/180); 
                    var y3 = p[1] - size * Math.sin(radian + biasAngle * Math.PI/180);
                    var x4 = p[0] - size * Math.cos(radian - biasAngle * Math.PI/180);
                    var y4 = p[1] - size * Math.sin(radian - biasAngle * Math.PI/180);
                    var p2 = [x3,y3],p3 = [x4,y4];
                    this.line(p2,p);
                    this.line(p3,p);
                }
                clean(){
                    var w = this.canvas.width;
                    var h = this.canvas.height;
                    this.ctx.clearRect(0, 0, w, h);
                }
                //控制字号相对大小的，除数越大，字号越大
                measureAspect(str){
                    this.ctx.font = "100px '微软雅黑'";
                    return this.ctx.measureText('A').width/100;
                }
            }

            function M3M3mul(m1,m2){
                let res = [[0.0,0.0,0.0],[0.0,0.0,0.0],[0.0,0.0,0.0]];
                for(var i = 0;i<3;i++){
                    res[i][0] = m1[i][0]*m2[0][0]+m1[i][1]*m2[1][0]+m1[i][2]*m2[2][0];
                    res[i][1] = m1[i][0]*m2[0][1]+m1[i][1]*m2[1][1]+m1[i][2]*m2[2][2];
                    res[i][2] = m1[i][0]*m2[0][2]+m1[i][1]*m2[1][2]+m1[i][2]*m2[2][2];
                }
                return res;
            }
            function dot(v1,v2){
                var res=0
                for(var i = 0;i<v1.length;i++){
                    res+=v1[i]*v2[i];
                }
                return res;
            }
            function M3V3mul(m,v){
                let res = [0.0,0.0,0.0];
                for(var i = 0;i<3;i++){
                    res[i] = m[i][0]*v[0]+m[i][1]*v[1]+m[i][2]*v[2];
                }
                return res;
            }

            function V3V3add(v1,v2){
                return [v1[0]+v2[0],v1[1]+v2[1],v1[2]+v2[2]];
            }

            function V3Fmul(v,f){
                var res = [0.0,0.0,0.0];
                for(var i = 0;i<3;i++){
                    res[i] = v[i]*f;
                }
                return res;
            }

            function normalize(v){
                var res = [];
                var al = 0.0;
                var flag = true;
                v.forEach((el)=>{
                  if(el!=0){
                    flag = false;
                  }
                  al = al+el*el;
                });
                if(flag){
                  return [0,0,0]
                }
                al = Math.sqrt(al);
                v.forEach((el)=>{
                  res.push(el/al);
                });
                return res;
            }
            function cirPos(nums,size){
                var perAngle = (2.0*Math.PI)/parseFloat(nums);
                var res = {};
                var theta=0;
                const initPoint = [0,size/2.0,1];
                var radius = ((size/2.0)*Math.sin(perAngle/2.0))/(Math.sin(perAngle/2.0)+1);
                for(var i=0;i<nums;i++){
                    
                    var curangle = theta;
                    
                    var c = Math.cos(theta);
                    var s = Math.sin(theta);
                    
                    var rotate = [[c,-s,0],
                        [s,c,0],
                        [0,0,1]
                    ];
                    var curPoint = M3V3mul(rotate,initPoint);

                    curPoint[2]=1;

                    if(Math.abs(curPoint[0])<1e-10){
                        curPoint[0]=0;
                    }
                    if(Math.abs(curPoint[1])<1e-10){
                        curPoint[1]=0;
                    }

                    res[i] = new Circle(i,20,[curPoint[0],curPoint[1]],"init")
                    theta +=perAngle;

                }
                return [res,radius];
            }

            function tangentBz2A(p0,p1,p2){

                return [Math.atan2((p0[1]-p1[1]),(p0[0]-p1[0])),Math.atan2((p1[1]-p2[1]),(p1[0]-p2[0]))-Math.PI]
            }

            function cirInterPoints(c1,c2){
                var p1=[c1.drawPs[0],c1.drawPs[1],1],p2=[c2.drawPs[0],c2.drawPs[1],1];
                var d1 = [p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]];
                var d2 = [-d1[0],-d1[1],-d1[2]];
                d1 = normalize(d1);
                d2 = normalize(d2);
                var np1 = V3V3add(V3Fmul(d1,c1.radius),p1);
                var np2 = V3V3add(V3Fmul(d2,c2.radius),p2);
                return [[np1[0],np1[1]],[np2[0],np2[1]]];
            }


            
            export function draw(canvas,name,matrix,size,config={flex:false,r:30,fontflex:true,fontsize:20}){
                //name 名称数组
                //matrix 连接关系矩阵
                //size:number 坐标系范围
                //flex:bool 是否启动圆适应字体大小
                //rf:number flex为true时，为字体大小，为false时，为圆半径
                canvas.width = size; //设置标签的属性宽高
                canvas.height = size;
                canvas.style.width = size; //设置标签的属性宽高
                canvas.style.height = size;
                var drawer = new Drawer(size,canvas);
                drawer.clean();
                const numEles = name.length;
                
                //drawer.circle([0,0],size/2.0,"test");
                var [cp,Radius]= cirPos(numEles,size);
                for(var i = 0;i<numEles;i++){

                    cp[i].setText(name[i]);
                    cp[i].setAspect(drawer.measureAspect(cp[i].text));
                    if(config.flex){
                        alert('bug')
                        return;
                        //cp[i].adjustRadiusByFont(config.r);
                    }
                    else{
                        cp[i].setRadius(Radius/2.0);
                        cp[i].adjustFontByRadius(Radius);
                    }
                    cp[i].setDrawPs(drawer.tCircle(cp[i],config));
                    
                }
                var temp = matrix;

                for(var i = 0;i<numEles;i++){
                    for(var j=0;j<numEles;j++){
                        if(temp[i][j]==1){
                            var start,end;
                            var sflag=false,eflag=false;
                            temp[i][j]=0;
                            if(temp[j][i]==1){
                                temp[j][i]=0;
                                eflag=true;
                                sflag = true;
                                if(cp[i].p[0]>cp[j].p[0]){
                                    start=j;
                                    end=i;
                                }else{
                                    start=i;
                                    end=j;
                                }
                            }
                            else{
                                
                                if(cp[i].p[0]>cp[j].p[0]){
                                    
                                    sflag = true;
                                    start=j;
                                    end=i;
                                }else{
                                    eflag=true;
                                    start=i;
                                    end=j;
                                }

                            }
                            var seCoords = cirInterPoints(cp[start],cp[end]);
                            var sP = seCoords[0],eP=seCoords[1];
                            var mid = [(sP[0]+eP[0])/2.0,(sP[1]+eP[1])/2.0]
                            drawer.Bz2([sP,mid,eP],sflag,eflag,10,20);
                        }
                        else{
                            continue;
                        }
                    }
                }
                
            };