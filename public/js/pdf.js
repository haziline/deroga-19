var pdfBuffer = document.currentScript.getAttribute('data') || '';

$(document).ready(function () {
  var btn = $('#download');
  
  btn.on('click', function () {
    btn.attr('download', 'Derogation.pdf');
    btn.attr('href', 'data:application/octet-stream;base64,' + pdfBuffer);
  });
});