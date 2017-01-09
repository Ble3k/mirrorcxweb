var onReCaptchaLoad = function() {

  var verifyCallback = function( response ) {
    window.captchaResponse = response;
  };

  window.captchaWidgetId = grecaptcha.render( 'captcha-container', {
    'sitekey' : '6Lf81w4UAAAAANoH9yV8waciC4N7W72tSbErKRH0',
    'theme' : 'light',
    'callback': verifyCallback
  });

  if (window.location.pathname.split('/')[1] === 'en') {
    window.captchaWidgetId1 = grecaptcha.render( 'captcha-container1', {
      'sitekey' : '6Lf81w4UAAAAANoH9yV8waciC4N7W72tSbErKRH0',
      'theme' : 'light',
      'callback': verifyCallback
    });
  }
};