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

  $('[data-fancybox="images-preview"]').fancybox({
    // Options will go here
    backFocus: false,
    infobar: false,
    buttons: [
      "thumbs",
      "close"
    ],
    protect: true,
    mobile : {
      clickSlide : function( current, event ) {
        return current.type === 'image' ? 'toggleControls' : "close";
      }
    },
    loop: true
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
    adaptiveHeight: true
  });

  $('.main-choice__carousel2').slick({
    mobileFirst: true,
    dots: false,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    variableWidth: true,
    centerPadding: '30px'
  });

  $('.contacts__carousel').slick({
    mobileFirst: true,
    dots: false,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: false,
    variableWidth: true,
    slidesToShow: 1
  });

  $('.analogue__carousel').slick({
    mobileFirst: true,
    dots: false,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: false,
    variableWidth: false,
    slidesToShow: 1,
    prevArrow: '.analogue__btns-left',
    nextArrow: '.analogue__btns-right',
    responsive: [
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      }
    ]
  });

  // Product gallery carousel
  $('.product__carousel-small').slick({
    mobileFirst: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product__carousel-big',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    arrows: true,
    centerPadding: '0px',
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          vertical: true,
          verticalSwiping: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          variableWidth: false
        }
      }
    ]
  });

  // Product gallery carousel
  $('.product__carousel-big').slick({
    mobileFirst: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    dots: false,
    asNavFor: '.product__carousel-small'
  });

  $("body").on("click", ".catalog-menu .arrow", function() {
		var thisLi = $(this).closest("li"),
			thisUl = thisLi.find("ul"),
			thisArrow = $(this);
		if (!thisLi.hasClass("open")) {
			thisUl.slideDown(250, function() {
				thisLi.addClass("open");
			});
		} else {
			thisUl.slideUp(250, function() {
				thisLi.removeClass("open");
			});
		}
	});

  // Readmore
  $('.has-readmore').readmore({
    speed: 500,
    collapsedHeight: 230,
    moreLink: '<div class="readmore"><a href="#">Подробнее</a></div>',
    lessLink: '<div class="readmore"><a href="#">Закрыть</a></div>'
  });

  // Readmore
  $('.j-readmore').readmore({
    speed: 500,
    collapsedHeight: 330,
    moreLink: '<div class="readmore"><span>Развернуть</span></div>',
    lessLink: '<div class="readmore"><span>Свернуть</span></div>'
  });

  // Jquery UI slider
  $("#filter__range").slider({
  	min: 0,
  	max: 20000,
  	values: [5000,15000],
  	range: true,
  	stop: function(event, ui) {
      $("input#priceMin").val($("#filter__range").slider("values",0));
      $("input#priceMax").val($("#filter__range").slider("values",1));
    },
    slide: function(event, ui){
      $("input#priceMin").val($("#filter__range").slider("values",0));
      $("input#priceMax").val($("#filter__range").slider("values",1));
    }
  });

  $("input#priceMin").on('change', function(){
  	var value1=$("input#priceMin").val();
  	var value2=$("input#priceMax").val();
    if(parseInt(value1) > parseInt(value2)){
  		value1 = value2;
  		$("input#priceMin").val(value1);
  	}
  	$("#filter__range").slider("values", 0, value1);
  });

  $("input#priceMax").on('change', function(){
  	var value1=$("input#priceMin").val();
  	var value2=$("input#priceMax").val();
  	if (value2 > 20000) { value2 = 20000; $("input#priceMax").val(35000)}
  	if(parseInt(value1) > parseInt(value2)){
  		value2 = value1;
  		$("input#priceMax").val(value2);
      $('.price-range-max.value').html(value2);
  	}
  	$("#filter__range").slider("values",1,value2);
    $('.price-range-max.value').html(value2);
  });

  // фильтрация ввода в поля
  $('.filter__block input').on('keypress', function(event){
    var key, keyChar;
    if(!event) var event = window.event;
    if (event.keyCode) key = event.keyCode;
    else if(event.which) key = event.which;
    if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
    keyChar=String.fromCharCode(key);
    if(!/\d/.test(keyChar))	return false;
  });

  // Hide filter block
  $('.has-hide').readmore({
    speed: 500,
    collapsedHeight: 285,
    moreLink: '<div class="filter__more"><div>Показать всё</div></div>',
    lessLink: '<div class="filter__more"><div>Скрыть всё</div></div>'
  });

  $(document).on('click', '.filter__more', function(e){
    e.stopPropagation();
  });

  $('.btn-product-th-more').on('click', function(e){
    e.preventDefault();
    var _this = $(this);
    var table = _this.prev('table');
    if (table.hasClass('is-active')) {
      table.removeClass('is-active');
      _this.removeClass('is-active');
    } else {
      table.addClass('is-active');
      _this.addClass('is-active');
    }
  });

  $('.catalog__block-title').matchHeight();

  phoneMask();
  mobileNav();
  headerScroll();
  footerNav();
  jNavigation();
  search();
  catalogNavigation();
  stickyCart();
  stickyGallery();
  mobileNav();
  sortingSelect();
  
  deliveryTest();
  testFavourite();
  countTest();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };
});

$(window).on('load', function() {
  $('#grid').masonry({});
});
$(window).on('scroll', function() {
  headerScroll();
});
$(window).on('resize', function() {
  var width = $(window).width();
  if (width >= 1024) {
    $('.j-footer-nav').removeClass('is-active');
    $('body').removeClass('is-fixed');
    $('.footer__nav').attr('style','');
  }
});

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

function headerScroll() {
  var header = $('.header');
  var navigation = $('.j-btn-target');
  var width = $(window).width();

  if ($(window).scrollTop() > header.height()) {
    header.addClass('is-scroll');
    navigation.addClass('is-scroll');
  } else {
    header.removeClass('is-scroll');
    navigation.removeClass('is-scroll');
  }
}

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
    btnTarget = $('#' + _this.data('id'));
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

function testFavourite() {
  var btn = $('.j-favourite-test');
  btn.on('click', function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      _this.removeClass('is-active');
    } else {
      _this.addClass('is-active');
    }
  })
}

function countTest() {
  var block = $('.j-count');

  block.each(function(){
    var _this = $(this);
    var plus = _this.find('.btn-plus');
    var minus = _this.find('.btn-minus');
    var input = _this.find('input');
    var value = input.val();

    plus.on('click', function(){
      value = parseFloat(value) + 1;
      input.val(value);
    });
  
    minus.on('click', function(){
      if (value <= 1) return;
      value = parseFloat(value) - 1;
      input.val(value);
    });
  });
}

function search() {
  var btn = $('.j-btn-search');
  var search = $('#search');
  var input = search.find('input');
  var header = $('.header');

  btn.on('click', function(){
    input.val('');
    if (search.hasClass('is-active')) {
      search.removeClass('is-active');
      header.removeClass('is-search');
    } else {
      search.addClass('is-active');
      header.addClass('is-search');
    }
  });
}

function catalogNavigation() {
  var width = $(window).width();
  var menu = $('#catalog-navigation'); 
  var menu2 = $('.header__navigation');

  if (width >= 1280) {
    menu.find('.active').removeClass('active');
    menu2.find('.active').removeClass('active');
  }

  $(window).on('resize', function(){
    var width = $(window).width();
    if (width >= 1280 ) {
      menu.find('.active').removeClass('active');
      menu2.find('.active').removeClass('active');
      $('#catalog-navigation').removeClass('is-active');
    }
  });

   
  $(document).on('mouseover', function(e) { 
    var container = $("#catalog-navigation");
    if (!container.is(e.target) && container.has(e.target).length === 0) { 
      $('.catalog-navigation__body .active').removeClass('active'); 
      $('.header__navigation .active').removeClass('active'); 
    } 
  });

  $(document).on('click', '.header__navigation .active', function(e) { 
    var href = $(this).attr('href').substring(1); 
    $(this).removeClass('active'); 
    $('.catalog-navigation__body .tab-pane[id="' + href + '"]').removeClass('active'); 
  });
}

function stickyCart() {
  var cart = $('#cartTotal');
  var width = $(window).width();

  if (width >= 1280) {
    cart.stick_in_parent({
      offset_top: 100
    });
  } else {
    cart.trigger("sticky_kit:detach");
  }
}

function stickyGallery() {
  var gallery = $('.product__gallery');
  var width = $(window).width();

  if (width >= 1024) {
    gallery.stick_in_parent({
      offset_top: 100
    });
  } else {
    gallery.trigger("sticky_kit:detach");
  }
}

function deliveryTest() {
  var input = $('.j-delivery-test');
  var block = $('#deliveryCity');
  
  input.on('change', function() {
    var _this = $(this);
    block.addClass('d-none');
    if (_this.attr('id') == 'radio23' || _this.attr('id') == 'radio24') {
      block.removeClass('d-none');
    }
  });
}

function mobileNav() {
  var btn = $('.btn-mobile');
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
  })
}

function sortingSelect(){
  var select = $('.niceSelect');
  
  select.each(function(){
    var _this = $(this);
    var a = _this.find('a');
    var title = _this.find('.current');
    var li = _this.find('li');

    _this.on('click', function(e){
      e.stopPropagation();
      var _this = $(this);
      select.removeClass('is-active');
      if (_this.hasClass('is-active')) {
        _this.removeClass('is-active');
      } else {
        _this.addClass('is-active');
      }
    });

    a.on('click', function() {
      li.removeClass('selected');
      select.removeClass('is-active');
      title.text($(this).text());
      $(this).parent().addClass('selected');
    })
  });

  $(document).on('click', function(e) { 
    select.removeClass('is-active');
  });
  $('.nice-select .list').on('click', function(e) { 
    e.stopPropagation();
  });
}