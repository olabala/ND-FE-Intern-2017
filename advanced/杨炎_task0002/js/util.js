
// 判断数组对象
function isArray (arr) {
  if (typeof (arr) === 'object') {
        // 先对象 再数组
    if (Object.prototype.toString.call(arr) === '[object Array]') {
      return true
    }
  } else return false
}

// 判断函数
function isFunction (fn) {
  if (typeof (fn) === 'function') { return true } else { return false }
}

// 深度克隆
function cloneObject (src) {
  var res

  if (Object.prototype.toString.call(src) === '[object Array]') {
    res = []
  } else {
    res = {}
  }
  for (var i in src) {
    if (src.hasOwnProperty(i)) {
      if (typeof src[i] === 'object') {
        res[i] = cloneObject(src[i])
      } else {
        res[i] = src[i]
      }
    }
  }
  return res
}

function indexOf (arr, str) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === str) {
      return true
    }
  }
  return -1
}

// 数组去重
function uniqArray (arr) {
  var res = []

  for (var i = 0; i < arr.length; i++) {
    if (!Array.prototype.indexOf) {
      if (indexOf(res, arr[i]) === -1) {
        res.push(arr[i])
      }
    } else if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }

  return res
}

// 去除空格
function trim (str) {
  var res = ''

  res = str.replace(/^\s+|\s+$/g, '')
  return res
}

// 遍历数组
function each (arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    fn(arr[i], i)
  }
}

// 第一层元素数量
function getObjectLength (obj) {
  var res = 0
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      res++
    }
  }

  return res
}

// 正则判断邮箱
function isEmail (emailStr) {
  var reg = /^(\w+\.)*\w+@\w+(\.\w+)+$/
  return reg.test(emailStr)
}

// 正则判断手机号
function isMobilePhone (phone) {
  var reg = /^(\+\d{1,4})?\d{7,11}$/
  return reg.test(phone)
}

// 先判断元素有没有指定类名
function checkClass (element, className) {
  if (!element.className) {
    return false
  } else return element.className.match(new RegExp('(^|\\s)' + className + '(\\s|$)'))
}

// 为元素加样式类
function addClass (element, newClassName) {
  if (!checkClass(element, newClassName)) {
    element.className += ' ' + newClassName
  }
}

// 移除元素样式类
function removeClass (element, oldClassName) {
  if (checkClass(element, oldClassName)) {
    var reg = new RegExp('(^|\\s)' + oldClassName + '(\\s|$)')
    element.className = element.className.replace(reg, '')
  }
}

// 判断兄弟节点
function isSiblingNode (element, siblingNode) {
  return element.parentNode === siblingNode.parentNode
}

// 获取元素在浏览器窗口中位置
function getPosition (element) {
  var pos = {}
  var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

  pos.x = element.getBoundingClientRect().left + scrollLeft
  pos.y = element.getBoundingClientRect().top + scrollTop

  return pos
}

// mini $

function getByClass (oParent, sClassName) {
  var aElm = oParent.getElementsByTagName('*')

  var aArr = []
  for (var i = 0; i < aElm.length; i++) {
    var classes = aElm[i].className.replace('/\s+/', ' ').split(' ')
    if (!Array.prototype.indexOf) {
      if (indexOf(classes, sClassName) !== -1) {
        aArr.push(aElm[i])
      }
    } else if (classes.indexOf(sClassName) !== -1) {
      aArr.push(aElm[i])
    }
  }
  return aArr
}

function $ (selector) {
  var res = document
  var electors = trim(selector).replace('/\s+/', ' ').split(' ')

    // 经过for循环改变父元素res，实现$("#adom .classa")
  for (var i = 0; i < electors.length; i++) {
    switch (electors[i][0]) {
            // id
      case '#':
        res = res.getElementById(electors[i].substring(1))
        break

            // class
      case '.':
        res = getByClass(res, electors[i].substring(1))[0] // 取符合条件的第一个
        console.log(res)
        break

            // 属性
      case '[':
        var equalLoc = electors[i].indexOf('=') // 标记属性选择器 '='位置
        var allNodes = res.getElementsByTagName('*') // 获取所有元素

        if (equalLoc !== -1) { // 表示有=，有属性值
          var attr = electors[i].substring(1, equalLoc)
          var attrValue = electors[i].substring(equalLoc + 1, electors[i].length - 1) // 获取属性键值
          for (var j = 0; j < allNodes.length; j++) {
            if (allNodes[j].getAttribute(attr) === attrValue) {
              res = allNodes[j]
              break
            }
          }
        } else { // 没有属性值
          var attr3 = electors[i].substring(1, electors[i].length - 1)
          for (var k = 0; k < allNodes.length; k++) {
            if (allNodes[k].hasAttribute(attr3)) {
              res = allNodes[k]
              break
            }
          }
        }
        break

            // 标签
      default:
        res = res.getElementsByTagName(electors[i])[0]
        break
    }
  }
  if (res === document) {
    res = null
  }
  return res
}

// 添加监听事件
function addEvent (element, event, listener) {
  if (element.addEventListener) {
    element.addEventListener(event, listener, false)
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, listener)
  } else {
    element['on' + event] = listener
  }
}

// 移除监听事件
function removeEvent (element, event, listener) {
  if (element.removeEventListener) {
    element.removeEventListener(event, listener, false)
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, listener)
  } else {
    element['on' + event] = null
  }
}

// click 事件绑定
function addClickEvent (element, listener) {
  addEvent(element, 'click', listener)
}

// 按 Enter 键事件绑定
function addEnterEvent (element, listener) {
    // your implement
  addEvent(element, 'keydown', function (ev) {
        // 兼容性处理。
    var oEv = ev || window.event
    if (oEv.keyCode === 13) {
      listener()
    }
  })
}

$.on = function (element, type, listener) {
  return addEvent(element, type, listener)
}

$.un = function (element, type, listener) {
  return removeEvent(element, type, listener)
}

$.click = function (element, listener) {
  return addClickEvent(element, listener)
}

$.enter = function (element, listener) {
  return addEnterEvent(element, listener)
}

function delegateEvent (element, tag, eventName, listener) {
  return addEvent(element, eventName, function (ev) {
    var oEvent = ev || window.event
    var oTarget = oEvent.target || oEvent.srcElement
    if (oTarget.nodeName.toLocaleLowerCase() === tag) {
      listener.call(oTarget, oEvent)
    }
  })
}

$.delegate = function (element, tag, eventName, listener) {
  delegateEvent(element, tag, eventName, listener)
}

$.on = function (selector, event, listener) {
  addEvent($(selector), event, listener)
}

$.un = function (selector, event, listener) {
  removeEvent($(selector), event, listener)
}

$.click = function (selector, listener) {
  addClickEvent($(selector), listener)
}

$.delegate = function (selector, tag, event, listener) {
  delegateEvent($(selector), tag, event, listener)
}

// BOM
// 判断是否为IE浏览器，返回-1或者版本号
function isIE () {
  var userAgent = navigator.userAgent.toLocaleLowerCase()
  var ie = userAgent.match(/msie (\d+.\d+)/i)
  if (ie) {
    return ie[1]  // 返回版本号
  } else {
    return -1
  }
}

function setCookie (cookieName, cookieValue, expiredays) {
  var expire = ''
  if (expiredays != null) {
    expire = new Date((new Date()).getTime() + expiredays * 3600000)
    expire = '; expires=' + expire.toGMTString()
  }
  document.cookie = cookieName + '=' + escape(cookieValue) + expire
}

function getCookie (cookieName) {
  var cookieArr = document.cookie.split(';')
  for (var i = 0; i < cookieArr.length; i++) {
    var cookie = cookieArr[i].split('=')
    if (cookie[0] === cookieName) {
      return cookie[1]
    }
  }
  return ''
}

function clearCookie (cookieName) {
  setCookie(cookieName, '', -1)
}

// ajax
function ajax (url, options) {
  var eAjax = null
  if (window.XMLHttpRequest) {
    eAjax = new XMLHttpRequest()
  } else {
    eAjax = new ActiveXObject('Microsoft.XMLHTTP')
  }

  // eAjax.open()
  var sParam = ''
  var data = options.data ? options.data : -1
  if (typeof data === 'object') {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        sParam += key + '=' + data[key] + '&'
      }
    }
    sParam = sParam.substring(0, sParam.length - 1)
    console.log(sParam)
  } else {
    sParam = 'sid=' + Math.random()
  }

  // eAjax.send()
  var type = options.type ? options.type.toLocaleUpperCase() : 'GET'
  if (type === 'GET') {
    eAjax.open('GET', url + '?' + sParam, true)
    eAjax.send()
  } else {
    eAjax.open('POST', url, true)
    eAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    eAjax.send(sParam)
  }
  eAjax.onreadystatechange = function () {
    if (eAjax.readyState === 4) {
      if (eAjax.status === 200) {
        // 成功
        options.onsuccess(eAjax.responseText, eAjax)
      } else {
        // 失败
        if (options.onfail) {
          options.onfail(eAjax)
        }
      }
    }
  }
}
