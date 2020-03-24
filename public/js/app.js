var months = JSON.parse(document.currentScript.getAttribute('data')) || [];
var left = '<p class="font-weight-lighter"><small>';
var right = '</small></p>';

function getDateTime() {
  var today = new Date();
  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return date + ' ' + time;
}

function validateFullname() {
  var regex = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$", "g");
  var fullname = $('#fullname').val();
  return regex.test(fullname) ? '' : left + '- Le Nom et prénom sont invalides' + right;
}

function validateBirthday() {
  var day = parseInt($('#day').val(), 10);
  var month = $('#month').val();
  var year = parseInt($('#year').val(), 10);
  var error = '';

  if (Number.isNaN(year) || year < 1900 || year > 2020) {
    error += left + '- L\'année de naissance doit être comprise entre 1900 et 2020' + right;
  }

  if (months.indexOf(month) === -1) {
    error += left + '- Le mois de naissance doit être compris entre Janvier et Décembre' + right;
  }

  var leapYear = new Date(year, 1, 29).getDate() === 29;

  if (Number.isNaN(day) || day < 1 || day > 31) {
    error += left + '- Le jour de naissance doit être compris entre 1 et 31 selon le mois' + right;
  }

  if (!leapYear && months.indexOf(month) === 1 && day > 28) {
    error += left + '- L\'année ' +  year + ' n\'est pas une année bissextile' + right;
  }

  return error;
}

function validateAddress() {
  var zipcodeRegex = new RegExp("^(([0-8][0-9])|(9[0-5]))[0-9]{3}$", "g");
  var street = $('#street').val();
  var zipcode = $('#zipcode').val();
  var city = $('#city').val();
  var error = '';

  if (!street) {
    error += left + '- Le nom de rue est invalide' + right;
  }

  if (!zipcodeRegex.test(zipcode)) {
    error += left + '- Le code postal est invalide' + right;
  }

  if (!city) {
    error += left + '- Le nom de la ville est invalide' + right;
  }

  return error;
}

function validateRaison() {
  var raison = $("input[name='raison']:checked").val();

  console.log(raison);
  return ['1', '2', '3', '4', '5'].indexOf(raison) !== -1 ? '' :
    left + '- La raison n\'a pas été séléctionée' + right;
}

function isDataValid() {
  var toast = $('#toast');
  var errors = validateFullname() + validateBirthday() + validateAddress() + validateRaison();

  $('#error').empty();

  if (errors) {
    $('#error').append(errors)
    toast.toast('show');
    return false;
  }

  toast.toast('hide');
  return true;
}

$(document).ready(function () {
  $('#doneOn').val(getDateTime());
  // signature pad
  var canvas = document.querySelector('#signature');
  var signaturePad = new SignaturePad(canvas, { backgroundColor: 'rgb(255,255,255)' });
  var clearBtn = $('#clear');
  var signatureData = $('#signatureData');
  var cityInput = $('#city');


  cityInput.on('blur', function () {
    $('#doneAt').val(cityInput.val());
  });

  clearBtn.on('click', function () {
    signaturePad.clear();
  });

  $('#deroga-19').submit(function(e) {
    signatureData.val(signaturePad.toDataURL());
    if (!isDataValid()) {
      e.preventDefault();
    }
  });
});
