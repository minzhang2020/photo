$(function() {
  var initPagination = function(total) {
    $('#pagination').pagination(total, {
      num_edge_entries: 1, //边缘页数
      num_display_entries: 4, //主体页数
      callback: pageSelectCallback,
      items_per_page: 20 //每页显示1项
    })
  }
  function pageSelectCallback(index) {
    console.log(index)
  }
  var totalFromServer = +$('#totalServer').val()
  initPagination(totalFromServer)
})
