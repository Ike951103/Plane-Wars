//游戏引擎
function GameEngine(){
	if( !GameEngine.instance ){
		GameEngine.instance = {
			body : $id("main"),//游戏背景
			oUl : $id("options"),//菜单ul
			logo : create("div"),//飞机大战图标
			plane : create("div"),//放烟雾飞机 
			level : 0,
			enemes : new Set(), //定义一个容器 用于存放所有创建出来的敌机
			initMenu : function(){
				//点击不同的菜单 记录游戏等级  使用事件委托
				this.oUl.addEventListener( "click" , function(e){
					//获取事件对象
					var e = e || event;
					//获取事件源
					var target = e.target || e.srcElement;
					//明确事件源
					if( target.tagName.toLowerCase() == "li" ){
						//记录游戏等级 获取自定义属性level的值
						this.level = target.getAttribute("level");
						
						//菜单消失
						this.oUl.remove();
						
						//引出logo和动画飞机 以及背景移动   
						this.loading();
					}
				}.bind(this) )
			},
			loading : function(){
				//描述div 
				this.logo.className = "logo";
				this.plane.className = "loading";
				//添加到游戏引擎  appendChild  调用append方法
				this.append( this.logo );
				this.append( this.plane );
				
				//飞机拉线效果
				var index = 1;
				var timer = setInterval( function(){
					this.plane.style.backgroundImage = `url(images/loading${++index}.png)`;
					if( index == 3 ){
						index = 0;
					}
				}.bind(this) , 700 )
				
				
				//背景移动
				var count = 0;
				setInterval( function(){
					this.body.style.backgroundPositionY = ++count + "px";
				}.bind(this),30 )
				
				//经过一段时间后 引擎的加载动画和logo结束  游戏开始
				setTimeout( function(){
					this.logo.remove();//删除图标
					this.plane.remove();
					clearInterval( timer );//停止飞机拉线
					
					//游戏开始
					this.gameStart();
				}.bind(this),3000 )
			},
			append : function(ele){ //功能是添加某个元素到游戏引擎中
				this.body.appendChild( ele );
			},
			gameStart : function(){
				//战斗机出场
				new MyPlane().init().move("mouse").fire();
				//敌机出场
				this.autoCreateEnemy();
			},
			autoCreateEnemy : function(){ //敌机出场 自动创建敌机
				//使用定时器控制敌机出场速度
				setInterval( function(){
					if( Math.random() > 0.7 ){ //5000以内 出现大型敌机的概率为 30%
						var en = new Enemy("big");//创建敌机
						this.enemes.add( en );//将敌机存入到set集合中
						en.init().move();//调用敌机的创建和移动方法
					}
				}.bind(this),5000 )
				
				setInterval( function(){
					if( Math.random() > 0.3 ){
						//将move方法的返回值（new出来的对象）存入到set集合中
						this.enemes.add( new Enemy("middle").init().move() );
					}
				}.bind(this),2500 )
				
				setInterval( function(){
					if( Math.random() > 0.2 ){
						this.enemes.add( new Enemy("small").init().move() );
					}
				}.bind(this),1000 )
			},
			width : function(){ //获取引擎的宽度
				return this.body.offsetWidth;
			},
			height :function(){//获取引擎的高度
				return  this.body.offsetHeight;
			},
			left : function(){//获取引擎相对于 大body的距离
				return this.body.offsetLeft;
			}
		}
	}
	
	return GameEngine.instance;
}