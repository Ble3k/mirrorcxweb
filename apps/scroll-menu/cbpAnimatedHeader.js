/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
$(document).ready(function() {
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
		}

		$('div.header__svg').click(function () { activatePopUp() })
		$('a.popUp__demo-link').click(function () { closePopUp() })

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