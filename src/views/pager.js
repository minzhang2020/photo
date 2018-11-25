$(function() {
  var pagerInstance = null
  var initPagination = function(total, cur) {
    pagerInstance = $('#pagination').pagination(total, {
      num_edge_entries: 1, //边缘页数
      current_page: cur,
      num_display_entries: 4, //主体页数
      callback: pageSelectCallback,
      items_per_page: 20 //每页显示1项
    })
  }
  function pageSelectCallback(index) {
    // console.log(index)
    window.location.href = '?page=' + (index + 1)
  }
  var total = +$('#total').val()
  var currentPageIndex = +$('#currentPageIndex').val()
  initPagination(total, currentPageIndex - 1)

  $('#prevPage').on('click', function() {
    var currentPageIndex = +$('#currentPageIndex').val()
    if (currentPageIndex > 1) {
      window.location.href = '?page=' + (currentPageIndex - 1)
    }
  })
  $('#nextPage').on('click', function() {
    var currentPageIndex = +$('#currentPageIndex').val()
    var pageTotal = +$('#pageTotal').val()
    if (currentPageIndex < pageTotal) {
      window.location.href = '?page=' + (currentPageIndex + 1)
    }
  })
})
