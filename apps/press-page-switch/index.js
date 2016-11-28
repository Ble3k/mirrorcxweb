$(function () {
  let path = window.location.hash
  changePage(path || '#pubs')

  function changePage(hash) {
    switch (hash) {
      case ('#pubs'):
        $('div.articles-block__articles-container').addClass('show-content_mobile');
        $('a.pubs').addClass('press-active');
        break
      case ('#news'):
        $('div.articles-block__news-contacts-container').addClass('show-content_mobile');
        $('a.news').addClass('press-active');
        break
      default:
    }
  }

  function goTo(e) {
    $('a.press-btn').removeClass('press-active')
    $('div.articles-block').children().removeClass('show-content_mobile')
    changePage(e.target.hash)
  }

  $('a.press-btn').click(function (e) { goTo(e) });
});