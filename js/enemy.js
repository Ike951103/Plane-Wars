//敌机
function Enemy(type){
	this.body = create("div");//实例属性
	this.type = type;//控制敌机的类型
	this.init = function(){//敌机入口方法 创建
		//判断敌机的类型  不能类型的敌机属性值不同
		switch( this.type ){
			case "big" : {
				this.body.className = "enemy-large";
				this.speed = 1;//速度
				this.hp = 8;//血值
				this.imgs = ["plain3_die1.png","plain3_die2.png","plain3_die3.png","plain3_die4.png","plain3_die5.png","plain3_die6.png"];
				break;
			}
			case "middle" : {
				this.body.className = "enemy-middle";
				this.speed = 3; 
				this.hp = 3;//血值
				this.imgs = ["plain2_die1.png","plain2_die2.png","plain2_die3.png","plain2_die4.png"];
				break;
			}
			case "small" : {
				this.body.className = "enemy-small";
				this.speed = 5;
				this.hp = 1;//血值
				this.imgs = ["plain1_die1.png","plain1_die2.png","plain1_die3.png"];
				break;
			}
		}
		new GameEngine().append( this.body );
		//敌机初始位置确定 
		this.left( rand( 0, new GameEngine().width()-this.width() ) ); //敌机宽度
		this.top( -this.height() );
		return this;
	}
	this.move = function(){//敌机运动
		this.timer = setInterval( function(){
			this.top( this.top() + this.speed );
			//边界处理  当敌机移动出可视区 销毁
			if( this.top() > new GameEngine().height() ){
				clearInterval( this.timer );
				this.destroy();
			}
		}.bind(this),30 )
		
		return this;
	}
	this.hurt = function(){ //敌机受伤了
		--this.hp;
		if( this.hp == 0 ){
			this.destroy();//敌机销毁
		}
	}
	this.destroy = function(){
		//停止当前正在爆炸的敌机的定时器 原地爆炸
		clearInterval( this.timer );
		//敌机爆炸过程中  其余运动的子弹不在和当前爆炸的敌机做碰撞检测了  需要将集合中的敌机移出
		//也就是删除集合中当前正在爆炸的敌机  this
		new GameEngine().enemes.delete(this);
		//shift()删除数组头部元素 并返回删除的元素  会改变原数组
		//当敌机爆炸销毁时 使用定时器控制敌机的背景图片的变化
		var timer = setInterval( function(){
			//当当前销毁的敌机中imgs属性长度值为0  说明敌机爆炸结束  销毁
			if( this.imgs.length == 0 ){
				this.body.remove();
			}
			this.body.style.backgroundImage = `url(images/${ this.imgs.shift() })`;
		}.bind(this),300 )
	}
	this.width = function(){//获取敌机的宽度
		return this.body.offsetWidth;
	}
	this.height = function(){//获取敌机的高度
		return this.body.offsetHeight;
	}
	this.top = function(val){ //获取或设置敌机的top值
		if( val || val==0 ){
			this.body.style.top = val + "px";
			return;
		}
		return this.body.offsetTop;
	}
	this.left = function(val){ //获取或设置敌机的left值
		if( val || val==0 ){
			this.body.style.left = val + "px";
			return;
		}
		return this.body.offsetLeft;
	}
}