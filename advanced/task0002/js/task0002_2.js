window.onload = function () {
  var sInput = document.getElementById('time')
  var oBtn = document.getElementById('btn2')
  var aOutput = document.getElementById('result-text')

  function countDown () {
    var sTime = sInput.value.match(/(^\d{4})-(\d{2})-(\d{2}$)/)
    if (sTime !== null) {
      var currentTime = new Date()
      var targetTime = new Date(sTime[1], sTime[2] - 1, sTime[3])
      var subTime = parseInt((targetTime.getTime() - currentTime.getTime()) / 1000)

      if (subTime <= 0) {
        clearTimeout(timer)
        window.alert('目标时间已经过啦!!!')
        aOutput.innerHTML = ''
      } else {
        var leftDay = parseInt(subTime / (60 * 60 * 24))
        var leftHour = parseInt(subTime / (60 * 60) % 24)
        var leftMin = parseInt(subTime / 60 % 60)
        var leftSec = parseInt(subTime % 60)
        aOutput.innerHTML = '距离' + targetTime.getFullYear() + '年' + (targetTime.getMonth() + 1) + '月' + targetTime.getDate() + '日还有' + leftDay + '天' + leftHour + '小时' + leftMin + '分' + leftSec + '秒'

        var timer = setTimeout(countDown, 1000)
      }
    } else {
      window.alert('输入的日期格式有误，请严格按照YYYY-MM-DD格式输入年月日!!!')
      aOutput.innerHTML = ''
    }
  }
  oBtn.onclick = function () {
    countDown()
  }
}
