$(function () {
  var location = window.location.pathname
  var path = window.location.pathname.split('/')[1]

  $('a.mirror-logo__lang-switch_rus').click(function (e) {
    e.preventDefault()
    if (path === 'en') window.location.assign(location.replace('/en', ''))
  })

  $('a.footer__mirror-logo__lang-switch_rus').click(function (e) {
    e.preventDefault()
    if (path === 'en') window.location.assign(location.replace('/en', ''))
  })

  $('a.mirror-logo__lang-switch_eng').click(function (e) {
    e.preventDefault()
    if (path !== 'en' && path !== 'press') window.location.assign(location.replace('/', '/en/'))
  })

  $('a.footer__mirror-logo__lang-switch_eng').click(function (e) {
    e.preventDefault()
    if (path !== 'en' && path !== 'press') window.location.assign(location.replace('/', '/en/'))
  })

})