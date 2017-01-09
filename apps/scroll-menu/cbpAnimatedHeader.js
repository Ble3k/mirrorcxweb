$(document).ready(function() {
	  var path = window.location.pathname.split('/')[1] === 'en' ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[1]
    var enPath = window.location.pathname.split('/')[3]

    switch(path) {
      case ('product'): $('a.products').addClass('link_active'); break
      case ('service'): $('a.service').addClass('link_active'); break
      case ('clients'): $('a.clients').addClass('link_active'); break
      case ('press'): $('a.press').addClass('link_active'); break
      case ('franchising'): $('a.franchising').addClass('link_active'); break
      case ('contacts'): $('a.contacts').addClass('link_active'); break
      default:
    }

    switch(enPath) {
      case ('mystery'): $('a.mystery').addClass('bottom-menu__active-link'); break
      case ('interviews'): $('a.interviews').addClass('bottom-menu__active-link'); break
      case ('rent'): $('a.rent').addClass('bottom-menu__active-link'); break
      default:
    }

var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.header' ),
		didScroll = false,
		changeHeaderOn = 100;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				scrollPage();
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'header-low' );
		}
		else {
			classie.remove( header, 'header-low' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();
});