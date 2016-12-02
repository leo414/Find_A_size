function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var minutes = date.getMinutes()
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }

  let hour = date.getHours()
  if(hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }

  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    " " + hour + seperator2 + minutes +
    seperator2 + date.getSeconds();
  return currentdate;
}

export default getNowFormatDate
