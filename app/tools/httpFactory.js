import $ from 'jquery'

const HttpFactory = {
  get(url, data, success, failed) {
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

export default HttpFactory
