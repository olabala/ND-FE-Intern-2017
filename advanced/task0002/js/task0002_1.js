window.onload = function () {
  var sInput = document.getElementById('hobby')
  var oBtn = document.getElementById('btn')
  var oP = document.getElementById('tags')
  var aOutput = document.getElementById('result-text')

  oBtn.onclick = function () {
    aOutput.innerHTML = ''
    var hobbys = sInput.value.split(/\n|\s+|\,|\，|\、|\;|\；/)
    var newHobbys = uniqArray(hobbys)
    var iLength = newHobbys.length

    console.log('[' + newHobbys + ']')
    if (iLength > 10 || sInput === '') {
      oP.style.display = 'block'
    } else {
      oP.style.display = 'none'

      for (var i = 0; i < iLength; i++) {
        var hobby = trim(newHobbys[i]) // 去空格，解决了之前多输入符号而多输出值的问题
        if (hobby !== '') {
          aOutput.innerHTML += '<label>' + '<input type="checkbox" name="hobby"/>' + newHobbys[i] + '</label>'
        }
      }
    }
  }
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
