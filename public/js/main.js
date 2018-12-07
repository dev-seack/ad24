const zipToCity = require("zip-to-city");

$(function() {
  // Reload in the middle of the page???
  if ($(this).scrollTop() > 0) {
    $(".navbar, .navbar-brand").addClass("scrolled");
  }

  // enter city when plz is typed in
  $("#inputPLZ").keyup(function() {
    const city = zipToCity($(this).val());

    if (city !== null) {
      $("#inputCity").val(city);
    } else {
      $("#inputCity").val("Postleitzahl ungültig...");
    }
  });

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
          message: "Vielen Dank für Ihre Nachricht",
          position: "bottomCenter"
        });
      })
      // fail
      .fail(function() {
        // toast - fail
        iziToast.error({
          title: "Mhh..",
          message: "Irgendwas ist schief gelaufen",
          position: "bottomCenter"
        });
      });
    return false;
  });

  // Scroll
  // Navbar

  const path = window.location.href;

  // just detect scrolling for the navbar if the user is on the index
  if (path.length === path.lastIndexOf("/") + 1) {
    $(window).scroll(function(e) {
      if ($(this).scrollTop() > 0) {
        $(".navbar, .navbar-brand").addClass("scrolled");
      } else {
        $(".navbar, .navbar-brand").removeClass("scrolled");
      }
    });
  }

  // Carousel
  $(".carousel").carousel({
    interval: 7000
  });
});
