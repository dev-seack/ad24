$(function() {
  $(".newsletter-form").submit(function(e) {
    e.preventDefault();
    const delay = 5000;
    const form = $(this);
    const submitBtn = form.find("button");
    const emailInput = form.find("input[type=email]");
    // ajax
    $.get("/nsend", form.serialize())
      // success
      .done(function() {
        // disable input
        form.addClass("email-sent");
        submitBtn.addClass("disabled");
        submitBtn.prop("disabled", true);
        emailInput.val("");
        setTimeout(function() {
          // enable input
          submitBtn.removeClass("disabled");
          submitBtn.prop("disabled", false);
          form.removeClass("email-sent");
        }, delay);
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
