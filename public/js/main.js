$(function() {
  $(".newsletter-form").submit(function(e) {
    e.preventDefault();
    // ajax
    $.get("/nsend", $(this).serialize())
      // success
      .done(function() {
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
