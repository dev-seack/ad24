$(function() {
  // Reload in the middle of the page???
  if ($(this).scrollTop() > 0) {
    $(".navbar, .navbar-brand").addClass("scrolled");
  }

  // change sub_categorie dropdown on change main_category
  $("#inputMainCategory").change(function() {
    // get the new subcategories
    var newSubCategories = $('[data-main-category="' + $(this).val() + '"]');
    $("[data-main-category]").hide();
    newSubCategories.show();

    // select first element
    newSubCategories[0].selected = true;
  });

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

  // Scroll
  // Navbar
  $(window).scroll(function(e) {
    if ($(this).scrollTop() > 0) {
      $(".navbar, .navbar-brand").addClass("scrolled");
    } else {
      $(".navbar, .navbar-brand").removeClass("scrolled");
    }
  });

  // Carousel
  $(".carousel").carousel({
    interval: 7000
  });
});
