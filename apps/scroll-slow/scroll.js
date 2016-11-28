$(document).ready(function() {
$('a[href^="#"]').click(function(){
var el = $(this).attr('href');
$('body').animate({
scrollTop: $(el)[0].offsetTop + $(window).height()}, 1500);
return false;
});
});