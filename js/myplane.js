//战斗机
function MyPlane(){
	if( !MyPlane.instance  ){
		MyPlane.instance = {
			body : create("div"),
			init : function(){ //战斗机创建
				this.body.className = "my-warplain";//样式描述
				//添加到游戏引擎中
				new GameEngine().append( this.body );
				//设置战斗机的初始位置
				//this.body.style.left = (new GameEngine().body.offsetWidth-this.body.offsetWidth)/2+"px";
				//this.body.style.left = (new GameEngine().width()-this.width())/2+"px";
				this.left( ( new GameEngine().width()-this.width() )/2 );
				this.body.style.bottom = "0px";
				return this;
				//this.move();
			},
			move : function(type){ //战斗机的移动
			 	//在引擎上移动 首先要获取引擎的body元素
			 	switch( type ){
			 		case "mouse" : {
			 			//鼠标控制移动
					 	new GameEngine().body.onmousemove = function(e){
					 		var e = e||event;
					 		//获取鼠标left位置
					 		var x = e.pageX - new GameEngine().left() - this.width()/2;
					 		var maxL = new GameEngine().width()-this.width();//获取最大的left
					 		x = Math.min(Math.max(0,x) , maxL);//边界处理
					 		this.left( x );//设置飞机移动时的left值
					 	}.bind(this);
					 	break;
			 		}
			 		case "key" : {
			 			//键盘控制鼠标移动
			 			document.onkeydown = function(e){
			 				var e = e||event;
			 				var code = e.keyCode || e.which;//获取按键值
			 				switch( code ){
			 					case 37 : {
			 						var x1 = this.left() - 5;//重新获取飞机的left值
			 						x1 = Math.max( 0,x1 ) ;//边界处理 判断最小边界
			 						this.left( x1 );//设置飞机移动的left值
			 						break;
			 					}
			 					case 39 : {
			 						var x2 = this.left() + 5;
			 						var maxL = new GameEngine().width()-this.width();
			 						x2 = Math.min( maxL , x2 )//边界处理 判断最大边界
			 						this.left( x2 );
			 						break;
			 					}
			 				}
			 			}.bind(this)
			 			break;
			 		}
			 	}
			 	return this;
			},
			fire : function(){ //飞机开火   子弹出场
				setInterval( function(){
					new Bullet().init().move();
				},new GameEngine().level );//调用引擎中记录等级的属性
			},
			width : function(){ //获取飞机的宽度
				return this.body.offsetWidth;
			},
			height :function(){ //获取飞机的高度
				return this.body.offsetHeight;
			},
			left : function(val){ //设置或获取飞机的left值
				//如果val有值 说明设置 否则获取
				if( val || val == 0 ){//判断val为0时  设置left值  否则不能设置left值为0  
					this.body.style.left = val + "px";
					return;
				}
				return this.body.offsetLeft;//获取
			},
			top : function(){
				return this.body.offsetTop;//获取飞机的top值
			}
		}
	}
	return MyPlane.instance;
}