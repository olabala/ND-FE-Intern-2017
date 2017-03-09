
//汉堡菜单
var oMenu=document.getElementById("hamMenu");
var oIcon=oMenu.getElementsByClassName("menu-icon")[0];
var oNav=document.getElementById("nav")
oIcon.onclick=function(){
	toggleClass(oIcon,"menu-icon-click");
	
	var classes=oIcon.className.replace("/\s+/"," ").split(" ");
	if(classes.indexOf("menu-icon-click") !== -1){
		oNav.style.display="block";
	}
	else{
		oNav.style.display="none";
	}
}

var aLi=oNav.getElementsByTagName("li");
for(var i=0;i<aLi.length;i++){
	aLi[i].style.animationDelay=(i/10)+'s';
	aLi[i].style.webkitAnimationDelay=(i/10)+'s';
	
	
	
	
//	var oWrap=document.getElementById("fall_wrapper");
//	var oImg=document.getElementsByClassName("water_img");
//
//	var pWidth= oWrap.offsetWidth;
//	console.log(oImg.length+" "+pWidth);
//	
//	for(var i=0;i<oImg.length;i++){
//		if(oImg[i].offsetWidth > pWidth*0.5){
//			oImg[i].style.width=1*pWidth+'px';	
//		}
//		else if((oImg[i].offsetWidth >= pWidth*0.25)&&(oImg[i].offsetWidth <= pWidth*0.5)){
//			oImg[i].style.width=0.49*pWidth+'px';	
//		}
//		else{
//			oImg[i].style.width=0.24*pWidth+'px';	
//		}
//		console.log(oImg[i].offsetWidth);
//	}
//	
	
	
}


