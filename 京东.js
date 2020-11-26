
//封装一段IE和非IE都能识别的事件处理程序
function addHandler(element,type,handler){
    if(element.addEventListener)
        element.addEventListener(type,handler,false);
        else if(element.attachEvent)
            element.attachEvent("on"+type,handler);
                else
                element["on"+type]=handler;

}
//简化getElementById
function byId(id){
    return typeof(id)=="string"?document.getElementById(id):id;
}

//声明
var index = 0,//当前显示图片索引
    prep =byId("prep"),
    next=byId("next");

//取按钮
var pics=byId("banner").getElementsByTagName("div"),
    size=pics.length;
    console.log(size);

//取原点
var dots=byId("dots").getElementsByTagName("span"); 

var timer=null;//放定时器
var main=byId("main");
var pict=byId("banner");
var but1=byId("prep");
var but2=byId("next");

//DOM 0级  只能绑定最后一次
//DOM 2级  按顺序多次绑定

//next.addEventListener("click",function(){alert("3")});



function addHandler(element,type,handler){
    if(element.addEventListener)
        element.addEventListener(type,handler,false);
        else if(element.attachEvent)
            element.attachEvent("on"+type,handler);
                else
                element["on"+type]=handler;

}
// function removeHandler(element,type,handler){
//     if(element.detachEventListener)
//         element.detachEventListener(type,handler,false);
//         else if(element.removeEvent)
//             element.detachEvent("on"+type,null);
//                 else
//                 element["on"+type]=null;

// }

//按钮事件
//点击下一张
addHandler(next,"click",function(){
    index++;
    if(index>=size)
    {
        index=0;
    }
    console.log(index);
    plAy(pics,dots,index);
});
//点击上一张
addHandler(prep,"click",function(){
    index--;
    if(index<0)
    {
        index=size-1;
    }
    console.log(index);
    plAy(pics,dots,index);
});

//封装函数
function plAy(){
    for(var i=0;i<size;i++)
    {
        pics[i].style.display="none";
        dots[i].className="die";
    }
    pics[index].style.display ="block";
    dots[index].className="active";
}
//原点事件

for(var d=0;d<size;d++)
{
    dots[d].setAttribute("data-id",d);
    addHandler(dots[d],"click",function(){ 
        index=this.getAttribute("data-id");
        plAy(pics,dots,index) }
        );
}
// var dotsNum = dots.length;
// function createdots(){
//     if(dotsNum<size){
//         var sp = document.createElement("span");
//         var element = document.getElementById("banner");
//         element.appendChild(sp);
//         dotsNum++;
//     }
//     alert(dotsNum);

// }
// createdots();
//自动切换


function autoChange(){
    //间歇调用
    timer=setInterval(function(){
        index++;
        if(index>=size)
    {
        index=0;
    }
        plAy();
        console.log(index);
    },2000)
}
//鼠标放上去停止

//鼠标滑入main
addHandler(pict,"mouseover",stopautoChange);
//鼠标离开main
addHandler(pict,"mouseout",autoChange);
addHandler(but1,"mouseover",stopautoChange);
addHandler(but1,"mouseout",autoChange);
addHandler(but2,"mouseover",stopautoChange);
addHandler(but2,"mouseout",autoChange);
function stopautoChange(){
    if(timer)
    {
        clearInterval(timer);

    }
    console.log("stop");
}
autoChange();//进去就执行轮播
//封装getElementById()



//绑定事件  点击显示下一张图片
//监听方法
//addEventListener removeEventListener() 
//第一个参数 事件名
//第二个参数：时间处理程序函数
//第三个函数：true表示捕获阶段调用 false表示冒泡阶段调用


//鼠标滑过一级菜单
var pics=document.getElementById("banner").getElementsByTagName("div"),
    size=pics.length;
    console.log(size);

var menucontent=byId("menu-content"),
    menuitems=menucontent.getElementsByTagName("div"),
    submenu=byId("sub-menu"),
    
    innerbox=submenu.getElementsByClassName("inner-box"); //获取子菜单
for(var n=0,idx,nlen=menuitems.length;n<nlen;n++)
{
    menuitems[n].setAttribute("data-index",n);//给所有主菜单定义属性，标明索引
    addHandler(menuitems[n],"mouseover",function(){
        submenu.className="sub-menu";//显示主菜单的背景
        //获取主菜单的索引
        idx=this.getAttribute("data-index");
        //鼠标离开隐藏
        for(var j=0,jlen=innerbox.length;j<jlen;j++){
            innerbox[j].style.display="none";
           // menuitems[j].style.background="none";
        }
        innerbox[idx].style.display="block";
        menuitems[idx].style.background="rgba(255,255,255,0.5)";
    });
}
for(var n=0,nlen=menuitems.length;n<nlen;n++)
{
    menuitems[n].setAttribute("data-index",n);
    addHandler(menuitems[n],"mouseout",function(){
        submenu.className="hide";
        idx=this.getAttribute("data-index");
        menuitems[idx].style.background="none";
    });
}
//鼠标滑入二级菜单使其显示
addHandler(submenu,"mouseover",function(){
    this.className="sub-menu";
});
addHandler(submenu,"mouseout",function(){
    this.className="hide";
    
});



//倒计时
//动态调整要设置的时间
var newYear=2022,
    newMonth=11,
    newDay=26,
    newHour=15,
    newMinute=00,
    newSecond=0;
window.onload=countdown;
function countdown(){
    //获取客户端时间
    var today=new Date();
    //获取服务器当前时间 
    var oldTime = today.getTime();
    //设置截止时间
    var newDate = new Date(newYear,newMonth,newDay,newHour,newMinute,newSecond); 
    
    var newTime = newDate.getTime();
    
    //截止时间距离现在的秒数
    var second = Math.floor((newTime - oldTime) / 1000);
    //设置remainSecond的目的是：如果倒计时结束该执行的方法或事件
    var remainSecond = second;
    //86400代表的是天；一天有24*60*60=86400秒 ；
    var day = Math.floor(second / 86400);
    second %= 86400;//余数代表剩下的秒数；
    var hour = Math.floor(second / 3600);//3600代表小时；
    second %= 3600; //余数代表 剩下的秒数；
    var minute = Math.floor(second / 60);
    second %= 60;
    var str = formatType(hour)  + '&nbsp;&nbsp;&nbsp;'+ formatType(minute) + '&nbsp;&nbsp;&nbsp;'
        + formatType(second) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	    if(remainSecond >0){
	      document.getElementById("remainDays").innerHTML=("<font color=#fff size=5px  >"+str+"</font>");
	    }
   		//500的目的是防止漏掉执行
	    setTimeout(countdown,500);
    }
    var setTime=byId("setTime");
    setTimes();
    function setTimes(){
        if(newHour<10)
        {
            if(newMinute<10)
                setTime.innerHTML=("<b><font color=#fff size=4px >"+'0'+newHour+':'+'0' + newMinute+"</font> ");
                else
                setTime.innerHTML=("<b><font color=#fff size=4px  >"+'0'+newHour+':'+ newMinute+"</font></b>");
        }
        else
        {
            if(newMinute<10)
            setTime.innerHTML=("<b><font color=#fff size=4px  >"+newHour+':'+'0' + newMinute+"</font></b>");
            else
            setTime.innerHTML=("<b><font color=#fff size=4px  >"+newHour+':'+ newMinute+"</font></b>");
        }
            
    }
    

//设置显示格式，小于10的填0
function formatType(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}