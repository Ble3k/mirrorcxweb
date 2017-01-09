$(function() {
  function showModal() {
    $('div.modal').addClass('show')
    $('body').addClass('overflowBody')
    window.validate(
      $('input.modal__input-name'),
      $('input.modal__input-contact'),
      $('input.modal__input-company'),
      $('input.modal__input-comment'),
      $('span.modal__validate-text'),
      $('button.modal__btn'),
      $('div.modal__form'),
      $('div.modal__success'),
      '.modal__like',
      $('div.modal__captcha-container'),
      'modal'
    )
  }

  function closeModal() {
    $('div.modal').removeClass('show')
    $('body').removeClass('overflowBody')
    $('input.modal__input-name').val(undefined)
    $('input.modal__input-company').val(undefined)
    $('input.modal__input-contact').val(undefined)
    $('input.modal__input-comment').val(undefined)
    $('input').removeClass('errorBox')
    $('span.modal__validate-text').html('')
    $('svg.modal__like').removeClass('show')
    $('div.modal__captcha-container').removeClass('showCaptcha')
    $('button.modal__btn').unbind()
    window.nameInput = false
    window.contactInput = false
    window.companyInput = false
    window.commentInput = false
  }

  $('span.d-btn').click(function() {showModal()})
  $('span.popUp__modal-link').click(function() {showModal()})
  $('div.modal').click(function(e) {
    if ($('div.modal').has(e.target).length === 0) closeModal()
  })
  $('div.svg-container').click(function() {closeModal()})
  $('button.modal__close-btn').click(function() {closeModal()})
  $('button.modal__landscape-msg_close').click(function() {closeModal()})
})
