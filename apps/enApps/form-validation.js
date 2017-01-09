$(function () {

  window.validate = function(nameField, contactField, companyField, commentField, validateTextElem, sbmtBtn, blockToHide, messageToShow, svgClassName, captchaContainer, from) {
    var nameInput = nameField
    nameInput.on('keyup', function() { inputHandle('nameInput', nameInput) })
    nameInput.on('change', function() { inputHandle('nameInput', nameInput) })

    var contactInput = contactField
    contactInput.on('keyup', function() { inputHandle('contactInput', contactInput) })
    contactInput.on('change', function() { inputHandle('contactInput', contactInput) })

    var companyInput = companyField
    companyInput.on('keyup', function() { inputHandle('companyInput', companyInput) })
    companyInput.on('change', function() { inputHandle('companyInput', companyInput) })

    var commentInput = commentField
    commentInput.on('keyup', function() { inputHandle('commentInput', commentInput) })
    commentInput.on('change', function() { inputHandle('commentInput', commentInput) })

    var validateText = validateTextElem
    var contactRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)\d{3}[\- ]?\d{2}[\- ]?\d{2}$|[^@]+@[^@]+\.[^@]+/

    function inputHandle(variable, input) {
      (window[variable] = input.val().length > 1) && validateText.html('')
      if (variable === 'contactInput') {
        contactRegExp.test(input.val()) ? input.siblings(svgClassName).addClass('show') : input.siblings(svgClassName).removeClass('show')
      } else {
        window[variable] ? input.siblings(svgClassName).addClass('show') : input.siblings(svgClassName).removeClass('show')
      }
      if (window.nameInput && window.companyInput && contactRegExp.test(contactInput.val())) {
        captchaContainer.addClass("showCaptcha")
      } else {
        captchaContainer.removeClass("showCaptcha")
      }
    }

    function clearValue() {
      nameInput.val(undefined)
      contactInput.val(undefined)
      companyInput.val(undefined)
      commentInput.val(undefined)
      window.nameInput = false
      window.contactInput = false
      window.companyInput = false
      window.commentInput = false
      window.captchaResponse = undefined
      grecaptcha.reset(window.captchaWidgetId)
      grecaptcha.reset(window.captchaWidgetId1)
    }

    function inputError(input) {
      input.addClass('errorBox')
    }

    function removeError(input) {
      input = input || $('input')
      input.removeClass('errorBox')
    }

    sbmtBtn.bind('click', function(e) { sendData(e) })

    function sendData(e) {
      e.preventDefault()
      if (window.captchaResponse && window.nameInput && window.companyInput && window.commentInput && contactRegExp.test(contactInput.val())) {
        sbmtBtn.attr('disabled', true)
        $.ajax({
          type: "POST",
          url: '/apps/mailer/send.php',
          data: {
            name: nameInput.val(),
            contact: contactInput.val(),
            company: companyInput.val(),
            comments: commentInput.val(),
            gCaptchaResponse: window.captchaResponse,
          },
          success: function(data) {
            blockToHide.addClass('hide')
            messageToShow.addClass('show')
            if (data === 'error') messageToShow.html('Error!').css('color', '#eb6258')
            $('svg' + svgClassName).removeClass('show')
            validateText.html('')
            captchaContainer.removeClass('showCaptcha')
            setTimeout(function() {
              blockToHide.removeClass('hide')
              messageToShow.removeClass('show')
              sbmtBtn.attr('disabled', false)
              clearValue()
            }, 3000)
          },
          dataType: 'text'
        });
      } else {
        !window.captchaResponse && validateText.html('Click "I\'m not a robot" if you are a human!')
        !window.nameInput && inputError(nameInput);
        !window.companyInput && inputError(companyInput);
        !window.commentInput && inputError(commentInput);
        !contactRegExp.test(contactInput.val()) && validateText.html('Incorrect phone or e-mail') && inputError(contactInput);
        (!window.nameInput || !window.companyInput || !window.commentInput) && validateText.html('Please, fill all the fields');
      }
    }

    nameInput.focus(function() {
      removeError(nameInput)
    })
    contactInput.focus(function() {
      removeError(contactInput)
    })
    companyInput.focus(function() {
      removeError(companyInput)
    })
    commentInput.focus(function() {
      removeError(commentInput)
    })

    window.addEventListener('scroll', function () {
      removeError()
      validateText.html('')
    })
  }

  window.validate(
    $('input.feedback-name'),
    $('input.feedback-contact'),
    $('input.feedback-company'),
    $('input.feedback-comment'),
    $('span.feedback__validate-text'),
    $('button.feedback__btn'),
    $('div.feedback__form'),
    $('div.feedback__success'),
    '.feedback__like',
    $('div.feedback__captcha-container'),
    'form'
  )
});