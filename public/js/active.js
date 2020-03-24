$(document).ready(function () {
  var home = $('#home-link');
  var deroga = $('#deroga-link');
  var url = window.location.href.split('/');
  var path = '/' + url[url.length - 1];

  if (path === '/') {
    deroga.removeClass('active');
    home.addClass('active');
  } else if (path === '/form') {
    home.removeClass('active');
    deroga.addClass('active');
  }
});
