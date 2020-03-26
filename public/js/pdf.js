$(document).ready(function () {
  $('#download').on('click', function () {
    var doc = new jsPDF('p', 'pt', 'a4');

    doc.addHTML($('#deroga-content'), function() {
      doc.save('Derogation.pdf');
    });
  });
});