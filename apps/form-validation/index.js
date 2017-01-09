$(function () {

  function inputHandle(variable, input) {
    (window[variable] = input.val().length > 1) && $('span.validate-text').html('')
    if (window.nameInput && window.companyInput && phoneRegExp.test(phoneInput.val()) && mailRegExp.test(mailInput.val())) {
      $('#captcha-container').addClass("showCaptcha")
    } else {
      $('#captcha-container').removeClass("showCaptcha")
    }
  }

  var nameInput = $('input.input-name')
  nameInput.on('keyup', function() { inputHandle('nameInput', nameInput) })
  nameInput.on('change', function() { inputHandle('nameInput', nameInput) })

  var phoneInput = $('input.input-phone')
  phoneInput.on('keyup', function() { inputHandle('phoneInput', phoneInput) })
  phoneInput.on('change', function() { inputHandle('phoneInput', phoneInput) })

  var mailInput = $('input.input-mail')
  mailInput.on('keyup', function() { inputHandle('mailInput', mailInput) })
  mailInput.on('change', function() { inputHandle('mailInput', mailInput) })

  var companyInput = $('input.input-company')
  companyInput.on('keyup', function() { inputHandle('companyInput', companyInput) })
  companyInput.on('change', function() { inputHandle('companyInput', companyInput) })

  var commentInput = $('textarea.input-comment')
  commentInput.on('keyup', function() { inputHandle('commentInput', commentInput) })
  commentInput.on('change', function() { inputHandle('commentInput', commentInput) })

  function nameError() {
    nameInput.addClass('errorBox')
  }

  function phoneError() {
    phoneInput.addClass('errorBox')
  }

  function mailError() {
    mailInput.addClass('errorBox')
  }

  function companyError() {
    companyInput.addClass('errorBox')
  }

  function commentError() {
    commentInput.addClass('errorBox')
  }

  function removeError() {
    nameInput.removeClass('errorBox')
    phoneInput.removeClass('errorBox')
    mailInput.removeClass('errorBox')
    companyInput.removeClass('errorBox')
    commentInput.removeClass('errorBox')
  }

  var phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)\d{3}[\- ]?\d{2}[\- ]?\d{2}$/
  var mailRegExp = /[^@]+@[^@]+\.[^@]+/

  $('button.footer-form-block__submit-button').click(function(e) {
    e.preventDefault()
    if ( window.captchaResponse && window.nameInput && window.companyInput && window.commentInput && phoneRegExp.test(phoneInput.val()) && mailRegExp.test(mailInput.val())) {
      $('button.footer-form-block__submit-button').attr('disabled', true)
      $.ajax({
        type: "POST",
        url: '/apps/mailer/send.php',
        data: {
          name: nameInput.val(),
          phone: phoneInput.val(),
          email: mailInput.val(),
          company: companyInput.val(),
          comments: commentInput.val(),
          gCaptchaResponse: window.captchaResponse
        },
        success: function(data) {
          $('div.footer-form-block__text-wrapper').addClass('hide')
          $('div.footer-form-block__input-wrapper').addClass('hide')
          $('div.form-block_success').addClass('show')
          if (data === 'error') $('div.form-block_success').html('Error!').css('color', '#eb6258')
          $('span.validate-text').html('')
          $('#captcha-container').removeClass('showCaptcha')
          setTimeout(function() {
            $('div.footer-form-block__text-wrapper').removeClass('hide')
            $('div.footer-form-block__input-wrapper').removeClass('hide')
            $('div.form-block_success').removeClass('show')
            $('button.footer-form-block__submit-button').attr('disabled', false)
            nameInput.val(undefined)
            phoneInput.val(undefined)
            mailInput.val(undefined)
            companyInput.val(undefined)
            commentInput.val(undefined)
            window.nameInput = false
            window.phoneInput = false
            window.mailInput = false
            window.companyInput = false
            window.commentInput = false
            window.captchaResponse = undefined
            grecaptcha.reset(window.captchaWidgetId)
          }, 3000)
        },
        dataType: 'text'
      });
    } else {
      !window.captchaResponse && $('span.validate-text').html('Нажмите "Я не робот", если вы не робот!')
      !window.nameInput && nameError();
      !window.companyInput && companyError();
      !window.commentInput && commentError();
      !phoneRegExp.test(phoneInput.val()) && $('span.validate-text').html('Некорректный телефон') && phoneError();
      !mailRegExp.test(mailInput.val()) && $('span.validate-text').html('Некорректный email') && mailError();
      (!window.nameInput || !window.companyInput || !window.commentInput) && $('span.validate-text').html('Необходимо заполнить все поля');
    }
  })

  nameInput.focus(function() {
    nameInput.removeClass('errorBox')
  })
  phoneInput.focus(function() {
    phoneInput.removeClass('errorBox')
  })
  mailInput.focus(function() {
    mailInput.removeClass('errorBox')
  })
  companyInput.focus(function() {
    companyInput.removeClass('errorBox')
  })
  commentInput.focus(function() {
    commentInput.removeClass('errorBox')
  })

  window.addEventListener('scroll', function () {
    removeError()
    $('span.validate-text').html('')
  })


});