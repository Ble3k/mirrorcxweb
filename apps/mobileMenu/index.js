$(function() {
  $('svg.menu-open').addClass('show-btn')

  function activatePopUp() {
    $('div.header__popUp').toggleClass('header__popUp_show')
    $('svg.menu-open').toggleClass('show-btn')
    $('svg.menu-close').toggleClass('show-btn')
  }

  function closePopUp() {
    $('div.header__popUp').removeClass('header__popUp_show')
    $('svg.menu-open').toggleClass('show-btn')
    $('svg.menu-close').toggleClass('show-btn')
    $('body').animate({
      scrollTop: $('body').height()}, 2000);
  }

  $('div.header__svg').click(function () { activatePopUp() })
  $('span.popUp__demo-link').click(function () { closePopUp() })

})