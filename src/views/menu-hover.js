$(function() {
  $('.menu-item')
    .on('mouseenter', function() {
      $(this).addClass('menu-item-hover')
    })
    .on('mouseleave', function() {
      $(this).removeClass('menu-item-hover')
    })
})
