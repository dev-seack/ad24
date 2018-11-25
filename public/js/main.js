$(function() {
  $(".newsletter-form").submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var submitBtn = form.find("button");
    var emailInput = form.find("input[type=email]");
    // ajax
    $.get("/nsend", form.serialize())
      // success
      .done(function() {
        // add class to form
        form.addClass("email-sent");
        submitBtn.addClass("disabled");
        submitBtn.prop("disabled", true);
        emailInput.val("");
        setTimeout(function() {
          submitBtn.removeClass("disabled");
          submitBtn.prop("disabled", false);
          form.removeClass("email-sent");
        }, 5000);
        // clean input value

        // toast - success
        iziToast.success({
          title: "Erfolgreich!",
          message: "Vielen Dank für Ihr Interesse"
        });
      })
      // fail
      .fail(function() {
        // toast - fail
        iziToast.error({
          title: "Mhh..",
          message: "Irgendwas ist schief gelaufen"
        });
      });
    return false;
  });
});
