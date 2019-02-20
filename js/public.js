//根据id查找页面元素
function $id(id){
	return document.getElementById(id);
}

//获取任意区间值
function rand(min,max){
	return Math.round( Math.random()*(max-min) + min );
}

//随机颜色值获取
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i =1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );
	}
	return color;
}

function dateToString(sign){
	//如果用户不传递任何参数  默认日期间隔符号是  - 
	/*if( !sign ){
		sign = "-";
	}*/
	sign = sign || "-";//如果sign是未定义，就按默认值 "-"
	var d = new Date();
	var y = d.getFullYear();
	var m =toTwo( d.getMonth() + 1 ) ;
	var _date =toTwo( d.getDate() );
	var h =toTwo( d.getHours() );
	var min =toTwo( d.getMinutes() );
	var s =toTwo( d.getSeconds() );
	return y + sign + m + sign + _date + " " + h + ":" + min + ":" + s;
}
//如果得到的是小于10的数 就 拼接0
function toTwo(val){
	return val < 10 ? "0" + val : val;
}

//将一个字符串转成日期
function stringToDate(str){
    return  new Date(str);
}
//时间差
function diff(start,end){
	return Math.abs( start.getTime() - end.getTime() ) / 1000;
}

//动态创建元素
function create(ele){
	return document.createElement(ele);
}
//碰撞函数
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetWidth + obj1.offsetLeft;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetHeight + obj1.offsetTop;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetWidth + obj2.offsetLeft;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetHeight + obj2.offsetTop;
	
	//如果碰不上   返回false  碰上了就返回true
	if( R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2){
		return false;
	}else{
		return true; //碰上了
	}
}
//获取非行内元素样式
function getStyle(obj,attr){ //obj 操作对象  attr操作属性
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}