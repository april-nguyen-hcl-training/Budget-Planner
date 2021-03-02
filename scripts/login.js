function sumbitMessage() {
  document.getElementById("sumbitMessage").innerHTML="Thank you for contacting us. Your message has been submitted!";
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
function checkFinanceLogin() {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.onsubmit = function (e) {
        if (!form.checkValidity()) {
          e.preventDefault()  // prevents from submitting a form
          e.stopPropagation() // prevents propagation of the same event from being called
          form.classList.add('was-validated')
        } else {
          e.preventDefault()
          e.stopPropagation()
          window.location.replace("/deal.html");
        }
      }
    })
}

function checkManagerLogin() {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.onsubmit = function (e) {
        if (!form.checkValidity()) {
          e.preventDefault()  // prevents from submitting a form
          e.stopPropagation() // prevents propagation of the same event from being called
          form.classList.add('was-validated')
        } else {
          e.preventDefault()
          e.stopPropagation()
          window.location.replace("/deal.html");
        }
      }
    })
}
