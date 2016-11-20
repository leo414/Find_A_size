import $ from 'jquery'

/* Use JSONP */
const HttpFactory = {
  fetch(url, data, success, failed) {
    $.ajax({
      url,
      cache: true,
      type : 'GET',
      jsonp: 'callback',
      data,
      dataType : 'jsonp',
      crossDomain: true,
    })
    .done(success)
    .fail(failed)
  }
}

/* Use CORS */
// const HttpFactory = {
//   fetch(url,data,success,failed) {
//     //json post
//     $.ajax({
//       url,
//       type : 'POST',
//       dataType : 'json',
//       data,
//       timeout : 5000,
//       crossDomain : true,
//       xhrFields:{
//         withCredentials : true
//       },
//     })
//     .done(success)
//     .fail(failed)
//   }
// }

export default HttpFactory
