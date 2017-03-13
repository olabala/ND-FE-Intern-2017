window.onload = function () {
  var oContainer = document.getElementById('container')
  var oTags = document.getElementById('tags')
  var oUl1 = document.getElementById('ul_1')
  var oUl2 = document.getElementById('ul_2')
  var aLi = oContainer.getElementsByTagName('li')

  // console.log(aLi.length)
  var aPos = []
  var iMinZindex = 2

  for (var i = 0; i < aLi.length; i++) {
    aPos[i] = {
      left: aLi[i].offsetLeft,
      top: aLi[i].offsetTop
    }
  }

  for (var j = 0; j < aLi.length; j++) {
    aLi[j].style.position = 'absolute'
    aLi[j].style.left = aPos[j].left + 'px'
    aLi[j].style.top = aPos[j].top + 'px'

    aLi[j].index = j
  }

  $.delegate("#container", 'li', 'mousedown', function (ev) {
    var _this = this
    var oEvent = ev || window.event
    _this.style.zIndex = iMinZindex++

    var disX = oEvent.clientX - _this.offsetLeft
    var disY = oEvent.clientY - _this.offsetTop

    var activeLiLeft = _this.offsetLeft
    var activeLiTop = _this.offsetTop
    var activeLiPar = _this.parentNode
    // console.log(activeLiLeft)

    _this.style.opacity = '0.5'
    _this.className = 'active-li'

    document.onmousemove = function (ev) {
      var oEvent = ev || window.event

      _this.style.left = oEvent.clientX - disX + 'px'
      _this.style.top = oEvent.clientY - disY + 'px'

      oTags.innerHTML = '可以将该选项放在任意一个容器的任意一个位置哦 ! ! !'

      for (var i = 0; i < aLi.length; i++) {
        removeClass(aLi[i], 'target-li')
      }

      var oNear = findNearest(_this)
      // console.log(oNear)
        // 移动时碰撞上的情况
      if (oNear) {
        addClass(oNear, 'target-li')
      }
    }

    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null

      var oNear = findNearest(_this)
      if (oNear) { // 不同父级
        if (_this.parentNode !== oNear.parentNode) {
          oNear.parentNode.insertBefore(_this, oNear)
          _this.style.left = oNear.style.left
          _this.style.top = oNear.style.top
          var oNearLi = oNear.parentNode.getElementsByTagName('li')
          var _thisLi = activeLiPar.getElementsByTagName('li')
          // console.log('对面父级：' + oNearLi.length + '自己父级：' + _thisLi.length)

// 添加后位置处理
          for (var i = getIndex(_this) + 1; i < oNearLi.length; i++) {
            oNearLi[i].style.left = _this.style.left
            oNearLi[i].style.top = _this.offsetHeight + oNearLi[i].offsetTop + 'px'
          }

// 处理原位置。
          for (var j = 0; j < _thisLi.length; j++) {
            if (j === 0) {
              _thisLi[0].style.left = activeLiPar.offsetLeft + 'px'
              _thisLi[0].style.top = activeLiPar.offsetTop + 'px'
            } else {
              _thisLi[j].style.left = _thisLi[j - 1].style.left
              _thisLi[j].style.top = _this.offsetHeight + _thisLi[j - 1].offsetTop + 'px'
            }
            // console.log('位置信息' + _thisLi[j].style.left + ' ' + _thisLi[j].style.top)
          }
        } else {
        // 同一父级,只要交换位置
          _this.style.left = oNear.style.left
          _this.style.top = oNear.style.top
          oNear.style.left = activeLiLeft + 'px'
          oNear.style.top = activeLiTop + 'px'
        }
      } else { // 没碰撞到 判断是否与对面父容器碰撞到了,是则添加到最后一个，否则回到原位置
        // console.log('没碰到，继续判断')
        if (_this.parentNode === oUl1) {
          appChild(_this, oUl2)
        } else {
          appChild(_this, oUl1)
        }
      }

      _this.style.opacity = '1'
      _this.style.backgroundColor = '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)

      oTags.innerHTML = '本次移动完成了，您可以重新选择不同的节点进行移动哦 ! ! !'

      for (var k = 0; k < aLi.length; k++) {
        aLi[k].className = ''
      }

      function appChild (obj, parent) {
    // 碰撞对面父级元素的情况
        if (collisionTest(obj, parent.parentNode)) {
          // console.log('碰到对面父亲了')
          var oLi = parent.getElementsByTagName('li')
          var len = oLi.length
          console.log(len)
          parent.appendChild(obj)
        // 处理添加后的位置。
          if (len) {
            obj.style.left = oLi[0].style.left
            obj.style.top = oLi[len - 1].offsetTop + oLi[0].offsetHeight + 'px'
          } else { // 新父元素内没有li的情况
            obj.style.left = parent.offsetLeft + 'px'
            obj.style.top = parent.offsetTop + 'px'
          }

        // 处理原位置。
          var thatLi = activeLiPar.getElementsByTagName('li')
          for (var j = 0; j < thatLi.length; j++) {
            if (j === 0) {
              thatLi[0].style.left = activeLiPar.offsetLeft + 'px'
              thatLi[0].style.top = activeLiPar.offsetTop + 'px'
            } else {
              thatLi[j].style.left = thatLi[j - 1].style.left
              thatLi[j].style.top = _this.offsetHeight + thatLi[j - 1].offsetTop + 'px'
            }
          }
        } else {
        // 未碰撞到时返回原位置
          startMove(obj, { left: activeLiLeft, top: activeLiTop }, function () {
            obj.style.left = activeLiLeft + 'px'
            obj.style.top = activeLiTop + 'px'
          })
        }
      }
    }

    clearInterval(_this.timer) // 处理在未碰撞到时，回到原位置途中再次拖拽的问题。不然会闪屏
    return false
  })

  function collisionTest (obj1, obj2) {
    var l1 = obj1.offsetLeft
    var r1 = obj1.offsetLeft + obj1.offsetWidth
    var t1 = obj1.offsetTop
    var b1 = obj1.offsetTop + obj1.offsetHeight

    var l2 = obj2.offsetLeft
    var r2 = obj2.offsetLeft + obj2.offsetWidth
    var t2 = obj2.offsetTop
    var b2 = obj2.offsetTop + obj2.offsetHeight

    if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
      return false
    } else {
      // console.log('碰到了！')
      return true
    }
  }

  function getDis (obj1, obj2) {
    var a = obj1.offsetLeft - obj2.offsetLeft
    var b = obj1.offsetTop - obj2.offsetTop

    // console.log('距离左部：' + a + '顶部： ' + b)

    return Math.sqrt(a * a + b * b)
  }

  function findNearest (obj) { // 找到碰上的，并且最近的
    var iMin = 999999999
    var iMinIndex = -1

    for (var i = 0; i < aLi.length; i++) {
      if (obj === aLi[i]) continue

      if (collisionTest(obj, aLi[i])) {
        var dis = getDis(obj, aLi[i])

        if (iMin > dis) {
          iMin = dis
          iMinIndex = i
        }
      }
    }

    if (iMinIndex === -1) {
      return null
    } else {
      // console.log(aLi[iMinIndex] + '' + iMinIndex)
      return aLi[iMinIndex]
    }
  }
}

function getIndex (element) {
  var aBrother = element.parentNode.children
  for (var i = 0, len = aBrother.length; i < len; i++) {
    if (aBrother[i] === element) {
      return i
    }
  }
}

function getStyle (obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]
  } else {
    return getComputedStyle(obj, false)[attr]
  }
}

function startMove (obj, json, fn) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    var bStop = true  // 这一次运动就结束了——所有的值都到达了
    for (var attr in json) {
// 1.取当前的值
      var iCur = 0

      if (attr === 'opacity') {
        iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100)
      } else {
        iCur = parseInt(getStyle(obj, attr))
      }
// 2.算速度
      var iSpeed = (json[attr] - iCur) / 8
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
// 3.检测停止
      if (iCur !== json[attr]) {
        bStop = false
      }

      if (attr === 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')'
        obj.style.opacity = (iCur + iSpeed) / 100
      } else {
        obj.style[attr] = iCur + iSpeed + 'px'
      }
    }

    if (bStop) {
      clearInterval(obj.timer)

      if (fn) {
        fn()
      }
    }
  }, 30)
}
