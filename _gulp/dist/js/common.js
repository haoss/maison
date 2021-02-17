'use strict';

// Document ready
$(document).on('ready', function(){

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $("form").each(function(){
    $(this).validate();
  });

  $('.svg-inline').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');
      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }
      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');
      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });

  $('[data-fancybox]').fancybox({
    protect: true,
    backFocus: false
  });

  $("a[href*='#'].anchor").mPageScroll2id({
    offset: '.header'
  });

  $('.insta-carousel').slick({
    mobileFirst: true,
    variableWidth: true,
    centerMode: true,
    infinite: true,
    dots: false,
    arrow: true,
    slidesToShow: 1,
    centerPadding: '0px',
    prevArrow: '#insta-left',
    nextArrow: '#insta-right',
    autoplay: true,
    autoplaySpeed: 4000,
    touchMove: false,
    draggable: false,
    pauseOnHover: false
  });

  $('.main-blocks__carousel').slick({
    mobileFirst: true,
    dots: false,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    fade: true,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          dots: true,
          customPaging: function(slick,index) {
            var index = index + 1;
            if (index >= 0 && index <= 9) {
              index = '0' + index
            }
            return '<span class="span">' + '<span>' + index + '</span>' + '</span>';
          }
        }
      }
    ]
  });

  $('.main-choice__carousel').slick({
    mobileFirst: true,
    dots: false,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    fade: true,
  });

  $('.main-choice__carousel2').slick({
    mobileFirst: true,
    dots: false,
    arrow: false,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    variableWidth: true,
    centerPadding: '30px'
  });

  phoneMask();
  mobileNav();
  headerScroll();
  // oneCarousel();
  footerNav();
  jNavigation();

  var grid = document.querySelector('#grid');
  var item = document.createElement('article');
  salvattore.appendElements(grid, [item]);

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() { });
$(window).on('scroll', function() {
  headerScroll();
});
$(window).on('resize', function() {
  var width = $(window).width();
  /*var btn = $('.btn-mobile');
  var body = $('body');
  var nav = $('.mobile-nav');*/

  if (width >= 1024) {
    /*btn.removeClass('is-active');
    body.removeClass('is-fixed');
    nav.removeClass('is-active');
    $('.j-footer-nav').removeClass('is-active');*/
    $('.j-footer-nav').removeClass('is-active');
    // $('.m-search').removeClass('is-active');
    // $('body').removeClass('is-fixed');
    $('.footer__nav').attr('style','');
  }
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).find("[type=submit]").prop("disabled", false);
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');
    $(form).find("[type=submit]").prop("disabled", true);

    return false;
  });
}

function phoneMask() {
  var phone = $('.j-phone-mask');
  phone.each(function () {
    $(this).mask("+7 (999) 999-99-99");
  });
}

jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function mobileNav() {
  /*var btn = $('.btn-mobile');
  var body = $('body');
  var nav = $('.mobile-nav');
  var navWrapper = $('.mobile-nav__wrapper');

  btn.on('click', function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      btn.removeClass('is-active');
      body.removeClass('is-fixed');
      nav.removeClass('is-active');
    } else {
      btn.addClass('is-active');
      body.addClass('is-fixed');
      nav.addClass('is-active');
    }
  });

  nav.on('click', function(){
    btn.removeClass('is-active');
    body.removeClass('is-fixed');
    nav.removeClass('is-active');
  });

  navWrapper.on('click', function(e){
    e.stopPropagation();
  })*/
}

function headerScroll() {
  var header = $('.header');
  var navigation = $('.navigation');
  var width = $(window).width();

  if ($(window).scrollTop() > header.height()) {
    header.addClass('is-scroll');
    navigation.addClass('is-scroll');
  } else {
    header.removeClass('is-scroll');
    navigation.removeClass('is-scroll');
  }
}

// function oneCarousel() {
//   var width = $(window).width();

//   var $slickElementPagination = $('.one-apartment__carousel-pagination');
//   var $slickElement = $('.j-one-apartment');

//   if (width <= 767) {
//     $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
//       //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
//       var i = (currentSlide ? currentSlide : 0) + 1;
//       $slickElementPagination.text(i + ' / ' + slick.slideCount);
//     });  
//     $slickElement.not('.slick-initialized').slick({
//       mobileFirst: true,
//       arrows: false,
//       infinite: true,
//       dots: false
//     });
//   } else {
//     if($slickElement.hasClass('slick-initialized')){
//       $slickElement.slick('unslick');
//     }
//   }
// }

function footerNav() {
  var link = $('.j-footer-nav');
  
  link.each(function(){
    var _this = $(this);
    
    _this.on('click', function(){
      var width = $(window).width();
      if (_this.hasClass('is-active') && width <= 1024) {
        _this.removeClass('is-active');
        _this.next('.footer__nav').slideUp();
      } else if (!_this.hasClass('is-active') && width <= 1024) {
        _this.addClass('is-active');
        _this.next('.footer__nav').slideDown();
      } else if (width >= 992) {
        return false
      }
    });
  })
}

function jNavigation() {
  var btn = $('.j-btn');
  var navigation = $('.j-btn-target');
  var body = $('body');
  var btnTarget;
  
  $(document).on('click', '.j-btn', function(e){
    e.stopPropagation();
    var _this = $(this);
    btnTarget = $('#' + _this.data('id') + '.navigation');
    body.removeClass('is-fixed');
    
    if (btnTarget.hasClass('is-active')) {
      btnTarget.removeClass('is-active');
    } else if (!btnTarget.hasClass('is-active')) {
      navigation.removeClass('is-active');
      btnTarget.addClass('is-active');
      body.addClass('is-fixed');
    }
  });

  $(document).on('click', function(e){
    navigation.removeClass('is-active');
    body.removeClass('is-fixed');
  });

  $(document).on('click', '.j-btn-target', function(e){
    e.stopPropagation();
  });
}