//子弹
function Bullet(){
	this.body = create("div");//实例属性
	//实例方法
	this.init = function(){
		this.body.className = "bullet";
		//将子弹添加到游戏引擎中 append
		new GameEngine().append( this.body );
		
		var mp = new MyPlane();//实例化一个战斗机
		//设置子弹的初始位置  
		this.left( mp.left() + mp.width()/2 - this.width()/2 );
		this.top( mp.top() - this.height() );
		return this;
	}
	this.move = function(){ //子弹移动
		this.timer = setInterval( function(){
			this.top( this.top() - 5 ); //重新设置子弹的top值
			//边界处理
			if( this.top() < -this.height() ){
				this.destroy();
				clearInterval( this.timer );
			}
			
			//在子弹移动的定时器中 完成和敌机的碰撞检测  
			//检测当前移动的子弹 和哪一个敌机发生碰撞
			//问题 ： 如何在子弹移动的定时器中 找到所有的敌机
			//找到引擎中存放所有敌机的容器
			var enemes = new GameEngine().enemes; //是一个set集合
			//遍历所有敌机 
			for( var en of enemes ){
				if( pz( this.body , en.body ) ){//两个页面元素之间的碰撞检测
					//如果碰撞上  子弹消失 停止该子弹运动的定时器
					this.destroy();
					clearInterval( this.timer );
					//敌机受伤了
					en.hurt();
				}
			}
		}.bind(this),30 )
	}
	this.destroy = function(){ //子弹销毁
		this.body.remove();
	}
	this.width = function(){//获取子弹的宽度
		return this.body.offsetWidth;
	}
	this.height = function(){//获取子弹的高度
		return this.body.offsetHeight;
	}
	this.top = function(val){ //获取或设置子弹的top值
		if( val || val==0 ){
			this.body.style.top = val + "px";
			return;
		}
		return this.body.offsetTop;
	}
	this.left = function(val){ //获取或设置子弹的left值
		if( val || val==0 ){
			this.body.style.left = val + "px";
			return;
		}
		return this.body.offsetLeft;
	}
}