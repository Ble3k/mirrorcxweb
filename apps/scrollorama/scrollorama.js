$(document).ready(function() {  
  var controller = $.superscrollorama();
  
  var pinDur = $(window).height() * 4;
  
  var pinAnimations = new TimelineLite();
  
  var firstBlock = $('#scheme-block__first')
  var secondBlock = $('#scheme-block__second')
  
  pinAnimations
    .append(TweenMax.staggerTo(firstBlock, 2, {className:"+=animationStart", onComplete: function() {
      firstBlock.removeClass('animationStart')
      firstBlock.addClass('animationEnd')
    }}))
    .append(TweenMax.staggerTo(firstBlock, .2, {css:{opacity: 0}}))
    .append(TweenMax.staggerTo(secondBlock, 2, {className:"+=animationStart", onComplete: function() {
      secondBlock.removeClass('animationStart')
      secondBlock.addClass('animationEnd')
      controller.removePin($('#pin-block'), false);
      $('.superscrollorama-pin-spacer').css("display", "none");
      $('body')[0].scrollTop -= $(window).height();
    }}))
  
  controller.pin($('#pin-block'), pinDur, {
    anim:pinAnimations,
    onPin: function() {
      $('#pin-block').css('height','100vh').css('width','100%');
    },
    onUnpin: function() {
      $('#pin-block').css('height','100vh');
    }
  });
});