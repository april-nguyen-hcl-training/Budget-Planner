$(function () {
  var includes = $('[data-include]')
  $.each(includes, function () {
    var file = 'parts/' + $(this).data('include') + '.html'
    $(this).load(file)
  })
})