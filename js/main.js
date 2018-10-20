$(document).ready(function(){
  'use strict';
  //===== Counter Up =====//
  if ($.isFunction($.fn.counterUp)) {
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });
  }

  //===== Accordion =====//
  $('#acordn .acrdn-cnt').hide();
  $('#acordn h4:first').addClass('active').next().slideDown(500).parent().addClass("activate");
  $('#acordn h4').on("click", function(){
    if ($(this).next().is(':hidden')) {
      $('#acordn h4').removeClass('active').next().slideUp(500).parent().removeClass("activate");
      $(this).toggleClass('active').next().slideDown(500).parent().toggleClass("activate");
    }
  });

  //===== Sticky Header =====//
  var menu_height = $('header').innerHeight();
  $(window).scroll(function(){
      var scroll = $(window).scrollTop();
      if (scroll >= menu_height) {
        $('.stck').addClass('stcky');
      } else {
        $('.stck').removeClass('stcky');
      }
  });
  if ($('header').hasClass('stck')) {
    $('main').css({'padding-top': menu_height});
  }


  //===== Responsive Header =====//
  $('.mnu-btn').on('click', function () {
    $('.rspnsv-mnu').addClass('sldin');
    return false;
  });
  $('.cls-btn').on('click', function () {
    $('.rspnsv-mnu').removeClass('sldin');
    return false;
  });
  $('.rspnsv-mnu li.menu-item-has-children > a').on('click', function () {
    $(this).parent().siblings().children('ul').slideUp();
    $(this).parent().siblings().removeClass('active');
    $(this).parent().children('ul').slideToggle();
    $(this).parent().toggleClass('active');
    return false;
  });

  //===== Scroll Up Bar =====//
  if ($.isFunction($.fn.scrollupbar)) {
    $('header').scrollupbar();
  }

  //===== Scroll Function =====//
  $(function() {
    $('nav.one-page-func > ul > li > a,.rspnsv-mnu > ul > li > a,.clk-scrl').on('click',function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
        }
      }
      return false;
    });
  });

  //===== LightBox =====//
  if ($.isFunction($.fn.poptrox)) {
    var foo = $('.lightbox');
    foo.poptrox({usePopupCaption: true, usePopupNav: true});
  }

  //===== Select 2 =====//
  if ($.isFunction($.fn.select2)) {
    $('select').select2({});
  }

  //===== Custom Scrollbar =====//
  if ($.isFunction($.fn.mCustomScrollbar)) {
    $('.custom-scrollbar').mCustomScrollbar({theme:"light-thick"});
  }

  //===== Owl Carousel =====//
  if ($.isFunction($.fn.owlCarousel)) {
    //=== Apps Screenshots Carousel ===//
    $('.app-scrn-caro').owlCarousel({
      autoplay: true,
      smartSpeed: 3000,
      loop: true,
      items: 3,
      dots: false,
      slideSpeed: 2000,
      nav: true,
      navText:['<i class="fa fa-arrow-left"></i>','<i class="fa fa-arrow-right"></i>'],
      margin: 50,
      center: true,
      responsive: {
        0: {items: 1,nav: false},
        480: {items: 2,nav: false},
        768: {items: 2,nav: false},
        1200: {items: 3}
      }
    });

    //=== Testimonials Carousel ===//
    $('.testi-caro-innr').owlCarousel({
      autoplay: true,
      smartSpeed: 3000,
      loop: true,
      items: 2,
      dots: false,
      slideSpeed: 2000,
      nav: false,
      margin: 70,
      responsive: {
        0: {items: 1},
        480: {items: 1},
        768: {items: 1},
        1200: {items: 2}
      }
    });

  }

  
if ($('#gmp').length) {
  //===== Google Map =====//
  var marker;

  function initMap() {
    var map = new google.maps.Map(document.getElementById('gmp'), {
      zoom: 13,
      center: {lat: 59.325, lng: 18.070}
    });

    marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: {lat: 59.327, lng: 18.067}
    });
    marker.addListener('click', toggleBounce);
  }

  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  google.maps.event.addDomListener(window, 'load', initMap);
}

});