//先判断元素有没有指定类名
function checkClass(element,className){
	
	if(!element.className){
    	return false;
    }
	else return element.className.match(new RegExp("(^|\\s)"+className+"(\\s|$)"));
	
}

//为元素加样式类
function addClass(element, newClassName) {
    if(!checkClass(element,newClassName)){
    	element.className+=" "+newClassName;
    }
}

//移除元素样式类
function removeClass(element, oldClassName) {
    if(checkClass(element,oldClassName)){
    	var reg=new RegExp("(^|\\s)"+oldClassName+"(\\s|$)");
    	element.className=element.className.replace(reg,"");
    }
}

function toggleClass(element,className){
	if(checkClass(element,className)){
		removeClass(element,className);
	}
	else
		addClass(element,className);
}


function fadeIn(ele, duration, callback) {
    if(ele.style.opacity === "") {
        ele.style.opacity = 0;
    }
    if(ele.style.display === "none" || ele.style.display === "") {
        ele.style.display = "block";
    }
                   
    var interval_fadein = setInterval(function() {
        if(ele.style.opacity < 1) {
            ele.style.opacity = parseFloat(ele.style.opacity) + 0.01;
        }
        else {
            clearInterval(interval_fadein);
            if(typeof callback !== "undefined") {
                callback.call();
            }
        }
    }, duration / 100);
}

function fadeOut(ele, duration, callback) {
    if(ele.style.opacity === "") {
        ele.style.opacity = 1;
    }
    if(ele.style.display === "none" || ele.style.display === "") {
        ele.style.display = "block";
    }
                   
    var interval_fadein = setInterval(function() {
        if(ele.style.opacity > 0) {
            ele.style.opacity = parseFloat(ele.style.opacity) - 0.01;
        }
        else {
            clearInterval(interval_fadein);
            if(typeof callback !== "undefined") {
                callback.call();
            }
        }
    }, duration/100);
}

function getByClass(oParent, sClassName)
{
    var aElm=oParent.getElementsByTagName('*');
    
    var aArr=[];
    for(var i=0; i<aElm.length; i++)
    {
    	var classes=aElm[i].className.replace("/\s+/"," ").split(" ");
    	if(classes.indexOf(sClassName) !== -1){
    		aArr.push(aElm[i]);
    	}
    }
    return aArr;
}