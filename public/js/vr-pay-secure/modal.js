(function(e) {
  var c = false;
  var d = "";
  var a = "Do you really want to cancel the payment?";
  var b = function(g) {
    if (typeof g.data === "string") {
      var f = {};
      try {
        f = JSON.parse(g.data);
      } catch (g) {}
      if (f.vrpaysecure) {
        jQuery.each(f.vrpaysecure, function(h, i) {
          switch (h) {
            case "transaction":
              if (typeof i === "object") {
                e.fn.vrpaysecureModal.transaction = i;
              }
              break;
            case "closeModal":
              c = true;
              if (i) {
                d = i;
              }
              e.fn.vrpaysecureModal.modalInstance.modalPx("hide");
              break;
            case "closeConfirmation":
              if (i) {
                a = i;
              }
              break;
          }
        });
      }
    }
  };
  window.addEventListener("message", b, false);
  e.fn.vrpaysecureModal = function(f) {
    var g = e.extend({}, e.fn.vrpaysecureModal.defaults, f);
    e("head").append(
      e(
        '<style type="text/css">html.vrpaysecure-modal-open, html.vrpaysecure-modal-open > body {\n    overflow: hidden;\n}\n\n@media (max-width: 1024px) {\n    html.vrpaysecure-modal-open > body > *:not(#vrpaysecure-modal):not(.px-modal-backdrop) {\n        display: none;\n    }\n}\n\n#vrpaysecure-modal #vrpaysecure-modal-iframe {\n    display: block;\n    visibility: hidden;\n    width: 100%;\n    border: 0;\n}\n\n#vrpaysecure-modal #vrpaysecure-modal-footer {\n    float: left;\n    width: 100%;\n    padding: 0 10px;\n    margin-top: 15px;\n    text-align: center;\n    font-size: 15px;\n    color: #FFF;\n}\n\n#vrpaysecure-modal #vrpaysecure-modal-footer img {\n    height: 15px !important\n}\n\n#vrpaysecure-modal #vrpaysecure-modal-footer .ssl {\n    float: left\n}\n\n#vrpaysecure-modal #vrpaysecure-modal-footer .copyright {\n    float: right\n}\n\n#vrpaysecure-modal html {\n    font-family: sans-serif;\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%\n}\n\n#vrpaysecure-modal article, #vrpaysecure-modal aside, #vrpaysecure-modal details, #vrpaysecure-modal figcaption, #vrpaysecure-modal figure, #vrpaysecure-modal footer, #vrpaysecure-modal header, #vrpaysecure-modal hgroup, #vrpaysecure-modal main, #vrpaysecure-modal nav, #vrpaysecure-modal section, #vrpaysecure-modal summary {\n    display: block\n}\n\n#vrpaysecure-modal audio, #vrpaysecure-modal canvas, #vrpaysecure-modal progress, #vrpaysecure-modal video {\n    display: inline-block;\n    vertical-align: baseline\n}\n\n#vrpaysecure-modal audio:not([controls]) {\n    display: none;\n    height: 0\n}\n\n#vrpaysecure-modal [hidden], #vrpaysecure-modal template {\n    display: none\n}\n\n#vrpaysecure-modal a {\n    background: 0;\n    color: #428bca;\n    text-decoration: none\n}\n\n#vrpaysecure-modal a:active, #vrpaysecure-modal a:hover {\n    outline: 0\n}\n\n#vrpaysecure-modal abbr[title] {\n    border-bottom: 1px dotted\n}\n\n#vrpaysecure-modal b, #vrpaysecure-modal optgroup, #vrpaysecure-modal strong {\n    font-weight: 700\n}\n\n#vrpaysecure-modal dfn {\n    font-style: italic\n}\n\n#vrpaysecure-modal h1 {\n    font-size: 2em;\n    margin: .67em 0\n}\n\n#vrpaysecure-modal mark {\n    background: #ff0;\n    color: #000\n}\n\n#vrpaysecure-modal .px-btn, #vrpaysecure-modal .px-btn-danger.active, #vrpaysecure-modal .px-btn-danger:active, #vrpaysecure-modal .px-btn-default.active, #vrpaysecure-modal .px-btn-default:active, #vrpaysecure-modal .px-btn-info.active, #vrpaysecure-modal .px-btn-info:active, #vrpaysecure-modal .px-btn-primary.active, #vrpaysecure-modal .px-btn-primary:active, #vrpaysecure-modal .px-btn-success.active, #vrpaysecure-modal .px-btn-success:active, #vrpaysecure-modal .px-btn-warning.active, #vrpaysecure-modal .px-btn-warning:active, #vrpaysecure-modal .open > .px-dropdown-toggle.px-btn-danger, #vrpaysecure-modal .open > .px-dropdown-toggle.px-btn-default, #vrpaysecure-modal .open > .px-dropdown-toggle.px-btn-info, #vrpaysecure-modal .open > .px-dropdown-toggle.px-btn-primary, #vrpaysecure-modal .open > .px-dropdown-toggle.px-btn-success, #vrpaysecure-modal .open > .px-dropdown-toggle.px-btn-warning {\n    background-image: none\n}\n\n#vrpaysecure-modal small {\n    font-size: 80%\n}\n\n#vrpaysecure-modal sub, #vrpaysecure-modal sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline\n}\n\n#vrpaysecure-modal sup {\n    top: -.5em\n}\n\n#vrpaysecure-modal sub {\n    bottom: -.25em\n}\n\n#vrpaysecure-modal img {\n    border: 0;\n    vertical-align: middle\n}\n\n#vrpaysecure-modal svg:not(:root) {\n    overflow: hidden\n}\n\n#vrpaysecure-modal hr {\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 0\n}\n\n#vrpaysecure-modal pre, #vrpaysecure-modal textarea {\n    overflow: auto\n}\n\n#vrpaysecure-modal code, #vrpaysecure-modal kbd, #vrpaysecure-modal pre, #vrpaysecure-modal samp {\n    font-family: monospace, monospace;\n    font-size: 1em\n}\n\n#vrpaysecure-modal button, #vrpaysecure-modal input, #vrpaysecure-modal optgroup, #vrpaysecure-modal select, #vrpaysecure-modal textarea {\n    color: inherit;\n    font: inherit;\n    margin: 0\n}\n\n#vrpaysecure-modal *, #vrpaysecure-modal body {\n    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif\n}\n\n#vrpaysecure-modal button {\n    overflow: visible\n}\n\n#vrpaysecure-modal button, #vrpaysecure-modal select {\n    text-transform: none\n}\n\n#vrpaysecure-modal button, #vrpaysecure-modal html input[type=button], #vrpaysecure-modal input[type=reset], #vrpaysecure-modal input[type=submit] {\n    -webkit-appearance: button;\n    cursor: pointer\n}\n\n#vrpaysecure-modal button[disabled], #vrpaysecure-modal html input[disabled] {\n    cursor: default\n}\n\n#vrpaysecure-modal button::-moz-focus-inner, #vrpaysecure-modal input::-moz-focus-inner {\n    border: 0;\n    padding: 0\n}\n\n#vrpaysecure-modal input[type=checkbox], #vrpaysecure-modal input[type=radio] {\n    box-sizing: border-box;\n    padding: 0\n}\n\n#vrpaysecure-modal input[type=number]::-webkit-inner-spin-button, #vrpaysecure-modal input[type=number]::-webkit-outer-spin-button {\n    height: auto\n}\n\n#vrpaysecure-modal input[type=search] {\n    -webkit-appearance: textfield;\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box\n}\n\n#vrpaysecure-modal input[type=search]::-webkit-search-cancel-button, #vrpaysecure-modal input[type=search]::-webkit-search-decoration {\n    -webkit-appearance: none\n}\n\n#vrpaysecure-modal fieldset {\n    border: 1px solid silver;\n    margin: 0 2px;\n    padding: .35em .625em .75em\n}\n\n#vrpaysecure-modal legend {\n    border: 0;\n    padding: 0\n}\n\n#vrpaysecure-modal table {\n    border-collapse: collapse;\n    border-spacing: 0\n}\n\n#vrpaysecure-modal td, #vrpaysecure-modal th {\n    padding: 0\n}\n\n#vrpaysecure-modal *, #vrpaysecure-modal :after, #vrpaysecure-modal :before {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box\n}\n\n#vrpaysecure-modal html {\n    font-size: 10px;\n    -webkit-tap-highlight-color: transparent\n}\n\n#vrpaysecure-modal body {\n    margin: 0;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #333;\n    background-color: #fff\n}\n\n#vrpaysecure-modal button, #vrpaysecure-modal input, #vrpaysecure-modal select, #vrpaysecure-modal textarea {\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit\n}\n\n#vrpaysecure-modal a:focus, #vrpaysecure-modal a:hover {\n    color: #2a6496;\n    text-decoration: underline\n}\n\n#vrpaysecure-modal a:focus {\n    outline: dotted thin;\n    outline: -webkit-focus-ring-color auto 5px;\n    outline-offset: -2px\n}\n\n#vrpaysecure-modal figure {\n    margin: 0\n}\n\n#vrpaysecure-modal .img-responsive {\n    display: block;\n    max-width: 100%;\n    height: auto\n}\n\n#vrpaysecure-modal .img-rounded {\n    border-radius: 6px\n}\n\n#vrpaysecure-modal .img-thumbnail {\n    padding: 4px;\n    line-height: 1.42857143;\n    background-color: #fff;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    -webkit-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out;\n    display: inline-block;\n    max-width: 100%;\n    height: auto\n}\n\n#vrpaysecure-modal .img-circle {\n    border-radius: 50%\n}\n\n#vrpaysecure-modal hr {\n    margin-top: 20px;\n    margin-bottom: 20px;\n    border: 0;\n    border-top: 1px solid #eee\n}\n\n#vrpaysecure-modal .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    margin: -1px;\n    padding: 0;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    border: 0\n}\n\n#vrpaysecure-modal .sr-only-focusable:active, #vrpaysecure-modal .sr-only-focusable:focus {\n    position: static;\n    width: auto;\n    height: auto;\n    margin: 0;\n    overflow: visible;\n    clip: auto\n}\n#vrpaysecure-modal .fade {\n    opacity: 0;\n    -webkit-transition: opacity .15s linear;\n    -o-transition: opacity .15s linear;\n    transition: opacity .15s linear\n}\n\n#vrpaysecure-modal .fade.in {\n    opacity: 1\n}\n\n#vrpaysecure-modal .collapse {\n    display: none\n}\n\n#vrpaysecure-modal .collapse.in {\n    display: block\n}\n\n#vrpaysecure-modal tr.collapse.in {\n    display: table-row\n}\n\n#vrpaysecure-modal tbody.collapse.in {\n    display: table-row-group\n}\n\n#vrpaysecure-modal .collapsing {\n    position: relative;\n    height: 0;\n    overflow: hidden;\n    -webkit-transition: height .35s ease;\n    -o-transition: height .35s ease;\n    transition: height .35s ease\n}\n\n#vrpaysecure-modal .close {\n    float: right;\n    font-size: 21px;\n    font-weight: 700;\n    line-height: 1;\n    color: #000;\n    text-shadow: 0 1px 0 #fff;\n    opacity: .2;\n    filter: alpha(opacity=20)\n}\n\n#vrpaysecure-modal .close:focus, #vrpaysecure-modal .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .5;\n    filter: alpha(opacity=50)\n}\n\n#vrpaysecure-modal button.close {\n    padding: 0;\n    cursor: pointer;\n    background: 0;\n    border: 0;\n    -webkit-appearance: none\n}\n\n#vrpaysecure-modal .px-modal-open {\n    overflow: hidden\n}\n\n#vrpaysecure-modal.px-modal {\n    display: none;\n    overflow: hidden;\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 9050;\n    -webkit-overflow-scrolling: touch;\n    outline: 0\n}\n\n#vrpaysecure-modal.px-modal.fade .px-modal-dialog {\n    -webkit-transform: translate3d(0, -25%, 0);\n    transform: translate3d(0, -25%, 0);\n    -webkit-transition: -webkit-transform .3s ease-out;\n    -moz-transition: -moz-transform .3s ease-out;\n    -o-transition: -o-transform .3s ease-out;\n    transition: transform .3s ease-out\n}\n\n#vrpaysecure-modal.px-modal.in .px-modal-dialog {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0)\n}\n\n#vrpaysecure-modal .px-modal-open .px-modal {\n    overflow-x: hidden;\n    overflow-y: auto\n}\n\n#vrpaysecure-modal .px-modal-dialog {\n    position: relative;\n    width: auto;\n    margin: 10px;\n    z-index: 9050\n}\n\n#vrpaysecure-modal .px-modal-content {\n    position: relative;\n    background-color: #fff;\n    border: 1px solid #999;\n    border: 1px solid rgba(0, 0, 0, .2);\n    border-radius: 0;\n    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\n    box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\n    background-clip: padding-box;\n    outline: 0\n}\n\n.px-modal-backdrop {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 9000;\n    background-color: rgba(0, 0, 0, .498039)\n}\n\n.px-modal-backdrop.fade {\n    opacity: 0;\n    filter: alpha(opacity=0)\n}\n\n.px-modal-backdrop.in {\n    opacity: 1;\n    filter: alpha(opacity=100);\n    background-image: radial-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .74902))\n}\n\n#vrpaysecure-modal .px-modal-header {\n    padding: 10px 10px 18px;\n    border-bottom: 0;\n    min-height: 16.43px\n}\n\n#vrpaysecure-modal .px-modal-header .close {\n    margin-top: -2px\n}\n\n#vrpaysecure-modal .px-modal-body {\n    float: none;\n    position: relative;\n    padding: 0;\n    background: url(https://media.vr-pay-secure.de/modal/v1/iframe-spinner.gif) center center no-repeat\n}\n\n#vrpaysecure-modal .px-modal-scrollbar-measure {\n    position: absolute;\n    top: -9999px;\n    width: 50px;\n    height: 50px;\n    overflow: scroll\n}\n\n@media (min-width: 820px) {\n    #vrpaysecure-modal .px-modal-dialog {\n        width: 800px;\n        margin: 30px auto\n    }\n\n    #vrpaysecure-modal .px-modal-content {\n        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\n        box-shadow: 0 5px 15px rgba(0, 0, 0, .5)\n    }\n\n    #vrpaysecure-modal .px-modal-sm {\n        width: 300px\n    }\n}\n\n@media (min-width: 992px) {\n    #vrpaysecure-modal .px-modal-lg {\n        width: 900px\n    }\n}\n\n#vrpaysecure-modal .clearfix:after, #vrpaysecure-modal .clearfix:before {\n    content: " ";\n    display: table\n}\n\n#vrpaysecure-modal .clearfix:after {\n    clear: both\n}\n\n#vrpaysecure-modal .center-block {\n    display: block;\n    margin-left: auto;\n    margin-right: auto\n}\n\n#vrpaysecure-modal .pull-right {\n    float: right !important\n}\n\n#vrpaysecure-modal .pull-left {\n    float: left !important\n}\n\n#vrpaysecure-modal .hide {\n    display: none !important\n}\n\n#vrpaysecure-modal .show {\n    display: block !important\n}\n\n#vrpaysecure-modal .invisible {\n    visibility: hidden\n}\n\n#vrpaysecure-modal .text-hide {\n    font: 0/0 a;\n    color: transparent;\n    text-shadow: none;\n    background-color: transparent;\n    border: 0\n}\n\n#vrpaysecure-modal .hidden {\n    display: none !important;\n    visibility: hidden !important\n}\n\n#vrpaysecure-modal .affix {\n    position: fixed;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0)\n}\n\n@media (max-width: 1024px) {\n    #vrpaysecure-modal .px-modal-dialog {\n        width: 100%;\n        height: 100%;\n        margin: 0\n    }\n\n    #vrpaysecure-modal .px-modal-content {\n        height: 100%;\n        border: 0;\n        box-shadow: none;\n        padding-bottom: 70px\n    }\n\n    #vrpaysecure-modal .px-modal-body, #vrpaysecure-modal .vrpaysecure-modal-iframe {\n        height: 100%\n    }\n\n    #vrpaysecure-modal-footer {\n        display: none\n    }\n}</style>'
      )
    );
    if ("undefined" == typeof jQuery) {
      throw new Error("Bootstrap's JavaScript requires jQuery");
    }
    (function(k) {
      var i = function(m, l) {
        this.options = l;
        this.$body = k(document.body);
        this.$element = k(m);
        this.$backdrop = this.isShown = null;
        this.scrollbarWidth = 0;
        if (this.options.remote) {
          this.$element.find(".px-modal-content").load(
            this.options.remote,
            k.proxy(function() {
              this.$element.trigger("loaded.bs.modal.px");
            }, this)
          );
        }
      };
      i.VERSION = "3.2.0";
      i.DEFAULTS = { backdrop: true, keyboard: true, show: true };
      i.prototype.toggle = function(l) {
        return this.isShown ? this.hide() : this.show(l);
      };
      i.prototype.show = function(n) {
        var l = this;
        var m = k.Event("show.bs.modal.px", { relatedTarget: n });
        this.$element.trigger(m);
        if (this.isShown || m.isDefaultPrevented()) {
          return;
        }
        this.isShown = true;
        this.checkScrollbar();
        this.$body.addClass("px-modal-open");
        this.setScrollbar();
        this.escape();
        this.$element.on(
          "click.dismiss.bs.modal.px",
          '[data-dismiss="px-modal"]',
          k.proxy(this.hide, this)
        );
        this.backdrop(function() {
          var p = k.support.transition && l.$element.hasClass("fade");
          if (!l.$element.parent().length) {
            l.$element.appendTo(l.$body);
          }
          l.$element.show().scrollTop(0);
          if (p) {
            l.$element[0].offsetWidth;
          }
          l.$element.addClass("in").attr("aria-hidden", false);
          l.enforceFocus();
          var o = k.Event("shown.bs.modal.px", { relatedTarget: n });
          p
            ? l.$element
                .find(".px-modal-dialog")
                .one("bsTransitionEnd", function() {
                  l.$element.trigger("focus").trigger(o);
                })
                .emulateTransitionEnd(300)
            : l.$element.trigger("focus").trigger(o);
        });
      };
      i.prototype.hide = function(l) {
        if (l) {
          l.preventDefault();
        }
        l = k.Event("hide.bs.modal.px");
        this.$element.trigger(l);
        if (!this.isShown || l.isDefaultPrevented()) {
          return;
        }
        this.isShown = false;
        this.$body.removeClass("px-modal-open");
        this.resetScrollbar();
        this.escape();
        k(document).off("focusin.bs.modal.px");
        this.$element
          .removeClass("in")
          .attr("aria-hidden", true)
          .off("click.dismiss.bs.modal.px");
        k.support.transition && this.$element.hasClass("fade")
          ? this.$element
              .one("bsTransitionEnd", k.proxy(this.hideModal, this))
              .emulateTransitionEnd(300)
          : this.hideModal();
      };
      i.prototype.enforceFocus = function() {
        k(document)
          .off("focusin.bs.modal.px")
          .on(
            "focusin.bs.modal.px",
            k.proxy(function(l) {
              if (
                this.$element[0] !== l.target &&
                !this.$element.has(l.target).length
              ) {
                this.$element.trigger("focus");
              }
            }, this)
          );
      };
      i.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
          this.$element.on(
            "keyup.dismiss.bs.modal.px",
            k.proxy(function(l) {
              l.which == 27 && this.hide();
            }, this)
          );
        } else {
          if (!this.isShown) {
            this.$element.off("keyup.dismiss.bs.modal.px");
          }
        }
      };
      i.prototype.hideModal = function() {
        var l = this;
        this.$element.hide();
        this.backdrop(function() {
          l.$element.trigger("hidden.bs.modal.px");
        });
      };
      i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
      };
      i.prototype.backdrop = function(p) {
        var o = this;
        var m = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var l = k.support.transition && m;
          this.$backdrop = k(
            '<div class="px-modal-backdrop ' + m + '" />'
          ).appendTo(this.$body);
          this.$element.on(
            "click.dismiss.bs.modal.px",
            k.proxy(function(q) {
              if (q.target !== q.currentTarget) {
                return;
              }
              this.options.backdrop == "static"
                ? this.$element[0].focus.call(this.$element[0])
                : this.hide.call(this);
            }, this)
          );
          if (l) {
            this.$backdrop[0].offsetWidth;
          }
          this.$backdrop.addClass("in");
          if (!p) {
            return;
          }
          l
            ? this.$backdrop.one("bsTransitionEnd", p).emulateTransitionEnd(150)
            : p();
        } else {
          if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var n = function() {
              o.removeBackdrop();
              p && p();
            };
            k.support.transition && this.$element.hasClass("fade")
              ? this.$backdrop
                  .one("bsTransitionEnd", n)
                  .emulateTransitionEnd(150)
              : n();
          } else {
            if (p) {
              p();
            }
          }
        }
      };
      i.prototype.checkScrollbar = function() {
        if (document.body.clientWidth >= window.innerWidth) {
          return;
        }
        this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar();
      };
      i.prototype.setScrollbar = function() {
        var l = parseInt(this.$body.css("padding-right") || 0, 10);
        if (this.scrollbarWidth) {
          this.$body.css("padding-right", l + this.scrollbarWidth);
        }
      };
      i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "");
      };
      i.prototype.measureScrollbar = function() {
        var m = document.createElement("div");
        m.className = "px-modal-scrollbar-measure";
        this.$body.append(m);
        var l = m.offsetWidth - m.clientWidth;
        this.$body[0].removeChild(m);
        return l;
      };
      function j(l, m) {
        return this.each(function() {
          var p = k(this);
          var o = p.data("bs.modal.px");
          var n = k.extend({}, i.DEFAULTS, p.data(), typeof l == "object" && l);
          if (!o) {
            p.data("bs.modal.px", (o = new i(this, n)));
          }
          if (typeof l == "string") {
            o[l](m);
          } else {
            if (n.show) {
              o.show(m);
            }
          }
        });
      }
      var h = k.fn.modalPx;
      k.fn.modalPx = j;
      k.fn.modalPx.Constructor = i;
      k.fn.modalPx.noConflict = function() {
        k.fn.modalPx = h;
        return this;
      };
      k(document).on(
        "click.bs.modal.data-api.px",
        '[data-toggle="px-modal"]',
        function(p) {
          var o = k(this);
          var m = o.attr("href");
          var l = k(
            o.attr("data-target") || (m && m.replace(/.*(?=#[^\s]+$)/, ""))
          );
          var n = l.data("bs.modal.px")
            ? "toggle"
            : k.extend({ remote: !/#/.test(m) && m }, l.data(), o.data());
          if (o.is("a")) {
            p.preventDefault();
          }
          l.one("show.bs.modal.px", function(q) {
            if (q.isDefaultPrevented()) {
              return;
            }
            l.one("hidden.bs.modal.px", function() {
              o.is(":visible") && o.trigger("focus");
            });
          });
          j.call(l, n, this);
        }
      );
    })(jQuery);
    return this.each(function() {
      e(this).click(function(j) {
        j.preventDefault();
        var i = e(this).data("href");
        i += "&appview=1";
        var h = new Date();
        e.fn.vrpaysecureModal.modalInstance = e(
          '<div class="px-modal fade" id="vrpaysecure-modal" tabindex="-1" role="dialog" aria-labelledby="vrpaysecure-modal-label" aria-hidden="true"><div class="px-modal-dialog"><div class="px-modal-content nano"><div class="px-modal-header"><button type="button" class="close" data-dismiss="px-modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div><div class="px-modal-body nano-content"><iframe id="vrpaysecure-modal-iframe" src="' +
            i +
            '"></iframe></div></div><div id="vrpaysecure-modal-footer"><div class="ssl"><img src="https://media.vr-pay-secure.de/modal/v1/lock-icon.png" title="HTTPS Secure" alt="Lock-Icon" /></div><a href="https://www.vr-payment.de" target="_blank"><img src="https://media.vr-pay-secure.de/modal/v1/logo.png" alt="VR pay QuickCommerce" /></a><div class="copyright">&copy; ' +
            h.getFullYear() +
            "</div></div></div></div>"
        )
          .on("show.bs.modal.px", function(k) {
            e("html").addClass("vrpaysecure-modal-open");
            return g.show(k);
          })
          .on("shown.bs.modal.px", function() {
            e("#vrpaysecure-modal-iframe").load(function() {
              if (!window.location.origin) {
                window.location.origin =
                  window.location.protocol +
                  "//" +
                  window.location.hostname +
                  (window.location.port ? ":" + window.location.port : "");
              }
              try {
                var k = {
                  origin: window.location.origin,
                  integrationMode: "modal",
                  hideObjects: g.hideObjects
                };
                e(this)
                  .get(0, 1)
                  .contentWindow.postMessage(JSON.stringify(k), i);
                e(this).css("visibility", "visible");
                function m() {
                  if (window.innerWidth <= 1024) {
                    e("#vrpaysecure-modal-iframe").css("height", "100%");
                  } else {
                    var n =
                      window.innerHeight -
                      parseInt(
                        e("#vrpaysecure-modal .px-modal-header").height()
                      ) -
                      parseInt(
                        e("#vrpaysecure-modal .px-modal-header").css(
                          "padding-top"
                        )
                      ) -
                      parseInt(
                        e("#vrpaysecure-modal .px-modal-header").css(
                          "padding-bottom"
                        )
                      ) -
                      parseInt(
                        e("#vrpaysecure-modal .px-modal-body").css(
                          "padding-bottom"
                        )
                      ) -
                      parseInt(
                        e("#vrpaysecure-modal .px-modal-dialog").css(
                          "margin-top"
                        )
                      ) -
                      parseInt(e("#vrpaysecure-modal-footer").height()) -
                      2 *
                        parseInt(
                          e("#vrpaysecure-modal-footer").css("margin-top")
                        );
                    if (n > 800) {
                      n = 800;
                    }
                    e("#vrpaysecure-modal-iframe").css("height", n + "px");
                  }
                }
                e(window).resize(m);
                m();
                g.shown();
              } catch (l) {}
            });
          })
          .on("hide.bs.modal.px", function() {
            if (e.isEmptyObject(e.fn.vrpaysecureModal.transaction) && !c) {
              var k = confirm(a);
              if (!k) {
                return false;
              }
            }
            g.hide(e.fn.vrpaysecureModal.transaction);
            if (d) {
              window.location = d;
            }
          })
          .on("hidden.bs.modal.px", function() {
            e(this).remove();
            g.hidden(e.fn.vrpaysecureModal.transaction);
            e("html").removeClass("vrpaysecure-modal-open");
          })
          .modalPx({ backdrop: "static", keyboard: false });
      });
    });
  };
  e.fn.vrpaysecureModal.modalInstance = null;
  e.fn.vrpaysecureModal.transaction = new Object();
  e.fn.vrpaysecureModal.defaults = {
    hideObjects: [],
    show: function(f) {},
    shown: function() {},
    hide: function(f) {},
    hidden: function(f) {}
  };
})(jQuery);
